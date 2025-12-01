"use client";
import React from "react";

type Suivi = {
  id: number;
  description: string;
  createdAt: string;
  fichier?: string | null;
};

type DetailProcheModalProps = {
  isOpen: boolean;
  onClose: () => void;
  suivi: Suivi | null;
};

export default function DetailProcheModal({ isOpen, onClose, suivi }: DetailProcheModalProps) {
  if (!isOpen || !suivi) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-bold text-[#08A3DC] mb-4">Détails du suivi</h2>
        
        <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
          <strong>Date :</strong> {new Date(suivi.createdAt).toLocaleDateString()}
        </p>
        
        <span className="mb-4 text-sm text-gray-700 dark:text-gray-300">
          <strong>Description :</strong> <div dangerouslySetInnerHTML={{ __html: suivi.description }}></div> 
        </span>

        {suivi.fichier && (
          <a
            href={suivi.fichier}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
          >
            Voir le fichier
          </a>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-[#08A3DC] text-white hover:bg-[#067aa7]"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
