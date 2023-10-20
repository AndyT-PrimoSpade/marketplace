<script lang="ts">
	import type { LayoutData } from "./$types";
    import {page} from "$app/stores";
	import { invalidateAll, goto } from "$app/navigation";
	import { redirect } from "@sveltejs/kit";
    
    export let data: LayoutData;
    console.log("In Cart Svelte Page");
    console.log("data : ", data);
    //console.log($page);

    $:carts = data.carts;

    
   
    //const gotoDetails = async (productID)=>{

    //    console.log("productID : " , productID);

        //goto (`/products/${categoryID}`);

    //}


</script>
<main>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-4">
                <div class="sidenav">
                    <div class="d-flex flex-column flex-shrink-0 text-white bg-dark" style="width: 280px;">
                        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
                        <span class="fs-4">Testing Sidebar</span>
                        </a>
                        <hr>
                        <ul class="nav nav-pills flex-column mb-auto">
                        <li class="nav-item">
                            <a href="#" class="nav-link active" aria-current="page">
                            <svg class="bi me-2" width="16" height="16"><use xlink:href="#home"/></svg>
                            Home
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link text-white">
                            <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"/></svg>
                            Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link text-white">
                            <svg class="bi me-2" width="16" height="16"><use xlink:href="#table"/></svg>
                            Orders
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link text-white">
                            <svg class="bi me-2" width="16" height="16"><use xlink:href="#grid"/></svg>
                            Products
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link text-white">
                            <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
                            Customers
                            </a>
                        </li>
                        </ul>
                        <hr>
                        <div class="dropdown">
                        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
                            <strong>mdo</strong>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item" href="#">New project...</a></li>
                            <li><a class="dropdown-item" href="#">Settings</a></li>
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Sign out</a></li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-8">
                <a href="/api/auth/logout">Logout</a>
                <h1>Carts Page</h1>
                <h2>My Name is : {data.user.FirstName} {data.user.LastName}</h2>
                <h2>Email : {data.user.Email}</h2>
                <h2>Role : {data.user.JobRole}</h2>
                <h2>Phone : {data.user.Phone}</h2>
                <h2>Company Name : {data.user.CompanyName}</h2>
                <h2>Industry : {data.user.Industry}</h2>
                <h2>Company Address : {data.user.CompanyAddress}</h2>
                <h2>Company Logo : <img src="{data.user.Logo}" alt="{data.user.CompanyName}" height="100px" /></h2>
                <h2>Carts : {carts.length}</h2>
                <h2>
                    {#if carts && carts.length>0}
                    
                        {#each carts as cart}
                            <h3>OrderID: {cart.OrderID}</h3> 
                            <h3>Total Amount: {cart.TotalAmount}</h3>       
                            
                            {#if cart.OrderItems && cart.OrderItems.length>0}           
                            
                            <h3>
                                OrderItems:
                                <ol>
                                    {#each cart.OrderItems as orderItem}
                                    
                                        <li>
                                        
                                            <p>OrderItemID: {orderItem.OrderItemID}</p>
                                            <p>ProductID: {orderItem.ProductID}</p>     
                                            <p>ProductName: {orderItem.ProductName}</p>
                                            <p><img src="{orderItem.Image}" alt= "{orderItem.ProductName}" height="100px"/></p>
                                            <p>BrandName: {orderItem.BrandName}</p>
                                            <p>Description: {orderItem.Description}</p>
                                                                                           
                                            <p>MainCategory: {orderItem.MainCategory}</p>
                                            <p>SubCategory: {orderItem.SubCategory}</p>
    
                                            <p>Quantity : {orderItem.Quantity}</p>
                                            <p>UnitPrice : {orderItem.UnitPrice}</p>
                                            <p>TermLength : {orderItem.TermLength}</p>

                                        </li>
                                    
                                    {/each}
                                    
                                </ol>
                            
                            </h3>
                            {/if}        
                            
                        {/each}
                    {/if}
                </h2>
            </div>
        </div>
    </div>
</main>



<style>

main {
  display: flex;
  flex-wrap: nowrap;
  height: 100vh;
  height: -webkit-fill-available;
  overflow-x: auto;
  overflow-y: hidden;
}

.bi {
  vertical-align: -.125em;
  pointer-events: none;
  fill: currentColor;
}

.dropdown-toggle { outline: 0; }

</style>
