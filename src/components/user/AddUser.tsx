"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { addUser } from "@/app/admin/(others-pages)/users/action";
import { useRouter } from "next/navigation";

export default function AddUser({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  return (
    <div className="fixed inset-0 flex justify-center items-center p-2 sm:p-4 z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => onClose()}
      ></div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative z-10 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Ajouter un Utilisateur</h2>
          <button onClick={() => onClose()}>✖</button>
        </div>

        <Formik
          initialValues={{ name: "", email: "", role: "User", statut: "Actif" }}
          validationSchema={Yup.object({
            name: Yup.string().required("Nom obligatoire"),
            email: Yup.string().email("Email invalide").required("Email obligatoire"),
            role: Yup.string().oneOf(["Admin", "User"]).required("Rôle obligatoire"),
            statut: Yup.string().oneOf(["Actif", "Inactif"]).required("Statut obligatoire"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const result = await addUser(values.name, values.email, values.role, values.statut);

              if (result.success) {
                toast.success("Utilisateur ajouté avec succès !");
                router.push("/admin/users"); // Actualiser la page pour refléter les changements
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
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1">Nom *</label>
                <Field
                  name="name"
                  placeholder="Nom complet"
                  className="w-full border px-3 py-2 rounded"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block mb-1">Email *</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full border px-3 py-2 rounded"
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

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => onClose()}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {isSubmitting ? "Ajout..." : "Valider"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
