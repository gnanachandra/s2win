import { formatDate } from "./formatDate";

export const searchPayments = (query, payments) => {
    if (!query) {
      return payments;
    }
    const filteredData = payments.filter(
      (item) =>
        item._id?.toLowerCase().includes(query?.toLowerCase()) ||
        item.client?.name?.toLowerCase().includes(query?.toLowerCase()) || formatDate(item.date).includes(query)
    );
    return filteredData;
  };