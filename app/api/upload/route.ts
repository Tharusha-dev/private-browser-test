
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import * as ftp from 'basic-ftp';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const userId = formData.get('userId') as string;
  const containerId = formData.get('containerId') as string;

  if (!file || !userId || !containerId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Save file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempPath = `/tmp/${file.name}`;
    await fs.writeFile(tempPath, buffer);

    // Upload file via FTP
    const client = new ftp.Client();
    await client.access({
        host: "admin.privatebrowser.dev",
        user: "ftpuser",
        password: "testpass",
        secure:false
    });

    // await client.ensureDir(`/shared/${userId}`);
    await client.uploadFrom(tempPath, `shared/${userId}/${file.name}`);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let res = await fetch(
      `https://admin.privatebrowser.dev/api/container/shared`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify({
          user_id: "ciSBLV4JHcWw3oBbY5bk",
          container_id: containerId,
        }),
      }
    );
    console.log(res)
    await client.close();

    // Delete temporary file
    await fs.unlink(tempPath);

    return NextResponse.json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}