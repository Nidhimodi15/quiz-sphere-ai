import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp, 
  Award,
  PlayCircle,
  CheckCircle,
  Calendar,
  BarChart3,
  Plus
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  userType: 'student' | 'faculty';
  avatar: string;
  stats: any;
}

interface DashboardProps {
  user: User;
  onStartQuiz: () => void;
  onCreateQuiz?: () => void;
}

const Dashboard = ({ user, onStartQuiz, onCreateQuiz }: DashboardProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects = [
    { name: "Mathematics", icon: "📊", quizzes: 45, color: "bg-blue-500" },
    { name: "Science", icon: "🔬", quizzes: 38, color: "bg-green-500" },
    { name: "History", icon: "📚", quizzes: 22, color: "bg-yellow-500" },
    { name: "English", icon: "📝", quizzes: 31, color: "bg-purple-500" },
    { name: "Computer Science", icon: "💻", quizzes: 28, color: "bg-red-500" },
    { name: "Geography", icon: "🌍", quizzes: 19, color: "bg-indigo-500" }
  ];

  const recentQuizzes = [
    { id: 1, title: "Algebra Basics", subject: "Mathematics", score: 85, date: "2024-01-15", status: "completed" },
    { id: 2, title: "Chemical Reactions", subject: "Science", score: 92, date: "2024-01-14", status: "completed" },
    { id: 3, title: "World War II", subject: "History", score: 78, date: "2024-01-13", status: "completed" },
    { id: 4, title: "Programming Basics", subject: "Computer Science", score: null, date: "2024-01-16", status: "pending" }
  ];


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold text-foreground">Welcome back, {user.name}!</h1>
                <p className="text-sm text-muted-foreground capitalize">{user.userType} Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {user.userType === 'faculty' && onCreateQuiz && (
                <Button variant="hero" onClick={onCreateQuiz} className="hidden sm:flex">
                  <Plus className="h-4 w-4" />
                  Create Quiz
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4" />
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-card transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {user.userType === 'student' ? 'Quizzes Completed' : 'Quizzes Created'}
                </CardTitle>
                <BookOpen className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {user.userType === 'student' ? user.stats.quizzesCompleted : user.stats.quizzesCreated}
                </div>
                <p className="text-xs text-success">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-card transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Score
                </CardTitle>
                <Target className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {user.userType === 'student' ? user.stats.averageScore : user.stats.averageStudentScore}%
                </div>
                <p className="text-xs text-success">+5% improvement</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-card transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {user.userType === 'student' ? 'Current Streak' : 'Students Teaching'}
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {user.userType === 'student' ? `${user.stats.streak} days` : user.stats.studentsTeaching}
                </div>
                <p className="text-xs text-warning">Keep it up!</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-card transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Points
                </CardTitle>
                <Trophy className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">2,150</div>
                <p className="text-xs text-accent">Rank #4 globally</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Subjects Grid */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Available Subjects
                  </CardTitle>
                  <CardDescription>
                    Choose a subject to start practicing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {subjects.map((subject, index) => (
                      <Card 
                        key={index} 
                        className={`cursor-pointer transition-all duration-300 hover:shadow-card hover:-translate-y-1 ${
                          selectedSubject === subject.name ? 'ring-2 ring-primary shadow-quiz' : ''
                        }`}
                        onClick={() => {
                          setSelectedSubject(subject.name);
                          setTimeout(onStartQuiz, 500);
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-lg ${subject.color} flex items-center justify-center text-white text-xl`}>
                              {subject.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground">{subject.name}</h3>
                              <p className="text-sm text-muted-foreground">{subject.quizzes} quizzes available</p>
                            </div>
                            <PlayCircle className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentQuizzes.map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          {quiz.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5 text-success" />
                          ) : (
                            <Clock className="h-5 w-5 text-warning" />
                          )}
                          <div>
                            <h4 className="font-medium text-foreground">{quiz.title}</h4>
                            <p className="text-sm text-muted-foreground">{quiz.subject} • {quiz.date}</p>
                          </div>
                        </div>
                        {quiz.score && (
                          <Badge variant={quiz.score >= 85 ? 'default' : quiz.score >= 70 ? 'secondary' : 'destructive'}>
                            {quiz.score}%
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="quiz" className="w-full justify-start" onClick={onStartQuiz}>
                    <PlayCircle className="h-4 w-4" />
                    Take Random Quiz
                  </Button>
                  {user.userType === 'faculty' && onCreateQuiz && (
                    <Button variant="outline" className="w-full justify-start" onClick={onCreateQuiz}>
                      <Plus className="h-4 w-4" />
                      Create New Quiz
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;