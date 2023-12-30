import { config } from '$lib/config';
import buttondown from './buttondown';
import convertkit from './convertkit';
import emailoctopus from './emailoctopus';
import klaviyo from './klaviyo';
import mailchimp from './mailchimp';
import revue from './revue';

// Define the return type as a union of Promise<Response>, Promise<any>, or undefined
const registerEmail = (email: string): Promise<Response> | Promise<any> | undefined => {
	// Skip if no newsletter provider is selected
	if (!config.newsletter) return;

	switch (config.newsletter.provider) {
		case 'mailchimp':
			return mailchimp(email);
		case 'emailoctopus':
			return emailoctopus(email);
		case 'buttondown':
			return buttondown(email);
		case 'convertkit':
			return convertkit(email);
		case 'klaviyo':
			return klaviyo(email);
		case 'revue':
			return revue(email);
		default:
			return;
	}
};

export default registerEmail;
