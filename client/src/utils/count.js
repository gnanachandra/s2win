const calculateTotals = (clients) => {
    const totalStrength = clients.reduce((total,client)=>{
        return total + client?.totalStrength;
    },0)

    const allClientsAmount = clients.reduce((total,client)=>{
        return total + client?.totalAmount;
    },0)

    const amountPaid = clients.reduce((total,client)=>{
        return total + client?.totalAmountPaid
    },0)

    return {totalStrength,allClientsAmount,amountPaid};
}
export default calculateTotals;