import { InsightsResponse } from "../@types/insights";
import { LineChartData } from "../@types/lineChart";
import { User } from "../@types/user";
import { StatsResponse } from "../@types/wakatimeStats";
import { UserResponse } from "../@types/wakatimeUser";
import { formatLanguage } from "../utils/languageDataFormatter";

export class Wakatime {
  token = "";
  constructor(token: string) {
    this.token = token;
  }

  userLink = `https://wakatime.com/api/v1/users/current/?api_key=`;

  statsLink = `https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=`;

  insightsLink = `https://wakatime.com/api/v1/users/current/insights/days/last_7_days?api_key=`;

  private formatUserResponse(data: UserResponse): User {
    return {
      username: data.data.username,
      photo: data.data.photo,
      country: data.data.city.country,
    };
  }

  // private formatStatsResponse(data: Response) {}
  //TODO: add types
  // This function formats the data from the API call into a format that can be used by the chart.

  private formatInsightsResponse(data: InsightsResponse): LineChartData {
    const fd = data.data.days.reduce(
      (acc, day) => {
        const { categories } = day;
        // acc['labels'] = acc['labels'] || []
        categories.forEach((category) => {
          if (category.name === "Coding") {
            acc.datasets[0].data?.push(+category.total.toFixed(0));
          } else {
            return;
          }
          acc.labels.push(day.date.slice(5).replace("-", "."));
        });
        return acc;
      },
      {
        labels: [],
        datasets: [
          {
            data: [],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 8, // optional
          },
        ],
        legend: ["Coding"],
      } as LineChartData
    );
    return fd;
  }

  async getUser() {
    const response = await fetch(`${this.userLink + this.token}`);
    const json = (await response.json()) as UserResponse;
    console.log("TOKEN =>", this.token);
    console.log("json", json);
    const data = this.formatUserResponse(json);
    return data;
  }

  async getStats() {
    const response = await fetch(this.statsLink + this.token);
    const json = (await response.json()) as StatsResponse;
    const data = formatLanguage(json.data.languages);
    return data;
  }

  async getInsights() {
    const response = await fetch(this.insightsLink + this.token);
    const json = (await response.json()) as InsightsResponse;
    const data = this.formatInsightsResponse(json);
    return data;
  }
}
