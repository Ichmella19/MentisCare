"use server";
import { FedaPay, Transaction } from 'fedapay';
import { NextRequest, NextResponse } from 'next/server';
const FEDAPAY_SECRET_KEY = process.env.FEDAPAY_SECRET_KEY;


export const GET = async (req: NextRequest) => {


     const url = new URL(req.url);
  
    // 2. Utiliser searchParams pour lire les paramètres
    const status = url.searchParams.get('status');
    const idString = url.searchParams.get('id');

    try {
        if(status !== "approved"){
            return NextResponse.json({ message: 'Paiement non approuvé' }, { status: 400 })
        }
 /* Remplacez VOTRE_CLE_API par votre véritable clé API */
    FedaPay.setApiKey(FEDAPAY_SECRET_KEY!);

    /* Précisez si vous souhaitez exécuter votre requête en mode test ou live */
    FedaPay.setEnvironment('sandbox'); //ou setEnvironment('live');
        const transaction = await Transaction.retrieve(idString);
        // if (transaction.status == "approved") {
        //     console.log(transaction);
        // }
        
        return NextResponse.json({ message: 'Paiement approuvé', transaction }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Something went wrong ' + error }, { status: 500 })
    }
}