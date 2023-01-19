export interface UserResponse {
  data: Data;
}

export interface Data {
  bio: string;
  city: City;
  color_scheme: string;
  created_at: string;
  date_format: string;
  default_dashboard_range: string;
  display_name: string;
  durations_slice_by: string;
  email: string;
  full_name: string;
  has_premium_features: boolean;
  human_readable_website: string;
  id: string;
  is_email_confirmed: boolean;
  is_email_public: boolean;
  is_hireable: boolean;
  is_onboarding_finished: boolean;
  languages_used_public: boolean;
  last_heartbeat_at: string;
  last_plugin: string;
  last_plugin_name: string;
  last_project: string;
  location: any;
  logged_time_public: boolean;
  modified_at: string;
  needs_payment_method: boolean;
  photo: string;
  photo_public: boolean;
  plan: string;
  profile_url: string;
  profile_url_escaped: string;
  public_email: any;
  public_profile_time_range: string;
  share_all_time_badge: boolean;
  share_last_year_days: boolean;
  show_machine_name_ip: boolean;
  time_format_24hr: boolean;
  time_format_display: string;
  timeout: number;
  timezone: string;
  username: string;
  website: string;
  weekday_start: number;
  writes_only: boolean;
}

export interface City {
  ascii_name: string;
  ascii_state: string;
  country: string;
  country_code: string;
  id: string;
  name: string;
  population: number;
  state: string;
  timezone: string;
  title: string;
}
