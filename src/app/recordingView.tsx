"use client";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}
export default function RecordingView() {
  const [isRecording, isRecordingSet] = useState<boolean>(false);
  const [recordingComplete, recordingCompleteSet] = useState<boolean>(false);
  const [transcript, transcriptSet] = useState<string>("");
  const recofnitionRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (recofnitionRef.current) recofnitionRef.current.stop();
    };
  }, []);

  const startRecording = () => {
    isRecordingSet(true);
    recofnitionRef.current = new window.webkitSpeechRecognition();
    recofnitionRef.current.continuous = true;
    recofnitionRef.current.interimResults = true;
    console.log("here", recofnitionRef.current);
    recofnitionRef.current.onresult = (event: any) => {
      console.log("here 2");
      const { transcript } = event.results[event.result.length - 1][0];
      transcriptSet(transcript);
    };
  };
  const stopRecording = () => {
    if (!recofnitionRef.current) return;
    recofnitionRef.current.stop();
    isRecordingSet(false);
  };

  const handleToggleRecording = () => {
    isRecordingSet(!isRecording);
    if (!isRecording) startRecording();
    else stopRecording();
  };
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="w-full">
        {(isRecording || transcript) && (
          <div className="w-1/4 m-auto rounded-md bourder px-4">
            <div className="flex-1 flex w-full justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {recordingComplete ? "Recorded" : "Recording"}
                </p>
                <p className="text-sm">
                  {recordingComplete
                    ? "Thanks for talking"
                    : "Start speaking ..."}
                </p>
              </div>
              {isRecording && (
                <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse"></div>
              )}
            </div>
            {transcript && (
              <div className="border rounded-md p-2 mt-4">
                <p>{transcript}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center w-full">
          {isRecording ? (
            <button
              onClick={handleToggleRecording}
              className="rounded-full w-20 h-20 mt-10 m-auto flex items-center justify-center bg-red-400 hover:bg-red-500"
            >
              <svg
                className="w-12 h-12"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 5.5v13c0 .465 0 .697.038.89a2 2 0 0 0 1.571 1.572c.194.038.426.038.89.038c.465 0 .698 0 .892-.038a2 2 0 0 0 1.57-1.572c.039-.19.039-.42.039-.878V5.488c0-.457 0-.687-.038-.879a2 2 0 0 0-1.572-1.57C18.197 3 17.965 3 17.5 3s-.697 0-.89.038a1.999 1.999 0 0 0-1.572 1.571C15 4.803 15 5.035 15 5.5m-11 0v13c0 .465 0 .697.038.89a2 2 0 0 0 1.571 1.572c.194.038.426.038.89.038c.465 0 .698 0 .892-.038a2 2 0 0 0 1.57-1.572C9 19.2 9 18.97 9 18.512V5.488c0-.457 0-.687-.038-.879A2 2 0 0 0 7.39 3.04C7.197 3 6.965 3 6.5 3s-.697 0-.89.038A1.999 1.999 0 0 0 4.037 4.61C4 4.803 4 5.035 4 5.5"
                ></path>
              </svg>
            </button>
          ) : (
            <button
              onClick={handleToggleRecording}
              className="rounded-full w-20 h-20 mt-10 m-auto flex items-center justify-center bg-blue-400 hover:bg-blue-500"
            >
              <svg
                className="w-12 h-12"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#000000"
                  d="M512 128a128 128 0 0 0-128 128v256a128 128 0 1 0 256 0V256a128 128 0 0 0-128-128m0-64a192 192 0 0 1 192 192v256a192 192 0 1 1-384 0V256A192 192 0 0 1 512 64m-32 832v-64a288 288 0 0 1-288-288v-32a32 32 0 0 1 64 0v32a224 224 0 0 0 224 224h64a224 224 0 0 0 224-224v-32a32 32 0 1 1 64 0v32a288 288 0 0 1-288 288v64h64a32 32 0 1 1 0 64H416a32 32 0 1 1 0-64z"
                ></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
