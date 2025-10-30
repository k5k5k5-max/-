
import React, { useState, useCallback, useMemo } from 'react';
import { QUESTIONS } from './constants';
import type { QuizState } from './types';
import StartScreen from './components/StartScreen';
import QuestionCard from './components/QuestionCard';
import ResultsCard from './components/ResultsCard';
import ProgressBar from './components/ProgressBar';

const App: React.FC = () => {
  // --- CHANGE: Set initial state to 'results' to show the final page directly
  const [quizState, setQuizState] = useState<QuizState>('results');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // --- CHANGE: Added dummy data to populate the results page for preview
  const [answers, setAnswers] = useState([
      { questionIndex: 0, score: 3 },
      { questionIndex: 1, score: 2 },
      { questionIndex: 2, score: 3 },
      { questionIndex: 3, score: 3 },
      { questionIndex: 4, score: 2 },
      { questionIndex: 5, score: 3 },
      { questionIndex: 6, score: 3 },
      { questionIndex: 7, score: 2 },
      { questionIndex: 8, score: 3 },
      { questionIndex: 9, score: 2 },
      { questionIndex: 10, score: 3 },
      { questionIndex: 11, score: 3 },
      { questionIndex: 12, score: 2 },
  ]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswerScore, setSelectedAnswerScore] = useState<number | null>(null);

  const handleStartQuiz = useCallback(() => {
    setQuizState('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowAnswer(false);
    setSelectedAnswerScore(null);
  }, []);

  const handleAnswer = useCallback((answerScore: number) => {
    setSelectedAnswerScore(answerScore);
    setShowAnswer(true);

    setTimeout(() => {
      setAnswers(prevAnswers => [...prevAnswers, { questionIndex: currentQuestionIndex, score: answerScore }]);
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        setQuizState('results');
      }
      setShowAnswer(false);
      setSelectedAnswerScore(null);
    }, 1500); // Wait 1.5 seconds to show feedback before moving to the next question
  }, [currentQuestionIndex]);

  const handleRestartQuiz = useCallback(() => {
    setQuizState('start');
  }, []);

  const currentQuestion = useMemo(() => QUESTIONS[currentQuestionIndex], [currentQuestionIndex]);

  const renderContent = () => {
    switch (quizState) {
      case 'quiz':
        return (
          <div className="w-full max-w-3xl mx-auto">
            <ProgressBar current={currentQuestionIndex + 1} total={QUESTIONS.length} />
            <QuestionCard
              key={currentQuestionIndex}
              question={currentQuestion}
              onAnswer={handleAnswer}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={QUESTIONS.length}
              showAnswer={showAnswer}
              selectedAnswerScore={selectedAnswerScore}
            />
          </div>
        );
      case 'results':
        return <ResultsCard answers={answers} totalQuestions={QUESTIONS.length} onRestart={handleRestartQuiz} />;
      case 'start':
      default:
        return <StartScreen onStart={handleStartQuiz} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 text-slate-800 transition-colors duration-500">
      <main className="w-full">
        {renderContent()}
      </main>
      <footer className="text-center text-sm text-slate-500 mt-8">
        <p>&copy; 2024 Client Work Skills Diagnosis Quiz</p>
      </footer>
    </div>
  );
};

export default App;
