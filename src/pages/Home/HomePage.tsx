import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showRightTopAlert } from "../../components/ui/Alert/ShowRightToAlert";
import { commentDataSchema } from "../../type/CommentType";
import MainCommentBox from "../../components/form/MainCommentBox";
import MainForm from "../../components/form/MainForm";
import { useAddCommentMutation } from "../../redux/features/comment/commentApi";
import { Button } from "antd";

const HomePage = () => {
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
    <div className="p-10">
      <MainForm
        onSubmit={handleSubmit}
        resolver={zodResolver(commentDataSchema)}
      >
        <MainCommentBox name={"comment"} label={"Add Comment"} />
        <Button
          htmlType="submit"
          className={`bg-blue-primary h-[38px] px-[14px] py-[8px] text-white-primary`}
        >
          Add Comment
          {/* {isLoading ? <ButtonLoadingAnimation /> : "Add Comment"} */}
        </Button>
      </MainForm>
    </div>
  );
};

export default HomePage;
