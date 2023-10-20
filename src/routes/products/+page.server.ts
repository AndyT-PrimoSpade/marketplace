import type {PageServerLoad} from "./$types";
import {error} from "@sveltejs/kit";

export const load:PageServerLoad = async ({fetch, depends, locals})=>{
    console.log("/products load function",locals);    
    const response = await fetch("/api/categories");
    //depends("app:productServerLoad");
    if(response.ok){
        const prodResp = await fetch("/api/products");
        
        if(prodResp.ok){
            return{
                categories: await response.json(),
                products: await prodResp.json()
            };
        }      
    
    }
    //throw error(response.status, response.statusText);
    const errorJSON = await response.json();
    throw error(response.status, errorJSON.message);
};