import { InsightsResponse } from "../@types/insights";
import { LineChartData } from "../@types/lineChart";

export const insightsFormatter = (bla: InsightsResponse): LineChartData => {
  const res = bla.data.days.map(({ categories }) => ({
    labels: bla.data.days.map(({ date }) => date),
    datasets: bla.data.days.map(({ categories }) => ({
      data: categories.map(({ total }) => total),
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2,
      legend: ["123"],
    })),
  }));
  // return res;
};
