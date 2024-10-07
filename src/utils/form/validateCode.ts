function verifyCode(code: number) {
  if (!code) {
    return "Please fill in all fields";
  }

  if (code.toString().length !== 5) {
    return "Code must be 5 digits long";
  }

  return null;
}

export default verifyCode;
