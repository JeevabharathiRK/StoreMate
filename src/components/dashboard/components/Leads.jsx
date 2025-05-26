import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

const Leads = () => {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: 'Emily Clark',
      contact: '(+1)555-777-8888',
      email: 'emily.clark@leadmail.com',
      status: 'New',
      createdAt: '2025-05-21 13:09:02',
    },
    {
      id: 2,
      name: 'Michael Brown',
      contact: '(+1)555-888-9999',
      email: 'michael.brown@leadmail.com',
      status: 'Contacted',
      createdAt: '2025-05-21 13:09:02',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    contact: '',
    email: '',
    status: '',
  });

  const filteredLeads = leads.filter((lead) =>
  Object.values(lead).some((value) =>
    String(value).toLowerCase().includes(searchTerm.toLowerCase())
  )
);


  const handleDelete = (id) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  const handleAddOrUpdate = () => {
    if (!formData.name || !formData.contact || !formData.email || !formData.status) {
      alert('Please fill in all fields');
      return;
    }

    if (formData.id) {
      // Update lead
      setLeads(
        leads.map((lead) =>
          lead.id === formData.id ? { ...formData, createdAt: lead.createdAt } : lead
        )
      );
    } else {
      // Add new lead
      const newLead = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      };
      setLeads([...leads, newLead]);
    }

    setFormData({ id: null, name: '', contact: '', email: '', status: '' });
  };

  const handleEdit = (lead) => {
    setFormData(lead);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Leads</h1>

      <input
        type="text"
        placeholder="Search by lead name, status, or date"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6"
      />

      <div className="mb-2 text-gray-500">Leads</div>

      <div className="overflow-x-auto rounded-md shadow-sm mb-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">S. No</th>
              <th className="px-4 py-2">Lead Name</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead, index) => (
              <tr key={lead.id} className="border-t border-gray-200 text-sm">
                <td className="px-4 py-2">
                  <button
                    className="bg-gray-300 rounded-full px-2"
                    onClick={() => handleDelete(lead.id)}
                  >
                    -
                  </button>
                </td>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{lead.name}</td>
                <td className="px-4 py-2">{lead.contact}</td>
                <td className="px-4 py-2">{lead.email}</td>
                <td className="px-4 py-2">{lead.status}</td>
                <td className="px-4 py-2">{lead.createdAt}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEdit(lead)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Lead Name"
          className="p-2 border rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact"
          className="p-2 border rounded"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Status"
          className="p-2 border rounded"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        />
      </div>

      <div className="flex gap-4">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded text-sm"
          onClick={handleAddOrUpdate}
        >
          {formData.id ? 'Update Lead' : '+ Add Lead'}
        </button>

        {formData.id && (
          <button
            onClick={() => setFormData({ id: null, name: '', contact: '', email: '', status: '' })}
            className="bg-red-500 text-white px-4 py-2 rounded text-sm"
          >
            Cancel Edit
          </button>
        )}

        <button className="flex items-center bg-gray-800 text-white px-4 py-2 rounded">
          <FaUpload className="mr-2" />
          Update
        </button>
      </div>
    </div>
  );
};

export default Leads;
