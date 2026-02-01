import { useEffect, useMemo, useRef, useState, Fragment } from "react"
import { motion } from "framer-motion"

export const IntroScramble = ({
    quote = "I will love the light for it shows me the way; yet I will endure the dark for it shows me the stars", // og mandino
    scrambleDistance = 150,
    scrambleThreshold = 0.3, // Fraction of letters to be scrambled to trigger effect
    themeSwitchDelayMs = 1200,
    freezeBeforeScrollMs = 2000,
    restoreDurationMs = 1600, // Duration before letters return to original position
    disabled = false, // Flag to disable scramble logic when coming from writings
}) => {
    // Detect mobile device for timing adjustments
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768 || 
                     ('ontouchstart' in window)
    
    // Adjust timing for mobile devices
    const mobileFreezeBeforeScrollMs = isMobile ? 1500 : freezeBeforeScrollMs
    const mobileRestoreDurationMs = isMobile ? 1200 : restoreDurationMs
	const containerRef = useRef(null) // Reference to quote container
	const lettersRef = useRef([]) // Reference to array of individual letters
	const rafRef = useRef(null)
    const [mouse, setMouse] = useState({ x: 0, y: 0 }) // Track mouse position
    const [progress, setProgress] = useState(0) // Track percentage of letters scrambled
	const [hasCompleted, setHasCompleted] = useState(false) // Flag to track whether scramble is complete
    const [scrambleCount, setScrambleCount] = useState(0)
    const [isHoveringQuote, setIsHoveringQuote] = useState(false) // Track if user mouse is hovering over quote
    const [isTouchingQuote, setIsTouchingQuote] = useState(false) // Track if user is touching the quote on mobile
    const [isFreezing, setIsFreezing] = useState(false) // State of letters. Frozen before scroll animation
    const [isRestoring, setIsRestoring] = useState(false) // State of letters. Restored to original position before animation
    const [isIntentionalScramble, setIsIntentionalScramble] = useState(false)
    const [isInQuoteSection, setIsInQuoteSection] = useState(false)
    const isAnimatingScrollRef = useRef(false) // Track if scroll animation is in progress. Prevents multiple scroll animations
    const [scrambleDistancePx, setScrambleDistancePx] = useState(scrambleDistance)
    const rafScrollBackRef = useRef(null)
    const preScrollTimerRef = useRef(null)
    const restoreTimerRef = useRef(null)

	// Non-space characters only, to keep index alignment for animated letters
	const characters = useMemo(() => Array.from(quote).filter((ch) => ch !== ' '), [quote])

	// Split into words to prevent line breaks inside words
	const words = useMemo(() => quote.split(' '), [quote])

    const [originalCenters, setOriginalCenters] = useState([]) // Array of original letter coordinates {x, y} format
    const [offsets, setOffsets] = useState(() => characters.map(() => ({ x: 0, y: 0, r: 0 })))
    const precomputedRef = useRef(characters.map(() => ({ x: 0, y: 0, r: 0 }))) // Array of target positions for each scrambled letter
    const activatedRef = useRef(characters.map(() => false)) // Array of booleans to track which letters are activated
    const moveFramePendingRef = useRef(false) // Flag to prevent multiple mouse move events from being processed simultaneously

	// Adjust pre-computed scramble distance based on screen size and device type
	const getResponsiveScrambleDistance = () => {
		const screenWidth = window.innerWidth
		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
		                 window.innerWidth <= 768 || 
		                 ('ontouchstart' in window)
		
		// Mobile devices get slightly larger touch targets for better usability
		if (isMobile) {
			if (screenWidth < 640) return 100     // sm: 100px (increased from 80)
			if (screenWidth < 768) return 120     // md: 120px (increased from 100)
			return 140                            // lg+: 140px (reduced from larger values)
		}
		
		// Desktop values
		if (screenWidth < 640) return 80      // sm: 80px
		if (screenWidth < 768) return 100    // md: 100px  
		if (screenWidth < 1024) return 140   // lg: 140px
		if (screenWidth < 1440) return 180   // xl: 180px
		return 220                           // 2xl+: 220px
	}

	// Scale scramble targets proportionally by screen size
	const getScreenScale = () => {
		return Math.min(window.innerWidth / 1920, 1) // Base on 1920px width
	}

	// Ensure letters don't scramble outside viewport
	const clampToViewport = (x, y, originalX, originalY) => {
		const margin = 40
		const maxX = Math.min(window.innerWidth - margin, originalX + 200)
		const minX = Math.max(margin, originalX - 200)
		const maxY = Math.min(window.innerHeight - margin, originalY + 150)
		const minY = Math.max(margin, originalY - 150)
		
		return {
			x: Math.max(minX, Math.min(maxX, x)),
			y: Math.max(minY, Math.min(maxY, y))
		}
	}

	// Initialize scramble count from localStorage and handle page refresh
	useEffect(() => {
		// Check if this is a page refresh using a more reliable method
		const isRefresh = sessionStorage.getItem("isRefresh") === "true"
		
		if (isRefresh) {
			// Reset scramble count on page refresh
			localStorage.setItem("scrambleCount", "0")
			setScrambleCount(0)
			// Clear the refresh flag
			sessionStorage.removeItem("isRefresh")
		} else {
			// Normal navigation - get existing count
			const currentCount = parseInt(localStorage.getItem("scrambleCount") || "0")
			setScrambleCount(currentCount)
		}
	}, [])

	// Set refresh flag when page is about to unload (refresh)
	useEffect(() => {
		const handleBeforeUnload = () => {
			sessionStorage.setItem("isRefresh", "true")
		}
		
		window.addEventListener("beforeunload", handleBeforeUnload)
		return () => window.removeEventListener("beforeunload", handleBeforeUnload)
	}, [])

	// Force light mode only on actual page refresh (not just when count is 0)
	useEffect(() => {
		// Only force light mode if this is a page refresh AND count is 0 AND not disabled
		const isRefresh = sessionStorage.getItem("isRefresh") === "true"
		if (scrambleCount === 0 && isRefresh && !disabled) {
			try {
				document.documentElement.classList.remove("dark")
				localStorage.setItem("theme", "light")
				window.dispatchEvent(new Event("themeChanged"))
			} catch {}
		}
	}, [scrambleCount, disabled])

    useEffect(() => {
        lettersRef.current = lettersRef.current.slice(0, characters.length)
        queueMicrotask(() => {
            if (!containerRef.current) return
            const centers = lettersRef.current.map((el) => {
                if (!el) return { x: 0, y: 0 }
                const b = el.getBoundingClientRect() // Read the position of the letter in the viewport
                return { x: b.left + b.width / 2, y: b.top + b.height / 2 }
            })
            setOriginalCenters(centers)
            
            // Precompute displaced targets with responsive scaling and viewport clamping
            const screenScale = getScreenScale()
            precomputedRef.current = centers.map((center) => {
                const baseX = (Math.random() * 2 - 1) * 220 * screenScale
                const baseY = (Math.random() * 2 - 1) * 160 * screenScale
                const targetX = center.x + baseX
                const targetY = center.y + baseY
                
                // Clamp to viewport boundaries
                const clamped = clampToViewport(targetX, targetY, center.x, center.y)
                
                return {
                    x: clamped.x - center.x, // Store as offset from original position
                    y: clamped.y - center.y,
                    r: (Math.random() * 2 - 1) * 35
                }
            })
            
            activatedRef.current = centers.map(() => false)
            setOffsets(centers.map(() => ({ x: 0, y: 0, r: 0 })))
            setProgress(0)
        })
    }, [characters.length])

    useEffect(() => {
        if (hasCompleted || isFreezing || isRestoring || disabled) return
        
        const handlePointerMove = (e) => {
            // Get coordinates from either mouse or touch event
            const clientX = e.clientX || (e.touches && e.touches[0]?.clientX)
            const clientY = e.clientY || (e.touches && e.touches[0]?.clientY)
            
            if (clientX === undefined || clientY === undefined) return
            
            setMouse({ x: clientX, y: clientY })
            if (moveFramePendingRef.current) return
            moveFramePendingRef.current = true
            requestAnimationFrame(() => {
                moveFramePendingRef.current = false
                if (originalCenters.length === 0) return
                // Only process movements when in quote section
                if (!isInQuoteSection) return
                
                // Use responsive scramble distance
                const responsiveDistance = getResponsiveScrambleDistance()
                const r2 = responsiveDistance * responsiveDistance
                
                const act = activatedRef.current
                const pre = precomputedRef.current
                let changed = false
                let activatedCount = 0
                for (let i = 0; i < originalCenters.length; i++) {
                    const c = originalCenters[i]
                    const dx = c.x - clientX
                    const dy = c.y - clientY
                    if (dx * dx + dy * dy <= r2) {
                        if (!act[i]) {
                            act[i] = true
                            changed = true
                            // Mark that user is intentionally scrambling
                            setIsIntentionalScramble(true)
                        }
                    }
                    if (act[i]) activatedCount++
                }
        const ratio = originalCenters.length ? activatedCount / originalCenters.length : 0
        // Snap to 1.0 when all letters are activated to avoid float precision issues
        setProgress(activatedCount === originalCenters.length ? 1 : ratio)
                if (changed) {
                    setOffsets(act.map((on, idx) => (on ? pre[idx] : { x: 0, y: 0, r: 0 })))
                }
            })
        }
        
        // Add both mouse and touch event listeners
        window.addEventListener("mousemove", handlePointerMove)
        window.addEventListener("touchmove", handlePointerMove, { passive: true })
        
        return () => {
            window.removeEventListener("mousemove", handlePointerMove)
            window.removeEventListener("touchmove", handlePointerMove)
        }
    }, [hasCompleted, isFreezing, isRestoring, originalCenters, isInQuoteSection])

    // No physics loop; letters snap to precomputed targets when activated

// When threshold reached, complete: scroll to hero (theme change only on first completion)
useEffect(() => {
    if (hasCompleted || disabled) return
    // Only trigger completion if user is actually in the quote section
    // For mobile: use touch state; for desktop: use hover state
    const isInteracting = isTouchingQuote || isHoveringQuote
    if (isInQuoteSection && ((!isInteracting || progress >= 1) && progress >= scrambleThreshold)) {
        if (!isFreezing && !isRestoring) {
            setIsFreezing(true)
            preScrollTimerRef.current = setTimeout(() => {
                setIsFreezing(false)
                // Begin slow restore to original positions
                setIsRestoring(true)
                // Animate to origin by setting offsets to zeros; transition will be slowed via isRestoring flag
                setOffsets(activatedRef.current.map(() => ({ x: 0, y: 0, r: 0 })))
                // After restore duration, mark completed and start scroll
                restoreTimerRef.current = setTimeout(() => {
                    setIsRestoring(false)
                    setHasCompleted(true)
                    
                    // Increment scramble count
                    const newCount = scrambleCount + 1
                    setScrambleCount(newCount)
                    localStorage.setItem("scrambleCount", newCount.toString())
                    
                    // Always scroll to hero
                    try {
                        const hero = document.getElementById("hero")
                        if (hero && !isAnimatingScrollRef.current) {
                            isAnimatingScrollRef.current = true
                            const startY = window.scrollY
                            const endY = hero.getBoundingClientRect().top + window.scrollY
                            
                            // Detect if device is mobile for different scroll behavior
                            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                                           window.innerWidth <= 768 || 
                                           ('ontouchstart' in window)
                            
                            // Use different duration and easing for mobile
                            const duration = isMobile ? 1500 : 2000
                            const startTime = performance.now()
                            
                            // Use smoother easing for mobile
                            const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
                            const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)
                            const easingFunction = isMobile ? easeOutQuart : easeInOutCubic
                            
                            const tick = (now) => {
                                const elapsed = now - startTime
                                const t = Math.min(1, elapsed / duration)
                                const eased = easingFunction(t)
                                
                                // Use different scroll method for mobile
                                if (isMobile) {
                                    // For mobile, use scrollTo with behavior smooth for better performance
                                    if (t < 1) {
                                        window.scrollTo(0, startY + (endY - startY) * eased)
                                        requestAnimationFrame(tick)
                                    } else {
                                        // Final scroll to ensure exact position
                                        window.scrollTo(0, endY)
                                        isAnimatingScrollRef.current = false
                                        // Always check current theme and change to dark if in light mode
                                        const isCurrentlyLight = !document.documentElement.classList.contains("dark")
                                        if (isCurrentlyLight) {
                                            setTimeout(() => {
                                                try {
                                                    document.documentElement.classList.add("dark")
                                                    localStorage.setItem("theme", "dark")
                                                    window.dispatchEvent(new Event("themeChanged"))
                                                } catch {}
                                            }, themeSwitchDelayMs)
                                        }
                                    }
                                } else {
                                    // Desktop behavior
                                window.scrollTo(0, startY + (endY - startY) * eased)
                                if (t < 1) {
                                    requestAnimationFrame(tick)
                                } else {
                                    isAnimatingScrollRef.current = false
                                    // Always check current theme and change to dark if in light mode
                                    const isCurrentlyLight = !document.documentElement.classList.contains("dark")
                                    if (isCurrentlyLight) {
                                        setTimeout(() => {
                                            try {
                                                document.documentElement.classList.add("dark")
                                                localStorage.setItem("theme", "dark")
                                                window.dispatchEvent(new Event("themeChanged"))
                                            } catch {}
                                        }, themeSwitchDelayMs)
                                    }
                                    }
                                }
                            }
                            requestAnimationFrame(tick)
                        }
                    } catch {}
                }, mobileRestoreDurationMs)
            }, mobileFreezeBeforeScrollMs)
        }
    }
    return () => {
        // Cancel freeze only if user interacts back before full scramble or threshold
        if (preScrollTimerRef.current && ((isInteracting && progress < 1) || progress < scrambleThreshold)) {
            clearTimeout(preScrollTimerRef.current)
            preScrollTimerRef.current = null
            setIsFreezing(false)
        }
        if (restoreTimerRef.current && ((isInteracting && progress < 1) || progress < scrambleThreshold)) {
            clearTimeout(restoreTimerRef.current)
            restoreTimerRef.current = null
            setIsRestoring(false)
        }
    }
}, [isHoveringQuote, isTouchingQuote, progress, scrambleThreshold, hasCompleted, scrambleCount, isInQuoteSection, mobileFreezeBeforeScrollMs, mobileRestoreDurationMs, themeSwitchDelayMs])

	// Detect when user is in the quote section
	useEffect(() => {
		const el = containerRef.current
		if (!el) return
		
		const io = new IntersectionObserver(
			(entries) => {
				const entry = entries[0]
				// Consider user "in quote section" when it's 80% visible
				setIsInQuoteSection(entry.intersectionRatio >= 0.8)
			},
			{ threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
		)
		io.observe(el)
		return () => io.disconnect()
	}, [])

	// Reset scramble state only when all conditions are met
	useEffect(() => {
		// Check 1: User scrolled back to quote section
		// Check 2: User is interacting with quote section (hovering on desktop or touching on mobile)
		// Check 3: Quote has been completed before
		// Check 4: User is not currently in a scramble animation
		// Check 5: User has started scrambling (progress > 0) - indicating active interaction
		// Check 6: User is not coming from writings pages (disabled state)
		// Check 7: User has been interacting for at least a short time (debounce)
		const isInteracting = isTouchingQuote || isHoveringQuote
		if (hasCompleted && 
			isInQuoteSection && 
			isInteracting && 
			!isFreezing && 
			!isRestoring && 
			progress > 0 && 
			!disabled) {
			
			// Add a small delay to ensure this is intentional interaction
			const resetTimer = setTimeout(() => {
				// Double-check conditions after delay
				if (hasCompleted && isInQuoteSection && isInteracting && !isFreezing && !isRestoring && progress > 0 && !disabled) {
					// User intentionally scrolled to quote section and is actively scrambling
					// Reset the scramble state to allow re-scrambling
					activatedRef.current = activatedRef.current.map(() => false)
					setOffsets(activatedRef.current.map(() => ({ x: 0, y: 0, r: 0 })))
					setProgress(0)
					setHasCompleted(false)
					setIsIntentionalScramble(false)
				}
			}, 300) // 300ms delay to ensure intentional interaction
			
			return () => clearTimeout(resetTimer)
		}
	}, [hasCompleted, isInQuoteSection, isHoveringQuote, isTouchingQuote, isFreezing, isRestoring, progress, disabled])

  return (
		<section id="quote" ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-background text-foreground">
			<div 
				className="relative max-w-5xl p-6 select-none text-center" 
				onMouseEnter={() => setIsHoveringQuote(true)} 
				onMouseLeave={() => setIsHoveringQuote(false)}
				onTouchStart={() => setIsTouchingQuote(true)}
				onTouchEnd={() => setIsTouchingQuote(false)}
			>
				<motion.div className="leading-relaxed">
					{(() => {
						let li = 0
						return words.map((word, wi) => {
							const isBreakHere = words.slice(wi, wi + 6).join(' ') === 'for it shows me the stars'
							return (
								<Fragment key={`grp-${wi}`}>
									{isBreakHere && wi !== 0 && <span className="block w-full h-0" />}
									<span className="inline-block whitespace-nowrap mr-2 last:mr-0">
								{Array.from(word).map((ch, ci) => {
									const idx = li++
									return (
										<motion.span
											key={`l-${wi}-${ci}`}
											ref={(el) => (lettersRef.current[idx] = el)}
											className="inline-block align-middle text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-glow"
											style={{ display: 'inline-block' }}
											animate={{ x: offsets[idx]?.x || 0, y: offsets[idx]?.y || 0, rotate: offsets[idx]?.r || 0 }}
											transition={isRestoring ? { type: 'spring', stiffness: 120, damping: 22, mass: 1.1 } : { type: 'spring', stiffness: 200, damping: 18, mass: 0.6 }}
										>
											{ch}
										</motion.span>
									)
								})}
							</span>
							</Fragment>
						)
						})
					})()}
				</motion.div>
				<div className="mt-6 text-sm opacity-60">scramble the words</div>
			</div>
		</section>
	)
}

export default IntroScramble


