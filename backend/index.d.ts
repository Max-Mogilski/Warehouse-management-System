export {};

declare global {
	namespace Express {
		export interface Request {
			user: {
				firstName: string;
				userId: string;
			};
			signedCookies: {
				accessToken: string;
				refreshToken: string;
			};
		}
	}
}
