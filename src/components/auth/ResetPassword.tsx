"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Définition des types pour TypeScript
type FormValues = {
  password: string;
  confirmPassword: string;
};

// Schéma de validation avec Yup
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Le mot de passe est requis"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("La confirmation du mot de passe est requise"),
});

export default function ResetPasswordPage() {
  const router = useRouter();

  const initialValues: FormValues = {
    password: "",
    confirmPassword: "",
  };

  // Cette fonction sera appelée si validation OK
  const handleSubmit = async (values: FormValues) => {
    // Tu peux ici appeler une API pour enregistrer le nouveau mot de passe si besoin
    console.log("Nouveau mot de passe :", values.password);


    router.push("/signin");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 flex-1 lg:w-1/2 w-full">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Réinitialiser le mot de passe
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">
                  Nouveau mot de passe
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Entrez le nouveau mot de passe"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">
                  Confirmez le mot de passe
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmez le mot de passe"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#08A3DC] hover:bg-[#0b91c6] text-white py-2 px-4 rounded transition-colors"
              >
                Réinitialiser
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
