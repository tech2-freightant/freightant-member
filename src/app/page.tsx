"use client"
import Link from "next/link";
import { signOut } from 'next-auth/react';
import { Button } from "antd";

export default function Home() {
  return (
    <div className="col-6 mx-auto text-center py-2 d-flex flex-column gap-2">
      <Link href={"/auth/signin"}>Login</Link>
      <Link href={"/rfq/post"}>RFQ POST</Link>
      <Link href={"/rfq/search"}>RFQ Search</Link>
      <Button onClick={()=>signOut({callbackUrl:"/auth/signin"})} >Log Out</Button>
    </div>
  );
}
