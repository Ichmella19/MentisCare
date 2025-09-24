"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ----------------- Types -----------------
type Reservation = {
  // category: any;
  // user: any;
  id: number;
  date: string;
  heureDebut: string;
  heureFin: string;
  quantity: number;
  stock: number;
  createdAt: string;
};

type ReservationForm = {
  nom: string;
  email: string;
  phone: string;
  description: string;
  adresse: string;
};

// ----------------- Validation -----------------
const ReservationSchema = Yup.object().shape({
  nom: Yup.string().required("Nom requis"),
  email: Yup.string().email("Email invalide").required("Email requis"),
  phone: Yup.string().required("Téléphone requis"),
  description: Yup.string().required("Description requise"),
  adresse: Yup.string().required("Adresse requise"),
});

// ----------------- Modal -----------------
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData: Partial<Reservation>;
  onSubmit: (values: ReservationForm) => void;
};

function ModalReservation({ isOpen, onClose,  onSubmit }: ModalProps) {
  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#08A3DC] text-center">
          Prendre rendez-vous
        </h2>

        <Formik
          initialValues={{
            nom: "",
            email: "",
            phone: "",
            description: "",
            adresse: "",
          }}
          validationSchema={ReservationSchema}
          onSubmit={(values) => {
            onSubmit(values);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Nom */}
              <div>
                <label className="block font-medium">Nom</label>
                <Field
                  name="nom"
                  className="w-full p-2 border rounded-md dark:bg-gray-800"
                />
                <ErrorMessage
                  name="nom"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full p-2 border rounded-md dark:bg-gray-800"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block font-medium">Téléphone</label>
                <Field
                  name="phone"
                  className="w-full p-2 border rounded-md dark:bg-gray-800"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium">Description</label>
                <Field
                  name="description"
                  as="textarea"
                  className="w-full p-2 border rounded-md dark:bg-gray-800"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Adresse */}
              <div>
                <label className="block font-medium">Adresse</label>
                <Field
                  name="adresse"
                  className="w-full p-2 border rounded-md dark:bg-gray-800"
                />
                <ErrorMessage
                  name="adresse"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Boutons */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md border"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#08A3DC] text-white rounded-md hover:bg-[#0b91c6]"
                >
                  {isSubmitting ? "En cours..." : "Confirmer"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
// ✅ Export par défaut
export default ModalReservation;