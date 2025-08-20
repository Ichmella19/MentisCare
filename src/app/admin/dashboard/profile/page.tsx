"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateProfile , updatePassword } from "./action";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [currentEmail, setCurrentEmail] = useState("");

  // Mettre à jour l'email actuel à partir de la session
  useEffect(() => {
    if (session?.user?.email) {
      setCurrentEmail(session.user.email);
    }
  }, [session]);

  // Schéma Yup pour infos personnelles
  const profileSchema = Yup.object({
    fullName: Yup.string().required("Le nom complet est requis"),
    email: Yup.string().email("Email invalide").required("L'email est requis"),
  });

  //  Schéma Yup pour mot de passe
   const passwordSchema = Yup.object({
     oldPassword: Yup.string().min(6, "Min. 6 caractères"),
     newPassword: Yup.string().min(6, "Min. 6 caractères"),
     confirmPassword: Yup.string().oneOf(
       [Yup.ref("newPassword"), undefined],
       "Les mots de passe doivent correspondre"
     ),
   });// Dans votre composant ProfilePage


  return (
    <div
      className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-md"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>

      {/* Formulaire informations personne!lles */}
      <Formik
  enableReinitialize
  initialValues={{
    fullName: session?.user?.name || "",
    email: currentEmail,
  }}
  validationSchema={profileSchema}
  onSubmit={async (values, { setSubmitting }) => {
    try {
      const result = await updateProfile(currentEmail, {
        name: values.fullName,
        email: values.email,
      });

      if (result.success) {
        toast.success("Profil mis à jour avec succès !");
        if (result.user && result.user.email) {
          setCurrentEmail(result.user.email);
        }

      
      } else {
        toast.error("Erreur : " + result.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    } finally {
      setSubmitting(false);
    }
  }}
>

        {({ isSubmitting }) => (
          <Form className="space-y-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Informations Personnelles</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom Complet</label>
                  <Field type="text" name="fullName" className="w-full p-2 border rounded-md" />
                  <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Field type="email" name="email" className="w-full p-2 border rounded-md" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              >
                {isSubmitting ? "Mise à jour..." : "Mettre à jour le profil"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Formulaire mot de passe */}
      <Formik
  initialValues={{
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }}
  validationSchema={passwordSchema}
  onSubmit={async (values, { setSubmitting, resetForm }) => {
    try {
      const result = await updatePassword(values.oldPassword, values.newPassword);

      if (result.success) {
        toast.success(result.message || "Mot de passe mis à jour avec succès !");
        resetForm();
      } else {
        toast.error(result.error || "Ancien mot de passe incorrect.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    } finally {
      setSubmitting(false);
    }
  }}
>

        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Mot de passe</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ancien mot de passe</label>
                  <Field type="password" name="oldPassword" className="w-full p-2 border rounded-md" />
                  <ErrorMessage name="oldPassword" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
                  <Field type="password" name="newPassword" className="w-full p-2 border rounded-md" />
                  <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Confirmer mot de passe</label>
                  <Field type="password" name="confirmPassword" className="w-full p-2 border rounded-md" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {isSubmitting ? "Mise à jour..." : "Changer le mot de passe"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
