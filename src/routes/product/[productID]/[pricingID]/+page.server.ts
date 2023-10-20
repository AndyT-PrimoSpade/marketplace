import type {PageServerLoad} from "./$types";
import {error} from "@sveltejs/kit";

export const load:PageServerLoad = async ({params, fetch, depends})=>{

    console.log("/product[productID, pricingID] load function");    

    const productID = Number(params.productID);
    const pricingID = Number(params.pricingID);

    console.log("productID : ", productID);
    console.log("pricingID : ", pricingID);

    //depends("app:productServerLoad");

    const response = await fetch("/api/product", {
        method: "POST",
        body: JSON.stringify({productID, pricingID})
    });

    if(response.ok){
        return{
            selectedProduct: await response.json()
        };
    }      


    //depends("app:productServerLoad");


    //throw error(response.status, response.statusText);
    const errorJSON = await response.json();
    throw error(response.status, errorJSON.message);

}