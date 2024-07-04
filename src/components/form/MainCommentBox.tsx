/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import InfoIcon from "../ui/Icon/InfoIcon";

type TInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  defaulValue?: any;
};
const MainCommentBox = ({
  name,
  label,
  disabled,
  defaulValue,
  placeholder,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <div style={{ width: "full" }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={
              <label
                className={`cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['00a0'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent ${
                  error ? "text-[#F00]" : "text-black-softlight"
                } text-[12px] font-semibold`}
              >
                {label}
              </label>
            }
          >
            <textarea
              rows={4}
              {...field}
              placeholder={placeholder}
              defaultValue={defaulValue}
              id={name}
              disabled={disabled}
              className={`relative w-full px-4 py-2 text-sm placeholder-transparent transition-all border-b outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${
                error
                  ? "border-[#F00] hover:border-[#F00] focus:border-[#F00]"
                  : "border-none"
              } `}
            ></textarea>
            {error && (
              <div className="flex-start gap-1 mt-[5px]">
                <InfoIcon size="18" fill="#F00"></InfoIcon>
                <small className="text-[#F00] text-[12px] text font-normal">
                  {error.message}
                </small>
              </div>
            )}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default MainCommentBox;
