"use client";

import { type PointerEvent as ReactPointerEvent, useCallback, useEffect, useRef, useState } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string;
      remove?: (widgetId: string) => void;
      reset?: (widgetId?: string) => void;
    };
  }
}

const verificationStorageKey = "vpro_human_verified";
const turnstileScriptSrc = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export function VerificationGate() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [slideProgress, setSlideProgress] = useState(14);

  const completeVerification = useCallback(() => {
    window.sessionStorage.setItem(verificationStorageKey, "1");
    setIsVerified(true);
  }, []);

  useEffect(() => {
    if (window.sessionStorage.getItem(verificationStorageKey) === "1") {
      setIsVerified(true);
    }
  }, []);

  useEffect(() => {
    if (!siteKey || isVerified) {
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${turnstileScriptSrc}"]`
    );

    if (existingScript) {
      if (window.turnstile) {
        setScriptReady(true);
      } else {
        existingScript.addEventListener("load", () => setScriptReady(true), { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = turnstileScriptSrc;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => setScriptReady(true), { once: true });
    document.head.appendChild(script);
  }, [isVerified, siteKey]);

  useEffect(() => {
    if (!siteKey || !scriptReady || !window.turnstile || !widgetRef.current || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(widgetRef.current, {
      sitekey: siteKey,
      theme: "dark",
      size: "flexible",
      callback: completeVerification,
      "expired-callback": () => {
        if (widgetIdRef.current) {
          window.turnstile?.reset?.(widgetIdRef.current);
        }
      },
      "error-callback": () => {
        if (widgetIdRef.current) {
          window.turnstile?.reset?.(widgetIdRef.current);
        }
      }
    });

    return () => {
      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [completeVerification, scriptReady, siteKey]);

  if (isVerified) {
    return null;
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (siteKey) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const nextProgress = Math.min(
      100,
      Math.max(14, ((event.clientX - rect.left) / rect.width) * 100)
    );

    setSlideProgress(nextProgress);

    if (nextProgress > 92) {
      window.setTimeout(completeVerification, 220);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#020b18]/95 px-5 text-white backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,0.2),transparent_28rem)]" />
      <div className="relative w-full max-w-md rounded-lg border border-cyan-100/20 bg-[#061528]/95 p-6 shadow-[0_0_90px_rgba(34,211,238,0.18)]">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-cyan-200 text-slate-950">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-cyan-100">Cloudflare 人机验证</p>
            <h2 className="text-2xl font-semibold text-white">验证后进入网站</h2>
          </div>
        </div>

        <p className="mt-5 text-sm leading-7 text-slate-300">
          为减少恶意请求和自动化访问，进入页面前需要先完成一次验证。
        </p>

        {siteKey ? (
          <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div ref={widgetRef} className="min-h-16" />
            {!scriptReady ? (
              <p className="mt-3 text-xs text-slate-400">正在加载 Cloudflare 验证组件...</p>
            ) : null}
          </div>
        ) : (
          <div className="mt-6">
            <div
              className="relative h-14 overflow-hidden rounded-full border border-cyan-100/25 bg-slate-950"
              onPointerMove={handlePointerMove}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-cyan-200 transition-[width] duration-150"
                style={{ width: `${slideProgress}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 text-sm font-semibold text-white mix-blend-difference">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                移动鼠标滑过验证条
              </div>
            </div>
            <p className="mt-3 text-xs leading-6 text-slate-400">
              完成验证后，本次浏览会自动记住。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
