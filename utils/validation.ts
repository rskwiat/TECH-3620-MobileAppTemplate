export const validateForm = (email: string, password: string) => {
  let errors: any = {};

  if (email) {
    errors.email = 'Email is required.';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Email is invalid.';
  }

  // Validate password field
  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  return {
    errors
  }
};
