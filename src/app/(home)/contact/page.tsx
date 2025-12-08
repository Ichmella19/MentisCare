// 'use client';
// import Header from "@/components/(home)/header/header";
// import React, { useState } from "react";

//     import Footer from "@/components/(home)/footer/footer";
// import { motion } from "framer-motion";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Mail, MapPin, Clock } from "lucide-react";
// import Link from "next/link";




// const ContactForm: React.FC=() => {
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

 

//   return (
//     <div className={`flex flex-col bg-white text-black dark:bg-black dark:text-white `} style={{ fontFamily: 'Montserrat, sans-serif' }}>
//       <Header />
//       {/* ✅ Message d'alerte */}
//       <div className="fixed top-[80px] left-1/2 z-50 -translate-x-1/2 w-[90%] max-w-[400px] flex flex-col">
//         {errorMessage && (
//           <div className="text-sm rounded shadow text-white bg-red-700 my-2 font-bold text-center p-4">
//             {errorMessage}
//           </div>
//         )}
//         {successMessage && (
//           <div className="text-sm rounded shadow text-white bg-green-700 my-2 font-bold text-center p-4">
//             {successMessage}
//           </div>
//         )}
//       </div>

   
    
//           <div className="bg-[#2E86AB] text-white py-[120px] px-6 md:px-24 text-center">
//         <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl font-extrabold mb-6">Contactez-nous</motion.h1>
//         <p className="text-xl max-w-3xl mx-auto">     MentisCare est à votre écoute. Écrivez-nous ou consultez nos informations pour nous joindre facilement.</p>
//       </div>
   

//       <section className="py-16 ">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
  
//           <div className={`rounded-lg shadow-md p-6`}>
//             <h2 className={`text-2xl font-bold mb-2 `}>Envoyez-nous un message</h2>
//             <p className="text-gray-500 text-sm mb-6">Nous reviendrons vers vous rapidement.</p>
//             <Formik
//               initialValues={{
//                 prenoms: "",
//                 email: "",
//                 sujet: "",
//                 message: "",
//               }}
//               validationSchema={Yup.object({
//                 prenoms: Yup.string().required("Ce champ est requis"),
//                 email: Yup.string().email("Email invalide").required("Ce champ est requis"),
//                 sujet: Yup.string().required("Sujet requis"),
//                 message: Yup.string().required("Veuillez écrire un message"),
//               })}
//               onSubmit={(values, { resetForm }) => {
//                 setSuccessMessage("Message envoyé avec succès !");
//                 setErrorMessage("");
//                 resetForm();
//               }}
//             >
//               <Form className="space-y-4">
           
//                 <div>
//                   <label className={`font-semibold block `}>Noms et Prénoms *</label>
//                   <Field name="prenoms" type="text" className={`w-full mt-1 p-2 rounded border  `} />
//                   <ErrorMessage name="prenoms" component="div" className="text-red-500 text-sm mt-1" />
//                 </div>

//                 <div>
//                   <label className={`font-semibold block `}>Email *</label>
//                   <Field name="email" type="email" className={`w-full mt-1 p-2 rounded border   `} />
//                   <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
//                 </div>

//                 <div>
//                   <label className={`font-semibold block `}>Sujet *</label>
//                   <Field name="sujet" type="text" className={`w-full mt-1 p-2 rounded border }`} />
//                   <ErrorMessage name="sujet" component="div" className="text-red-500 text-sm mt-1" />
//                 </div>

//                 <div>
//                   <label className={`font-semibold block `}>Message *</label>
//                   <Field as="textarea" name="message" rows={5} className={`w-full mt-1 p-2 rounded border resize-none`} />
//                   <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
//                 </div>

//                 <button type="submit" className="bg-[#08A3DC] hover:bg-[#014AA9] text-white font-bold py-2 px-6 rounded-full transition duration-300">
//                   Envoyer le message
//                 </button>
//               </Form>
//             </Formik>
//           </div>

  
//           <div className="space-y-8">
//             <div className={`rounded-lg shadow-md p-6 `}>
//               <h3 className={`text-xl font-bold mb-2 `}>Nos coordonnées</h3>
//               <div className="space-y-4 text-sm">
//                 <div className="flex items-start gap-3">
//                   <MapPin className="text-[#08A3DC]" />
//                   <div>
//                     <strong >Adresse</strong>
//                     <p className="text-black dark:text-white">Abomey-Calavi, Tokan</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Mail className="text-[#08A3DC]" />
//                   <div>
//                     <strong >Email</strong>
//                     <p className="text-black dark:text-white">contact@mentiscare.tech</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Clock className="text-[#08A3DC]" />
//                   <div>
//                     <strong >Horaires</strong>
//                     <p className="text-black dark:text-white">Lun - Sam : 8h - 18h</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className={`rounded-lg shadow-md p-6 `}>
//               <h3 className={`text-xl font-bold mb-2 `}>Support client</h3>
//               <p className="text-black dark:text-white mb-2">Notre équipe est disponible pour répondre à vos préoccupations.</p>
//               <ul className="text-sm space-y-1 text-black dark:text-white">
//                 <li><strong>Temps de réponse :</strong> 2–4 heures</li>
//                 <li><strong>Support téléphone :</strong> Lun–Sam 8h–18h</li>
//                 <li><strong>Support email :</strong> 24h/24</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>


//       <section className="py-16 bg-white dark:bg-black text-black dark:text-white">
//   <div className="container mx-auto px-4 max-w-5xl text-center">
//     <h2
//       className="md:text-5xl text-4xl font-bold mb-6 text-black dark:text-white"
//       style={{ fontFamily: "Montserrat, sans-serif" }}
//     >
//       Notre localisation
//     </h2>
//     <p
//       className="mb-8 md:text-xl text-lg text-black dark:text-white"
//       style={{ fontFamily: "Montserrat, sans-serif" }}
//     >
//       Retrouvez le Centre Saint Camille au cœur de l'Atlantique plus précisément à Abomey-Calavi.  
//       Un espace dédié à l’accompagnement, aux consultations et au suivi des patients.
//     </p>

//     {/* Carte intégrée (Google Maps Embed) */}
//     <div className="rounded-2xl shadow-lg overflow-hidden">
//       <iframe
//         // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.765784018933!2d2.391236!3d6.370293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102357fcb2a9e5d7%3A0xf87f9c5d1f3c0!2sCotonou!5e0!3m2!1sfr!2sbj!4v1699999999999!5m2!1sfr!2sbj"
//         width="100%"
//         height="450"
//         style={{ border: 0 }}
//         allowFullScreen
//         loading="lazy"
//         referrerPolicy="no-referrer-when-downgrade"
//       ></iframe>
//     </div>
//   </div>
// </section>
//  <Footer />
//     </div>
     
//   );
// };


// export default ContactForm;
