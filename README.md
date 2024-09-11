![Banner](https://github.com/user-attachments/assets/56d3103b-fb39-49b2-b29a-70949965c689)

## Features

- **Real-time Rendering**: Convert LaTeX equations to SVG images instantly.
- **User-friendly Interface**: Clean and intuitive design for easy input and rendering.
- **Download Option**: Save rendered equations as SVG files for use in other applications.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Thereallo1026/LaTeX-Renderer.git
   cd latex-renderer
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter your LaTeX equation in the text area.
2. Click the "Render" button to generate the SVG image.
3. The rendered equation will appear in a modal window.
4. Click "Download" to save the SVG file, or "Close" to return to the input screen.

## API Reference

### Convert LaTeX to SVG

Converts a LaTeX equation to an SVG image.

### POST /api/create

```json
{
  "latex": "base64-string"
}
```

## Acknowledgments

- [tex-to-svg](https://www.npmjs.com/package/tex-to-svg) for LaTeX to SVG conversion.
