"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function AddPatient({onClose}: {onClose: () => void}) {

    
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
                             name: "",
                             mail: "",
                             phone: "",
                             adresse: "",
                             sexe: "",
                             dateNaissance: "",
                           }}
                           validationSchema={Yup.object({
                             name: Yup.string().required("Nom obligatoire"),
                             mail: Yup.string()
                               .email("Email invalide")
                               .required("Email obligatoire"),
                             phone: Yup.string().required("Téléphone obligatoire"),
                             adresse: Yup.string().required("Adresse obligatoire"),
                             sexe: Yup.string().required("Sexe obligatoire"),
                             dateNaissance: Yup.string().required(
                               "Date de naissance obligatoire"
                             ),
                           })}
                           onSubmit={(values) => {
                             console.log("Nouveau patient :", values);
                         
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
             
                               <Field
                                 name="mail"
                                 type="email"
                                 placeholder="Email"
                                 className="w-full border px-3 py-2 rounded"
                               />
                               {errors.mail && touched.mail && (
                                 <p className="text-red-500 text-sm">{errors.mail}</p>
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
                                 <p className="text-red-500 text-sm">
                                   {errors.dateNaissance}
                                 </p>
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
  </div>;
}