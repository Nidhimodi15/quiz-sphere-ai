import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  FileText,
  Search,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FacultyDashboard = ({ user, onCreateQuiz, onBack }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const quizzes = [
    {
      id: 1,
      title: "Introduction to Algebra",
      subject: "Mathematics",
      questions: 15,
      attempts: 45,
      avgScore: 78,
      created: "2024-01-15",
      status: "active"
    },
    {
      id: 2,
      title: "Chemical Reactions",
      subject: "Chemistry",
      questions: 20,
      attempts: 32,
      avgScore: 82,
      created: "2024-01-12",
      status: "active"
    },
    {
      id: 3,
      title: "World War II History",
      subject: "History",
      questions: 25,
      attempts: 28,
      avgScore: 75,
      created: "2024-01-10",
      status: "draft"
    }
  ];

  const students = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      lastActive: "2024-01-16",
      quizzesCompleted: 12,
      avgScore: 85,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=JS"
    },
    {
      id: 2,
      name: "Emma Wilson",
      email: "emma@example.com",
      lastActive: "2024-01-15",
      quizzesCompleted: 8,
      avgScore: 92,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=EW"
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael@example.com",
      lastActive: "2024-01-14",
      quizzesCompleted: 15,
      avgScore: 78,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=MC"
    }
  ];

  const recentSubmissions = [
    {
      id: 1,
      studentName: "John Smith",
      quiz: "Introduction to Algebra",
      score: 85,
      submittedAt: "2024-01-16 14:30",
      timeSpent: "12 min"
    },
    {
      id: 2,
      studentName: "Emma Wilson",
      quiz: "Chemical Reactions",
      score: 92,
      submittedAt: "2024-01-16 13:45",
      timeSpent: "18 min"
    },
    {
      id: 3,
      studentName: "Michael Chen",
      quiz: "Introduction to Algebra",
      score: 78,
      submittedAt: "2024-01-16 11:20",
      timeSpent: "15 min"
    }
  ];

  const subjects = ["Mathematics", "Science", "History", "English", "Computer Science"];

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
                <h1 className="text-xl font-bold text-foreground">Faculty Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="hero" onClick={onCreateQuiz}>
                <Plus className="h-4 w-4" />
                Create Quiz
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4" />
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quizzes">My Quizzes</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-card transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Quizzes
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">24</div>
                  <p className="text-xs text-success">+3 this month</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-card transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Students
                  </CardTitle>
                  <Users className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">156</div>
                  <p className="text-xs text-success">+12 new this week</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-card transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Submissions
                  </CardTitle>
                  <FileText className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">1,248</div>
                  <p className="text-xs text-warning">+89 today</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-card transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Avg Score
                  </CardTitle>
                  <Award className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">82%</div>
                  <p className="text-xs text-accent">+5% improvement</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Quizzes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Recent Quizzes
                  </CardTitle>
                  <CardDescription>Your recently created quizzes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quizzes.slice(0, 3).map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{quiz.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {quiz.subject} • {quiz.questions} questions
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={quiz.status === 'active' ? 'default' : 'secondary'}>
                            {quiz.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Submissions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Submissions
                  </CardTitle>
                  <CardDescription>Latest quiz submissions from students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSubmissions.map((submission) => (
                      <div key={submission.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div>
                          <h4 className="font-medium text-foreground">{submission.studentName}</h4>
                          <p className="text-sm text-muted-foreground">{submission.quiz}</p>
                          <p className="text-xs text-muted-foreground">{submission.submittedAt}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={submission.score >= 80 ? 'default' : submission.score >= 60 ? 'secondary' : 'destructive'}>
                            {submission.score}%
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{submission.timeSpent}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-6">
            {/* Quiz Management Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Quiz Management</h2>
                <p className="text-muted-foreground">Create, edit, and manage your quizzes</p>
              </div>
              <Button variant="hero" onClick={onCreateQuiz}>
                <Plus className="h-4 w-4" />
                Create New Quiz
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search quizzes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject.toLowerCase()}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quiz List */}
            <div className="grid gap-4">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="hover:shadow-card transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{quiz.title}</h3>
                          <Badge variant={quiz.status === 'active' ? 'default' : 'secondary'}>
                            {quiz.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Subject:</span> {quiz.subject}
                          </div>
                          <div>
                            <span className="font-medium">Questions:</span> {quiz.questions}
                          </div>
                          <div>
                            <span className="font-medium">Attempts:</span> {quiz.attempts}
                          </div>
                          <div>
                            <span className="font-medium">Avg Score:</span> {quiz.avgScore}%
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Created: {quiz.created}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Student Management</h2>
                <p className="text-muted-foreground">View and manage student progress</p>
              </div>
            </div>

            {/* Student List */}
            <div className="grid gap-4">
              {students.map((student) => (
                <Card key={student.id} className="hover:shadow-card transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                          <p className="text-xs text-muted-foreground">Last active: {student.lastActive}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6 text-center">
                        <div>
                          <div className="text-2xl font-bold text-foreground">{student.quizzesCompleted}</div>
                          <p className="text-xs text-muted-foreground">Quizzes</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-success">{student.avgScore}%</div>
                          <p className="text-xs text-muted-foreground">Avg Score</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Analytics & Reports</h2>
              <p className="text-muted-foreground">Track performance and engagement metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">This Week</span>
                      <span className="font-medium text-success">+15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">This Month</span>
                      <span className="font-medium text-success">+8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Overall</span>
                      <span className="font-medium text-primary">82%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Subject Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjects.slice(0, 4).map((subject) => (
                      <div key={subject} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{subject}</span>
                        <Badge variant="secondary">
                          {Math.floor(Math.random() * 20) + 70}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Student Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Daily Active</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Weekly Active</span>
                      <span className="font-medium">128</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Monthly Active</span>
                      <span className="font-medium">156</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FacultyDashboard;