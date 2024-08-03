
const KitchenScreen = ({ pendingOrders, orderDetails }) => {
    const calculateElapsedTime = (startOrderDate) => {
      const startDate = new Date(startOrderDate);
      const endDate = new Date();

      const diff = endDate - startDate;
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      return `${hours}h ${minutes % 60}m`;
    };

    const getBgColor = (startOrderDate) => {
      const startDate = new Date(startOrderDate);
      const endDate = new Date();

      const diff = endDate - startDate;
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);

      if (minutes > 30) {
        return "bg-danger text-white";
      } else if (minutes > 15) {
        return "bg-warning text-dark";
      } else {
        return "bg-success text-white";
      }
    };

    return (
      <div className="d-flex flex-wrap gap-3">
        {pendingOrders.map((order) => (
          <div
            className={`card ${getBgColor(order.startOrderDate)} flex-grow-1`}
            style={{ minWidth: "14rem", maxWidth: "18rem" }}
          >
            <div className={`d-flex justify-content-between p-3 m-0`}>
              <span>Table # {order.tableId}</span>
              <span>{calculateElapsedTime(order.startOrderDate)}</span>
            </div>
            <div className="card-body">
              <div className="">
                {orderDetails
                  .filter((od) => od.orderId === order.id)
                  .map((od) => (
                    <div className="d-flex justify-content-between">
                      <span>{od.itemName}</span>
                      <span>{od.quantity}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
}

export default KitchenScreen;