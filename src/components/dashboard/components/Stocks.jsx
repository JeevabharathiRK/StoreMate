import React, { useState, useEffect } from 'react';

const StockManager = () => {
  const [search, setSearch] = useState('');
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddingStock, setIsAddingStock] = useState(false);

  const [newStock, setNewStock] = useState({
    supplierId: '',
    barcode: '',
    productName: '',
    productDescription: '',
    category: '',
    inStock: '',
    unitPrice: '',
  });


  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await fetch('http://localhost/api/stocks/products');
        const data = await res.json();

        const flatData = await Promise.all(
        data.map(async (stock) => ({
          productId: stock.productId,
          supplierId: stock.supplier?.supplierId,
          barcode: await getBarcodeByProductId(stock.productId),
          productName: stock.productName,
          productDescription: stock.productDescription,
          category: stock.category?.categoryName,
          supplier: stock.supplier?.supplierName,
          inStock: stock.productStock,
          unitPrice: stock.productPrice,
          lastStockAt: stock.lastStockAt
        }))
      );

        console.log(flatData.productId)

        flatData.barcode = await getBarcodeByProductId(flatData.productId);

        setStocks(flatData);
      } catch (err) {
        console.error('Error fetching stocks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock((prev) => ({ ...prev, [name]: value }));
  };

  const getBarcodeByProductId = async (productId) =>{
    try{
      const res = await fetch(`http://localhost/api/stocks/barcodes?productId=${productId}`);
      const data = await res.json();
      return data.barcode;

    } catch(err){
      console.error('Failed to fetch barcode:', err);
      return null;
    }
  }

  const getSupplierNameFromId = async (id) => {
    try {
      const res = await fetch(`http://localhost/api/stocks/suppliers?id=${id}`);
      const data = await res.json();
      return data.supplierName;
    } catch (err) {
      console.error('Failed to fetch supplier name:', err);
      return null;
    }
  };

  const getCategoryIdFromCategory = async (category) => {
    try {
      const res = await fetch(`http://localhost/api/stocks/categories?name=${category}`);
      const data = await res.json();
      return data.categoryId;
    } catch (err) {
      console.error('Failed to fetch CategoryId:', err);
      return null;
    }
  };

  const uploadStock = async (data) => {
    try {
      const categoryId = await getCategoryIdFromCategory(data.category);
      const payload = {
        productName: data.productName,
        productDescription: data.productDescription,
        category: { categoryId },
        supplier: { supplierId: data.supplierId },
        productPrice: data.unitPrice,
        productStock: data.inStock,
        lastStockAt: data.lastStockAt
      };
      const res = await fetch(`http://localhost/api/stocks/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`Failed to upload stock`);

      const feed = await res.json();
      console.log(`Upload Success:`, feed);
      return feed;
    } catch (err) {
      console.error("Upload failed:", err.message);
      alert("Upload failed: " + err.message);
      return null;
    }
  };

  const uploadBarcode = async (data) => {
    try {
      const payload = {
        barcode: data.barcode,
        product: { productId: data.productId }
      };
      const res = await fetch(`http://localhost/api/stocks/barcodes`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`Failed to upload Barcode`);

      const feed = await res.json();
      console.log(`Upload Success:`, feed);
      return feed;
    } catch (err) {
      console.error("Upload failed:", err.message);
      alert("Upload failed: " + err.message);
      return null;
    }
  };

  const addStock = async () => {
    const { supplierId, barcode, productName, productDescription, category, inStock, unitPrice } = newStock;

    if (!supplierId || !barcode || !productName || !productDescription || !category || !inStock || !unitPrice) {
      alert('Please fill out all fields');
      return;
    }
    setIsAddingStock(true);

    const supplierName = await getSupplierNameFromId(supplierId);
    if (!supplierName) {
      alert('Invalid supplier ID');
      return;
    }

    const newEntry = {
      productId: null,
      supplierId,
      barcode,
      productName,
      productDescription,
      category,
      supplier: supplierName,
      inStock,
      unitPrice,
      lastStockAt: new Date().toISOString()
    };

    const upload = await uploadStock(newEntry);
    if (!upload) return;

    newEntry.productId = upload.productId;

    await uploadBarcode({ barcode, productId: upload.productId });

    setStocks([...stocks, newEntry]);

    setNewStock({
      supplierId: '',
      barcode: '',
      productName: '',
      productDescription: '',
      category: '',
      inStock: '',
      unitPrice: '',
    });
    setIsAddingStock(false);
  };

  const filteredStocks = stocks.filter((stock) =>
    [stock.productName, stock.supplier, stock.category]
      .some((field) => field?.toLowerCase().includes(search.toLowerCase()))
  );

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
        <input name="supplierId" type="number" placeholder="Supplier ID" value={newStock.supplierId} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg outline-none" />
        <input name="barcode" type="number" placeholder="Barcode" value={newStock.barcode} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg outline-none" />
        <input name="productName" placeholder="Product Name" value={newStock.productName} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg outline-none" />
        <input name="productDescription" placeholder="Description" value={newStock.productDescription} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg outline-none" />
        <input name="category" placeholder="Category" value={newStock.category} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg outline-none" />
        <input name="inStock" type="number" placeholder="Stock In" value={newStock.inStock} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg outline-none" />
        <input name="unitPrice" type="number" step="0.01" placeholder="Unit Price" value={newStock.unitPrice} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg outline-none" />
        <button
          className="flex items-center justify-center gap-2 bg-[#E3D095] hover:bg-[#EFDCAB] text-gray-700 font-semibold px-4 py-2 rounded text-sm col-span-2 md:col-span-2 lg:col-span-1 disabled:bg-[#EFDCAB] border border-transparent disabled:border-[#E3D095] disabled:cursor-not-allowed"
          disabled={isAddingStock}
          onClick={addStock}
        >
          {isAddingStock ? (
            <div className="w-24 h-1 relative overflow-hidden rounded mt-[0.50rem] mb-[0.50rem]">
              <div className="absolute left-0 h-full w-1/3 bg-[#fff] rounded animate-[loadBar_1.5s_linear_infinite]"></div>
            </div>
          ) : (
            "+ Add New Stock"
          )}
        </button>



      </div>

      <div className="mb-2 text-gray-500">Current Stock</div>
      <div className="overflow-x-auto rounded-md shadow-sm mb-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Barcode</th>
              <th className="px-4 py-2">Supplier</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">In Stock</th>
              <th className="px-4 py-2">Unit Price</th>
              <th className="px-4 py-2">Last Stock At</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                  <div className="flex space-x-2 justify-center items-center h-12">
                    <div className="w-3 h-3 bg-[#4D55CC] rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-[#4D55CC] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-3 h-3 bg-[#4D55CC] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  </div>
                </td>
              </tr>
            ) : filteredStocks.length > 0 ? (
              filteredStocks.map((stock, index) => (
                <tr key={index} className="border-t border-gray-200 text-sm">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{stock.barcode}</td>
                  <td className="px-4 py-2">{stock.supplier}</td>
                  <td className="px-4 py-2">{stock.productName}</td>
                  <td className="px-4 py-2 break-words max-w-xs">{stock.productDescription}</td>
                  <td className="px-4 py-2">{stock.category}</td>
                  <td className="px-4 py-2">{stock.inStock}</td>
                  <td className="px-4 py-2">₹{stock.unitPrice}</td>
                  <td className="px-4 py-2">{new Date(stock.lastStockAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                  No stock found.
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
