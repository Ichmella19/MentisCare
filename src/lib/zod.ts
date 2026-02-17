import { object, string } from "zod"
import bcrypt from "bcrypt"
import prisma from "./db";
 
export const signInSchema = object({
  email: string({ message: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ message: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const saltAndHashPassword = async (password: string): Promise<string> => {
  const pwd = await bcrypt.hash(password, 10);
  return pwd;
}

export const getUserFromDb = async (email: string, password: string) => {

  const user =  await prisma.user.findUnique({
    where: { email},
  });

  if(user && await bcrypt.compare(password, user.password!)) {
    return user
  }
  return null;
  // Placeholder for demonstration purposes
}