import type {PageServerLoad} from "./$types";
import {error} from "@sveltejs/kit";

export const load:PageServerLoad = async ({fetch, depends, locals})=>{
    console.log("/cart load function",locals);    
    const response = await fetch("/api/cart");
    //depends("app:productServerLoad");
    if(response.ok){

        return{
            carts: await response.json()
            
        };              
    
    }
    //throw error(response.status, response.statusText);
    const errorJSON = await response.json();
    throw error(response.status, errorJSON.message);
};