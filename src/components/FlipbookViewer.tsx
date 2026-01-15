import { useState, useRef, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FlipbookToolbar from "./FlipbookToolbar";
import FlipbookPage from "./FlipbookPage";
import flipbookBg from "@/assets/flipbook-background.jpg";

// Sample pages for demo - in production these would come from PDF
const samplePages = [
  {
    id: 1,
    type: "cover",
    content: (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] text-slate-500 mb-2">EDITION 2025</p>
          <h1 className="font-heading text-6xl md:text-7xl font-bold text-slate-800 mb-4">
            Magazine
          </h1>
          <div className="w-32 h-0.5 bg-amber-500 mx-auto mb-6" />
          <p className="text-slate-600 tracking-wide">Digital Edition</p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    type: "content",
    content: (
      <div className="h-full bg-white p-8 md:p-12">
        <h2 className="font-heading text-3xl text-slate-800 mb-6">Table of Contents</h2>
        <div className="space-y-4">
          {["Welcome Letter", "Feature Story", "Photo Gallery", "Interview", "Travel", "Lifestyle"].map(
            (item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-700">{item}</span>
                <span className="text-amber-600 font-medium">{(idx + 1) * 3}</span>
              </div>
            )
          )}
        </div>
      </div>
    ),
  },
  {
    id: 3,
    type: "content",
    content: (
      <div className="h-full bg-white p-8 md:p-12">
        <p className="text-sm tracking-[0.2em] text-amber-600 mb-3">WELCOME</p>
        <h2 className="font-heading text-4xl text-slate-800 mb-6">From the Editor</h2>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            Welcome to our digital magazine experience. This flipbook viewer provides a 
            seamless and elegant way to read your favorite publications.
          </p>
          <p>
            Navigate through pages using the arrows on the sides, or use the toolbar 
            above for quick access to any page.
          </p>
          <p>
            We hope you enjoy this immersive reading experience that combines the 
            tactile feel of a physical magazine with the convenience of digital.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    type: "image",
    content: (
      <div className="h-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-6xl">📖</span>
          </div>
          <h3 className="font-heading text-2xl text-slate-800">Photo Gallery</h3>
          <p className="text-slate-500 mt-2">Beautiful imagery awaits</p>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    type: "content",
    content: (
      <div className="h-full bg-slate-900 p-8 md:p-12 text-white">
        <p className="text-sm tracking-[0.2em] text-amber-400 mb-3">FEATURE</p>
        <h2 className="font-heading text-4xl mb-6">The Art of Design</h2>
        <p className="text-slate-300 leading-relaxed mb-6">
          Great design is about more than aesthetics. It's about creating experiences 
          that resonate with people on a deeper level.
        </p>
        <blockquote className="border-l-4 border-amber-500 pl-6 italic text-slate-400">
          "Design is not just what it looks like. Design is how it works."
          <footer className="mt-2 text-amber-400 not-italic">— Steve Jobs</footer>
        </blockquote>
      </div>
    ),
  },
  {
    id: 6,
    type: "content",
    content: (
      <div className="h-full bg-white p-8 md:p-12">
        <p className="text-sm tracking-[0.2em] text-amber-600 mb-3">INTERVIEW</p>
        <h2 className="font-heading text-3xl text-slate-800 mb-6">Creative Minds</h2>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium text-slate-700">Q: What inspires your work?</p>
            <p className="text-slate-600 mt-2">
              "Nature, architecture, and the everyday moments that often go unnoticed."
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium text-slate-700">Q: Your advice for beginners?</p>
            <p className="text-slate-600 mt-2">
              "Stay curious, keep experimenting, and never stop learning."
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

interface FlipbookViewerProps {
  title?: string;
}

const FlipbookViewer = ({ title = "Digital Magazine" }: FlipbookViewerProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const flipBookRef = useRef<any>(null);
  const totalPages = samplePages.length;

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data + 1);
  }, []);

  const goToPage = useCallback((page: number) => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().turnToPage(page - 1);
    }
  }, []);

  const goToFirstPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().turnToPage(0);
    }
  }, []);

  const goToLastPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().turnToPage(totalPages - 1);
    }
  }, [totalPages]);

  const goToPrevPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  }, []);

  const goToNextPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  }, []);

  return (
    <div className="flipbook-container">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${flipbookBg})` }}
      />
      
      {/* Overlay */}
      <div className="flipbook-overlay" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen">
        <FlipbookToolbar
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onFirstPage={goToFirstPage}
          onLastPage={goToLastPage}
          onPrevPage={goToPrevPage}
          onNextPage={goToNextPage}
          title={title}
        />

        {/* Flipbook Container */}
        <div className="flex-1 flex items-center justify-center relative px-16 py-8">
          {/* Left Navigation Arrow */}
          <button
            onClick={goToPrevPage}
            className="flipbook-nav-arrow left-4"
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          {/* Flipbook */}
          <div className="flipbook-wrapper">
            <HTMLFlipBook
              ref={flipBookRef}
              width={400}
              height={560}
              size="stretch"
              minWidth={300}
              maxWidth={600}
              minHeight={420}
              maxHeight={840}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={onFlip}
              className="shadow-2xl"
              style={{}}
              startPage={0}
              drawShadow={true}
              flippingTime={800}
              usePortrait={true}
              startZIndex={0}
              autoSize={true}
              maxShadowOpacity={0.5}
              showPageCorners={true}
              disableFlipByClick={false}
              swipeDistance={30}
              clickEventForward={true}
              useMouseEvents={true}
            >
              {samplePages.map((page) => (
                <FlipbookPage key={page.id} pageNumber={page.id}>
                  {page.content}
                </FlipbookPage>
              ))}
            </HTMLFlipBook>
          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={goToNextPage}
            className="flipbook-nav-arrow right-4"
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="w-12 h-12" />
          </button>
        </div>

        {/* Footer Navigation Hints */}
        <div className="flex justify-between px-8 py-4 text-muted-foreground text-sm">
          <button 
            onClick={goToFirstPage}
            className="hover:text-foreground transition-colors"
          >
            ‹‹
          </button>
          <button 
            onClick={goToLastPage}
            className="hover:text-foreground transition-colors"
          >
            ››
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlipbookViewer;
