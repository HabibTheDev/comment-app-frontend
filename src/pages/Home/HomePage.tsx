import CommentBox from "../../components/layout/CommentBox/CommentBox";
import CommentSection from "../../components/layout/CommentBox/CommentSection";

const HomePage = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments (20)
          </h2>
        </div>
        <CommentBox />
        <CommentSection />
      </div>
    </section>
  );
};

export default HomePage;
