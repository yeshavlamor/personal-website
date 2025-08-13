import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { BouncingStar } from "@/components/BouncingStar";
import { HeroSection } from "@/components/HeroSection"; 
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { WritingsSection } from "@/components/WritingsSection"; 
import { ContactSection } from "@/components/ContactSection"; 
import { Footer } from "@/components/Footer"; 

export const Home = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/*Theme Toggle */}
            <ThemeToggle />
            {/*Background Effects */}
            <StarBackground />
            {/* Global CTA - Bouncing Star to switch to dark mode */}
            <BouncingStar />
            {/*Navbar */}
            <Navbar />
            {/*Main Content */}
            <main> 
                <HeroSection />
                <AboutSection />
                <ExperienceSection />
                <WritingsSection />
                <ContactSection />
            </main>

            {/*Poetic Footer */} 
            <Footer />
            
        </div>
    );
};