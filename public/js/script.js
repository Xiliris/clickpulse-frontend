import { os, browser, device } from "./utils/browser-info.js";
import fetchLocationInfo from "./utils/location-info.js";

const data = {
  domain: null, // Done
  entry_page: null, // Done
  exit_page: null, // Done
  visited_pages: [], // Done

  ip: null, // Done
  country: null, // Done
  country_code: null, // Done

  os: null, // Done
  browser: null, // Done
  device: null, // Done

  session_duration: null, // Done
  session_start: null, // Done
  session_end: null, // Done
  bounce_rate: false, // Done
};

document.addEventListener("DOMContentLoaded", async () => {
  const locationInfo = await fetchLocationInfo();
  const { protocol, hostname } = window.location;
  const port = window.location.port ? `:${window.location.port}` : "";

  data.domain = `${protocol}//${hostname}${port}`;
  data.entry_page = window.location.pathname;

  data.ip = locationInfo.ip;
  data.country = locationInfo.country;
  data.country_code = locationInfo.country_code;

  data.os = os;
  data.browser = browser;
  data.device = device;

  data.session_start = Date.now();

  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function (...args) {
    originalPushState.apply(window.history, args);
    logPath();
  };

  window.history.replaceState = function (...args) {
    originalReplaceState.apply(window.history, args);
    logPath();
  };

  window.addEventListener("popstate", () => {
    logPath();
  });
});

window.addEventListener("beforeunload", () => {
  data.session_end = Date.now();

  const session_duration = (data.session_end - data.session_start) / 1000;

  if (session_duration < 30) {
    data.bounce_rate = true;
  }

  data.session_duration = session_duration;

  delete data.session_start;
  delete data.session_end;

  data.exit_page = window.location.pathname;

  fetch("http://localhost:8080/dashboard/analytics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
});

const logPath = () => {
  const path = window.location.pathname;

  if (!data.visited_pages.includes(path)) {
    data.visited_pages.push(path);
  }
};
