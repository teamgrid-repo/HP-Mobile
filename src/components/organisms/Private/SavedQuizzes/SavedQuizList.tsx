import { useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import { SuspenseLoader } from "src/components/atoms";
import { loadingSelector } from "src/store/global";
import { GET_SAVED_QUIZZES_REQUEST, savedQuizzesBySortSelector } from "src/store/quiz";
import SavedQuizItem from "./SavedQuizItem";
import "./style.scss";

const SavedQuizList = () => {
  const savedQuizzes = useSelector(savedQuizzesBySortSelector);
  const loading = useSelector(loadingSelector(GET_SAVED_QUIZZES_REQUEST));

  return (
    <div className="saved-quiz-list">
      {loading ? (
        <SuspenseLoader />
      ) : savedQuizzes.length === 0 ? (
        <p className="text-center">No saved quiz data found!</p>
      ) : (
        <Virtuoso
          style={{ height: "100%" }}
          data={savedQuizzes}
          itemContent={(index, item) => {
            return <SavedQuizItem item={item} />;
          }}
        />
      )}
    </div>
  );
};

export default SavedQuizList;
