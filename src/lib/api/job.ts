import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export type JobSalary = {
  min?: number;
  max?: number;
  frequency?: string;
};

export type Job = {
  _id: string;
  title: string;
  company?: string;
  jobCategory?: string;
  jobType?: string;
  isRemote?: boolean;
  jobLocation?: string;
  deadlineDate?: string;
  salary?: JobSalary;
  minSalary?: number;
  maxSalary?: number;
  frequency?: string;
};

export const getJobs = async (query = '') => {
  const res = await fetch(`${process.env.BASE_URL}/jobs?${query}`)
  if (!res){
    console.error("Something wen wrong.");
    toast.error("fetch failed!");
  }
  return res.json();
};
