import React, { useEffect, useState } from 'react';

interface CosmicParallaxBgProps {
  /**
   * Main heading text (displayed large in the center)
   */
  head: string;
  
  /**
   * Subtitle text (displayed below the heading)
   * Comma-separated string that will be split into animated parts
   */
  text: string;
  
  /**
   * Whether the text animations should loop
   * @default true
   */
  loop?: boolean;
  
  /**
   * Custom class name for additional styling
   */
  className?: string;
  
  children?: React.ReactNode;
}

/**
 * A cosmic parallax background component with animated stars and text
 */
const CosmicParallaxBg: React.FC<CosmicParallaxBgProps> = ({
  head,
  text,
  loop = true,
  className = '',
  children,
}) => {
  const [smallStars, setSmallStars] = useState<string>('');
  const [mediumStars, setMediumStars] = useState<string>('');
  const [bigStars, setBigStars] = useState<string>('');
  
  // Split the text by commas and trim whitespace
  const textParts = text.split(',').map(part => part.trim());
  
  // Generate random star positions
  const generateStarBoxShadow = (count: number): string => {
    let shadows = [];
    
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      shadows.push(`${x}px ${y}px #FFF`);
    }
    
    return shadows.join(', ');
  };
  
  useEffect(() => {
    // Generate star shadows when component mounts
    setSmallStars(generateStarBoxShadow(300));
    setMediumStars(generateStarBoxShadow(80));
    setBigStars(generateStarBoxShadow(30));
    
    // Set animation iteration based on loop prop
    document.documentElement.style.setProperty(
      '--animation-iteration', 
      loop ? 'infinite' : '1'
    );
  }, [loop]);
  
  return (
    <div className={`cosmic-parallax-container absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Stars layers */}
      <div 
        id="stars" 
        style={{ boxShadow: smallStars }}
        className="cosmic-stars"
      ></div>
      <div 
        id="stars2" 
        style={{ boxShadow: mediumStars }}
        className="cosmic-stars-medium"
      ></div>
      <div 
        id="stars3" 
        style={{ boxShadow: bigStars }}
        className="cosmic-stars-large"
      ></div>
      
      {/* Horizon and Earth */}
      <div id="horizon" className="absolute bottom-0 w-full z-10">
        <div className="glow"></div>
      </div>
      <div id="earth" className="absolute z-10"></div>
      
      {/* Centered Content Container */}
      {head && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none select-none">
          <div id="title" className="text-white font-bold tracking-[0.15em] text-center select-none mb-4">
            {head.toUpperCase()}
          </div>
          <div id="subtitle" className="text-zinc-500 font-mono tracking-widest text-center select-none">
            {textParts.map((part, index) => (
              <React.Fragment key={index}>
                <span className={`subtitle-part-${index + 1} inline-block mx-2`}>{part.toUpperCase()}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
};

export { CosmicParallaxBg };
