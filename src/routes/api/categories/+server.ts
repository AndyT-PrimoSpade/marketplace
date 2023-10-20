import { mysqlconnFn } from "$lib/db/mySQL";
import { DATABASE_HOST, DATABASE_USER, PASSWORD, DATABASE_SCHEMA } from "$env/static/private";

import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";


export const GET:RequestHandler = async ({fetch, locals})=>{

        console.log("In Categories API")
        const mySQLConnection =  await mysqlconnFn(DATABASE_HOST, DATABASE_USER,PASSWORD, DATABASE_SCHEMA);
        if(!mySQLConnection){
            throw error(400, "DB Connection not available!");
        }
    
        console.log("DBConnection is ok");

        const results = await mySQLConnection
            .query(`SELECT CategoryID, MainCategory, SubCategory from categories;`)   
            .then(function ([rows, fields]) {    
                    return rows;
            });
                
        //console.log("results : " , results);

        if(!results){
            throw error(400, "Error Running Categories Query!");
        }
        //const jsonString = JSON.stringify(results)
        //console.log("jsonString : ", jsonString);
        //const jsonObject = JSON.parse(jsonString);

        //console.log("jsonObject : ", jsonObject.length);
        //console.log("json(results) : ", json(results))


        return json(results);
};
