import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // ✅ Changed from phone to password
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if(email == 'sekardurai142003@gmail.com' && password =='@Panda094'){
        navigate('/dashboard');
        console.log(`Email: ${email}\nPassword: ${password}`);
        setEmail("");
        setPassword("");
        navigate('/dashboard');
    }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f6f8]">
      <div className="flex flex-col p-6 w-[320px] bg-white shadow-lg rounded-[16px]">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-sm font-bold">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="border border-gray-300 w-full p-2 rounded-[8px] text-[#0f172a]"
            />
          </label>

          <label className="flex flex-col text-sm font-bold">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="border border-gray-300 w-full p-2 rounded-[8px] text-[#0f172a]"
            />
          </label>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition cursor-pointer"
          >
            Login
          </button>
        
        <Link to="/Signup">
          <p className="text-[12px] text-right text-blue-600 hover:underline">Don't have account</p>
        </Link>
        </form>
      </div>
    </div>
  );
}
