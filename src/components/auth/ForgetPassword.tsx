"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

const validationSchema = Yup.object({
  email: Yup.string().email("Email invalide").required("Ce champ est requis"),
});

const initialValues = {
  email: "",
};

export default function ForgetPasswordPage() {
  const router = useRouter();

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);


    setTimeout(() => {
      toast.success("Un code de vérification a été envoyé par email !");
      router.push("/otp"); 
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-semibold text-center text-black dark:text-white">
            Mot de passe oublié
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
            Entrez votre adresse e-mail pour recevoir un code de réinitialisation.
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-700 dark:text-white"
                >
                  Adresse e-mail
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="exemple@mail.com"
                  className={`w-full px-4 py-2 border rounded-md bg-transparent dark:text-white ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-[#08A3DC] text-white rounded hover:bg-[#0b91c6] transition"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer le code"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <Link href="/signin" className="text-[#08A3DC] hover:underline">
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}
