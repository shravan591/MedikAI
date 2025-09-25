
import { useState, useEffect } from 'react';

interface TextToSpeechOptions {
  lang?: string;
}

const useTextToSpeech = ({ lang = 'en-US' }: TextToSpeechOptions) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const handleVoicesChanged = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    handleVoicesChanged(); // Initial load
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, []);

  const speak = (text: string) => {
    if (!window.speechSynthesis) {
      console.error('Text-to-speech not supported in this browser.');
      return;
    }
    
    if (isSpeaking) {
        window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    const selectedVoice = voices.find(voice => voice.lang === lang) || voices.find(voice => voice.lang.startsWith(lang.split('-')[0]));
    if(selectedVoice) {
        utterance.voice = selectedVoice;
    }
    utterance.lang = lang;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  return { isSpeaking, speak };
};

export default useTextToSpeech;
