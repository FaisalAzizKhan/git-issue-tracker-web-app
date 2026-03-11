import type { FC } from "react";

const CustomInput: FC<{ field: any; errors?: any }> = ({ field, errors }) => {

  const errorMsg: string | any = (errors && errors?.[field.name]) || "";

  // Select icon based on field name or type
  const renderIcon = () => {
    if (field.name === "email") {
      return (
        <svg
          width="22"
          height="18"
          viewBox="0 0 22 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.5001 2.15001C21.5001 0.967503 20.5326 0 19.3501 0H2.15001C0.967503 0 0 0.967503 0 2.15001V15.05C0 16.2325 0.967503 17.2001 2.15001 17.2001H19.3501C20.5326 17.2001 21.5001 16.2325 21.5001 15.05V2.15001ZM19.3501 2.15001L10.75 7.52502L2.15001 2.15001H19.3501ZM19.3501 15.05H2.15001V4.30001L10.75 9.67503L19.3501 4.30001V15.05Z"
            fill="#ADB0CD"
          />
        </svg>
      );
    } else if (field.name === "password") {
      return (
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8178 12.3636L17.5451 14.0909L20.9996 10.6364L19.2724 8.90909"
            stroke="#ADB0CD"
            strokeWidth="2.30303"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.8452 12.1546L20.9998 2"
            stroke="#ADB0CD"
            strokeWidth="2.30303"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.18182 21C10.0437 21 12.3636 18.68 12.3636 15.8182C12.3636 12.9563 10.0437 10.6364 7.18182 10.6364C4.31998 10.6364 2 12.9563 2 15.8182C2 18.68 4.31998 21 7.18182 21Z"
            stroke="#ADB0CD"
            strokeWidth="2.30303"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    return null;
  };
  return (
    <div className="relative mb-4">
      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        {renderIcon()}
      </span>
      <input
        type={field.type}
        name={field.name as string}
        placeholder={field.label}
        className={
          "w-full pl-10 pr-4 py-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 " +
          field.css
        }
      />

      {errors && errors?.[field.name] && (
        <div className="text-red-500 text-xs absolute -bottom-3">
          {errors?.[field.name] || ""}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
