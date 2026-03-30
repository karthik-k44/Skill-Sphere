const FormatDate = (dateInput?: string | Date) => {
  if (!dateInput) return "N/A";
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

const GetDurationInMonths = (start?: string | Date, end?: string | Date) => {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return 0;
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  return Math.max(months, 0);
};

const FormatDuration = (months: number) => {
  if (months <= 0) return "0m";
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years > 0 && remainingMonths > 0) return `${years}y ${remainingMonths}m`;
  if (years > 0) return `${years}y`;
  return `${remainingMonths}m`;
};

const GetRating = (rating?: string) => {
  const parsed = Number.parseInt(rating || "0", 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.max(0, Math.min(parsed, 5));
};

export {
  FormatDate,
  GetDurationInMonths,
  FormatDuration,
  GetRating
}