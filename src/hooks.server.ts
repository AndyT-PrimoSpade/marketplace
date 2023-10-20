import type { Handle, HandleFetch, HandleServerError } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export const handle1: Handle = async ({event, resolve})=>{

    //console.log(event.url.pathname, event.isDataRequest);
    //const {url} = event;
    const {locals, cookies, url} = event;

 //   console.log("Hooks is called");
 //   console.log("url.pathname : ", url.pathname);
    
    

    if(!url.pathname.startsWith("/api/auth/login")){
        const session_usr = cookies.get("session_usr");

        //console.log("session_usr 1: ", session_usr);
        if(session_usr){

            const users = JSON.parse(session_usr);

            if(users.length>0){

                locals.user = users[0];   
            }

        }
 
    }

    if(!url.pathname.includes("/login")){

        if(!locals.user){
            //need to redirect to login.
            console.log("redirect to login");

            throw redirect (302,"/login");
        }
    }

    if(url.pathname.endsWith("/")){

        if(locals.user){
            //need to redirect to login.
            console.log("redirect to product");

            throw redirect (302,"/product");
        }
    }

    const response = await resolve(event);
    return response;

}

export const handle = sequence(handle1);