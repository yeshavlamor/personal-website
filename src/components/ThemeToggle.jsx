import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme")
        if (storedTheme === "dark") {
            setIsDarkMode(true)
            document.documentElement.classList.add("dark");
        } else {
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        }

        // Listen for theme changes from other components
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
            localStorage.setItem("theme", "light"); /* retain light theme even if page refreshes*/
            setIsDarkMode(false);  
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
        
        // Dispatch event to notify other components
        window.dispatchEvent(new Event("themeChanged"));
    };

    // button to toggle themees - hidden on mobile, smaller on desktop
    return (
        <button 
            onClick={toggleTheme} 
            className={cn(
                "fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colours duration-300",
                "focus:outlin-hidden bg-primary/10 hover:bg-primary/20 border border-primary/30",
                "hover:scale-105 active:scale-95"
            )}
        >
            {isDarkMode ? (
                <Sun className="h-4 w-4 text-gray-300"/> 
            ) : (
                <Moon className="h-4 w-4 text-gray-700"/>
            )}            
        </button> /* if in dark mode, show sun icon to toggle to light mode, if not show moon */
    ); 
};
