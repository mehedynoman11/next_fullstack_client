import Link from "next/link";
import { Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type JobCompanyOverviewProps = {
  company: string;
  size: string;
  industry: string;
  href?: string;
};

function JobCompanyOverview({
  company,
  size,
  industry,
  href = "#",
}: JobCompanyOverviewProps) {
  return (
    <Card className="rounded-2xl border border-white/10 bg-white/[0.03]">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Company Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-8 rounded-lg bg-muted overflow-hidden">
            <Building2 className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Company
            </p>
            <p className="text-sm font-semibold text-foreground">{company}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Size</span>
            <span className="text-sm text-foreground">{size}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Industry</span>
            <span className="text-sm text-foreground">{industry}</span>
          </div>
        </div>
        <Link
          href={href}
          className="w-full mt-4 border border-white/10 bg-white/[0.04] text-white/90 text-center text-xs py-2 rounded-lg hover:bg-white/[0.07] transition-colors"
        >
          Visit Website
        </Link>
      </CardContent>
    </Card>
  );
}

export default JobCompanyOverview;