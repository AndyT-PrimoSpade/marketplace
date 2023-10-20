
import { invalidateAll} from "$app/navigation";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

//import {error} from "@sveltejs/kit";

export const load:LayoutServerLoad = ({cookies, locals})=>{
    
    const session_usr = cookies.get("session_usr");
//    console.log("layoutserver");
    

    if(session_usr){
        const user = locals.user;
//        console.log("user : ", user);
        return {
            //user : session? user : null
            user
        };
//        console.log("in loop");
    }
    //console.log("out of loop");
    //const user = {name: "John", id: 1};

    //const user = {USER_ID: 1, USERNAME: "TestName", EMAIL: "test@email.com", 
    //ROLE: "ADMIN", COMPANY_ID: 1, COMPANY_NAME: "testCompany", DESCRIPTION:"",  LOGO:"", INDUSTRY:""};

    //throw error (401, "Not Authorized");
    //const user = locals.user;  

    //goto("/login" , {invalidateAll: true});
    

   //throw redirect(302, "/login");
   //throw redirect(307, "/login");

};