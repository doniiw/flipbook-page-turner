import { useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThumbnailSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  pages: { id: number; thumbnail?: React.ReactNode }[];
  currentPage: number;
  onPageSelect: (page: number) => void;
  totalPages: number;
}

const ThumbnailSidebar = ({
  isOpen,
  onClose,
  pages,
  currentPage,
  onPageSelect,
  totalPages,
}: ThumbnailSidebarProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [isOpen, currentPage]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!isOpen) return null;

  // Group pages in pairs for double-page spread display
  const pageGroups: { pages: number[]; label: string }[] = [];
  for (let i = 0; i < totalPages; i += 2) {
    if (i === 0) {
      // First page (cover) is single
      pageGroups.push({ pages: [1], label: "1" });
    } else if (i + 1 < totalPages) {
      // Double page spread
      pageGroups.push({ pages: [i + 1, i + 2], label: `${i + 1}-${i + 2}` });
    } else {
      // Last single page if odd number
      pageGroups.push({ pages: [i + 1], label: `${i + 1}` });
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 -top-full bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Thumbnail Bar */}
      <div className="relative bg-gradient-to-t from-background/98 to-background/95 backdrop-blur-md border-t border-primary/20 px-4 py-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Page Counter */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-muted/80 text-sm font-medium">
          {currentPage}-{Math.min(currentPage + 1, totalPages)}/{totalPages}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-muted/80 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-muted/80 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Thumbnails */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-10 mt-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {pages.map((page, idx) => {
            // Determine if this is a double-page spread
            const isDoublePage = idx > 0 && idx < pages.length - 1 && idx % 2 === 1;
            const isActive = currentPage === page.id || currentPage === page.id + 1;
            const nextPage = pages[idx + 1];

            if (idx === 0 || idx % 2 === 1) {
              return (
                <button
                  key={page.id}
                  ref={isActive ? activeRef : null}
                  onClick={() => onPageSelect(page.id)}
                  className={cn(
                    "flex-shrink-0 transition-all duration-200 rounded-lg overflow-hidden",
                    "hover:ring-2 hover:ring-primary/50 hover:scale-105",
                    isActive && "ring-2 ring-primary scale-105"
                  )}
                >
                  <div className={cn(
                    "flex bg-white shadow-lg rounded-lg overflow-hidden",
                    idx === 0 ? "w-20 h-28" : "w-40 h-28"
                  )}>
                    {/* First/Left page */}
                    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-slate-400 text-xs overflow-hidden">
                      {page.thumbnail || (
                        <span className="font-medium">Page {page.id}</span>
                      )}
                    </div>
                    {/* Second/Right page for double spread */}
                    {idx > 0 && nextPage && (
                      <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-slate-400 text-xs border-l border-slate-200 overflow-hidden">
                        {nextPage.thumbnail || (
                          <span className="font-medium">Page {nextPage.id}</span>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailSidebar;
