import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Auth from "@/components/Auth";
import Dashboard from "@/components/Dashboard";
import Quiz from "@/components/Quiz";
import Results from "@/components/Results";

type AppState = 'landing' | 'auth' | 'dashboard' | 'quiz' | 'results';

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
  const [quizResults, setQuizResults] = useState<any>(null);

  const handleLogin = (userType: 'student' | 'faculty', userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleStartQuiz = () => {
    setCurrentView('quiz');
  };

  const handleQuizComplete = (score: number, results: any) => {
    setQuizResults({ score, results });
    setCurrentView('results');
  };

  const handleRetakeQuiz = () => {
    setQuizResults(null);
    setCurrentView('quiz');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
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
        onCreateQuiz={user.userType === 'faculty' ? () => console.log('Create quiz') : undefined}
      />
    );
  }

  // Quiz Taking
  if (currentView === 'quiz') {
    return (
      <Quiz 
        onComplete={handleQuizComplete}
        onBack={handleBackToDashboard}
      />
    );
  }

  // Results
  if (currentView === 'results' && quizResults) {
    return (
      <Results 
        score={quizResults.score}
        results={quizResults.results}
        onRetakeQuiz={handleRetakeQuiz}
        onBackToDashboard={handleBackToDashboard}
      />
    );
  }

  return null;
};

export default Index;
