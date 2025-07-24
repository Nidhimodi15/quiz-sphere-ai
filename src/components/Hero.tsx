import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Users, Trophy, Zap } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const Hero = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm text-primary font-medium">
                <Zap className="h-4 w-4" />
                AI-Powered Learning
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Transform Learning with{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Intelligent Quizzes
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                EduSphere revolutionizes education with AI-generated quizzes, personalized learning paths, 
                and real-time performance tracking for students and faculty.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Learning Now
                <Zap className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Universities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-quiz">
              <img 
                src={heroImage} 
                alt="Students learning with EduSphere" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating cards */}
            <Card className="absolute -top-4 -left-4 p-4 bg-card shadow-card animate-float">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Brain className="h-5 w-5 text-success" />
                </div>
                <div>
                  <div className="font-semibold text-sm">AI Generated</div>
                  <div className="text-xs text-muted-foreground">Smart Quizzes</div>
                </div>
              </div>
            </Card>
            
            <Card className="absolute -bottom-4 -right-4 p-4 bg-card shadow-card animate-float" style={{animationDelay: '1s'}}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Leaderboards</div>
                  <div className="text-xs text-muted-foreground">Track Progress</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;