"use client";

import React, { useRef, useState } from "react";
import { VncScreen } from "react-vnc";
import { TrashIcon, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Page({ params }: { params: { browserId: string } }) {
  const router = useRouter();
  const ref = useRef(null);
  const browserId = params.browserId;
  let vncUrl = `https://admin.privatebrowser.dev/${browserId}`;

  const [selectedFile, setSelectedFile] = useState(null);

  const userId = "ciSBLV4JHcWw3oBbY5bk"; 
  const containerId = browserId; 

  async function removeBrowser(container_id: string) {
    console.log("ran");

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let res = await fetch(
      "https://admin.privatebrowser.dev/api/container/remove",
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify({
          user_id: "ciSBLV4JHcWw3oBbY5bk",
          container_id: container_id,
        }),
      }
    );

    router.push("/");

    console.log(res);
  }
  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId); 
    formData.append("containerId", containerId); 

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("File uploaded successfully");
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="browser relative">
      <div className="absolute right-0">
        <AlertDialog>
          <AlertDialogTrigger>
            <Button>Tools</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Browser Management</AlertDialogTitle>
              <AlertDialogDescription>
                <Button
                  onClick={() => {
                    removeBrowser(containerId);
                  }}
                  variant="destructive"
                  className="w-full py-6 text-lg font-semibold"
                >
                  <TrashIcon className="mr-2 h-6 w-6" />
                  Delete
                </Button>
                <hr />
                <h2 className="text-xl my-5">Upload files</h2>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="file">Select File</Label>
                    <Input onChange={handleFileChange} id="file" type="file" />
                  </div>
                  <Button type="submit" className="w-full">
                    Upload
                  </Button>
                </form>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <VncScreen
        url={vncUrl}
        scaleViewport
        background="#000000"
        style={{
          width: "100vw",
          height: "100vh",
        }}
        rfbOptions={{
          credentials: {
            username: "user",
            password: "passwd",
          },
        }}
        ref={ref}
      />
    </div>
  );
}
