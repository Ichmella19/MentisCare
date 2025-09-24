/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Formik, Form} from "formik";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { createSuivi } from "@/app/admin/(others-pages)/suiviPatient/action";

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

// Props pour ouvrir/fermer le modal et récupérer le patientId
type AddSuiviProps = {
  patientId: number;
  initialDescription?: string;
  onClose: () => void;
  onSuccess: (newSuivi: any) => void;
};

export default function AddSuivi({ patientId, initialDescription = "", onClose, onSuccess }: AddSuiviProps) {
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState('');
  const [prescript, setPrescript] = useState('');

  // Validation Yup
  const validationSchema = Yup.object({
    // description: Yup.string().required("La description est obligatoire"),
    // prescription: Yup.string().required("La prescription est obligatoire"),
  });

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    if (!file) {
      toast.error("Veuillez sélectionner un fichier.");
      setSubmitting(false);
      return;
    }

    if(value === '' || prescript === ''){
      toast.error("Veuillez remplir tous les champs.");
      setSubmitting(false);
      return;
    }

    const result = await createSuivi({
      patientId,
      // description: values.description,
      // prescription: values.prescription,
      description: value,
      prescription: prescript,
      fichier: file,
    });

    if (result.success) {
      toast.success("Suivi ajouté avec succès !");
      onSuccess(result.data);
      resetForm();
      setFile(null);
      onClose();
    } else {
      toast.error(result.message);
    }

    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Ajouter un suivi</h2>

        <Formik
          initialValues={{ description: initialDescription, prescription: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="block mb-1">Description</label>
                <ReactQuill theme="snow" value={value} onChange={setValue} />

                {/* <Field
                  name="description"
                  as="textarea"
                  rows={3}
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" /> */}
              </div>


              <div>
                <label className="block mb-1">Prescription</label>
                <ReactQuill theme="snow" value={prescript} onChange={setPrescript} />

                {/* <Field
                  name="prescription"
                  type="text"
                  className="w-full border rounded px-2 py-1"
                />
                <ErrorMessage name="prescription" component="div" className="text-red-500 text-sm" /> */}
              </div>

              <div>
                <label className="block mb-1">Fichier</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#08A3DC] text-white rounded hover:bg-[#067aa6]"
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
