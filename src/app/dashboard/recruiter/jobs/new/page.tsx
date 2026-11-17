'use client'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const

const NewJobPage = () => {
    const handlePostJob = () => {

    }
    return (
        <div className="w-full max-w-2xl">
            <form onSubmit={handlePostJob}>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>Post a New Job</FieldLegend>
                        <FieldDescription>
                            Fill in the position specifications to attract qualified talent across our network.
                        </FieldDescription>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="title">Job Title</FieldLabel>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Frontend Developer"
                                    required
                                />
                            </Field>
                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel htmlFor="company">Company Name</FieldLabel>
                                    <Input
                                        id="company"
                                        name="company"
                                        placeholder="HirePulse Network"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="jobCategory">Job Category</FieldLabel>
                                    <Select defaultValue="01" name="jobCategory">
                                        <SelectTrigger id="jobCategory">
                                            <SelectValue placeholder="Engineering & Tech" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="01">Engineering & Tech</SelectItem>
                                                <SelectItem value="02">Design</SelectItem>
                                                <SelectItem value="03">Marketing</SelectItem>
                                                <SelectItem value="04">Sales</SelectItem>
                                                <SelectItem value="05">Operations</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </div>
                            <Field>
                                <FieldLabel>Job Type</FieldLabel>
                                <div className="grid grid-cols-4 gap-4">
                                    {JOB_TYPES.map((type) => (
                                        <div key={type} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                id={`jobType-${type}`}
                                                name="jobType"
                                                value={type}
                                                defaultChecked={type === "Full-time"}
                                                className="h-4 w-4"
                                            />
                                            <Label htmlFor={`jobType-${type}`} className="font-normal">
                                                {type}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </Field>
                            <Field>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="isRemote" name="isRemote" />
                                    <FieldLabel htmlFor="isRemote" className="font-normal">
                                        Remote Work Allowed
                                    </FieldLabel>
                                </div>
                                <FieldDescription>
                                    Enable worldwide or distributed candidate applications
                                </FieldDescription>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="jobLocation">Job Location</FieldLabel>
                                <Input
                                    id="jobLocation"
                                    name="jobLocation"
                                    placeholder="New York, USA"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="deadlineDate">Application Deadline</FieldLabel>
                                <Input
                                    id="deadlineDate"
                                    name="deadlineDate"
                                    type="date"
                                    required
                                />
                            </Field>
                            <div className="grid grid-cols-3 gap-3">
                                <Field>
                                    <FieldLabel htmlFor="minSalary">Min Salary / Rate</FieldLabel>
                                    <Input id="minSalary" name="minSalary" type="number" min={0} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="maxSalary">Max Salary / Rate</FieldLabel>
                                    <Input id="maxSalary" name="maxSalary" type="number" min={0} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="frequency">Frequency</FieldLabel>
                                    <Select name="frequency" defaultValue="yearly">
                                        <SelectTrigger id="frequency">
                                            <SelectValue placeholder="Yearly" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="hourly">Hourly</SelectItem>
                                                <SelectItem value="daily">Daily</SelectItem>
                                                <SelectItem value="monthly">Monthly</SelectItem>
                                                <SelectItem value="yearly">Yearly</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </div>
                        </FieldGroup>
                    </FieldSet>

                    <FieldSeparator />

                   <FieldSet>
                        <FieldTitle>Responsibilities & Requirements</FieldTitle>
                        <FieldDescription>
                            In the descriptions below, the following will be auto-generated for this posting.
                            Review them before publishing — no manual input is required here.
                        </FieldDescription>

                        <FieldGroup>
                            <Field>
                                <FieldTitle>1. Key Requirements</FieldTitle>
                                <FieldDescription>
                                    Essential skills, experience, and must-haves for the role
                                    (e.g. years of experience, core technologies, certifications).
                                </FieldDescription>
                            </Field>

                            <Field>
                                <FieldTitle>2. Qualifications & Requirements</FieldTitle>
                                <FieldDescription>
                                    Preferred qualifications, education, and nice-to-haves
                                    (e.g. degree, portfolio, soft skills).
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>

                <Button type="submit" className="mt-6">
                    Post Job
                </Button>
            </form>
        </div>
    )
}

export default NewJobPage