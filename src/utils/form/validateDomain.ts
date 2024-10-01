function validateDomain(domain: string): string | null | undefined {
  if (!domain) return "Domain is required";

  const domainRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;

  if (!domainRegex.test(domain)) {
    return "Invalid domain";
  }

  return null;
}

export default validateDomain;
