import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faUsers, faBookOpen, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
import AnimatedJoinButton from "@/components/AnimatedJoinButton";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Young Tanzanian students learning with technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-light/80 to-tanzania-gold/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 glass-card rounded-full text-sm font-medium text-primary">
            <FontAwesomeIcon icon={faTrophy} className="w-4 h-4 mr-2 text-tanzania-gold" />
            E-Learning Platform for Empowering Youth
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-white leading-tight">
            Jifunze Skills 
            <span className="text-gradient-gold block">bora</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Learn practical digital skills, entrepreneurship, and financial literacy. 
            Build your future with courses designed for Tanzanian youth, available in English and Swahili.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <AnimatedJoinButton />
            <Button size="lg" variant="outline" className="hero-button-outline touch-target px-8 py-4 text-lg font-semibold group">
              <FontAwesomeIcon icon={faPlay} className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Tazama Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="text-center animate-bounce-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-3xl md:text-4xl font-bold text-white">50K+</div>
              <div className="text-white/80 font-medium">Wanafunzi</div>
            </div>
            <div className="text-center animate-bounce-in" style={{ animationDelay: "0.4s" }}>
              <div className="text-3xl md:text-4xl font-bold text-white">200+</div>
              <div className="text-white/80 font-medium">Kozi</div>
            </div>
            <div className="text-center animate-bounce-in col-span-2 md:col-span-1" style={{ animationDelay: "0.6s" }}>
              <div className="text-3xl md:text-4xl font-bold text-white">95%</div>
              <div className="text-white/80 font-medium">Mafanikio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-20 left-10 glass-card p-4 rounded-2xl animate-fade-in hidden lg:block" style={{ animationDelay: "0.8s" }}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faUsers} className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-primary">5,000+ new students</div>
            <div className="text-sm text-muted-foreground">joined this month</div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 right-10 glass-card p-4 rounded-2xl animate-fade-in hidden lg:block" style={{ animationDelay: "1s" }}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-success to-tanzania-green rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faBookOpen} className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-primary">15+ new courses</div>
            <div className="text-sm text-muted-foreground">added weekly</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;