
import React from 'react';
import { Language } from '../types';
import { UI_TEXT } from '../constants';

interface LoaderProps {
    language: Language;
}

const Loader: React.FC<LoaderProps> = ({ language }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <div className="w-16 h-16 border-4 border-t-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-lg text-slate-600">{UI_TEXT[language].loaderText}</p>
    </div>
  );
};

export default Loader;