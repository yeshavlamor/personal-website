import { useEffect, useState } from "react"

// id, size, x, y, opacity, animationDuration
// id, size, x, y, delay, animationDuration

export const StarBackground = () => {
    const [elements, setElements] = useState([])

    useEffect(() => {
        const generateElements = () => {
            const newElements = []
            
            // Generate stars with varied effects
            for (let i = 0; i < 50; i++) {
                newElements.push({
                    id: i,
                    type: 'star',
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 4 + 1,
                    animationDelay: Math.random() * 3,
                    blur: Math.random() > 0.7 ? 'blur-[0.3px]' : '', // Some stars are slightly blurred
                })
            }

            // Generate shooting stars (meteors) - positioned all over the page
            for (let i = 0; i < 3; i++) {
                newElements.push({
                    id: `meteor-${i}`,
                    type: 'meteor',
                    x: Math.random() * 120, // Random x position across the page (0-120%)
                    y: Math.random() * 60, // Random y position in top portion (0-60%)
                    animationDelay: -(Math.random() * 4), // Negative delay to start immediately
                    animationDuration: Math.random() * 8 + 15, // 15-23 seconds duration (much slower)
                })
            }

            setElements(newElements)
        }

        generateElements()
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {elements.map((element) => {
                if (element.type === 'star') {
                    return (
                        <div
                            key={element.id}
                            className={`star animate-pulse-subtle ${element.blur}`}
                            style={{
                                left: `${element.x}%`,
                                top: `${element.y}%`,
                                width: `${element.size}px`,
                                height: `${element.size}px`,
                                animationDelay: `${element.animationDelay}s`,
                            }}
                        />
                    )
                } else if (element.type === 'meteor') {
                    return (
                        <div
                            key={element.id}
                            className="meteor animate-meteor"
                            style={{
                                left: `${element.x}%`,
                                top: `${element.y}%`,
                                animationDelay: `${element.animationDelay}s`,
                                animationDuration: `${element.animationDuration}s`,
                            }}
                        />
                    )
                }
                return null
            })}
        </div>
    )
}

