import React, { useState } from "react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginPageValidationSchema } from "../../Utiles/ValidationSchema/schema/LoginPage";
import { useTenStackMutation } from "../../Services/TenstackQuery/Mutations";
import { validateForm } from "../../Utiles/ValidationSchema/method/validate";

import { BackendEndpoints } from "../../Services/Urls/Urls";
import { HTTPAxiosMethod } from "../../Types/Enums/Methods";
import { useAppDispatch } from "../../Store/ReduxToolkit/Store";
import { setCredentials } from "../../Store/ReduxToolkit/AuthSlice";
import CustomButtonWithLoading from "../../Utiles/CustomButtons/CustomButtonWithLoading";
import CustomInput from "../../Utiles/CustomInput/CustomInput";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<any>();

  const { mutate: userlogin, isLoading } = useTenStackMutation({
    url: BackendEndpoints.Auth.Login,
    method: HTTPAxiosMethod.POST as any,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: LoginFormData | any = Object.fromEntries(
      new FormData(e.currentTarget)
    );

    console.log(formData);

    try {
      const isValid = validateForm(
        formData,
        loginPageValidationSchema,
        setErrors
      );

      if (!isValid) return;

      await userlogin(formData, {
        onSuccess: (data: any) => {
          const { token, ...alldata } = data?.data?.data;
          console.log("token:", token);
          console.log("alldata:", alldata);
          toast.success("Login successful");
          useAppDispatch(
            setCredentials({
              user: alldata,
              token: token,
              expiresIn: 3600,
            })
          );
          navigate("/app/dashboard");
        },
        onError: (error: any) => {
          console.error("Login error:", error);
          toast.error(error?.response?.data?.message || "Something went wrong");
        },
      });
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("An error occurred during login");
    }
  };

  const fields: FieldInterface[] = [
    { label: "Your email", type: "text", name: "email" },
    { label: "Password", type: "password", name: "password" },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0B0C13] flex items-center justify-center">
      {" "}
      <div className="absolute w-[300px] h-[300px] bg-[#0D275A] rounded-full blur-[150px] left-[-100px] bottom-[-100px] z-0" />
      <div className="absolute w-[300px] h-[300px] bg-[#432246] rounded-full blur-[150px] bottom-[-100px] left-1/2 translate-x-[45%] z-0" />
      <div className="absolute w-[300px] h-[300px] bg-[#0D275A] rounded-full blur-[100px] top-[-100px] left-1/2 translate-x-[45%] z-0" />
      <div className="relative z-10 bg-white rounded-xl shadow-2xl p-7 w-full max-w-md">
        {/* Form Section */}

        <div className="w-full px-9 inline-block text-center relative">
          <div className="relative">
            
            <hr className="border-t border-gray-300 my-5" />
          </div>

          <h2
            className="text-2xl font-semibold mb-6 text-center text-slateblue"
            style={{ color: "#2A374C" }}
          >
            Log in
          </h2>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg w-full ">
            {fields.map((field: FieldInterface | any) => (
              <div key={field?.name} className="mb-4">
                <CustomInput field={field} errors={errors} />
              </div>
            ))}
            <CustomButtonWithLoading isLoading={isLoading} />
          

         

           
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
