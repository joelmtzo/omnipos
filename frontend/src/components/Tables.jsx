const Tables = ({
  tables,
  selectedTable,
  handleTableClick,
  handleCheckout,
  handleCancel,
  handleSelectedLink,
}) => {
  const tableZones = () => {
    // get unique zones from tables on zoneName property
    const zones = tables.reduce((acc, table) => {
      if (!acc.includes(table.zoneName)) {
        acc.push(table.zoneName);
      }
      return acc;
    }, []);
    return zones;
  };

  const isAvailable = (table) => {
    return table.status === "Available" ? "bg-dark" : "bg-primary";
  };

  return (
    <>
      <div className="col-10">
        <div className="d-flex flex-wrap gap-3">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`card ${isAvailable(table)} text-white flex-grow-1`}
              style={{ minWidth: "14rem", maxWidth: "18rem" }}
              onClick={() => handleTableClick(table)}
            >
              <div className="card-body p-3 m-0">
                <div className="d-flex flex-column text-center">
                  <p>Table # {table.id}</p>
                  <p>{table.zoneName}</p>
                  <p>{table.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-2">
        <div className="d-flex flex-column gap-3 text-center">
          {selectedTable && <p>Selected Table: # {selectedTable}</p>}
          <button 
            disabled={!selectedTable} 
            onClick={() => handleSelectedLink("POS")}
            className="btn py-5 btn-success">
            Order
          </button>
          <button
            disabled={!selectedTable}
            onClick={() => handleCheckout()}
            className="btn py-5 btn-danger"
          >
            Checkout
          </button>
          <button
            disabled={!selectedTable}
            onClick={() => handleCancel()}
            className="btn py-5 btn-warning"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Tables;
