import React, { useState, useEffect } from 'react';

const Suppliers = () => {
  const [search, setSearch] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contact: '',
    address: '',
    email: '',
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetch('http://localhost/api/suppliers');
        const data = await res.json();
        setSuppliers(data);
      } catch (err) {
        setSuppliers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter((s) => {
    return (
      s.supplierName.toLowerCase().includes(search.toLowerCase()) ||
      s.supplierContact.includes(search) ||
      s.supplierEmail.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const addSupplier = () => {
    if (!newSupplier.name || !newSupplier.contact || !newSupplier.address || !newSupplier.email) {
      alert('Please fill out all fields');
      return;
    }

    setSuppliers([
      ...suppliers,
      {
        supplierId: Date.now(),
        supplierName: newSupplier.name,
        supplierContact: newSupplier.contact,
        supplierAddress: newSupplier.address,
        supplierEmail: newSupplier.email,
      },
    ]);

    setNewSupplier({ name: '', contact: '', address: '', email: '' });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Suppliers</h1>

      <input
        type="text"
        placeholder="Search by name, contact, or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
      />

      <div className="mb-2 text-gray-500">Add New Supplier</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <input name="name" placeholder="Name" className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]" value={newSupplier.name} onChange={handleChange} />
        <input name="contact" placeholder="Contact" className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]" value={newSupplier.contact} onChange={handleChange} />
        <input name="email" placeholder="Email" className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]" value={newSupplier.email} onChange={handleChange} />
        <input name="address" placeholder="Address" className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]" value={newSupplier.address} onChange={handleChange} />
        <button className="bg-[#E3D095] hover:bg-[#EFDCAB] text-gray-700 font-semibold px-4 py-2 rounded text-sm col-span-2 md:col-span-4 lg:col-span-1" onClick={addSupplier}>
          + Add Supplier
        </button>
      </div>

      <div className="mb-2 text-gray-500">Supplier List</div>

      {loading ? (
        <div className="flex justify-center items-center h-24">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#4D55CC] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-[#4D55CC] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-[#4D55CC] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          </div>
        </div>
      ) : filteredSuppliers.length === 0 ? (
        <div className="text-center text-gray-500 mt-4">No suppliers found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((s) => (
            <div
              key={s.supplierId}
              className="relative bg-white rounded-lg shadow-lg border border-gray-300 flex flex-col md:flex-row items-center gap-4 p-6"
            >
              <button
                className="absolute top-2 right-2 bg-gray-200 hover:bg-green-700 text-gray-700 hover:text-white rounded-full w-7 h-7 flex items-center justify-center text-2xl font-bold shadow transition-colors p-0"
                title="Edit Supplier"
                onClick={() => setSelectedSupplier(null)}
              >
                <span className="flex items-center justify-center w-full h-full">✍︎</span>
              </button>
              <div className="flex-shrink-0 bg-[#483AA0] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow">
                {s.supplierName?.[0] || '?'}
              </div>
              <div className="flex-1 w-full">
                <div className="font-bold text-lg text-[#483AA0] mb-1">
                  {s.supplierName} <span className="text-[0.6rem]">Id: {s.supplierId}</span>
                </div>
                <div className="grid grid-cols-1 gap-1 text-gray-700 text-sm">
                  <div><span className="font-semibold">Phone:</span> {s.supplierContact}</div>
                  <div><span className="font-semibold">Email:</span> {s.supplierEmail}</div>
                  <div><span className="font-semibold">Address:</span> {s.supplierAddress}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Suppliers;
