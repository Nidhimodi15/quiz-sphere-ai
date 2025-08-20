import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Auth from "@/components/Auth";
import Dashboard from "@/components/Dashboard";
import Quiz from "@/components/Quiz";
import Results from "@/components/Results";
import QuizGenerator from "@/components/QuizGenerator";
import FacultyDashboard from "@/components/FacultyDashboard";

type AppState = 'landing' | 'auth' | 'dashboard' | 'faculty-dashboard' | 'quiz-generator' | 'quiz' | 'results';

interface User {
  id: number;
  name: string;
  email: string;
  userType: 'student' | 'faculty';
  avatar: string;
  stats: any;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<AppState>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizResults, setQuizResults] = useState<any>(null);
  const [currentQuestions, setCurrentQuestions] = useState<any[]>([]);
  const [currentSubject, setCurrentSubject] = useState<string>("Mixed Topics");

  const handleLogin = (userType: 'student' | 'faculty', userData: User) => {
    setUser(userData);
    if (userType === 'faculty') {
      setCurrentView('faculty-dashboard');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleStartQuiz = () => {
    setCurrentView('quiz');
  };

  const handleCreateQuiz = () => {
    setCurrentView('quiz-generator');
  };

  const handleQuizGenerated = (questions: any[]) => {
    setCurrentQuestions(questions);
    setCurrentSubject(questions[0]?.subject || "Generated Quiz");
    setCurrentView('quiz');
  };

  const handleQuizComplete = (score: number, results: any) => {
    setQuizScore(score);
    setQuizResults(results);
    setCurrentView('results');
  };

  const handleRetakeQuiz = () => {
    setCurrentView('quiz');
  };

  const handleBackToDashboard = () => {
    if (user?.userType === 'faculty') {
      setCurrentView('faculty-dashboard');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleGetStarted = () => {
    setCurrentView('auth');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setUser(null);
    setQuizResults(null);
  };

  // Landing Page
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-background">
        <Header onGetStarted={handleGetStarted} />
        <Hero onGetStarted={handleGetStarted} />
        <Features />
        <Footer />
      </div>
    );
  }

  // Authentication
  if (currentView === 'auth') {
    return <Auth onLogin={handleLogin} />;
  }

  // Dashboard
  if (currentView === 'dashboard' && user) {
    return (
      <Dashboard 
        user={user} 
        onStartQuiz={handleStartQuiz}
        onCreateQuiz={handleCreateQuiz}
      />
    );
  }

  // Faculty Dashboard
  if (currentView === 'faculty-dashboard' && user) {
    return (
      <FacultyDashboard 
        user={user} 
        onCreateQuiz={handleCreateQuiz}
        onBack={handleBackToDashboard}
      />
    );
  }

  // Quiz Generator
  if (currentView === 'quiz-generator') {
    return (
      <QuizGenerator 
        onQuizGenerated={handleQuizGenerated}
        onBack={handleBackToDashboard}
      />
    );
  }

  // Quiz Taking
    if (currentView === 'quiz') {
      return (
        <Quiz 
          questions={currentQuestions.length > 0 ? currentQuestions : undefined}
          subject={currentSubject}
          onComplete={handleQuizComplete}
          onBack={handleBackToDashboard}
        />
      );
    }

  // Results
  if (currentView === 'results') {
    return (
      <Results 
        score={quizScore}
        results={quizResults}
        subject={currentSubject}
        onRetakeQuiz={handleRetakeQuiz}
        onBackToDashboard={handleBackToDashboard}
      />
    );
  }

  return null;
};

export default Index;
