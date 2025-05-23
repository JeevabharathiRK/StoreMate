import { useState } from 'react';
import { Link, Links } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nRole: ${role}`);
    setEmail("")
    setName("")
    setPhone("")
    setRole("")
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f6f8]">
      <div className="flex flex-col p-6 w-[320px] bg-white shadow-lg rounded-[16px]">
        <h2 className="text-2xl font-bold text-center mb-6 ">Signup</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <label className="flex flex-col text-sm font-bold">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name'
              required
              className="border border-gray-300 w-full p-2 rounded-[8px] text-[#0f172ac6] font-stretch-condensed"
            />
          </label>

          <label className="flex flex-col text-sm font-bold">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Email'
              className="border border-gray-300 w-full p-2 rounded-[8px] text-[#0f172ac6] font-stretch-condensed"
              />
          </label>

          <label className="flex flex-col text-sm font-bold">
            Phone
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g 9876543210"
              pattern="[0-9]{10}"
              title="Phone number should be 10 digits"
              required
              className="border border-gray-300 w-full p-2 rounded-[8px] text-[#0f172ac6] font-stretch-condensed"
             />
          </label>

          <div>
            <span className="text-sm block mb-2 font-bold">Role</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 font-bold">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-4 h-4 accent-blue-600"
                />
                Admin
              </label>
              <label className="flex items-center gap-2 font-bold">
                <input
                  type="radio"
                  name="role"
                  value="staff"
                  checked={role === 'staff'}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-4 h-4 accent-blue-600"
                />
                Staff
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition cursor-pointer"
          >
            Submit
          </button>

          <Link to="/">
            <p className="text-[12px] text-right text-blue-600 hover:underline">Already have an account?</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
