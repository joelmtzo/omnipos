import { React } from "react";

const MenuItems = ({ items, categories, addToOrder, handleCategoryClick, selectedCategory }) => {
  
  return (
    <div>
      <div className="d-flex flex-row flex-wrap mb-3">
        {categories &&
          categories.map((category) => (
            <button
              onClick={() => handleCategoryClick(category.id)}
              className={`btn ${
                selectedCategory === category.id
                  ? "btn-success"
                  : "btn-secondary"
              } m-1 p-4 flex-grow-1`}
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
              className="btn btn-outline-secondary text-white p-4 m-1 flex-grow-1"
              onClick={() => addToOrder(item)}
              key={item.id}
            >
              {/* <img src={item.imageUrl} alt={item.name} /> */}
              <span>{item.name}</span>
              <br />
              <span>$ {item.price}</span>
            </div>
          ))}
        {items.length === 0 && (
          <div className="alert alert-secondary w-100 text-center">
            No items available in this category
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItems;
