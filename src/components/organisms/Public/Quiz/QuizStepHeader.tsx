import { Leaf } from "src/shared";

interface Props {
  title: string;
  description?: string;
}

const QuizStepHeader = ({ title, description = "" }: Props) => {
  return (
    <div className="quiz-step-header">
      <div className="quiz-step-header-text">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default QuizStepHeader;
