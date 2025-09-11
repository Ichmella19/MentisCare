"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { editUser } from "@/app/admin/(others-pages)/users/action";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  statut: boolean;
};

export default function EditUser({
  user,
  onClose,
  onSuccess,
}: {
  user: User;
  onClose: () => void;
  onSuccess?: (updatedUser: User) => void;
}) {
  return (
    <div className="fixed inset-0 flex justify-center items-center p-2 sm:p-4 z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Modifier les informations de cet utilisateur</h2>
          <button onClick={onClose}>✖</button>
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            name: user.name || "",
            email: user.email || "",
            role: "User",
            statut:  "Inactif",

          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Nom obligatoire"),
            email: Yup.string().email("Email invalide").required("Email obligatoire"),
            role: Yup.string().oneOf(["Admin", "User"]).required("Rôle obligatoire"),
            statut: Yup.string().oneOf(["Actif", "Inactif"]).required("Statut obligatoire"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              const response = await editUser(
                user.id,
                values.name,
                values.email,
                values.role,
                values.statut === "Actif"
              );

              if (response.success) {
                toast.success("Utilisateur mis à jour avec succès !");
                window.location.href = "/admin/users";
                
                // Appel de onSuccess si fourni pour mettre à jour la liste
                if (onSuccess) {
                  onSuccess({
                    ...user,
                    name: values.name,
                    email: values.email,
                    role: values.role,
                    statut: values.statut === "Actif",
                  });
                }

                onClose();
              } else {
                toast.error(response.message || "Erreur lors de la mise à jour.");
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
            <Form className="space-y-4">
              <div>
                <label className="block mb-1">Nom *</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Nom complet"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block mb-1">Email *</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block mb-1">Rôle *</label>
                <Field as="select" name="role" className="w-full p-2 border rounded">
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </Field>
              </div>

              <div>
                <label className="block mb-1">Statut *</label>
                <Field as="select" name="statut" className="w-full p-2 border rounded">
                  <option value="Actif">Actif</option>
                  <option value="Inactif">Inactif</option>
                </Field>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {isSubmitting ? "Mise à jour..." : "Valider"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
