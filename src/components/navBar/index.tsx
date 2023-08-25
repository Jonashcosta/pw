"use client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../app/api/auth/[...nextauth]/options";
import Menu from "./menu";
import Image from "next/image";
import LogoNome from "../../assets/logonome.png";
import Link from "next/link";
import Profile from "../profile";
import MobileNav from "./mobile";
import SiginButton from "../auth/button";
import { Disclosure } from "@headlessui/react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Session } from "next-auth";

export type ProfilePROPSType = {
  name: string;
  email: string;
  imageUrl: string;
};

export type ProfileNavigationType = {
  id: string;
  name: string;
  href: string;
};
export default function NavBar() {
  const { data: session } = useSession();
  let navigation = [
    { name: "HOME", href: "/", current: false },
    { name: "CONTATO", href: "/contato", current: false }
  ];

  const profileNull = {
    name: "user",
    email: "email@exemplo.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  };

  const profileNavigationMenu = [
    {
      id: session ? `${session?.user.name}` : "profile",
      name: "Profile",
      href: "/"
    },
    {
      id: "settings",
      name: "Settings",
      href: "/contato"
    }
  ];
  const [profile, setProfile] = useState<ProfilePROPSType>(profileNull);
  const [profileNavigation, setProfileNavigation] = useState<
    ProfileNavigationType[]
  >(profileNavigationMenu);
  useEffect(() => {
    getSessions().then((s) => {
      if (s?.user.name && s?.user.email && s?.user.image) {
        setProfile({
          name: s?.user.name,
          email: s?.user.email,
          imageUrl: s?.user.image
        });
      }
    });
  }, []);
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

          <Profile
            profile={profile as ProfilePROPSType}
            setProfile={
              setProfile as Dispatch<SetStateAction<ProfilePROPSType>>
            }
            profileNavigation={profileNavigation as ProfileNavigationType[]}
            setProfileNavigation={
              setProfileNavigation as Dispatch<
                SetStateAction<ProfileNavigationType[]>
              >
            }
          />
          {/* <MobileNav
            profile={profile}
            profileNavigation={ProfileNavigation}
            navigation={navigation}
            open={open}
          /> */}
        </>
      )}
    </Disclosure>
  );
}

async function getSessions() {
  const session = await getSession();
  return session;
}
