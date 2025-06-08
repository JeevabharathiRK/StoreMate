import { useEffect, useState, useContext } from "react";
import HostContext from "../../../contexts/HostContext";
import Checkout from "./billingComponents/Checkout"; // Make sure this path is correct

export default function Billing() {
  const host = useContext(HostContext);

  const [barcodeBuffer, setBarcodeBuffer] = useState("");
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [manualItem, setManualItem] = useState({
    name: "",
    description: "",
    category: "",
    qty: 0,
    price: 0,
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement.tagName;
      const isInput =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        document.activeElement.isContentEditable;
      if (isInput) return;

      if (e.key === "Enter") {
        if (barcodeBuffer.trim()) {
          addItemByBarcode(barcodeBuffer.trim());
          setBarcodeBuffer("");
        }
        e.preventDefault();
      } else if (/^[0-9]$/.test(e.key)) {
        setBarcodeBuffer((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [barcodeBuffer]);

  const addItemByBarcode = async (barcode) => {
    try {
      const response = await fetch(`${host}/api/billing?barcode=${barcode}`);
      if (!response.ok) {
        throw new Error("Product not found");
      }
      const data = await response.json();
      setItems((prevItems) => {
        const barcodeStr = String(data.barcode);
        const existing = prevItems.find(
          (item) => String(item.barcode) === barcodeStr
        );
        if (existing) {
          return prevItems.map((item) =>
            String(item.barcode) === barcodeStr
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        }
        return [
          ...prevItems,
          {
            id: Date.now(),
            barcode: data.barcode,
            productId: data.product.productId,
            name: data.product.productName,
            description: data.product.productDescription,
            category: data.product.category.categoryName,
            qty: 1,
            stock: data.product.productStock,
            price: data.product.productPrice,
          },
        ];
      });
    } catch (error) {
      alert("Kindly add the stock for this product and try again");
      console.error("Error fetching product by barcode:", error);
    }
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) qty = 1;
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: Number(qty) } : item
      )
    );
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const grandTotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleAddManualItem = () => {
    if (!manualItem.name || manualItem.price <= 0 || manualItem.qty <= 0) {
      alert("Please fill all fields with valid values.");
      return;
    }

    const newItem = {
      id: Date.now(),
      productId: null,
      ...manualItem,
      barcode: null,
    };

    setItems((prev) => [...prev, newItem]);
    setManualItem({ name: "", description: "", category: "", qty: 0, price: 0 });
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // When checkout is confirmed, clear items and close checkout
  const handleConfirmCheckout = () => {
    setItems([]);
    setShowCheckout(false);
  };

  // --- Main Render ---
  if (showCheckout) {
    return (
      <Checkout
        items={items}
        grandTotal={grandTotal}
        onClose={() => setShowCheckout(false)}
        onConfirm={handleConfirmCheckout}
      />
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen relative">
      <h1 className="text-3xl font-bold mb-6">Billing</h1>

      <input
        type="text"
        placeholder="Search by product name or barcode"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
      />

      <div className="mb-2 text-gray-500">Products</div>

      <div className="overflow-x-auto rounded-md shadow-sm mb-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Barcode</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Product Description</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={item.id} className="border-t border-gray-200 text-sm">
                <td className="px-4 py-2">
                  <button
                    className="bg-gray-300 rounded-full px-2"
                    onClick={() => handleDelete(item.id)}
                  >
                    -
                  </button>
                </td>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.barcode || "-"}</td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2 break-words max-w-xs">
                  {item.description}
                </td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    min="1"
                    className="w-16 p-1 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, e.target.value)}
                  />
                </td>
                <td className="px-4 py-2">{item.price}</td>
                <td className="px-4 py-2">{item.qty * item.price}</td>
              </tr>
            ))}
            {filteredItems.length > 0 && (
              <tr className="border-t border-gray-200 text-sm bg-gray-100">
                <td className="px-4 py-2" colSpan={7}></td>
                <td className="px-4 py-2" colSpan={1}>
                  <span className="font-bold">Grand Total :</span>
                </td>
                <td className="px-4 py-2 font-bold" colSpan={1}>
                  ₹{grandTotal.toFixed(2)}
                </td>
              </tr>
            )}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                  Nothing added.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
        <input
          type="text"
          placeholder="Product Name"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={manualItem.name}
          onChange={(e) =>
            setManualItem({ ...manualItem, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={manualItem.description}
          onChange={(e) =>
            setManualItem({ ...manualItem, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Category"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={manualItem.category}
          onChange={(e) =>
            setManualItem({ ...manualItem, category: e.target.value })
          }
        />
        <input
          type="number"
          min="1"
          placeholder="Qty"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={manualItem.qty === 0 ? "" : manualItem.qty}
          onChange={(e) =>
            setManualItem({ ...manualItem, qty: Number(e.target.value) })
          }
        />
        <input
          type="number"
          min="0"
          placeholder="Price"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={manualItem.price === 0 ? "" : manualItem.price}
          onChange={(e) =>
            setManualItem({ ...manualItem, price: Number(e.target.value) })
          }
        />
        <button
          className="bg-[#E3D095] hover:bg-[#EFDCAB] text-gray-700 font-semibold px-4 py-2 rounded text-sm col-span-1 md:col-span-2 lg:col-span-1"
          onClick={handleAddManualItem}
        >
          + Add Item
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-[#483AA0] hover:bg-[#4D55CC] text-white font-semibold px-6 py-2 rounded text-lg flex items-center transition-colors duration-200"
          onClick={() => setShowCheckout(true)}
          disabled={items.length === 0}
        >
          <img
            src="https://img.icons8.com/ios-glyphs/60/checkout.png"
            alt="Checkout Button"
            className="w-6 h-6 inline-block mr-2"
            style={{ filter: "invert(1)" }}
          />
          Checkout
        </button>
      </div>
      <p className="text-gray-500 text-sm">
        Note: <span className="text-gray-700 font-semibold">Connect barcode scanner to your computer and scan the product barcode</span> to add it to the list.<br />
        You can also mimic a barcode scanner by{" "}
        <span className="text-gray-700 font-semibold">
          clicking the empty white space below ⇣ and typing the barcode number, then press <span className="bg-[#DDDDDD] p-1 rounded">Enter</span>
        </span>{" "}
        to add the product.
      </p>

      {/* Display the current keypresses */}
      {barcodeBuffer && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-200 p-2 text-center">
          <span className="font-semibold">Barcode Buffer: </span>
          {barcodeBuffer}
        </div>
      )}
    </div>
  );
}