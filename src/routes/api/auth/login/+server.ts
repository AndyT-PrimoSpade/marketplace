
import { mysqlconnFn } from "$lib/db/mySQL";
import { DATABASE_HOST, DATABASE_USER, PASSWORD, DATABASE_SCHEMA } from "$env/static/private";


import type {RequestHandler} from "./$types";
import {error, json} from "@sveltejs/kit";

export const POST:RequestHandler= async ({ request, cookies, locals })=>{
    //console.log("In Post")
    const data = await request.json();

    if(!data.email){
        throw error(400, "Username is required!");
    }

    if(!data.password){
        throw error(400, "Password is required!");
    }


//    try{
        const mySQLConnection =  await mysqlconnFn(DATABASE_HOST, DATABASE_USER,PASSWORD, DATABASE_SCHEMA);

        if(!mySQLConnection){
            throw error(400, "DB Connection not available!");
        }
    


        console.log("DBConnection is ok");


        const results = await mySQLConnection
            //.query(`SELECT A.USER_ID, A.NAME AS USERNAME, A.EMAIL, A.ROLE, B.COMPANY_ID, B.NAME AS COMPANY_NAME, B.DESCRIPTION, B.LOGO, B.INDUSTRY
            //    FROM USER A, COMPANY B WHERE UPPER(A.EMAIL) = UPPER('${data.email}') AND 
            //    A.PASSWORD= '${data.password}' AND A.COMPANY_ID = B.COMPANY_ID;`)    
            .query(`SELECT A.UserID, A.FirstName, A.LastName, A.Email, A.JobRole, B.CompanyID, B.CompanyName, 
            B.CompanyAddress, B.ACRA, B.Phone, B.Industry, B.Logo, B.JoinDate
            FROM USERS A, COMPANIES B WHERE UPPER(A.Email) = UPPER('${data.email}') AND 
            A.PasswordHash= '${data.password}' AND A.CompanyID = B.CompanyID;`)
            .then(function ([rows, fields]) {    
                    return rows;
            });
                
        console.log("results : " , results);
        const jsonString = JSON.stringify(results)
        console.log("jsonString : ", jsonString);
        const jsonObject = JSON.parse(jsonString);
       

        //console.log("jsonObject : ", jsonObject.length);
        if(jsonObject.length>0){

            //cookies.set("session_id", jsonObject[0].USER_ID , {
            cookies.set("session_usr", jsonString, {
                path: "/",
                secure: true
            }); 
    


        }else{

            console.log("Throw error");
            throw error(400, "Password/Email is Not Correct!");
                   
        }    
        
        return json(results);
        


//    } catch (error) {
//        console.log("Error in error");
//        return error;

    
//    }



}