import { NextApiRequest, NextApiResponse } from "next";
import { ConvertSVG } from "@/lib/LaTeX";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { latex } = req.body;
      if (!latex) {
        return res.status(400).json({ error: "LaTeX input is required" });
      }

      const decodedLatex = Buffer.from(latex, "base64").toString("utf-8");
      const svg = ConvertSVG(decodedLatex);

      res.status(200).json({ svg });
    } catch (error) {
      console.error("Error processing LaTeX:", error);
      res.status(500).json({ error: "Failed to process LaTeX" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
