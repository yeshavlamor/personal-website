import { ArrowDown, Mail, Github, Linkedin } from "lucide-react"
import { Link } from "react-router-dom"

export const HeroSection = () => {
    return (
        <section 
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center px-4"
        >            
            <div className="container max-w-6xl mx-auto z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
                    
                    {/* Text Content */}
                    <div className="grow-[2] text-center lg:text-left space-y-4 md:space-y-6">
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight whitespace-nowrap">
                            <span className="opacity-0 animate-fade-in-delay-2"> Hi there! I'm Ayesha Villamor.</span>
                            {/* <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-3">
                                an aspiring software developer
                            </span>  */}
                        </h1> 
                        
                        <p className="text-base sm:text-lg md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 opacity-0 animate-fade-in-delay-4">
                            With a curiousity spanning both tech and everything outside it, I am always keen on learning new things! 
                            As of now, I am currenty exploring the intersection of AI, Big Data and Sustainability.                </p>

                        {/* writings button */}
                        <div className="pt-4 opacity-0 animate-fade-in-delay-5 space-y-4">
                            <div className="flex flex-row items-center justify-center lg:justify-start gap-3 md:gap-4">
                                <Link 
                                    to="/writings" 
                                    className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-primary/10 text-primary font-medium text-sm md:text-base 
                                             hover:bg-primary/90 transition-all duration-200 
                                             hover:shadow-xl hover:shadow-primary/25
                                             transform hover:scale-105 active:scale-95
                                             border-2 hover:border-primary/80"
                                >
                                    Writings
                                </Link>
                                
                                {/* Contact Icons */}
                                <div className="flex items-center gap-3 md:gap-4">
                                    <a
                                        href="https://www.linkedin.com/in/ayesha-villamor"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 md:p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200 group"
                                        aria-label="LinkedIn Profile"
                                    >
                                        <Linkedin className="h-5 w-5 md:h-6 md:w-6 text-primary group-hover:scale-110 transition-transform duration-200" />
                                    </a>
                                    
                                    <a
                                        href="https://github.com/yeshavlamor"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 md:p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200 group"
                                        aria-label="GitHub Profile"
                                    >
                                        <Github className="h-5 w-5 md:h-6 md:w-6 text-primary group-hover:scale-110 transition-transform duration-200" />
                                    </a>
                                    
                                    <a
                                        href="mailto:ayeshavlamor@gmail.com"
                                        className="p-2 md:p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200 group"
                                        aria-label="Send Email"
                                    >
                                        <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary group-hover:scale-110 transition-transform duration-200" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Picture */}
                    <div className="grow-[1] justify-center lg:justify-end opacity-0 animate-fade-in-delay-3">
                        <div className="relative">
                            <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                                <img 
                                    src="/projects/LinkedIn_Photo.jpeg" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Add a subtle glow effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 blur-xl -z-10"></div>
                        </div>
                    </div>
                </div>
            </div> 
    </section>
    );
};