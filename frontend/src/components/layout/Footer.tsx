import Link from 'next/link';
import Image from 'next/image';
import { HiMail, HiPhone } from 'react-icons/hi';
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin } from 'react-icons/fa6';

const quickLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/contacto', label: 'FAQ' },
];

const categorias = [
  { href: '/catalogo?categoria=tecnologia', label: 'Tecnología' },
  { href: '/catalogo?categoria=salud', label: 'Salud' },
  { href: '/catalogo?categoria=negocios', label: 'Negocios' },
  { href: '/catalogo?categoria=educacion', label: 'Educación' },
  { href: '/catalogo?categoria=diseno', label: 'Diseño' },
  { href: '/catalogo?categoria=marketing', label: 'Marketing' },
];

const socialLinks = [
  { href: '#', icon: FaFacebook, label: 'Facebook' },
  { href: '#', icon: FaInstagram, label: 'Instagram' },
  { href: '#', icon: FaXTwitter, label: 'Twitter/X' },
  { href: '#', icon: FaLinkedin, label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="JetStore Digital" width={48} height={48} className="w-11 h-11" />
              <span className="text-2xl font-bold text-red-600">JetStore Digital</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              La mejor plataforma de libros digitales en Perú. Accede a cientos de PDFs educativos y profesionales al instante.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-red-500 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Categorías</h3>
            <ul className="space-y-3">
              {categorias.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-gray-400 hover:text-red-500 text-sm transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <HiMail className="w-5 h-5 text-red-500 flex-shrink-0" />
                <a href="mailto:contacto@jetstore.pe" className="hover:text-red-500 transition-colors">
                  contacto@jetstore.pe
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <HiPhone className="w-5 h-5 text-red-500 flex-shrink-0" />
                <a href="tel:+51999888777" className="hover:text-red-500 transition-colors">
                  +51 999 888 777
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 py-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2026 JetStore Digital. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
