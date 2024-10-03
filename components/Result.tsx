import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaTitle,
} from "@/components/ui/credenza";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";

import { Icon } from "@iconify/react/dist/iconify.js";

// import { ConvertSVG } from "@/lib/LaTeX";
// import { useState } from "react";

import DownloadButton from "@/components/DownloadButton";
import { RefObject, useEffect, useState } from "react";
import { ConvertSVG } from "@/lib/LaTeX";
import { TurnstileInstance } from "@marsidev/react-turnstile";
import { useAi } from "@/hooks/use-ai";

export default function ResultPopup({
  open,
  setOpen,
  expression,
  turnstileRef,
  turnstileLoaded,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  expression: string;
  turnstileRef: RefObject<TurnstileInstance>;
  turnstileLoaded: boolean;
}) {
  const [renderedSVG, setRenderedSVG] = useState("");
  const [showAI, setShowAI] = useState(false);

  const { explain, loading, error, data } = useAi(turnstileRef);

  const handleExplainButton = async () => {
    setShowAI(true);
    if (!turnstileLoaded) {
      const interval = setInterval(() => {
        if (turnstileLoaded) {
          explain(expression);
          clearInterval(interval);
        }
      }, 100);
      return;
    }
    explain(expression);
  };

  useEffect(() => {
    const svg = ConvertSVG(expression);
    setRenderedSVG(svg);
    return () => {
      setShowAI(false);
    };
  }, [expression]);

  return (
    <Credenza open={open} onOpenChange={(op) => setOpen(op)}>
      <CredenzaContent className="bg-[#0a0a0a] bg-opacity-30 backdrop-blur-md border border-white border-opacity-20">
        {/* CredenzaHeader */}
        <div className="pl-4 pb-4 md:pl-0 md:pb-0">
          <div className="align-left space-y-1 text-2xl">
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:math-integral-box" />
              <CredenzaTitle>Render</CredenzaTitle>
            </div>
            <CredenzaDescription className="text-white text-opacity-60 text-sm">
              LaTeX expression has been rendered.
            </CredenzaDescription>
          </div>
        </div>
        <div className="space-y-6 mx-4 mb-6 md:m-0 overflow-auto">
          <div className="space-y-4">
            {/* SVG */}
            <div>
              <div className="text-[11px] text-white text-opacity-60 uppercase tracking-widest pl-2 py-[2px] bg-[#222222] rounded rounded-b-none">
                Expression
              </div>
              <div className="bg-[#151515] rounded rounded-t-none">
                <div
                  className="py-4 px-2 overflow-auto"
                  dangerouslySetInnerHTML={{ __html: renderedSVG }}
                />
              </div>
            </div>

            {/* AI */}
            {showAI ? (
              <div>
                <div className="text-[11px] text-white text-opacity-60 uppercase tracking-widest pl-2 py-[2px] bg-[#222222] rounded rounded-b-none">
                  Explanation
                </div>
                <div className="bg-[#151515] rounded rounded-t-none text-base p-2 py-1">
                  {loading || !turnstileLoaded ? (
                    <div className="flex items-center space-x-2">
                      <Icon icon="mdi:loading" className="animate-spin" />
                      <span
                        className="animate-text-gradient bg-gradient-to-r from-[#7c7c7c] from-40% via-white via-50% to-[#7c7c7c] to-60%
    bg-[200%_auto] bg-clip-text text-transparent"
                      >
                        {turnstileLoaded
                          ? "Awaiting response..."
                          : "Awaiting captcha..."}
                      </span>
                    </div>
                  ) : error ? (
                    <div>{error}</div>
                  ) : (
                    <div>{data}</div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="bg-gradient-to-tr from-blue-600 to-purple-600 text-white hover:bg-opacity-70"
                    onClick={handleExplainButton}
                    disabled={showAI}
                  >
                    <Icon icon="ri:gemini-fill" className="text-lg" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Explain with AI</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div>
              <DownloadButton svg={renderedSVG} />
            </div>
          </div>
        </div>
      </CredenzaContent>
    </Credenza>
  );
}
