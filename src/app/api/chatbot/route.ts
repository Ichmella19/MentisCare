import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Instructions système pour le chatbot de santé mentale
const SYSTEM_PROMPT = `Tu es un assistant bienveillant spécialisé en santé mentale et bien-être émotionnel. Tes responsabilités sont :

1. ÉCOUTE EMPATHIQUE : Toujours écouter avec compassion et validation des émotions
2. SOUTIEN POSITIF : Encourager et offrir des perspectives constructives
3. RESSOURCES : Suggérer des techniques de gestion (respiration, méditation, exercice)
4. LIMITES : Tu n'es PAS un thérapeute professionnel. Recommande toujours de consulter un professionnel pour des problèmes graves
5. CONFIDENTIALITÉ : Rassure sur la confidentialité des échanges
6. FOCUS : Refuse poliment de discuter de sujets hors santé mentale

Indicateurs d'urgence (TOUJOURS recommander aide professionnelle immédiate) :
- Pensées suicidaires
- Comportements d'automutilation
- Crise psychologique aiguë
- Violence envers soi ou autrui

Pour la France, numéros d'urgence à mentionner si nécessaire :
- 3114 : Numéro national de prévention du suicide (24h/24)
- 15 : SAMU (urgences médicales)
- SOS Amitié : 09 72 39 40 50

Ton ton : Chaleureux, empathique, professionnel mais accessible.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages invalides" },
        { status: 400 }
      );
    }

    // Vérification de la clé API
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY non configurée");
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    // Initialiser Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Gratuit jusqu'à 15 requêtes/minute
      systemInstruction: SYSTEM_PROMPT,
    });

    // Convertir le format des messages pour Gemini
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "assistant" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    // Créer une session de chat
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    });

    // Envoyer le message et obtenir la réponse
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    const assistantMessage = response.text();

    return NextResponse.json({
      message: assistantMessage,
    });
  } catch (error: any) {
    console.error("Erreur dans l'API chat:", error);

    // Gestion des erreurs spécifiques Gemini
    if (error?.message?.includes("API key")) {
      return NextResponse.json(
        {
          error: "Clé API invalide",
          message: "Vérifiez votre clé API Gemini.",
        },
        { status: 401 }
      );
    }

    if (error?.message?.includes("quota") || error?.message?.includes("rate limit")) {
      return NextResponse.json(
        {
          error: "Limite de requêtes atteinte",
          message: "Trop de requêtes. Veuillez réessayer dans quelques instants.",
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        error: "Une erreur s'est produite",
        message:
          "Je suis désolé, je rencontre des difficultés techniques. Pouvez-vous réessayer dans un instant ?",
      },
      { status: 500 }
    );
  }
}