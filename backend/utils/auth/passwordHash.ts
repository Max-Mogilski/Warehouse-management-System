import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

export const comparePassword = async (
	canditatePassword: string,
	password: string
) => {
	const isMatch = await bcrypt.compare(canditatePassword, password);
	return isMatch;
};
