"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { EyeIcon, PencilIcon } from "lucide-react"
import { getUserBrowsers } from "@/lib/firebase/utils"

import { useEffect, useState } from "react"
import Link from 'next/link'

import { AlertButton } from "./alertButton"


type user = {
  all_browsers: string[],
  fname:string,
  lname:string

}




export default function BrowserTable() {

  useEffect(()=>{


    populateUserBrowsersTable()
    
  },[])

  async function createNewBrowser(){

    console.log("ran")
  
    let headers = new Headers()
    headers.append("Content-Type","application/json")
  
    let res = await fetch("https://admin.privatebrowser.dev/api/container/create",{
      headers:headers,
      method: "POST",
      body:JSON.stringify({ user_id: "ciSBLV4JHcWw3oBbY5bk" }),
    })
  
    
    populateUserBrowsersTable()
    
  
    console.log(res)
    
  }


  async function removeBrowser(container_id:string){

    console.log("ran")
  
    let headers = new Headers()
    headers.append("Content-Type","application/json")
  
    let res = await fetch("https://admin.privatebrowser.dev/api/container/remove",{
      headers:headers,
      method: "POST",
      body:JSON.stringify({ user_id: "ciSBLV4JHcWw3oBbY5bk",container_id:container_id }),
    })
  
    
    populateUserBrowsersTable()
    
  
    console.log(res)
    
  }
  

  const [browserProfiles,setBrowserProfiles] = useState<any>( [],)
  

  async function populateUserBrowsersTable(){
    let userBrowsers =  await getUserBrowsers("ciSBLV4JHcWw3oBbY5bk")
    console.log(userBrowsers)

    const newBrowserProfiles = userBrowsers.map((browserId) => ({
      name: "chrome",
      view: true,
      status: "Active",
      proxyIp: "-",
      fingerprint: "-",
      id: browserId,
    }));


    setBrowserProfiles([...browserProfiles, ...newBrowserProfiles]);

  }



  return (
    <div className="container mx-auto p-4">

      <h1 className="text-2xl font-bold mb-4">BROWSER</h1>
      <div className="flex justify-between items-center mb-4">
      
      <AlertButton onclick={createNewBrowser} messege={"create new browser"} btnMessege={"new"}/>

        <div className="flex items-center">
          <Input type="search" placeholder="Search" className="mr-2" />
          <Button className="bg-purple-600 text-white">Search</Button>
        </div>
      </div>
      <div className="mb-4">
        <span className="mr-4">Filter:</span>
        <Button variant="outline" className="mr-2">Status</Button>
        <Button variant="outline" className="mr-2">User Agent</Button>
        <Button variant="outline" className="mr-2">Category</Button>
        <Button variant="outline">Proxy</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>View</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Proxy IP</TableHead>
            <TableHead>Fingerprint</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>LinkedIn Email</TableHead>
            <TableHead>FB Email</TableHead>
            <TableHead>Instagram Email</TableHead>
            <TableHead>Twitter Email</TableHead>
            <TableHead>User(s)</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {browserProfiles.map((profile, index) => (
            <TableRow key={index}>
              <TableCell>{profile.name}</TableCell>
              <TableCell>
              
              <Link href={`browser/${profile.id}`}>
              <EyeIcon className="h-4 w-4" />

              </Link>
                
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${profile.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                  {profile.status}
                </span>
              </TableCell>
              <TableCell>{profile.proxyIp}</TableCell>
              <TableCell>{profile.fingerprint}</TableCell>
             
              <TableCell>
                <div className="flex items-center">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  <Switch />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}