import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "sonner";

type Mode = "download" | "copy";

export default function DownloadButton({
  svg,
  mode,
}: {
  svg: string;
  mode: Mode;
}) {
  const handleDownload = (type: "svg" | "png" | "transparent") => {
    const downloadFile = (blob: Blob, fileName: string) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    };

    if (type === "svg") {
      // svg
      if (mode === "copy") {
        navigator.clipboard.writeText(svg).then(() => {
          toast.success("SVG copied to clipboard", {
            description: "SVG code has been copied to your clipboard.",
            duration: 2000,
          });
        });
      } else {
        const blob = new Blob([svg], { type: "image/svg+xml" });
        downloadFile(blob, "latex-render.svg");
      }
    } else if (type === "png" || type === "transparent") {
      // png
      const img = new Image();
      img.onload = () => {
        const scale = 5;
        const margin = 15 * scale;

        const canvas = document.createElement("canvas");

        canvas.width = img.width * scale + margin * 2;
        canvas.height = img.height * scale + margin * 2;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(scale, scale);
          if (type === "png") {
            ctx.fillStyle = "#1a1a1a";
            ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
          }
          ctx.drawImage(img, margin / scale, margin / scale); // Use margin when drawing image

          if (mode === "copy") {
            canvas.toBlob((blob) => {
              if (blob) {
                navigator.clipboard
                  .write([new ClipboardItem({ [blob.type]: blob })])
                  .then(() => {
                    toast.success("Image copied to clipboard", {
                      description:
                        "The image has been copied to your clipboard.",
                      duration: 2000,
                    });
                  });
              }
            }, "image/png");
          } else {
            canvas.toBlob((blob) => {
              if (blob) {
                downloadFile(
                  blob,
                  `latex-render${
                    type === "transparent" ? "-transparent" : ""
                  }.png`
                );
              }
            }, "image/png");
          }
        }
      };
      img.src = "data:image/svg+xml;base64," + btoa(svg);
    }
  };

  return (
    <div className="flex">
      <Button
        className="bg-white text-black rounded-r-none px-3 py-2 hover:bg-gray-200 transition-colors duration-150"
        onClick={() => handleDownload("png")}
      >
        <Icon icon="ic:baseline-image" className="mr-2 text-lg" />
        {mode === "download" ? "Download PNG" : "Copy PNG"}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className="bg-white text-black rounded-l-none px-2 py-2 border-l hover:bg-gray-200 transition-colors duration-150">
            <Icon icon="mdi:chevron-down" className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black text-white border-none">
          <DropdownMenuItem
            className="focus:bg-[#1a1a1a] focus:text-white"
            onSelect={() => handleDownload("transparent")}
          >
            <Icon icon="ic:outline-image" className="mr-2 text-lg" />
            {mode === "download" ? "Transparent PNG" : "Transparent PNG"}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-[#1a1a1a] focus:text-white"
            onSelect={() => handleDownload("svg")}
          >
            <Icon icon="mdi:shape" className="mr-2 text-lg" />
            {mode === "download" ? "SVG Vector" : "SVG"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
