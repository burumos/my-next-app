import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

type Account = {
  name: string;
  loginId: string;
  password: string;
};

const prisma = new PrismaClient();

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

function getAccountFromArgv(): Account | undefined {
  const [, , loginId, password, name] = process.argv;
  if (!loginId || !password) {
    return;
  }

  return {
    name: name || loginId,
    loginId,
    password,
  };
}

async function main() {
  const account = getAccountFromArgv();
  if (!account) {
    console.log(
      "Please input loginId and password \n npx src/script/createUser.ts <loginId> <password> (<name>)"
    );
    return;
  }

  const user = await prisma.user.create({
    data: {
      name: account.name,
      loginId: account.loginId,
      password: await hashPassword(account.password),
    },
  });
  console.log(user, { passowrd: account.password });
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
