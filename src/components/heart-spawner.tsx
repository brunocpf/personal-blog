"use client";

import { useEffect } from "react";

export function HeartSpawner() {
  useEffect(() => {
    let running = true;
    function spawnHeart() {
      if (!running) return;
      const heart = document.createElement("span");
      heart.textContent = "❤️";
      const left = Math.random() * 100;
      const duration = 2 + Math.random() * 2;
      const size = 16 + Math.random() * 16;
      heart.style.position = "fixed";
      heart.style.left = `${left}vw`;
      heart.style.bottom = "0";
      heart.style.fontSize = `${size}px`;
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "9999";
      heart.style.animation = `heart-float ${duration}s linear`;
      heart.style.backdropFilter = "blur(10px)";

      document.body.appendChild(heart);
      heart.addEventListener("animationend", () => {
        heart.remove();
      });
      setTimeout(spawnHeart, 400 + Math.random() * 600);
    }
    spawnHeart();
    return () => {
      running = false;
    };
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes heart-float {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.5;
          }
          80% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-80vh) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
