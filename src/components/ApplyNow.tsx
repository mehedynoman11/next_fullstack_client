'use client'
import { applyJob, IJob } from '@/lib/actions/job';
import { useSession} from '@/lib/auth-client';
import { email } from 'better-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const ApplyNow = ({href, job}:{href:string, job:IJob}) => {
    const {data: session} = useSession();
    const router = useRouter();
    const user = session?.user;

    const handleApply = async() => {
        if(!user) {
            router.push(`/signin?redirectTo=/browse-jobs/${job._id}`);
            return;
        } else if(user.role === 'seeker'){
            // console.log("Save the data to the database.");
            const application = {
                jobId: job._id,
                userId: user.id,
                email: user.email,
                jobTitle: job.title,
                companyName: job.company
            }

            const result = await applyJob(application);
            if(result.insertedId) {
                console.log("Application submitted successfully.");
                toast.success("Application submitted successfully.");
                router.push('/browse-jobs');
            }
        } else {
            console.log("user is not a job seeker");
        }
    }
    return (
        <button
        onClick={handleApply}
        >
        <Link
        
          href={href}
          className="bg-[#6d5df6] hover:bg-[#5c4ce8] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Apply Now
        </Link>
        </button>
    );
};

export default ApplyNow;