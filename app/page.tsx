import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8 md:p-20">
      <div className="flex flex-col items-center justify-center text-center max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] gap-8">
        <div className="flex items-center gap-1">
          <Image 
            src="/logos/hex-black.svg" 
            alt="Sequoia" 
            width={400} 
            height={400} 
            className="w-40 h-40 sm:w-24 sm:h-24 md:w-32 md:h-32" 
            priority
          />
          <span className="px-1 py-1 text-base font-medium text-gray-500 -mt-4">BETA</span>
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            SEQUOIA - Private Investing Platform
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-4xl">
            A modern platform democratizing access to high-growth opportunities across startups, gaming, real estate, and crypto for both accredited and non-accredited investors.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm sm:text-base text-gray-600">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Investment Categories</h3>
              <ul className="space-y-1">
                <li>• Startups & Early-stage companies</li>
                <li>• Gaming studios & platforms</li>
                <li>• Real estate opportunities</li>
                <li>• Crypto & tokenized assets</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Platform Features</h3>
              <ul className="space-y-1">
                <li>• Simulated & real investment flows</li>
                <li>• Social-first investor experience</li>
                <li>• AI-powered deal evaluation</li>
                <li>• Real-time progress tracking</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-500 hover:text-gray-700 transition-colors no-underline hover:underline hover:underline-offset-4"
            href="/waitlist"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={20}
              height={20}
            />
            Join Waitlist →
          </Link>
          <Link
            className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-500 hover:text-gray-700 transition-colors no-underline hover:underline hover:underline-offset-4"
            href="/auth"
          >
            Sign Up →
          </Link>
        </div>
      </div>
    </main>
  );
}
