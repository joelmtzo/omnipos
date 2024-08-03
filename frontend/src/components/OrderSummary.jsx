const OrderSummary = ({
  orderItems,
  bill,
  removeFromOrder,
  handleChangeQuantity,
  handlePlaceOrder,
  selectedTable,
}) => {
  function formatCurrency(value) {
    return "$ " + value.toFixed(2);
  }

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
              </tr>
            </thead>
            <tbody>
              {orderItems &&
                orderItems.map((item) => (
                  <tr key={item.item.id}>
                    <td className="col-4 align-middle">{item.item.name}</td>
                    <td className="col-2 align-middle">
                      {formatCurrency(item.item.price)}
                    </td>
                    <td className="col-3 align-middle">
                      <button
                        onClick={() => handleChangeQuantity(item, -1)}
                        className="btn btn-secondary p-3 mx-3"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleChangeQuantity(item, 1)}
                        className="btn btn-secondary p-3 mx-3"
                      >
                        +
                      </button>
                    </td>
                    <td className="align-middle">
                      <span>
                        {formatCurrency(item.item.price * item.quantity)}
                      </span>
                      <button
                        className="btn btn-danger p-3 mx-3"
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
            <span>Sub total: {formatCurrency(bill.subtotal)}</span>
            <span>Other Charge: 0.00</span>
          </div>
          <div className="d-flex justify-content-between mt-3 text-white">
            <strong>Amount to Pay: {formatCurrency(bill.total)}</strong>
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
