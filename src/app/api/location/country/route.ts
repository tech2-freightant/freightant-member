import pool from "@/network/db/connection";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const connection = await pool.getConnection();
      const query = 'SELECT `id`,`name`,`iso3`,`phonecode`,`currency`,`currency_symbol`,`emoji` FROM countries';
      const [rows] = await connection.execute(query);
      connection.release();
      return NextResponse.json({code:true, data:rows});
    } catch (error) {
      console.error(error);
      return NextResponse.json({code:false, error: 'Database error' });
    }
  }
export async function POST(request: Request) {
    try {
      const {name} = await request.json();
      const connection = await pool.getConnection();
      const query = 'SELECT `id`,`name`,`iso3`,`phonecode`,`currency`,`currency_symbol`,`emoji` FROM countries WHERE name='+name;
      const [rows] = await connection.execute(query);
      connection.release();
      return NextResponse.json({code:true, data:rows});
    } catch (error) {
      console.error(error);
      return NextResponse.json({code:false, error: 'Database error' });
    }
  }