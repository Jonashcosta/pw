import { PrismaClient, Role, User } from "@prisma/client";
const prisma = new PrismaClient();
export type RoleType = {
  id?: string;
  role: string;
};

type UserType = {
  id?: string;
  name: string | null;
  email: string;
  roleId: string;
};
async function main() {
  const admin: RoleType[] = [
    { role: "ADMIN" },
    { role: "CLIENT" },
    { role: "USER" }
  ];
  /** ROLE TABLE */
  console.log("Role Table\n\n");
  admin.map(async (admin) => {
    await prisma.role.upsert({
      where: { role: admin.role },
      update: {},
      create: { role: admin.role }
    });
    console.log(admin);
  });

  /** USER TABBLE */
  console.log("USER Table\n\n");

  const roleAdmin = await prisma.role.findUnique({
    where: { role: admin[0].role }
  });
  // const user: UserType[] = [
  //   {
  //     name: "admin",
  //     email: "exemplo@exemplo.com",
  //     roleId: roleAdmin?.id as string
  //   }
  // ];
  // user.map(async (user) => {
  //   await prisma.user.upsert({
  //     where: { email: user.email },
  //     update: {},
  //     create: { name: user.name, email: user.email, roleId: user.roleId }
  //   });
  //   console.log(user);
  // });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
