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
  return res;
};

type Acc = {
  labels: string[];
  datasets: {
    data: number[];
    color: (opacity?: number) => string;
    strokeWidth: number;
  };
  legend: string[];
};

export const insightsFormatter2 = (bla: InsightsResponse): LineChartData => {
  const fd = bla?.data?.days?.reduce(
    (acc: Acc, day) => {
      const { categories } = day;
      // acc['labels'] = acc['labels'] || []
      categories.forEach((category) => {
        if (category.name === "Coding") {
          acc.datasets[0].data.push(+category.total.toFixed(0));
        } else {
          return;
        }
        acc.labels.push(day.date);
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
      legend: ["123"],
    }
  );
  return fd;
};
