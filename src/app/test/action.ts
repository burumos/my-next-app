"use server";

import { ZodError } from "zod";
import { DeleteMemoSchema, SaveMemoSchema } from "./schema";
import { SavePrevStatus } from "./type";
import prisma from "../lib/db";
import { loginUser } from "@/auth";
import { revalidatePath } from "next/cache";

export async function saveMemo(
  prevState: SavePrevStatus,
  formData: FormData
): Promise<SavePrevStatus> {
  const formParams = formDataToObject(formData);
  const parsedParams = SaveMemoSchema.safeParse(formParams);
  if (!parsedParams.success) {
    return {
      message: "error",
      errors: responseErrors(parsedParams.error),
      inputs: formParams,
    };
  }

  const inputData = parsedParams.data;
  let memo = null;
  if (inputData.id) {
    memo = await updateMemo(inputData.content, inputData.id);
  } else {
    memo = await createMemo(inputData.content);
  }
  revalidatePath("/test");
  return {
    message: "success",
    inputs: {
      id: memo.id.toString(),
      content: memo.content,
    },
  };
}

async function createMemo(content: string) {
  const user = await loginUser();
  return await prisma.memo.create({
    data: {
      content,
      userId: user.id,
    },
  });
}

async function updateMemo(content: string, id: number) {
  const user = await loginUser();
  return await prisma.memo.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content,
    },
  });
}

function formDataToObject(formData: FormData) {
  const obj: Record<string, FormDataEntryValue> = {};
  formData.entries().forEach(([k, v]) => (obj[k] = v));
  return obj;
}

function responseErrors(error: ZodError<unknown>) {
  const errors: { [K: string]: string[] } = {};
  error.errors.forEach(({ message, path }) => {
    const key = path.join(".");
    if (!errors[key]) {
      errors[key] = [];
    }
    errors[key] = Array.isArray(errors[key]) ? [] : errors[key];
    errors[key].push(message);
  });
  return errors;
}

export async function fetchMemos() {
  const user = await loginUser();
  await new Promise((resolve) => setTimeout(() => resolve(null), 1000)); ///// test
  return await prisma.memo.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function fetchMemo(id: number) {
  const user = await loginUser();
  return await prisma.memo.findFirst({
    where: {
      userId: user.id,
      id,
    },
  });
}

export async function deleteMemo(prevState: string | undefined, formData: FormData) {
  const parsedParams = DeleteMemoSchema.safeParse({id : formData.get('id')});
  if (!parsedParams.success) {
    return 'fail delete';
  }

  const user = await loginUser();
  await prisma.memo.delete({
    where: {
      userId: user.id,
      id: parsedParams.data.id,
    },
  });

  revalidatePath('/test');
}
