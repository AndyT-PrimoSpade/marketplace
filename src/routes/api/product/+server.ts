import { mysqlconnFn } from "$lib/db/mySQL";
import { DATABASE_HOST, DATABASE_USER, PASSWORD, DATABASE_SCHEMA } from "$env/static/private";

import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";


export const POST:RequestHandler= async ({ request })=>{
    //console.log("In Post")
    const data = await request.json();

    const productID = data.productID;
    const pricingID = data.pricingID;

    const mySQLConnection =  await mysqlconnFn(DATABASE_HOST, DATABASE_USER,PASSWORD, DATABASE_SCHEMA);

    if(!mySQLConnection){
        throw error(400, "DB Connection not available!");
    }
    


    console.log("DBConnection is ok");


    const results = await mySQLConnection
        //.query(`SELECT ProductID, CategoryID, BrandName, ProductName, Description, Image FROM products WHERE CategoryID='${categoryID}';`)     
        .query(`SELECT A.ProductID, A.CategoryID, A.BrandName, A.ProductName, A.Description, A.Image, B.PricingID, B.TermLength, B.Price,
        C.MainCategory, C.SubCategory
        FROM products A, productpricing B, categories C
        WHERE A.ProductID = B.ProductID AND A.ProductID='${productID}' AND PricingID = '${pricingID}' 
        AND C.CategoryID = A.CategoryID;`)                
        .then(function ([rows, fields]) {    
            return rows;
        });
  
    if(!results){
        throw error(400, "Error Running Products Query!");
    }        


    //console.log("results : " , results);
    //const jsonString = JSON.stringify(results)
    //console.log("jsonString : ", jsonString);
    //const jsonObject = JSON.parse(jsonString);
    return json(results);

}