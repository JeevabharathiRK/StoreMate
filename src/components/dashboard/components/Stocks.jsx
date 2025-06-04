import React, { useState, useEffect } from 'react';

const StockManager = () => {
  const [search, setSearch] = useState('');
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add stock fields (keep as is)
  const [newStock, setNewStock] = useState({
    supplier: '',
    product: '',
    description: '',
    category: '',
    inStock: '',
    unitPrice: '',
  });

  // Fetch products for table only
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await fetch('http://localhost/api/stocks/products');
        const data = await res.json();
        setStocks(data);
      } catch (err) {
        setStocks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStocks();
  }, []);

  // Filtering for API data structure
  const filteredStocks = stocks.filter((stock) => {
    const supplier = stock.supplier?.supplierName || '';
    const category = stock.category?.categoryName || '';
    return (
      (stock.productName && stock.productName.toLowerCase().includes(search.toLowerCase())) ||
      supplier.toLowerCase().includes(search.toLowerCase()) ||
      category.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Add stock logic (keep as is)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock((prev) => ({ ...prev, [name]: value }));
  };

  const addStock = () => {
    if (
      !newStock.supplier ||
      !newStock.product ||
      !newStock.description ||
      !newStock.category ||
      !newStock.inStock ||
      !newStock.unitPrice
    ) {
      alert('Please fill out all fields');
      return;
    }

    setStocks([
      ...stocks,
      {
        productId: Date.now(), // unique id for React key
        productName: newStock.product,
        productDescription: newStock.description,
        category: { categoryName: newStock.category },
        supplier: { supplierName: newStock.supplier },
        productStock: newStock.inStock,
        productPrice: newStock.unitPrice,
      },
    ]);
    setNewStock({
      supplier: '',
      product: '',
      description: '',
      category: '',
      inStock: '',
      unitPrice: '',
    });
  };

  const removeStock = (index) => {
    setStocks(stocks.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Stocks</h1>

      <input
        type="text"
        placeholder="Search by product, supplier, or category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
      />

      <div className="mb-2 text-gray-500">Add New Stock</div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <input
          name="supplier"
          placeholder="Supplier"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={newStock.supplier}
          onChange={handleChange}
        />
        <input
          name="product"
          placeholder="Product"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={newStock.product}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={newStock.description}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={newStock.category}
          onChange={handleChange}
        />
        <input
          name="inStock"
          type="number"
          min="0"
          placeholder="Stock In"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={newStock.inStock}
          onChange={handleChange}
        />
        <input
          name="unitPrice"
          placeholder="Unit Price"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={newStock.unitPrice}
          onChange={handleChange}
        />
        <button
          className="bg-[#E3D095] hover:bg-[#EFDCAB] text-gray-700 font-semibold px-4 py-2 rounded text-sm col-span-2 md:col-span-2 lg:col-span-1"
          onClick={addStock}
        >
          + Add Stock
        </button>
      </div>

      <div className="mb-2 text-gray-500">Current Stock</div>
      <div className="overflow-x-auto rounded-md shadow-sm mb-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Supplier</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">In Stock</th>
              <th className="px-4 py-2">Unit Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                  <div className="flex space-x-2 justify-center items-center h-12">
                    <div className="w-3 h-3 bg-[#4D55CC] rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-[#4D55CC] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-3 h-3 bg-[#4D55CC] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  </div>

                </td>
              </tr>
            ) : filteredStocks.length > 0 ? (
              filteredStocks.map((stock, index) => (
                <tr key={stock.productId || index} className="border-t border-gray-200 text-sm">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{stock.supplier?.supplierName || '-'}</td>
                  <td className="px-4 py-2">{stock.productName || stock.product || '-'}</td>
                  <td className="px-4 py-2 break-words max-w-xs">{stock.productDescription || stock.description || '-'}</td>
                  <td className="px-4 py-2">{stock.category?.categoryName || stock.category || '-'}</td>
                  <td className="px-4 py-2">{stock.productStock ?? stock.inStock ?? '-'}</td>
                  <td className="px-4 py-2">
                    {typeof stock.productPrice === 'number'
                      ? `₹${stock.productPrice}`
                      : stock.unitPrice || stock.productPrice || '-'}
                  </td>
                  <td className="px-4 py-2" contentEditable>Edit</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                  Nothing in stock.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockManager;
