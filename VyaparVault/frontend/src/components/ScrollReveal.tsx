import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealProps {
    children: ReactNode;
    scrollContainerRef?: RefObject<HTMLElement>;
    enableBlur?: boolean;
    baseOpacity?: number;
    baseRotation?: number;
    blurStrength?: number;
    containerClassName?: string;
    textClassName?: string;
    rotationEnd?: string;
    wordAnimationEnd?: string;
    as?: React.ElementType; // allows changing the wrapper tag
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    scrollContainerRef,
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    containerClassName = '',
    textClassName = '',
    rotationEnd = 'bottom bottom',
    wordAnimationEnd = 'bottom bottom',
    as: Component = 'div', // Use div by default instead of h2 to respect layout
}) => {
    const containerRef = useRef<HTMLElement>(null);

    const splitText = useMemo(() => {
        // recursively extract string if children isn't directly a string, but for now assuming it receives string text.
        const text = typeof children === 'string' ? children : String(children);
        return text.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word;
            return (
                <span className="inline-block word" key={index}>
                    {word}
                </span>
            );
        });
    }, [children]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

        gsap.fromTo(
            el,
            { transformOrigin: '0% 50%', rotate: baseRotation },
            {
                ease: 'none',
                rotate: 0,
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: 'top bottom',
                    end: rotationEnd,
                    scrub: true
                }
            }
        );

        const wordElements = el.querySelectorAll<HTMLElement>('.word');

        gsap.fromTo(
            wordElements,
            { opacity: baseOpacity, willChange: 'opacity' },
            {
                ease: 'none',
                opacity: 1,
                stagger: 0.05,
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: 'top bottom-=20%',
                    end: wordAnimationEnd,
                    scrub: true
                }
            }
        );

        if (enableBlur) {
            gsap.fromTo(
                wordElements,
                { filter: `blur(${blurStrength}px)` },
                {
                    ease: 'none',
                    filter: 'blur(0px)',
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: el,
                        scroller,
                        start: 'top bottom-=20%',
                        end: wordAnimationEnd,
                        scrub: true
                    }
                }
            );
        }

        // It's important NOT to kill all scroll triggers as other components (like Shuffle) might be using them.
        // So we store these specific triggers and kill them on unmount.
        const triggers = ScrollTrigger.getAll().filter(t => t.trigger === el);

        return () => {
            triggers.forEach(trigger => trigger.kill());
        };
    }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

    return (
        <Component ref={containerRef} className={containerClassName}>
            <span className={textClassName}>{splitText}</span>
        </Component>
    );
};

export default ScrollReveal;
