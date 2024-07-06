/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { useAddCommentMutation } from "../../../redux/features/comment/commentApi";
import { showRightTopAlert } from "../../ui/Alert/ShowRightToAlert";
import MainForm from "../../form/MainForm";
import MainCommentBox from "../../form/MainCommentBox";
import { Button } from "antd";
import { commentDataSchema } from "../../../type/CommentType";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonLoadingAnimation from "../../ui/Animation/ButtonAnimation";

const CommentBox = () => {
  const [addComment, { isLoading }] = useAddCommentMutation();

  const handleSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const { comment } = data;

    try {
      const response = await addComment({ comment });

      if ("data" in response) {
        showRightTopAlert("success", "Success", `${response.data.message}`);
      } else {
        showRightTopAlert(
          "error",
          "Error",
          "Failed to Add Comment, please try again."
        );
      }
    } catch (error: any) {
      showRightTopAlert(
        "error",
        `${error.data.message}`,
        "Failed to Add Comment, please try again."
      );
    }
  };
  return (
    <div className=" bg-[#111827] text-slate-50">
      <MainForm
        onSubmit={handleSubmit}
        resolver={zodResolver(commentDataSchema)}
      >
        <MainCommentBox
          name={"comment"}
          label={"Add Comment"}
          placeholder="Write Your Comment..."
        />
        <Button
          htmlType="submit"
          className={`inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800`}
        >
          {isLoading ? <ButtonLoadingAnimation /> : "Add Comment"}
        </Button>
      </MainForm>
    </div>
  );
};

export default CommentBox;
