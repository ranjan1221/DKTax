import React from 'react';

const Preloader = ({ visible }: { visible: boolean }) => (
  <div
    className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    style={{ transitionProperty: 'opacity' }}
  >
    <span
      className="text-6xl md:text-7xl font-extrabold text-white select-none drop-shadow-lg"
      style={{
        animation: 'dk-bounce 1.2s infinite cubic-bezier(0.4,0,0.2,1)',
        display: 'inline-block',
      }}
    >
      DK
    </span>
    <style>{`
      @keyframes dk-bounce {
        0% { transform: scale(1) rotate(0deg); opacity: 1; }
        20% { transform: scale(1.15) rotate(-8deg); opacity: 0.95; }
        40% { transform: scale(0.95) rotate(8deg); opacity: 0.9; }
        60% { transform: scale(1.1) rotate(-4deg); opacity: 1; }
        80% { transform: scale(0.98) rotate(4deg); opacity: 0.95; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
    `}</style>
  </div>
);

export default Preloader; 