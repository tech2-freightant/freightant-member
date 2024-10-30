import pool from "@/network/db/connection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
      let name:any = await request.nextUrl.searchParams
      let id:any = await request.nextUrl.searchParams
      const connection = await pool.getConnection();
      let query = "";
      if(name.get("name")){
        query = "SELECT DISTINCT `t1`.`id`, `t1`.`Country`, `t1`.`Name`,`t1`.`Location`,`t1`.`Subdivision`,`t2`.`emoji`,`t2`.`currency`, `t2`.`name` AS `countryname`,`t3`.`name` AS `statename`, `t1`.`FullName` FROM `locode` AS `t1` INNER JOIN `countries` AS `t2` ON `t2`.`iso2` = `t1`.`Country` LEFT JOIN `states` AS `t3` ON `t3`.`iso2` = `t1`.`Subdivision` WHERE `t1`.`Location` LIKE '%"+name.get("name")+"%' OR `t1`.`Country` LIKE '%"+name.get("name")+"%' OR `t1`.`Name` LIKE '%"+name.get("name")+"%' OR `t1`.`FullName` LIKE '%"+name.get('name')+"%' GROUP BY `t1`.`id`, `t1`.`Country`, `t1`.`Name`, `t1`.`Location`, `t1`.`Subdivision`, `t2`.`emoji`, `t2`.`currency`, `t2`.`name`, `t1`.`FullName` LIMIT 50";
      }
      if(name.get("id")){
        query = "SELECT DISTINCT `t1`.`id`, `t1`.`Country`, `t1`.`Name`,`t1`.`Location`,`t1`.`Subdivision`,`t2`.`emoji`,`t2`.`currency`, `t2`.`name` AS `countryname`,`t3`.`name` AS `statename`, `t1`.`FullName` FROM `locode` AS `t1` INNER JOIN `countries` AS `t2` ON `t2`.`iso2` = `t1`.`Country` LEFT JOIN `states` AS `t3` ON `t3`.`iso2` = `t1`.`Subdivision` WHERE `t1`.`id` = "+id.get("id");
      }
      const [rows] = await connection.execute(query);
      connection.release();
      return NextResponse.json({code:true, data:rows});
    } catch (error) {
      console.error(error);
      return NextResponse.json({code:false, error: 'Database error' });
    }
  }