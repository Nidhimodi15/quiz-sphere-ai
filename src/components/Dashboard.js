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

const Dashboard = ({ user, onStartQuiz, onCreateQuiz }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);

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
          {/* Enhanced Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Primary Stat - Large Feature Card */}
            <div className="md:col-span-2 xl:col-span-2">
              <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 hover:shadow-elegant transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-primary/20 backdrop-blur-sm">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-muted-foreground">
                            {user.userType === 'student' ? 'Learning Progress' : 'Teaching Impact'}
                          </h3>
                          <p className="text-3xl font-bold text-foreground">
                            {user.userType === 'student' ? user.stats.quizzesCompleted : user.stats.quizzesCreated}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-success" />
                          <span className="text-sm font-medium text-success">+12% improvement</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {user.userType === 'student' ? 'Quizzes completed this month' : 'New quizzes created'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Score Card */}
            <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-success/10 group-hover:bg-success/20 transition-colors">
                    <Target className="h-5 w-5 text-success" />
                  </div>
                  <Badge variant="secondary" className="text-xs">Performance</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-foreground">
                    {user.userType === 'student' ? user.stats.averageScore : user.stats.averageStudentScore}%
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-success h-1.5 rounded-full transition-all duration-500" 
                      style={{
                        width: `${user.userType === 'student' ? user.stats.averageScore : user.stats.averageStudentScore}%`
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Metric Card */}
            <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-warning/10 group-hover:bg-warning/20 transition-colors">
                    <Award className="h-5 w-5 text-warning" />
                  </div>
                  <Badge variant="outline" className="text-xs border-warning/20">Activity</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-foreground">
                    {user.userType === 'student' ? `${user.stats.streak}` : user.stats.studentsTeaching}
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">
                    {user.userType === 'student' ? 'Day Streak' : 'Students Teaching'}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-warning">
                    <div className="w-1 h-1 rounded-full bg-warning animate-pulse" />
                    <span>Keep it up!</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Stats - Spans full width on mobile */}
            <div className="md:col-span-2 xl:col-span-4">
              <Card className="bg-gradient-to-r from-accent/10 via-background to-primary/10 border-accent/20">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="space-y-2">
                      <div className="inline-flex p-3 rounded-full bg-primary/10">
                        <Trophy className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-2xl font-bold text-foreground">2,150</p>
                      <p className="text-sm text-muted-foreground">Total Points</p>
                    </div>
                    <div className="space-y-2">
                      <div className="inline-flex p-3 rounded-full bg-success/10">
                        <Award className="h-5 w-5 text-success" />
                      </div>
                      <p className="text-2xl font-bold text-foreground">#4</p>
                      <p className="text-sm text-muted-foreground">Global Rank</p>
                    </div>
                    <div className="space-y-2">
                      <div className="inline-flex p-3 rounded-full bg-warning/10">
                        <Clock className="h-5 w-5 text-warning" />
                      </div>
                      <p className="text-2xl font-bold text-foreground">45h</p>
                      <p className="text-sm text-muted-foreground">Study Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                  {onCreateQuiz && (
                    <Button variant="outline" className="w-full justify-start" onClick={onCreateQuiz}>
                      <Plus className="h-4 w-4" />
                      {user.userType === 'faculty' ? 'Create New Quiz' : 'Generate Quiz'}
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