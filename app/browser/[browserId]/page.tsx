"use client";

import React, { useRef, useState } from "react";
import { VncScreen } from "react-vnc";
import VncDisplay from 'react-vnc-display';
import { Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Button } from "@/components/ui/button";
import { AlertButton } from "@/components/ui/alertButton";

async function removeBrowser(container_id: string) {
  console.log("ran");

  let headers = new Headers();
  headers.append("Content-Type", "application/json");

  let res = await fetch("https://admin.privatebrowser.dev/api/container/remove", {
    headers: headers,
    method: "POST",
    body: JSON.stringify({
      user_id: "ciSBLV4JHcWw3oBbY5bk",
      container_id: container_id,
    }),
  });

  console.log(res);
}

export default function Page({ params }: { params: { browserId: string } }) {
  const ref = useRef(null);

  const browserId = params.browserId;
  let vncUrl = `ws://admin.privatebrowser.dev/${browserId}`;

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user-id","ciSBLV4JHcWw3oBbY5bk")

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <div className="browser relative">
      <div className="absolute right-0">
        <HoverCard>
          <HoverCardTrigger className="block w-max">
            <Wrench />
          </HoverCardTrigger>
          <HoverCardContent>
            <AlertButton
              onclick={() => removeBrowser(browserId)}
              messege={"Permenetly delete browser"}
              btnMessege="Remove browser"
            />
            <form onSubmit={handleSubmit}>
              <Input type="file" onChange={handleFileChange} accept=".zip" />
              <Button type="submit">Upload</Button>
            </form>
          </HoverCardContent>
        </HoverCard>
      </div>

      <VncScreen
        url={vncUrl}
        scaleViewport
        background="#000000"
        style={{
          width: "100vw",
          height: "100vh",
        }}
        ref={ref}
      />


    </div>
  );
}
