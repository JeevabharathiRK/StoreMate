import React, { useState, useEffect } from 'react';

const Customers = () => {
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [newCustomer, setNewCustomer] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    address: '',
    dob: '',
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('http://localhost/api/customers');
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((cust) => {
    return (
      (cust.customerFirstName && cust.customerFirstName.toLowerCase().includes(search.toLowerCase())) ||
      (cust.customerLastName && cust.customerLastName.toLowerCase().includes(search.toLowerCase())) ||
      (cust.customerContact && cust.customerContact.includes(search)) ||
      (cust.customerEmail && cust.customerEmail.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const addCustomer = () => {
    if (
      !newCustomer.firstName ||
      !newCustomer.lastName ||
      !newCustomer.contact ||
      !newCustomer.email ||
      !newCustomer.address ||
      !newCustomer.dob
    ) {
      alert('Please fill out all fields');
      return;
    }

    setCustomers([
      ...customers,
      {
        customerId: Date.now(),
        customerFirstName: newCustomer.firstName,
        customerLastName: newCustomer.lastName,
        customerContact: newCustomer.contact,
        customerEmail: newCustomer.email,
        customerAddress: newCustomer.address,
        customerDOB: newCustomer.dob,
      },
    ]);

    setNewCustomer({
      firstName: '',
      lastName: '',
      contact: '',
      email: '',
      address: '',
      dob: '',
    });
  };

  const handleEdit = (cust) => {
    setSelectedCustomer(cust);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>

      <input
        type="text"
        placeholder="Search by name, contact, or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
      />

      <div className="mb-2 text-gray-500">Add New Customer</div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <input name="firstName" placeholder="First Name" className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]" value={newCustomer.firstName} onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]" value={newCustomer.lastName} onChange={handleChange} />
        <input name="contact" placeholder="Contact" className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]" value={newCustomer.contact} onChange={handleChange} />
        <input name="email" placeholder="Email" className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]" value={newCustomer.email} onChange={handleChange} />
        <input name="address" placeholder="Address" className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]" value={newCustomer.address} onChange={handleChange} />
        <input name="dob" type="date" placeholder="DOB" className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]" value={newCustomer.dob} onChange={handleChange} />
        <button className="bg-[#E3D095] hover:bg-[#EFDCAB] text-gray-700 font-semibold px-4 py-2 rounded text-sm col-span-2 md:col-span-2 lg:col-span-1" onClick={addCustomer}>
          + Add Customer
        </button>
      </div>

      <div className="mb-2 text-gray-500">Customer List</div>

      {loading ? (
        <div className="flex justify-center items-center h-24">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#4D55CC] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-[#4D55CC] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-[#4D55CC] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          </div>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="text-center text-gray-500 mt-4">No customers found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((cust) => (
            <div
              key={cust.customerId}
              className="relative bg-white rounded-lg shadow-lg border border-gray-300 flex flex-col md:flex-row items-center gap-4 p-6"
            >
              <button
                className="absolute top-2 right-2 bg-gray-200 hover:bg-green-700 text-gray-700 hover:text-white rounded-full w-7 h-7 flex items-center justify-center text-2xl font-bold shadow transition-colors p-0"
                title="Edit Customer"
                onClick={() => setSelectedCustomer(null)}
              >
                <span className="flex items-center justify-center w-full h-full">✍︎</span>
              </button>
              <div className="flex-shrink-0 bg-[#483AA0] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow">
                {cust.customerFirstName?.[0] || "?"}
              </div>
              <div className="flex-1 w-full">
                <div className="font-bold text-lg text-[#483AA0] mb-1">
                  {cust.customerFirstName} {cust.customerLastName} <span className='text-[0.6rem]'>Id: {cust.customerId}</span>
                </div>
                <div className="grid grid-cols-1 gap-1 text-gray-700 text-sm">
                  <div><span className="font-semibold">Phone:</span> {cust.customerContact}</div>
                  <div><span className="font-semibold">Email:</span> {cust.customerEmail}</div>
                  <div><span className="font-semibold">Address:</span> {cust.customerAddress}</div>
                  <div><span className="font-semibold">DOB:</span> {cust.customerDOB}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Customers;
