async function registerDomain() {
  const script = document.querySelector(
    'script[src="http://localhost:5173/js/script.js"]'
  );

  if (!script) {
    console.error("Script element not found");
    return;
  }
  const dataDomain = script.dataset.domain;
  const dataDomainURL = new URL(dataDomain);
  const dataDomainHost = dataDomainURL.hostname;
  const currentHostname = window.location.hostname;

  if (!dataDomain) {
    console.error("Data domain not found");
    return;
  }

  if (currentHostname !== dataDomainHost) {
    console.error("Domain not allowed");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/dashboard/activate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domain }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    console.log("Domain registered successfully");
  } catch (error) {
    console.error("Error registering domain:", error);
  }
}
