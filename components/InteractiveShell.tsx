"use client";

import { type ReactNode, useState } from "react";

export function InteractiveShell({ children }: { children: ReactNode }) {
  const [glow, setGlow] = useState({ x: 52, y: 18 });

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#020b18] text-white"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setGlow({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100
        });
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-80"
        style={{
          background: `radial-gradient(520px circle at ${glow.x}% ${glow.y}%, rgba(34, 211, 238, 0.16), transparent 60%)`
        }}
      />
      <div aria-hidden="true" className="tech-grid pointer-events-none fixed inset-0 z-0 opacity-[0.12]" />
      <div className="relative z-10">{children}</div>
    </main>
  );
}
