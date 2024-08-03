import MenuItems from "./components/MenuItems";
import OrderSummary from "./components/OrderSummary";
import NavBar from "./components/NavBar";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import itemService from "./services/itemService";
import categoryService from "./services/categoryService";
import orderService from "./services/orderService";
import tableService from "./services/tableService";
import Tables from "./components/Tables";
import KitchenScreen from "./components/KitchenScreen";
import Swal from "sweetalert2";

function App() {
  // Menu Screen states
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);

  // Order Summary Screen states
  const [orderItems, setOrderItems] = useState([]);
  const [bill, setBill] = useState({
    subtotal: 0,
    total: 0,
  });

  // Kitchen Screen states
  const [pendingOrders, setPendingOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  // Tables Screen states
  const [selectedTable, setSelectedTable] = useState(null);
  const [tables, setTables] = useState([]);

  const [selectedLink, setSelectedLink] = useState("Tables");

  const loadInitialData = () => {
    setSelectedTable(null);
    setOrderItems([]);

    // Load initial data for items
    itemService.getAll().then((data) => {
      setItems(data.filter((item) => item.id < 10));
    });

    // Load initial data for categories
    categoryService.getAll().then((data) => {
      setCategories(data);
    });

    // Load initial data for pending orders
    orderService.getPendingOrders().then((data) => {
      const { pendingOrders } = data;
      const { orderDetails } = data;

      setPendingOrders(pendingOrders);
      setOrderDetails(orderDetails);
    });

    // Load initial data for tables
    tableService.getAll().then((data) => {
      setTables(data);
    });
  }

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleCategoryClick = (id) => {
    // Load items by category
    itemService.getAllByCategory(id).then((data) => {
      setSelectedCategory(id);
      setItems(data);
    });
  };

  const addToOrder = (item) => {
    setOrderItems((prevOrderItems) => {
      const itemInOrder = prevOrderItems.find(
        (orderItem) => orderItem.item.id === item.id
      );

      if (itemInOrder) {
        return prevOrderItems.map((orderItem) => {
          if (orderItem.item.id === item.id) {
            return { ...orderItem, quantity: orderItem.quantity + 1 };
          }
          return orderItem;
        });
      }

      return [...prevOrderItems, { item, quantity: 1 }];
    });
  };

  const removeFromOrder = (item) => {
    const newOrderItems = orderItems.filter(
      (orderItem) => orderItem.item.id !== item.item.id
    );

    setOrderItems(newOrderItems);
  };

  const calculateBill = () => {
    const subtotal = orderItems.reduce((acc, orderItem) => {
      return acc + orderItem.item.price * orderItem.quantity;
    }, 0);

    const total = subtotal;

    setBill({ subtotal, total });
  };

  const handleChangeQuantity = (item, quantity) => {
    const f = orderItems.find(
      (orderItem) => orderItem.item.id === item.item.id
    );

    if (f.quantity + quantity === 0) {
      removeFromOrder(item);
      return;
    }

    const newOrderItems = orderItems.map((orderItem) => {
      if (orderItem.item.id === item.item.id) {
        return { ...orderItem, quantity: orderItem.quantity + quantity };
      }
      return orderItem;
    });

    setOrderItems(newOrderItems);
  };

  const showToast = (icon, title) => {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
    }).fire({
      icon: icon,
      title: title,
    });
  }

  const handlePlaceOrder = () => {
    const order = {
      tableId: selectedTable,
      startOrderDate: new Date(),
      endOrderDate: new Date(),
      paymentMethod: "CASH",
      paymentNote: "",
      status: "PENDING",
      total: 0,
      orderDetails: orderItems.map((item) => {
        return {
          itemId: item.item.id,
          quantity: item.quantity,
          price: item.item.price,
          orderSequence: 1,
          note: "",
        };
      }),
    };

    orderService.createOrder(order);
    showToast("success", "Order placed successfully for table " + selectedTable);
    setBill({ subtotal: 0, total: 0 });
    loadInitialData();
  };

  const handleTableClick = (table) => {
    showToast("info", `Table ${table.id} selected`);
    setSelectedTable(table.id);
  }

  const handleCheckout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to checkout?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        orderService.checkout(selectedTable);
        showToast("success", "Checkout for table " + selectedTable + " completed");
        loadInitialData();
      }
    });
  }

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel table order? This will close the order and put the table available for new orders",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        orderService.cancelOrderForTable(selectedTable);
        showToast("success", "Order for table " + selectedTable + " canceled");
        loadInitialData();
      }
    });
  }

  const handleSelectedLink = (link) => {
    setSelectedLink(link);
  }

  return (
    <div>
      <NavBar handleSelectedLink={handleSelectedLink} />

      <div className="container-fluid px-5 my-4">
        <div className="row">
          {/* Tables Screen */}
          {selectedLink === "Tables" && (
            <Tables
              tables={tables}
              selectedTable={selectedTable}
              handleCheckout={handleCheckout}
              handleCancel={handleCancel}
              handleTableClick={handleTableClick}
              handleSelectedLink={handleSelectedLink}
            />
          )}
          {/* end Tables Screen */}

          {/* Kitchen Screen */}
          {selectedLink === "Kitchen" && (
            <KitchenScreen
              pendingOrders={pendingOrders}
              orderDetails={orderDetails}
            />
          )}
          {/* end Kitchen Screen */}

          {selectedLink === "POS" && (
            <>
              <div className="col-sm-8 col-md-6">
                <OrderSummary
                  orderItems={orderItems}
                  bill={bill}
                  removeFromOrder={removeFromOrder}
                  handleChangeQuantity={handleChangeQuantity}
                  handlePlaceOrder={handlePlaceOrder}
                  selectedTable={selectedTable}
                />
              </div>
              <div className="col-sm-4 col-md-6">
                <MenuItems
                  items={items}
                  categories={categories}
                  selectedCategory={selectedCategory}
                  addToOrder={addToOrder}
                  handleCategoryClick={handleCategoryClick}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
