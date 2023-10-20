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
<div class="container ">
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
		<div class="col-9">
			<div class="row row-cols-1 row-cols-md-3 g-4 product-grid mt-5 text-center">
				<div class="col">
					<div class="card">
						<img
							src="https://placehold.it/300x300"
							class="card-img-top img-fluid"
							alt="Product Image"
						/>
						<div class="card-body">
							<a href="#" class="card-title">Software</a>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card">
						<img
							src="https://placehold.it/300x300"
							class="card-img-top img-fluid"
							alt="Product Image"
						/>
						<div class="card-body">
							<a href="#" class="card-title">Hardware</a>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card">
						<img src="https://placehold.it/300x300"
							class="card-img-top img-fluid"
							alt="Product Image"
						/>
						<div class="card-body">
							<a href="#" class="card-title">Cyber-Security</a>
						</div>
					</div>
				</div>
			</div>
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

.product-grid {
  margin-top: 1rem;
}

.card {
  margin-bottom: 1rem;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.card-title {
  font-size: 1.25rem;
}
</style>