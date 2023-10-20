<script lang="ts">
	import type { LayoutData } from '../product/$types';
	import { page } from '$app/stores';
	import { invalidateAll, goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
	import 'bootstrap/dist/css/bootstrap.min.css';

	export let data: LayoutData;
	console.log('In Products Svelte Page');
	//console.log("data : ", data);
	//console.log($page);

	$: categories = data.categories;
	$: products = data.products;
	let categoryID = '-1';

	//const gotoDetails = async (productID)=>{

	//    console.log("productID : " , productID);

	//goto (`/products/${categoryID}`);

	//}
</script>

<main>
	<div class="container">
		<div class="row mt-5">
			<div class="col-12">
				<h1 class="h1">Product Category</h1>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-3">
				<div class="sidebar">
					<h3 class="sidebar-heading">Company Profile</h3>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">Address: 123 Singapore</li>
						<li class="list-group-item">ACRA</li>
						<li class="list-group-item">Industry</li>
						<li class="list-group-item"><a href="#">Subscription</a></li>
                        <li class="list-group-item"><a href="/api/auth/logout">Logout</a></li>
					</ul>
				</div>
			</div>
			<div class="col-lg-8">
				<a href="/api/auth/logout">Logout</a>
				<h1>Product Page</h1>
				<h2>My Name is : {data.user.FirstName} {data.user.LastName}</h2>
				<h2>Email : {data.user.Email}</h2>
				<h2>Role : {data.user.JobRole}</h2>
				<h2>Phone : {data.user.Phone}</h2>
				<h2>Company Name : {data.user.CompanyName}</h2>
				<h2>Industry : {data.user.Industry}</h2>
				<h2>Company Address : {data.user.CompanyAddress}</h2>
				<h2>
					Company Logo : <img src={data.user.Logo} alt={data.user.CompanyName} height="100px" />
				</h2>
				<h2>products : {products.length}</h2>
				<h2>
					{#if categories && categories.length > 0}
						{#each categories as category}
							<h3>
								<a href={`/products/${category.CategoryID}`}
									>{category.MainCategory}, {category.SubCategory}
								</a>
							</h3>
							<h3>Category: {category.MainCategory}, {category.SubCategory}</h3>
							<h3>CategoryID: {category.CategoryID}</h3>
							{#if products && products.length > 0}
								<h3>
									Products:
									<ol>
										{#each products as product}
											{#if product.CategoryID === category.CategoryID}
												<li>
													<h3>
														<a
															on:click={() => {
																//alert(product.ProductID);
																//alert(document.getElementById(`product_${product.ProductID}_TermPricing`).value);
																if (
																	document.getElementById(
																		`product_${product.ProductID}_TermPricing`
																	)
																) {
																	let pricingID = document.getElementById(
																		`product_${product.ProductID}_TermPricing`
																	).value;
																	goto(`/product/${product.ProductID}/${pricingID}`);
																}
															}}
															href="#">{product.ProductName}</a
														>
													</h3>
													<p>
														<img src={product.Image} alt={product.ProductName} height="100px" />
													</p>
													<p>Brand: {product.BrandName}</p>
													<p>Description: {product.Description}</p>
													<p>ProductID : {product.ProductID}</p>
													<p>CategoryID : {product.CategoryID}</p>

													{#if product.TermPricing && product.TermPricing.length > 0}
														<select id="product_{product.ProductID}_TermPricing">
															{#each product.TermPricing as TermPrice}
																<option value={TermPrice.PricingID}
																	>Term Length: {TermPrice.TermLength} ...Price: {TermPrice.Price}
																</option>
															{/each}
														</select>
													{/if}
												</li>
											{/if}
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
		margin: 0;
		padding: 0;
	}

	a {
		text-decoration: none;
	}

	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		width: 20rem;
		height: 100%;
		background-color: #f7f7f7;
	}

	.sidebar-heading {
		font-size: 1.25rem;
		font-weight: bold;
		padding: 1rem;
	}

	.list-group-item {
		padding: 3rem 1rem;
		font-weight: 600;
		background-color: #f7f7f7;
	}

	.list-group-item a {
		color: #000;
	}

	.list-group-item a:hover {
		color: #007bff;
	}
</style>
