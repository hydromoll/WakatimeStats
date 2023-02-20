export interface AllTimeResponse {
  data: Data;
}

export interface Data {
  decimal: string;
  digital: string;
  is_up_to_date: boolean;
  percent_calculated: number;
  range: Range;
  text: string;
  timeout: number;
  total_seconds: number;
}

export interface Range {
  end: string;
  end_date: string;
  end_text: string;
  start: string;
  start_date: string;
  start_text: string;
  timezone: string;
}
