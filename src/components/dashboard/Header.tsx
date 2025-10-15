import { Leaf } from 'lucide-react';

export default function Header() {
  return (
    <header className="mb-8 md:mb-12">
      <div className="flex items-center gap-4">
        <div className="bg-green-500/20 p-3 rounded-lg">
          <Leaf className="w-8 h-8 text-green-400" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            LEIF - Dashboard da Estufa Inteligente
          </h1>
          <p className="text-gray-400 mt-1">
            Monitoramento em tempo real dos sensores da estufa automatizada com ESP32 e IoT.
          </p>
        </div>
      </div>
    </header>
  );
}