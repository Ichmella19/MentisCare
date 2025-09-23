/* eslint-disable react/no-unescaped-entities */
'use client';
import Header from "@/components/(home)/header/header";
import Footer from "@/components/(home)/footer/footer";
import React from 'react';
import { motion } from "framer-motion";
interface AboutUsProps {
  theme: "light" | "dark";
}
const AboutUs: React.FC<AboutUsProps> = () => {
  
  return (
     
    <div className= {`min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white`}style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <main className="flex-1">

       <Header />
          <div className="bg-[#2E86AB] text-white py-[120px] px-6 md:px-24 text-center">
          <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl font-extrabold mb-6">MentisCare</motion.h1>
            <p className="text-xl font-medium mx-auto max-w-3xl">
              Une initiative humaine et technologique pour redonner de l'espoir à ceux que la société oublie trop souvent.
            </p>
          </div>
    

     
        <section className= {`py-16 px-6 lg:px-20`} >
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#08A3DC] tracking-wider"        style={{ fontFamily: 'Ibrand, sans-serif' }}>Notre Histoire</h2>
              <p className="mb-4 text-lg">
                MentisCare est né d'un constat poignant : au Bénin, la santé mentale est encore largement négligée.
              </p>
              <p className="mb-4 text-lg">
                Lors d'une immersion au <strong>Centre Psychiatrique Saint Camille de Tokan</strong>, notre équipe a réalisé l'urgence d'agir.
              </p>
              <blockquote className="italic border-l-4 border-blue-600 pl-4 ">
                « Digitaliser la santé mentale au Bénin, c'est offrir un avenir plus digne, plus humain, et plus connecté. »
              </blockquote>
            </div>
            <div>
              <img
                src="../src/assets/images/medecin.webp"
                alt="MentisCare illustration"
                className="rounded-2xl shadow-xl w-full h-[350px] object-cover"
              />
            </div>
          </div>
        </section>

        <section className={` py-16`}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12 text-[#08A4DC] tracking-wider"        style={{ fontFamily: 'Ibrand, sans-serif' }}>Nos Valeurs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '💙', title: 'Empathie', text: 'Chaque patient est écouté et accompagné avec respect et dignité.' },
                { icon: '💡', title: 'Innovation', text: 'Nous utilisons la technologie pour améliorer la prise en charge.' },
                { icon: '🤝', title: 'Solidarité', text: 'Nous travaillons main dans la main avec les communautés locales.' },
                { icon: '📚', title: 'Éducation', text: 'Informer pour briser les tabous liés à la santé mentale.' },
              ].map((valeur, index) => (
               <div
  key={index}
  className={`p-6 rounded-lg text-left transition-all duration-300
   `}
>
  <div className="text-4xl mb-4">{valeur.icon}</div>
  <h3 className="font-semibold text-xl mb-2">{valeur.title}</h3>
  <p className="text-sm">{valeur.text}</p>
</div>

              ))}
            </div>
          </div>
        </section>

        {/* Notre Identité */}
        <section className={` py-16 `}>
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-[#08A3DC] mb-8">
        Notre Mission
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="border-l-4 border-[#08A3DC]  rounded shadow p-6">
          <h3 className="text-2xl text-[#003A44] font-semibold mb-4 tracking-wider"        style={{ fontFamily: 'Ibrand, sans-serif' }}>Notre Vision</h3>
          <p className=" text-lg">
            Offrir à chaque personne en détresse un accès digne, humain et durable à des soins adaptés,
            grâce à une technologie bienveillante au service de la santé mentale.
          </p>
        </div>

        <div className="border-l-4 border-[#08A3DC] rounded shadow p-6">
          <h3 className="text-2xl text-[#003A44] font-semibold mb-4 tracking-wider"        style={{ fontFamily: 'Ibrand, sans-serif' }}>Notre Engagement</h3>
          <p className=" text-lg">
            Développer des outils numériques efficaces, accessibles et centrés sur l'humain,
            pour accompagner, écouter et orienter ceux qui en ont le plus besoin.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


        <section className={` py-16 px-6 `}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#08A3DC] mb-10 tracking-wider"        style={{ fontFamily: 'Ibrand, sans-serif' }}>Notre Équipe</h2>
            <div className={` flex flex-col items-center p-6 rounded-xl`}>
              <img
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=200&h=200&fit=crop"
                alt="Gréliane DAGBEDJI"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">Gréliane DAGBEDJI</h3>
              <p className="text-blue-700 font-medium mb-2">Fondatrice & Directrice Générale</p>
              <p className="text-gray-600 dark:text-gray-300 max-w-xl">
                Entrepreneure visionnaire avec une passion pour l'excellence et l'innovation. Gréliane dirige MentisCare avec détermination et humanité, toujours à l'écoute des besoins de ceux que la société oublie.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
   
  );
};

export default AboutUs;
