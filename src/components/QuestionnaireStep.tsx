import { questions } from '../config/questions';
import { Answers } from '../types';

interface QuestionnaireStepProps {
  answers: Answers;
  onAnswer: (questionId: string, value: number) => void;
}

export const QuestionnaireStep = ({ answers, onAnswer }: QuestionnaireStepProps) => (
  <div className="stack gap-lg">
    <div>
      <h3>Website Performance Questionnaire</h3>
      <p className="muted">Keep momentum: each answer sharpens your revenue loss estimate.</p>
    </div>
    {questions.map((question, index) => (
      <div key={question.id} className="question-card">
        <div className="question-head">
          <span>Q{index + 1}</span>
          <small>{question.category.toUpperCase()}</small>
        </div>
        <p>{question.prompt}</p>
        <div className="option-row">
          {question.options.map((option) => (
            <button
              key={option.label}
              className={answers[question.id] === option.value ? 'chip active' : 'chip'}
              onClick={() => onAnswer(question.id, option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>
);
