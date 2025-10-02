"use client";

import { useState, useEffect } from "react";

const messages = [
  "welcome to club manager",
  "the only website to manage your student clubs easily",
  "get started by logging in or signing up below",
];

export function TypingAnimation() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentMessage = messages[currentMessageIndex];

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000); // Pause for 2 seconds before deleting
      return () => clearTimeout(pauseTimeout);
    }

    if (!isDeleting && currentText === currentMessage) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          setCurrentText(currentMessage.substring(0, currentText.length - 1));
        } else {
          setCurrentText(currentMessage.substring(0, currentText.length + 1));
        }
      },
      isDeleting ? 30 : 80
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentMessageIndex, isPaused]);

  return (
    <div className="mb-8 text-center px-4 h-24 flex items-center justify-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
        <span className="text-balance">{currentText}</span>
      </h1>
    </div>
  );
}
