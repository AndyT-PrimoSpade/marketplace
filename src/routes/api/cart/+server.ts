import { mysqlconnFn } from "$lib/db/mySQL";
import { DATABASE_HOST, DATABASE_USER, PASSWORD, DATABASE_SCHEMA } from "$env/static/private";


import type {RequestHandler} from "./$types";
import {error, json} from "@sveltejs/kit";


export const GET:RequestHandler = async ({fetch, locals, cookies})=>{

    console.log("In Cart get request")
    //throw redirect (302,"/login");
    const mySQLConnection =  await mysqlconnFn(DATABASE_HOST, DATABASE_USER,PASSWORD, DATABASE_SCHEMA);

    if(!mySQLConnection){
        throw error(400, "DB Connection not available!");
    }
    
    console.log("DBConnection is ok");
    const user = locals.user;

//    console.log("user?.UserID : ", user?.UserID);
    const results = await mySQLConnection
        .query(`SELECT A.OrderID, A.UserID, A.CompanyID, A.TotalAmount 
            FROM orders A where UserID= '${user?.UserID}';`)
        .then(function ([rows, fields]) {    
            return rows;
        });
                
    if(!results){
        throw error(400, "Error Running Order Query!");
    
    }else{

        if(results.length>0){

            for(let i=0; i<results.length; i++){
                                          
                const orderItemResults = await mySQLConnection
                    .query(`SELECT A.OrderItemID, A.ProductID, A.Quantity, A.UnitPrice, A.TermLength,
                    B.ProductID, B.CategoryID, B.BrandName, B.ProductName, B.Description, B.Image, 
                    C.MainCategory, C.SubCategory 
                    FROM orderitems A, products B, categories C 
                    WHERE A.ProductID = B.ProductID AND  
                    B.CategoryID = C.CategoryID AND A.OrderID = '${results[i].OrderID}';`)
                    .then(function ([rows, fields]) {    
                        return rows;         
                    });               

                if(!orderItemResults){
                    throw error(400, "Error Running Order Item Query!");
                }else{
                    results[i]["OrderItems"]= orderItemResults;
                    
                    console.log("results[i] : ", results[i]); 

                }
                
            
            }
        }
    
    
        console.log("results : ", results);

    }       
    
    

        
    return json(results);
 
}