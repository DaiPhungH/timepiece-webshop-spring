import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Carousel,
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ImageIcon } from "lucide-react";

interface ProductImageGalleryProps {
  productName: string;
  mainImage: string;
  images: string[];
}

const ProductImageGallery = ({ productName, mainImage, images }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(mainImage);

  return (
    <div className="space-y-6">
      {/* Main Image Display */}
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <AspectRatio ratio={1/1}>
          <img
            src={selectedImage}
            alt={productName}
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>
      
      {/* Image Carousel */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index} className="basis-1/4 md:basis-1/5">
                <button
                  onClick={() => setSelectedImage(img)}
                  className={`w-full rounded-md overflow-hidden transition-all ${
                    selectedImage === img ? "ring-2 ring-gold-500" : "hover:opacity-80"
                  }`}
                >
                  <AspectRatio ratio={1/1}>
                    <img 
                      src={img} 
                      alt={`${productName} góc nhìn ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 opacity-70 hover:opacity-100" />
          <CarouselNext className="right-0 opacity-70 hover:opacity-100" />
        </Carousel>
      </div>
      
      {/* Expanded View Button */}
      <div className="flex justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Xem Toàn Màn Hình
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-screen max-w-[90vw] p-0" align="center">
            <div className="p-1">
              <img
                src={selectedImage}
                alt={productName}
                className="max-h-[80vh] object-contain"
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ProductImageGallery;