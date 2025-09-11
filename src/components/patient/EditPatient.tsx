"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { editPatient } from "@/app/admin/(others-pages)/patients/action";

type Patient = {
  id: number;
  name: string;
  email: string;
  phone: string;
  adresse: string;
  pays: string;
  sexe: string;
  dateNaissance: string;
  // matricule: string;
};

type EditPatientProps = {
  patient: Patient;
  onClose: () => void;
  onSuccess?: (updatedPatient: Patient) => void;
};

export default function EditPatient({ patient, onClose, onSuccess }: EditPatientProps) {
  return (
    <div className="fixed inset-0 flex justify-center items-center p-2 sm:p-4 z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg p-4 sm:p-6 relative z-10 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Modifier les informations du patient</h2>
          <button onClick={onClose}>✖</button>
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            name: patient.name || "",
            email: patient.email || "",
            phone: patient.phone || "",
            adresse: patient.adresse || "",
            pays: patient.pays || "",
            sexe: patient.sexe || "",
            dateNaissance: patient.dateNaissance || "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Nom obligatoire"),
            email: Yup.string().email("Email invalide").required("Email obligatoire"),
            phone: Yup.string().required("Téléphone obligatoire"),
            adresse: Yup.string().required("Adresse obligatoire"),
            pays: Yup.string().required("Pays obligatoire"),
            sexe: Yup.string().required("Sexe obligatoire"),
            dateNaissance: Yup.string().required("Date de naissance obligatoire"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              const response = await editPatient(
                patient.id,
                values.name,
                values.email,
                values.phone,
                values.adresse,
                values.pays,
                values.sexe,
                values.dateNaissance,
               "1",
                // patient.matricule
              );

              if (response.success) {
                toast.success("Patient mis à jour avec succès !");
                  window.location.href = "/admin/patients";
                if (onSuccess) {
                  onSuccess({
                    ...patient,
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
                placeholder="Nom complet"
                className="w-full border px-3 py-2 rounded"
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}

              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full border px-3 py-2 rounded"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}

              <Field
                name="phone"
                placeholder="Téléphone"
                className="w-full border px-3 py-2 rounded"
              />
              {errors.phone && touched.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}

              <Field
                name="adresse"
                placeholder="Adresse"
                className="w-full border px-3 py-2 rounded"
              />
              {errors.adresse && touched.adresse && (
                <p className="text-red-500 text-sm">{errors.adresse}</p>
              )}

              <Field
                name="pays"
                placeholder="Pays"
                className="w-full border px-3 py-2 rounded"
              />
              {errors.pays && touched.pays && (
                <p className="text-red-500 text-sm">{errors.pays}</p>
              )}

              <Field
                as="select"
                name="sexe"
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Sexe</option>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </Field>
              {errors.sexe && touched.sexe && (
                <p className="text-red-500 text-sm">{errors.sexe}</p>
              )}

              <Field
                type="date"
                name="dateNaissance"
                className="w-full border px-3 py-2 rounded"
              />
              {errors.dateNaissance && touched.dateNaissance && (
                <p className="text-red-500 text-sm">{errors.dateNaissance}</p>
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
