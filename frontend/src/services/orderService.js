import dataService from "./dataService";

function createOrder(order) {
    return dataService.post("orders", order);
}

function getPendingOrders() {
    return dataService.get("orders/status/pending");
}

function checkout(tableId) {
    return dataService.get("orders/checkout/" + tableId);
}

function cancelOrderForTable(tableId) {
    return dataService.get("orders/cancel/" + tableId);
}

export default { createOrder, getPendingOrders, checkout, cancelOrderForTable };