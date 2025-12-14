import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitType?: "chars" | "words";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  tag?: "h1" | "h2" | "p" | "span";
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 60,
  duration = 0.5,
  splitType = "chars",
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  tag = "span",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const letters: HTMLElement[] = [];

    // Wrap text in spans
    element.innerHTML = "";
    if (splitType === "chars") {
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.textContent = char;
        element.appendChild(span);
        letters.push(span);
      });
    } else if (splitType === "words") {
      text.split(" ").forEach((word, i, arr) => {
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.textContent = word + (i < arr.length - 1 ? " " : "");
        element.appendChild(span);
        letters.push(span);
      });
    }

    gsap.fromTo(
      letters,
      { ...from },
      {
        ...to,
        duration,
        stagger: delay / 1000,
        onComplete: () => onLetterAnimationComplete?.(),
      }
    );
  }, [text]); // Only run when text changes

  return React.createElement(
    tag,
    { ref: ref, className: className, style: { display: "inline-block" } },
    null
  );
};

export default SplitText;
