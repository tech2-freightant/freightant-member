import pool, { sql } from "@/network/db/connection";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const connection = await pool.getConnection();
      const query = 'SELECT `id`,`name`,`iso3`,`phonecode`,`currency`,`currency_symbol`,`emoji` FROM countries';
      let res 
      if(process.env.ENV){
        console.log(process.env.ENV);
        res = await sql`SELECT id,name,iso3,phonecode,currency,currency_symbol,emoji FROM countries`
      }else{
        console.log("lp");
        const [rows] = await connection.execute(query);
        connection.release();        
      }
      return NextResponse.json({code:true, data:res});
    } catch (error) {
      console.error(error);
      return NextResponse.json({code:false, error: "Database Error"});
    }
  }
export async function POST(request: Request) {
    try {
      const {name} = await request.json();
      const query = 'SELECT `id`,`name`,`iso3`,`phonecode`,`currency`,`currency_symbol`,`emoji` FROM countries WHERE name='+name;
      let res 
      if(process.env.NODE_ENV){
        console.log("sp");
        res = await sql`${query}`
      }else{
        console.log("lp");
        const connection = await pool.getConnection();
        const [res] = await connection.execute(query);
        connection.release();
        
      }
      return NextResponse.json({code:true, data:res});
    } catch (error) {
      console.error(error);
      return NextResponse.json({code:false, error: 'Database error' });
    }
  }