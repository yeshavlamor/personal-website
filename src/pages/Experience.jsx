import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

// Reuse the experiences data and structure from ExperienceSection
const experiences = [
  {
    name: "Data Analytics & Engineering",
    company: "NCSS",
    tags: ["ETL Pipelines", "Data Automation", "PowerBI", "Web App Development"],
    date: "May 2025 - July 2025",
    link: "https://www.ncss.gov.sg/",
    image: "/NCSS_logo.png",
    category: "Internships",
  },
  {
    name: "Data Science",
    company: "Vekin",
    tags: ["Deep Learning", "PyTorch", "Neural Networks", "Computer Vision"],
    date: "June 2024 - Nov 2024",
    link: "https://vekin.tech/",
    image: "/Vekin_logo.png",
    category: "Internships",
  },
  {
    name: "Cybersecurity Analyst",
    company: "Commonwealth Bank",
    tags: ["Information Security & Analysis", "Pen Test Reporting", "Security Research"],
    date: "Nov 2024 - Jan 2025",
    link: "https://www.commbank.com.au/",
    image: "/Commonwealth_logo.jpg",
    category: "Internships",
  },
  {
    name: "Web Scraper Application",
    image: "/projects/project2.png",
    tags: ["Selenium", "WebChromeDriver", "BeautifulSoup", "Web App Deployment", "HTML", "Javascript"],
    link: "#",
    category: "Projects",
  },
  {
    name: "Cup Analytics Dashboard",
    image: "/projects/project1.png",
    tags: ["Streamlit", "UI/UX Design", "Hugging Face", "Model Fine-Tuning", "Python", "CSS"],
    link: "https://github.com/yeshavlamor/cup-analytics-dashboard",
    category: "Projects",
  },
  {
    name: "Google AI Essentials",
    tags: [" "],
    date: "Aug 2024",
    image: "/Cert_1.jpg",
    link: "",
    category: "Certifications",
  },
  {
    name: "Google Configuration Management and the Cloud",
    tags: [" "],
    date: "Aug 2024",
    image: "/Cert_2.jpg",
    link: "",
    category: "Certifications",
  },
  {
    name: "Google Automating Real-World Tasks with Python",
    tags: [" "],
    date: "Aug 2024",
    image: "/Cert_3.jpg",
    link: "",
    category: "Certifications",
  },
];

const categories = ["Internships", "Projects", "Certifications"];

export const Experience = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Internships");

  useEffect(() => {
    document.title = "Experience";
  }, []);

  const handleBackToHome = () => {
    localStorage.setItem("comingFromWritings", "true");
    navigate("/");
  };

  const filteredExperiences = useMemo(
    () => experiences.filter((exp) => exp.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeToggle />

      <section className="py-24 px-4 relative min-h-screen">
        <div className="container mx-auto max-w-5xl">
          {/* Back button: fixed on small screens, in-flow on md+ (same pattern as writings) */}
          <div className="md:static">
            {/* Mobile: fixed top-left */}
            <button
              onClick={handleBackToHome}
              aria-label="Back to home"
              className="block md:hidden fixed top-5 left-5 z-50 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 text-primary hover:opacity-90"
            >
              <ArrowLeft size={18} />
            </button>

            {/* Desktop/tablet: in-flow, aligned with content */}
            <div className="hidden md:block mb-8">
              <button
                onClick={handleBackToHome}
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <ArrowLeft size={18} /> Back home
              </button>
            </div>
          </div>

          {/* Heading styled like writings page */}
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
            My <span className="text-primary">Experience</span>
          </h1>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            A snapshot of the internships, projects, and certifications that have shaped how I build and think
            about technology — from data and AI to security and real-world applications.
          </p>

          {/* Category tabs (reuse styling from ExperienceSection buttons) */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 md:px-6 md:py-3 rounded-full font-medium text-sm md:text-base capitalize transition-all duration-200 transform hover:scale-105 active:scale-95 border-2",
                  activeCategory === category
                    ? "bg-primary/90 text-primary-foreground hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 hover:border-primary/80"
                    : "bg-primary/10 text-primary hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 hover:border-primary/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Experience cards (content from ExperienceSection) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences.map((experience, idx) => (
              <div
                key={`${experience.name}-${idx}`}
                className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover w-full relative"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  {/* External Link Icon - Fixed to bottom right corner */}
                  {experience.link && (
                    <a
                      href={experience.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}

                  {/* Name */}
                  <h3 className="text-xl font-semibold mb-2 text-left">
                    {experience.name}
                  </h3>

                  {/* Company (if present) */}
                  {experience.company && (
                    <p className="text-sm text-foreground/80 mb-1 text-left">
                      {experience.company}
                    </p>
                  )}

                  {/* Date */}
                  {experience.date && (
                    <p className="text-muted-foreground text-left text-sm mb-4">
                      {experience.date}
                    </p>
                  )}

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap mt-6">
                    {experience.tags?.map((tag, tagIndex) => (
                      <span
                        key={`${experience.name}-tag-${tagIndex}`}
                        className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;


