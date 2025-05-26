import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Overall() {
  const [totalSales, setTotalSales] = useState("₹00,000");
  const [totalOrders, setTotalOrders] = useState("00");
  const [revenue, setRevenue] = useState("₹00,000");
  const [inventory, setInventory] = useState(0);
  const [barcode, setBarcode] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // Popup modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state for add stock popup
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    price: "",
    dealer: "",
  });

  // Sample sales data for graph
  const salesData = [
    { month: "Jan", sales: 40000 },
    { month: "Feb", sales: 30000 },
    { month: "Mar", sales: 50000 },
    { month: "Apr", sales: 40000 },
    { month: "May", sales: 60000 },
    { month: "Jun", sales: 70000 },
  ];

  useEffect(() => {
    // Fetch initial dashboard data (mocked here)
    const data = {
      totalSales: "₹1,25,000",
      totalOrders: "120",
      revenue: "₹95,000",
      inventory: 500,
    };

    setTotalSales(data.totalSales);
    setTotalOrders(data.totalOrders);
    setRevenue(data.revenue);
    setInventory(data.inventory);
  }, []);

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
    setFormData({
      productName: "",
      quantity: "",
      price: "",
      dealer: "",
    });
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddStockSubmit(e) {
    e.preventDefault();

    // Validate inputs (basic)
    if (
      !formData.productName ||
      !formData.quantity ||
      !formData.price ||
      !formData.dealer
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Parse quantity and price
    const quantity = parseInt(formData.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      alert("Quantity must be a positive number");
      return;
    }

    // TODO: Send formData to backend API here

    // For demo: update inventory count locally
    setInventory((prev) => prev + quantity);

    alert(
      `Added stock:\nProduct: ${formData.productName}\nQuantity: ${formData.quantity}\nPrice: ${formData.price}\nDealer: ${formData.dealer}`
    );

    closeModal();
  }

  function handleBarcodeChange(e) {
    setBarcode(e.target.value);
  }

  async function handleSearch() {
    if (!barcode.trim()) {
      alert("Please enter a barcode number.");
      return;
    }
    try {
      // Mock product data
      const product = {
        name: "Sample Product",
        price: "₹999",
        stock: 20,
      };
      setSearchResult(product);
    } catch (error) {
      console.error("Error searching product:", error);
      setSearchResult(null);
    }
  }

  return (
    <div className="min-h-screen relative">
      <div className="text-[#111827] text-2xl font-semibold mb-6">Dashboard</div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card title="Total Sales" value={totalSales} />
        <Card title="Total Orders" value={totalOrders} />
        <Card title="Revenue This Month" value={revenue} />
      </div>

      {/* Inventory and Graph */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Inventory Overview */}
        <div className="bg-white rounded-md shadow-md p-5">
          <div className="font-semibold text-[#111827] mb-2">Inventory Overview</div>
          <div className="text-3xl font-bold text-[#111827] mb-4">{inventory}</div>
          <button
            onClick={openModal}
            className="bg-[#1F2937] text-white px-4 py-2 rounded-md hover:bg-amber-400 transition"
          >
            Add Stock
          </button>
        </div>

        {/* Sales Overview Graph */}
        <div className="bg-white rounded-md shadow-md p-5">
          <div className="font-semibold text-[#111827] mb-2">Sales Overview</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={salesData}
              margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#1F2937"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Search by Barcode */}
      <div className="bg-white rounded-md shadow-md p-5 mt-6">
        <div className="font-semibold text-[#111827] mb-2">
          Search Product by Barcode Number
        </div>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter barcode number"
            value={barcode}
            onChange={handleBarcodeChange}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-[#1F2937] text-white px-6 py-2 rounded-md hover:bg-amber-400 transition"
          >
            Search
          </button>
        </div>

        {searchResult && (
          <div className="border border-gray-300 rounded-md p-4">
            <div>
              <strong>Product Name:</strong> {searchResult.name}
            </div>
            <div>
              <strong>Price:</strong> {searchResult.price}
            </div>
            <div>
              <strong>Stock:</strong> {searchResult.stock}
            </div>
          </div>
        )}
      </div>

      {/* Modal Popup for Add Stock */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">Add New Stock</h2>

            <form onSubmit={handleAddStockSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1" htmlFor="productName">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1" htmlFor="price">
                  Price (₹)
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1" htmlFor="dealer">
                  Dealer
                </label>
                <input
                  type="text"
                  id="dealer"
                  name="dealer"
                  value={formData.dealer}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1F2937] text-white px-4 py-2 rounded-md hover:bg-amber-400 transition"
                >
                  Add Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white h-32 rounded-md shadow-md p-5 flex flex-col justify-between">
      <div className="font-semibold text-[#556484]">{title}</div>
      <div className="text-3xl font-bold text-[#111827]">{value}</div>
    </div>
  );
}
