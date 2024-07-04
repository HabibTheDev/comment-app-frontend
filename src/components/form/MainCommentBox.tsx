/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import InfoIcon from "../ui/Icon/InfoIcon";

const { TextArea } = Input;

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
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={
              <label
                className={`${
                  error ? "text-[#F00]" : "text-slate-50"
                } text-[12px] font-semibold`}
              >
                {label}
              </label>
            }
          >
            <TextArea
              rows={4}
              {...field}
              placeholder={placeholder}
              defaultValue={defaulValue}
              id={name}
              disabled={disabled}
              className={`px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800 ${
                error
                  ? "border-[#F00] hover:border-[#F00] focus:border-[#F00]"
                  : "border-gray-200 border-2"
              }`}
              style={{
                backgroundColor: "#1F2937",
                transition: "border-color 0.2s ease-in-out",
                padding: "10px 15px",
              }}
            />
            {error && (
              <div className="flex items-start gap-1 mt-[5px]">
                <InfoIcon size="18" fill="#F00" />
                <small className="text-[#F00] text-[12px] font-normal">
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
