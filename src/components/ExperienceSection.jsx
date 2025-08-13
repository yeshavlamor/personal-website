import { useState } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils" 

const experiences = [
    // internship
    {
        name: "Data Analytics & Engineering",
        company: "NCSS",
        tags: ["ETL Pipelines", "Data Automation", "PowerBI", "Web App Development"],
        // description: "Developed data pipeline systems for organizational health analytics, mapping initiatives across 295 social service agencies, and developing automated workflows.",
        date: "May 2025 - July 2025",
        link: "https://www.ncss.gov.sg/",
        image: "/NCSS_logo.png",
        category: "Internships"
    },
    {
        name: "Data Science",
        company: "Vekin",
        tags: ["Deep Learning", "PyTorch", "Neural Networks", "Computer Vision"],
        // description: "Developed data pipeline systems for organizational health analytics, mapping initiatives across 295 social service agencies, and developing automated workflows.",
        date: "June 2024 - Nov 2024",
        link: "https://vekin.tech/",
        image: "/Vekin_logo.png",
        category: "Internships"
    },
    {
        name: "Cybersecurity Analyst",
        company: "Commonwealth Bank",
        tags: ["Information Security & Analysis", "Pen Test Reporting", "Security Research"],
        // description: "Developed data pipeline systems for organizational health analytics, mapping initiatives across 295 social service agencies, and developing automated workflows.",
        date: "Nov 2024 - Jan 2025",
        link: "https://www.commbank.com.au/",
        image: "/Commonwealth_logo.jpg",
        category: "Internships"
    },

    // Projects
    {
        name: "Web Scraper Application",
        // description: "xxx",
        image: "/projects/project2.png", 
        tags: ["Selenium", "WebChromeDriver", "BeautifulSoup", "Web App Deployment", "HTML", "Javascript"],
        link: "#",
        category: "Projects"
    },
    {
        name: "Cup Analytics Dashboard",
        // description: "xxx",
        image: "/projects/project1.png", 
        tags: ["Streamlit", "UI/UX Design", "Hugging Face", "Model Fine-Tuning", "Python", "CSS"],
        link: "https://github.com/yeshavlamor/cup-analytics-dashboard",
        category: "Projects"
    },
    
    // Certifications
    {
        name: "Google AI Essentials",
        tags: [" "],
        // description: "Developed data pipeline systems for organizational health analytics, mapping initiatives across 295 social service agencies, and developing automated internshipflows.",
        date: "Aug 2024",
        image: "/Cert_1.jpg", 
        link: "",
        category: "Certifications"
    },
    {
        name: "Google Configuration Management and the Cloud",
        tags: [" "],
        // description: "Developed data pipeline systems for organizational health analytics, mapping initiatives across 295 social service agencies, and developing automated internshipflows.",
        date: "Aug 2024",
        image: "/Cert_2.jpg", 
        link: "",
        category: "Certifications"
    },
    {
        name: "Google Automating Real-World Tasks with Python",
        tags: [" "],
        // description: "Developed data pipeline systems for organizational health analytics, mapping initiatives across 295 social service agencies, and developing automated internshipflows.",
        date: "Aug 2024",
        image: "/Cert_3.jpg", 
        link: "",
        category: "Certifications"
    },

];

const categories = ["Internships", "Projects", "Certifications"]

export const ExperienceSection = () => {
    const [activeCategory, setActiveCategory] = useState("Internships")

    const filteredExperiences = experiences.filter(
        (experience) => experience.category === activeCategory  
    )
    return ( 
        <section 
            id="experience" 
            className="py-24 px-24 relative bg-secondary/30"
        >
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
                    My <span className="text-primary"> Experience </span> 
                </h2>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category, key) => (
                        <button 
                        key={key}
                        onClick={()=> setActiveCategory(category)} 
                        className={cn(
                            "px-5 py-2 rounded-full transition-colors duration 300 capitalize",
                            activeCategory === category ? 
                            "bg-primary text-primary-foreground"
                            :"bg-secondary/70 text-foreground hover:bg-secondary"
                        
                        )}
                        >
                            {category}
                        </button>
                    ))}
                    
                </div> 

                {/* Experience Cards */}
                <div className="flex justify-center gap-8">
                    {filteredExperiences.map((experience, key) => (
                        <div key={key} className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover w-80 flex-shrink-0 relative">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={experience.image}
                                    alt={experience.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"                                
                                /> 
                            </div>  

                            <div className="p-6">
                                {/* External Link Icon - Fixed to bottom right corner */}
                                <a 
                                    href={experience.link} 
                                    target="_blank"
                                    className="absolute bottom-4 right-4 text-foreground/80 hover:text-primary transition-colors duration-300"
                                >
                                  <ExternalLink size={20} />  
                                </a>
                                
                                {/* Name at top left */}
                                <h3 className="text-xl font-semibold mb-2 text-left"> 
                                    {experience.name}
                                </h3>

                                {/* Date */}
                                <p className="text-muted-foreground text-left text-sm mb-4">
                                    {experience.date}
                                </p>

                                {/* Description */}
                                <p className="text-muted-foreground text-sm mb-4">
                                    {experience.description}
                                </p>
                                
                                {/* Tags at bottom */}
                                <div className="flex gap-2 flex-wrap mt-10">
                                    {experience.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                                            {tag}
                                        </span> 
                                    ))}
                                </div>
                        </div>
                    </div>
                        
                        
                        // <div
                        //     key={key}
                        //     className="bg-card p-6 rounded-lg shadow-xs card-hover border border-border/50"
                        // > 
                        //     <div className="flex items-start gap-4">
                        //         {/* Company Logo and Link */}
                        //         <a
                        //             href={experience.link}
                        //             target="_blank"
                        //             rel="noopener noreferrer"
                        //             className="block hover:scale-105 transition-transform duration-200"
                        //         >
                        //             <img 
                        //                 src={experience.logo} 
                        //                 alt={experience.name} 
                        //                 className="w-16 h-16 rounded-full object-cover border border-border/50"
                        //             />
                        //         </a>
                                
                        //         {/* Content */}
                        //         <div className="flex-1 space-y-3">
                        //             {/* Header */}
                        //             <div className="flex justify-between items-start">
                        //                 <div>
                        //                     <h3 className="font-semibold text-xl text-foreground">
                        //                         {experience.position}
                        //                     </h3>
                        //                     <p className="text-left text-primary font-semibold">
                        //                         {experience.name}
                        //                     </p>
                        //                 </div>
                        //                 <span className="text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                        //                     {experience.date}
                        //                 </span>
                        //             </div>
                        //         </div>
                        //     </div>
                        // </div>


                    ))}
                </div>
            </div>
        </section>
    );
};