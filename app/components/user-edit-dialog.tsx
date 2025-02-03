"use client"

import { useState } from "react"
import { userFormSchema, type User, type UserFormData } from "@/app/actions/schemas"
import { UserForm } from "./user-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type React from "react" // Added import for React

interface UserEditDialogProps {
  user: User
  onSubmit: (data: UserFormData) => Promise<void>
  children: React.ReactNode
}

export function UserEditDialog({ user, onSubmit, children }: UserEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
  })

  const handleSubmit = async (data: UserFormData) => {
    await onSubmit(data)
    setIsOpen(false)
    form.reset(data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {user.name}</DialogTitle>
          <DialogDescription>Update the details of {user.name} below.</DialogDescription>
        </DialogHeader>
        <UserForm form={form} />
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(handleSubmit)}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

