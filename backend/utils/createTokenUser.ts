export const createTokenUser = (user: any) => {
	return { firstName: user.firstName, userId: user.id };
};
