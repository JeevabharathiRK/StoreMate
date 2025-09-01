import React, { useState, useEffect, useContext } from "react";
import HostContext from "../../../contexts/HostContext";

const StockManager = () => {
  const host = useContext(HostContext);

  const [search, setSearch] = useState("");
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddingStock, setIsAddingStock] = useState(false);

  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editableStock, setEditableStock] = useState({});

  const [newStock, setNewStock] = useState({
    supplierId: "",
    barcode: "",
    productName: "",
    productDescription: "",
    category: "",
    inStock: "",
    unitPrice: "",
  });

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await fetch(`${host}/api/stocks/products`);
        const data = await res.json();

        const flatData = await Promise.all(
          data.map(async (stock) => ({
            productId: stock.productId,
            supplierId: stock.supplier?.supplierId,
            barcode: await getBarcodeByProductId(
              stock ? stock.productId : null
            ),
            productName: stock.productName,
            productDescription: stock.productDescription,
            category: stock.category?.categoryName,
            supplier: stock.supplier?.supplierName,
            inStock: stock.productStock,
            unitPrice: stock.productPrice,
            lastStockAt: stock.lastStockAt,
          }))
        );
        setStocks(flatData);
      } catch (err) {
        console.error("Error fetching stocks:", err);
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

  const getBarcodeByProductId = async (productId) => {
    try {
      const res = await fetch(
        `${host}/api/stocks/barcodes?productId=${productId}`
      );
      const data = await res.json();
      return data.barcode;
    } catch (err) {
      console.error("Failed to fetch barcode:", err);
      return null;
    }
  };

  const getSupplierNameFromId = async (id) => {
    try {
      const res = await fetch(`${host}/api/stocks/suppliers?id=${id}`);
      const data = await res.json();
      return data.supplierName;
    } catch (err) {
      console.error("Failed to fetch supplier name:", err);
      return null;
    }
  };

  const getCategoryIdFromCategory = async (category) => {
    try {
      const res = await fetch(`${host}/api/stocks/categories?name=${category}`);
      const data = await res.json();
      return data.categoryId;
    } catch (err) {
      console.error("Failed to fetch CategoryId:", err);
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
        lastStockAt: data.lastStockAt,
      };
      const res = await fetch(`${host}/api/stocks/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
        product: { productId: data.productId },
      };
      const res = await fetch(`${host}/api/stocks/barcodes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    const {
      supplierId,
      barcode,
      productName,
      productDescription,
      category,
      inStock,
      unitPrice,
    } = newStock;

    if (
      !supplierId ||
      !barcode ||
      !productName ||
      !productDescription ||
      !category ||
      !inStock ||
      !unitPrice
    ) {
      alert("Please fill out all fields");
      return;
    }
    setIsAddingStock(true);

    const supplierName = await getSupplierNameFromId(supplierId);
    if (!supplierName) {
      alert("Invalid supplier ID");
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
      lastStockAt: new Date().toISOString(),
    };

    const upload = await uploadStock(newEntry);
    if (!upload) return;

    newEntry.productId = upload.productId;

    await uploadBarcode({ barcode, productId: upload.productId });

    setStocks([...stocks, newEntry]);

    setNewStock({
      supplierId: "",
      barcode: "",
      productName: "",
      productDescription: "",
      category: "",
      inStock: "",
      unitPrice: "",
    });
    setIsAddingStock(false);
  };

  const filteredStocks = stocks.filter((stock) =>
    [stock.productName, stock.supplier, stock.category].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleEditStock = (index, stock) => {
    setEditingRowIndex(index);
    setEditableStock({ ...stock });
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditableStock((prev) => ({ ...prev, [name]: value }));
  };
  const handleSaveStock = (index) => {
    const updatedStocks = [...stocks];
    updatedStocks[index] = editableStock;
    setStocks(updatedStocks);
    setEditingRowIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingRowIndex(null);
    setEditableStock({});
  };

  const handleDeleteStock = async (index) => {
    return;
  }

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
          name="supplierId"
          type="number"
          placeholder="Supplier ID"
          value={newStock.supplierId}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
        />
        <input
          name="barcode"
          type="number"
          placeholder="Barcode"
          value={newStock.barcode}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
        />
        <input
          name="productName"
          placeholder="Product Name"
          value={newStock.productName}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
        />
        <input
          name="productDescription"
          placeholder="Description"
          value={newStock.productDescription}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
        />
        <input
          name="category"
          placeholder="Category"
          value={newStock.category}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
        />
        <input
          name="inStock"
          type="number"
          placeholder="Stock In"
          value={newStock.inStock}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
        />
        <input
          name="unitPrice"
          type="number"
          step="0.01"
          placeholder="Unit Price"
          value={newStock.unitPrice}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
        />
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
        <table className="min-w-full table-fixed bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="px-4 py-2 w-[60px]"></th>
              <th className="px-4 py-2 w-[40px]">#</th>
              <th className="px-4 py-2 w-[140px]">Barcode</th>
              <th className="px-4 py-2 w-[180px]">Supplier</th>
              <th className="px-4 py-2 w-[180px]">Product</th>
              <th className="px-4 py-2 w-[240px]">Description</th>
              <th className="px-4 py-2 w-[120px]">Category</th>
              <th className="px-4 py-2 w-[100px]">In-Stock</th>
              <th className="px-4 py-2 w-[100px]">Unit Price</th>
              <th className="px-4 py-2 w-[180px]">Last Stock At</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="10"
                  className="px-4 py-4 text-center text-gray-500"
                >
                  <div className="flex space-x-2 justify-center items-center h-12">
                    <div className="w-3 h-3 bg-[#4D55CC] rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-[#4D55CC] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-3 h-3 bg-[#4D55CC] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  </div>
                </td>
              </tr>
            ) : filteredStocks.length > 0 ? (
              filteredStocks.map((stock, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 text-sm align-top"
                >
                  {/* Edit button */}
                  <td className="px-2 py-2 align-top">
                    <div className="flex flex-col items-center gap-1">
                      {editingRowIndex === index ? (
                        <>
                          {/* Save Button */}
                          <button
                            onClick={() => handleSaveStock(index)}
                            className="w-[36px] h-[36px] bg-gray-100 hover:bg-gray-200 rounded-full text-green-600 text-lg flex items-center justify-center transition"
                            title="Save"
                          >
                            <img
                              width="16"
                              height="16"
                              src="https://img.icons8.com/small/16/micro-sd.png"
                              alt="save"
                            />
                          </button>

                          {/* Cancel Button */}
                          <button
                            onClick={handleCancelEdit}
                            className="w-[36px] h-[36px] bg-gray-100 hover:bg-gray-200 rounded-full text-red-600 text-lg flex items-center justify-center transition"
                            title="Back"
                          >
                            <img
                              width="16"
                              height="16"
                              src="https://img.icons8.com/small/16/reply-arrow.png"
                              alt="save"
                            />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteStock(index)}
                            className="w-[36px] h-[36px] bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 hover:text-red-600 text-lg flex items-center justify-center transition"
                            title="Delete"
                          >
                            <img
                              width="16"
                              height="16"
                              src="https://img.icons8.com/small/16/waste.png"
                              alt="delete"
                            />
                          </button>
                        </>
                      ) : (
                        <button
                          className="w-[36px] h-[36px] bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition"
                          onClick={() => handleEditStock(index, stock)}
                          title="Edit"
                        >
                          <img
                            width="16"
                            height="16"
                            src="https://img.icons8.com/fluency-systems-regular/50/create-new.png"
                            alt="edit"
                          />
                        </button>
                      )}
                    </div>
                  </td>

                  {/* Row number */}
                  <td className="px-4 py-2">{index + 1}</td>

                  {/* Barcode */}
                  <td className="px-4 py-2">
                    {editingRowIndex === index ? (
                      <input
                        name="barcode"
                        value={editableStock.barcode}
                        onChange={handleEditChange}
                        className="w-full bg-transparent px-2 py-1 text-sm border border-gray-300 rounded outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
                      />
                    ) : (
                      <div className="whitespace-pre-wrap">{stock.barcode}</div>
                    )}
                  </td>

                  {/* Supplier (textarea) */}
                  <td className="px-4 py-2">
                    {editingRowIndex === index ? (
                      <input
                        name="supplierId"
                        placeholder="supplierId"
                        type="number"
                        value={editableStock.supplierId}
                        onChange={handleEditChange}
                        className="w-full bg-transparent px-2 py-1 text-sm border border-gray-300 rounded outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
                      />
                    ) : (
                      <div className="whitespace-pre-wrap">
                        {stock.supplier}
                      </div>
                    )}
                  </td>

                  {/* Product (textarea) */}
                  <td className="px-4 py-2">
                    {editingRowIndex === index ? (
                      <textarea
                        name="productName"
                        value={editableStock.productName}
                        onChange={handleEditChange}
                        rows={2}
                        className="w-full resize-none overflow-y-auto bg-transparent px-2 py-1 text-sm border border-gray-300 rounded outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
                      />
                    ) : (
                      <div className="whitespace-pre-wrap">
                        {stock.productName}
                      </div>
                    )}
                  </td>

                  {/* Description (textarea) */}
                  <td className="px-4 py-2">
                    {editingRowIndex === index ? (
                      <textarea
                        name="productDescription"
                        value={editableStock.productDescription}
                        onChange={handleEditChange}
                        rows={3}
                        className="w-full resize-none overflow-y-auto bg-transparent px-2 py-1 text-sm border border-gray-300 rounded outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
                      />
                    ) : (
                      <div className="whitespace-pre-wrap">
                        {stock.productDescription}
                      </div>
                    )}
                  </td>

                  {/* Category */}
                  <td className="px-4 py-2">
                    {editingRowIndex === index ? (
                      <input
                        name="category"
                        value={editableStock.category}
                        onChange={handleEditChange}
                        className="w-full bg-transparent px-2 py-1 text-sm border border-gray-300 rounded outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
                      />
                    ) : (
                      <div className="whitespace-pre-wrap">
                        {stock.category}
                      </div>
                    )}
                  </td>

                  {/* In Stock */}
                  <td className="px-4 py-2">
                    {editingRowIndex === index ? (
                      <input
                        name="inStock"
                        type="number"
                        value={editableStock.inStock}
                        onChange={handleEditChange}
                        className="w-full bg-transparent px-2 py-1 text-sm border border-gray-300 rounded outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
                      />
                    ) : (
                      stock.inStock
                    )}
                  </td>

                  {/* Unit Price */}
                  <td className="px-4 py-2">
                    {editingRowIndex === index ? (
                      <input
                        name="unitPrice"
                        type="number"
                        value={editableStock.unitPrice}
                        onChange={handleEditChange}
                        className="w-full bg-transparent px-2 py-1 text-sm border border-gray-300 rounded outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
                      />
                    ) : (
                      `₹${stock.unitPrice}`
                    )}
                  </td>

                  {/* Last Stock At */}
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(stock.lastStockAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="px-4 py-4 text-center text-gray-500"
                >
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
