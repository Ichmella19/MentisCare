  "use client";
  /* eslint-disable react/no-unescaped-entities */
  import Link from "next/link";
  import React, { useState } from "react";
  import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
  import * as Yup from "yup";
  import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";

  type DonationValues = {
    name: string;
    email: string;
    phone: string;
    amount: number | "";
    donationType: "one-time" | "monthly";
  };

  export default function DonationPage() {
    const [preset, setPreset] = useState<number | null>(80);

    const initialValues: DonationValues = {
      name: "",
      email: "",
      phone: "",
      amount: 80,
      donationType: "one-time",
    };

    const validationSchema = Yup.object({
      name: Yup.string().required("Le nom est obligatoire"),
      email: Yup.string().email("Email invalide").required("L'email est obligatoire"),
      phone: Yup.string()
        .matches(/^[\d+().\s-]{6,}$/, "Numéro invalide")
        .required("Le numéro est obligatoire"),
      amount: Yup.number()
        .typeError("Veuillez entrer un montant valide")
        .min(1, "Le montant doit être au moins 1 FCFA")
        .required("Le montant est obligatoire"),
      donationType: Yup.string().oneOf(["one-time", "monthly"]).required(),
    });

    const handleSubmit = async (
      values: DonationValues,
      { setSubmitting }: FormikHelpers<DonationValues>
    ) => {
      setSubmitting(true);
      try {
        // TODO: Appel API / traitement paiement
        console.log("Données du don :", values);
        alert(`Merci ! Don reçu : ${values.amount} €`);
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la soumission");
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="min-h-screen text-black dark:text-white bg-white dark:bg-black" style={{ fontFamily: "Montserrat, sans-serif" }}
  >
        {/* Logo (espace réservé en haut) */}
        <div className="absolute top-6 left-6 right-6 z-50 flex justify-between items-center">
    {/* Logo */}
    <Link href="/" className="md:flex items-center hidden ">
      <img
        src="/assets/images/Light1.png"
        alt="Logo clair"
        className="w-28 md:w-32 lg:w-36 object-contain cursor-pointer block dark:hidden"
      />
      <img
        src="/assets/images/Dark1.png"
        alt="Logo sombre"
        className="w-28 md:w-32 lg:w-36 object-contain cursor-pointer hidden dark:block"
      />
    </Link>
    <ThemeToggleButton />
  </div>


        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        
          <div
            className="relative hidden md:block"
           
          >
          
            <div className="absolute "></div>

            <div className="relative z-10 h-full flex flex-col justify-center px-12 py-20">
              <h1 className="text-4xl lg:text-5xl font-extrabold  leading-tight max-w-lg">
                Agissez pour la santé mentale — soutenez MentisCare
              </h1>
              <p className="mt-6 text-lg max-w-lg">
                Aidez-nous à offrir un accompagnement psychologique de qualité aux patients du <span className="font-bold">centre Saint Camille de Tokan.</span>
                Votre contribution financera des consultations, des suivis adéquats et le soutien aux patients.
              </p>

              <div className="mt-8 border dark:border-white/30 border-black/10 p-4 rounded-lg max-w-xs ">
                <p className="text-sm">Faire un don — choisissez le montant à droite.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-6">
            <div className="w-full max-w-md  rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-1">
                Votre don sécurisé
              </h2>
              <p className="text-sm  mb-4">
                Soutenez MentisCare — choisissez un montant et finalisez votre don.
              </p>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue, isSubmitting }) => (
                  <Form>
                    <div className="flex gap-2 mb-3">
                      {[500, 1000, 5000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setFieldValue("amount", amt);
                            setPreset(amt);
                          }}
                          className={`flex-1 rounded-md py-2 text-sm font-medium border ${
                            Number(values.amount) === amt
                              ? " border-[#003A44]"
                              : " border-[#003A44]"
                          }`}
                        >
                          {amt} FCFA
                        </button>
                      ))}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium  mb-1">
                        Montant(FCFA)
                      </label>
                      <Field
                        name="amount"
                        type="number"
                        min={1}
                        step="1"
                        className="w-full h-11 rounded-md border px-3 py-2 text-sm bg-transparent"
                        placeholder="Ex : 50"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const v = e.target.value === "" ? "" : Number(e.target.value);
                          setFieldValue("amount", v);
                          setPreset(null);
                        }}
                      />
                      <ErrorMessage name="amount" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-sm font-medium ">
                          Nom
                        </label>
                        <Field
                          name="name"
                          type="text"
                          placeholder="Votre nom"
                          className="w-full h-11 rounded-md border px-3 py-2 text-sm bg-transparent"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium ">
                          Email
                        </label>
                        <Field
                          name="email"
                          type="email"
                          placeholder="exemple@exemple.com"
                          className="w-full h-11 rounded-md border px-3 py-2 text-sm bg-transparent"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium ">
                          Téléphone
                        </label>
                        <Field
                          name="phone"
                          type="text"
                          placeholder="+229 6x xx xx xx"
                          className="w-full h-11 rounded-md border px-3 py-2 text-sm bg-transparent"
                        />
                        <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>

                    {/* Bouton principale */}
                    <div className="mt-5">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md py-3 text-white bg-[#08A3DC] hover:bg-[#0b91c6] font-semibold"
                      >
                        FAIRE UN DON
                      </button>
                    </div>

                    <p className="text-xs  mt-3">
                      Votre don sera utilisé pour améliorer l'accès aux services psychologiques.
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>

        {/* Mobile: show hero above form */}
        <style jsx>{`
          @media (max-width: 767px) {
            /* mobile : show hero background above form using inline background on top of page */
            .min-h-screen > .min-h-screen {
              /* noop */
            }
          }
        `}</style>
      </div>
    );
  }
