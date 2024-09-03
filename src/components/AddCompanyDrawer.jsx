import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Button } from './ui/button'
import { Input } from './ui/input'
import useFetch from '@/hooks/useFetch'
import { addNewCompany } from '@/api/apiCompanies'
import { BarLoader } from 'react-spinners'

const schema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    logo: z.any().refine((file) =>
        file[0] && (file[0].type === "image/png" || file[0].type === "image/jpeg"),
        { message: "Only images are allowed" })
})

const AddCompanyDrawer = ({ fetchCompanies }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

    const {
        loading: loadingNewCompany,
        error: newCompanyError,
        data: newCompanyData,
        fn: fnAddNewCompany
    } = useFetch(addNewCompany)

    const onSubmit = (data) => {
        fnAddNewCompany({
            ...data, logo: data.logo[0]
        })
    }

    useEffect(()=>{
        if(newCompanyData?.length > 0){
            fetchCompanies()
        }
    },[loadingNewCompany])

    return (
        <Drawer>
            <DrawerTrigger>
                <Button
                    className="text-white"
                    variant="orangeBlue"
                    size="sm"
                    type="button"
                >Add company</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add a new company</DrawerTitle>
                    <DrawerDescription>Add company by name and logo image</DrawerDescription>
                </DrawerHeader>
                <form className='flex gap-2 p-4 pb-0'>
                    <Input type="text" placeholder="Enter company's name" {...register("name")} />
                    <Input
                        type="file"
                        accept="image/*"
                        className="file:text-gray-500 cursor-pointer"
                        {...register("logo")}
                    />
                    <Button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        variant="orangeBlue"
                        className="w-40 text-white"
                    >
                        Add
                    </Button>
                </form>
                {errors?.name && <p className='text-red-500'>{errors?.name?.message}</p>}
                {errors?.logo && <p className='text-red-500'>{errors?.logo?.message}</p>}
                {newCompanyError?.message && (<p className='text-red-500'>{newCompanyError?.message}</p>)}
                {loadingNewCompany && <BarLoader width={"100%"} color='#524f75' />}
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="ghost" type="button">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default AddCompanyDrawer