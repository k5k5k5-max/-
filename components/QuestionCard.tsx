import React from 'react';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (score: number) => void;
  questionNumber: number;
  totalQuestions: number;
  showAnswer: boolean;
  selectedAnswerScore: number | null;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  showAnswer,
  selectedAnswerScore,
  questionNumber,
}) => {

  const getButtonClass = (answerScore: number) => {
    if (!showAnswer) {
      return 'bg-white hover:bg-indigo-50 focus:bg-indigo-100 border-slate-300';
    }
    if (answerScore === selectedAnswerScore) {
      if (answerScore === 3) {
        return 'bg-green-500 border-green-600 text-white'; // Best answer
      } else if (answerScore === 2) {
        return 'bg-yellow-400 border-yellow-500 text-white'; // Good answer
      } else {
        return 'bg-orange-400 border-orange-500 text-white'; // Okay answer
      }
    }
    return 'bg-slate-200 border-slate-300 text-slate-500 cursor-not-allowed';
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-800 leading-relaxed">
        {/* Fixed: Use the questionNumber prop instead of non-existent question.questionNumber. */}
        <span className="text-indigo-600 font-black mr-2">Q{questionNumber}.</span>
        {question.text}
      </h2>
      <div className="space-y-4">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer.score)}
            disabled={showAnswer}
            className={`w-full text-left p-4 md:p-5 rounded-lg border-2 transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-indigo-300 ${getButtonClass(answer.score)} ${!showAnswer ? 'hover:scale-105 hover:shadow-md' : ''}`}
          >
            <span className="font-bold text-lg mr-4">{answer.label}.</span>
            <span>{answer.text}</span>
          </button>
        ))}
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default QuestionCard;
