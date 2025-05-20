import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would send the email to a backend service
      console.log(`Subscribing email: ${email}`);
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        "bg-[#112240] rounded-lg p-8 border border-[#1E3A5F] animate-in",
        isIntersecting && "show"
      )}
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-[#CCD6F6] mb-2">
          Stay Updated on Latest Insights
        </h3>
        <p className="text-[#8892B0] text-sm">
          Subscribe to my newsletter for exclusive content and analytics
          insights
        </p>
      </div>

      {isSubscribed ? (
        <div className="bg-[#0A192F] p-4 rounded text-center">
          <p className="text-[#64FFDA]">
            Thank you for subscribing! Check your inbox soon for updates.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Input
            type="email"
            placeholder="Your email address"
            className="flex-grow bg-[#0A192F] border-[#1E3A5F] text-[#CCD6F6] focus:border-[#64FFDA] focus:ring-[#64FFDA]/10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="bg-[#64FFDA] text-[#0A192F] hover:bg-[#64FFDA]/90 font-medium"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
}
