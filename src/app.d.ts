// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface Locals {
			user?:{
				UserID:number,
				FirstName: string,
				LastName: string,
				Email: string,
				JobRole:string,
				Phone:string,
				CompanyID:number,
				CompanyName:string,
				CompanyAddress:string,
				ACRA:string,
				Logo: string,
				Industry: string
			}
		}
		
		
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
