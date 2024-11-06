import { format } from "date-fns";

export const formatDate = (dateString: string, formatString?: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date string: ${dateString}`);
    }
    return format(date, formatString || "MM-DD-YYYY");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Fallback to original string if formatting fails
  }
};

export const formatMetric = (metric: number, unit: string) => {
  try {
    if (isNaN(metric)) {
      throw new Error(`Invalid metric value: ${metric}`);
    }
    return `${metric} ${unit}`;
  } catch (error) {
    console.error("Error formatting metric:", error);
    return `${metric}`; // Fallback to raw metric if formatting fails
  }
};