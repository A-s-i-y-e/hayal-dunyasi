import React, { useState, useRef } from "react";

interface AudioRecorderProps {
  onAudioRecorded: (audioBlob: Blob) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onAudioRecorded }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        onAudioRecorded(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Ses kaydı başlatılamadı:", error);
      alert(
        "Ses kaydı başlatılamadı. Lütfen mikrofon izinlerini kontrol edin."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const handleDelete = () => {
    setAudioURL(null);
    audioChunksRef.current = [];
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-800">Ses Kaydı</h3>
          <div className="flex gap-2">
            {!isRecording && !audioURL && (
              <button
                onClick={startRecording}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Kayda Başla
              </button>
            )}
            {isRecording && (
              <button
                onClick={stopRecording}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Kaydı Durdur
              </button>
            )}
            {audioURL && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Kaydı Sil
              </button>
            )}
          </div>
        </div>

        {isRecording && (
          <div className="flex items-center gap-2 text-red-600">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
            <span>Kayıt yapılıyor...</span>
          </div>
        )}

        {audioURL && (
          <div className="mt-4">
            <audio controls src={audioURL} className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
