# LaTeX Renderer

![Banner](https://github.com/user-attachments/assets/d0686a34-2234-4d37-af01-f6a0e1dc4633)

## Key Features

- **Real-time Rendering**: Instantly visualize LaTeX equations as high-quality SVG images
- **Intuitive Interface**: Sleek, user-friendly design for effortless equation input and rendering
- **Export as images**: Easily download rendered equations as files (SVG/PNG) for other applications
- **AI-Powered Explanations**: Receive interpretations of LaTeX syntax, powered by AI

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- pnpm

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/Thereallo1026/LaTeX-Renderer.git
   cd latex-renderer
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```env
   API_KEY=""
   BASE_URL="https://api.openai.com/api/v1"
   TURNSTILE_SECRET_KEY=""
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=""
   ```

   Fill in the appropriate values for each variable.

4. Run the development server:

   ```
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Reference

#### POST /api/create

Converts a LaTeX equation to an SVG image.

```json
{
  "latex": "base64-string"
}
```

## Technologies Used

- [Next.js](https://nextjs.org/) - The React framework for production
- [tex-to-svg](https://www.npmjs.com/package/tex-to-svg) - For LaTeX to SVG conversion