import { useState } from "react";

const dummyCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    address: "123 Main Street",
    dob: "1990-01-01",
    orders: [{ id: 101, total: 100, date: "2024-05-01", status: "Completed" }],
    payments: [{ amount: 100, date: "2024-05-01", method: "Credit Card", status: "Paid" }],
    tags: ["Regular"],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "9876543210",
    address: "456 Elm Street",
    dob: "1985-03-12",
    orders: [{ id: 102, total: 250, date: "2024-05-10", status: "Pending" }],
    payments: [{ amount: 250, date: "2024-05-10", method: "UPI", status: "Pending" }],
    tags: ["Premium"],
  },
  {
    id: 3,
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "1112223333",
    address: "789 Oak Street",
    dob: "1992-07-24",
    orders: [{ id: 103, total: 180, date: "2024-04-21", status: "Completed" }],
    payments: [{ amount: 180, date: "2024-04-21", method: "Net Banking", status: "Paid" }],
    tags: ["Regular"],
  },
  {
    id: 4,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "4445556666",
    address: "321 Pine Avenue",
    dob: "1988-11-09",
    orders: [{ id: 104, total: 300, date: "2024-05-18", status: "Shipped" }],
    payments: [{ amount: 300, date: "2024-05-18", method: "Credit Card", status: "Paid" }],
    tags: ["Frequent"],
  },
  {
    id: 5,
    name: "Charlie Green",
    email: "charlie@example.com",
    phone: "7778889999",
    address: "654 Maple Lane",
    dob: "1995-09-15",
    orders: [{ id: 105, total: 75, date: "2024-05-20", status: "Cancelled" }],
    payments: [{ amount: 75, date: "2024-05-20", method: "UPI", status: "Refunded" }],
    tags: ["Regular"],
  },
  {
    id: 6,
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    address: "123 Main Street",
    dob: "1990-01-01",
    orders: [{ id: 106, total: 150, date: "2024-06-01", status: "Processing" }],
    payments: [{ amount: 150, date: "2024-06-01", method: "Credit Card", status: "Pending" }],
    tags: ["Returning"],
  },

  {
  id: 7,
  name: "Emily White",
  email: "emily.white@example.com",
  phone: "2223334444",
  address: "12 Cedar Street",
  dob: "1993-08-14",
  orders: [{ id: 107, total: 200, date: "2024-05-25", status: "Completed" }],
  payments: [{ amount: 200, date: "2024-05-25", method: "Debit Card", status: "Paid" }],
  tags: ["Frequent"],
},
{
  id: 8,
  name: "Daniel Lee",
  email: "daniel.lee@example.com",
  phone: "9990001111",
  address: "34 Birch Avenue",
  dob: "1987-12-02",
  orders: [{ id: 108, total: 350, date: "2024-05-28", status: "Processing" }],
  payments: [{ amount: 350, date: "2024-05-28", method: "Net Banking", status: "Pending" }],
  tags: ["VIP"],
},
{
  id: 9,
  name: "Sophia Turner",
  email: "sophia.t@example.com",
  phone: "6667778888",
  address: "90 Spruce Blvd",
  dob: "1990-06-22",
  orders: [{ id: 109, total: 180, date: "2024-05-30", status: "Completed" }],
  payments: [{ amount: 180, date: "2024-05-30", method: "Credit Card", status: "Paid" }],
  tags: ["Premium"],
},
{
  id: 10,
  name: "Michael Scott",
  email: "michael.scott@example.com",
  phone: "1231231234",
  address: "1725 Slough Ave",
  dob: "1975-03-15",
  orders: [{ id: 110, total: 420, date: "2024-05-31", status: "Shipped" }],
  payments: [{ amount: 420, date: "2024-05-31", method: "UPI", status: "Paid" }],
  tags: ["Regular"],
},
{
  id: 11,
  name: "Laura King",
  email: "laura.king@example.com",
  phone: "8889990000",
  address: "44 Riverwalk Rd",
  dob: "1994-10-10",
  orders: [{ id: 111, total: 120, date: "2024-06-02", status: "Cancelled" }],
  payments: [{ amount: 120, date: "2024-06-02", method: "Debit Card", status: "Refunded" }],
  tags: ["New"],
},
{
  id: 12,
  name: "Chris Nolan",
  email: "chris.n@example.com",
  phone: "3334445555",
  address: "98 Harbor Way",
  dob: "1980-05-05",
  orders: [{ id: 112, total: 300, date: "2024-06-03", status: "Completed" }],
  payments: [{ amount: 300, date: "2024-06-03", method: "Cash", status: "Paid" }],
  tags: ["Frequent"],
},
{
  id: 13,
  name: "Grace Kim",
  email: "grace.kim@example.com",
  phone: "4443332221",
  address: "76 Blossom Lane",
  dob: "1991-11-19",
  orders: [{ id: 113, total: 275, date: "2024-06-04", status: "Processing" }],
  payments: [{ amount: 275, date: "2024-06-04", method: "Credit Card", status: "Pending" }],
  tags: ["Returning"],
},
{
  id: 14,
  name: "Liam Johnson",
  email: "liam.j@example.com",
  phone: "5554443332",
  address: "23 Sunset Drive",
  dob: "1989-02-20",
  orders: [{ id: 114, total: 400, date: "2024-06-05", status: "Completed" }],
  payments: [{ amount: 400, date: "2024-06-05", method: "UPI", status: "Paid" }],
  tags: ["VIP"],
},
{
  id: 15,
  name: "Olivia Martinez",
  email: "olivia.m@example.com",
  phone: "6665554443",
  address: "11 Lighthouse Point",
  dob: "1996-04-11",
  orders: [{ id: 115, total: 90, date: "2024-06-06", status: "Shipped" }],
  payments: [{ amount: 90, date: "2024-06-06", method: "Debit Card", status: "Paid" }],
  tags: ["Regular"],
},
{
  id: 16,
  name: "Ethan Wright",
  email: "ethan.w@example.com",
  phone: "7776665554",
  address: "88 Horizon Street",
  dob: "1993-01-08",
  orders: [{ id: 116, total: 260, date: "2024-06-07", status: "Completed" }],
  payments: [{ amount: 260, date: "2024-06-07", method: "Credit Card", status: "Paid" }],
  tags: ["Loyal"],
}

];

export default function Customers() {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = dummyCustomers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Customers</h2>

      <input
        type="text"
        placeholder="Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 border px-4 py-2 rounded w-full"
      />

      <table className="w-full border text-left mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id} className="border-t">
              <td className="p-2">{customer.name}</td>
              <td className="p-2">{customer.email}</td>
              <td className="p-2">{customer.phone}</td>
              <td className="p-2">
                <button
                  onClick={() => setSelectedCustomer(customer)}
                  className="cursor-pointer text-blue-600 hover:underline"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Popup */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="cursor-pointer absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4">{selectedCustomer.name}</h3>
            <p className="mb-2">📧 {selectedCustomer.email}</p>
            <p className="mb-2">📞 {selectedCustomer.phone}</p>
            <p className="mb-2">🏠 {selectedCustomer.address}</p>
            <p className="mb-4">🎂 {selectedCustomer.dob}</p>

            <div className="mb-4">
              <h4 className="font-semibold">🛍️ Orders</h4>
              {selectedCustomer.orders?.length ? (
                <ul className="list-disc ml-5">
                  {selectedCustomer.orders.map((o) => (
                    <li key={o.id}>
                      #{o.id} - ₹{o.total} on {o.date} [{o.status}]
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders</p>
              )}
            </div>

            <div className="mb-4">
              <h4 className="font-semibold">💳 Payments</h4>
              {selectedCustomer.payments?.length ? (
                <ul className="list-disc ml-5">
                  {selectedCustomer.payments.map((p, index) => (
                    <li key={index}>
                      ₹{p.amount} on {p.date} via {p.method} [{p.status}]
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No payments</p>
              )}
            </div>

            <div className="mb-4">
              <h4 className="font-semibold">🏷️ Tags</h4>
              {selectedCustomer.tags?.length ? (
                <p>{selectedCustomer.tags.join(", ")}</p>
              ) : (
                <p>No tags</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
