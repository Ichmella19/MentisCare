    /* eslint-disable react/no-unescaped-entities */

    "use client";
    import Header from "@/components/(home)/header/header";
    import Footer from "@/components/(home)/footer/footer";
    import { motion } from "framer-motion";
    import { useRouter } from 'next/navigation';

    import { FaUserMd, FaHeartbeat, FaUsers, FaLightbulb, FaHospital } from "react-icons/fa";

    import React, {  useRef } from 'react';

    import { useInView } from 'framer-motion';
    import { MapPin } from 'lucide-react';



    export default function Home() {
        
    const router = useRouter();
        const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const locations = [
        {
        name: "Siège Bénin Calavi- Kpota",
        address: "Calavi kpota, Cotonou, Bénin",
        coordinates: { lat: 6.3703, lng: 2.3912 }
        },
        {
        name: "Bureau Togo - Lomé",
        address: "Centre-ville, Lomé, Togo",
        coordinates: { lat: 6.1319, lng: 1.2228 }
        }
    ];
        
        const services = [
            {
                icon: <FaUserMd className="text-blue-600 text-5xl" />,
                title: "Consultations en ligne",
                description: "Grâce à MentisCare, nous avons pu suivre ma sœur pendant sa période difficile, et obtenir des conseils de spécialistes à distance. Une solution indispensable pour les familles comme la nôtre.",
            },
            {
                icon: <FaHeartbeat className="text-red-500 text-5xl" />,
                title: "Outils de suivi mental",
                description: "Grâce à MentisCare, nous avons pu suivre ma sœur pendant sa période difficile, et obtenir des conseils de spécialistes à distance. Une solution indispensable pour les familles comme la nôtre.",
            },
            {
                icon: <FaUsers className="text-green-500 text-5xl" />,
                title: "Espace d’échange",
                description: "MentisCare a changé notre quotidien. Le suivi médical à distance a permis à mon fils de continuer son traitement tout en restant à la maison.",
            },
            {
                icon: <FaLightbulb className="text-yellow-500 text-5xl" />,
                title: "Sensibilisation et éducation",
                description: "MentisCare a changé notre quotidien. Le suivi médical à distance a permis à mon fils de continuer son traitement tout en restant à la maison.",
            },
            {
                icon: <FaHospital className="text-purple-500 text-5xl" />,
                title: "Orientation vers des structures spécialisées",
                description: "MentisCare a changé notre quotidien. Le suivi médical à distance a permis à mon fils de continuer son traitement tout en restant à la maison.",
            },
        ];
    
        return (
            <>
                <Header />
                <main
                    className="bg-white dark:bg-black text-black dark:text-white pt-[70px] z-0 min-h-screen overflow-hidden transition-colors duration-300"
                >
                    {/* Hero Section */}
                    <section
    className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
    style={{
        backgroundImage: "url('assets/images/mentis.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }}
    >
    {/* Overlay pour assombrir ET flouter */}
   <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>

    {/* Contenu en avant-plan */}
    <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative max-w-4xl text-white z-10"
    >
        <h1
        className="md:text-5xl text-4xl font-bold mb-4 tracking-wider"
        style={{ fontFamily: "Montserrat, sans-serif" }}
        >
        Prenez soin du bien-être mental de vos proches avec{" "}
        <span className="text-[#08A3DC]">MentisCare</span>
        </h1>
        <p
        className="md:text-xl text-lg mb-6"
        style={{ fontFamily: "Montserrat, sans-serif" }}
        >
        Une plateforme numérique pour accompagner et suivre les personnes en
        détresse mentale, en offrant des consultations, des outils de suivi et un
        espace d’échange. 80% des personnes en détresse mentale issues de milieux
        précaires n’ont pas accès à un suivi. MentisCare veut changer cela.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
        <button
            className="px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-opacity bg-white dark:bg-black text-black dark:text-white"
            style={{ fontFamily: "Montserrat, sans-serif" }}
            onClick={() => router.push("/services")}
        >
            Découvrir nos services
        </button>
        <button
            className="px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-opacity bg-white dark:bg-black text-black dark:text-white"
            style={{ fontFamily: "Montserrat, sans-serif" }}
            onClick={() => router.push("/contact")}
        >
            Besoin d’aide ? Contactez-nous
        </button>
        </div>
    </motion.div>
    </section>


                    {/* Section Problématique séparée */}
                    <section 
                        className={`py-16 px-6 transition-colors duration-300`} 
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.h2
                                className="md:text-5xl text-4xl font-bold mb-6"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <span >
                                    Pourquoi cette plateforme ?
                                </span>
                            </motion.h2>
                            <motion.p
                                className="md:text-xl text-lg leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.5 }}
                            >
                        <span>
                    MentisCare est une plateforme conçue pour faciliter le suivi des patients du centre 
                    <strong> Saint Camille</strong>, non seulement par les médecins mais aussi par leurs proches. 
                    Elle offre un espace sécurisé pour assurer un meilleur accompagnement, tout en rendant 
                    possible et simple les dons de toutes sortes afin de soutenir durablement les personnes 
                    en détresse mentale.
                        </span>

                            </motion.p>
                        </div>
                    </section>
                    
                    {/* Section Témoignages & Impacts */}
                    <section 
                        className={`py-16 px-6 text-center transition-colors duration-300`}
                    >
                        <div className="max-w-5xl mx-auto">
                            <h2
                                className="md:text-5xl text-4xl font-bold mb-6"
                                style={{ fontFamily: 'Montserrat, sans-serif' }}
                            >
                                <span>
                                    Témoignages & Impacts
                                </span>
                            </h2>
                            <p
                                className="mb-12 md:text-xl text-lg"
                            style={{ fontFamily: 'Montserrat, sans-serif' }}
                            >
                                <span >
                                    Découvrez les témoignages des familles que nous avons pu accompagner et soutenir.
                                </span>
                            </p>

                            {/* Grid des services */}
                            <motion.div
                                className="grid md:grid-cols-3 gap-8"
                                initial="hidden"
                                whileInView="show"
                                variants={{
                                    hidden: { opacity: 0 },
                                    show: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.2, duration: 1 },
                                    },
                                }}
                            >
                                {services.map((service, index) => (
                                    <motion.div
                                        key={index}
                                        className={`p-10 rounded-2xl shadow-lg cursor-pointer text-center transition-colors duration-300 `}
                                        variants={{
                                            hidden: { opacity: 0, y: 50 },
                                            show: {
                                                opacity: 1,
                                                y: 0,
                                                transition: { duration: 0.5, ease: "easeOut" },
                                            },
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="mb-4">{service.icon}</div>
                                        <h3 
                                            className={`text-xl font-semibold mb-2 `}  
                                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                                        >
                                            {service.title}
                                        </h3>
                                        <p 
                                            className={`text-lg `}  
                                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                                        >
                                            {service.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </section>
                    
                 

                </main>
                <Footer />
            </>
        );
    }