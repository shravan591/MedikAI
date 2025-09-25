import React, { useState, useRef, useEffect } from 'react';
import { Language, SymptomData, UserInfo, AnalysisResultData } from '../types';
import { UI_TEXT } from '../constants';
import { analyzeSymptoms } from '../services/geminiService';
import useSpeechToText from '../hooks/useSpeechToText';
import useVideoRecorder, { VideoRecorder } from '../hooks/useVideoRecorder';

interface SymptomInputProps {
  userInfo: UserInfo;
  onSubmit: (data: SymptomData) => void;
  onAnalysisComplete: (result: AnalysisResultData) => void;
  onAnalysisError: (error: string) => void;
  language: Language;
  initialSymptoms: string;
}

// Icons
// FIX: Moved and consolidated icon component definitions to the top-level of the file to prevent redeclaration errors.
const MicIcon: React.FC<{isListening: boolean}> = ({ isListening }) => (
    isListening ? (
        <div className="flex items-end justify-center gap-1 w-6 h-6">
            <span className="w-1 h-2 bg-white rounded-full animate-[voice-wave_1s_infinite_ease-in-out_0.1s]" />
            <span className="w-1 h-4 bg-white rounded-full animate-[voice-wave_1s_infinite_ease-in-out_0.3s]" />
            <span className="w-1 h-2 bg-white rounded-full animate-[voice-wave_1s_infinite_ease-in-out_0.5s]" />
        </div>
    ) : (
        <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m12 0v-1.5a6 6 0 0 0-12 0v1.5m6 7.5a6 6 0 0 0 6-6" />
        </svg>
    )
);
const CameraIcon: React.FC = () => (
    <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.776 48.776 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>
);
const VideoIcon: React.FC = () => (
    <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" />
    </svg>
);


const VideoRecorderModal: React.FC<{
    recorder: VideoRecorder;
    onClose: () => void;
    onSubmit: (blob: Blob) => void;
}> = ({ recorder, onClose, onSubmit }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (recorder.isCameraOpen && recorder.stream && videoRef.current) {
            videoRef.current.srcObject = recorder.stream;
        }
    }, [recorder.isCameraOpen, recorder.stream]);

    const handleUseVideo = () => {
        if (recorder.videoBlob) {
            onSubmit(recorder.videoBlob);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="p-4 border-b">
                    <h3 className="text-lg font-medium">Record Symptom Video</h3>
                </div>
                <div className="p-4">
                    <div className="bg-slate-900 rounded-md overflow-hidden aspect-video">
                        <video ref={videoRef} autoPlay muted playsInline className={`w-full h-full object-cover ${recorder.videoBlob ? '' : 'transform -scale-x-100'}`} src={recorder.videoBlob ? URL.createObjectURL(recorder.videoBlob) : undefined} />
                    </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-b-lg flex justify-between items-center">
                    <div>
                        {recorder.isRecording && <p className="text-red-500 animate-pulse">Recording...</p>}
                        {recorder.videoBlob && <p className="text-green-600">Recording complete!</p>}
                    </div>
                    <div className="flex items-center gap-2">
                        {(!recorder.videoBlob && !recorder.isRecording) && (
                            <>
                                <button onClick={onClose} className="px-4 py-2 bg-slate-200 rounded-md hover:bg-slate-300">Cancel</button>
                                <button onClick={recorder.startRecording} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Start Recording</button>
                            </>
                        )}
                        {recorder.isRecording && (
                            <button onClick={recorder.stopRecording} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Stop Recording</button>
                        )}
                        {recorder.videoBlob && (
                             <>
                                <button onClick={recorder.startCamera} className="px-4 py-2 bg-slate-200 rounded-md hover:bg-slate-300">Retake</button>
                                <button onClick={handleUseVideo} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Use Video</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


const SymptomInput: React.FC<SymptomInputProps> = ({ userInfo, onSubmit, onAnalysisComplete, onAnalysisError, language, initialSymptoms }) => {
  const [symptomText, setSymptomText] = useState(initialSymptoms);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recorder = useVideoRecorder();

  const { isListening, startListening, stopListening } = useSpeechToText({
    onResult: (result) => setSymptomText(prev => `${prev} ${result}`.trim()),
    lang: language === 'ta' ? 'ta-IN' : 'en-US'
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageBase64(base64String);
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!symptomText.trim()) {
      onAnalysisError("Please describe your symptoms before analyzing.");
      return;
    }
    const data: SymptomData = { text: symptomText, imageBase64 };
    onSubmit(data);
    try {
      const result = await analyzeSymptoms(language, userInfo, data);
      onAnalysisComplete(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred during analysis.';
      onAnalysisError(message);
    }
  };

  const handleMicClick = () => {
      if(isListening) {
          stopListening();
      } else {
          startListening();
      }
  };
  
  const handleOpenVideoRecorder = () => {
      recorder.startCamera();
      setIsModalOpen(true);
  };
  
  const handleCloseVideoRecorder = () => {
      recorder.reset();
      setIsModalOpen(false);
  };

  const handleVideoSubmit = (videoBlob: Blob) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(videoBlob);
    video.onloadeddata = () => {
        video.currentTime = video.duration / 2; // Seek to middle
    };
    video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const frameDataUrl = canvas.toDataURL('image/jpeg');
            setImageBase64(frameDataUrl);
            setImagePreview(frameDataUrl);
        }
        handleCloseVideoRecorder();
    };
  };
  
  const clearPreview = () => {
      setImagePreview(null);
      setImageBase64(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
       {isModalOpen && <VideoRecorderModal recorder={recorder} onClose={handleCloseVideoRecorder} onSubmit={handleVideoSubmit} />}

      <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">{UI_TEXT[language].symptomTitle}</h2>
      <p className="text-slate-600 mb-6 text-center max-w-xl mx-auto">{UI_TEXT[language].symptomDescription}</p>

      <div className="flex-grow flex flex-col space-y-4">
        <textarea
          value={symptomText}
          onChange={(e) => setSymptomText(e.target.value)}
          placeholder={UI_TEXT[language].symptomPlaceholder}
          className="w-full h-40 p-4 bg-slate-800 text-white border border-slate-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none placeholder:text-slate-400"
        />
        {imagePreview && (
          <div className="relative w-32 h-32 mx-auto group">
            <img src={imagePreview} alt="Symptom preview" className="rounded-lg object-cover w-full h-full shadow-md" />
            <button
              onClick={clearPreview}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 leading-none hover:bg-red-700 w-6 h-6 flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              &times;
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={handleMicClick} title={UI_TEXT[language].micButton} className={`flex items-center justify-center w-14 h-14 rounded-full transition-colors ${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 ${isListening ? 'focus:ring-red-500' : 'focus:ring-indigo-500'}`}>
                <MicIcon isListening={isListening} />
            </button>
            <button onClick={() => fileInputRef.current?.click()} title={UI_TEXT[language].cameraButton} className="flex items-center justify-center w-14 h-14 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                <CameraIcon />
            </button>
            <button onClick={handleOpenVideoRecorder} title={UI_TEXT[language].videoButton} className="flex items-center justify-center w-14 h-14 bg-purple-600 text-white rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
                <VideoIcon />
            </button>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        </div>
        <button
          onClick={handleAnalyze}
          className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
        >
          {UI_TEXT[language].analyzeButton}
        </button>
      </div>
    </div>
  );
};

export default SymptomInput;