import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

async function registerEmail(email: string): Promise<Response> {
	const CONVERTKIT_FORM_ID = env.CONVERTKIT_FORM_ID;
	const CONVERTKIT_API_KEY = env.CONVERTKIT_API_KEY;
	const CONVERTKIT_API_URL = env.CONVERTKIT_API_URL;

	try {
		const data = { email, api_key: CONVERTKIT_API_KEY };

		const response = await fetch(`${CONVERTKIT_API_URL}forms/${CONVERTKIT_FORM_ID}/subscribe`, {
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST'
		});

		if (response.status >= 400) {
			// Create a new error object to ensure it's an instance of Error
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
