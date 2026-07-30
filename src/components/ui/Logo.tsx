export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 160 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height: '100%', width: 'auto' }}
    >
      <g stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
        {/* Monitor Screen */}
        <path d="M10,42 L10,24 L45,12 L45,40 Z" />
        {/* Monitor Stand */}
        <path d="M24,42 L24,50" />
        <path d="M32,42 L32,50" />
        <line x1="8" y1="50" x2="40" y2="50" strokeLinecap="round" />
      </g>
      
      {/* Tower Solid Left Face (overlapping monitor) */}
      <path 
        d="M35,38 L48,18 L55,22 L52,50 L38,50 Z" 
        fill="currentColor" 
      />
      
      {/* Tower Outline Right Face */}
      <path 
        d="M48,18 L70,25 L66,50 L52,50" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinejoin="round" 
      />
      
      {/* MEC Text */}
      <text 
        x="80" 
        y="42" 
        fill="currentColor" 
        fontFamily="var(--font-inter, sans-serif)" 
        fontSize="28" 
        fontWeight="800" 
        letterSpacing="0.5"
      >
        MEC
      </text>
    </svg>
  );
}
