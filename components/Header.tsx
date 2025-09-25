import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { UI_TEXT } from '../constants';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  historyCount: number;
  onStartOver: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, historyCount, onStartOver }) => {
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-3 flex justify-between items-center">
        <Link to="/start" onClick={onStartOver} className="flex items-center space-x-3" aria-label="Home">
            <svg className="w-10 h-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <h1 className="text-2xl font-bold text-slate-800">
             {UI_TEXT[language].title}
            </h1>
        </Link>
        <div className="flex items-center space-x-4">
          {historyCount > 0 && (
            <Link to="/history" className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors font-medium">
                {UI_TEXT[language].viewHistory}
                <span className="ml-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{historyCount}</span>
            </Link>
          )}
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {UI_TEXT[language].langToggle}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
