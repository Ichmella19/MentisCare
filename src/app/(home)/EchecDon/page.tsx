"use client";

import React from "react";
import { XCircle } from "lucide-react";

export default function EchecDon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center p-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <XCircle className="text-red-600 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-bold text-red-700 mb-2">
        Désolé 😔, votre don a échoué
      </h1>
      <p className="text-gray-700">
        Veuillez réessayer, merci de votre compréhension.
      </p>
    </div>
  );
}
