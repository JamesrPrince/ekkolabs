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
        "bg-custom-primary-lighter rounded-lg p-8 border border-custom-accent1 animate-in",
        isIntersecting && "show"
      )}
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-custom-secondary mb-2">
          Stay Updated on Latest Insights
        </h3>
        <p className="text-custom-accent2 text-sm">
          Subscribe to my newsletter for exclusive content and analytics
          insights
        </p>
      </div>

      {isSubscribed ? (
        <div className="bg-custom-primary p-4 rounded text-center">
          <p className="text-custom-accent3">
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
            className="flex-grow bg-custom-primary border-custom-accent1 text-custom-secondary focus:border-custom-accent3 focus:ring-custom-accent3/10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="bg-custom-accent3 text-custom-primary hover:bg-custom-accent3/90 font-medium"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
}
