import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// Assuming `email` is a string. Adjust if the type is different.
async function registerEmail(email: string): Promise<Response> {
	const EMAILOCTOPUS_API_URL = env.EMAILOCTOPUS_API_URL;
	const EMAILOCTOPUS_API_KEY = env.EMAILOCTOPUS_API_KEY;
	const EMAILOCTOPUS_LIST_ID = env.EMAILOCTOPUS_LIST_ID;

	try {
		const data = { email_address: email, api_key: EMAILOCTOPUS_API_KEY };

		const API_ROUTE = `${EMAILOCTOPUS_API_URL}lists/${EMAILOCTOPUS_LIST_ID}/contacts`;

		const response = await fetch(API_ROUTE, {
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST'
		});

		if (response.status >= 400) {
			throw new Error(`Error: ${response.status}`);
		} else {
			return new Response(JSON.stringify({ message: 'Email added to the newsletter' }), {
				status: 200
			});
		}
	} catch (err) {
		console.error(err);
		// Check if 'err' is an instance of Error to access the message property
		const message = err instanceof Error ? err.message : "Unknown error";
		throw error(400, message);
	}
}

export default registerEmail;
