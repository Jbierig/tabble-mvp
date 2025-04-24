
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function useQuery() {
  try {
    return new URLSearchParams(useLocation().search);
  } catch (e) {
    return new URLSearchParams();
  }
}

function TabbleMenuContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();

  const [mode, setMode] = useState(() => query.get("mode") || "customer");
  const [language, setLanguage] = useState("en");
  const [menu, setMenu] = useState({
    en: [
      { name: "Cheeseburger", description: "Juicy grilled beef patty with cheese.", price: "$9.99" },
      { name: "Fries", description: "Crispy golden fries.", price: "$3.49" },
    ],
  });
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="p-4">
      <Toaster />
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Welcome to Tabble</h1>
        <button onClick={() => setMode(mode === "customer" ? "restaurant" : "customer")} className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">
          Switch to {mode === "customer" ? "Restaurant" : "Customer"} Mode
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(menu[language] || []).map((item, i) => (
          <div key={i} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{item.name}</h2>
            <p>{item.description}</p>
            <p className="font-medium mt-1">{item.price}</p>
            {mode === "customer" && (
              <button onClick={() => handleAddToCart(item)} className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded">
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TabbleMenu() {
  return (
    <Router>
      <TabbleMenuContent />
    </Router>
  );
}
