export const validateEmail = (value: string): boolean | string => {
  const trimmedValue = value.trim();
  if (
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmedValue) &&
    trimmedValue.length > 0
  ) {
    return true;
  }
  return 'Invalid email format';
};

export const validatePassword = (value: string): boolean | string => {
  const trimmedValue = value.trim();

  if (trimmedValue.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  if (!/[A-Z]/.test(trimmedValue)) {
    return 'Password must contain at least one uppercase letter';
  }

  if (!/[a-z]/.test(trimmedValue)) {
    return 'Password must contain at least one lowercase letter';
  }

  if (!/[0-9]/.test(trimmedValue)) {
    return 'Password must contain at least one digit';
  }

  return true;
};

export const validateFullName = (value: string): boolean | string => {
  const trimmedValue = value.trim();

  const names = trimmedValue.split(' ');
  const firstName = names[0];
  const lastName = names[names.length - 1];

  if (names.length < 2) {
    return 'Please enter your full name including first name and last name';
  }

  if (firstName.length === 0) {
    return 'First name is required';
  }

  if (lastName.length === 0) {
    return 'Last name is required';
  }

  return true;
};

export const validateFilledInput = (value: string): boolean | string => {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    return 'Please enter value';
  }

  return true;
};

export const validatePostCode = (value: string): boolean | string => {
  const trimmedValue = value.trim();

  if (!/^[0-9-]+$/.test(trimmedValue)) {
    return 'Post code can only contain numbers and hyphens';
  }

  return true;
};
