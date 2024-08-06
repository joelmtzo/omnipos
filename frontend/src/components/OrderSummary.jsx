const OrderSummary = ({
  orderItems,
  bill,
  removeFromOrder,
  handleChangeQuantity,
  handlePlaceOrder,
  selectedTable,
}) => {
  return (
    <div>
      <div className="card order-summary">
        <div className="card-header">
          {!selectedTable && (
            <div className="alert alert-info text-center">
              Please select a table to start ordering
            </div>
          )}
          <div className="d-flex justify-content-between text-white">
            <h5 className="card-title">Order Summary</h5>
            <h5>Table # {selectedTable}</h5>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-dark text-center">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qnt.</th>
                <th>Total ($)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderItems &&
                orderItems.map((item) => (
                  <tr
                    className="animate__animated animate__fadeIn"
                    key={item.item.id}
                  >
                    <td className="col-4 align-middle">{item.item.name}</td>
                    <td className="col-2 align-middle">
                      {item.item.price}
                    </td>
                    <td className="col-3 align-middle">
                      <button
                        onClick={() => handleChangeQuantity(item, -1)}
                        className="btn btn-secondary"
                      >
                        -
                      </button>
                      <span className="mx-1">{item.quantity}</span>
                      <button
                        onClick={() => handleChangeQuantity(item, 1)}
                        className="btn btn-secondary"
                      >
                        +
                      </button>
                    </td>
                    <td className="align-middle">
                      <span>
                        {item.item.price * item.quantity}
                      </span>
                    </td>
                    <td className="align-middle">
                      <button className="btn btn-secondary">Note</button>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromOrder(item)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between text-white">
            <span>Sub total: {bill.subtotal}</span>
            <span>Other Charge: 0.00</span>
          </div>
          <div className="d-flex justify-content-between mt-3 text-white">
            <strong>Amount to Pay: {bill.total}</strong>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <button className="btn btn-danger py-3">Cancel</button>
          <button
            onClick={handlePlaceOrder}
            disabled={orderItems.length === 0 || !selectedTable}
            className="btn btn-success py-3"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
