import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  session: {
    strategy: "jwt"

    // strategy: "database"
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development"
};

// import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { db } from "@/lib/prisma";
// import { PrismaClient } from "@prisma/client";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";

// const BaseURL = process.env.BACK_END_URL;
// const backEndVersion = process.env.BACK_END_VERSION;
// const prisma = new PrismaClient();
// const prismaAdapter = PrismaAdapter(prisma);
// export const authOptions: NextAuthOptions = {
//   // Configure one or more authentication providers
//   adapter: PrismaAdapter(prismaAdapter),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "email",
//           type: "email",
//           placeholder: "exemplo@exemplo.com"
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "*********"
//         }
//       },
//       async authorize(credentials: any, req: any) {
//         console.log(credentials);
//         const { email, password, csrfToken } = credentials;
//         const data = JSON.stringify(email, password, csrfToken);
//         const res = await fetch("https://api.github.com/users/Jonashcosta", {
//           method: "GET",
//           // body: JSON.stringify(credentials),
//           headers: { "Content-Type": "application/json" }
//         });
//         const ress = await fetch(`http://localhost:3001/v1.0/api/user/verify`, {
//           method: "POST",
//           body: JSON.stringify(csrfToken, email, password),
//           headers: {
//             "Content-Type": "application/json",
//             apikey: `EAAHN7BWTLLkBOZ`
//           }
//         })
//           .then((response) => response.json()) // converter para json
//           .then((json) => console.log(json)) //imprimir dados no console
//           .catch((err) => console.log("Erro de solicitação", err));

//         const usera = res.body;
//         console.log(usera);
//         console.log("data", data);

//         const user = await res.json();
//         // If no error and we have user data, return it
//         const resUser = {
//           id: user.id,
//           name: user.login,
//           email: "jonashonoratocosta@gmail.com",
//           image: user.avatar_url
//         };

//         if (res.ok && user) {
//           return resUser;
//         }

//         // Return null if user data could not be retrieved
//         return null;
//       }
//     })
//   ],

//   session: {
//     strategy: "jwt"
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: process.env.NODE_ENV === "development"

//   // pages: {
//   //   signIn: '/signin',
//   // },
// };

// //   url: 'https://accounts.google.com/o/oauth2/v2/auth?client_id=508629591199-jhlrlof63kljhsajrp9acur93rqs2hk8.apps.googleusercontent.com&scope=openid%20email%20profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fgoogle&state=iHMr5wSrvNQSAYHhrFfL8SKg8eQl68qTn-SeSX3k-Ak&code_challenge=AECm2agAf77-Cn4suC7181Jb5QEcbiZXdpxCjAPpcSs&code_challenge_method=S256',
// //   cookies: [
// //     {
// //       name: 'next-auth.state',
// //       value: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..4BmInpt_2BhgVRFA.OUH5B2BqnnjOahe3KzFxomoKyVXkWbZuitvdefFNwgi8H-K-_d4T4lXszwoxOQ5X03mzgBbnA5e4PmsqyGoQPqPZfnjLAttQeUNsmXDRC2nuE9WRZLbpUEuaUER0AbsBGMX8Yef21gm4tHmrBVqZYok1t_Dt_YJObEsZEFl7Obcf06Pixdo.OzX-zb-Xh4Vrtojeu_iv2A',
// //       options: [Object]
// //     },
// //     {
// //       name: 'next-auth.pkce.code_verifier',
// //       value: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..FcVlYHAMUSvpTo5H.pshvgH3KQ2VfZTMnt3B8_MdfQWf2gLgJu0Rmgenf66s2hMnyl9rmsvMHcnvXjXD9BcoExVSP2kiN0_lSO3qMFoaKQ7k7WwHJIbCHsxnmlZ107fRHNR6S5K48UvpVqLg3Y08mReLIcNO-cTU1Shr6EraMaYj-e9t4cKs9VtfBeZrrxAYt39A.vKBosLh1nETRkRVjvaYpRw',
// //       options: [Object]
// //     }
// //   ],
// //   provider: {
// //     id: 'google',
// //     name: 'Google',
// //     type: 'oauth',
// //     wellKnown: 'https://accounts.google.com/.well-known/openid-configuration',
// //     authorization: { params: [Object] },
// //     idToken: true,
// //     checks: [ 'pkce', 'state' ],
// //     profile: [Function: profile],
// //     style: {
// //       logo: '/google.svg',
// //       logoDark: '/google.svg',
// //       bgDark: '#fff',
// //       bg: '#fff',
// //       text: '#000',
// //       textDark: '#000'
// //     },
// //     clientId: '508629591199-jhlrlof63kljhsajrp9acur93rqs2hk8.apps.googleusercontent.com',
// //     clientSecret: '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',
// //     signinUrl: 'http://localhost:3000/api/auth/signin/google',
// //     callbackUrl: 'http://localhost:3000/api/auth/callback/google'
// //   }
// // }
// // [next-auth][debug][PROFILE_DATA] {
// //   OAuthProfile: {
// //     iss: 'https://accounts.google.com',
// //     azp: '508629591199-jhlrlof63kljhsajrp9acur93rqs2hk8.apps.googleusercontent.com',
// //     aud: '508629591199-jhlrlof63kljhsajrp9acur93rqs2hk8.apps.googleusercontent.com',
// //     sub: '103029249276319434222',
// //     email: 'jonashonoratocosta@gmail.com',
// //     email_verified: true,
// //     at_hash: 'SPoSDLJFdUbBBKCh6PoRHQ',
// //     name: 'jonas honorato',
// //     picture: 'https://lh3.googleusercontent.com/a/AAcHTtfR_4Bu0JZiCBvKRc7L5V3T1kofYS0pF_uAyOdGY-h3wA=s96-c',
// //     given_name: 'jonas',
// //     family_name: 'honorato',
// //     locale: 'pt-BR',
// //     iat: 1693742963,
// //     exp: 1693746563
// //   }
// // }
// // [next-auth][debug][OAUTH_CALLBACK_RESPONSE] {
// //   profile: {
// //     id: '103029249276319434222',
// //     name: 'jonas honorato',
// //     email: 'jonashonoratocosta@gmail.com',
// //     image: 'https://lh3.googleusercontent.com/a/AAcHTtfR_4Bu0JZiCBvKRc7L5V3T1kofYS0pF_uAyOdGY-h3wA=s96-c'
// //   },
// //   account: {
// //     provider: 'google',
// //     type: 'oauth',
// //     providerAccountId: '103029249276319434222',
// //     access_token: 'ya29.a0AfB_byD7sDrvjSN_iCMrU8FO81qCXCQReIdKfGvPfzcg0P3b0NjsqCxbPlqCOdou44FVYFP0kK9RA78LYo0HMXLjlJrkDKqQSRvCTK1ej-kFVb72WwkZNqifZXZti3s4OafusiLuHdCcvqTeu4D0dOS8-hZxYtlHkEuLY-IaCgYKAekSARMSFQHsvYlsdybIubXZl44BKYyAdY2mhA0174',
// //     expires_at: 1693746562,
// //     scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
// //     token_type: 'Bearer',
// //     id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTExNDEwNTlhMTliMjE4MjA5YmM1YWY3YTgxYTcyMGUzOWI1MDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1MDg2Mjk1OTExOTktamhscmxvZjYza2xqaHNhanJwOWFjdXI5M3JxczJoazguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1MDg2Mjk1OTExOTktamhscmxvZjYza2xqaHNhanJwOWFjdXI5M3JxczJoazguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDMwMjkyNDkyNzYzMTk0MzQyMjIiLCJlbWFpbCI6ImpvbmFzaG9ub3JhdG9jb3N0YUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlNQb1NETEpGZFViQkJLQ2g2UG9SSFEiLCJuYW1lIjoiam9uYXMgaG9ub3JhdG8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZlJfNEJ1MEpaaUNCdktSYzdMNVYzVDFrb2ZZUzBwRl91QXlPZEdZLWgzd0E9czk2LWMiLCJnaXZlbl9uYW1lIjoiam9uYXMiLCJmYW1pbHlfbmFtZSI6Imhvbm9yYXRvIiwibG9jYWxlIjoicHQtQlIiLCJpYXQiOjE2OTM3NDI5NjMsImV4cCI6MTY5Mzc0NjU2M30.PUfTLIBKbLyKhNWaal8m2Czmaf_SeUjme7cEnmcB3d7Qnfl7-YI2ndA_pW8tyF2xMD_u01qed1nE_edtpvno5UwHpo1f3U0aCgq1NXb9OMqtx7-b7qiJQnsWTfr3IzqtHPb1bbaqetnViViG25OQZBUU3TkONFrfdmy4SN4-2ePSxeErQ92CB-yINAUYpl9kmioUWQ4kCyexqJc2JSPg_QjA43hAQXAIgbnAWTZUt-UYXDi2tWcngc7TVUC183PMyaKuuHi1DAJFnzCSr9VRrFyqR1DTmX1RAc7ZUzqkrHaauP5Jf-i_SJdKWNo7cQIlzgXNSv9YygLKw_qnE2XiFQ'
// //   },
// //   OAuthProfile: {
// //     iss: 'https://accounts.google.com',
// //     azp: '508629591199-jhlrlof63kljhsajrp9acur93rqs2hk8.apps.googleusercontent.com',
// //     aud: '508629591199-jhlrlof63kljhsajrp9acur93rqs2hk8.apps.googleusercontent.com',
// //     sub: '103029249276319434222',
// //     email: 'jonashonoratocosta@gmail.com',
// //     email_verified: true,
// //     at_hash: 'SPoSDLJFdUbBBKCh6PoRHQ',
// //     name: 'jonas honorato',
// //     picture: 'https://lh3.googleusercontent.com/a/AAcHTtfR_4Bu0JZiCBvKRc7L5V3T1kofYS0pF_uAyOdGY-h3wA=s96-c',
// //     given_name: 'jonas',
// //     family_name: 'honorato',
// //     locale: 'pt-BR',
// //     iat: 1693742963,
// //     exp: 1693746563
// //   }
// // }
