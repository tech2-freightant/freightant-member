import{ sql } from "@/network/db/connection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
      let name:any = await request.nextUrl.searchParams
      let id:any = await request.nextUrl.searchParams
      let str:string = name?.get("name")?name?.get("name") :""
      let query = "";
      if(name.get("name")){
        query = "";
      }
      if(name.get("id")){
        query = "SELECT DISTINCT `t1`.`id`, `t1`.`Country`, `t1`.`Name`,`t1`.`Location`,`t1`.`Subdivision`,`t2`.`emoji`,`t2`.`currency`, `t2`.`name` AS `countryname`,`t3`.`name` AS `statename`, `t1`.`FullName` FROM `locode` AS `t1` INNER JOIN `countries` AS `t2` ON `t2`.`iso2` = `t1`.`Country` LEFT JOIN `states` AS `t3` ON `t3`.`iso2` = `t1`.`Subdivision` WHERE `t1`.`id` = "+id.get("id");
      }
      const res = await sql`
select distinct
  t1.id,
  t1."Country",
  t1."Name",
  t1."Location",
  t1."Subdivision",
  t2.emoji,
  t2.currency,
  t2.name as countryname,
  ${sql`COALESCE(MAX(t3.name), '') AS statename`},
  t1."FullName"
from
  locode as t1
  inner join countries as t2 on t2.iso2 = t1."Country"
  left join states as t3 on t3.iso2 = t1."Subdivision"
where
  t1."Location" ilike ${"%"+str + "%"}
  or t1."Country" ilike ${"%"+str + "%"}
  or t1."Name" ilike ${"%"+str + "%"}
  or t1."FullName" ilike ${"%"+str + "%"}
group by
  t1.id,
  t1."Country",
  t1."Name",
  t1."Location",
  t1."Subdivision",
  t2.emoji,
  t2.currency,
  t2.name,
  t1."FullName"
limit
  50;`
      return NextResponse.json({code:true, data:res});
    } catch (error) {
      console.error(error);
      return NextResponse.json({code:false, error: 'Database error' });
    }
  }