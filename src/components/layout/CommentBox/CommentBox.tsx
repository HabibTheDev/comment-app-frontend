import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { useAddCommentMutation } from "../../../redux/features/comment/commentApi";
import { showRightTopAlert } from "../../ui/Alert/ShowRightToAlert";
import MainForm from "../../form/MainForm";
import MainCommentBox from "../../form/MainCommentBox";
import { Button } from "antd";
import { commentDataSchema } from "../../../type/CommentType";
import { zodResolver } from "@hookform/resolvers/zod";

const CommentBox = () => {
  const [addComment] = useAddCommentMutation();

  const handleSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const { comment } = data;

    try {
      const response = await addComment({
        comment: comment,
      });

      if ("data" in response) {
        showRightTopAlert("success", "Success", `${response.data.message}`);
      } else {
        showRightTopAlert(
          "error",
          "Error",
          "Failed to Add Comment, please try again."
        );
      }
    } catch (error) {
      showRightTopAlert("error", "Error", "Failed to Add Comment, try again.");
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
          Add Comment
          {/* {isLoading ? <ButtonLoadingAnimation /> : "Add Comment"} */}
        </Button>
      </MainForm>
    </div>
  );
};

export default CommentBox;
