import { React } from "react";

const MenuItems = ({ items, categories, addToOrder, handleCategoryClick, selectedCategory }) => {
  
  function formatCurrency(value) {
    return "$ " + value.toFixed(2);
  }

  return (
    <div>
      <div className="menu-category">
        {categories &&
          categories.map((category) => (
            <button
              onClick={() => handleCategoryClick(category.id)}
              className={category.id == selectedCategory ? "active" : ""}
              key={category.id}
            >
              {category.name}
            </button>
          ))}
      </div>
      <div className="d-flex flex-wrap">
        {items &&
          items.map((item) => (
            <div
              className="menu-item p-5 m-1"
              onClick={() => addToOrder(item)}
              key={item.id}
            >
              {/* <img src={item.imageUrl} alt={item.name} /> */}
              <span>{item.name}</span>
              <span>{formatCurrency(item.price)}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MenuItems;
