import { object, string } from "zod"
import bcrypt from "bcryptjs"
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

export const genererMatriculeUnique = ()=> {
  // 1. Obtenir un timestamp en millisecondes
  const timestamp = Date.now().toString();

  // 2. Définir l'ensemble des caractères autorisés (majuscules et chiffres)
  const caracteresPermis = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPart = '';
  
  // 3. Générer une chaîne aléatoire de 6 caractères à partir de l'ensemble
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * caracteresPermis.length);
    randomPart += caracteresPermis.charAt(randomIndex);
  }

  // 4. Combiner le timestamp et la partie aléatoire
  const matricule = randomPart+timestamp;
  
  return matricule;
}

export const toSlug = (str: string) => {
  if (!str) {
    return '';
  }

  str = str.toLowerCase();

  // 2. Remplace les caractères accentués par leur équivalent sans accent
  // Note: Pour une gestion plus robuste des accents,
  // vous pouvez utiliser la méthode normalize()
  // ou une bibliothèque externe comme slugify.
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 3. Remplace les caractères non alphanumériques (sauf les tirets et espaces) par des tirets
  str = str.replace(/[^a-z0-9\s-]/g, '');

  // 4. Remplace les espaces et les tirets multiples par un seul tiret
  str = str.replace(/[\s-]+/g, '-');

  // 5. Supprime les tirets au début et à la fin de la chaîne
  str = str.replace(/^-+|-+$/g, '');

  return str;
}