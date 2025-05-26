import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Card } from '../../ui/card';


const StockManager = () => {
  const [search, setSearch] = useState('');
  const [stocks, setStocks] = useState([
    {
      supplier: 'Beta Co',
      product: 'Pant',
      description: '28 Short Black Cotton',
      category: 'Clothing',
      inStock: 50,
      unitPrice: '₹1000',
    },
    {
      supplier: 'Acme Corp',
      product: 'Laptop',
      description: 'RTX 3050 4GB 512GB 8K Display',
      category: 'Electronics',
      inStock: 30,
      unitPrice: '₹100,000',
    },
  ]);

  const [newStock, setNewStock] = useState({
    supplier: '',
    product: '',
    description: '',
    category: '',
    inStock: '',
    unitPrice: '',
  });

  const filteredStocks = stocks.filter((stock) =>
    Object.values(stock).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

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

    setStocks([...stocks, newStock]);
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
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold mb-4">Stocks</h1>

      <Input
        placeholder="Search by product name or category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full max-w-3xl"
      />

      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Stock</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <Input
            name="supplier"
            placeholder="Supplier"
            value={newStock.supplier}
            onChange={handleChange}
          />
          <Input
            name="product"
            placeholder="Product"
            value={newStock.product}
            onChange={handleChange}
          />
          <Input
            name="description"
            placeholder="Description"
            value={newStock.description}
            onChange={handleChange}
          />
          <Input
            name="category"
            placeholder="Category"
            value={newStock.category}
            onChange={handleChange}
          />
          <Input
            name="inStock"
            type="number"
            placeholder="In Stock"
            value={newStock.inStock}
            onChange={handleChange}
          />
          <Input
            name="unitPrice"
            placeholder="Unit Price"
            value={newStock.unitPrice}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <Button variant="secondary" onClick={addStock}>
            + Add New Stock
          </Button>
        </div>
      </Card>

      <h2 className="text-xl font-semibold mb-2">Current Stock</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Supplier</th>
              <th className="border px-4 py-2">Product</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">In Stock</th>
              <th className="border px-4 py-2">Unit Price</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((stock, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{stock.supplier}</td>
                <td className="border px-4 py-2">{stock.product}</td>
                <td className="border px-4 py-2">{stock.description}</td>
                <td className="border px-4 py-2">{stock.category}</td>
                <td className="border px-4 py-2">{stock.inStock}</td>
                <td className="border px-4 py-2">{stock.unitPrice}</td>
                <td className="border px-4 py-2">
                  <Button variant="ghost" onClick={() => removeStock(index)}>
                    -
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockManager;
