
import { useState, useRef, useCallback } from 'react';

export interface VideoRecorder {
  isRecording: boolean;
  isCameraOpen: boolean;
  videoBlob: Blob | null;
  stream: MediaStream | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  reset: () => void;
}

const useVideoRecorder = (): VideoRecorder => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const stopCamera = useCallback(() => {
    setStream(prevStream => {
        if (prevStream) {
            prevStream.getTracks().forEach(track => track.stop());
        }
        return null;
    });
    setIsCameraOpen(false);
  }, []);
  
  const startCamera = useCallback(async () => {
    if (isRecording) return;
    
    // Stop any existing streams before starting a new one
    stopCamera();
    setVideoBlob(null);

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(newStream);
      setIsCameraOpen(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      // Handle permission denied error gracefully
      alert("Camera access was denied. Please enable camera permissions in your browser settings to use this feature.");
    }
  }, [isRecording, stopCamera]);


  const startRecording = useCallback(() => {
    if (stream) {
      recordedChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        setVideoBlob(blob);
        setIsRecording(false);
        stopCamera();
      };

      mediaRecorder.start();
      setIsRecording(true);
    }
  }, [stream, stopCamera]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  }, [isRecording]);

  const reset = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
    }
    stopCamera();
    setVideoBlob(null);
    setIsRecording(false);
  }, [stopCamera]);

  return { isRecording, isCameraOpen, videoBlob, stream, startCamera, stopCamera, startRecording, stopRecording, reset };
};

export default useVideoRecorder;
