
import React, { useState, useEffect } from "react";
import {
  Home,
  ShoppingCart,
  PlusCircle,
  Settings,
  Trash2,
  MoreVertical
} from "lucide-react";

export default function TabblePreview() {
  const [mode, setMode] = useState("customer");
  const [showCart, setShowCart] = useState(false);
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [userCurrency, setUserCurrency] = useState("USD");

  const currencySymbols = { USD: "$", EUR: "€", GBP: "£", ILS: "₪", BRL: "R$" };

  const menu = {
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

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace("$", "")), 0).toFixed(2);

  return (
    <div className={`min-h-screen p-4 pb-24 transition-colors ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Tabble</h1>
          <div className="flex space-x-2 mt-1">
            <select value={mode} onChange={(e) => setMode(e.target.value)} className="rounded-md px-2 py-1 border">
              <option value="customer">Customer</option>
              <option value="restaurant">Restaurant</option>
            </select>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="rounded-md px-2 py-1 border">
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="pt">PT</option>
              <option value="he">HE</option>
            </select>
          </div>
        </div>
        {mode === "customer" && (
          <div className="relative">
            <button
              onClick={() => setShowCart(!showCart)}
              className="p-3 bg-white rounded-full shadow-md"
            >
              <ShoppingCart size={22} />
            </button>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                {cart.length}
              </span>
            )}
          </div>
        )}
      </header>

      {Object.entries(menu).map(([cat, items]) => (
        <div key={cat} className="mb-6">
          <h2 className="text-lg font-semibold mb-3 capitalize">{cat}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items[language].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm relative">
                <h3 className="text-base font-bold">{item.name}</h3>
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
                      className="w-full mt-2 px-2 py-1 border rounded-md text-sm"
                      onChange={(e) => item.instructions = e.target.value}
                    />
                    <button
                      onClick={() => addToCart({ ...item })}
                      className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded-lg w-full text-sm"
                    >
                      Add to Cart
                    </button>
                  </>
                )}
                {mode === "restaurant" && (
                  <div className="absolute top-3 right-3 text-gray-500">
                    <MoreVertical size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {showCart && (
        <div className="fixed top-0 right-0 w-72 h-full bg-white border-l p-4 shadow-xl z-50">
          <h2 className="text-lg font-semibold mb-3">Cart</h2>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-400">Your cart is empty.</p>
          ) : (
            <>
              <ul className="space-y-3">
                {cart.map((item, index) => (
                  <li key={index} className="text-sm border-b pb-1">
                    <div className="flex justify-between">
                      <span>{item.name}</span>
                      <button onClick={() => removeFromCart(index)}><Trash2 size={14} /></button>
                    </div>
                    {item.instructions && <p className="text-xs italic text-gray-500">Note: {item.instructions}</p>}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-bold text-right">Total: ${total}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
