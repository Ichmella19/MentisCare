"use server";
import prisma from "@/lib/db";
import sgMail from "@sendgrid/mail";
import bcrypt from "bcryptjs";

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
  
      sgMail.setApiKey(process.env.KEY_SENDGRID!);
        const otp = otpCodeGenerator()

        // Création du message
        const sendGridMail = {
            to: user.email,
            from: "ichmellatognide@gmail.com",
            templateId: "d-3e3c19f799484fcf93504667a50b2775",
            dynamic_template_data: {
                code: otp,
            },
        };

        const expires = new Date();
        expires.setHours(expires.getHours() + 1);

        await prisma.verificationToken.create({
            data: {
                identifier: user.id,
                token: otp,
                expires,
            },
        })

        // SendGrid
        try {
            await sgMail.send(sendGridMail);
            return { success: true, message: "OTP envoyé avec succès" };
        } catch (error) {
          if (error && typeof error === "object" && "response" in error && error.response && typeof error.response === "object" && "body" in error.response) {
          
            console.error("Erreur lors de l'envoi de l'OTP", error);
          }
            return { success: false, error: "Erreur lors de l'envoi de l'OTP" };
        }
}

export async function confirmOtp(email: string, otp: string) {
   const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return { success: false, error: "Utilisateur non trouvé" };
    }

    const token = await prisma.verificationToken.findFirst({
        where: {
            identifier: user.id,
            token: otp,
            expires: {
                gte: new Date(),
            },
        },
        orderBy: {  createdAt: "desc" },
    });
    
    if (!token) {
        return { success: false, error: "Code OTP invalide ou expiré" };
    }

    await prisma.verificationToken.delete({
        where: {
            identifier_token: {
                identifier: user.id,
                token: otp,
            }
        }
    });

    return { success: true, message: "OTP confirmé avec succès" };
    
}
export async function update(email: string, password: string) {

    const hashedPassword = await bcrypt.hash(password, 10);

    
    await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
    });

    return { success: true, message: "Mot de passe mis à jour avec succès" };
   
}