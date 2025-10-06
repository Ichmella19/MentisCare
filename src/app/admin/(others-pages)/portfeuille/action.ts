"use server";

import prisma from "@/lib/db";

const take = 20;

export async function histories(page:number, search:string) {
  const skip = (page - 1) * take;
    const dons = await prisma.don.findMany({
      where:{
        OR:[
          {nom: {contains:search.toLowerCase(), mode: 'insensitive'}},
          {email: {contains:search.toLowerCase(), mode: 'insensitive'}},
          {phone: {contains:search.toLowerCase(), mode: 'insensitive'}},
          {identifiantTransaction: {contains:search.toLowerCase(), mode: 'insensitive'}},
        ]
      },
        orderBy: { createdAt: 'desc' },
        take,
        skip
    });

    const total = await prisma.don.count();
    const sum = await prisma.don.aggregate({
      _sum: {
        montant: true,
      },
    });
    const totalPages = Math.ceil(total / take);

//    
    return { success: true, data: {dons, totalPages, total, sum} };
} 
