import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import NameBadge from "@/components/NameBadge";
import { ConvertSVG } from "@/lib/LaTeX";

export default function Home() {
  const [latexInput, setLatexInput] = useState("");
  const [renderedSVG, setRenderedSVG] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState("min-w-[350px]");
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleRender = () => {
    const svg = ConvertSVG(latexInput);
    setRenderedSVG(svg);
    setIsDialogOpen(true);
  };

  const handleDownload = () => {
    const blob = new Blob([renderedSVG], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "latex-render.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (isDialogOpen && contentRef.current) {
      const contentWidth = contentRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxWidth = Math.min(contentWidth + 40, viewportWidth - 40);
      setModalWidth(`min-w-[350px] w-[${maxWidth}px] max-w-[calc(100vw-40px)]`);
    }
  }, [isDialogOpen, renderedSVG]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center mb-4 space-y-1">
        <div className="flex items-center text-4xl">
          <Icon icon="mdi:math-compass-variant" />
          <h1 className="ml-2 font-bold bg-gradient-to-b from-white to-gray-400 text-transparent bg-clip-text">
            LaTeX renderer
          </h1>
        </div>
        <div className="flex items-center space-x-2">
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

      <div className="w-full max-w-md space-y-4">
        <Textarea
          className="w-full h-32 p-2 text-white bg-[#0a0a0a] rounded-md focus:ring-1 focus:ring-white focus:ring-opacity-20 focus:outline-none"
          value={latexInput}
          onChange={(e) => setLatexInput(e.target.value)}
          placeholder="Enter LaTeX code here..."
        />

        <Button
          onClick={handleRender}
          className="w-full bg-white hover:bg-gray-100 text-black"
        >
          <Icon icon="ic:baseline-image" className="mr-2" />
          Render
        </Button>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent
          className={`bg-[#0a0a0a] bg-opacity-60 backdrop-blur-lg border border-white border-opacity-20 ${modalWidth}`}
        >
          <div>
            <div className="flex items-center space-x-2 text-2xl">
              <Icon icon="mdi:math-integral-box" />
              <AlertDialogTitle className="text-white text-2xl">
                Render
              </AlertDialogTitle>
            </div>
            <a className="text-white text-opacity-60">
              LaTeX expression has been rendered.
            </a>
          </div>
          <div
            ref={contentRef}
            className="my-2 p-2 bg-[#151515] rounded overflow-auto"
          >
            <div dangerouslySetInnerHTML={{ __html: renderedSVG }} />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] hover:text-white">
              Close
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDownload}
              className="bg-white text-black hover:bg-gray-100"
            >
              <Icon icon="mdi:download" className="mr-2" />
              Download
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
