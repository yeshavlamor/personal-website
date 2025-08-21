import { Code, User, Briefcase } from "lucide-react"

export const AboutSection = () => {
    return (
        <section id="about" className="py-24 px-4 md:px-24 relative">
            {" "}
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    About <span className="text-primary"> Me</span> 
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-center md:text-left">
                        <h3 className="text-4xl font-semibold"> Building Tech That Matters. </h3>
                        <p className="text-xl textmuted-foreground"> 
                            I am passionate about creating software that contributes to a meaningful societal impact. Engineering change through tech - one line of code at a time.
                        </p>

                        {/* buttons */}
                        {/* <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                            <a href="#contact" className="cosmic-button">
                               {" "}
                               Get In Touch   
                            </a>

                            <a 
                                href=""
                                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 hover:scale-105 transition-colors duration-300"
                            >
                                Download CV 
                            </a>
                        </div> */}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Code className="h-6 w-6 text-primary" /> 
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg"> 
                                        Machine Learning & AI
                                    </h4>
                                    <ul className="list-disc pl-5 text-muted-foreground">
                                        <li>Model development and fine-tuning</li>
                                        <li>Computer vision: image recognition, object detection, OCR systems</li>
                                        <li>NLP: sentiment analysis, text classification</li>
                                    </ul> 
                                </div>
                             </div>
                        </div>
                            
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <User className="h-6 w-6 text-primary" /> 
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg"> 
                                        Data Analytics & Visualization
                                    </h4>
                                    <ul className="list-disc pl-5 text-muted-foreground">
                                        <li>Dashboard development using Power BI</li>
                                        <li>Automated data processing pipelines using Python</li>
                                        <li>Currently exploring other automation tools such as n8n and LangChain</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Briefcase className="h-6 w-6 text-primary" /> 
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg"> 
                                        Full-Stack Development
                                    </h4>
                                    <p className="text-muted foreground"> 
                                        Building web applications with React, Python, and modern frameworks. Experience with Tailwind CSS, and modern frameworks like Next.js.  
                                    </p> 
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div> 
            </div>
        </section>
    );
}