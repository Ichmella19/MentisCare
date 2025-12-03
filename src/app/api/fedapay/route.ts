"use server";
import prisma from '@/lib/db';
import { FedaPay, Transaction } from 'fedapay';
import { NextRequest, NextResponse } from 'next/server';
import { createNotification } from '@/lib/notification';

const FEDAPAY_SECRET_KEY = process.env.FEDAPAY_SECRET_KEY;


export const GET = async (req: NextRequest) => {


    const url = new URL(req.url);

    // 2. Utiliser searchParams pour lire les paramètres
    const status = url.searchParams.get('status');
    const idString = url.searchParams.get('id');

    try {
        if (status !== "approved") {
            return NextResponse.json({ message: 'Paiement non approuvé' }, { status: 400 })
        }
        /* Remplacez VOTRE_CLE_API par votre véritable clé API */
        FedaPay.setApiKey(FEDAPAY_SECRET_KEY!);

        /* Précisez si vous souhaitez exécuter votre requête en mode test ou live */
        FedaPay.setEnvironment('sandbox'); //ou setEnvironment('live');
        const transaction = await Transaction.retrieve(idString);
        if (transaction.status == "approved") {

            const don = await prisma.don.create({
                data: {
                    nom: transaction.custom_metadata.name,
                    email: transaction.custom_metadata.email,
                    phone: transaction.custom_metadata.phone,
                    montant: transaction.amount,
                    modePaiement: "FedaPay",
                    identifiantTransaction: transaction.id.toString(),
                }
            })

            // Notify all admins
            const admins = await prisma.user.findMany({
                where: { role: "ADMIN" }
            });

            for (const admin of admins) {
                await createNotification(
                    admin.id,
                    "Nouveau don reçu",
                    `Un don de ${transaction.amount} a été reçu de ${transaction.custom_metadata.name}.`,
                    "DONATION",
                    `/admin/donations`
                );
            }

            return NextResponse.redirect(new URL('/SuccesDon', req.url))
        }
        return NextResponse.redirect(new URL('/EchecDon', req.url))

    } catch (error) {
        console.error(error)
        return NextResponse.redirect(new URL('/EchecDon', req.url))
    }
}