import { InsightsResponse } from "../@types/insights";
import { LineChartData } from "../@types/lineChart";
import { User } from "../@types/user";
import { LeaderBoardResponse } from "../@types/WakatimeLeaderBoard";
import { LeaderBoardsResponse } from "../@types/wakatimeLeaderBoards";
import { StatsResponse } from "../@types/wakatimeStats";
import { UserResponse } from "../@types/wakatimeUser";
import { formatLanguage } from "../utils/languageDataFormatter";

interface LeaderBoardData {
  id: string;
  name: string;
  rank: number;
  avatar: string;
  hours: string;
  dayliAverage: number;
  languages: string[];
}

export class Wakatime {
  token = "";
  constructor(token: string) {
    this.token = token;
  }

  private userLink = `https://wakatime.com/api/v1/users/current/?api_key=`;

  private statsLink = `https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=`;

  private insightsLink = `https://wakatime.com/api/v1/users/current/insights/days/last_7_days?api_key=`;

  private leaderBoardLink =
    "https://wakatime.com/api/v1/users/current/leaderboards/";

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
        legend: ["Coding in 7 days"],
      } as LineChartData
    );
    return fd;
  }

  //TODO: add types

  private formatLeaderBoardResponse(data: LeaderBoardResponse) {
    const result = data.data.reduce((acc, item) => {
      const { user, running_total } = item;
      const { daily_average, languages, human_readable_total } = running_total;
      const { display_name } = user;
      const data = {
        name: display_name,
        rank: item.rank,
        hours: human_readable_total,
        dayliAverage: daily_average,
        avatar: user.photo + "?s=420",
        languages: languages.map((item) => item.name),
      };
      return [...acc, data];
    }, [] as LeaderBoardData[]);
    return result;
  }

  async getUser() {
    const response = await fetch(`${this.userLink + this.token}`);
    const json = (await response.json()) as UserResponse;
    console.log("TOKEN =>", this.token);
    console.log("json", json);
    if ("error" in json) {
      throw new Error("Unauthorized");
    }
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

  async fetchLeaderBoards() {
    try {
      const response = await fetch(
        `https://wakatime.com/api/v1/users/current/leaderboards?api_key=${this.token}`
      );
      const data = (await response.json()) as LeaderBoardsResponse;
      console.log("data =>", data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async fetchLeaderBoardData(id: string) {
    try {
      const response = await fetch(
        `${this.leaderBoardLink}${id}?api_key=${this.token}`
      );
      const data = (await response.json()) as LeaderBoardResponse;
      console.log("LeaderBoardData =>", data);
      const result = this.formatLeaderBoardResponse(data);
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}
