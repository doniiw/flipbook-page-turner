import { 
  ZoomIn,
  ZoomOut,
  Grid3X3, 
  List, 
  ChevronsLeft, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsRight,
  Bookmark,
  Share2,
  Maximize,
  Minimize,
  Volume2,
  VolumeX
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FlipbookToolbarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleThumbnails: () => void;
  onToggleFullscreen: () => void;
  onToggleSound: () => void;
  zoom: number;
  isThumbnailOpen: boolean;
  isFullscreen: boolean;
  isSoundEnabled: boolean;
  title?: string;
}

const FlipbookToolbar = ({
  currentPage,
  totalPages,
  onPageChange,
  onFirstPage,
  onLastPage,
  onPrevPage,
  onNextPage,
  onZoomIn,
  onZoomOut,
  onToggleThumbnails,
  onToggleFullscreen,
  onToggleSound,
  zoom,
  isThumbnailOpen,
  isFullscreen,
  isSoundEnabled,
  title = "Digital Magazine"
}: FlipbookToolbarProps) => {
  // Calculate display page range (for double-page spread)
  const displayPageStart = currentPage;
  const displayPageEnd = Math.min(currentPage + 1, totalPages);
  const displayText = currentPage === 1 
    ? `1/${totalPages}` 
    : `${displayPageStart}-${displayPageEnd}/${totalPages}`;

  return (
    <header className="flipbook-toolbar relative z-20">
      {/* Logo / Title */}
      <div className="absolute left-6 flex items-center gap-3">
        <h1 className="font-heading text-2xl font-semibold text-gold tracking-wide">
          {title}
        </h1>
      </div>

      {/* Center Controls */}
      <nav className="flex items-center gap-1">
        {/* Zoom Controls */}
        <button 
          className="flipbook-btn" 
          onClick={onZoomOut}
          title="Zoom Out"
          disabled={zoom <= 0.5}
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        
        <span className="text-sm text-muted-foreground font-medium min-w-[50px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        
        <button 
          className="flipbook-btn" 
          onClick={onZoomIn}
          title="Zoom In"
          disabled={zoom >= 2}
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        
        <button 
          className={cn("flipbook-btn", isThumbnailOpen && "active")} 
          onClick={onToggleThumbnails}
          title="Thumbnails"
        >
          <Grid3X3 className="w-5 h-5" />
        </button>
        
        <button className="flipbook-btn" title="Table of Contents">
          <List className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-border mx-2" />

        <button 
          className="flipbook-btn" 
          onClick={onFirstPage}
          title="First Page"
          disabled={currentPage <= 1}
        >
          <ChevronsLeft className="w-5 h-5" />
        </button>
        
        <button 
          className="flipbook-btn" 
          onClick={onPrevPage}
          title="Previous Page"
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={displayText}
          onChange={(e) => {
            const match = e.target.value.match(/^(\d+)/);
            if (match) {
              const page = parseInt(match[1], 10);
              if (page >= 1 && page <= totalPages) {
                onPageChange(page);
              }
            }
          }}
          className="flipbook-page-input"
        />

        <button 
          className="flipbook-btn" 
          onClick={onNextPage}
          title="Next Page"
          disabled={currentPage >= totalPages}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        
        <button 
          className="flipbook-btn" 
          onClick={onLastPage}
          title="Last Page"
          disabled={currentPage >= totalPages}
        >
          <ChevronsRight className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-border mx-2" />

        <button className="flipbook-btn" title="Bookmark">
          <Bookmark className="w-5 h-5" />
        </button>
        
        <button className="flipbook-btn" title="Share">
          <Share2 className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-border mx-2" />

        <button 
          className={cn("flipbook-btn", isSoundEnabled && "active")}
          onClick={onToggleSound}
          title={isSoundEnabled ? "Mute Sound" : "Enable Sound"}
        >
          {isSoundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>

        <button 
          className="flipbook-btn" 
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
        </button>
      </nav>

      {/* Right side - empty for balance */}
      <div className="absolute right-6" />
    </header>
  );
};

export default FlipbookToolbar;
