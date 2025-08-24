import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  FileText, 
  Users, 
  Trophy, 
  BarChart3, 
  Zap, 
  BookOpen, 
  Target,
  Sparkles 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Quiz Generation",
      description: "Upload PDFs or text and let our AI create intelligent quizzes automatically with varying difficulty levels.",
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: Target,
      title: "Adaptive Difficulty",
      description: "Choose from Beginner, Intermediate, and Advanced levels that adapt to student performance.",
      gradient: "from-success to-success/80"
    },
    {
      icon: Trophy,
      title: "Real-time Leaderboards",
      description: "Gamified learning with competitive rankings and achievement tracking to motivate students.",
      gradient: "from-warning to-warning/80"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Detailed insights and progress tracking for both students and faculty with comprehensive reports.",
      gradient: "from-accent to-accent/80"
    },
    {
      icon: Users,
      title: "Faculty Dashboard",
      description: "Complete control panel for educators to create, manage, and analyze quiz performance.",
      gradient: "from-destructive to-destructive/80"
    },
    {
      icon: Sparkles,
      title: "Instant Feedback",
      description: "Immediate scoring with detailed explanations and learning recommendations after each quiz.",
      gradient: "from-primary-glow to-primary"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm text-primary font-medium mb-4">
            <Zap className="h-4 w-4" />
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need for
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Smart Learning</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            EduSphere combines cutting-edge AI technology with intuitive design to create 
            the ultimate educational experience for students and educators.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-border/50">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="hero" size="lg">
            <BookOpen className="h-4 w-4" />
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;