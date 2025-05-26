import React, { useState } from 'react';
import { Button } from '../../ui/button';

const initialFollowUps = [
  {
    id: 1,
    name: 'Emily',
    purpose: 'Check satisfaction after recent purchase',
    contact: 'emily.clark@leadmail.com',
    status: 'Pending',
    date: '2025-05-21 13:09:02',
  },
  {
    id: 2,
    name: 'Michael',
    purpose: 'Offer discount on clothing',
    contact: 'michael.brown@leadmail.com',
    status: 'Done',
    date: '2025-05-21 13:09:02',
  },
];

const FollowUps = () => {
  const [followUps, setFollowUps] = useState(initialFollowUps);
  const [search, setSearch] = useState('');

  // Form state for new lead inputs
  const [newLead, setNewLead] = useState({
    name: '',
    purpose: '',
    contact: '',
    status: 'Pending',
  });

  const filteredFollowUps = followUps.filter((followUp) =>
    Object.values(followUp).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(search.toLowerCase())
    )
  );

  // Handle input changes for the new lead form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addFollowUp = () => {
    // Simple validation (you can improve it as needed)
    if (
      !newLead.name.trim() ||
      !newLead.purpose.trim() ||
      !newLead.contact.trim() ||
      !newLead.status.trim()
    ) {
      alert('Please fill all fields.');
      return;
    }

    const newFollowUp = {
      id: followUps.length + 1,
      name: newLead.name,
      purpose: newLead.purpose,
      contact: newLead.contact,
      status: newLead.status,
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };

    setFollowUps([...followUps, newFollowUp]);
    // Clear form after adding
    setNewLead({ name: '', purpose: '', contact: '', status: 'Pending' });
  };

  const removeFollowUp = (id) => {
    setFollowUps(followUps.filter((f) => f.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">FollowUps</h1>

      <input
        type="text"
        placeholder="Search by customer name or status or purpose"
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2 className="text-xl mb-2">Add New Lead</h2>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
        <input
          name="name"
          value={newLead.name}
          onChange={handleInputChange}
          placeholder="Customer Name"
          className="border p-2 rounded"
        />
        <input
          name="purpose"
          value={newLead.purpose}
          onChange={handleInputChange}
          placeholder="Purpose"
          className="border p-2 rounded"
        />
        <input
          name="contact"
          value={newLead.contact}
          onChange={handleInputChange}
          placeholder="Contact Email"
          className="border p-2 rounded"
        />
        <select
          name="status"
          value={newLead.status}
          onChange={handleInputChange}
          className="border p-2 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>
        <Button variant="secondary" onClick={addFollowUp}>
          + Add Lead
        </Button>
      </div>

      <h2 className="text-xl mb-2">Follow Ups</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">S. No</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Purpose</th>
            <th className="border px-4 py-2">Contact</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {filteredFollowUps.map((f, index) => (
            <tr key={f.id} className="text-center">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{f.name}</td>
              <td className="border px-4 py-2">{f.purpose}</td>
              <td className="border px-4 py-2">{f.contact}</td>
              <td className="border px-4 py-2">{f.status}</td>
              <td className="border px-4 py-2">{f.date}</td>
              <td className="border px-4 py-2">
                <Button variant="ghost" onClick={() => removeFollowUp(f.id)}>
                  -
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FollowUps;
