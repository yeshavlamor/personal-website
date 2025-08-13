import { useEffect, useState } from "react"

// id, size, x, y, opacity, animationDuration
// id, size, x, y, delay, animationDuration

export const StarBackground = () => {
    const [elements, setElements] = useState([])

    useEffect(() => {
        const generateElements = () => {
            const newElements = []
            
            // Generate stars with varied effects
            for (let i = 0; i < 80; i++) {
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
            for (let i = 0; i < 5; i++) {
                newElements.push({
                    id: `meteor-${i}`,
                    type: 'meteor',
                    x: Math.random() * 120, // Random x position across the page (0-120%)
                    y: Math.random() * 60, // Random y position in top portion (0-60%)
                    animationDelay: -(Math.random() * 3), // Negative delay to start immediately
                    animationDuration: Math.random() * 2 + 3, // 3-5 seconds duration
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

// import { useEffect, useState } from "react"

// // id, size, x, y, opacity, animationDuration
// // id, size, x, y, delay, animationDuration

// export const StarBackground = () => {
//     const [stars, setStars] = useState([])
//     const [meteors, setMeteors] = useState([])
    
//     useEffect(() => {
//         generateStars();
//         generateMeteors();

//         const handleResize = () => {
//             generateStars();
//         };

//         window.addEventListener("resize", handleResize) // when the window is resized by the user, handleResize funtion is called
//         return () => window.removeEventListener("resize", handleResize); ``
//     }, []);

        

//     const generateStars = () => {
//         const numberOfStars = Math.floor(
//             (window.innerWidth * window.innerHeight) / 10000
//         );

//         const newStars =[]

//         for (let i=0; i<numberOfStars; i++) {
//             newStars.push({
//                 id: i, 
//                 size: Math.random() * 3 + 1, // Stars between 1 and 4 pixels
//                 x: Math.random() * 100, // Random x position (0-100%)
//                 y: Math.random() * 100, // Random y position (0-100%)
//                 opacity: Math.random() * 0.5 + 0.5, // Opacity between 0.5 and 1
//                 animationDuration: Math.random() * 4 + 2, // Animation between 2-6 seconds
//             });
//         }

//         setStars(newStars)
//     };

//     const generateMeteors = () => {
//         const numberOfMeteors = 4;
//         const newMeteors = [];

//         for (let i=0; i<numberOfMeteors; i++) {
//             newMeteors.push({
//                 id: i, 
//                 size: Math.random() * 2 + 1, // Stars between 1 and 4 pixels
//                 x: Math.random() * 100, // Random x position (0-100%)
//                 y: Math.random() * 20, // Random y position (0-100%)
//                 delay: Math.random() * 15, // Opacity between 0.5 and 1
//                 animationDuration: Math.random() * 3 + 3, // Animation between 2-6 seconds
//             });
//         }

//         setMeteors(newMeteors)
//     };

//     return (
//         <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//             {stars.map((star) => (
//                 <div 
//                     key={star.id} 
//                     className="star animate-pulse-subtle absolute bg-white rounded-full" 
//                     style={{
//                         width: `${star.size}px`,
//                         height: `${star.size}px`,
//                         left: `${star.x}%`,
//                         top: `${star.y}%`,
//                         opacity: star.opacity,
//                         animationDuration: `${star.animationDuration}s`,
//                         boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)',
//                     }}
//                 />  
//             ))}

//             {meteors.map((meteor) => (
//                 <div 
//                     key={meteor.id} 
//                     className="meteor animate-meteor" 
//                     style={{
//                         width: `${meteor.size * 50}px`,
//                         height: `${meteor.size * 2 }px`,
//                         left: `${meteor.x}%`,
//                         top: `${meteor.y}%`,
//                         animationDelay: `-${meteor.delay}s`,
//                         animationDuration: `${meteor.animationDuration}s`,
//                     }}
//                 />  
//             ))}
//         </div>
//     );
// };