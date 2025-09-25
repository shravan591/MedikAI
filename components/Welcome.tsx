import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [fadeout, setFadeout] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeout(true);
    }, 3000); // Start fade out after 3s

    const redirectTimer = setTimeout(() => {
      navigate('/start');
    }, 3500); // Navigate after 3.5s

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);
  
  const LogoIcon: React.FC<{className?: string}> = ({className}) => (
     <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-slate-100 animate-fade-in ${fadeout ? 'animate-fade-out' : ''}`}>
        <div className="relative flex items-center justify-center">
            <LogoIcon className="w-32 h-32 text-blue-600 animate-pulse-breathe"/>
            {/* Radiating plus signs for decoration */}
            <div className="absolute text-blue-400 text-2xl font-thin animate-radiate-1">+</div>
            <div className="absolute text-blue-400 text-lg font-thin animate-radiate-2">+</div>
            <div className="absolute text-blue-400 text-2xl font-thin animate-radiate-3">+</div>
            <div className="absolute text-blue-400 text-xl font-thin animate-radiate-4">+</div>
        </div>
      <h1 className="text-4xl font-bold text-slate-800 mt-8 animate-fade-in-delay-1">
        AI Healthcare Assistant
      </h1>
       <p className="text-slate-600 mt-2 animate-fade-in-delay-2">
        Your personal health companion
      </p>
    </div>
  );
};

export default Welcome;
