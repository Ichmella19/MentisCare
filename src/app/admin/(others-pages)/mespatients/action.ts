"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

 const take = 12

export async function MyPatients(page:number, search:string) {
  const skip = (page - 1) * take;
  const session = await auth();
    const patients = await prisma.patient.findMany({
      where:{
        userId: session?.user?.id,
        OR:[
          {name: {contains:search.toLowerCase(), mode: 'insensitive'}},
          {email: {contains:search.toLowerCase(), mode: 'insensitive'}},
          {phone: {contains:search.toLowerCase(), mode: 'insensitive'}},
          {adresse: {contains:search.toLowerCase(), mode: 'insensitive'}},
          {sexe: {contains:search.toLowerCase(), mode: 'insensitive'}},
          {dateNaissance: {contains:search.toLowerCase(), mode: 'insensitive'}},
          {pays: {contains:search.toLowerCase(), mode: 'insensitive'}},
        ]
      },
        orderBy: { createdAt: 'desc' },
        include: { user: true },
        take,
        skip
    });

    const totalUsers = await prisma.patient.count();
    const totalPages = Math.ceil(totalUsers / take);

//    
    return { success: true, data: {patients, totalPages} };
} 

