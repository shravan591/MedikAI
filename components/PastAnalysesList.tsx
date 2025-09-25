
import React from 'react';
import { Link } from 'react-router-dom';
import { PastAnalysis, Language } from '../types';
import { UI_TEXT } from '../constants';

interface PastAnalysesListProps {
  analyses: PastAnalysis[];
  language: Language;
}

const PastAnalysesList: React.FC<PastAnalysesListProps> = ({ analyses, language }) => {

  const sortedAnalyses = [...analyses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">{UI_TEXT[language].pastAnalysesTitle}</h2>
      
      {sortedAnalyses.length === 0 ? (
        <p className="text-center text-slate-500">{UI_TEXT[language].noPastAnalyses}</p>
      ) : (
        <div className="space-y-4">
          {sortedAnalyses.map((analysis) => (
            <div key={analysis.id} className="bg-slate-50 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4 transition-shadow hover:shadow-md">
                <div>
                    <p className="font-semibold text-slate-800">{analysis.userInfo.name}, {analysis.userInfo.age}</p>
                    <p className="text-sm text-slate-500">
                        {new Date(analysis.date).toLocaleString(language === 'ta' ? 'ta-IN' : 'en-US', {
                            dateStyle: 'long',
                            timeStyle: 'short',
                        })}
                    </p>
                </div>
                <Link
                    to={`/history/${analysis.id}`}
                    className="w-full sm:w-auto text-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                    {UI_TEXT[language].viewReport}
                </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PastAnalysesList;
