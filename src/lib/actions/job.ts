const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export interface IJob {
  _id: string
  title: string
  company: string
  jobCategory: string
  jobType: string
  isRemote: boolean
  jobLocation: string
  deadlineDate: string
  minSalary: number
  maxSalary: number
  frequency: string
};

export const createJob = async (data: Record<string, unknown>) => {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })

    return res.json()
}


export const applyJob = async (data: Record<string, unknown>) => {
    const res = await fetch(`${BASE_URL}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })

    return res.json()
}