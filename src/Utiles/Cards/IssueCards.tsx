import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { Link } from "react-router-dom";

export const IssueCards = ({ data }: IIssue | any) => {
    
  return (
    <Link
      to={`/app/issues/${data?.issue_id}`}
      className="p-4 border rounded-lg shadow mb-4 flex flex-col gap-2 cursor-pointer"
    >
      <div className="flex gap-2 ">
        <div className=" text-gray-500 border border-gray-700 text-sm px-2 rounded">
          {data?.issue_id.split("-")[0]}
        </div>
        <div
          className={
            " px-2 text-sm " +
            (data?.status === "OPEN"
              ? "text-green-500 border border-green-500 rounded capitalize"
              : data?.status === "IN_PROGRESS"
              ? "text-yellow-500 border border-yellow-500 rounded capitalize"
              : "text-red-500 border border-red-500 rounded capitalize")
          }
        >
          {data?.status[0] +
            data.status.slice(1).replace("_", " ").toLowerCase()}
        </div>
      </div>
      <div className="text-xl font-semibold">{data.title}</div>
      <div className=" flex gap-1 items-center rounded border-t pt-2">
        <FaRegArrowAltCircleUp
          className={
            data?.priority === "HIGH"
              ? "text-red-500 text-xl "
              : data?.priority === "MEDIUM"
              ? "text-yellow-500 text-xl "
              : "text-green-500 text-xl "
          }
        />
        <div>{data?.priority[0] + data.priority.slice(1).toLowerCase()}</div>

        <div className="flex gap-1 text-sm items-center">
          <div className=" h-6 w-6 flex justify-center items-center border rounded-full text-xs bg-green-500 text-white">
            {data?.users?.first_name[0]}
          </div>
          <div>{data?.users?.first_name}</div>
          <div>{data?.users?.last_name}</div>
        </div>
      </div>
    </Link>
  );
};
