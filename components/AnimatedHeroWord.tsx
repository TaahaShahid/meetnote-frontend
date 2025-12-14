"use client";

import { useEffect, useState } from "react";
import SplitText from "./SplitText";

const WORDS = [
  "transcripts",
  "meeting-notes",
  "summaries",
  "keywords",
  "action-items",
];

export default function AnimatedHeroWord() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  const currentWord = WORDS[index];

  useEffect(() => {
    if (!animate) {
      // Wait before moving to the next word
      const timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % WORDS.length);
        setAnimate(true); // trigger next word animation
      }, 1500); // word stays visible for 2s after animation

      return () => clearTimeout(timeout);
    }
  }, [animate]);

  return (
    <span className="inline-flex items-baseline relative">
      <SplitText
        text={currentWord}
        tag="span"
        splitType="chars"
        delay={60}
        duration={0.5}
        className="font-bold text-blue-600 leading-none"
        from={{ opacity: 0, y: 20 }}
        to={{ opacity: 1, y: 0 }}
        onLetterAnimationComplete={() => setAnimate(false)}
      />
    </span>
  );
}
