import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrashIcon } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

export function BrowserTools() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle file upload logic here
    console.log("File uploaded")
  }

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Delete action triggered")
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Browser Management</CardTitle>
        {/* <CardDescription>Delete browser or upload your files.</CardDescription> */}
      </CardHeader>
      <CardContent className="space-y-6">
      
        <Button 
          onClick={handleDelete}
          variant="destructive" 
          className="w-full py-6 text-lg font-semibold"
        >
          <TrashIcon className="mr-2 h-6 w-6" />
          Delete
        </Button>
        <hr />
        <h2>Upload files</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="file">Select File</Label>
            <Input id="file" type="file" />
          </div>
          <Button type="submit" className="w-full">Upload</Button>
        </form>
      </CardContent>
    </Card>
  )
}


<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
