import React from 'react';

export function AnimatedContainer({
  children,
  animationDelay = '0s',
}: {
  children: React.ReactNode;
  animationDelay?: string;
}) {
  return (<>
    <div
      style={{
        animation: 'widthAnimation 6s infinite alternate ease-in-out',
        animationDelay,
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
          @keyframes widthAnimation {
            0% {
              width: 300px;
            }
            100% {
              width: calc(100vw - 4rem);
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
      </p></>
  );
}
