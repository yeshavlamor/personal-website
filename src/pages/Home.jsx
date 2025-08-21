import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "@/components/HeroSection"; 
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { WritingsSection } from "@/components/WritingsSection"; 
import { ContactSection } from "@/components/ContactSection"; 
import { Footer } from "@/components/Footer"; 
import IntroScramble from "@/components/IntroScramble";
import { useEffect, useState } from "react";

export const Home = () => {
    const [shouldScrollToWritings, setShouldScrollToWritings] = useState(false);
    const [isComingFromWritings, setIsComingFromWritings] = useState(false);

    useEffect(() => {
        // Check if user is coming back from writings pages
        const isFromWritings = localStorage.getItem("comingFromWritings") === "true"
        
        if (isFromWritings) {
            // Set flag to disable IntroScramble logic temporarily
            setIsComingFromWritings(true)
            // Scroll to writings section when coming from writings pages
            setShouldScrollToWritings(true)
            // Clear the flag
            localStorage.removeItem("comingFromWritings")
            
            // Re-enable IntroScramble after a delay
            setTimeout(() => {
                setIsComingFromWritings(false)
            }, 2000)
        }
    }, [])

    useEffect(() => {
        if (shouldScrollToWritings) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                const writingsSection = document.getElementById("writings")
                if (writingsSection) {
                    writingsSection.scrollIntoView({ behavior: "smooth" })
                }
                setShouldScrollToWritings(false)
            }, 100)
        }
    }, [shouldScrollToWritings])

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <IntroScramble disabled={isComingFromWritings} />
            {/*Theme Toggle */}
            <ThemeToggle />
            {/*Background Effects */}
            <StarBackground />
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