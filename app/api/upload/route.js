import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import os from "os";
import JSFtp from "jsftp";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const userId = formData.get("user-id");
  const containerId = formData.get("container-id");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Save file temporarily
  const tempDir = os.tmpdir();
  const filePath = path.join(tempDir, file.name);
  await writeFile(filePath, buffer);

  // Configure FTP connection
  const ftp = new JSFtp({
    host: "admin.privatebrowser.dev",
    port: 21,
    user: "ftpuser",
    pass: "testpass",
  });

  // Specify the remote directory path where the file should be uploaded
  const remoteDirectory = `/shared/${userId}`; // Change this to your desired remote directory
  const remoteFilePath = path.posix.join(remoteDirectory, file.name);
  console.log(remoteFilePath);
  // Upload file

  // await new Promise((resolve, reject) => {
  //   ftp.put(filePath, remoteFilePath, (err) => {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       resolve();
  //     }
  //   });
  // });

  await ftp.put(filePath, remoteFilePath, (err) => {
    if (!err) {
      console.log("File transferred successfully!");
    }
  });
  try {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let res = await fetch(`https://admin.privatebrowser.dev/api/container/shared`, {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        user_id: "ciSBLV4JHcWw3oBbY5bk",
        container_id: containerId,
      }),
    });
    return NextResponse.json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("FTP upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
