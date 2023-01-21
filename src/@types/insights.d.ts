export interface InsightsResponse {
  data: Data;
}

export interface Data {
  created_at: string;
  days: Day[];
  end: string;
  human_readable_range: string;
  is_already_updating: boolean;
  is_including_today: boolean;
  is_stuck: boolean;
  is_up_to_date: boolean;
  is_up_to_date_pending_future: boolean;
  modified_at: string;
  percent_calculated: number;
  range: string;
  start: string;
  status: string;
  timeout: number;
  timezone: string;
  user_id: string;
  writes_only: boolean;
}

export interface Day {
  categories: Category[];
  date: string;
  total: number;
}

export interface Category {
  name: string;
  total: number;
}

export type Insights = {
  labels: string[];
  datasets: {
    data: number[];
    color: (opacity?: number) => string;
    strokeWidth: number;
  };
  legend: string[];
};
