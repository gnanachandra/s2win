export const formatDate = (data) => {
    const date = new Date(data);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}