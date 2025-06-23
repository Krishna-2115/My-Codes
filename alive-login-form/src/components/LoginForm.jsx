import { useState } from "react";

export default function LoginForm() {
  const [uname, setUname] = useState('');
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState('');
  const [btnPos, setBtnPos] = useState('translate-x-0 translate-y-0');

  const positions = [
    "-translate-x-[100%]",
    "-translate-y-[120%]",
    "translate-x-[100%]",
    "translate-y-[120%]",
  ];

  const shiftButton = () => {
    if (!uname || !pass) {
      setMsg('Please fill the input fields before proceeding');
      const currentIndex = positions.indexOf(btnPos);
      const nextIndex = (currentIndex + 1) % positions.length;
      setBtnPos(positions[nextIndex]);
    } else {
      setMsg('Great! Now you can proceed');
      setBtnPos('translate-x-0 translate-y-0');
    }
  };

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (type === 'uname') setUname(value);
    else setPass(value);

    if (value && uname && pass) {
      setMsg('Great! Now you can proceed');
    } else {
      setMsg('');
    }
  };

  return (
    <div className="w-[400px] h-[480px] relative grid">
      <div className="w-[85px] h-[85px] border border-[#2a2a2a] rounded-full bg-[#0e0e0e] text-center text-4xl text-gray-400 grid place-content-center absolute z-10 left-1/2 -translate-x-1/2 -top-10">
        <i className="fa fa-user" />
      </div>
      <form className="bg-[rgba(19,19,19,0.736)] backdrop-blur border border-white/10 rounded-3xl flex flex-col px-6 pt-18 pb-3 w-full absolute bottom-0" onInput={shiftButton}>
        <div className="text-white font-bold text-xl mb-8 text-center">LOGIN</div>
        <div className={`text-sm mb-4 text-center ${uname && pass ? 'text-green-400' : 'text-red-500'}`}>{msg}</div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full bg-transparent border-b border-gray-700 text-gray-200 placeholder-gray-400 outline-none p-2 pr-8"
            value={uname}
            onChange={(e) => handleInputChange(e, 'uname')}
          />
          <i className="fa fa-user absolute right-2 bottom-2 text-sm text-gray-500" />
        </div>

        <div className="relative mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent border-b border-gray-700 text-gray-200 placeholder-gray-400 outline-none p-2 pr-8"
            value={pass}
            onChange={(e) => handleInputChange(e, 'pass')}
          />
          <i className="fa fa-lock absolute right-2 bottom-2 text-sm text-gray-500" />
        </div>

        <div className="flex justify-between text-sm text-gray-400 mb-4">
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="checkbox" className="accent-gray-600" /> Remember me
          </label>
          <a href="#" className="text-gray-500 hover:underline">Forget Password?</a>
        </div>

        <div className="transition-transform duration-300 mb-4 flex justify-center">
          <input
            type="submit"
            value="Login"
            className={`bg-blue-800 text-white font-semibold px-6 py-2 rounded-xl cursor-pointer transform ${btnPos}`}
            disabled={!uname || !pass}
            onMouseOver={shiftButton}
            onTouchStart={shiftButton}
          />
        </div>

        <div className="text-gray-600 text-center">
          Don't have an Account?<a href="#" className="text-blue-500"> Sign up</a>
        </div>
      </form>
    </div>
  );
}
