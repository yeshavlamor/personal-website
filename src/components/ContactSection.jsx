import { Mail, Phone, Github, Linkedin } from "lucide-react";

export const ContactSection = () => {
    return (
        <section id="contact" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
            
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center"> 
                    Get In                  
                    <span className="text-primary">
                        {" "}
                        Touch
                    </span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Let's connect! I am always open to discussing new opportunities 
                </p>


                <div className="grid grid-cols-1 gap-12">
                    <div className="space-y-6 flex flex-col items-center">
                        <div className="space-y-8">
                            <h3 className="text-2xl font-semibold mb-6">
                                {" "}
                                Contact Information                             
                        </h3> 

                            {/* linkedin element */}
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Linkedin className="h-6 w-6 text-primary" /> {" "} 
                                </div>

                                <div>
                                    <h4 className="font-medium text-left"> Linkedin</h4>
                                    <a
                                        href="https://www.linkedin.com/in/ayesha-villamor"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        https://www.linkedin.com/in/ayesha-villamor
                                    </a>
                                </div>
                            </div>

                            {/* github element
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Github className="h-6 w-6 text-primary" /> {" "} 
                                </div>

                                <div>
                                    <h4 className="font-medium text-left"> Github</h4>
                                    <a
                                        href="https://github.com/yeshavlamor"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        https://github.com/yeshavlamor 
                                    </a>
                                </div>
                            </div> */}

                            {/* mail element */}
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" /> {" "} 
                                </div>

                                <div>
                                    <h4 className="font-medium text-left"> Email</h4>
                                    <a
                                        href="mailto:ayeshavlamor@gmail.com"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        ayeshavlamor@gmail.com 
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div> 
                </div>
            </div>
        </section>
    );
};