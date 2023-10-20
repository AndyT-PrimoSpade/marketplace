<script lang="ts">
	import type { LayoutData } from "../product/$types";
    import {page} from "$app/stores";
	import { invalidateAll, goto } from "$app/navigation";
	import { redirect } from "@sveltejs/kit";

    export let data: LayoutData;
    console.log("In Product[productID, pricingID] Svelte Page");
    console.log("data : ", data);


    //$:categories = data.categories;
    $:product = data.selectedProduct[0];
    $:user = data.user;
    //$:selectedCategory = data.selectedCategory;        
    //console.log("data.categoryID: ", data.categoryID);

</script>




<h2>In Product[productID, pricingID]</h2>


<h1>Product Page</h1>
<h2>My Name is : {user.FirstName} {user.LastName}</h2>
<h2>Email : {user.Email}</h2>
<h2>Role : {user.JobRole}</h2>
<h2>Phone : {user.Phone}</h2>
<h2>Company Name : {user.CompanyName}</h2>
<h2>Industry : {user.Industry}</h2>
<h2>Company Address : {user.CompanyAddress}</h2>
<h2>Company Logo : <img src="{user.Logo}" alt="{user.CompanyName}" height="100px" /></h2>

{#if product}

<h2>
    Category: {product.MainCategory}, {product.SubCategory}
    <a href="\products">All Categories</a>
</h2>

<h3>
    Product:
            
            <h3>{product.ProductName}</h3>
            <p><img src="{product.Image}" alt="{product.ProductName}" height="100px"/></p>
            <p>{product.BrandName}</p>
            <p>{product.Description}</p>
            
            <p>Price : {product.Price}</p>
            <p>Term Length : {product.TermLength}</p>
            <p>ProductID : {product.ProductID}</p>
            <p>CategoryID : {product.CategoryID}</p>
            <p>PricingID : {product.PricingID}</p>
            
</h3>
{/if}