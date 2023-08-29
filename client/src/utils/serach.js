import { formatDate } from "./format";

export const searchPayments = (query, payments) => {
  if (!query) {
    return payments;
  }
  const filteredData = payments.filter(
    (item) =>
      item._id?.toLowerCase().includes(query?.toLowerCase().trim()) ||
      item.client?.name?.toLowerCase().includes(query?.toLowerCase().trim()) ||
      formatDate(item.date).includes(query)
  );
  return filteredData;
};

export const searchClients = (query, clients) => {
  if (!query) {
    return clients;
  }
  const filteredData = clients.filter((client) => {
    return (
      client._id.includes(query.trim()) ||
      client?.name.toLowerCase().includes(query.toLowerCase().trim())
    );
  });
  return filteredData;
};
