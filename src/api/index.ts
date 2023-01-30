export { fetchContributors } from "./github";
const getStats7days =
  "https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=";

const currentUserURL = "https://wakatime.com/api/v1/users/current/?api_key=";

const insightsURL =
  "https://wakatime.com/api/v1/users/current/insights/days/last_7_days?api_key=";

export { getStats7days, currentUserURL, insightsURL };
