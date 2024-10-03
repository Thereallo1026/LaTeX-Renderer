import { TurnstileInstance } from "@marsidev/react-turnstile";
import { RefObject, useEffect, useState } from "react";

export function useAi(turnstileRef: RefObject<TurnstileInstance>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<string>("");
  const [expression, setExpression] = useState<string>("");

  const explain = (expression: string) => {
    setExpression(expression);
  };

  useEffect(() => {
    if (!expression) {
      return;
    }
    const fetchData = async () => {
      const captchaToken = turnstileRef.current?.getResponse();
      if (!captchaToken) {
        setError("Captcha token is missing");
        turnstileRef.current?.reset();
        return;
      }
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expression, captcha: captchaToken }),
      });
      if (!res.ok) {
        setError("Failed to fetch data");
        return;
      }
      const json = await res.json();
      setData(json.explanation);
    };
    setLoading(true);
    fetchData()
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        turnstileRef.current?.reset();
        setLoading(false);
      });
  }, [expression]);

  return { loading, error, data, explain };
}
