import { StatsResponse } from "../@types/wakatimeStats";
import { getLanguageColor } from "./languageColors";

type Data = StatsResponse["data"]["languages"];

export const formatLanguage = (data: Data) => {
  const result = data.map((item) => ({
    name: item.name,
    percent: item.percent,
    total_seconds: item.total_seconds,
    text: item.text,
    color: getLanguageColor?.[item.name] || "#2cc",
    legendFontColor: "#7F7F7F",
  }));
  return result;
};
