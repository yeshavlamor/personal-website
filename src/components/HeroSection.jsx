import { ArrowDown } from "lucide-react"

export const HeroSection = () => {
    return (
        <section 
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center px-4"
        > 
            {/* Theme toggle handled globally by BouncingStar and top-right ThemeToggle */}
            
            <div className="container max-w-6xl mx-auto z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                    
                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            <span className="opacity-0 animate-fade-in-delay-2"> Hello, I'm Ayesha Villamor</span>
                            {/* <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-3">
                                an aspiring software developer
                            </span>  */}
                        </h1> 
                        
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 opacity-0 animate-fade-in-delay-4">
                            Based in Singapore, I dabble in a multitude of interests within the tech field. I am currently exploring the realms of Big Data and Artificial Intelligence! 
                        </p>

                        <div className="pt-4 opacity-0 animate-fade-in-delay-5">
                            <a href="#writings" className="cosmic-button">
                                Read My Writings
                            </a>
                        </div>
                    </div>

                    {/* Profile Picture */}
                    <div className="flex-1 flex justify-center lg:justify-end opacity-0 animate-fade-in-delay-3">
                        <div className="relative">
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
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

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce opacity-0 animate-fade-in-delay-6">
                <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
                <ArrowDown className="h-5 w-5 text-primary" />
            </div>
    </section>
    );
};