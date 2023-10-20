<script lang="ts">
	import type { LayoutData } from "../product/$types";
    import {page} from "$app/stores";
	import { invalidateAll, goto } from "$app/navigation";
	import { redirect } from "@sveltejs/kit";

    export let data: LayoutData;
    console.log("In Product[categoryID] Svelte Page");
    //console.log("data : ", data);
    //console.log($page);

    $:categories = data.categories;
    $:products = data.products;
    $:user = data.user;
    $:selectedCategory = data.selectedCategory;        
    //console.log("data.categoryID: ", data.categoryID);
    //let categoryID = String(data.categoryID);
    
    
    /*
    const changeCategory = async ()=>{
    
        console.log("categoryID : " , categoryID);

        goto (`/products/${categoryID}`);

    
    }
    */
</script>



<a href="/api/auth/logout">Logout</a>
<h2>In Products[categoryID]</h2>


<h1>Product Page</h1>
<h2>My Name is : {user.FirstName} {user.LastName}</h2>
<h2>Email : {user.Email}</h2>
<h2>Role : {user.JobRole}</h2>
<h2>Phone : {user.Phone}</h2>
<h2>Company Name : {user.CompanyName}</h2>
<h2>Industry : {user.Industry}</h2>
<h2>Company Address : {user.CompanyAddress}</h2>
<h2>Company Logo : <img src="{user.Logo}" alt="{user.CompanyName}" height="100px" /></h2>
<h2>
    {#if selectedCategory}
    Category: {selectedCategory.MainCategory}, {selectedCategory.SubCategory}
    
    {/if}

    <a href="\products">All Categories</a>
</h2>
{#if products && products.length>0}
<h2>products : {products.length}</h2>
<h3>
    Products:
    <ol>
        {#each products as product}
        
        <li>
            
            <h3>{product.ProductName}</h3>
            <p><img src="{product.Image}" alt="{product.ProductName}" height="100px"/></p>
            <p>{product.BrandName}</p>
            <p>{product.Description}</p>
            
            <p>ProductID : {product.ProductID}</p>
            <p>CategoryID : {product.CategoryID}</p>
            {#if product.TermPricing && product.TermPricing.length>0} 
            <select> 
                {#each product.TermPricing as TermPrice}
            
               
            <option value= "{TermPrice.PricingID}">Term Length: {TermPrice.TermLength} ...Price: {TermPrice.Price} </option>
            
                {/each}
            </select>    
            {/if}           
            
        </li>
        
        {/each}
    </ol>

</h3>
{/if}