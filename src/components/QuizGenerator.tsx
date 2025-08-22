import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  Wand2, 
  BookOpen, 
  GraduationCap,
  Loader2,
  Plus,
  X
} from "lucide-react";

interface QuizGeneratorProps {
  onQuizGenerated: (questions: any[]) => void;
  onBack: () => void;
  user?: {
    userType: 'student' | 'faculty';
  };
}

const QuizGenerator = ({ onQuizGenerated, onBack, user }: QuizGeneratorProps) => {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [customQuestions, setCustomQuestions] = useState([{
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: ""
  }]);

  const grades = [
    "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
    "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
    "Grade 11", "Grade 12", "Undergraduate", "Graduate"
  ];

  const subjects = [
    "Mathematics", "Science", "Physics", "Chemistry", "Biology",
    "English", "History", "Geography", "Computer Science", "Economics",
    "Psychology", "Philosophy", "Art", "Music", "Physical Education"
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
    }
  };

  const generateFromPDF = async () => {
    if (!uploadedFile || !selectedGrade || !selectedSubject) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockQuestions = [
      {
        id: 1,
        question: `What is the main concept discussed in the ${selectedSubject} material for ${selectedGrade}?`,
        options: [
          "Concept A related to the document",
          "Concept B from the PDF content",
          "Concept C based on grade level",
          "Concept D appropriate for subject"
        ],
        correctAnswer: 1,
        explanation: `Based on the uploaded PDF content, this concept is fundamental for ${selectedGrade} students studying ${selectedSubject}.`,
        difficulty: 'medium' as const
      },
      {
        id: 2,
        question: `Which principle from the document best applies to ${selectedSubject} at ${selectedGrade} level?`,
        options: [
          "Basic principle A",
          "Advanced principle B",
          "Intermediate principle C",
          "Foundational principle D"
        ],
        correctAnswer: 2,
        explanation: "This principle aligns with the grade level and subject requirements as outlined in the PDF.",
        difficulty: 'medium' as const
      }
    ];
    
    setIsGenerating(false);
    onQuizGenerated(mockQuestions);
  };

  const generateFromText = async () => {
    if (!textContent.trim() || !selectedGrade || !selectedSubject) return;
    
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockQuestions = [
      {
        id: 1,
        question: `Based on the provided text about ${selectedSubject}, what is the key takeaway for ${selectedGrade} students?`,
        options: [
          "Key point A from the text",
          "Key point B relevant to grade",
          "Key point C from content",
          "Key point D subject-specific"
        ],
        correctAnswer: 0,
        explanation: `This key point is extracted from your text and is appropriate for ${selectedGrade} level ${selectedSubject} study.`,
        difficulty: 'medium' as const
      }
    ];
    
    setIsGenerating(false);
    onQuizGenerated(mockQuestions);
  };

  const addCustomQuestion = () => {
    setCustomQuestions([...customQuestions, {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: ""
    }]);
  };

  const removeCustomQuestion = (index: number) => {
    if (customQuestions.length > 1) {
      setCustomQuestions(customQuestions.filter((_, i) => i !== index));
    }
  };

  const updateCustomQuestion = (index: number, field: string, value: any) => {
    const updated = [...customQuestions];
    if (field === 'options') {
      updated[index].options = value;
    } else if (field === 'question') {
      updated[index].question = value;
    } else if (field === 'correctAnswer') {
      updated[index].correctAnswer = value;
    } else if (field === 'explanation') {
      updated[index].explanation = value;
    }
    setCustomQuestions(updated);
  };

  const createManualQuiz = () => {
    if (!selectedGrade || !selectedSubject) return;
    
    const validQuestions = customQuestions.filter(q => 
      q.question.trim() && 
      q.options.every(opt => opt.trim()) &&
      q.explanation.trim()
    );
    
    if (validQuestions.length === 0) return;
    
    const formattedQuestions = validQuestions.map((q, index) => ({
      id: index + 1,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: 'medium' as const,
      subject: selectedSubject,
      grade: selectedGrade
    }));
    
    onQuizGenerated(formattedQuestions);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">Quiz Generator</h1>
              <p className="text-sm text-muted-foreground">Create quizzes from PDFs, text, or manually</p>
            </div>
            <Button variant="outline" onClick={onBack}>
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Grade and Subject Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academic Level & Subject
              </CardTitle>
              <CardDescription>
                Select the appropriate grade level and subject for accurate question generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade/Class Level</Label>
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className={`grid w-full ${user?.userType === 'faculty' ? 'grid-cols-3' : 'grid-cols-2'}`}>
              <TabsTrigger value="upload">PDF Upload</TabsTrigger>
              <TabsTrigger value="text">Text Input</TabsTrigger>
              {user?.userType === 'faculty' && (
                <TabsTrigger value="manual">Manual Creation</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload PDF Document
                  </CardTitle>
                  <CardDescription>
                    Upload a PDF file to automatically generate quiz questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Drag and drop your PDF file here, or click to browse
                        </p>
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="pdf-upload"
                        />
                        <Label
                          htmlFor="pdf-upload"
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 cursor-pointer"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Choose PDF File
                        </Label>
                      </div>
                    </div>

                    {uploadedFile && (
                      <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                        <FileText className="h-5 w-5 text-success" />
                        <div className="flex-1">
                          <p className="font-medium text-success">{uploadedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setUploadedFile(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    <Button
                      variant="hero"
                      onClick={generateFromPDF}
                      disabled={!uploadedFile || !selectedGrade || !selectedSubject || isGenerating}
                      className="w-full"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating Questions...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4" />
                          Generate Quiz from PDF
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="text" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Text Input
                  </CardTitle>
                  <CardDescription>
                    Paste or type content to generate quiz questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="text-content">Content</Label>
                      <Textarea
                        id="text-content"
                        placeholder="Paste your study material, notes, or any text content here..."
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        className="min-h-40"
                      />
                    </div>

                    <Button
                      variant="hero"
                      onClick={generateFromText}
                      disabled={!textContent.trim() || !selectedGrade || !selectedSubject || isGenerating}
                      className="w-full"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating Questions...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4" />
                          Generate Quiz from Text
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {user?.userType === 'faculty' && (
              <TabsContent value="manual" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Manual Quiz Creation
                    </CardTitle>
                    <CardDescription>
                      Create quiz questions manually with custom options and explanations
                    </CardDescription>
                  </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {customQuestions.map((question, index) => (
                      <Card key={index} className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">Question {index + 1}</Badge>
                            {customQuestions.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCustomQuestion(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label>Question</Label>
                            <Textarea
                              placeholder="Enter your question here..."
                              value={question.question}
                              onChange={(e) => updateCustomQuestion(index, 'question', e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Answer Options</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {question.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name={`correct-${index}`}
                                    checked={question.correctAnswer === optIndex}
                                    onChange={() => updateCustomQuestion(index, 'correctAnswer', optIndex)}
                                    className="text-primary"
                                  />
                                  <Input
                                    placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...question.options];
                                      newOptions[optIndex] = e.target.value;
                                      updateCustomQuestion(index, 'options', newOptions);
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Explanation</Label>
                            <Textarea
                              placeholder="Provide an explanation for the correct answer..."
                              value={question.explanation}
                              onChange={(e) => updateCustomQuestion(index, 'explanation', e.target.value)}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={addCustomQuestion}>
                        <Plus className="h-4 w-4" />
                        Add Question
                      </Button>
                      <Button
                        variant="hero"
                        onClick={createManualQuiz}
                        disabled={!selectedGrade || !selectedSubject}
                        className="flex-1"
                      >
                        <BookOpen className="h-4 w-4" />
                        Create Quiz ({customQuestions.filter(q => q.question.trim()).length} questions)
                      </Button>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default QuizGenerator;