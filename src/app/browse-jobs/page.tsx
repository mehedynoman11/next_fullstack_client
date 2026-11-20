import JobCard from "@/components/JobCard";
import JobFilters, { type JobFilterGroup } from "@/components/JobFilters";
import JobSearchBar from "@/components/JobSearchBar";
import type { IJob } from "@/lib/actions/job";
import { getJobs } from "@/lib/api/job";
import { redirect } from "next/navigation";

const BrowseJobs = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search = await searchParams;
  const urlSearch = new URLSearchParams(search as Record<string, string>);
  const query = urlSearch.toString();
  const jobs: IJob[] = await getJobs(query);

  const categories = Array.from(
    new Set(
      jobs
        .map((job) => job.jobCategory)
        .filter((category): category is string => Boolean(category)),
    ),
  );

  const jobTypes = Array.from(
    new Set(
      jobs
        .map((job) => job.jobType)
        .filter((jobType): jobType is string => Boolean(jobType)),
    ),
  );

  const filterGroups: JobFilterGroup[] = [
    { id: "category", title: "Category", options: categories },
    { id: "job-type", title: "Job Type", options: jobTypes },
    {
      id: "work-mode",
      title: "Work Mode",
      options: ["Remote", "Hybrid", "On-site"],
    },
  ];



 

  return (
    <div className="bg-[#07070c]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-12 pb-24 sm:px-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Browse Jobs
          </h1>
          <p className="max-w-2xl text-sm text-white/55 sm:text-base">
            Search thousands of curated openings or filter by category and type
            to find the right fit.
          </p>
        </header>

        <JobSearchBar />

        <div className="grid items-start gap-8 lg:grid-cols-[288px_minmax(0,1fr)]">
          <JobFilters groups={filterGroups} />

          <section className="flex flex-col gap-4">
            <p className="text-sm text-white/45">
              {jobs.length} {jobs.length === 1 ? "job" : "jobs"} found
            </p>

            {jobs.length > 0 ? (
              <ul className="flex flex-col gap-4">
                {jobs.map((job) => (
                  <li key={job._id} >
                    <JobCard job={job} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
                <p className="text-sm font-medium text-white">No jobs found</p>
                <p className="max-w-sm text-sm text-white/50">
                  Try a different search term or adjust your filters.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default BrowseJobs;
