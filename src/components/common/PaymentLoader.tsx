
import React from 'react';
import { Loader2 } from 'lucide-react';

interface PaymentLoaderProps {
  isProcessing: boolean;
}

const PaymentLoader: React.FC<PaymentLoaderProps> = ({ isProcessing }) => {
  if (!isProcessing) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <div className="flex flex-col items-center">
          <div className="relative h-24 w-24 mb-6">
            <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
            <div className="absolute inset-4 border-4 border-t-transparent border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-primary animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">Processing Payment</h3>
          <p className="text-gray-500">Please don't close this window while your payment is being processed.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentLoader;
