/* eslint-disable react/no-unescaped-entities */
'use client';
import { motion } from "framer-motion";
import Header from "@/components/(home)/header/header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const features = [
  { icon: "\uD83D\uDCF1", title: "Accompagnement personnalisé", description: "MentisCare propose un suivi en ligne pour chaque patient afin de favoriser une prise en charge adaptée à sa situation personnelle." },
  { icon: "\uD83D\uDCE2", title: "Campagnes de sensibilisation", description: "Des contenus éducatifs pour lutter contre la stigmatisation et informer les communautés sur les troubles mentaux." },
  { icon: "\uD83E\uDDD1", title: "Suivi médical et psychologique", description: "Les professionnels peuvent assurer un suivi régulier des patients à travers la plateforme." },
  { icon: "\uD83D\uDCCD", title: "Orientation vers des centres spécialisés", description: "Guide les familles vers des structures de soins fiables, comme Saint Camille de Tokan." },
  { icon: "\uD83D\uDD14", title: "Rappels automatisés", description: "Recevez des notifications pour les rendez-vous médicaux, les séances de thérapie ou la prise de médicaments." },
  { icon: "\uD83D\uDCAC", title: "Journal émotionnel et messagerie", description: "Les patients peuvent noter leurs humeurs, échanger avec leur thérapeute ou poser des questions à des spécialistes." },
];

const testimonies = [
  { quote: "Grâce à MentisCare, j'ai pu trouver une aide rapidement pour mon frère. L'accompagnement est vraiment humain.", name: "Awa, sœur d'un patient" },
  { quote: "Les rappels automatiques m'aident à ne pas oublier mes rendez-vous. C'est rassurant.", name: "Justin, patient" },
  { quote: "Je recommande cette plateforme à toutes les familles en difficulté. Très utile et accessible.", name: "Mme Kossi, mère d'un adolescent suivi" },
  { quote: "Enfin une solution digitale pensée pour nos réalités. Bravo à l'équipe de MentisCare.", name: "Dr. Agossou, psychiatre" },
  { quote: "J'apprécie la possibilité de suivre les humeurs de mes patients entre deux séances.", name: "Nadine, psychologue" },
  { quote: "Le contenu de sensibilisation est très pertinent pour les jeunes en milieu rural.", name: "Jacques, travailleur social" },
];

export default function Fonctionnalites( ) {


  return (
    
    <div className= "bg-white text-black dark:bg-black dark:text-white"style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Header />
      {/* Hero */}
      <div className="bg-[#2E86AB] text-white py-[120px] px-6 md:px-24 text-center">
        <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl font-extrabold mb-6">MentisCare</motion.h1>
        <p className="text-xl max-w-3xl mx-auto">Une plateforme numérique pour soutenir les personnes en détresse mentale dans les milieux défavorisés au Bénin.</p>
      </div>

      {/* Fonctionnalités */}
      <div className="px-6 py-16 md:px-24">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="text-3xl font-extrabold text-center text-[#2E86AB] mb-10">Les fonctionnalités de MentisCare</motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-center text-lg  max-w-3xl mx-auto mb-14">Découvrez les solutions concrètes offertes par notre plateforme pour accompagner, orienter et soutenir les personnes en détresse mentale.</motion.p>

        <div className="grid gap-10 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.2 }} className={` border border-[#D3EAF2] rounded-xl p-6 shadow-md hover:shadow-lg transition`}>
              <div className="text-5xl mb-4 text-[#2E86AB]">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm ">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Témoignages */}
      <div className={` py-16 px-6 md:px-24`}>
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl font-bold text-center text-[#2E86AB] mb-10">Ce qu'ils disent de MentisCare</motion.h2>
        <Swiper modules={[Pagination, Autoplay]} spaceBetween={30} slidesPerView={1} pagination={{ clickable: true }} autoplay={{ delay: 5000 }} loop={true} className="max-w-3xl mx-auto">
          {testimonies.map((t, i) => (
            <SwiperSlide key={i}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-[#2E86AB] min-h-[200px] flex flex-col justify-between">
                <p className="italic mb-4 text-white dark:text-white">“{t.quote}”</p>
                <p className="font-semibold text-right text-gray-900 dark:text-white">— {t.name}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Partenaires */}
      <div className="py-16 px-6 md:px-24 text-center">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl font-bold text-[#2E86AB] mb-8">Nos partenaires clés</motion.h2>
        <p className=" max-w-2xl mx-auto mb-10">MentisCare collabore avec des professionnels de la santé mentale, des ONG et des centres spécialisés comme Saint Camille de Tokan pour garantir un accompagnement de qualité.</p>
        <div className="flex flex-wrap justify-center gap-10 text-4xl">
          <span>🏥</span><span>🤝</span><span>📡</span><span>💊</span>
        </div>
      </div>

      {/* Call to Action */}
      <div className={` py-14 text-center px-6`}>
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} className="text-3xl font-bold mb-4">Prêt à changer les choses ?</motion.h2>
        <p className="mb-6 text-lg">Rejoignez-nous dans la lutte pour une meilleure prise en charge de la santé mentale au Bénin.</p>
        <button className="bg-white text-[#2E86AB] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">En savoir plus</button>
      </div>
    </div>  
  );
}
