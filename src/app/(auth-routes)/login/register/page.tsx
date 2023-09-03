import FormCadastro from "@/components/formCadastro";

export default function LoginPage() {
  return (
    <>
      <div>
        <span className="text-black text-2xl font-serif hover:text-warning-200">
          Faça o seu Cadastro
        </span>
        <div>
          <FormCadastro />
        </div>
        <div className="text-black">google</div>
      </div>
    </>
  );
}
