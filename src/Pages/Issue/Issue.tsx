import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTenStackQuery } from "../../Services/TenstackQuery/Query";
import { BackendEndpoints } from "../../Services/Urls/Urls";
import { IssueCards } from "../../Utiles/Cards/IssueCards";
import { SmallLoading } from "../../Utiles/Loading/SmallLoading/SmallLoading";

export const Issue = () => {
  document.title = "Issues - Git Issue Tracker";

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const initialStatus = searchParams.get("status") || "";
  const initialPriority = searchParams.get("priority") || "";
  const initialPage = Number(searchParams.get("page_no")) || 1;

  const [page_no, setPageNo] = useState<number>(initialPage);
  const [page_size] = useState<number>(6);
  const [status, setStatus] = useState<string>(initialStatus);
  const [priority, setPriority] = useState<string>(initialPriority);

  useEffect(() => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (priority) params.set("priority", priority);
    params.set("page_no", String(page_no));

    navigate({ search: params.toString() }, { replace: true });
  }, [status, priority, page_no, navigate]);

  const { data: GetAllIssues, isLoading } = useTenStackQuery({
    key: ["issues", status, priority],
    url: BackendEndpoints.Issue.GetAll,
    params: { page_no, page_size, status, priority },
  });

  const issues = GetAllIssues?.data?.data || [];

  return (
    <div className="px-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center py-2">
        <div className="text-3xl font-semibold">All Issues</div>
        <div className=" flex gap-4">
          <div className="flex gap-4 items-center">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-2 rounded"
            >
              {["", "OPEN", "IN_PROGRESS", "REVIEW", "CLOSED"].map((s) => (
                <option key={s} value={s}>
                  {s === ""
                    ? "All Status"
                    : s
                        .replace("_", " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                </option>
              ))}
            </select>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border p-2 rounded"
            >
              {["", "LOW", "MEDIUM", "HIGH"].map((p) => (
                <option key={p} value={p}>
                  {p === ""
                    ? "All Priority"
                    : p.charAt(0) + p.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
          <Link
            to="/app/issues/create"
            className="p-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Create New Issue
          </Link>
        </div>
      </div>

      {isLoading ? (
        <SmallLoading />
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
