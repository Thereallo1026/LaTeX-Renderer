import { useRef, useState } from "react";
import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import NameBadge from "@/components/NameBadge";

import BadgeSuggestions from "@/components/BadgeSuggestions";
import ResultPopup from "@/components/Result";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

export default function Home() {
  const [latexInput, setLatexInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center mb-4 space-y-1">
        <div className="flex items-center text-4xl">
          <Icon icon="mdi:math-compass-variant" />
          <h1 className="ml-2 font-bold bg-gradient-to-b from-white to-gray-400 text-transparent bg-clip-text">
            LaTeX renderer
          </h1>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <h2 className="text-white text-opacity-80">
            Simple LaTeX renderer by
          </h2>
          <NameBadge
            name="Thereallo"
            avatarUrl="https://github.com/thereallo1026.png"
            redirectUrl="https://thereallo.dev"
          />
        </div>
      </div>

      <div className="w-full max-w-md space-y-3">
        <Textarea
          className="w-full h-32 p-2 text-white bg-[#0a0a0a] rounded-md focus:ring-1 focus:ring-white focus:ring-opacity-20 focus:outline-none"
          value={latexInput}
          onChange={(e) => setLatexInput(e.target.value)}
          placeholder="Enter LaTeX code here..."
        />
        <BadgeSuggestions onBadgeClick={setLatexInput} />
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="w-full bg-white hover:bg-gray-100 text-black"
        >
          <Icon icon="ic:baseline-image" className="mr-2" />
          Render
        </Button>
      </div>
      <ResultPopup
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        expression={latexInput}
        turnstileRef={turnstileRef}
        turnstileLoaded={turnstileLoaded}
      />
      <Turnstile
        ref={turnstileRef}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
        options={{
          size: "invisible",
          action: "ai-explain",
        }}
        onWidgetLoad={() => setTurnstileLoaded(true)}
      />
    </div>
  );
}
