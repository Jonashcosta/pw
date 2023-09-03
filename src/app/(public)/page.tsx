"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { User } from "@prisma/client";
async function gtpp() {
  const res = await fetch(`http://localhost:3001/v1.0/api/user/getusers`, {
    method: "GET",
    //   body: JSON.stringify({ email, password, csrfToken }),
    headers: {
      "Content-Type": "application/json"
      //  apikey: `EAAHN7BWTLLkBOZ`
    }
  });
  console.log(res);
  const users = await res.json();

  return users as User[];
}
async function envirForm(email: string, password: string) {
  console.log(email, password);
}
export default function HomePage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "2000",
      email: "ex#ex",
      image: "asdas",
      emailVerified: new Date(),
      name: "jonn",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  return (
    <main className="flex flex-col items-center">
      <div>home</div>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="flex flex-col space-y-5">
              <span>{user.id}</span>
              <span>{user.name}</span>
              <span>{user.email}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {/* <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={state.value}
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form> */}
      </div>

      <div>
        <button
          onClick={async () => {
            const userss = await gtpp();
            console.log(userss);
            setUsers(userss);
          }}
        >
          users
        </button>
      </div>
    </main>
  );
}
