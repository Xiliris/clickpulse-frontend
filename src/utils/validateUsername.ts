function validateUsername(username: string): string | null {
  if (username.length < 3) {
    return "Username must be at least 3 characters long";
  }
  if (username.length > 20) {
    return "Username must be at most 20 characters long";
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return "Username must contain only letters and numbers";
  }
  if (/^[0-9]/.test(username)) {
    return "Username must not start with a number";
  }
  if (/[^a-zA-Z0-9]/.test(username)) {
    return "Username must not contain special characters";
  }
  if (/admin|user|root/.test(username.toLowerCase())) {
    return "Username must not contain reserved words";
  }

  if (/\s/.test(username)) {
    return "Username must not contain spaces";
  }

  return null;
}

export default validateUsername;
