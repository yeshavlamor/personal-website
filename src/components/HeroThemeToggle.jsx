import { Moon, Sun, Star } from "lucide-react";
import { useState, useEffect } from "react";

export const HeroThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme")
        if (storedTheme === "dark") {
            setIsDarkMode(true)
            document.documentElement.classList.add("dark");
        } else {
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        }

        // listen for theme changes from other components
        const handleThemeChange = () => {
            const currentTheme = localStorage.getItem("theme");
            const newIsDarkMode = currentTheme === "dark";
            setIsDarkMode(newIsDarkMode);
        };

        window.addEventListener("themeChanged", handleThemeChange);

        return () => {
            window.removeEventListener("themeChanged", handleThemeChange);
        };
    }, [])

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);  
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
            // Hide the button after switching to dark mode
            setIsVisible(false);
        }
        
        // Dispatch event to notify other components
        window.dispatchEvent(new Event("themeChanged"));
    };

    // Don't render the button if it should be hidden
    if (!isVisible) {
        return null;
    }

    return (
        <button 
            onClick={toggleTheme} 
            className="group relative px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-full bg-primary/20 hover:bg-primary/30 
                     border-2 border-primary/40 hover:border-primary/60 
                     transition-all duration-300 hover:scale-105 active:scale-95
                     backdrop-blur-md shadow-2xl hover:shadow-3xl
                     animate-pulse-subtle"
        >
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                {isDarkMode ? (
                    <>
                        <Sun className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300"/>
                        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300">
                            <span className="hidden sm:inline">Switch to Light Mode</span>
                            <span className="sm:hidden">Light</span>
                        </span>
                    </>
                ) : (
                    <>
                        <Star className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-gray-600 group-hover:text-gray-500 transition-colors duration-300"/>
                        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black-600 group-hover:text-black-500 transition-colors duration-300">
                            <span className="hidden md:inline">Click me to see the stars!</span>
                            <span className="hidden sm:inline md:hidden">See the stars!</span>
                            <span className="sm:hidden">Stars</span>
                        </span>
                    </>
                )}
            </div>
            
            {/* Enhanced glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 blur-lg -z-10"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-transparent blur-xl -z-20"></div>
        </button>
    );
}; 