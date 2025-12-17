"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccesDon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center p-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
       <Link
          href="/"
          className="absolute top-5 left-5 text-sm text-black  transition-colors hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
        >
        
          Retour à  l’accueil
        </Link>
      <CheckCircle className="text-green-600 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-bold text-green-700 mb-2">
        Votre don a bien été effectué !
      </h1>
      <p className="text-gray-700">
        Merci beaucoup , l’équipe <strong>MentisCare</strong> vous remercie pour votre don.
      </p>
    </div>
  );
}
