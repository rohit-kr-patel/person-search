"use client"

import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import type { User } from "@/app/actions/schemas"
import { updateUser } from "@/app/actions/actions"
import { toast } from "@/hooks/use-toast"
import { UserEditDialog } from "./user-edit-dialog"

interface EditButtonProps {
  userId: string
  userData: User
}

export default function EditButton({ userId, userData }: EditButtonProps) {
  const handleEdit = async (updatedData: Partial<User>) => {
    try {
      console.log("EditButton: Attempting to update user with ID", userId)
      await updateUser(userId, updatedData)
      toast({
        title: "User Updated",
        description: `User ${userData.name} has been updated successfully.`,
        variant: "default",
      })
    } catch (error) {
      console.error("EditButton: Error updating user", error)
      toast({
        title: "Error",
        description: "An error occurred while updating the user.",
        variant: "destructive",
      })
    }
  }

  return (
    <UserEditDialog user={userData} onSubmit={handleEdit}>
      <Button variant="outline">
        <Edit className="w-4 h-4 mr-2" />
        Edit
      </Button>
    </UserEditDialog>
  )
}

