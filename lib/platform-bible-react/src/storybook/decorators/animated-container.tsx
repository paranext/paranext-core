import { useMemo, type ReactNode } from 'react';

export function AnimatedContainer({
  children,
  minWidth = '0%',
  maxWidth = 'calc(100vw - 4rem)',
  skipAhead = '0%',
}: {
  children: ReactNode;
  minWidth?: string;
  maxWidth?: string;
  skipAhead?: string; // Percentage to skip ahead in the animation loop
}) {
  // Generate a unique keyframes name for each instance
  const animationName = useMemo(
    () => `widthAnimation-${Math.random().toString(36).substr(2, 9)}`,
    [],
  );

  return (
    <>
      <div
        style={{
          animation: `${animationName} 6s infinite alternate ease-in-out`,
          animationDelay: `-${skipAhead}`,
          border: '2px solid #ccc',
          borderRadius: '16px',
          marginBlock: '1rem',
          background: '#fdfdfd',
          boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          padding: '.5rem',
          maxWidth: '100%',
        }}
      >
        {children}

        <style>
          {`
            @keyframes ${animationName} {
              0% {
                width: ${minWidth};
              }
              100% {
                width: ${maxWidth};
              }
            }
          `}
        </style>
      </div>
      <p
        style={{
          paddingInlineStart: '1rem',
          fontSize: 12,
          color: '#888',
        }}
      >
        Container width is animated
      </p>
    </>
  );
}
