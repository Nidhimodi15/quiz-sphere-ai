import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, User } from "lucide-react";

const Header = ({ onGetStarted }) => {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-hero rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">EduSphere</h1>
            <p className="text-xs text-muted-foreground">Intelligent Learning Platform</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">How it Works</a>
          <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4" />
            Sign In
          </Button>
          <Button variant="hero" size="sm" onClick={onGetStarted}>
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;