'use client';
import { SessionProvider } from 'next-auth/react';
interface PROPS {
  session: string;
}
export default function Provider({ session, children }: any) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
