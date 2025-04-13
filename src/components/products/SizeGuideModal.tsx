
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink, Video } from "lucide-react";

interface SizeGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productCategory?: string;
}

const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ open, onOpenChange, productCategory = "dress" }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Size Guide</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-6">
          <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Video className="h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">How to Measure Your Size</p>
              {/* In a real application, you would embed an actual video here */}
              {/* <video 
                controls 
                src="https://example.com/size-guide-video.mp4" 
                className="w-full h-full object-cover"
              /> */}
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Need more information about finding your perfect fit?
            </p>
            <Button asChild className="flex items-center gap-2">
              <Link to="/size-guide">
                <span>View Complete Size Guide</span>
                <ExternalLink size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuideModal;
