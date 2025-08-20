import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  Flag,
  Target,
  Award,
  RotateCcw
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizProps {
  questions?: Question[];
  subject?: string;
  onComplete: (score: number, results: any) => void;
  onBack: () => void;
}

const Quiz = ({ questions: propQuestions, subject = "Mixed Topics", onComplete, onBack }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultQuestions: Question[] = [
    {
      id: 1,
      question: "What is the primary function of mitochondria in a cell?",
      options: [
        "Protein synthesis",
        "Energy production (ATP synthesis)",
        "DNA replication",
        "Waste disposal"
      ],
      correctAnswer: 1,
      explanation: "Mitochondria are known as the 'powerhouses' of the cell because they produce ATP through cellular respiration.",
      difficulty: 'medium'
    },
    {
      id: 2,
      question: "Which of the following is NOT a renewable energy source?",
      options: [
        "Solar power",
        "Wind power",
        "Natural gas",
        "Hydroelectric power"
      ],
      correctAnswer: 2,
      explanation: "Natural gas is a fossil fuel and therefore not renewable. Solar, wind, and hydroelectric power are all renewable energy sources.",
      difficulty: 'easy'
    },
    {
      id: 3,
      question: "What is the time complexity of binary search algorithm?",
      options: [
        "O(n)",
        "O(log n)",
        "O(n²)",
        "O(1)"
      ],
      correctAnswer: 1,
      explanation: "Binary search has O(log n) time complexity because it eliminates half of the remaining elements in each step.",
      difficulty: 'hard'
    },
    {
      id: 4,
      question: "Which planet is known as the 'Red Planet'?",
      options: [
        "Venus",
        "Jupiter",
        "Mars",
        "Saturn"
      ],
      correctAnswer: 2,
      explanation: "Mars is called the 'Red Planet' due to iron oxide (rust) on its surface, which gives it a reddish appearance.",
      difficulty: 'easy'
    },
    {
      id: 5,
      question: "What is the derivative of sin(x)?",
      options: [
        "cos(x)",
        "-cos(x)",
        "tan(x)",
        "-sin(x)"
      ],
      correctAnswer: 0,
      explanation: "The derivative of sin(x) with respect to x is cos(x). This is a fundamental derivative in calculus.",
      difficulty: 'medium'
    }
  ];

  const questions = propQuestions || defaultQuestions;

  useEffect(() => {
    setSelectedAnswers(new Array(questions.length).fill(null));
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Calculate results
    let score = 0;
    const results = questions.map((question, index) => {
      const userAnswer = selectedAnswers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) score++;
      
      return {
        question: question.question,
        userAnswer: userAnswer !== null ? question.options[userAnswer] : "Not answered",
        correctAnswer: question.options[question.correctAnswer],
        isCorrect,
        explanation: question.explanation,
        difficulty: question.difficulty
      };
    });

    const finalScore = Math.round((score / questions.length) * 100);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onComplete(finalScore, results);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredQuestions = selectedAnswers.filter(answer => answer !== null).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Quiz Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-foreground">{subject} Quiz</h1>
              <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-warning" />
                <span className={`font-mono font-bold ${timeLeft < 300 ? 'text-destructive' : 'text-foreground'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
                Exit Quiz
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">
                {answeredQuestions}/{questions.length} answered
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Question Content */}
            <div className="lg:col-span-3">
              <Card className="shadow-quiz">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={
                      questions[currentQuestion].difficulty === 'easy' ? 'secondary' :
                      questions[currentQuestion].difficulty === 'medium' ? 'default' : 'destructive'
                    }>
                      {questions[currentQuestion].difficulty.toUpperCase()}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="h-4 w-4" />
                      Question {currentQuestion + 1}
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-relaxed">
                    {questions[currentQuestion].question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={selectedAnswers[currentQuestion]?.toString() || ""}
                    onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                  >
                    <div className="space-y-4">
                      {questions[currentQuestion].options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label 
                            htmlFor={`option-${index}`} 
                            className="flex-1 cursor-pointer font-medium text-foreground"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious} 
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex gap-3">
                  {currentQuestion === questions.length - 1 ? (
                    <Button 
                      variant="hero" 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="min-w-32"
                    >
                      {isSubmitting ? (
                        <>
                          <RotateCcw className="h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Flag className="h-4 w-4" />
                          Submit Quiz
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button 
                      variant="default" 
                      onClick={handleNext}
                      disabled={currentQuestion === questions.length - 1}
                    >
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Question Navigator */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Questions</CardTitle>
                  <CardDescription>Click to jump to any question</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {questions.map((_, index) => (
                      <Button
                        key={index}
                        variant={currentQuestion === index ? "default" : "outline"}
                        size="sm"
                        className={`h-10 w-10 p-0 ${
                          selectedAnswers[index] !== null ? 'ring-2 ring-success ring-offset-2' : ''
                        }`}
                        onClick={() => setCurrentQuestion(index)}
                      >
                        {selectedAnswers[index] !== null ? (
                          <CheckCircle className="h-4 w-4 text-success" />
                        ) : (
                          index + 1
                        )}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quiz Info */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Quiz Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Questions</span>
                    <span className="font-medium">{questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Time Limit</span>
                    <span className="font-medium">15 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Completed</span>
                    <span className="font-medium">{answeredQuestions}/{questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Passing Score</span>
                    <span className="font-medium">70%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;