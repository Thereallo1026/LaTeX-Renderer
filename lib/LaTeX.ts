import TeXToSVG from "tex-to-svg";

export function ConvertSVG(latex: string): string {
  const svg = TeXToSVG(latex);
  return svg.replace(/fill="currentColor"/g, 'fill="white"');
}
