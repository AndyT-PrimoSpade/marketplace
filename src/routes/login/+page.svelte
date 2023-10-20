<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import type { Snapshot } from "./$types";
    import 'bootstrap/dist/css/bootstrap.min.css';
    // import 'bootstrap/dist/js/bootstrap.min.js';

    let email = "";
    let password = "";

    export const snapshot: Snapshot = {
        capture: ()=>{
            return {
                email,
                password
            };
        },
        restore: (value)=>{
            //console.log(value);
            console.log("Restore");
            email = value.email;
            password = value.password;

        }
    };

    const login= async()=>{
        const response = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({email,password})
        });
        let resJSON = await response.json();

        if(response.ok){
            //goto("/",{invalidateAll:true});
            
            console.log("After API return");
            invalidateAll();
        }else{
            alert(resJSON.message);
        }
        //console.log(resJSON);
    };

</script>

<main>
    <div class="login-wrapper container">
        <div class="login-form row">
            <form on:submit|preventDefault={login} class="login-box">  
            <img src="companyLogo/smeplefy_log.png" class="login-heading" alt="company logo">    
            <div class="form-group col">
                <div class="input-group">
                    <div class="form-floating mb-3">
                        <input bind:value={email} id="email" type="text" class="form-control" name="email" placeholder="Email Address" autocomplete="off" required>
                        <label for="floatingInput">Email Address</label>
                    </div>
                </div>
            </div>
            <div class="form-group col">
                <div class="input-group">
                    <div class="form-floating mb-3">
                        <input bind:value={password} id="password" type="password" class="form-control" name="Password" placeholder="Password" required>
                        <label for="floatingInput">Password</label>
                    </div>
                </div>
            </div>        
            <div class="form-group">
                <button type="submit" class="btn login-btn btn-primary btn-block ">Sign in</button>
            </div>
            </form>
            <p class="text-center small">Don't have an account? <a href="#">Sign up here!</a></p>
        </div>
    </div>
</main>

<style>
    main {
        background-image: url('bg/login_bg.png');
        background-size: cover;
    }
    .login-form {
        width: 50rem;
        margin: 3rem auto 0;
        font-size: 1rem;  
        height: 30rem;
        border-radius: 25px;
    }
    .login-form form {
        margin-bottom: 1rem;
        background: #f7f7f7;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 2rem;
    }

    .form-control {
        min-height: 38px;
        border-radius: 2px;
        border: none;
        border-bottom: 2px solid #ccc;
        border-radius: 0;
        background: #f7f7f7;
    }
    .login-btn {
        font-size: 1rem;
        font-weight: bold;
    }
    .login-wrapper {
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .login-btn {
        width: 10rem;
        display: block;
        margin: 2rem auto 0;
        border-radius: 25px;
        padding: 10px 20px; 
    }
    .login-box {
        border-radius: 15px;
    }
    .login-heading {
        display: block;
        margin: 0.5rem auto 1.5rem;
        max-width: 40%;
        height: auto;
    }
    .form-group {
        text-align: center;
    }

</style>
