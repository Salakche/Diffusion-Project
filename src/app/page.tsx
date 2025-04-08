import ImageGenerator from '@/components/ImageGenerator'

export default function Home() {
  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Image Generator
          </h1>
          <p className="text-lg text-gray-600">
            Create stunning images from text using Stability.ai SDXL 1.0
          </p>
        </div>
        <ImageGenerator />
      </div>
    </main>
  )
}
