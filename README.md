# AI Image Generator

A modern web application that generates AI images from text prompts using the Stability.ai SDXL 1.0 model.

## Features

- Text-to-image generation using Stability.ai API
- Clean and responsive UI
- Real-time loading states
- Error handling
- Image download functionality

## Prerequisites

- Node.js 18+ and npm
- Stability.ai API key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and add your Stability.ai API key:
   ```
   STABILITY_API_KEY=your-api-key-here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technology Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios

## Project Structure

- `/src/app` - Next.js app router pages and API routes
- `/src/components` - React components
- `/src/app/api/generate` - Stability.ai API integration

## Environment Variables

- `STABILITY_API_KEY` - Your Stability.ai API key (required)

## Development

To start the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```
