import React, { forwardRef } from "react";

interface FlipbookPageProps {
  children: React.ReactNode;
  pageNumber?: number;
}

const FlipbookPage = forwardRef<HTMLDivElement, FlipbookPageProps>(
  ({ children, pageNumber }, ref) => {
    return (
      <div ref={ref} className="flipbook-page relative">
        <div className="w-full h-full bg-flipbook-page overflow-hidden">
          {children}
        </div>
        {pageNumber && (
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-body">
            {pageNumber}
          </span>
        )}
      </div>
    );
  }
);

FlipbookPage.displayName = "FlipbookPage";

export default FlipbookPage;
