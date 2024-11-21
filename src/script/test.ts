import { SaveMemoSchema } from "@/app/test/schema";

function main() {
  const parsedParams = SaveMemoSchema.safeParse({
    id: 'xxx',
    content: 'a'.repeat(101),
  });
  if (!parsedParams.success) {
    const errors: {[K: string]: string[]} = {};
    parsedParams.error.errors.forEach(({message, path}) => {
      const key = path.join('.');
      if (!errors[key]) {
        errors[key] = [];
      }
      errors[key] = Array.isArray(errors[key]) ? [] : errors[key];
      errors[key].push(message);
    })
    console.log('validate error', errors);
  }
  console.log('pass');
}

main();