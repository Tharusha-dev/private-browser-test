"use client"


import {app} from "@/lib/firebase/auth"
import { getFirestore } from "firebase/firestore"
import { doc, getDoc } from "firebase/firestore";


type user = {
  all_browsers: string[],
  fname:string,
  lname:string

}


const db = getFirestore(app);


export async function getUserBrowsers(userId:string){

  let userBrowserIds:string[] = [] 

  const docRef = doc(db, "users",userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    docSnap.data()?.all_browsers.forEach((browserId:string)=>{
      userBrowserIds.push(browserId)
      
    })
  } else {
    console.log("No such document!");
  }
  console.log(userBrowserIds)


  return userBrowserIds

}



