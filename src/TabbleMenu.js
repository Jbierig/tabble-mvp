
import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function useQuery() {
  try {
    return new URLSearchParams(useLocation().search);
  } catch {
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
    es: [
      { name: "Hamburguesa con queso", description: "Jugosa carne con queso.", price: "$9.99" },
      { name: "Papas fritas", description: "Crujientes y doradas.", price: "$3.49" },
    ],
    pt: [
      { name: "X-Burger", description: "Hambúrguer suculento com queijo.", price: "$9.99" },
      { name: "Batatas fritas", description: "Batatas crocantes.", price: "$3.49" },
    ],
    he: [
      { name: "צ'יזבורגר", description: "המבורגר עסיסי עם גבינה.", price: "$9.99" },
      { name: "צ'יפס", description: "צ'יפס פריך וטעים.", price: "$3.49" },
    ],
  });
  const [cart, setCart] = useState([]);
  const fileInputRef = useRef(null);

  const toggleMode = () => {
    const newMode = mode === "customer" ? "restaurant" : "customer";
    const params = new URLSearchParams(location.search);
    params.set("mode", newMode);
    navigate({ search: params.toString() });
    setMode(newMode);
  };

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    toast.success(`${item.name} added to cart`);
  };

  const handleScanMenu = () => {
    fileInputRef.current?.click();
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    toast.loading("Scanning menu...");
    // Placeholder OCR logic
    setTimeout(() => {
      toast.dismiss();
      toast.success("Detected 3 items (simulated)");
      const scannedItems = [
        { name: "Pasta Alfredo", description: "Creamy Alfredo sauce over fettuccine.", price: "$12.99" },
        { name: "Caesar Salad", description: "Romaine lettuce with Caesar dressing.", price: "$7.49" },
        { name: "Garlic Bread", description: "Toasted with herbs and butter.", price: "$4.99" },
      ];
      const updated = { ...menu };
      updated[language] = [...(menu[language] || []), ...scannedItems];
      setMenu(updated);
    }, 2000);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tabble</h1>
        <div className="flex gap-2">
          <select
            className="border px-2 py-1 rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="pt">PT</option>
            <option value="he">HE</option>
          </select>
          <button onClick={toggleMode} className="bg-blue-600 text-white px-3 py-1 rounded">
            {mode === "customer" ? "Restaurant Mode" : "Customer Mode"}
          </button>
        </div>
      </div>

      {mode === "restaurant" && (
        <div className="mb-4">
          <button onClick={handleScanMenu} className="bg-green-600 text-white px-4 py-2 rounded">
            📸 Scan Menu with AI
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUploadImage}
            className="hidden"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(menu[language] || []).map((item, i) => (
          <div key={i} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-sm font-medium mt-1">{item.price}</p>
            {mode === "customer" && (
              <button
                onClick={() => handleAddToCart(item)}
                className="mt-2 bg-yellow-500 text-white text-sm px-3 py-1 rounded"
              >
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
