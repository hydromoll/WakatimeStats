export interface LeaderBoardsResponse {
  data: Data[];
  page: number;
  total_pages: number;
}

export interface Data {
  can_delete: boolean;
  can_edit: boolean;
  created_at: string;
  has_available_seat: boolean;
  id: string;
  members_count: number;
  members_with_timezones_count: number;
  modified_at: string;
  name: string;
  time_range: string;
}
