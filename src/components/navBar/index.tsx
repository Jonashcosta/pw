"use client";
import Menu from "./menu";
import Image from "next/image";
import LogoNome from "../../assets/logonome.png";
import Link from "next/link";
import Profile from "../profile";
import MobileNav from "./mobile";
import SiginButton from "../auth/button";
import { Disclosure } from "@headlessui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { sign } from "crypto";

export default function NavBar() {
  const { data: session } = useSession();
  let navigation = [
    { name: "HOME", href: "/", current: false },
    { name: "CONTATO", href: "/contato", current: false }
  ];
  const profile = {
    name: session ? `${session?.user.name}` : "user",
    email: session ? `${session?.user.email}` : "email@exemplo.com",
    imageUrl: session
      ? `${session?.user.image}`
      : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  };

  const ProfileNavigation = [
    {
      id: "profile",
      name: "Profile",
      href: "/"
    },
    {
      id: "settings",
      name: "Settings",
      href: "/contato"
    }
  ];
  return (
    <Disclosure as="nav" className="bg-gray-200 w-full h-20 flex  ">
      {({ open }) => (
        <>
          <div className="flex items-center justify-center">
            <Link className="mx-5 " href={"/"}>
              <Image
                priority={true}
                src={LogoNome}
                height={100}
                alt="POWERCOM NETWORK"
              />
            </Link>
          </div>

          <Menu navigation={navigation} />

          <Profile profile={profile} profileNavigation={ProfileNavigation} />
          <MobileNav
            profile={profile}
            profileNavigation={ProfileNavigation}
            navigation={navigation}
            open={open}
          />
        </>
      )}
    </Disclosure>
  );
}
