// import { useState } from "react";

// export default function BillingSales() {
//   const [barcode, setBarcode] = useState("");
//   const [qty, setQty] = useState(1);
//   const [items, setItems] = useState([]);
//   const [customer, setCustomer] = useState({ name: "", phone: "" });

//   const handleBarcodeSubmit = (e) => {
//     e.preventDefault();

//     // Simulated product based on barcode
//     const product = {
//       id: Date.now(),
//       name: `Sample Product ${barcode}`, // you can replace this with actual API data later
//       price: 100,
//       qty: Number(qty),
//     };

//     setItems([...items, product]);
//     setBarcode("");
//     setQty(1);
//   };

//   const handleCustomerChange = (e) => {
//     const { name, value } = e.target;
//     setCustomer({ ...customer, [name]: value });
//   };

//   const handleDelete = (id) => {
//     setItems(items.filter((item) => item.id !== id));
//   };

//   const grandTotal = items.reduce((total, item) => total + item.price * item.qty, 0);

//   const handleBillSubmit = () => {
//     const billData = {
//       items,
//       customer,
//     };
//     console.log("Final Bill:", billData);
//     alert(billData)
//     // Add your API call here
//   };

//   return (
//     <div className="p-6 text-[#1F2937]">
//       <h2 className="text-2xl font-bold mb-4">Billing / Sales</h2>

//       {/* Barcode and Qty Input */}
//       <form onSubmit={handleBarcodeSubmit} className="flex gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Enter Barcode"
//           value={barcode}
//           onChange={(e) => setBarcode(e.target.value)}
//           className="border px-4 py-2 rounded w-[200px]"
//           required
//         />
//         <input
//           type="number"
//           placeholder="Qty"
//           value={qty}
//           onChange={(e) => setQty(e.target.value)}
//           className="border px-4 py-2 rounded w-[100px]"
//           min="1"
//           required
//         />
//         <button type="submit" className="bg-[#1F2937] text-white px-6 py-2 rounded">
//           Add
//         </button>
//       </form>

//       {/* Billing Table */}
//       {items.length > 0 && (
//         <table className="w-full mb-6 border text-left">
//           <thead className="bg-[#F3F4F6]">
//             <tr>
//               <th className="p-2">Item</th>
//               <th className="p-2">Qty</th>
//               <th className="p-2">Price</th>
//               <th className="p-2">Total</th>
//               <th className="p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((prod) => (
//               <tr key={prod.id} className="border-t">
//                 <td className="p-2">{prod.name}</td>
//                 <td className="p-2">{prod.qty}</td>
//                 <td className="p-2">₹{prod.price}</td>
//                 <td className="p-2">₹{prod.qty * prod.price}</td>
//                 <td className="p-2">
//                   <button
//                     onClick={() => handleDelete(prod.id)}
//                     className="text-red-600 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {/* Grand Total Row */}
//             <tr className="font-bold border-t bg-gray-100">
//               <td colSpan="3" className="p-2 text-right">
//                 Grand Total
//               </td>
//               <td className="p-2">₹{grandTotal}</td>
//               <td></td>
//             </tr>
//           </tbody>
//         </table>
//       )}

//       {/* Customer Info */}
//       <div className="mb-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Customer Name"
//           onChange={handleCustomerChange}
//           className="border px-4 py-2 mr-4 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           onChange={handleCustomerChange}
//           className="border px-4 py-2 rounded"
//           required
//         />
//       </div>

//       <button onClick={handleBillSubmit} className="bg-[#2563EB] text-white px-6 py-2 rounded">
//         Submit Bill
//       </button>
//     </div>
//   );
// }





// import { useEffect, useState } from "react";

// export default function BillingSales() {
//   const [barcodeInput, setBarcodeInput] = useState("");
//   const [items, setItems] = useState([]);
//   const [checkoutModal, setCheckoutModal] = useState(false);
//   const [customer, setCustomer] = useState({ fname: "", lname: "", phone: "", address: "", email: "" });

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (document.activeElement.tagName !== "INPUT") {
//         setBarcodeInput((prev) => prev + e.key);
//       }
//     };

//     const handleEnter = (e) => {
//       if (e.key === "Enter" && barcodeInput.trim()) {
//         handleBarcodeSubmit(barcodeInput.trim());
//         setBarcodeInput("");
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleEnter);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleEnter);
//     };
//   }, [barcodeInput]);

//   const handleBarcodeSubmit = (barcode) => {
//     // Simulate fetching product from API
//     const product = {
//       id: Date.now(),
//       sno: items.length + 1,
//       name: `Product ${barcode}`,
//       description: "Sample Description",
//       category: "Category A",
//       qty: 1,
//       price: 100,
//     };

//     setItems([...items, product]);
//   };

//   const handleDelete = (id) => {
//     const updated = items.filter((item) => item.id !== id).map((item, index) => ({ ...item, sno: index + 1 }));
//     setItems(updated);
//   };

//   const handleCustomerChange = (e) => {
//     const { name, value } = e.target;
//     setCustomer({ ...customer, [name]: value });
//   };

//   const grandTotal = items.reduce((total, item) => total + item.price * item.qty, 0);

//   const handleCheckout = () => {
//     if (items.length === 0) return alert("No items to checkout");
//     setCheckoutModal(true);
//   };

//   const handleFinalSubmit = () => {
//     const billData = { items, customer };
//     console.log("Bill Data:", billData);
//     alert("Bill Submitted!");
//     // Add your API call here
//     setCheckoutModal(false);
//     setItems([]);
//     setCustomer({ fname: "", lname: "", phone: "", address: "", email: "" });
//   };

//   return (
//     <div className="p-6 text-[#1F2937]">
//       <h2 className="text-2xl font-bold mb-4">Billing / Sales</h2>

//       {/* Search bar */}
//       <input
//         type="text"
//         placeholder="Search items"
//         className="border px-4 py-2 mb-4 rounded w-1/2"
//         onChange={(e) => {
//           // implement live filter logic if needed
//         }}
//       />

//       <table className="w-full mb-6 border text-left">
//         <thead className="bg-[#F3F4F6]">
//           <tr>
//             <th className="p-2">S.No</th>
//             <th className="p-2">Product Name</th>
//             <th className="p-2">Description</th>
//             <th className="p-2">Category</th>
//             <th className="p-2">Qty</th>
//             <th className="p-2">Price</th>
//             <th className="p-2">Total</th>
//             <th className="p-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.length === 0 ? (
//             <tr>
//               <td colSpan="8" className="text-center p-4 text-gray-500">No items added yet</td>
//             </tr>
//           ) : (
//             items.map((item) => (
//               <tr key={item.id} className="border-t">
//                 <td className="p-2">{item.sno}</td>
//                 <td className="p-2">{item.name}</td>
//                 <td className="p-2">{item.description}</td>
//                 <td className="p-2">{item.category}</td>
//                 <td className="p-2">{item.qty}</td>
//                 <td className="p-2">₹{item.price}</td>
//                 <td className="p-2">₹{item.price * item.qty}</td>
//                 <td className="p-2">
//                   <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       <div className="flex justify-between items-center">
//         <div className="text-xl font-bold">Grand Total: ₹{grandTotal}</div>
//         <button onClick={handleCheckout} className="bg-[#2563EB] text-white px-6 py-2 rounded">
//           Checkout
//         </button>
//       </div>

//       {checkoutModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
//             <h3 className="text-xl font-bold mb-4">Enter Customer Details</h3>
//             <input
//               type="text"
//               name="fname"
//               placeholder="First Name"
//               className="border px-4 py-2 w-full mb-2 rounded"
//               onChange={handleCustomerChange}
//               value={customer.fname}
//             />
//             <input
//               type="text"
//               name="lname"
//               placeholder="Last Name"
//               className="border px-4 py-2 w-full mb-2 rounded"
//               onChange={handleCustomerChange}
//               value={customer.lname}
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               className="border px-4 py-2 w-full mb-2 rounded"
//               onChange={handleCustomerChange}
//               value={customer.phone}
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               className="border px-4 py-2 w-full mb-2 rounded"
//               onChange={handleCustomerChange}
//               value={customer.address}
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               className="border px-4 py-2 w-full mb-4 rounded"
//               onChange={handleCustomerChange}
//               value={customer.email}
//             />
//             <div className="flex justify-between">
//               <button onClick={handleFinalSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
//                 Print & Submit
//               </button>
//               <button onClick={() => setCheckoutModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// import { useEffect, useState } from "react";

// export default function BillingSales() {
//   const [barcodeBuffer, setBarcodeBuffer] = useState("");
//   const [items, setItems] = useState([]);
//   const [showCheckout, setShowCheckout] = useState(false);
//   const [customer, setCustomer] = useState({ fname: "", lname: "", phone: "", address: "", email: "" });

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Enter") {
//         if (barcodeBuffer.trim()) {
//           addItemByBarcode(barcodeBuffer.trim());
//           setBarcodeBuffer("");
//         }
//         e.preventDefault();
//       } else if (/^[a-zA-Z0-9]$/.test(e.key)) {
//         setBarcodeBuffer((prev) => prev + e.key);
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [barcodeBuffer]);

//   const addItemByBarcode = (barcode) => {
//     const product = {
//       id: Date.now(),
//       name: `Product ${barcode}`,
//       description: "Sample description",
//       category: "General",
//       qty: 1,
//       price: 100,
//     };
//     setItems((prevItems) => [...prevItems, product]);
//   };

//   const updateQty = (id, qty) => {
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, qty: Number(qty) } : item
//       )
//     );
//   };

//   const handleDelete = (id) => {
//     setItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const grandTotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);

//   const handleCustomerChange = (e) => {
//     const { name, value } = e.target;
//     setCustomer({ ...customer, [name]: value });
//   };

//   const handleSubmit = () => {
//     const bill = { items, customer };
//     console.log("Final Bill:", bill);
//     setItems([]);
//     setCustomer({ fname: "", lname: "", phone: "", address: "", email: "" });
//     setShowCheckout(false);
//   };

//   return (
//     <div className="p-6 text-[#1F2937]">
//       <h2 className="text-2xl font-bold mb-4">Billing / Sales</h2>

//       {/* Search Field */}
//       <input
//         type="text"
//         placeholder="Search items..."
//         className="mb-4 border px-4 py-2 rounded w-full"
//       />

//       {/* Billing Table */}
//       <table className="w-full mb-6 border text-left">
//         <thead className="bg-[#F3F4F6]">
//           <tr>
//             <th className="p-2">S.No</th>
//             <th className="p-2">Product Name</th>
//             <th className="p-2">Description</th>
//             <th className="p-2">Category</th>
//             <th className="p-2">Qty</th>
//             <th className="p-2">Price</th>
//             <th className="p-2">Total</th>
//             <th className="p-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.length === 0 ? (
//             <tr>
//               <td colSpan="8" className="text-center p-4 text-gray-500">
//                 No items added yet
//               </td>
//             </tr>
//           ) : (
//             items.map((item, index) => (
//               <tr key={item.id} className="border-t">
//                 <td className="p-2">{index + 1}</td>
//                 <td className="p-2">{item.name}</td>
//                 <td className="p-2">{item.description}</td>
//                 <td className="p-2">{item.category}</td>
//                 <td className="p-2">
//                   <input
//                     type="number"
//                     value={item.qty}
//                     min="1"
//                     onChange={(e) => updateQty(item.id, e.target.value)}
//                     className="border px-2 py-1 w-16 rounded"
//                   />
//                 </td>
//                 <td className="p-2">₹{item.price}</td>
//                 <td className="p-2">₹{item.qty * item.price}</td>
//                 <td className="p-2">
//                   <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//           {items.length > 0 && (
//             <tr className="font-bold border-t bg-gray-100">
//               <td colSpan="6" className="p-2 text-right">Grand Total</td>
//               <td className="p-2">₹{grandTotal}</td>
//               <td></td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {items.length > 0 && (
//         <button
//           onClick={() => setShowCheckout(true)}
//           className="bg-[#2563EB] text-white px-6 py-2 rounded"
//         >
//           Checkout
//         </button>
//       )}

//       {/* Checkout Modal */}
//       {showCheckout && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg p-6 w-[400px]">
//             <h3 className="text-xl font-bold mb-4">Customer Details</h3>
//             <input
//               type="text"
//               name="fname"
//               placeholder="First Name"
//               value={customer.fname}
//               onChange={handleCustomerChange}
//               className="border px-4 py-2 rounded w-full mb-2"
//               required
//             />
//             <input
//               type="text"
//               name="lname"
//               placeholder="Last Name"
//               value={customer.lname}
//               onChange={handleCustomerChange}
//               className="border px-4 py-2 rounded w-full mb-2"
//               required
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               value={customer.phone}
//               onChange={handleCustomerChange}
//               className="border px-4 py-2 rounded w-full mb-2"
//               required
//             />
//             <input
//               type="text"
//               name="email"
//               placeholder="Email"
//               value={customer.email}
//               onChange={handleCustomerChange}
//               className="border px-4 py-2 rounded w-full mb-2"
//             />
//             <textarea
//               name="address"
//               placeholder="Address"
//               value={customer.address}
//               onChange={handleCustomerChange}
//               className="border px-4 py-2 rounded w-full mb-4"
//               rows="3"
//               required
//             ></textarea>
//             <button
//               onClick={handleSubmit}
//               className="bg-green-600 text-white px-6 py-2 rounded mr-4"
//             >
//               Print & Submit
//             </button>
//             <button
//               onClick={() => setShowCheckout(false)}
//               className="bg-gray-400 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






// Final code that work well and good 


// import { useEffect, useState } from "react";

// export default function BillingSales() {
//   const [barcodeBuffer, setBarcodeBuffer] = useState("");
//   const [items, setItems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showCheckout, setShowCheckout] = useState(false);
//   const [customer, setCustomer] = useState({ fname: "", lname: "", phone: "", address: "", email: "" });

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Enter") {
//         if (barcodeBuffer.trim()) {
//           addItemByBarcode(barcodeBuffer.trim());
//           setBarcodeBuffer("");
//         }
//         e.preventDefault();
//       } else if (/^[a-zA-Z0-9]$/.test(e.key)) {
//         setBarcodeBuffer((prev) => prev + e.key);
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [barcodeBuffer]);

//   const addItemByBarcode = (barcode) => {
//     const product = {
//       id: Date.now(),
//       barcode,
//       name: `Product ${barcode}`,
//       description: "Sample description",
//       category: "General",
//       qty: 1,
//       price: 100,
//     };
//     setItems((prevItems) => [...prevItems, product]);
//   };

//   const updateQty = (id, qty) => {
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, qty: Number(qty) } : item
//       )
//     );
//   };

//   const handleDelete = (id) => {
//     setItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const grandTotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);

//   const handleCustomerChange = (e) => {
//     const { name, value } = e.target;
//     setCustomer({ ...customer, [name]: value });
//   };

//   const handleSubmit = () => {
//     const bill = { items, customer };
//     console.log("Final Bill:", bill);
//     setItems([]);
//     setCustomer({ fname: "", lname: "", phone: "", address: "", email: "" });
//     setShowCheckout(false);
//   };

//   const filteredItems = items.filter(
//     (item) =>
//       item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6 text-[#1F2937]">
//       <h2 className="text-2xl font-bold mb-4">Billing / Sales</h2>

//       {/* Search Field */}
//       <input
//         type="text"
//         placeholder="Search items in bill..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="mb-4 border px-4 py-2 rounded w-full"
//       />

//       {/* Billing Table */}
//       <table className="w-full mb-6 border text-left">
//         <thead className="bg-[#F3F4F6]">
//           <tr>
//             <th className="p-2">S.No</th>
//             <th className="p-2">Product Name</th>
//             <th className="p-2">Description</th>
//             <th className="p-2">Category</th>
//             <th className="p-2">Qty</th>
//             <th className="p-2">Price</th>
//             <th className="p-2">Total</th>
//             <th className="p-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredItems.length === 0 ? (
//             <tr>
//               <td colSpan="8" className="text-center p-4 text-gray-500">
//                 No matching items found
//               </td>
//             </tr>
//           ) : (
//             filteredItems.map((item, index) => (
//               <tr key={item.id} className="border-t">
//                 <td className="p-2">{index + 1}</td>
//                 <td className="p-2">{item.name}</td>
//                 <td className="p-2">{item.description}</td>
//                 <td className="p-2">{item.category}</td>
//                 <td className="p-2">
//                   <input
//                     type="number"
//                     value={item.qty}
//                     min="1"
//                     onChange={(e) => updateQty(item.id, e.target.value)}
//                     className="border px-2 py-1 w-16 rounded"
//                   />
//                 </td>
//                 <td className="p-2">₹{item.price}</td>
//                 <td className="p-2">₹{item.qty * item.price}</td>
//                 <td className="p-2">
//                   <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//           {filteredItems.length > 0 && (
//             <tr className="font-bold border-t bg-gray-100">
//               <td colSpan="6" className="p-2 text-right">Grand Total</td>
//               <td className="p-2">₹{grandTotal}</td>
//               <td></td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {items.length > 0 && (
//         <button
//           onClick={() => setShowCheckout(true)}
//           className="bg-[#2563EB] text-white px-6 py-2 rounded"
//         >
//           Checkout
//         </button>
//       )}

//       {/* Checkout Modal */}
//       {showCheckout && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg p-6 w-[400px]">
//             <h3 className="text-xl font-bold mb-4">Customer Details</h3>
//             <input
//               type="text"
//               name="fname"
//               placeholder="First Name"
//               value={customer.fname}
//               onChange={handleCustomerChange}
//               className="border px-4 py-2 rounded w-full mb-2"
//               required
//             />
//             <input
//               type="text"
//               name="lname"
//               placeholder="Last Name"
//               value={customer.lname}
//               onChange={handleCustomerChange}
//               className="border px-4 py-2 rounded w-full mb-2"
//               required
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               value={customer.phone}
//               onChange={handleCustomerChange}
//               className="border px-4 py-2 rounded w-full mb-2"
//               required
//             />
//             <input
//               type="text"
//               name="email"
//               placeholder="Email"
//               value={customer.email}
//               onChange={handleCustomerChange}
//               className="border px-4 py-2 rounded w-full mb-2"
//             />
//             <textarea
//               name="address"
//               placeholder="Address"
//               value={customer.address}
//               onChange={handleCustomerChange}
//               className="border px-4 py-2 rounded w-full mb-4"
//               rows="3"
//               required
//             ></textarea>
//             <button
//               onClick={handleSubmit}
//               className="bg-green-600 text-white px-6 py-2 rounded mr-4"
//             >
//               Print & Submit
//             </button>
//             <button
//               onClick={() => setShowCheckout(false)}
//               className="bg-gray-400 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";

export default function BillingSales() {
  const [barcodeBuffer, setBarcodeBuffer] = useState("");
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [manualItem, setManualItem] = useState({
    name: "",
    description: "",
    category: "",
    qty: 1,
    price: 0,
  });
  const [customer, setCustomer] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        if (barcodeBuffer.trim()) {
          addItemByBarcode(barcodeBuffer.trim());
          setBarcodeBuffer("");
        }
        e.preventDefault();
      } else if (/^[a-zA-Z0-9]$/.test(e.key)) {
        setBarcodeBuffer((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [barcodeBuffer]);

  const addItemByBarcode = (barcode) => {
    const product = {
      id: Date.now(),
      barcode,
      name: `Product ${barcode}`,
      description: "Sample description",
      category: "General",
      qty: 1,
      price: 100,
    };
    setItems((prevItems) => [...prevItems, product]);
  };

  const updateQty = (id, qty) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: Number(qty) } : item
      )
    );
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const grandTotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = () => {
    const bill = { items, customer };
    console.log("Final Bill:", bill);
    setItems([]);
    setCustomer({ fname: "", lname: "", phone: "", address: "", email: "" });
    setShowCheckout(false);
  };

  const handleAddManualItem = () => {
    if (!manualItem.name || manualItem.price <= 0 || manualItem.qty <= 0) {
      alert("Please fill all fields with valid values.");
      return;
    }

    const newItem = {
      id: Date.now(),
      ...manualItem,
      barcode: null,
    };

    setItems((prev) => [...prev, newItem]);
    setManualItem({ name: "", description: "", category: "", qty: 1, price: 0 });
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-[#1F2937]">
      <h2 className="text-2xl font-bold mb-4">Billing / Sales</h2>

      {/* Manual Item Entry */}
      <div className="mb-6 border p-4 rounded bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Add Item Manually</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={manualItem.name}
            onChange={(e) => setManualItem({ ...manualItem, name: e.target.value })}
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={manualItem.category}
            onChange={(e) => setManualItem({ ...manualItem, category: e.target.value })}
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={manualItem.description}
            onChange={(e) => setManualItem({ ...manualItem, description: e.target.value })}
            className="border px-4 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={manualItem.price}
            onChange={(e) => setManualItem({ ...manualItem, price: Number(e.target.value) })}
            className="border px-4 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={manualItem.qty}
            onChange={(e) => setManualItem({ ...manualItem, qty: Number(e.target.value) })}
            className="border px-4 py-2 rounded"
          />
          <button
            onClick={handleAddManualItem}
            className="cursor-pointer col-span-2 bg-gray-700 text-white px-4 py-2 rounded text-sm text-white px-6 py-2 rounded"
          >
            Add Manually
          </button>
        </div>
      </div>

      {/* Search Field */}
      <input
        type="text"
        placeholder="Search items in bill..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 border px-4 py-2 rounded w-full"
      />

      {/* Billing Table */}
      <table className="w-full mb-6 border text-left">
        <thead className="bg-[#F3F4F6]">
          <tr>
            <th className="p-2">S.No</th>
            <th className="p-2">Product Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Category</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Price</th>
            <th className="p-2">Total</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center p-4 text-gray-500">
                No matching items found
              </td>
            </tr>
          ) : (
            filteredItems.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.description}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">
                  <input
                    type="number"
                    value={item.qty}
                    min="1"
                    onChange={(e) => updateQty(item.id, e.target.value)}
                    className="border px-2 py-1 w-16 rounded"
                  />
                </td>
                <td className="p-2">₹{item.price}</td>
                <td className="p-2">₹{item.qty * item.price}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
          {filteredItems.length > 0 && (
            <tr className="font-bold border-t bg-gray-100">
              <td colSpan="6" className="p-2 text-right">
                Grand Total
              </td>
              <td className="p-2">₹{grandTotal}</td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>

      {items.length > 0 && (
        <button
          onClick={() => setShowCheckout(true)}
          className="cursor-pointer bg-[#2563EB] text-white px-6 py-2 rounded"
        >
          Checkout
        </button>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="shadow-2xl fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <h3 className="text-xl font-bold mb-4">Customer Details</h3>
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              value={customer.fname}
              onChange={handleCustomerChange}
              className="border px-4 py-2 rounded w-full mb-2"
              required
            />
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              value={customer.lname}
              onChange={handleCustomerChange}
              className="border px-4 py-2 rounded w-full mb-2"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={handleCustomerChange}
              className="border px-4 py-2 rounded w-full mb-2"
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={customer.email}
              onChange={handleCustomerChange}
              className="border px-4 py-2 rounded w-full mb-2"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={customer.address}
              onChange={handleCustomerChange}
              className="border px-4 py-2 rounded w-full mb-4"
              rows="3"
              required
            ></textarea>
            <button
              onClick={handleSubmit}
              className="cursor-pointer bg-green-600 text-white px-6 py-2 rounded mr-4"
            >
              Print & Submit
            </button>
            <button
              onClick={() => setShowCheckout(false)}
              className="cursor-pointer bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
