import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function DownloadButton({ svg }: { svg: string }) {
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
      const blob = new Blob([svg], { type: "image/svg+xml" });
      downloadFile(blob, "latex-render.svg");
    } else if (type === "png" || type === "transparent") {
      // png
      const img = new Image();
      img.onload = () => {
        const scale = 5;
        const margin = 10 * scale;

        const canvas = document.createElement("canvas");

        canvas.width = (img.width + 40) * scale;
        canvas.height = (img.height + 40) * scale;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(scale, scale);
          if (type === "png") {
            ctx.fillStyle = "#1a1a1a";
            ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
          }
          ctx.drawImage(img, 20, 20); // Draw image with 20px margin
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
      };
      img.src = "data:image/svg+xml;base64," + btoa(svg);
    }
  };

  return (
    <div className="flex">
      <Button
        className="bg-white text-black rounded-r-none px-3 py-2 hover:bg-gray-200"
        onClick={() => handleDownload("png")}
      >
        <Icon icon="ic:baseline-image" className="mr-2 text-lg" />
        Download PNG
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className="bg-white text-black rounded-l-none px-2 py-2 border-l hover:bg-gray-200">
            <Icon icon="mdi:chevron-down" className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black text-white border-none">
          <DropdownMenuItem
            className="focus:bg-[#1a1a1a] focus:text-white"
            onSelect={() => handleDownload("transparent")}
          >
            <Icon icon="ic:outline-image" className="mr-2 text-lg" />
            Transparent PNG
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-[#1a1a1a] focus:text-white"
            onSelect={() => handleDownload("svg")}
          >
            <Icon icon="mdi:shape" className="mr-2 text-lg" /> SVG Vector
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
