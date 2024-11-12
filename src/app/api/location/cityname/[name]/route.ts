import  { sql } from "@/network/db/connection";
import { NextResponse } from "next/server";

type Params = {
    name: string
  }
   
  export async function GET(request: Request, context: { params: Params }) {
    try {
        const q = context.params.name
        const rows = await sql`select
  c.id,
  c.name
from
  cities c
  join states s on c.state_id = s.id
where s.name ILIKE ''|| ${q} ||''`;
        return NextResponse.json({code:true, data:rows});
    } catch (error) {
        console.error(error);
        return NextResponse.json({code:false, error: 'Database error' });
    }
  }