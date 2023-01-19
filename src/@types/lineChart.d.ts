export interface LineChartData {
  labels: string[];
  datasets: Dataset[];
  legend: string[];
}

export interface Dataset {
  data: number[];
  color?: (opacity: number) => string;
  strokeWidth?: number;
}
