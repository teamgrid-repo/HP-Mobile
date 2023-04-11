import { Leaf } from "src/shared";

interface Props {
  title: string;
  description?: string;
}

const QuizHeader = ({ title, description = "" }: Props) => {
  return (
    <div className="quiz-header">
      <div className="quiz-header-text">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <img className="quiz-header-img" src={Leaf} />
    </div>
  );
};

export default QuizHeader;
