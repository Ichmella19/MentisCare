"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { editCategory } from "@/app/admin/(others-pages)/categories/action";

// ✅ Type Category corrigé pour correspondre à Prisma
type Category = {
  id: number;
  name: string;
  identifiantUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

type EditCategoryProps = {
  category: Category;
  onClose: () => void;
  onSuccess?: (updatedCategory: Category) => void;
};

export default function EditCategory({ category, onClose, onSuccess }: EditCategoryProps) {
  return (
    <div className="fixed inset-0 flex justify-center items-center p-2 sm:p-4 z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg p-4 sm:p-6 relative z-10 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Modifier le nom de la catégorie</h2>
          <button onClick={onClose}>✖</button>
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            name: category.name || "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Nom obligatoire"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              const response = await editCategory(
                category.id,
                values.name,
              );

              if (response.success) {
                toast.success("Catégorie mise à jour avec succès !");
                window.location.href = "/admin/categories";

                if (onSuccess) {
                  onSuccess({
                    ...category,
                    ...values,
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
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <Field
                name="name"
                placeholder="Nom de la catégorie"
                className="w-full border px-3 py-2 rounded"
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}

              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full sm:w-auto"
                  onClick={onClose}
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
