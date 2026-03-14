import { useState } from "react";
import { useTenStackQuery } from "../../Services/TenstackQuery/Query";
import { BackendEndpoints } from "../../Services/Urls/Urls";
import { IssueCards } from "../../Utiles/Cards/IssueCards";
import { Link } from "react-router-dom";

export const Issue = () => {
  document.title = "Issues - Git Issue Tracker";

  const [page_no, setPageNo] = useState<number>(1);
  const [page_size, _] = useState<number>(6);

  const { data: GetAllIssues, isLoading } = useTenStackQuery({
    key: ["issues", page_no as any],
    url: BackendEndpoints.Issue.GetAll,
    params: { page_no, page_size },
  });

  const issues = GetAllIssues?.data?.data || [];

  return (
    <div className="px-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center py-2">
        <div className="text-3xl font-semibold">All Issues</div>
        <div>
          <Link
            to="/app/issues/create"
            className=" p-2  w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 "
          >
            Create New Issue
          </Link>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : issues.length ? (
        <>
          <ul>
            {issues.map((issue: any) => (
              <IssueCards key={issue.issue_id} data={issue} />
            ))}
          </ul>

          {/* Pagination */}

          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              disabled={page_no === 1}
              onClick={() => setPageNo((prev) => prev - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm">Page {page_no}</span>

            <button
              disabled={issues.length < page_size}
              onClick={() => setPageNo((prev) => prev + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No issues found.</p>
      )}
    </div>
  );
};
