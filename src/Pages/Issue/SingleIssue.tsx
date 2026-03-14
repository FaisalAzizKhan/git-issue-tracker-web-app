import { useTenStackQuery } from "../../Services/TenstackQuery/Query";
import { BackendEndpoints } from "../../Services/Urls/Urls";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FullLoading } from "../../Utiles/Loading/FullLoading/FullLoading";
import { SmallLoading } from "../../Utiles/Loading/SmallLoading/SmallLoading";
import { IssueCommentsCards } from "../../Utiles/Cards/IssueCommentsCards";
import { CustomComment } from "../../Utiles/CustomInput/CustomComment";
import { useTenStackMutation } from "../../Services/TenstackQuery/Mutations";
import { HTTPAxiosMethod } from "../../Types/Enums/Methods";
import { toast } from "react-toastify";

export const SingleIssue: React.FC = () => {
  const issueId: string = useLocation().pathname.split("/").slice(-1)[0];

  const [showAll, setShowAll] = useState<boolean>(false);
  const [page_no, setPageNo] = useState<number>(1);
  const [page_size] = useState<number>(10);
  const [allComments, setAllComments] = useState<IIssueComment[]>([]);

  const { data: GetAllIssues, isLoading: isLoadingIssue } = useTenStackQuery({
    key: ["issue", issueId],
    url: BackendEndpoints.Issue.GetAll,
    params: { issue_id: issueId },
  });

  const {
    data: GetAllIssueComments,
    isLoading: isLoadingComments,
    refetch,
  } = useTenStackQuery({
    key: ["issue-comments", issueId, page_no as any],
    url: BackendEndpoints.Issue.GetAllComments,
    params: { issue_id: issueId, page_no, page_size },
  });

  const { mutate: creatNewComment } = useTenStackMutation({
    url: BackendEndpoints.Issue.CreateNewComment,
    method: HTTPAxiosMethod.POST as any,
  });

  const issue: IIssue | undefined = GetAllIssues?.data?.data?.[0];

  const comments: IIssueComment[] = GetAllIssueComments?.data?.data || [];

  useEffect(() => {
    const newComments = comments;

    if (page_no === 1) {
      setAllComments(newComments);
    } else {
      setAllComments((prev) => [...prev, ...newComments]);
    }
  }, [GetAllIssueComments]);

  const visibleComments = showAll ? allComments : allComments.slice(0, 3);

  if (isLoadingIssue) return <FullLoading />;

  if (!issue) return <div className="p-4">Issue not found</div>;

  const handleCreateComment = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const formData: any = Object.fromEntries(new FormData(e.currentTarget));

      const commentInput: any = document.getElementById("comment");

      const payload = {
        issue_id: issueId,
        comment: formData.comment,
      };

      creatNewComment(payload, {
        onSuccess: () => {
          commentInput.value = "";
          toast.success("Comment created successfully");
          setPageNo(1);
          refetch();
        },
        onError: () => {
          toast.error("Error creating comment");
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    }
  };

  const handleLoadMore = () => {
    setPageNo((prev) => prev + 1);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Issue Card */}

      <div className="border rounded-lg p-5 bg-white shadow">
        <h1 className="text-2xl font-bold">{issue.title}</h1>

        {issue.description && (
          <p className="text-gray-600 mt-2">{issue.description}</p>
        )}

        <div className="flex gap-2 mt-4 flex-wrap">
          <div
            className={
              "px-2 text-sm " +
              (issue.status === "OPEN"
                ? "text-green-500 border border-green-500 rounded capitalize"
                : issue.status === "IN_PROGRESS"
                ? "text-yellow-500 border border-yellow-500 rounded capitalize"
                : "text-red-500 border border-red-500 rounded capitalize")
            }
          >
            {issue.status[0] +
              issue.status.slice(1).replace("_", " ").toLowerCase()}
          </div>

          {issue.labels?.map((label) => (
            <span key={label} className="px-2 py-1 bg-gray-200 text-xs rounded">
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="border rounded-lg p-5 bg-white shadow">
        <h2 className="text-lg font-semibold mb-4">Comments</h2>

        {isLoadingComments && page_no === 1 ? (
          <SmallLoading />
        ) : (
          <>
            <div className="space-y-3">
              {visibleComments.map((c) => (
                <IssueCommentsCards key={c.issue_comment_id} data={c} />
              ))}
            </div>

            {!showAll && allComments.length > 3 && (
              <div className="mt-4">
                <button
                  onClick={() => setShowAll(true)}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Show More ({allComments.length - 3})
                </button>
              </div>
            )}

            {showAll && (
              <div className="mt-4">
                <button
                  onClick={handleLoadMore}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  {isLoadingComments ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}

        <form onSubmit={handleCreateComment} className="mt-4">
          <CustomComment field={{ name: "comment", label: "Add a comment" }} />
        </form>
      </div>
    </div>
  );
};
