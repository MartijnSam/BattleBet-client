import moment from "moment";

export const apiUrl = process.env.API_URL || "http://localhost:4000";
export const DEFAULT_MESSAGE_TIMEOUT = 3000;

export function formatDate(date) {
  return moment(date).format("HH:MM, MMMM Do YYYY");
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
