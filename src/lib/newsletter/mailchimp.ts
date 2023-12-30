import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import base64 from 'base-64';

async function registerEmail(email: string): Promise<Response> {
	const MAILCHIMP_DC = env.MAILCHIMP_DC;
	const MAILCHIMP_LIST_ID = env.MAILCHIMP_LIST_ID;
	const MAILCHIMP_API_KEY = env.MAILCHIMP_API_KEY;

	try {
		const url = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;
		const password = MAILCHIMP_API_KEY;

		const data = { email_address: email, status: 'subscribed' };

		let headers = new Headers();
		headers.append('Authorization', 'Basic ' + base64.encode('somestring:' + password));

		const response = await fetch(url, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(data)
		});

		// Directly returning the response
		return response;
	} catch (err: any) {  // Using 'any' for err since its structure is not defined here
		console.error(err);
		// Ensure that 'status' and 'title' are available in err before using them
		throw error(err.status || 500, err.title || 'Unknown error');
	}
}

export default registerEmail;
