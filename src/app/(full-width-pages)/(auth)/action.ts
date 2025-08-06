"use server";
import prisma from "@/lib/db";
import React from "react";

function otpCodeGenerator() {
  return Math.floor(1000 + Math.random() * 9000).toString();  
}

export async function sendOtp(email: string) {

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return { success: false, error: "Utilisateur non trouvé" };
    }

    const otpCode = otpCodeGenerator();

    
  return { success: true };
}