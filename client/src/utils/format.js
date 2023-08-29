export const formatDate = (data) => {
  const date = new Date(data);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export function formatIndianNumber(amount) {
  const formatter = new Intl.NumberFormat("en-IN");
  return formatter.format(amount);
}
