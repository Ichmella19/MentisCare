"use client";
/* eslint-disable react/no-unescaped-entities */

import { useRouter } from "next/navigation";
import React, { useRef } from "react";

export default function OTPPage() {
  const router = useRouter();

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; 
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus(); // Focus sur le champ suivant
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (
      e.key === "Backspace" &&
      !(e.target as HTMLInputElement).value &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus(); // Retour au champ précédent si on supprime
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    router.push("/reset");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 flex-1 lg:w-1/2 w-full">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Vérification OTP</h2>
        <p className="text-gray-600 text-center mb-6">
          Entrez le code que vous avez reçu par email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between gap-2">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => { inputRefs.current[index] = el; }}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center border rounded text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#08A3DC] hover:bg-[#0b91c6] text-white font-medium py-2 px-4 rounded mt-6"
              onClick={() => router.push("/reset")}>
            Vérifier le code
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Vous n'avez pas reçu de code ?{" "}
          <span className="text-[#08A3DC] hover:underline cursor-pointer">
            Renvoyer
          </span>
        </p>
      </div>
    </div>
  );
}
