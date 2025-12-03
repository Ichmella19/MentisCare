"use client";
/* eslint-disable react/no-unescaped-entities */
import Checkbox from "@/components/form/input/Checkbox";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

import Link from "next/link";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

interface ExtendedUser {
  role?: 'ADMIN' | 'USER';
  [key: string]: unknown;
}


export default function SignInForm() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const { data: session } = useSession();

const validationSchema = Yup.object({
  email: Yup.string().email("Email invalide").required("Ce champ est requis"),
  password: Yup.string()
    .min(6, "Minimum 6 caractères")
    .required("Ce champ est requis"),
});

const initialValues = {
  email: "",
  password: "",
};

const onSubmit = async (
  values: { email: string; password: string },
  { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
) => {
  const result = await signIn("credentials", {
    redirect: false,
    email: values.email,
    password: values.password,
  });

  if (result?.error) {
    toast.error("Erreur de connexion :");
  } else {
    toast.success("Bienvenu sur notre plateforme");
    
  const user = session?.user as ExtendedUser | undefined;
  const role = user?.role;
    if (role == 'ADMIN') {
      router.push("/admin/dashboard");
    }else{
      router.push("/admin/dashboard/personal");
    }
  }
  setSubmitting(false);
  setSubmitting(false);

};


  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full items-center justify-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="w-full max-w-md sm:pt-10 mx-auto  mt-[30px]">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-black  transition-colors hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
        >
        
          Retour à l'accueil
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-black text-title-sm dark:text-white sm:text-title-md">
            Se connecter
          </h1>
          <p className="text-sm text-dark dark:text-white ">
            Entrez vos identifiants pour vous connecter à votre compte.
          </p>
        </div>

        

     

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur
          validateOnChange
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-1 text-dark dark:text-white ">
                  E-mail
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="nom@exemple.com"
                  className={`w-full px-3 py-2 border rounded dark:text-white dark:bg-transparent ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block mb-1 text-dark dark:text-white ">
                  Mot de passe
                </label>
                <Field
                 
                  id="password"
                  name="password"
                  placeholder="6+ caractères"
                  className={`w-full px-3 py-2 border rounded dark:text-white dark:bg-transparent ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
                  <span className="block font-normal text-dark dark:text-white  text-theme-sm ">
                    Se souvenir de moi
                  </span>
                </div>
                <button
            className="text-sm text-[#08A3DC] "
            onClick={() => router.push("/forget")}
          >
           Mot  de passe oublié ?
          </button>
               
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-[#08A3DC] text-white rounded hover:bg-[#0b91c6] transition duration-200"
              >
                {isSubmitting ? "Connexion..." : "Se connecter"}
              </button>  
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
