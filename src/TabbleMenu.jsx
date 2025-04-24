
import React, { useState, useEffect } from "react";
import {
  Home,
  ShoppingCart,
  PlusCircle,
  Settings,
  Trash2,
  MoreVertical
} from "lucide-react";

function BottomNav({ mode, showCart, setShowCart, onHomeClick }) {
  const isCustomer = mode === "customer";
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2 z-30">
      <button onClick={onHomeClick} className="flex flex-col items-center text-sm text-gray-700">
        <Home size={20} />
        Home
      </button>
      {isCustomer && (
        <button onClick={() => setShowCart(!showCart)} className="flex flex-col items-center text-sm text-gray-700">
          <ShoppingCart size={20} />
          Cart
        </button>
      )}
      {mode === "restaurant" && (
        <button className="flex flex-col items-center text-sm text-gray-700">
          <PlusCircle size={20} />
          Add
        </button>
      )}
      <button className="flex flex-col items-center text-sm text-gray-700">
        <Settings size={20} />
        {isCustomer ? "Settings" : "Admin"}
      </button>
    </div>
  );
}

export default function TabblePreview() {
  const [mode, setMode] = useState("customer");
  const [showCart, setShowCart] = useState(false);
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState("Welcome to Home Page");
  const [cart, setCart] = useState([]);
  const [userCurrency, setUserCurrency] = useState("USD");

  const currencySymbols = { USD: "$", EUR: "€", GBP: "£", ILS: "₪", BRL: "R$" };

  const categorizedMenu = {
    burgers: {
      en: [{ name: "Cheeseburger", description: "Grilled beef with cheese", price: "$9.99" }],
      es: [{ name: "Hamburguesa con queso", description: "Carne con queso", price: "$9.99" }],
      pt: [{ name: "Hambúrguer com queijo", description: "Carne com queijo", price: "$9.99" }],
      he: [{ name: "צ'יזבורגר", description: "המבורגר עם גבינה", price: "$9.99" }]
    },
    drinks: {
      en: [{ name: "Cola", description: "Cold fizzy drink", price: "$2.50" }],
      es: [{ name: "Cola", description: "Bebida gaseosa fría", price: "$2.50" }],
      pt: [{ name: "Refrigerante", description: "Bebida com gás", price: "$2.50" }],
      he: [{ name: "קולה", description: "משקה מוגז קר", price: "$2.50" }]
    },
    desserts: {
      en: [{ name: "Brownie", description: "Chocolate brownie", price: "$3.99" }],
      es: [{ name: "Brownie", description: "Brownie de chocolate", price: "$3.99" }],
      pt: [{ name: "Brownie", description: "Brownie de chocolate", price: "$3.99" }],
      he: [{ name: "בראוני", description: "קינוח שוקולד", price: "$3.99" }]
    }
  };

  useEffect(() => {
    const browserLang = navigator.language?.split("-")[0];
    if (["en", "es", "pt", "he"].includes(browserLang)) setLanguage(browserLang);
    const currency = Intl.NumberFormat().resolvedOptions().currency || "USD";
    setUserCurrency(currency);
  }, []);

  const addToCart = (item) => setCart([...cart, item]);
  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));
  const resetHome = () => setMessage("Main Menu");

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace("$", "")), 0).toFixed(2);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen pb-24 p-4`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">{message}</h1>
          <select value={mode} onChange={(e) => setMode(e.target.value)} className="mr-2 border rounded px-2 py-1">
            <option value="customer">Customer</option>
            <option value="restaurant">Restaurant</option>
          </select>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border rounded px-2 py-1">
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="pt">PT</option>
            <option value="he">HE</option>
          </select>
        </div>
        {mode === "customer" && (
          <div className="relative">
            <button
              onClick={() => setShowCart(!showCart)}
              className="p-2 bg-gray-100 rounded-full shadow"
            >
              <ShoppingCart size={24} />
            </button>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                {cart.length}
              </span>
            )}
          </div>
        )}
      </div>

      {showCart && (
        <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl border-l p-4 z-40">
          <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
          <button onClick={() => setShowCart(false)} className="text-sm text-blue-500 underline mb-4">Close</button>
          {cart.length === 0 ? <p>Cart is empty</p> : (
            <>
              <ul className="space-y-2">
                {cart.map((item, i) => (
                  <li key={i} className="border-b pb-1">
                    <div className="flex justify-between">
                      <span>{item.name}</span>
                      <button onClick={() => removeFromCart(i)}><Trash2 size={16} className="text-red-500" /></button>
                    </div>
                    {item.instructions && (
                      <p className="text-xs italic text-gray-500">Note: {item.instructions}</p>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-bold">Total: ${total}</p>
            </>
          )}
        </div>
      )}

      {Object.entries(categorizedMenu).map(([cat, itemsByLang]) => (
        <div key={cat} className="mb-6">
          <h3 className="text-md font-semibold capitalize mb-2">{cat}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {itemsByLang[language]?.map((item, i) => (
              <div key={i} className="border p-4 rounded shadow-sm relative">
                <h4 className="text-lg font-bold">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-sm font-medium mt-1">
                  {item.price}
                  {userCurrency !== "USD" && (
                    <span className="text-xs text-gray-400 ml-1">
                      (~{currencySymbols[userCurrency]}{(parseFloat(item.price.replace("$", "")) * 1.1).toFixed(2)})
                    </span>
                  )}
                </p>
                {mode === "customer" && (
                  <>
                    <input
                      placeholder="Add instructions"
                      className="w-full mt-2 px-2 py-1 border rounded text-sm"
                      onChange={(e) => item.instructions = e.target.value}
                    />
                    <button
                      onClick={() => addToCart({ ...item })}
                      className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded w-full text-sm"
                    >
                      Add to Cart
                    </button>
                  </>
                )}
                {mode === "restaurant" && (
                  <div className="absolute top-2 right-2 cursor-pointer">
                    <MoreVertical size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <BottomNav mode={mode} showCart={showCart} setShowCart={setShowCart} onHomeClick={resetHome} />
    </div>
  );
}
