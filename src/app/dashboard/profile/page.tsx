import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (session?.user.name && session.user.image) {
    return (
      <main className="flex w-full h-screen space-x-5 ">
        <div className="flex flex-col ml-4 w-72 h-auto items-center border border-sky-900">
          <div className="items-center ">
            <Image
              className="rounded-full"
              src={session?.user.image}
              alt={session?.user.name}
              width={150}
              height={150}
            />
          </div>
          <div className="bg-black w-60 h-1 my-3 " />
          <div className="w-full px-2">
            <span>Nome:</span>
            <span> {session.user.name}</span>
          </div>
        </div>
        <div>about</div>
      </main>
    );
  } else {
    redirect("/");
  }
}
