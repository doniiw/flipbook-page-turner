import { 
  Search, 
  Grid3X3, 
  List, 
  ChevronsLeft, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsRight,
  Bookmark,
  Share2
} from "lucide-react";

interface FlipbookToolbarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
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
  title = "Digital Magazine"
}: FlipbookToolbarProps) => {
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
        <button className="flipbook-btn" title="Zoom">
          <Search className="w-5 h-5" />
        </button>
        
        <button className="flipbook-btn" title="Grid View">
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
          value={`${currentPage}/${totalPages}`}
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
      </nav>

      {/* Right side - empty for balance */}
      <div className="absolute right-6" />
    </header>
  );
};

export default FlipbookToolbar;
