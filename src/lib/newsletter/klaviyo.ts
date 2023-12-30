import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

async function registerEmail(email: string): Promise<Response> {
	const KLAVIYO_API_KEY = env.KLAVIYO_API_KEY;
	const KLAVIYO_LIST_ID = env.KLAVIYO_LIST_ID;

	try {
		const response = await fetch(
			`https://a.klaviyo.com/api/v2/list/${KLAVIYO_LIST_ID}/subscribe?api_key=${KLAVIYO_API_KEY}`,
			{
				method: 'POST',
				headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
				body: JSON.stringify({ profiles: [{ email: email }] })
			}
		);

		if (response.status >= 400) {
			throw error(400, "couldn't add email to the newsletter");
		} else {
			return new Response(JSON.stringify({ message: 'Email added to the newsletter' }), {
				status: 200
			});
		}
	} catch (err) {
		// Assuming `err` is of type `Error`
		console.error(err);
		// 'status' and 'title' might not be properties of `Error` object. You might need to adjust this.
		throw error((err as any).status, (err as any).title);
	}
}

export default registerEmail;
