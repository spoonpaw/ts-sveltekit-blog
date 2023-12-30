import { error } from '@sveltejs/kit';
import registerEmail from '$lib/newsletter';

export const POST = async ({ request }) => {
	try {
		const { email } = await request.json();
		let result = await registerEmail(email);

		return new Response(
            JSON.stringify(result), {
				status: result.status
            }
		);
	} catch (err) {
		console.error(err);
		throw error(400, "couldn't add email to the newsletter");
	}
};
