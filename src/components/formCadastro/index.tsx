import Link from "next/link";
import { redirect } from "next/navigation";

export default function FormCadastro() {
  return (
    <>
      <div className="bg-slate-300 border border-slate-500  p-2 rounded-xl shadow-2xl ">
        <form
          className="flex flex-col space-y-1"
          action="http://localhost:3000/api/register"
          method="POST"
        >
          <label>Nome</label>
          <input className="" type="text" placeholder="Jasmin" />
          <label>Email</label>
          <input type="text" placeholder="exemplo@exemplo.com" />
          <label>Senha</label>
          <input type="password" placeholder="********" />
          <div className="flex space-x-2 items-center ">
            <input type="checkbox" />
            <span>
              <Link href={"/termo"}>termo</Link>
            </span>
          </div>
          <input type="submit" value={"Enviar"} />
        </form>
      </div>
    </>
  );
}
