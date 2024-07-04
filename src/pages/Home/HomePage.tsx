import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showRightTopAlert } from "../../components/ui/Alert/ShowRightToAlert";
import { commentDataSchema } from "../../type/CommentType";
import MainCommentBox from "../../components/form/MainCommentBox";
import MainForm from "../../components/form/MainForm";

const HomePage = () => {
  const handleSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const { comment } = data;

    try {
      // Check if extrasData exists, then it's an update
      const response = await useAddComment({
        comment: comment,
      });

      if ("data" in response) {
        showRightTopAlert("success", "Success", `${response.data.message}`);
        // No need to increment plansCurrentStep or call handleNext for updating
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
      </MainForm>
    </div>
  );
};

export default HomePage;
