"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function AddConsultation({onClose}: {onClose: () => void}) {

    
  return <div>
    <div className="fixed inset-0 flex justify-center items-center p-2 sm:p-4 z-50">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => onClose()}
          ></div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg p-4 sm:p-6 relative z-10 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Ajouter un Patient</h2>
              <button onClick={() => onClose()}>✖</button>
            </div>
              <Formik
  initialValues={{
    categorie: "",
    date: "",
    quantite: 0,
    stock: 0,
    statut: "Actif",
  }}
  validationSchema={Yup.object({
    categorie: Yup.string().required("Catégorie obligatoire"),
    date: Yup.date()
      .required("Date obligatoire")
      .typeError("Date invalide"),
    quantite: Yup.number()
      .integer("La quantité doit être un entier")
      .min(0, "Quantité doit être positive")
      .required("Quantité obligatoire"),
    stock: Yup.number()
      .integer("Le stock doit être un entier")
      .min(0, "Stock doit être positif")
      .required("Stock obligatoire"),
    statut: Yup.string()
      .oneOf(["Actif", "Inactif"], "Statut invalide")
      .required("Statut obligatoire"),
  })}
  onSubmit={(values) => {
    console.log("Nouvelle consultation :", values);
    onClose(); // ferme la modal ou le formulaire
  }}
>
  {({ errors, touched }) => (
    <Form className="space-y-4">
      {/* Catégorie */}
      <div>
        <label className="block mb-1">Catégorie *</label>
        <Field
          name="categorie"
          placeholder="Catégorie"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.categorie && touched.categorie && (
          <p className="text-red-500 text-sm">{errors.categorie}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="block mb-1">Date *</label>
        <Field
          type="date"
          name="date"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.date && touched.date && (
          <p className="text-red-500 text-sm">{errors.date}</p>
        )}
      </div>

      {/* Quantité */}
      <div>
        <label className="block mb-1">Quantité *</label>
        <Field
          type="number"
          name="quantite"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.quantite && touched.quantite && (
          <p className="text-red-500 text-sm">{errors.quantite}</p>
        )}
      </div>

      {/* Stock */}
      <div>
        <label className="block mb-1">Stock *</label>
        <Field
          type="number"
          name="stock"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.stock && touched.stock && (
          <p className="text-red-500 text-sm">{errors.stock}</p>
        )}
      </div>

      {/* Statut */}
      <div>
        <label className="block mb-1">Statut *</label>
        <Field as="select" name="statut" className="w-full p-2 border rounded">
          <option value="Actif">Actif ✅</option>
          <option value="Inactif">Inactif ❌</option>
        </Field>
        {errors.statut && touched.statut && (
          <p className="text-red-500 text-sm">{errors.statut}</p>
        )}
      </div>

      {/* Boutons */}
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
  </div>;
}