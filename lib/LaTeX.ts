import TeXToSVG from "tex-to-svg";

export function ConvertSVG(latex: string): string {
  const svg = TeXToSVG(latex);
  // Modify the SVG to have white fill
  return svg.replace(/fill="currentColor"/g, 'fill="white"');
}
