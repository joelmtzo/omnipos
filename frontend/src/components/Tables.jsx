const Tables = ({
  tables,
  selectedTable,
  handleTableClick,
  handleCheckout,
  handleCancel,
  handleSelectedLink,
}) => {
  const isAvailable = (table) => {
    return table.status === "Available" ? "bg-dark" : "bg-primary";
  };

  return (
    <>
      <div className="col-xs-12 col-sm-8 col-md-10 col-lg-10 animate__animated animate__fadeIn">
        <div className="d-flex flex-wrap gap-3">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`card 
                ${isAvailable(table)} 
                ${
                  selectedTable === table.id
                    ? "border border-1 border-warning"
                    : ""
                }
                text-white flex-grow-1`}
              style={{ minWidth: "14rem", maxWidth: "18rem" }}
              onClick={() => handleTableClick(table)}
            >
              <div className="card-body">
                <div className="d-flex flex-column text-center py-4">
                  <span>Table # {table.number}</span>
                  <span>{table.zone.name}</span>
                  <span>{table.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-xs-12 col-sm-4 col-md-2 col-lg-2">
        <div className="d-flex flex-column gap-3 text-center">
          {selectedTable && <p>Selected Table: # {selectedTable}</p>}
          <button
            disabled={!selectedTable}
            onClick={() => handleSelectedLink("POS")}
            className="btn py-4 btn-success"
          >
            Order
          </button>
          <button
            disabled={!selectedTable}
            onClick={() => handleCheckout()}
            className="btn py-4 btn-danger"
          >
            Checkout
          </button>
          <button
            disabled={!selectedTable}
            onClick={() => handleCancel()}
            className="btn py-4 btn-warning"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Tables;
