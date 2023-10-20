import { mysqlconnFn } from "$lib/db/mySQL";
import { DATABASE_HOST, DATABASE_USER, PASSWORD, DATABASE_SCHEMA } from "$env/static/private";

import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";


export const GET:RequestHandler = async ({fetch, locals})=>{

        console.log("In Products API")
        const mySQLConnection =  await mysqlconnFn(DATABASE_HOST, DATABASE_USER,PASSWORD, DATABASE_SCHEMA);
        if(!mySQLConnection){
            throw error(400, "DB Connection not available!");
        }
    
        console.log("DBConnection is ok");

        const results = await mySQLConnection
            .query(`SELECT ProductID, CategoryID, BrandName, ProductName, Description, Image FROM products;`)   
            //.query(`SELECT A.ProductID, A.CategoryID, A.BrandName, A.ProductName, A.Description, A.Image, B.PricingID, B.TermLength, B.Price
            //FROM products A, productpricing B 
            //WHERE A.ProductID = B.ProductID;`)               
            .then(function ([rows, fields]) {    
                    return rows;
            });
                
        //console.log("results : " , json(results));

        if(!results){
            throw error(400, "Error Running Products Query!");
        }

        for(let i=0; i<results.length; i++){
            //console.log("results[i].ProductID : ", results[i].ProductID);
            
            const prodPricingResults = await mySQLConnection
            .query(`SELECT PricingID, TermLength, Price 
            FROM productpricing 
            WHERE ProductID = ${results[i].ProductID};`)   
            .then(function ([rows, fields]) {    
                    return rows;
            });   
            
            //console.log("prodPricingResults : ", prodPricingResults);
            results[i]["TermPricing"] = prodPricingResults;
            //console.log("results[i] : ", results[i]);
            //prodPricingResults
        
        
        }
        //console.log("results : ", results);
        
        //console.log("results[0] : ", results[0]);
        //const jsonString = JSON.stringify(results)
        //console.log("jsonString : ", jsonString);
        //const jsonObject = JSON.parse(jsonString);

        //console.log("jsonObject : ", jsonObject[0]);
        //console.log("json(results) : ", json(results))
        return json(results);
};



export const POST:RequestHandler= async ({ request })=>{
    //console.log("In Post")
    const data = await request.json();

    const categoryID = data.categoryID;

    const mySQLConnection =  await mysqlconnFn(DATABASE_HOST, DATABASE_USER,PASSWORD, DATABASE_SCHEMA);

    if(!mySQLConnection){
        throw error(400, "DB Connection not available!");
    }
    


    console.log("DBConnection is ok");


    const results = await mySQLConnection
        .query(`SELECT ProductID, CategoryID, BrandName, ProductName, Description, Image FROM products WHERE CategoryID='${categoryID}';`)     
        //.query(`SELECT A.ProductID, A.CategoryID, A.BrandName, A.ProductName, A.Description, A.Image, B.PricingID, B.TermLength, B.Price
        //FROM products A, productpricing B 
        //WHERE A.ProductID = B.ProductID AND CategoryID='${categoryID}';`)                
        .then(function ([rows, fields]) {    
            return rows;
        });
  
    if(!results){
        throw error(400, "Error Running Products Query!");
    }        


    for(let i=0; i<results.length; i++){
        //console.log("results[i].ProductID : ", results[i].ProductID);
        
        const prodPricingResults = await mySQLConnection
        .query(`SELECT PricingID, TermLength, Price 
        FROM productpricing 
        WHERE ProductID = ${results[i].ProductID};`)   
        .then(function ([rows, fields]) {    
                return rows;
        });   
        
        //console.log("prodPricingResults : ", prodPricingResults);
        results[i]["TermPricing"] = prodPricingResults;
        //console.log("results[i] : ", results[i]);
        //prodPricingResults
    
    
    }




        
    return json(results);

}