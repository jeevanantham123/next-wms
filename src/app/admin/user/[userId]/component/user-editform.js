'use client';
import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form"; // Ensure this import
import { z } from "zod";
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    roleId: z.string().min(1, { message: "This field has to be filled." }),
});
const roles = [
    { id: 1, name: "Distributor" },
    { id: 2, name: "Stock manager" },
    { id: 3, name: "Manager" },
    { id: 4, name: "IT Manager" },
    { id: 5, name: "Sales representative" },
    { id: 6, name: "Production line user" }
];
const UserEditForm = ({ userDetails }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: userDetails?.userName || '',
            email: userDetails?.email || '',
            roleId: ''
        },
    });

    function onSubmit(values) {
        console.log(values);
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title="Edit User" description="Edit a user." />
                {userDetails && (
                    <Button variant="destructive" size="sm">
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="md:grid md:grid-cols-4 gap-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="roleId"
                            render={({ field }) => 
                                (
                                <FormItem>
                                    <FormLabel>Roles</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem
                                                    key={role.id}
                                                    value={String(role.id)}>
                                                    {role.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </FormProvider>
        </>
    );
};

export default UserEditForm;
