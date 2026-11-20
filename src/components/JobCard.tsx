'use client'
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Job } from "@/lib/api/job";
import { formatDeadline, formatLocation, formatSalary } from "@/lib/job-format";
import { redirect } from "next/navigation";

type JobCardProps = {
  job: Job;
};

const JobCard = ({ job }: JobCardProps) => {
  const salary = formatSalary(job);
   const handleViewJobDetail = (jobId: string) => {
    redirect(`/browse-jobs/${jobId}`);
  }
  return (
    <Card className="rounded-2xl border border-white/10 bg-white/[0.03]" onClick={() => handleViewJobDetail(job._id)}>
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-600/10 text-base font-bold text-violet-300">
            {job.title.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-white">
              {job.title}
            </h3>
            <p className="truncate text-sm text-white/55">{job.company}</p>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              {job.jobType ? (
                <Badge
                  variant="outline"
                  className="border-white/10 bg-white/[0.04] text-white/80"
                >
                  {job.jobType}
                </Badge>
              ) : null}
              {job.jobCategory ? (
                <Badge
                  variant="outline"
                  className="border-white/10 bg-white/[0.04] text-white/80"
                >
                  {job.jobCategory}
                </Badge>
              ) : null}
              {job.isRemote ? (
                <Badge
                  variant="outline"
                  className="border-white/10 bg-white/[0.04] text-white/80"
                >
                  Remote
                </Badge>
              ) : null}
            </div>
          </div>
        </div>

        <div className="sm:min-w-52 sm:text-right">
          <p className="text-base font-semibold text-white">
            {salary.amount}
            {salary.unit ? (
              <span className="ml-1 text-xs font-medium text-white/50">
                {salary.unit}
              </span>
            ) : null}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-white/50">
            <MapPin className="size-3.5 shrink-0" />
            {formatLocation(job)}
          </p>
          <p className="mt-1 text-xs text-white/40">
            Deadline: {formatDeadline(job.deadlineDate)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
