import type {PageServerLoad} from "./$types";
import {error} from "@sveltejs/kit";

export const load:PageServerLoad = async ({params, fetch, depends})=>{
    console.log("/products[categoryID] load function");    

    const categoryID = Number(params.categoryID);
    console.log("categoryID : ", categoryID);

    const response = await fetch("/api/categories");
    //depends("app:productServerLoad");
    
    if(response.ok){
        
        const categories= await response.json();
        
        const selectedCategory = categories.find((category)=> category.CategoryID === categoryID);
        //console.log("categoryID",typeof(categoryID));
        //console.log("categoryID",categoryID);
        //console.log("selectedCategory",selectedCategory);


        const prodResp = await fetch("/api/products", {
            method: "POST",
            body: JSON.stringify({categoryID})
        });

        if(prodResp.ok){
            return{
                categoryID,
                selectedCategory,
                categories,
                products: await prodResp.json()
            };
        }      
        
   
    }
    
  
    //depends("app:productServerLoad");
    

    //throw error(response.status, response.statusText);
    const errorJSON = await response.json();
    throw error(response.status, errorJSON.message);


};