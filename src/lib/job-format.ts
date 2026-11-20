import type { Job } from "@/lib/api/job";

const salaryUnitByFrequency: Record<string, string> = {
  hourly: "/hr",
  daily: "/day",
  weekly: "/wk",
  monthly: "/mo",
  quarterly: "/qtr",
  yearly: "/yr",
  annually: "/yr",
};

const numberFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const deadlineFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  // Deadlines are stored as plain `YYYY-MM-DD`, which `Date` parses as UTC.
  // Formatting in UTC keeps the displayed day from shifting.
  timeZone: "UTC",
});

const formatAmount = (value?: number) =>
  typeof value === "number" && Number.isFinite(value)
    ? numberFormat.format(value)
    : null;

/**
 * Compensation is stored nested (`salary: { min, max, frequency }`) on newer
 * documents and as flat fields (`minSalary`, `maxSalary`, `frequency`) on older
 * ones, so both shapes are supported here.
 */
export const formatSalary = (job: Job): { amount: string; unit: string } => {
  const min = formatAmount(job.salary?.min ?? job.minSalary);
  const max = formatAmount(job.salary?.max ?? job.maxSalary);
  const frequency = job.salary?.frequency ?? job.frequency;

  const amount =
    min && max
      ? min === max
        ? min
        : `${min} – ${max}`
      : (min ?? max ?? "Not disclosed");

  const unit = frequency
    ? (salaryUnitByFrequency[frequency.toLowerCase()] ?? `/${frequency}`)
    : "";

  return { amount, unit };
};

export const formatDeadline = (value?: string) => {
  if (!value) return "No deadline";

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : deadlineFormat.format(date);
};

export const isExpired = (value?: string) => {
  if (!value) return false;

  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && date.getTime() < Date.now();
};

export const formatLocation = (job: Job) =>
  [job.jobLocation, job.isRemote ? "Remote" : null].filter(Boolean).join(" · ") ||
  "—";
