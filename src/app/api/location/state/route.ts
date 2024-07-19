import pool from "@/network/db/connection";
import { NextResponse } from "next/server";

type Params = {
    team: string
  }
   
  export async function GET(request: Request, context: { params: Params }) {
    try {
        const q = request.url.split('?');        
        const connection = await pool.getConnection();
        const query = 'SELECT `id`,`name` FROM states WHERE country_id = ' + q[1];
        const [rows] = await connection.execute(query);
        connection.release();
        return NextResponse.json({code:true, data:rows});
    } catch (error) {
        console.error(error);
        return NextResponse.json({code:false, error: 'Database error' });
    }
  }
  export async function POST(request: Request, context: { params: Params }) {
    try {
        const {q} = await request.json();
        const connection = await pool.getConnection();
        const query = `SELECT s.id,s.name FROM countries c
        INNER JOIN states s ON c.id = s.country_id
        WHERE c.name ="${q}"`;
        const [rows] = await connection.execute(query);
        connection.release();
        return NextResponse.json({code:true, data:rows});
    } catch (error) {
        console.error(error);
        return NextResponse.json({code:false, error: 'Database error' });
    }
  }