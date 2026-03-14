import { toast } from "react-toastify";
import { useTenStackMutation } from "../../Services/TenstackQuery/Mutations";
import { BackendEndpoints } from "../../Services/Urls/Urls";
import { HTTPAxiosMethod } from "../../Types/Enums/Methods";
import { useRef } from "react";
import { useTenStackQuery } from "../../Services/TenstackQuery/Query";

export const CreateNewIssue = () => {
  document.title = "Create New Issue - Git Issue Tracker";
  const formRef = useRef<HTMLFormElement>(null);

  const titleList = [
    "Title",
    "Variant",
    "Status",
    "Assigne To",
    "Description",
    "Labels",
    "Priority",
  ];

  const { mutate: createNewIssue } = useTenStackMutation({
    url: BackendEndpoints.Issue.CreateNewIssue,
    method: HTTPAxiosMethod.POST as any,
  });

  const { data: GetAllUsers } = useTenStackQuery({
    key: ["users"],
    url: BackendEndpoints.Users.GetAll,
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData: any = Object.fromEntries(new FormData(e.currentTarget));

      const payload = {
        ...formData,
        assign_to_id: formData["assigne to"],
        labels: formData.labels.split(",").map((label: string) => label.trim()),
      };

      const { "assigne to": assigneeId, ...rest } = payload;

      await createNewIssue(rest, {
        onSuccess: (data: any) => {
          console.log(data);
          toast.success("Issue created successfully");
          formRef.current?.reset();
        },
        onError: (err: any) => {
          console.error(err);
          toast.error("Error creating issue");
        },
      });
    } catch (err: any) {
      console.error(err);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1
        onClick={() => console.log(GetAllUsers?.data?.data)}
        className="text-2xl font-semibold mb-6"
      >
        Create New Issue
      </h1>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        {titleList.map((field) => {
          if (field === "Status") {
            return (
              <select
                key={field}
                name={field.toLowerCase()}
                className="w-full border p-2 rounded capitalize"
              >
                {["OPEN", "IN_PROGRESS", "CLOSED"].map((status: string) => (
                  <option key={status} value={status}>
                    {status.toLowerCase().replace("_", " ")}
                  </option>
                ))}
              </select>
            );
          }

          if (field === "Priority") {
            return (
              <select
                key={field}
                name={field.toLowerCase()}
                className="w-full border p-2 rounded capitalize"
              >
                {["LOW", "MEDIUM", "HIGH"].map((priority: any) => (
                  <option key={priority} value={priority}>
                    {priority.toLowerCase().replace("_", " ")}
                  </option>
                ))}
              </select>
            );
          }
          if (field === "Assigne To") {
            return (
              <select
                key={field}
                name={field.toLowerCase()}
                className="w-full border p-2 rounded capitalize"
              >
                {GetAllUsers &&
                  GetAllUsers?.data?.data.map((users: any) => (
                    <option key={users?.users_id} value={users?.users_id}>
                      <div className="flex gap-2">
                        <div>
                          {users?.first_name + " " + users?.last_name + " "}
                        </div>
                      </div>
                    </option>
                  ))}
              </select>
            );
          }

          if (field === "Description") {
            return (
              <textarea
                key={field}
                name={field.toLowerCase()}
                placeholder="Issue description"
                rows={4}
                className="w-full border p-2 rounded"
              />
            );
          }

          return (
            <input
              key={field}
              name={field.toLowerCase()}
              placeholder={"Enter your " + field}
              className="w-full border p-2 rounded"
            />
          );
        })}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Issue
        </button>
      </form>
    </div>
  );
};
