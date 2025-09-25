
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { UserInfo, SymptomData, AnalysisResultData, Language, PastAnalysis } from './types';
import { UI_TEXT } from './constants';
import Header from './components/Header';
import UserInfoForm from './components/UserInfoForm';
import SymptomInput from './components/SymptomInput';
import AnalysisResult from './components/AnalysisResult';
import Loader from './components/Loader';
import PastAnalysesList from './components/PastAnalysesList';

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [symptomData, setSymptomData] = useState<SymptomData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [error, setError] = useState<string | null>(null);
  const [pastAnalyses, setPastAnalyses] = useState<PastAnalysis[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const savedAnalyses = localStorage.getItem('healthAnalyses');
      if (savedAnalyses) {
        setPastAnalyses(JSON.parse(savedAnalyses));
      }
    } catch (e) {
      console.error("Failed to load past analyses from localStorage", e);
    }
  }, []);

  const handleUserInfoSubmit = (data: UserInfo) => {
    setUserInfo(data);
  };

  const handleSymptomSubmit = (data: SymptomData) => {
    setSymptomData(data);
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = (result: AnalysisResultData) => {
    setAnalysisResult(result);
    setIsAnalyzing(false);
    setError(null);

    // Save to localStorage
    if(userInfo) {
       const newAnalysis: PastAnalysis = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        userInfo,
        result,
      };
      const updatedAnalyses = [...pastAnalyses, newAnalysis];
      setPastAnalyses(updatedAnalyses);
      localStorage.setItem('healthAnalyses', JSON.stringify(updatedAnalyses));
    }
  };

  const handleAnalysisError = (errorMessage: string) => {
    setError(errorMessage);
    setIsAnalyzing(false);
    // Stay on symptom input, don't clear data
  };

  const handleStartOver = () => {
    setUserInfo(null);
    setSymptomData(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    setError(null);
    navigate('/');
  };

  const AnalysisFlow: React.FC = () => {
    if (analysisResult) {
      return <AnalysisResult result={analysisResult} onStartOver={handleStartOver} language={language} />;
    }
    if (isAnalyzing) {
      return <Loader language={language} />;
    }
    if (userInfo) {
      return (
        <SymptomInput
          userInfo={userInfo}
          onSubmit={handleSymptomSubmit}
          onAnalysisComplete={handleAnalysisComplete}
          onAnalysisError={handleAnalysisError}
          language={language}
          initialSymptoms={symptomData?.text || ''}
        />
      );
    }
    return <UserInfoForm onSubmit={handleUserInfoSubmit} language={language} />;
  };
  
  const PastAnalysisDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const analysis = pastAnalyses.find(a => a.id === id);

    if (!analysis) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold">Analysis not found.</h2>
                <button onClick={() => navigate('/history')} className="mt-4 text-blue-600 hover:underline">
                    Back to History
                </button>
            </div>
        );
    }

    return (
        <AnalysisResult
            result={analysis.result}
            onStartOver={() => navigate('/history')}
            language={language}
            isPastAnalysis={true}
        />
    );
  };

  return (
    <div className={`min-h-screen bg-slate-100 text-slate-700 ${language === 'ta' ? 'font-tamil' : ''}`}>
      <Header language={language} setLanguage={setLanguage} historyCount={pastAnalyses.length} onStartOver={handleStartOver} />
      <main className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 min-h-[60vh] flex flex-col">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md" role="alert">
              <p className="font-bold">{UI_TEXT[language].errorTitle}</p>
              <p>{error}</p>
            </div>
          )}
          <Routes>
            <Route path="/" element={<AnalysisFlow />} />
            <Route path="/history" element={<PastAnalysesList analyses={pastAnalyses} language={language} />} />
            <Route path="/history/:id" element={<PastAnalysisDetail />} />
          </Routes>
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-xs">
          <p>{UI_TEXT[language].footerDisclaimer}</p>
      </footer>
    </div>
  );
};

export default App;
