const formatValue = (value: number, type: string): string => {
  if (type === "visit_duration") {
    return formatDuration(value);
  } else if (type === "bounce_rate") {
    return formatPercentage(value);
  }
  return formatNumber(value);
};

const formatRoundedValue = (value: number, type: string): string => {
  if (type === "visit_duration") {
    return roundDuration(value);
  } else if (type === "bounce_rate") {
    return formatPercentage(value);
  }
  return formatNumber(value);
};
function formatDate(data: any) {
  return data.map((item: any) => {
    const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    return {
      ...item,
      date: formattedDate,
    };
  });
}

function calculateDate(pastDays: number) {
  const currentDate = new Date();
  const targetDate = new Date(currentDate);
  targetDate.setDate(currentDate.getDate() - pastDays + 1);

  return {
    targetDate: currentDate.toISOString().slice(0, 10),
    currentDate: targetDate.toISOString().slice(0, 10),
  };
}

function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
function formatPercentage(percentage: number) {
  return `${percentage}%`;
}

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let formattedDuration = "";

  if (hours > 0) {
    formattedDuration += `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    formattedDuration += `${minutes}m ${remainingSeconds}s`;
  } else {
    formattedDuration += `${remainingSeconds}s`;
  }

  return formattedDuration.trim();
}

function roundDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let formattedDuration = "";

  if (hours > 0) {
    formattedDuration += `${hours}h`;
  } else if (minutes > 0) {
    formattedDuration += `${minutes}m`;
  } else {
    formattedDuration += `${remainingSeconds}s`;
  }

  return formattedDuration.trim();
}

function formatNumber(num: number): string {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(1).replace(/\.0$/, "") + "tril";
  } else if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "bil";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "mil";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  } else {
    return num.toString();
  }
}

function getBrowserLogo(browser: string) {
  switch (browser.toLowerCase()) {
    case "chrome":
      return "https://simpleicons.org/icons/googlechrome.svg";
    case "firefox":
      return "https://simpleicons.org/icons/firefox.svg";
    case "safari":
      return "https://simpleicons.org/icons/safari.svg";
    case "edge":
      return "https://simpleicons.org/icons/microsoftedge.svg";
    case "internet explorer":
      return "https://simpleicons.org/icons/internetexplorer.svg";
    case "opera":
      return "https://simpleicons.org/icons/opera.svg";
    case "brave":
      return "https://simpleicons.org/icons/brave.svg";
    case "vivaldi":
      return "https://simpleicons.org/icons/vivaldi.svg";
    case "duckduckgo":
      return "https://simpleicons.org/icons/duckduckgo.svg";
    case "konqueror":
      return "https://simpleicons.org/icons/konqueror.svg";
    case "lynx":
      return "https://simpleicons.org/icons/lynx.svg";
    case "puffin":
      return "https://simpleicons.org/icons/puffin.svg";
    case "maxthon":
      return "https://simpleicons.org/icons/maxthon.svg";
    case "waterfox":
      return "https://simpleicons.org/icons/waterfox.svg";
    case "seamonkey":
      return "https://simpleicons.org/icons/seamonkey.svg";
    case "yandex":
      return "https://simpleicons.org/icons/yandexbrowser.svg";
    case "avant":
      return "https://simpleicons.org/icons/avant.svg";
    case "rockmelt":
      return "https://simpleicons.org/icons/rockmelt.svg";
    case "slack":
      return "https://simpleicons.org/icons/slack.svg";
    case "chrome mobile":
      return "https://simpleicons.org/icons/googlechrome.svg";
    case "safari mobile":
      return "https://simpleicons.org/icons/safari.svg";
    default:
      return "https://simpleicons.org/icons/globe.svg";
  }
}

// Example usage:
const browserName = "Chrome";
const logoUrl = getBrowserLogo(browserName);
console.log(`Logo URL for ${browserName}: ${logoUrl}`);

function calculateLogoType(type: any, logo: string) {
  switch (type.toLowerCase()) {
    case "os":
      return "";

    case "browser":
      return "";

    case "device":
      return "";

    case "source":
      return `https://www.google.com/s2/favicons?domain=${logo}&sz=32`;

    default:
      return null;
  }
}

export {
  formatValue,
  formatDate,
  calculateDate,
  capitalizeWords,
  formatPercentage,
  formatRoundedValue,
  formatDuration,
  roundDuration,
  formatNumber,
  getBrowserLogo,
  calculateLogoType,
};
