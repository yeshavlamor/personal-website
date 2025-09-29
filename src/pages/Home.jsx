import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground"; 
import { IntroScramble } from "@/components/IntroScramble";
import { HeroSection } from "@/components/HeroSection";
import { useEffect, useState } from "react";

export const Home = () => {

    // logic to scroll back to hero from writings section 
    const [shouldScrollToHero, setShouldScrollToHero] = useState(false);
    const [isComingFromWritings, setIsComingFromWritings] = useState(false);

    useEffect(() => {
        // Check if user is coming back from writings pages
        const isFromWritings = localStorage.getItem("comingFromWritings") === "true"
        
        if (isFromWritings) {
            // Set flag to disable IntroScramble logic temporarily
            setIsComingFromWritings(true)
            // Scroll to writings section when coming from writings pages
            setShouldScrollToHero(true)
            // Clear the flag
            localStorage.removeItem("comingFromWritings")
            
            // Re-enable IntroScramble after a delay
            setTimeout(() => {
                setIsComingFromWritings(false)
            }, 2000)
        }
    }, [])

    useEffect(() => {
        if (shouldScrollToHero) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                const heroSection = document.getElementById("hero")
                if (heroSection) {
                    heroSection.scrollIntoView({ behavior: "smooth" })
                }
                setShouldScrollToHero(false)
            }, 100)
        }
    }, [shouldScrollToHero])

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <IntroScramble disabled={isComingFromWritings} />
            <ThemeToggle />
            <StarBackground />
            <main> 
                <HeroSection />                
            </main>            
        </div>
    );
};