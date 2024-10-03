import { NextApiRequest, NextApiResponse } from "next";
import { generatePrompt } from "@/lib/generate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { expression, captcha } = req.body;

    try {
      const validCaptha = await validateCaptcha(captcha);

      if (!validCaptha) {
        res.status(400).json({ error: "Invalid captcha token" });
        return;
      }
      const explanation = await generatePrompt(expression);
      res.status(200).json({ explanation });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate explanation" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function validateCaptcha(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ response: token, secret }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to validate captcha");
  }
  const { success } = await response.json();
  return success as boolean;
}
