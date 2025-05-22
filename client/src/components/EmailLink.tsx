import { CONTACT_EMAIL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface EmailLinkProps {
  className?: string;
}

export default function EmailLink({ className }: EmailLinkProps) {
  return (
    <div
      className={cn(
        "fixed right-8 bottom-0 hidden lg:block z-50", // Added z-index
        className
      )}
    >
      <div className="flex flex-col items-center after:content-[''] after:block after:w-px after:h-24 after:mx-auto after:bg-custom-accent1">
        {" "}
        {/* Updated color */}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-custom-accent2 hover:text-custom-accent3 transition-all duration-300 hover:-translate-y-1 text-xs tracking-widest [writing-mode:vertical-lr]" // Updated colors
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </div>
  );
}
