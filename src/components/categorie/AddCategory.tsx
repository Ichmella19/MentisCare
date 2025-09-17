"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { addCategory } from "@/app/admin/(others-pages)/categories/action";


export default function AddPatient({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => onClose()}
      ></div>

      {/* Modal */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg p-4 sm:p-6 relative z-10 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Ajouter une catégorie de maladie </h2>
          <button onClick={() => onClose()}>✖</button>
        </div>

        <Formik
          initialValues={{
            name: "",
           
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Nom obligatoire"),
           
          })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                     try {
                        
                       const result = await addCategory(values.name 

                       );
         
                       if (result.success) {
                         toast.success("Catégorie de maladie ajouté avec succès !");
                         window.location.href = "/admin/categories"; // Actualiser la page pour refléter les changements
                         resetForm();
                         onClose();
         
                       } else {
                         toast.error(result.message || "Erreur lors de l'ajout.");
                       }
                     } catch (error) {
                       console.error("Erreur lors de l'ajout :", error);
                       toast.error("Erreur serveur");
                     } finally {
                       setSubmitting(false);
                     }
                   }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <Field
                name="name"
                placeholder="Nom complet"
                className="w-full border px-3 py-2 rounded"
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}

             
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full sm:w-auto"
                  onClick={() => onClose()}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto"
                >
                  Valider
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
