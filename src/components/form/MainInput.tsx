/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  defaulValue?: any;
};
const MainInput = ({
  name,
  type,
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
                style={{ margin: 0, padding: 0 }}
                className={` ${
                  error ? "text-[#F00]" : "text-black-softlight"
                } text-[12px] font-semibold`}
              >
                {label}
              </label>
            }
          >
            <Input
              {...field}
              placeholder={placeholder}
              defaultValue={defaulValue}
              type={type}
              id={name}
              disabled={disabled}
              className={`MainInput ${
                error
                  ? "border-[#F00] hover:border-[#F00] focus:border-[#F00]"
                  : "border-none"
              } `}
            ></Input>
            {error && (
              <div className="flex-start gap-1 mt-[5px]">
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

export default MainInput;
