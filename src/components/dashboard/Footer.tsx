import { Github, Code, FileText } from 'lucide-react';

const footerLinks = [
  { name: 'GitHub do Projeto', href: 'https://github.com/Vitoria-BG/leif_frontend', icon: <Github className="w-4 h-4" /> },
  { name: 'Simulação no Wokwi', href: 'https://wokwi.com/projects/442391236921946113', icon: <Code className="w-4 h-4" /> },
  { name: 'Documentação', href: 'https://docs.google.com/document/d/1DfQPoCTxm_lbGXZy66RfhhFBIziW9bv-dU8MGZVRSGY/edit?usp=sharing', icon: <FileText className="w-4 h-4" /> },
];

export default function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} LEIF Project. Todos os direitos reservados.</p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          {footerLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="flex items-center gap-2 hover:text-green-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}