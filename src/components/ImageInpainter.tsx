'use client';

import { useState, useRef, useEffect } from 'react';
import { Brush, Eraser, Upload, Wand2 } from 'lucide-react';
import axios from 'axios';

export default function ImageInpainter() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [maskImage, setMaskImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [brushSize, setBrushSize] = useState(20);
  const [isEraser, setIsEraser] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize canvas when component mounts
  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.lineCap = 'round';
        contextRef.current = context;
      }
    }
  }, []);

  // Update brush settings without resetting canvas
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = isEraser ? '#000000' : '#ffffff';
      contextRef.current.lineWidth = brushSize;
    }
  }, [brushSize, isEraser]);

  // Handle image loading and canvas setup
  useEffect(() => {
    if (uploadedImage && imageRef.current && canvasRef.current) {
      imageRef.current.onload = () => {
        const canvas = canvasRef.current!;
        canvas.width = imageRef.current!.naturalWidth;
        canvas.height = imageRef.current!.naturalHeight;

        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(imageRef.current!, 0, 0);
          context.lineCap = 'round';
          context.strokeStyle = isEraser ? '#000000' : '#ffffff';
          context.lineWidth = brushSize;
          contextRef.current = context;
          setImageLoaded(true);
        }
      };
      imageRef.current.src = uploadedImage;
    }
  }, [uploadedImage, brushSize, isEraser]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setImageLoaded(false); // Reset image loaded state
      };
      reader.readAsDataURL(file);
    }
  };

  const getCanvasPoint = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent) => {
    const point = getCanvasPoint(e);
    if (!point || !imageLoaded) return;

    contextRef.current?.beginPath();
    contextRef.current?.moveTo(point.x, point.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !contextRef.current || !imageLoaded) return;

    const point = getCanvasPoint(e);
    if (!point) return;

    contextRef.current.lineTo(point.x, point.y);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!imageLoaded) return;
    
    contextRef.current?.closePath();
    setIsDrawing(false);

    // Convert the canvas to a mask image
    if (canvasRef.current) {
      setMaskImage(canvasRef.current.toDataURL('image/png'));
    }
  };

  const handleInpaint = async () => {
    if (!uploadedImage || !maskImage || !prompt) {
      setError('Please provide an image, draw a mask, and enter a prompt');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Convert base64 to blob
      const uploadedImageBlob = await fetch(uploadedImage)
        .then(r => r.blob())
        .then(blob => new Blob([blob], { type: 'image/png' }));

      const maskImageBlob = await fetch(maskImage)
        .then(r => r.blob())
        .then(blob => new Blob([blob], { type: 'image/png' }));

      const formData = new FormData();
      formData.append('image', uploadedImageBlob, 'image.png');
      formData.append('mask', maskImageBlob, 'mask.png');
      formData.append('prompt', prompt);

      const response = await axios.post('/api/inpaint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setResultImage(response.data.imageUrl);
    } catch (err: any) {
      setError(err.message || 'Failed to inpaint image. Please try again.');
      console.error('Error inpainting image:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-900/20 to-green-900/10 rounded-2xl p-8 backdrop-blur-sm border border-green-900/50 shadow-2xl shadow-green-900/20 mt-8">
      <div className="flex items-center gap-2 mb-6">
        <Wand2 className="h-5 w-5 text-green-500" />
        <h2 className="text-xl font-semibold text-green-400">Image Inpainting</h2>
      </div>

      <div className="space-y-6">
        {/* Hidden Image Element for Loading */}
        <img ref={imageRef} className="hidden" alt="" />

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Upload Image
          </label>
          <div className="flex items-center gap-4">
            <label className="flex-1 cursor-pointer">
              <div className="w-full h-32 border-2 border-dashed border-green-900/50 rounded-lg flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all">
                <div className="text-center">
                  <Upload className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <span className="text-sm text-gray-400">Click to upload image</span>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Canvas for Inpainting */}
        {uploadedImage && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setIsEraser(false)}
                className={`p-2 rounded-lg ${!isEraser ? 'bg-green-600' : 'bg-black/30'} hover:bg-green-500 transition-all`}
              >
                <Brush className="h-5 w-5" />
              </button>
              
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-400">Size: {brushSize}px</span>
            </div>

            <div className="relative border border-green-900/50 rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full h-[400px] object-contain bg-black/30"
                style={{ display: imageLoaded ? 'block' : 'none' }}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="text-green-500">Loading image...</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Prompt Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Describe the changes
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-32 rounded-lg bg-black/50 border border-green-900/50 text-gray-100 p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="Describe what you want to add or modify in the masked area..."
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleInpaint}
          disabled={isLoading || !uploadedImage || !maskImage || !prompt}
          className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-3 px-6 rounded-lg transition-all hover:shadow-lg hover:shadow-green-500/20 active:transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Generate Inpainting'}
        </button>

        {/* Result Image */}
        {resultImage && (
          <div className="mt-4">
            <img
              src={resultImage}
              alt="Inpainted result"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}