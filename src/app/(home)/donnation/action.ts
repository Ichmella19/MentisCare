"use server";
import { FedaPay, Transaction } from 'fedapay';

const FEDAPAY_SECRET_KEY = process.env.FEDAPAY_SECRET_KEY;

export async function generateFedaLink(name: string, email: string, phone: string, amount: string) {
    
    console.log("Génération du lien FedaPay avec :", { name, email, phone, amount });

    if(!FEDAPAY_SECRET_KEY){
           return { success: false, message: "Clé API non définie" };

    }
    /* Remplacez VOTRE_CLE_API par votre véritable clé API */
    FedaPay.setApiKey(FEDAPAY_SECRET_KEY);

    /* Précisez si vous souhaitez exécuter votre requête en mode test ou live */
    FedaPay.setEnvironment('sandbox'); //ou setEnvironment('live');

    /* Créer la transaction */
    const transaction = await Transaction.create({
    description: 'Description',
    name,
    email: email,
    phone: phone,
    amount,
    callback_url: process.env.URL+'api/fedapay',
    currency: {
        iso: 'XOF'
    },
    custom_metadata:  {
            name, email, phone
        }
    });

    const token = await transaction.generateToken();
    console.log(token.url);

    return { success: true, url: token.url };
  
}