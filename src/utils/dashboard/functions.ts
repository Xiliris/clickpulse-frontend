
const formatValue = (value: number, type: string): string => {
    if (type === "visit_duration") {
      return formatDuration(value);
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

export { formatValue, formatDate, calculateDate, capitalizeWords, formatPercentage, formatDuration, formatNumber };