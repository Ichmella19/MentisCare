"use server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

const take = 10; // Nombre d'utilisateurs par page

export async function listUsers(page: number, search:string) {
    const skip = (page - 1) * take;
    const users = await prisma.user.findMany({
        where:{
            OR:[
                {name: {contains:search.toLowerCase(), mode: 'insensitive'}},
                {email: {contains:search.toLowerCase(), mode: 'insensitive'}}
            ]
        },
        orderBy: { createdAt: 'desc' },
        take,
        skip,
    });

    const totalUsers = await prisma.user.count();
    const totalPages = Math.ceil(totalUsers / take);

//    
    return { success: true, data: {users, totalPages} };

}


export async function addUser(name: string, email: string, role: string, statut: string) {

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        return { success: false, message: "Un utilisateur avec cet email existe déjà." };
    }

    console.log("Adding user with email:", email);

    await prisma.user.create({
        data: {
        name,
        email,
        password: await bcrypt.hash(email, 10), // Mot de passe par défaut, à changer après
        role : role === "Admin" ? "ADMIN" : "USER",
        statut: statut == "Actif" ? true : false,
        },
    });
    
    return { success: true, message: "Utilisateur ajouté avec succès." };
}

export async function editUser(id: string, name: string, email: string, role: string, statut: boolean) {
    
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        return { success: false, message: "Utilisateur non trouvé." };
    }

    if (user.email !== email) {
        const emailTaken = await prisma.user.findUnique({
            where: { email },
        });
        if (emailTaken) {
            return { success: false, message: "Un utilisateur avec cet email existe déjà." };
        }
    }

    await prisma.user.update({
        where: { id },
        data: {
        name,
        email,
        role : role === "Admin" ? "ADMIN" : "USER",
     statut,
        },
    });
    
    return { success: true, message: "Utilisateur mis à jour avec succès." };
}
export async function deleteUser(id: string) {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        return { success: false, message: "Utilisateur non trouvé." };
    }

    await prisma.user.delete({
        where: { id },
    });
    
    return { success: true, message: "Utilisateur supprimé avec succès." };
}