/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAppDispatch } from "../../../redux/hook";
import { Link, useNavigate } from "react-router-dom";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserSchema } from "../../../type/loginType";
import { useRegisterUserMutation } from "../../../redux/features/auth/authApi";
import { setRegisterEmail } from "../../../redux/features/auth/registerEmailSlice";
import { toast } from "sonner";
import MainInput from "../../form/MainInput";
import MainPassword from "../../form/MainPassword";
import { Button, Form } from "antd";
import ButtonLoadingAnimation from "../../ui/Animation/ButtonAnimation";

const RegisterForm = () => {
  const [registerdUser, { isLoading }] = useRegisterUserMutation();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const methods = useForm({
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    if (data.password !== data.confirmPassword) {
      setError(
        "Password and confirm password do not match. Please enter the same password."
      );
      setLoading(false);
      return;
    }

    try {
      setError("");
      const userInfo = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      const res = await registerdUser(userInfo).unwrap();

      console.log(registerdUser);

      if (res) {
        const registerEmail = {
          email: res?.data?.email,
        };

        dispatch(setRegisterEmail(registerEmail));
        methods.reset();
        setLoading(false);
        navigate("/");
      }
    } catch (error: any) {
      if (error?.data?.error) {
        toast.error(error.data.error, { duration: 2000 });
      } else if (error?.data?.statusCode === 500) {
        toast.info("Internal server error, please try again later.", {
          duration: 2000,
        });
      } else if (error.message === "Network Error") {
        toast.error(
          "Server is currently unavailable. Please check your connection or try again later.",
          { duration: 2000 }
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.", {
          duration: 2000,
        });
      }

      setLoading(false);
    }
  };
  return (
    <div>
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-3xl  text-black-primary font-bold text-center mb-8">
          Sign Up
        </h1>
        <div className="max-w-screen-sm mx-auto">
          <FormProvider {...methods}>
            <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
              <MainInput
                type="text"
                label="Username"
                name="username"
                placeholder="Enter username"
              />
              <MainInput
                type="email"
                label="Email"
                name="email"
                placeholder="Enter email"
              />

              <MainPassword
                name="password"
                label="Password"
                type="password"
                placeholder=" Enter Password"
              />
              <MainPassword
                name="confirmPassword"
                label="Confirm password"
                type="password"
                placeholder="Re-enter password"
              />

              {error && <p className="text-[#F00] mt-1 text-[13px]">{error}</p>}

              <Button
                className="w-full mt-[30px] submit-button"
                htmlType="submit"
              >
                {isLoading || loading ? <ButtonLoadingAnimation /> : "Sign up"}
              </Button>
            </Form>
          </FormProvider>
        </div>
        <p className="text-center mt-4">
          Have an account?
          <Link to="/login">
            <span className="text-blue-primary">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
