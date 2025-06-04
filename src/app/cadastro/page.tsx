"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { auth } from "../../firabase.config";  // certifique que o 'auth' está exportado
import { User, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { CriandoAlunoNoPipefy } from "@/services/service-Aluno";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({
   subsets: ['latin'],
    preload: true,
  weight: ["400"],
 
});

const SignUp = () => {
  const [,setUser] = useState<User | null>(null);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [turma, setTurma] = useState("");
  const [nome, setNome] = useState("");
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !nome || !turma) return alert("Preencha todos os campos.");
    if (password !== passwordConfirm) return alert("As senhas devem ser iguais.");


    try {
      const newUserCredential = await createUserWithEmailAndPassword(email, password);
      if (newUserCredential) {
        const criandoAlunoNoPipefy = await CriandoAlunoNoPipefy(email, nome, turma);

        console.log("Usuário criado:", newUserCredential);
        console.log("Usuário criado no Pipefy:", criandoAlunoNoPipefy);
        router.replace("/");
      }
    } catch (err: any) {
      console.error("Erro ao criar usuário:", err.message);
      alert("Erro ao criar usuário: " + err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });
    return () => unsubscribe();
  }, []);



  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;
      console.log("Usuário logado com Google:", loggedUser.email);
      console.log("Provider data:", result.user.providerData);

      if (loggedUser.email === "-" || !loggedUser.email) {
        alert("Erro: email inválido recebido do Google.");
        return;
      }
      const turmaInicialParaCadastrarNoPipefy = "Vazio"
      const criandoAlunoNoPipefy = await CriandoAlunoNoPipefy(loggedUser.email, loggedUser.displayName, turmaInicialParaCadastrarNoPipefy);
      console.log("Usuário criado no Pipefy:", criandoAlunoNoPipefy);
      router.push("/");
      alert('logando')
    } catch (err) {
      console.log("Erro no login com Google:", err);
      alert("Erro ao fazer login com Google.");
    }
  };

  return (

    <div className={`${poppins.className} min-h-screen flex items-center justify-center`}>
      <div className="w-full max-w-6xl bg-white  h-10/12 max-h-[780px]  rounded-[20px] overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2">
     
        <div className="px-10 py-12 flex flex-col justify-center">

          <h2 className="text-3xl font-semibold mb-2 text-[#030051]">Cadastro</h2>
          <p className="text-gray-600 mb-6">Insira suas credencias para se cadastrar na plataforma</p>

          <div className="flex gap-4 mb-4">
            <button onClick={signInWithGoogle} className="flex items-center justify-center gap-2 border border-gray-400 rounded-2xl cursor-pointer py-3 px-3 w-full text-base  text-gray-900 font-bold hover:bg-gray-100/50">
              <Image src="/Login/google-icon-logo.svg" alt="Google" width={20} height={20} />
              Cadastro com Google
            </button>

          </div>

          <div className="text-center text-sm text-gray-400 mb-6">or</div>

          <form className="flex flex-col gap-4">

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" >
                  Nome
                </label>
                <input
                  type="name"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="John Jone"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />


              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" >
                  turma
                </label>

                <select

                  id="turma"
                  name="turma"
                  value={turma}
                  onChange={(e) => setTurma(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione a turma</option>
                  <option value="MVM2110">MVM2110</option>
                  <option value="MVM2210">MVM2210</option>
                  <option value="MVM3113">MVM3113</option>
                  <option value="MVM3213">MVM3213</option>
                  <option value="MVM4111">MVM4111</option>
                  <option value="MVM4211">MVM4211</option>
                  <option value="MVM5115">MVM5115</option>
                  <option value="MVM5215">MVM5215</option>
                  <option value="MVM6114">MVM6114</option>
                  <option value="MVM6214">MVM6214</option>
                </select>
              </div>

              <div className="w-full px-3 my-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold " >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  className="w-full border border-gray-300 rounded-md px-4 py-3  text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full px-3 my-3 ">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" >
                  Senha
                </label>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="senha"
                  className="w-full border border-gray-300 rounded-md px-4 py-3  text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />


              </div>

              <div className="w-full px-3  ">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" >
                  Confirmar Senha
                </label>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="senha"
                  className="w-full border border-gray-300 rounded-md px-4 py-3  text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full px-3 my-3 ">
                <label className="mt-2 flex items-center text-gray-700 text-sm gap-2">
                  <input
                    type="checkbox"
                    checked={mostrarSenha}
                    onChange={() => setMostrarSenha(!mostrarSenha)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  Mostrar senha
                </label>
              </div>
            </div>


            <button onClick={handleLogin} className="bg-[#FF6F00] text-white py-2 rounded-md cursor-pointer text-sm font-medium hover:bg-[#E36300]">
              Cadastrar
            </button>

          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Não tenho conta <Link href="/login" className="text-blue-500 underline">Login</Link>
          </p>
        </div>

        {/* Right side */}
        <div className=" md:block bg-[#07070F] relative px-10 py-12 flex flex-col align-center justify-center">

          <div className="mb-8">
            <Image
              src="/Login/LogoBranca.svg"
              alt="Logo"
              width={190}
              height={40}
            />
          </div>
          <Image
            src="/Login/switch.svg"
            alt="Dashboard Preview"
            width={400}
            height={500}
            className=" "
          />

        </div>
      </div>
    </div>




  )
}



export default SignUp

