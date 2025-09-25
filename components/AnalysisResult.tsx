
import React from 'react';
import { AnalysisResultData, Language } from '../types';
import { UI_TEXT } from '../constants';
import useTextToSpeech from '../hooks/useTextToSpeech';

interface AnalysisResultProps {
  result: AnalysisResultData;
  onStartOver: () => void;
  language: Language;
  isPastAnalysis?: boolean;
}

const ReadAloudIcon: React.FC = () => (
    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>
);

const SuggestionIcon: React.FC = () => (
    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onStartOver, language, isPastAnalysis }) => {
  const { speak } = useTextToSpeech({ lang: language === 'ta' ? 'ta-IN' : 'en-US' });

  const textToRead = `
    ${UI_TEXT[language].assessmentLabel}: ${result.assessment}.
    ${UI_TEXT[language].suggestionsLabel}: ${result.suggestions.join(', ')}.
    ${result.isCritical ? `${UI_TEXT[language].criticalAlertTitle}: ${result.criticalityReason}` : ''}
  `;
  
  const handleSchedule = () => {
    const title = encodeURIComponent('Doctor Consultation');
    const details = encodeURIComponent(`Follow-up consultation regarding symptoms: ${result.assessment}. \n\nPlease join using this link: https://meet.new`);
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <h2 className="text-3xl font-bold text-slate-800">{UI_TEXT[language].resultTitle}</h2>
        <button
          onClick={() => speak(textToRead)}
          className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-lg hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          <ReadAloudIcon />
          {UI_TEXT[language].readAloud}
        </button>
      </div>

      {result.isCritical && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-900 p-4 rounded-md shadow-lg" role="alert">
          <h3 className="font-bold text-xl mb-2 text-red-900 flex items-center">
            <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
            {UI_TEXT[language].criticalAlertTitle}
          </h3>
          <p>{result.criticalityReason}</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <a
              href="https://meet.new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-center bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              {UI_TEXT[language].consultDoctor}
            </a>
            <button
              onClick={handleSchedule}
              className="bg-slate-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors"
            >
              {UI_TEXT[language].scheduleConsultation}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-50 p-5 rounded-xl">
          <h3 className="text-xl font-semibold text-slate-700 mb-3">{UI_TEXT[language].assessmentLabel}</h3>
          <p className="text-slate-600">{result.assessment}</p>
        </div>
        <div className="bg-slate-50 p-5 rounded-xl">
          <h3 className="text-xl font-semibold text-slate-700 mb-3">{UI_TEXT[language].suggestionsLabel}</h3>
          <ul className="space-y-3">
            {result.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <SuggestionIcon />
                <span className="text-slate-600">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-xs text-slate-500 italic mt-4">{result.disclaimer}</p>

      <div className="text-center pt-4">
        <button
          onClick={onStartOver}
          className="bg-slate-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
        >
          {isPastAnalysis ? UI_TEXT[language].backToHistory : UI_TEXT[language].startOver}
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;
