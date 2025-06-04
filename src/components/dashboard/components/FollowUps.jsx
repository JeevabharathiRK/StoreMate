import React, { useEffect, useState } from 'react';

const FollowUpManager = () => {
  const [search, setSearch] = useState('');
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newFollowUp, setNewFollowUp] = useState({
    customerName: '',
    contact: '',
    email: '',
    followUpDate: new Date().toISOString(),
    purpose: '',
    status: '',
  });

  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        const res = await fetch('http://localhost/api/followups/all');
        const data = await res.json();

        const formattedData = data.map((item) => ({
          followUpId: item.followUpId,
          customerName: `${item.customer.customerFirstName} ${item.customer.customerLastName}`,
          contact: item.customer.customerContact,
          email: item.customer.customerEmail,
          followUpDate: item.followUpDate,
          purpose: item.purpose,
          status: item.status,
        }));

        setFollowUps(formattedData);
      } catch (err) {
        setFollowUps([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowUps();
  }, []);

  const filteredFollowUps = followUps.filter((item) =>
    item.customerName.toLowerCase().includes(search.toLowerCase()) ||
    item.contact.toLowerCase().includes(search.toLowerCase()) ||
    item.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFollowUp((prev) => ({ ...prev, [name]: value }));
  };

  const addFollowUp = () => {
    if (!newFollowUp.customerName || !newFollowUp.contact || !newFollowUp.email || !newFollowUp.followUpDate || !newFollowUp.purpose || !newFollowUp.status) {
      alert('Please fill out all fields');
      return;
    }

    setFollowUps([
      ...followUps,
      {
        followUpId: Date.now(),
        ...newFollowUp,
      },
    ]);

    setNewFollowUp({
      customerName: '',
      contact: '',
      email: '',
      followUpDate: '',
      purpose: '',
      status: '',
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Follow-Ups</h1>

      <input
        type="text"
        placeholder="Search by name, contact, or status"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
      />

      <div className="mb-2 text-gray-500">Add New Follow-Up</div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <input
          name="customerName"
          placeholder="Customer Name"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={newFollowUp.customerName}
          onChange={handleChange}
        />
        <input
          name="contact"
          placeholder="Contact"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={newFollowUp.contact}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={newFollowUp.email}
          onChange={handleChange}
        />
        <input
          name="purpose"
          placeholder="Purpose"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={newFollowUp.purpose}
          onChange={handleChange}
        />
        <select
          name="status"
          value={newFollowUp.status}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>
        <button
          className="bg-[#E3D095] hover:bg-[#EFDCAB] text-gray-700 font-semibold px-4 py-2 rounded text-sm col-span-2 md:col-span-2 lg:col-span-1"
          onClick={addFollowUp}
        >
          + Add FollowUp
        </button>
      </div>

      <div className="mb-2 text-gray-500">Follow-Up Records</div>
      <div className="overflow-x-auto rounded-md shadow-sm mb-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Purpose</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Follow-Up Date</th>
              <th className="px-4 py-2">Actions</th>
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
            ) : filteredFollowUps.length > 0 ? (
              filteredFollowUps.map((item, index) => (
                <tr key={item.followUpId || index} className="border-t border-gray-200 text-sm">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.customerName}</td>
                  <td className="px-4 py-2">{item.purpose}</td>
                  <td className="px-4 py-2">{item.email}</td>
                  <td className="px-4 py-2">{item.contact}</td>
                  <td className="px-4 py-2">{item.status}</td>
                  <td className="px-4 py-2">{new Date(item.followUpDate).toLocaleString()}</td>
                  <td className="px-4 py-2" contentEditable>Edit</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                  No follow-ups found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FollowUpManager;
