import { CONTACT_EMAIL } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface EmailLinkProps {
  className?: string;
}

export default function EmailLink({ className }: EmailLinkProps) {
  return (
    <div className={cn(
      "fixed right-8 bottom-0 hidden lg:block",
      className
    )}>
      <div className="flex flex-col items-center after:content-[''] after:block after:w-px after:h-24 after:mx-auto after:bg-[#8892B0]">
        <a 
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-[#8892B0] hover:text-[#64FFDA] transition-all duration-300 hover:-translate-y-1 text-xs tracking-widest [writing-mode:vertical-lr]"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </div>
  );
}
