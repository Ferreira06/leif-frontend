"use client";

import dynamic from 'next/dynamic';
import { useThingSpeakData } from '@/hooks/useThingSpeakData';
import Header from '@/components/dashboard/Header';
import SensorCard from '@/components/dashboard/SensorCard';
import HistoryChart from '@/components/dashboard/HistoryChart';
import Footer from '@/components/dashboard/Footer';
import { Thermometer, Droplets, Sun, Wind, Waves, AlertTriangle, Info } from 'lucide-react';
import { Feed } from '@/types';
import GaugeCard from '@/components/dashboard/GaugeCard';

const DynamicGaugeCard = dynamic(() => import('@/components/dashboard/GaugeCard'), {
  ssr: false,
  // Opcional: Mostrar um skeleton enquanto o componente carrega no cliente
  loading: () => <div className="bg-gray-800/50 p-5 rounded-lg animate-pulse h-[164px]"></div>
});

const DynamicHistoryChart = dynamic(() => import('@/components/dashboard/HistoryChart'), {
  ssr: false,
  // Opcional: Mostrar um skeleton enquanto o gráfico carrega
  loading: () => <div className="bg-gray-800/50 rounded-lg p-4 mt-8 h-96 md:h-[500px] animate-pulse"></div>
});

function DashboardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-800/50 p-5 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-10 bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
      <div className="bg-gray-800/50 rounded-lg p-4 mt-8 h-96 md:h-[500px] animate-pulse"></div>
    </>
  );
}

// Componente para estado de erro
function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 bg-red-500/10 border border-red-500/20 rounded-lg">
      <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
      <h2 className="text-2xl font-bold text-red-400">Falha ao carregar os dados</h2>
      <p className="text-gray-400 mt-2 max-w-md">{message}</p>
    </div>
  );
}

// Componente para estado de sem dados
function EmptyState() {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 bg-gray-800/50 border border-gray-700/50 rounded-lg">
        <Info className="w-12 h-12 text-blue-400 mb-4" />
        <h2 className="text-2xl font-bold text-blue-400">Nenhum dado encontrado</h2>
        <p className="text-gray-400 mt-2 max-w-md">O canal do ThingSpeak pode não ter registros ainda. Aguardando os primeiros dados da estufa.</p>
      </div>
    );
  }

export default function Home() {
  const { data, error, isLoading } = useThingSpeakData(200);

  // 1. Estado de Carregamento Inicial: Corresponde ao render do servidor
  if (isLoading) {
    return (
      <>
        <Header />
        <DashboardSkeleton />
        <Footer />
      </>
    );
  }

  // 2. Estado de Erro
  if (error) {
    return (
      <>
        <Header />
        <ErrorState message="Não foi possível conectar à API do ThingSpeak. Verifique o ID do canal ou tente novamente mais tarde." />
        <Footer />
      </>
    );
  }

  // 3. Estado de Sucesso, mas sem Dados
  if (!data || data.feeds.length === 0) {
    return (
        <>
            <Header />
            <EmptyState />
            <Footer />
        </>
    );
  }

  // 4. Estado de Sucesso com Dados
  const latestFeed = data.feeds[data.feeds.length - 1];
  const getFieldValue = (field: keyof Feed): string => latestFeed?.[field] !== undefined ? String(latestFeed[field]) : '--';

  const tempValue = parseFloat(getFieldValue('field1'));
  const humidityValue = parseFloat(getFieldValue('field2'));
  const lightValue = parseFloat(getFieldValue('field3'));
  const airQualityValue = parseFloat(getFieldValue('field4'));
  const soilMoistureValue = parseFloat(getFieldValue('field5'));

  const temperatureColorStops = [
    { value: 0, color: '#60a5fa' },   // Frio: Azul (Blue-400)
    { value: 18, color: '#4ade80' },  // Ideal: Verde (Green-400)
    { value: 28, color: '#fb923c' },  // Quente: Laranja (Orange-400)
    { value: 35, color: '#f87171' },  // Muito Quente: Vermelho (Red-400)
  ];

  const humidityColorStops = [
    { value: 0, color: '#facc15' },   // Seco: Amarelo (Yellow-400)
    { value: 40, color: '#4ade80' },  // Ideal: Verde (Green-400)
    { value: 65, color: '#60a5fa' },  // Úmido: Azul (Blue-400)
  ];


  return (
    <>
      <Header />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <DynamicGaugeCard 
          title="Temperatura"
          value={isNaN(tempValue) ? 0 : tempValue}
          unit="°C"
          icon={<Thermometer size={20} />}
          min={0}
          max={50}
          colorStops={temperatureColorStops}
        />
        
        <DynamicGaugeCard
          title="Umidade do Ar"
          value={isNaN(humidityValue) ? 0 : humidityValue}
          unit="%"
          icon={<Droplets size={20} />}
          min={0}
          max={100}
          colorStops={humidityColorStops}
        />
        <SensorCard 
          title="Nível de Luz"
          value={getFieldValue('field3')}
          unit="lx"
          icon={<Sun size={20} />}
          alertCondition={!isNaN(lightValue) && lightValue < 1800}
        />
        <SensorCard 
          title="Qualidade do Ar"
          value={getFieldValue('field4')}
          unit="ppm"
          icon={<Wind size={20} />}
          alertCondition={!isNaN(airQualityValue) && airQualityValue > 1800}
        />
        <SensorCard 
          title="Umidade do Solo"
          value={soilMoistureValue.toFixed(2)}
          unit="%"
          icon={<Waves size={20} />}
          alertCondition={!isNaN(soilMoistureValue) && soilMoistureValue < 22.0}
        />
      </div>
      
      <DynamicHistoryChart feeds={data.feeds} />
      
      <div className="text-center text-sm text-gray-400 mt-4">
        Última atualização em: {new Date(latestFeed.created_at).toLocaleString('pt-BR', {
          dateStyle: 'short',
          timeStyle: 'medium',
        })}
      </div>

      <Footer />
    </>
  );
}
