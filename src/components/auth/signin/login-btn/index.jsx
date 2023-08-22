import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ProfileMenu from "@/app/components/navBar/ProfileMenu";
import { Button } from "@material-tailwind/react";
import { Session, getServerSession } from "next-auth";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
export default function SiginButton() {
  const { data: session, status } = useSession();
  if (status == "loading") {
    return <></>;
  }
  if (session) {
    return (
      <>
        <ProfileMenu
          avatar={{
            alt: `${session.user.name}`,
            src: `${session.user.image}`
          }}
        />
      </>
    );
  }
  return (
    <>
      <Button
        variant="text"
        color="blue-gray"
        onClick={() => {
          signIn();
        }}
        className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
      >
        Sign in
      </Button>
      {/* <button onClick={() => signIn()}></button> */}
    </>
  );
}
