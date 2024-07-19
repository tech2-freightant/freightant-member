import pool from "@/network/db/connection";
import { NextResponse } from "next/server";

type Params = {
    team: string
  }
   
  export async function GET(request: Request, context: { params: Params }) {
    try {
        const q = request.url.split('?');        
        const connection = await pool.getConnection();
        const query = 'SELECT `id`,`name` FROM cities WHERE state_id = ' + q[1];
        const [rows] = await connection.execute(query);
        connection.release();
        return NextResponse.json({code:true, data:rows});
    } catch (error) {
        console.error(error);
        return NextResponse.json({code:false, error: 'Database error' });
    }
  }