import Link from "next/link";
import { Bookmark, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type JobDetailHeaderProps = {
  title: string;
  company: string;
  verified?: boolean;
  href?: string;
};

function JobDetailHeader({
  title,
  company,
  verified = false,
  href = "#",
}: JobDetailHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            {title}
          </h1>
          {verified && (
            <Badge
              variant="outline"
              className="border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1"
            >
              <CheckCircle2 className="size-3.5 mr-1" />
              Verified Employer
            </Badge>
          )}
        </div>
        <p className="text-sm font-medium text-white/80">{company}</p>
      </div>
      <div className="flex items-center gap-3">
        <a
          href="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/[0.07] transition-colors"
          aria-label="Save job"
        >
          <Bookmark className="size-4" />
        </a>
        <Link
          href={href}
          className="bg-[#6d5df6] hover:bg-[#5c4ce8] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}

export default JobDetailHeader;