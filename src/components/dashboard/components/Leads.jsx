import React, { useState, useEffect } from 'react';

const LeadManager = () => {
  const [search, setSearch] = useState('');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddingLead, setIsAddingLead] = useState(false);

  const [newLead, setNewLead] = useState({
    leadName: '',
    contact: '',
    email: '',
    leadFrom: '',
    status: '',
    createdAt: ''
  });

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('http://localhost/api/leads/all');
        const data = await res.json();
        setLeads(data);
      } catch (err) {
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((lead) =>
    lead.leadName?.toLowerCase().includes(search.toLowerCase()) ||
    lead.contact?.toLowerCase().includes(search.toLowerCase()) ||
    lead.status?.toLowerCase().includes(search.toLowerCase()) ||
    (lead.leadFrom && lead.leadFrom?.toLowerCase().includes(search.toLowerCase()))
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLead((prev) => ({ ...prev, [name]: value }));
  };

  const uploadLead = async (data) =>{
    try{
      const payload = {
        leadName : data.leadName,
        contact : data.contact,
        leadFrom : data.leadFrom,
        email : data.email,
        status : data.status,
        createdAt : new Date().toISOString()
      };
      const res = await fetch(`http://localhost/api/leads/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        throw new Error(`Failed to upload Lead`);
      }

      const feed = await res.json();
      console.log(`Upload Success : `, feed);
      return feed;
    } catch(err){
      console.error("Upload failed:", err.message);
      alert("Upload failed: " + err.message);
      return null;
    }

  }

  const addLead = async () => {
    if (!newLead.leadName || !newLead.contact || !newLead.email || !newLead.status || !newLead.leadFrom) {
      alert('Please fill out all fields');
      return;
    }
    setIsAddingLead(true);

    const lead = await uploadLead(newLead);
    console.log(lead);
    setLeads([...leads, lead]);

    setNewLead({
      leadName: '',
      contact: '',
      email: '',
      leadFrom: '',
      status: '',
    });
    setIsAddingLead(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Leads</h1>

      <input
        type="text"
        placeholder="Search by name, contact, status or source"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
      />

      <div className="mb-2 text-gray-500">Add New Lead</div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <input
          name="leadName"
          placeholder="Name"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={newLead.leadName}
          onChange={handleChange}
        />
        <input
          name="contact"
          placeholder="Contact"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={newLead.contact}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={newLead.email}
          onChange={handleChange}
        />
        <input
          name="leadFrom"
          placeholder="Lead From"
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
          value={newLead.leadFrom}
          onChange={handleChange}
        />
        <select
          name="status"
          value={newLead.status}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg outline-none focus:border-[#483AA0] focus:ring-1 focus:ring-[#483AA0]"
        >
          <option value="">Select Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
        </select>
        <button
          className="flex items-center justify-center gap-2 bg-[#E3D095] hover:bg-[#EFDCAB] text-gray-700 font-semibold px-4 py-2 rounded text-sm col-span-2 md:col-span-2 lg:col-span-1 disabled:bg-[#EFDCAB] border border-transparent disabled:border-[#E3D095] disabled:cursor-not-allowed"
          disabled={isAddingLead}
          onClick={addLead}
        >
          {isAddingLead ? (
            <div className="w-24 h-1 relative overflow-hidden rounded mt-[0.50rem] mb-[0.50rem]">
              <div className="absolute left-0 h-full w-1/3 bg-[#fff] rounded animate-[loadBar_1.5s_linear_infinite]"></div>
            </div>
          ) : (
            "+ Add Lead"
          )}
        </button>
      </div>

      <div className="mb-2 text-gray-500">Current Leads</div>
      <div className="overflow-x-auto rounded-md shadow-sm mb-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Lead From</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created At</th>
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
            ) : filteredLeads.length > 0 ? (
              filteredLeads.map((lead, index) => (
                <tr key={lead.leadId || index} className="border-t border-gray-200 text-sm">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{lead.leadName}</td>
                  <td className="px-4 py-2">{lead.contact}</td>
                  <td className="px-4 py-2">{lead.email}</td>
                  <td className="px-4 py-2">{lead.leadFrom}</td>
                  <td className="px-4 py-2">{lead.status}</td>
                  <td className="px-4 py-2">{new Date(lead.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadManager;
