-- Create table for storing flipbook documents
CREATE TABLE public.flipbooks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  total_pages INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for storing pages of each flipbook
CREATE TABLE public.flipbook_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  flipbook_id UUID NOT NULL REFERENCES public.flipbooks(id) ON DELETE CASCADE,
  page_number INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(flipbook_id, page_number)
);

-- Enable Row Level Security
ALTER TABLE public.flipbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flipbook_pages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (flipbooks are shareable)
CREATE POLICY "Flipbooks are publicly viewable" 
ON public.flipbooks 
FOR SELECT 
USING (true);

CREATE POLICY "Flipbook pages are publicly viewable" 
ON public.flipbook_pages 
FOR SELECT 
USING (true);

-- Create policies for insert (anyone can upload for now)
CREATE POLICY "Anyone can create flipbooks" 
ON public.flipbooks 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can add flipbook pages" 
ON public.flipbook_pages 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_flipbooks_updated_at
BEFORE UPDATE ON public.flipbooks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for flipbook images
INSERT INTO storage.buckets (id, name, public)
VALUES ('flipbook-images', 'flipbook-images', true);

-- Create storage policies
CREATE POLICY "Flipbook images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'flipbook-images');

CREATE POLICY "Anyone can upload flipbook images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'flipbook-images');