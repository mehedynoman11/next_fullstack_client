import { cn } from "cn";
import {
    AlertCircle,
    Briefcase,
    Plus,
    SquarePen,
    Trash2,
} from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getJobs, type Job } from "@/lib/api/job";
import {
    formatDeadline,
    formatLocation,
    formatSalary,
    isExpired,
} from "@/lib/job-format";

type JobStatus = "Active" | "Expired";

/** Row shape the table needs, derived from the raw API document. */
type JobRow = {
    id: string;
    title: string;
    department: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    salaryUnit: string;
    status: JobStatus;
    deadline: string;
};


const statusStyles: Record<JobStatus, { badge: string; dot: string }> = {
    Active: {
        badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
        dot: "bg-emerald-400",
    },
    Expired: {
        badge: "border-red-500/20 bg-red-500/10 text-red-400",
        dot: "bg-red-400",
    },
};

const toJobRow = (job: Job): JobRow => {
    const salary = formatSalary(job);

    return {
        id: job._id,
        title: job.title,
        department: job.jobCategory ?? "Uncategorised",
        company: job.company ?? "—",
        location: formatLocation(job),
        type: job.jobType ?? "Full-time",
        salary: salary.amount,
        salaryUnit: salary.unit,
        status: isExpired(job.deadlineDate) ? "Expired" : "Active",
        deadline: formatDeadline(job.deadlineDate),
    };
};

const headerCell =
    "h-11 text-xs font-medium tracking-wider text-muted-foreground uppercase";

const JobsPage = async () => {
    let error: string | null = null;

    const data: Job[] = await getJobs();
    const jobs: JobRow[] = data.filter((job: Job) => Boolean(job.title)).map(toJobRow);


    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink render={<Link href="/dashboard/recruiter" />}>
                                    Manage Jobs
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Job Listings &amp; Postings</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                            Manage Job Posts
                        </h1>
                        <p className="max-w-2xl text-sm text-muted-foreground">
                            Review live listings, monitor applicants, and update job details
                            across your organization.
                        </p>
                    </div>
                </div>
                <Button
                    size="lg"
                    nativeButton={false}
                    className="h-10 shrink-0 gap-2 bg-violet-600 px-4 text-white shadow-sm hover:bg-violet-500 focus-visible:ring-violet-500/40"
                    render={<Link href="/dashboard/recruiter/jobs/new" />}
                >
                    <Plus />
                    New Job Post
                </Button>
            </div>

            {error ? (
                <Alert variant="destructive" className="p-4">
                    <AlertCircle />
                    <AlertTitle>Couldn&apos;t load job posts</AlertTitle>
                    <AlertDescription>
                        {error}. Check that the jobs API is running and{" "}
                        <code className="text-xs">BASE_URL</code> points to it, then refresh
                        this page.
                    </AlertDescription>
                </Alert>
            ) : (
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                    <Table className="min-w-[700px]">
                        <TableHeader className="bg-muted/40">
                            <TableRow className="hover:bg-transparent">
                                <TableHead scope="col" className={cn(headerCell, "pl-5")}>
                                    Job Title &amp; Dept
                                </TableHead>
                                <TableHead scope="col" className={cn(headerCell, "px-4")}>
                                    Company &amp; Location
                                </TableHead>
                                <TableHead scope="col" className={cn(headerCell, "px-4")}>
                                    Compensation
                                </TableHead>
                                <TableHead scope="col" className={cn(headerCell, "px-4")}>
                                    Status
                                </TableHead>
                                <TableHead scope="col" className={cn(headerCell, "px-4")}>
                                    Deadline
                                </TableHead>
                                <TableHead
                                    scope="col"
                                    className={cn(headerCell, "pr-5 pl-4 text-right")}
                                >
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jobs.length === 0 ? (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={6} className="py-16 text-center">
                                        <Briefcase className="mx-auto mb-3 size-8 text-muted-foreground/60" />
                                        <p className="text-sm font-medium text-foreground">
                                            No job posts yet
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Publish your first listing to start receiving applicants.
                                        </p>
                                        <Button
                                            size="sm"
                                            nativeButton={false}
                                            className="mt-4 gap-2 bg-violet-600 text-white hover:bg-violet-500"
                                            render={<Link href="/dashboard/recruiter/jobs/new" />}
                                        >
                                            <Plus />
                                            New Job Post
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                jobs.map((job) => {

                                    const status = statusStyles[job.status];

                                    return (
                                        <TableRow key={job.id} className="hover:bg-muted/30">
                                            <TableCell className="py-4 pl-5">
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={cn(
                                                            "flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10",
                                                        )}
                                                    >
                                                        {job.type.charAt(0)}
                                                    </span>
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-semibold text-foreground">
                                                            {job.title}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {job.department}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <p className="text-sm text-foreground/90">
                                                    {job.company}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {job.location}
                                                </p>
                                            </TableCell>
                                            {/* <TableCell className="px-4 py-4">
                                                <span className="text-sm text-foreground/80">
                                                    {job.type}
                                                </span>
                                            </TableCell> */}
                                            <TableCell className="px-4 py-4">
                                                <span className="text-sm font-medium text-foreground">
                                                    {job.salary}
                                                </span>
                                                {job.salaryUnit ? (
                                                    <span className="ml-1 text-xs text-muted-foreground">
                                                        {job.salaryUnit}
                                                    </span>
                                                ) : null}
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <Badge
                                                    variant="outline"
                                                    className={cn("gap-1.5 px-2.5", status.badge)}
                                                >
                                                    <span
                                                        className={cn("size-1.5 rounded-full", status.dot)}
                                                    />
                                                    {job.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-4 py-4">
                                                <span className="text-sm text-muted-foreground">
                                                    {job.deadline}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-4 pr-5 pl-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        nativeButton={false}
                                                        aria-label={`Edit ${job.title}`}
                                                        render={
                                                            <Link
                                                                href={`/dashboard/recruiter/jobs/${job.id}/edit`}
                                                            />
                                                        }
                                                    >
                                                        <SquarePen />
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="icon-sm"
                                                        aria-label={`Delete ${job.title}`}
                                                    >
                                                        <Trash2 />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default JobsPage;
