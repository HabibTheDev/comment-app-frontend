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
    <div style={{ width: "full" }}>
      <Controller
        name={name}
        control={control}
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
            <TextArea
              rows={4}
              {...field}
              placeholder={placeholder}
              defaultValue={defaulValue}
              id={name}
              disabled={disabled}
              className={`fbinput ${
                error
                  ? "border-[#F00] hover:border-[#F00] focus:border-[#F00]"
                  : "border-red-100 border-2"
              } `}
            ></TextArea>
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
