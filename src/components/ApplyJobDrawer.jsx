import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from './ui/button'
import { Input } from './ui/input'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import useFetch from '@/hooks/useFetch'
import { applyToJob } from '@/api/apiApplication'
import { BarLoader } from 'react-spinners'

// Creating a zod schema. zod is a form validation library.

const schema = z.object({
    experience: z.number().min(0, { message: "Experience must be at least 0" }).int(),
    skills: z.string().min(1, { message: "Skills is required" }),
    education: z.enum(["Undergraduate", "Graduate", "Post Graduate"], { message: "Education level is required" }),
    resume: z.any().refine((file) => file[0] && (file[0].type === "application/pdf" || file[0].type === "application/msword"), { message: "Only PDF or Word documents are allowed" })
})

const ApplyJobDrawer = ({ job, user, fetchJob, applied = false }) => {

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema)
    })

    const {
        loading: loadingApply,
        error: errorApplying,
        fn: fnApply
    } = useFetch(applyToJob)

    const onSubmit = (data) => {
        fnApply({
            ...data,
            job_id: job.id,
            candidate_id: user.id,
            name: user.fullName,
            status: "applied",
            resume: data.resume[0]
        }).then(() => {
            fetchJob()
            reset()
        })
    }


    return (
        <Drawer open={applied ? false : undefined}>
            <DrawerTrigger asChild>
                <Button
                    size="lg"
                    variant={job?.isOpen && !applied ? "blue" : "destructive"}
                    disabled={!job?.isOpen || applied}
                >
                    {
                        job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"
                    }
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Apply for {job?.title} at {job?.company?.name}</DrawerTitle>
                    <DrawerDescription>Please fill the form below</DrawerDescription>
                </DrawerHeader>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4 pb-0'>
                    <Input
                        type="number"
                        placeholder="Enter your years of experience"
                        className="flex-1"
                        {...register("experience", {
                            valueAsNumber: true,
                        })}
                    />
                    {
                        errors.experience && (
                            <p className='text-red-500'>{errors.experience.message}</p>
                        )
                    }
                    <Input
                        type="text"
                        placeholder="Enter your skills here (separate each with a comma)"
                        className="flex-1"
                        {...register("skills")}
                    />
                    {
                        errors.skills && (
                            <p className='text-red-500'>{errors.skills.message}</p>
                        )
                    }
                    {/* since RadioGroup is a third-party library, i used the controller component from react hook form */}
                    <Controller
                        name="education"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup onValueChange={field.onChange} {...field}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Undergraduate" id="undergraduate" />
                                    <Label htmlFor="undergraduate">Undergraduate</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Graduate" id="graduate" />
                                    <Label htmlFor="graduate">Graduate</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Post Graduate" id="post-graduate" />
                                    <Label htmlFor="post-graduate">Post Graduate</Label>
                                </div>
                            </RadioGroup>
                        )}
                    />
                    {
                        errors.education && (
                            <p className='text-red-500'>{errors.education.message}</p>
                        )
                    }
                    <Input
                        type="file"
                        accept=".pdf, .doc, .docx"
                        className="flex-1 file:text-gray-500 cursor-pointer"
                        {...register("resume")}
                    />
                    {
                        errors.resume && (
                            <p className='text-red-500'>{errors.resume.message}</p>
                        )
                    }
                    {
                        errorApplying?.message && (
                            <p className='text-red-500'>{errorApplying?.message}</p>
                        )
                    }
                    {
                        loadingApply && <BarLoader className="mb-4" width={"100%"} color="#524f75" />
                    }
                    <Button type="submit" variant="blue" size="lg">Submit</Button>
                </form>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default ApplyJobDrawer