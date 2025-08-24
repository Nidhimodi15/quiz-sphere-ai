import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Trophy, 
  Target, 
  CheckCircle, 
  XCircle, 
  Award,
  TrendingUp,
  RotateCcw,
  Share2,
  Download,
  ArrowLeft,
  BookOpen,
  Clock,
  Star
} from "lucide-react";

const Results = ({ score, results, subject = "Mixed Topics", onRetakeQuiz, onBackToDashboard }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const correctAnswers = results.filter(r => r.isCorrect).length;
  const totalQuestions = results.length;
  const accuracy = (correctAnswers / totalQuestions) * 100;
  
  const getScoreColor = (score) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadge = (score) => {
    if (score >= 90) return { text: "Excellent!", variant: "default", icon: Trophy };
    if (score >= 80) return { text: "Great Job!", variant: "secondary", icon: Award };
    if (score >= 70) return { text: "Good Work!", variant: "secondary", icon: Target };
    return { text: "Keep Practicing!", variant: "destructive", icon: TrendingUp };
  };

  const badge = getScoreBadge(score);
  const BadgeIcon = badge.icon;

  const difficultyStats = {
    easy: results.filter(r => r.difficulty === 'easy').length,
    medium: results.filter(r => r.difficulty === 'medium').length,
    hard: results.filter(r => r.difficulty === 'hard').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">Quiz Results</h1>
              <p className="text-sm text-muted-foreground">{subject} Quiz</p>
            </div>
            <Button variant="outline" onClick={onBackToDashboard}>
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Score Overview */}
          <Card className="text-center shadow-quiz">
            <CardHeader className="pb-6">
              <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mb-4">
                <BadgeIcon className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl mb-2">
                <span className={`${getScoreColor(score)} font-bold`}>{score}%</span>
              </CardTitle>
              <Badge variant={badge.variant} className="text-base px-4 py-1">
                {badge.text}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{correctAnswers}</div>
                  <p className="text-sm text-muted-foreground">Correct Answers</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-destructive">{totalQuestions - correctAnswers}</div>
                  <p className="text-sm text-muted-foreground">Incorrect Answers</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{totalQuestions}</div>
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Accuracy</span>
                  <span className="text-sm font-medium">{accuracy.toFixed(1)}%</span>
                </div>
                <Progress value={accuracy} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Performance Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Performance by Difficulty
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(['easy', 'medium', 'hard']).map((difficulty) => {
                  const difficultyResults = results.filter(r => r.difficulty === difficulty);
                  const correct = difficultyResults.filter(r => r.isCorrect).length;
                  const total = difficultyResults.length;
                  const percentage = total > 0 ? (correct / total) * 100 : 0;

                  return (
                    <div key={difficulty}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            difficulty === 'easy' ? 'secondary' :
                            difficulty === 'medium' ? 'default' : 'destructive'
                          }>
                            {difficulty.toUpperCase()}
                          </Badge>
                          <span className="text-sm">{correct}/{total}</span>
                        </div>
                        <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary">Quiz Completed</h4>
                      <p className="text-sm text-muted-foreground">Successfully finished {subject} quiz</p>
                    </div>
                  </div>
                  
                  {score >= 80 && (
                    <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                      <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                        <Star className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-success">Excellent Performance</h4>
                        <p className="text-sm text-muted-foreground">Scored 80% or higher</p>
                      </div>
                    </div>
                  )}

                  <div className="text-center pt-4 border-t">
                    <p className="text-sm font-medium text-foreground">
                      Points Earned: {Math.round(score * 2)}
                    </p>
                    <p className="text-xs text-muted-foreground">Based on quiz performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" onClick={onRetakeQuiz} className="min-w-40">
              <RotateCcw className="h-4 w-4" />
              Retake Quiz
            </Button>
            <Button variant="outline" onClick={() => setShowDetails(!showDetails)}>
              <BookOpen className="h-4 w-4" />
              {showDetails ? 'Hide' : 'Show'} Detailed Review
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Quiz Results - ${subject}`,
                    text: `I scored ${score}% on the ${subject} quiz! ${correctAnswers}/${totalQuestions} correct answers.`,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(`I scored ${score}% on the ${subject} quiz! ${correctAnswers}/${totalQuestions} correct answers.`);
                }
              }}
            >
              <Share2 className="h-4 w-4" />
              Share Results
            </Button>
            <Button 
              variant="ghost"
              onClick={() => {
                const printWindow = window.open('', '_blank');
                if (printWindow) {
                  printWindow.document.write(`
                    <html>
                      <head>
                        <title>Quiz Results - ${subject}</title>
                        <style>
                          body { font-family: Arial, sans-serif; margin: 20px; }
                          .header { text-align: center; margin-bottom: 30px; }
                          .score { font-size: 24px; font-weight: bold; color: #2563eb; }
                          .question { margin: 20px 0; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px; }
                          .correct { background-color: #f0fdf4; }
                          .incorrect { background-color: #fef2f2; }
                          .question-title { font-weight: bold; margin-bottom: 10px; }
                          .answer { margin: 5px 0; }
                          .explanation { margin-top: 10px; font-style: italic; color: #6b7280; }
                        </style>
                      </head>
                      <body>
                        <div class="header">
                          <h1>${subject} Quiz Results</h1>
                          <div class="score">Score: ${score}%</div>
                          <p>Correct Answers: ${correctAnswers}/${totalQuestions}</p>
                        </div>
                        ${results.map((result, index) => `
                          <div class="question ${result.isCorrect ? 'correct' : 'incorrect'}">
                            <div class="question-title">Question ${index + 1}: ${result.question}</div>
                            <div class="answer">Your Answer: ${result.userAnswer}</div>
                            ${!result.isCorrect ? `<div class="answer">Correct Answer: ${result.correctAnswer}</div>` : ''}
                            <div class="explanation">Explanation: ${result.explanation}</div>
                          </div>
                        `).join('')}
                      </body>
                    </html>
                  `);
                  printWindow.document.close();
                  printWindow.print();
                }
              }}
            >
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>

          {/* Detailed Results */}
          {showDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Detailed Review
                </CardTitle>
                <CardDescription>
                  Review each question with explanations to improve your understanding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {results.map((result, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          result.isCorrect ? 'bg-success text-white' : 'bg-destructive text-white'
                        }`}>
                          {result.isCorrect ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-foreground">Question {index + 1}</h4>
                            <Badge variant={
                              result.difficulty === 'easy' ? 'secondary' :
                              result.difficulty === 'medium' ? 'default' : 'destructive'
                            }>
                              {result.difficulty}
                            </Badge>
                          </div>
                          <p className="text-foreground mb-3">{result.question}</p>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Your answer:</span>
                              <span className={result.isCorrect ? 'text-success font-medium' : 'text-destructive font-medium'}>
                                {result.userAnswer}
                              </span>
                            </div>
                            {!result.isCorrect && (
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Correct answer:</span>
                                <span className="text-success font-medium">{result.correctAnswer}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              <strong>Explanation:</strong> {result.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                      {index < results.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;