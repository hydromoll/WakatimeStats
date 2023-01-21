export interface StatsResponse {
  data: Data;
}

export interface Data {
  best_day: BestDay;
  categories: Category[];
  created_at: string;
  daily_average: number;
  daily_average_including_other_language: number;
  days_including_holidays: number;
  days_minus_holidays: number;
  dependencies: Dependency[];
  editors: Editor[];
  end: string;
  holidays: number;
  human_readable_daily_average: string;
  human_readable_daily_average_including_other_language: string;
  human_readable_range: string;
  human_readable_total: string;
  human_readable_total_including_other_language: string;
  id: string;
  is_already_updating: boolean;
  is_coding_activity_visible: boolean;
  is_including_today: boolean;
  is_other_usage_visible: boolean;
  is_stuck: boolean;
  is_up_to_date: boolean;
  is_up_to_date_pending_future: boolean;
  languages: Language[];
  machines: Machine[];
  modified_at: string;
  operating_systems: OperatingSystem[];
  percent_calculated: number;
  projects: Project[];
  range: string;
  start: string;
  status: string;
  timeout: number;
  timezone: string;
  total_seconds: number;
  total_seconds_including_other_language: number;
  user_id: string;
  username: string;
  writes_only: boolean;
}

export interface BestDay {
  created_at: string;
  date: string;
  id: string;
  modified_at: string;
  text: string;
  total_seconds: number;
}

export interface Category {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  name: string;
  percent: number;
  text: string;
  total_seconds: number;
}

export interface Dependency {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  name: string;
  percent: number;
  text: string;
  total_seconds: number;
}

export interface Editor {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  name: string;
  percent: number;
  text: string;
  total_seconds: number;
}

export interface Language {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  name: string;
  percent: number;
  text: string;
  total_seconds: number;
}

export interface Machine {
  decimal: string;
  digital: string;
  hours: number;
  machine_name_id: string;
  minutes: number;
  name: string;
  percent: number;
  text: string;
  total_seconds: number;
}

export interface OperatingSystem {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  name: string;
  percent: number;
  text: string;
  total_seconds: number;
}

export interface Project {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  name: string;
  percent: number;
  text: string;
  total_seconds: number;
}

export interface Languages {
  name: string;
  percent: number;
  total_seconds: number;
  text: string;
  color: string;
  legendFontColor: string;
}
[];
