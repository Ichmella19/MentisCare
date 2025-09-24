import { Mail, Facebook, Linkedin, Instagram, Github, Send } from "lucide-react";



export default function Footer() {
  return (
    <footer
      className={`py-12 text-xl md:text-[16px] transition-colors duration-300 bg-white text-black dark:bg-black dark:text-white `}
     style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      <div className="max-w-8xl mx-auto px-[10%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* À propos de nous */}
        <div>
          <h3 className="md:text-xl text-lg font-semibold mb-4 relative w-fit cursor-pointer">
            À propos de nous
            <span className="absolute left-0 bottom-0 w-1/2 h-1 rounded-md bg-[#08A3DC]"></span>
          </h3>
          <h2 className="text-3xl font-bold text-[#08A3DC] mb-2">MentisCare</h2>
          <p className={`text-[16px] `}>
            Une plateforme numérique dédiée au bien-être mental, offrant un suivi et un accompagnement personnalisé.
          </p>
          <div className="flex gap-4 mt-4">
            {[Facebook, Linkedin, Instagram, Mail, Github].map((Icon, i) => (
              <a key={i} href="#" className={`hover:text-[#08A3DC]`}>
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Liens rapides */}
        <div>
          <h3 className="md:text-xl text-lg font-semibold mb-4 relative w-fit cursor-pointer">
            Liens rapides
            <span className="absolute left-0 bottom-0 w-1/2 h-1 rounded-md bg-[#08A3DC]"></span>
          </h3>
          <ul className={` text-[16px]`}>
            {[
              { label: "Accueil", path: "/" },
                { label: "À propos", path: "/about" },
              { label: "Contact", path: "/contact" },
              { label: "Réservations", path: "/reservation" },
              { label: "Suivre mon proche", path: "/suivreproche" },
            
            ].map(({ label, path }) => (
              <li key={label} className="mb-2">
                <a href={path} className="hover:text-[#08A3DC]">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Nos services */}
        <div>
          <h3 className="md:text-xl text-lg font-semibold mb-4 relative w-fit cursor-pointer">
            Nos services
            <span className="absolute left-0 bottom-0 w-1/2 h-1 rounded-md bg-[#08A3DC]"></span>
          </h3>
          <ul className={`text-[16px]`}>
            {[
              { label: "Consultations en ligne", path: "/services#consultation" },
              { label: "Suivi personnalisé", path: "/services#suivi" },
              { label: "Espace d'échange", path: "/services#communauté" },
              { label: "Orientation vers des spécialistes", path: "/services#orientation" },
            ].map(({ label, path }) => (
              <li key={label} className="mb-2">
                <a href={path} className="hover:text-[#08A3DC]">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="md:text-xl text-lg font-semibold mb-4 relative w-fit cursor-pointer">
            Newsletter
            <span className="absolute left-0 bottom-0 w-1/2 h-1 rounded-md bg-[#08A3DC]"></span>
          </h3>
          <p className={`mb-4 text-[16px] `}>
            Inscrivez-vous pour recevoir des conseils et actualités sur la santé mentale.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Votre email"
              className="w-full p-2 text-black rounded-l-md focus:outline-none"
            />
            <button className="bg-[#08A3DC] hover:bg-[#08A3DC] px-4 rounded-r-md">
              <Send size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="text-center mt-12">
        <p className={`text-sm`}>
      MentisCare. Tous droits réservés.
        </p>
      </div>
  <div className="fixed bottom-8 right-8 z-40 opacity-100 transform-none">
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background 
    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 
    disabled:pointer-events-none disabled:opacity-50 
    transform hover:scale-105 hover:-translate-y-0.5 
    h-12 w-12 rounded-full bg-[#003A44] text-white shadow-lg hover:shadow-xl 
    transition-all duration-300"
    aria-label="Remonter en haut"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  </button>
</div>

    </footer>
  );
}
