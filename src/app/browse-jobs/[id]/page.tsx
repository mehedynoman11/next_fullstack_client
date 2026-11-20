import { Briefcase, Clock, DollarSign, MapPin } from "lucide-react";
import JobCompanyOverview from "@/components/JobCompanyOverview";
import JobDetailHeader from "@/components/JobDetailHeader";
import JobInfoCard from "@/components/JobInfoCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { IJob } from "@/lib/actions/job";
import { getJobs } from "@/lib/api/job";
import { formatLocation, formatSalary } from "@/lib/job-format";

const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const jobs: IJob[] = await getJobs("");
  const job = jobs.find((j) => j._id === id);

  if (!job) {
    return (
      <div className="bg-[#07070c] min-h-screen py-12 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-white">Job not found</h1>
          <p className="mt-2 text-sm text-white/50">
            The job you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  const salary = formatSalary(job);

  return (
    <div className="bg-[#07070c] min-h-screen py-12 px-4">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        <main className="lg:col-span-8 flex flex-col gap-6">
          <JobDetailHeader
            title={job.title}
            company={job.company}
            verified
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <JobInfoCard
              label="Salary Range"
              value={
                salary.amount
                  ? `${salary.amount}${salary.unit ? ` / ${salary.unit}` : ""}`
                  : "Not disclosed"
              }
              Icon={DollarSign}
            />
            <JobInfoCard
              label="Location"
              value={formatLocation(job)}
              Icon={MapPin}
            />
            <JobInfoCard
              label="Job Type"
              value={job.jobType ?? "Full-time"}
              Icon={Briefcase}
            />
            <JobInfoCard label="Experience" value="5+ Years" Icon={Clock} />
          </div>

          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
              Job Description
            </h2>
            <Card className="rounded-2xl border border-white/10 bg-white/[0.03]">
              <CardContent className="p-5">
                <p className="text-sm text-white/70 leading-relaxed">
                  At CloudScale AI, we are building the next generation of
                  infrastructure monitoring tools. We are looking for a Senior
                  Product Designer who is passionate about translating complex
                  technical workflows into elegant, intuitive interfaces. You
                  will be a key member of our design team, collaborating with
                  engineering and product leadership to define the vision for
                  our core platform experience.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
              Responsibilities
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-white/70">
              <li>
                Lead the end-to-end design process for major platform features,
                from discovery to high-fidelity implementation.
              </li>
              <li>
                Collaborate with cross-functional partners to understand user
                needs and translate them into intuitive designs.
              </li>
              <li>
                Maintain and evolve our design system, ensuring consistency and
                accessibility across the entire product suite.
              </li>
              <li>
                Conduct user research and usability testing to validate design
                decisions and iterate based on feedback.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
              Requirements
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge
                variant="outline"
                className="border-white/10 bg-white/[0.04] text-white/80"
              >
                Figma Expertise
              </Badge>
              <Badge
                variant="outline"
                className="border-white/10 bg-white/[0.04] text-white/80"
              >
                System Thinking
              </Badge>
              <Badge
                variant="outline"
                className="border-white/10 bg-white/[0.04] text-white/80"
              >
                UI/UX Design
              </Badge>
              <Badge
                variant="outline"
                className="border-white/10 bg-white/[0.04] text-white/80"
              >
                Basic Frontend
              </Badge>
            </div>
            <ul className="list-disc list-inside space-y-2 text-sm text-white/70">
              <li>
                5+ years of experience designing complex B2B SaaS products or
                data-heavy applications.
              </li>
              <li>
                A strong portfolio showcasing your design process and
                problem-solving skills.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
              Benefits
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <DollarSign className="size-4 shrink-0 text-white/50" />
                <p className="text-sm text-white/80">Competitive 401k</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <Clock className="size-4 shrink-0 text-white/50" />
                <p className="text-sm text-white/80">Unlimited PTO</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <MapPin className="size-4 shrink-0 text-white/50" />
                <p className="text-sm text-white/80">Full Health & Dental</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <Clock className="size-4 shrink-0 text-white/50" />
                <p className="text-sm text-white/80">Latest Hardware Stipend</p>
              </div>
            </div>
          </section>
        </main>

        <aside className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-24">
          <JobCompanyOverview
            company={job.company}
            size="250 - 500 Employees"
            industry="SaaS / Artificial Intelligence"
          />
        </aside>
      </div>
    </div>
  );
};

export default JobDetailsPage;
