"use client";

import { useState, useEffect, useRef } from "react";
import { cn, getSubjectColor, configureAssistant } from "@/lib/utils";
import Image from "next/image";
import { vapi } from "@/lib/vapi.sdk";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "../constants/soundwaves.json";
import { addToSessionHistory } from "@/lib/actions/companion.actions";

enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: string;
  content: string;
}

interface Message {
  type: string;
  transcriptType?: string;
  role: string;
  transcript: string;
}

interface CompanionComponentProps {
  companionId: string;
  subject: string;
  name: string;
  topic: string;
  userName: string;
  userImage: string;
  voice: string;
  style: string;
}

const Companion = ({
  companionId,
  subject,
  name,
  topic,
  userName,
  userImage,
  voice,
  style,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      if (isSpeaking) {
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
      }
    }
  }, [isSpeaking]);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const onError = (error: Error) => {
      console.log("Call error: ", error);
    };

    const onSpeechStart = () => {
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      setIsSpeaking(false);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, [companionId]); // Fix: Added companionId to dependencies

  const toggleMicrophone = async () => {
    const isCurrentlyMuted = vapi.isMuted();
    vapi.setMuted(!isCurrentlyMuted);
    setIsMuted(!isCurrentlyMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    // @ts-expect-error Temporarily suppress type error due to vapi.start signature mismatch
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div
            className="companion-avatar"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt="companion icon"
              width={50}
              height={50}
            />
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoPlay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>
        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt="user image"
              height={130}
              width={130}
            />
            <p className="font-bold text-2xl">{userName}</p>
          </div>
          <div className="flex flex-row gap-2">
            <button className="btn-mic" onClick={toggleMicrophone}>
              <Image
                src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
                alt="mic icon"
                width={20}
                height={20}
              />
              <p className="max-sm:hidden">
                {isMuted ? "Turn on microphone" : "Turn off microphone"}
              </p>
            </button>
            <button
              className={cn(
                "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
                callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
                callStatus === CallStatus.CONNECTING && "animate-pulse"
              )}
              onClick={
                callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
              }
            >
              {callStatus === CallStatus.ACTIVE
                ? "End Session"
                : callStatus === CallStatus.CONNECTING
                  ? "Connecting"
                  : "Start Session"}
            </button>
          </div>
        </div>
      </section>
      <section className="transcript">
        <div className="transcript-message no-scrollbar">
          {messages.map((message, index) => (
            <p
              key={index}
              className={cn(
                "max-sm:text-sm",
                message.role === "assistant" ? "" : "text-primary"
              )}
            >
              {message.role === "assistant"
                ? `${name.split(" ")[0].replace(/[.,]/g, "")}: ${message.content}`
                : `${userName}: ${message.content}`}
            </p>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Companion;