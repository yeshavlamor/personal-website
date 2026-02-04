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
                    
                    {/* left child: Profile Picture */}
                    <div className="grow-[1] justify-center lg:justify-end opacity-0 animate-fade-in-delay-3">
                        <div className="relative">
                            <div className="w-40 h-40 sm:w-66 sm:h-66 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                                <img 
                                    src="/projects/LinkedIn_Photo.jpeg" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* right child: Text Content */}
                    <div className="grow-[2] text-left space-y-4 md:space-y-6">
                        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight whitespace-nowrap">
                            <span className="opacity-0 animate-fade-in-delay-2"> Hi there! My name is Ayesha Villamor.</span>
                        </h1> 

                        <h2 className="text-sm sm:text-md md:text-xl font-medium animate-fade-in-delay-3 text-left">
                            <span className="block mt-1">Double Degree in Business & Computer Science </span> 
                            <span className="block mt-1">NTU, Singapore</span>
                            {/* <span className="block mt-1">NCSS Scholar</span> */}
                        </h2>

                        {/* buttons */}
                        <div className="pt-4 opacity-0 animate-fade-in-delay-5 space-y-4">  
                            <div className="flex flex-row items-left lg:justify-start gap-3 md:gap-4">
                                {/* writings button */}
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

                </div>

                {/* bottom intro */}                
                <div className="grow-[2] text-center lg:text-left space-y-4 md:space-y-6 mt-8 md:mt-12">
                        {/* <p> With a curiosity spanning both tech and everything outside it, 
                            I am always keen on learning new things! As of now, 
                            I am currently exploring the intersection of AI, Big Data and Sustainability.
                        </p> */}
                        <p> Somewhere between training my first model and first few merge conflicts, 
                            I realised I cared not just about how to build systems, but why we even build them. 
                            
                            The more I built, the more I noticed that good technology isn’t just powerful — it’s considerate.
                            
                            Nice to meet you! I am a Final Year Undergrad, with curiosity spanning tech and everything outside it. 
                            I am currently exploring the realms of AI and Big Data, with special interest in building technology 
                            for social good and sustainability.
{/*                             
                            Beyond tech, I am someone who is constantly exploring — ideas, places, and creative outlets. 
                            I care deeply about growth, curiosity, and doing work that feels meaningful, 
                            even when the path isn’t fully defined yet. 
                            This site is less about having everything figured out, and more about documenting my journey through it all. 
                            Thank you for visiting, I hope you enjoy your time here!  */}

                        </p>
                    </div>
            </div> 
    </section>
    );
};