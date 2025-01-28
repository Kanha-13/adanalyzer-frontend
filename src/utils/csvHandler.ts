export const convertToCSV = (data) => {
  const header = ["Keyword", "ROAS", "ACOS", "CTR", "Sales"];
  const rows = data.map(row => [
    row.keyword, row.roas?.toFixed(2), row.acos?.toFixed(2), `${row.ctr}%`, `$${row.sales?.toFixed(2)}`
  ]);
  return [header, ...rows].map(row => row.join(",")).join("\n");
};

export const downloadCSV = (csvData, filename = "updated_ad_data.csv") => {
  const blob = new Blob([csvData], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};
