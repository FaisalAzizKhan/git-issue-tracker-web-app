

export const IssueCommentsCards = ({ data }: any) => {
  return (
    <div
      key={data.issue_comment_id}
      onClick={() => console.log("Comment clicked:", data)}
      className="border rounded-md p-3 bg-gray-50"
    >
      <div className="flex items-center space-x-1 mb-2">
        <div className="w-6 h-6 bg-gray-300 rounded-full text-sm flex items-center justify-center">{data?.users?.first_name[0]}</div>
        <span className="text-xs text-gray-500">{data?.users?.first_name}</span>
        <span className="text-xs text-gray-500">{data?.users?.last_name}</span>
      </div>
      <p className="text-sm">{data.comment}</p>
      <span className="text-xs text-gray-500">
        {new Date(data.created_at).toLocaleString()}
      </span>
    </div>
  );
};
