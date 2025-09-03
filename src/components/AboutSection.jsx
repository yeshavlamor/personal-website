import { Bot, Code, ChartLine } from "lucide-react"
import { ChatbotSection } from "./ChatbotSection"

export const AboutSection = () => {
    return (
        <section id="about" className="py-24 px-4 md:px-24 relative">
            {" "}
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    About <span className="text-primary"> Me</span> 
                </h2>

                {/* tech stuff */}
                <div className="grid grid-cols-2 gap-12 items-center">
                    {/* intro text */}
                    <div className="space-y-6 text-center">
                        <h3 className="text-4xl font-semibold"> Building Tech That Matters. </h3>
                        <p className="text-xl textmuted-foreground"> 
                            I am passionate about creating software that contributes to a meaningful impact, especially in the social sense. Engineering change through tech—one line of code at a time.
                        </p>
                    </div>
                    
                    {/* tech interests cards */}
                    <div className="grid grid-cols-1 gap-3">

                        {/* card 1 */}
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">

                                <div className="p-3 rounded-full bg-primary/10">
                                    <Bot className="h-6 w-6 text-primary" /> 
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-xl"> 
                                        Machine Learning & AI
                                    </h4>
                                    {/* <ul className="list-disc pl-5 text-muted-foreground">
                                        <li>Model development and fine-tuning</li>
                                        <li>Computer vision: image recognition, object detection, OCR systems</li>
                                        <li>NLP: sentiment analysis, text classification</li>
                                    </ul>  */}
                                </div>
                             </div>
                        </div>
                            
                        {/* card 2 */}
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Code className="h-6 w-6 text-primary" /> 
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-xl"> 
                                        Full-Stack Development
                                    </h4>
                                    {/* <p className="text-muted foreground"> 
                                        Building web applications with React, Python, and modern frameworks. Experience with Tailwind CSS, and modern frameworks like Next.js.  
                                    </p>  */}
                                </div>
                            </div>
                        </div>

                        {/* card 3 */}
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <ChartLine className="h-6 w-6 text-primary" /> 
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-xl"> 
                                        Data Analytics & Visualization
                                    </h4>
                                    {/* <ul className="list-disc pl-5 text-muted-foreground">
                                        <li>Dashboard development using Power BI</li>
                                        <li>Automated data processing pipelines using Python</li>
                                        <li>Currently exploring other automation tools such as n8n and LangChain</li>
                                    </ul> */}
                                </div>
                            </div>
                        </div>   
                    </div>
                </div> 

                {/* Chatbot Section */}
                <div className="mt-16">
                    <ChatbotSection />
                </div>

            </div>
        </section>
    );
}