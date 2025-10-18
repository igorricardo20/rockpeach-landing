import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogoRevealProps {
    onComplete: () => void;
}

const LogoReveal: React.FC<LogoRevealProps> = ({ onComplete }) => {
    const [stage, setStage] = useState<'reveal' | 'hold' | 'transition' | 'complete'>('reveal');
    const letters = 'ROCKPEACH'.split('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // After letter animation completes (1.8s), hold for a moment
        const revealTimer = setTimeout(() => {
            setStage('hold');
        }, 2000);

        return () => clearTimeout(revealTimer);
    }, []);

    useEffect(() => {
        if (stage === 'hold') {
            // Hold the full logo for 0.8s, then start transition
            const holdTimer = setTimeout(() => {
                setStage('transition');
            }, 800);

            return () => clearTimeout(holdTimer);
        }
    }, [stage]);

    useEffect(() => {
        if (stage === 'transition') {
            // After transition animation (1.2s), mark as complete
            const transitionTimer = setTimeout(() => {
                setStage('complete');
                onComplete();
            }, 1200);

            return () => clearTimeout(transitionTimer);
        }
    }, [stage, onComplete]);

    // Gradient colors based on the logo
    const getLetterColor = (index: number) => {
        const colors = [
            '#1e8fd4', // R - blue
            '#2b92d2', // O - blue-purple
            '#3f96cf', // C - blue-purple
            '#5c9dc8', // K - purple-blue
            '#7aa4be', // P - purple
            '#9daab1', // E - purple-pink
            '#bb8e9c', // A - pink
            '#d07a88', // C - pink
            '#d65f7f', // H - pink
        ];
        return colors[index] || '#1e8fd4';
    };

    return (
        <AnimatePresence>
            {stage !== 'complete' && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ perspective: '2000px' }}
                >
                    <div className="flex flex-col items-center gap-6">
                        <motion.div
                            className="flex items-center justify-center"
                            style={{ transformStyle: 'preserve-3d' }}
                            animate={
                                stage === 'transition'
                                    ? {
                                          scale: isMobile ? 0.035 : 0.038,
                                          x: isMobile ? 'calc(-50vw + 90px)' : 'calc(-50vw + 135px)',
                                          y: isMobile ? 'calc(-50vh + 28px)' : 'calc(-50vh + 32px)',
                                      }
                                    : {}
                            }
                            transition={{
                                duration: 1.2,
                                ease: [0.77, 0, 0.175, 1],
                            }}
                        >
                            <div className="flex" style={{ transformStyle: 'preserve-3d' }}>
                                {letters.map((letter, index) => (
                                    <motion.span
                                        key={index}
                                        className="font-manrope font-extrabold italic relative"
                                        style={{
                                            fontSize: '12rem',
                                            color: getLetterColor(index),
                                            textShadow: `
                                                2px 2px 0px rgba(0,0,0,0.1),
                                                4px 4px 0px rgba(0,0,0,0.08),
                                                6px 6px 0px rgba(0,0,0,0.06),
                                                8px 8px 0px rgba(0,0,0,0.04),
                                                10px 10px 0px rgba(0,0,0,0.02),
                                                0 15px 30px rgba(0,0,0,0.15)
                                            `,
                                            transform: 'translateZ(50px)',
                                            transformStyle: 'preserve-3d',
                                        }}
                                        initial={{ opacity: 0, y: 80, rotateX: -90, z: -100 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.08,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Tagline */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={stage === 'transition' ? { opacity: 0, y: -20 } : stage === 'hold' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{
                                duration: 0.6,
                                delay: stage === 'hold' ? 0 : 0,
                            }}
                        >
                            <p
                                className="font-inter font-medium tracking-wide"
                                style={{
                                    fontSize: '1.8rem',
                                    background: 'linear-gradient(to right, #1e8fd4, #8b6bb7, #d65f7f)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                solid code, sweet results
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LogoReveal;
