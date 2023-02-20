import { AllTimeResponse } from "../@types/allTime";
import { InsightsResponse } from "../@types/insights";
import { LineChartData } from "../@types/lineChart";
import { User } from "../@types/user";
import { LeaderBoardResponse } from "../@types/WakatimeLeaderBoard";
import { LeaderBoardsResponse } from "../@types/wakatimeLeaderBoards";
import { StatsResponse } from "../@types/wakatimeStats";
import { UserResponse } from "../@types/wakatimeUser";
import { getLanguageColor } from "../utils/languageColors";

type Data = StatsResponse["data"]["languages"];

interface Bla {
  name: string;
  percent: number;
  total_seconds: number;
  text: string;
  color: string;
  legendFontColor: string;
}

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

  private allTimeLink = `https://wakatime.com/api/v1/users/current/all_time_since_today?api_key=`;

  private leaderBoardLink =
    "https://wakatime.com/api/v1/users/current/leaderboards/";

  private formatUserResponse(data: UserResponse): User {
    return {
      username: data.data.username,
      photo: data.data.photo,
      country: data.data.city.country,
    };
  }

  private formatLanguage(data: Data) {
    const result = data.reduce((acc, prev) => {
      if (prev.percent >= 1) {
        const data: Bla = {
          name: prev.name,
          percent: prev.percent,
          total_seconds: prev.total_seconds,
          text: prev.text,
          color: getLanguageColor?.[prev.name] || "#2cc",
          legendFontColor: "#7F7F7F",
        };
        acc.push(data);
      }
      return acc;
    }, [] as Bla[]);
    return result;
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
      const data: LeaderBoardData = {
        id: user.id,
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
    const data = this.formatLanguage(json.data.languages);
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

  async getAllTime() {
    const response = await fetch(this.allTimeLink + this.token);
    const json = (await response.json()) as AllTimeResponse;
    console.log("====================================");
    console.log("json all time =>", json);
    console.log("====================================");
    return json.data.text;
  }
}
