import  { sql } from "@/network/db/connection";
import { NextResponse } from "next/server";

type Params = {
    id: number
  }
   
  export async function GET(request: Request, context: { params: Params }) {
    try {
        const q = context.params.id
        const rows = await sql`select id,name from cities where state_id = ${q}`
        return NextResponse.json({code:true, data:rows});
    } catch (error) {
        console.error(error);
        return NextResponse.json({code:false, error: 'Database error' });
    }
  }