import "./App.css";
import { QrCode, EyeOff, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Qrcode from './assets/QRCode.png';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login efetuado com sucesso!");
        navigate("/dashboard");
      } else {
        alert(`Erro: ${data.error}`);
      }
    } catch {
      console.log("Erro geral");
    }
  };

  return (
    <>
      <div className=" bg-white lg:flex">
        <section className="h-screen lg:w-[50%] flex justify-center items-center px-8">
          <main className="flex flex-col gap-2">
            <div className="flex items-center justify-center">
              <QrCode className="text-[#684557] " size={64} />
            </div>
            <h1 className="text-center font-semibold text-2xl lg:text-3xl pt-4">
              Vamos continuar
            </h1>
            <h4 className="text-black/50 text-center">
              Bem-vindo de volta ao SnapQR - Vamos gerar QRCodes?
            </h4>
            <div className="bg-[#68455775] h-0.5 rounded-md  my-5"></div>

            <label htmlFor="e-mail" className="text-md">
              E-mail
            </label>
            <input
              id="e-mail"
              type="email"
              placeholder="seuemail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md bg-transparent p-2 border border-[#d6d2b5] focus:outline-none focus:border-[#684557] hover:border-[#684557] shadow-sm focus:shadow transition duration-100"
            />

            <label htmlFor="password" className="text-md">
              Senha
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md bg-transparent p-2 pr-10 border border-[#d6d2b5] focus:outline-none focus:border-[#684557] hover:border-[#684557] shadow-sm focus:shadow transition duration-100"
                placeholder="******"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#684557] hover:text-[#513443] transition"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            <button
              onClick={handleLogin}
              className="flex items-center justify-center gap-1 py-2 px-5 rounded-md mt-2 duration-200 text-sm bg-gradient-to-r from-[#2e1b25] to-[#684557]  text-white cursor-pointer hover:brightness-110"
            >
              Entrar na conta
            </button>
            <p className="text-black/50 text-center">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="text-[#181818] transition duration-100 hover:text-black hover:underline hover:transition hover:duration-300"
              >
                Registre aqui
              </Link>
            </p>
          </main>
        </section>
        <section className="hidden lg:flex bg-[#684557] h-screen w-[50%]">
          <img className="w-[100%]" src={Qrcode} alt="" />
        </section>
      </div>
    </>
  );
};

export default Login;
