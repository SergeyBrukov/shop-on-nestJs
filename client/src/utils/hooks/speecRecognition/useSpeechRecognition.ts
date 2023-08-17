import {useEffect, useState} from "react";


let recognition: any = null;

if ("webkitSpeechRecognition" in window) {
  //@ts-ignore
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  // recognition.lang = "en-US";
  recognition.lang = "uk-UA";
}

const useSpeechRecognition = (setSearch: (search: string) => void) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: any) => {
      setSearch(event.results[0][0].transcript)
      recognition.stop();
      setIsListening(false);
    };
  }, []);

  const startListening = () => {
    setSearch("");
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  return {
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition
  };
};

export default useSpeechRecognition;