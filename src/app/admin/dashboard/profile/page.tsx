"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ProfilePage() {
  // ✅ Schéma de validation Yup
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Le nom complet est requis"),
    email: Yup.string()
      .email("Email invalide")
      .required("L'email est requis"),
    phone: Yup.string().required("Le téléphone est requis"),
    oldPassword: Yup.string().min(6, "Min. 6 caractères"),
    newPassword: Yup.string().min(6, "Min. 6 caractères"),
    confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword")],
      "Les mots de passe doivent correspondre"
    )
    .optional(),
  });

  return (
    <div
      className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-md"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>

      <Formik
        initialValues={{
          fullName: "Admin ADMIN",
          email: "admin@gmail.com",
          phone: "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("✅ Données envoyées :", values);
          alert("Profil mis à jour avec succès !");
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Informations personnelles */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                Informations Personnelles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nom Complet
                  </label>
                  <Field
                    type="text"
                    name="fullName"
                    className="w-full p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Téléphone
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    className="w-full p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  Email 
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded-md"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              >
                Changer les Informations
              </button>
            </div>

            {/* Mot de passe */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Mot de passe</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Ancien mot de passe
                  </label>
                  <Field
                    type="password"
                    name="oldPassword"
                    className="w-full p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="oldPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nouveau mot de passe
                  </label>
                  <Field
                    type="password"
                    name="newPassword"
                    className="w-full p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirmer mot de passe
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="w-full p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Changer le mot de passe
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
