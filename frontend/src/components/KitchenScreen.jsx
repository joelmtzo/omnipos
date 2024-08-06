const KitchenScreen = ({ pendingOrders, orderDetails }) => {
  const calculateElapsedTime = (createdAt) => {
    // Convertir la cadena a un objeto Date
    const createdAtDate = new Date(createdAt);

    // Obtener la fecha y hora actual
    const now = new Date();

    // Calcular la diferencia en milisegundos
    const differenceInMs = now - createdAtDate;

    // Convertir la diferencia a días, horas, minutos y segundos
    const differenceInSeconds = Math.floor(differenceInMs / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    const hours = differenceInHours % 24;
    const minutes = differenceInMinutes % 60;
    const seconds = differenceInSeconds % 60;

    return `${hours}h ${minutes % 60}m`;
  };

  const getBgColor = (createdAt) => {
    const startDate = new Date(createdAt);
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
    <div className="d-flex flex-wrap gap-3  animate__animated animate__fadeIn">
      {pendingOrders.length === 0 && (
        <div className="alert alert-success w-100 p-5 fs-3 text-center">
          No pending orders
        </div>
      )}
      {pendingOrders.map((order) => (
        <div
          className={`card ${getBgColor(order.created_at)} flex-grow-1`}
          style={{ minWidth: "14rem", maxWidth: "18rem" }}
        >
          <div className={`d-flex justify-content-between p-3 m-0`}>
            <span>Table # {order.table_id}</span>
            <span>{calculateElapsedTime(order.created_at)}</span>
          </div>
          <div className="card-body">
            <div className="">
              {orderDetails
                .filter((od) => od.order_id === order.id)
                .map((od) => (
                  <div className="d-flex justify-content-between">
                    <span>{od.item_name}</span>
                    <span>{od.quantity}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KitchenScreen;
