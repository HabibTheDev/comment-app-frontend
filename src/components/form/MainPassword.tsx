/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import redInfo from "../../assets/myFleetAllsvg/redInfo.svg";
type TInputProps = {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  defaulValue?: any;
};
const MainPassword = ({
  name,
  type,
  label,
  disabled,
  defaulValue,
  placeholder,
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "8px", width: "full" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={
              <label
                className={` ${
                  error ? "text-[#F00]" : "text-black-softlight"
                } text-[12px] font-semibold`}
              >
                {label}
              </label>
            }
          >
            <Input.Password
              {...field}
              placeholder={placeholder}
              defaultValue={defaulValue}
              type={type}
              id={name}
              className={`fbinput ${
                error
                  ? "border-[#F00] hover:border-[#F00] focus:border-[#F00]"
                  : "border-none"
              } `}
              disabled={disabled}
            ></Input.Password>
            {error && (
              <div className="flex-start gap-1 mt-[5px]">
                <img src={redInfo} alt="" />
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

export default MainPassword;
