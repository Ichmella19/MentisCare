"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function EditUser({onClose}: {onClose: () => void}) {

    
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
                initialValues={{ name: "", email: "", role: "User" }}
                validationSchema={Yup.object({
                  name: Yup.string().required("Nom obligatoire"),
                  email: Yup.string()
                    .email("Email invalide")
                    .required("Email obligatoire"),
                  role: Yup.string()
                    .oneOf(["Admin", "User"])
                    .required("Rôle obligatoire"),
                })}
                onSubmit={(values) => {
                  console.log("Nouveau user :", values);
                  onClose();
                }}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-4">
                    <label className="block mb-1">Nom *</label>
                    <Field 
                        name="name"
                        label="Nom complet *"
                        placeholder="Nom complet"
                        className="w-full border px-3 py-2 rounded" 
                    />
                    {errors.name && touched.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                    <label className="block mb-1">Email *</label> 
                    <Field
                        name="email"
                        label="Email *" 
                        type="email"
                        placeholder="Email"
                        className="w-full border px-3 py-2 rounded"
                    /> {errors.email && touched.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                    <div>
                      <label className="block mb-1">Rôle *</label>
                      <Field as="select" name="role" className="w-full p-2 border rounded">
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                      </Field>
                    </div>
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