import { Link } from "react-router-dom";
import { useTenStackQuery } from "../../Services/TenstackQuery/Query";
import { BackendEndpoints } from "../../Services/Urls/Urls";

const Dashboard = () => {
  const { data: UsersDetails } = useTenStackQuery({
    key: ["users"],
    url: BackendEndpoints.Users.GetUserInformation,
  });

  return (
    <div className="flex min-h-screen w-full items-start flex-col mt-2 max-w-5xl mx-auto">
      <div onClick={() => console.log(UsersDetails?.data?.data)} className=" ">
        <div className="space-y-2 px-2">
          <p>
            <span className="font-semibold text-2xl pr-1 capitalize">
              Welcome
            </span>
            <span className="capitalize font-semibold text-2xl">
              {UsersDetails?.data?.data?.first_name}
            </span>
            <span className="font-semibold text-2xl">
              {UsersDetails?.data?.data?.last_name}
            </span>
          </p>
          <p>
            <span className="font-semibold pr-1">Email:</span>{" "}
            {UsersDetails?.data?.data?.email}
          </p>
          <p>
            <span className="font-semibold pr-1">Phone:</span>
            {UsersDetails?.data?.data?.phone || "N/A"}
          </p>
        </div>
      </div>

      <div className=" flex w-full">
        <div className="w-1/2 p-2 flex flex-col gap-2">
          <div>Most recent Issues assigned to you</div>
          {UsersDetails?.data?.data?.issue_assign_to
            .slice(0, 3)
            .map((data: any) => {
              return (
                <Link
                  to={`/app/issues/${data?.issue_id}`}
                  key={data.issue_id}
                  // onClick={() => console.log(data)}
                  className="border rounded-md p-3 bg-gray-50 flex flex-col gap-4"
                >
                  <div className="">{data?.title}</div>
                  <div className="text-xs text-gray-500">
                    {data?.description}
                  </div>
                  <div className="flex justify-between">
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

                    <div className="text-xs text-gray-500">
                      {new Date(data.created_at).toLocaleString()}
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
        <div className="w-1/2 p-2 flex flex-col gap-2">
          <div>Most Recent Comments</div>
          {UsersDetails?.data?.data?.issue_comment
            .slice(0, 3)
            .map((data: any) => {
              return (
                <Link
                  to={`/app/issues/${data?.issue?.issue_id}`}
                  // onClick={() => console.log(data)}
                  key={data?.issue_id}
                  className="border rounded-md p-3 bg-gray-50 flex flex-col gap-4"
                >
                  <div className="">{data?.issue?.title}</div>
                  <div className="text-xs text-gray-500">{data?.comment}</div>
                  <div className="flex justify-between">
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
                      {data?.issue?.status?.[0] +
                        data?.issue?.status
                          ?.slice(1)
                          ?.replace("_", " ")
                          .toLowerCase()}
                    </div>

                    <div className="text-xs text-gray-500">
                      {new Date(data?.created_at).toLocaleString()}
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
