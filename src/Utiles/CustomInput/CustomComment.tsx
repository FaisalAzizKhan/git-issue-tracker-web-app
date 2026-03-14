import { useState, type FC } from "react";
import { useSelector } from "react-redux";



export const CustomComment: FC<{ field: any; errors?: any }> = ({ field }) => {

  const user: any = useSelector((state: any) => state?.auth?.user);

  return (
    <div className="my-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-gray-300 rounded-full text-sm flex items-center justify-center">
          {user.first_name[0]}
        </div>
        <label
          htmlFor={field?.name}
          className="block text-sm font-medium text-gray-700  text-left"
        >
          {field?.label}
        </label>
      </div>
      <div className=" ">
        <textarea
          id={field?.name}
          name={field?.name}
          placeholder={field?.label}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
        />
      </div>
      <div className="flex justify-end">
        <button
        type="submit"
        className="mt-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Comment
        </button>
      </div>
    </div>
  );
};

 
