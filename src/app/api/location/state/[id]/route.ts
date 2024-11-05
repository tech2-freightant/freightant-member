import { sql } from "@/network/db/connection";
import { NextResponse } from "next/server";

type Params = {
    id: number
  }
   
  export async function GET(request: Request, context: { params: Params }) {
    try {
        const q = context.params?.id 
        const rows = await sql`SELECT id,name FROM states WHERE country_id =  ${q}`;
        
        return NextResponse.json({code:true, data:rows});
    } catch (error) {
        console.error(error);
        return NextResponse.json({code:false, error: 'Database error' });
    }
  }
  export async function POST(request: Request, context: { params: Params }) {
    try {
        const {q} = await request.json();
        const rows = sql`SELECT s.id,s.name FROM countries c
        INNER JOIN states s ON c.id = s.country_id
        WHERE c.name =${q}`
        return NextResponse.json({code:true, data:rows});
    } catch (error) {
        console.error(error);
        return NextResponse.json({code:false, error: 'Database error' });
    }
  }