/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { setUser, TUser } from "../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../../redux/hook";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoginUserMutation } from "../../../redux/features/auth/authApi";
import { loginUserSchema } from "../../../type/loginType";
import { toast } from "sonner";
import { Button, Form } from "antd";
import MainInput from "../../form/MainInput";
import MainPassword from "../../form/MainPassword";
import ButtonLoadingAnimation from "../../ui/Animation/ButtonAnimation";

const LoginForm = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const methods = useForm({ resolver: zodResolver(loginUserSchema) });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loginInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      setLoading(true);
      const res = await loginUser(loginInfo).unwrap();
      if (res) {
        if (res?.data?.accessToken) {
          const user = verifyToken(res?.data?.accessToken) as TUser;
          const saveUser = {
            user,
            token: res?.data?.accessToken,
          };

          dispatch(setUser(saveUser));
          navigate(`/${(user as TUser)?.role}/home`, { replace: true });
          methods.reset();
          setLoading(false);
        }
      }
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error.data.message}`);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="w-[380px]">
        <h1 className="text-3xl text-black-primary font-bold text-center mb-8">
          Login
        </h1>
        <div>
          <FormProvider {...methods}>
            <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
              <MainInput
                type="email"
                label="Email"
                name="email"
                placeholder="Enter email"
              ></MainInput>
              <MainPassword
                name="password"
                label="Password"
                type="password"
                placeholder="Enter password"
              ></MainPassword>

              <Button className="w-full mt-10 submit-button" htmlType="submit">
                {loading || isLoading ? <ButtonLoadingAnimation /> : "Login"}
              </Button>
            </Form>
          </FormProvider>
        </div>
        <p className="text-center mt-5 fontWeight-semiboald text-14">
          Don’t have an account?
          <Link to="/sign-up">
            <span className="text-blue-primary">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
