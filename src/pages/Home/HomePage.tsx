import CommentBox from "../../components/layout/CommentBox/CommentBox";
import CommentSection from "../../components/layout/CommentBox/CommentSection";
import { selectTotalComments } from "../../redux/features/comment/commentSlice";

import { useAppSelector } from "../../redux/hook";

const HomePage = () => {
  const totalComments = useAppSelector(selectTotalComments);

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments ({totalComments})
          </h2>
        </div>
        <CommentBox />
        <CommentSection />
      </div>
    </section>
  );
};

export default HomePage;
