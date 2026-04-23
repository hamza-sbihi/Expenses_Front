export type Period = "DAY" | "WEEK" | "MONTH" | "YEAR";

export const Periods = {
  DAY: "DAY",
  WEEK: "WEEK",
  MONTH: "MONTH",
  YEAR: "YEAR"
} as const;