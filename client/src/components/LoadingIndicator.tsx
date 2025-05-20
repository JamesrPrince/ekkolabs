import { useEffect, useState } from "react";

interface LoadingIndicatorProps {
  isLoading: boolean;
}

const LoadingIndicator = ({ isLoading }: LoadingIndicatorProps) => {
  const [show, setShow] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      // Add a small delay before hiding the loading indicator to make the transition smooth
      const timer = setTimeout(() => {
        setShow(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShow(true);
    }
  }, [isLoading]);

  // If not showing, don't render anything
  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#0A192F] z-50 flex items-center justify-center transition-opacity duration-500 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-t-[#64FFDA] border-[#112240] rounded-full animate-spin mb-4"></div>
        <h2 className="text-[#64FFDA] text-xl font-mono mb-2">Loading</h2>
        <p className="text-[#8892B0]">Please wait while the page loads...</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
