"use client";

import { useMemo, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  LineController,
} from 'chart.js';
import type { ChartOptions, Chart as ChartJSType } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Feed } from '@/types';

ChartJS.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin
);

interface HistoryChartProps {
  feeds: Feed[];
}

export default function HistoryChart({ feeds }: HistoryChartProps) {
  const chartRef = useRef<ChartJSType<'line'>>(null);

  const chartData = useMemo(() => {
    const labels = feeds.map(feed => new Date(feed.created_at));
    return {
      labels,
      datasets: [
        // ... seus datasets permanecem os mesmos
        {
          label: 'Temperatura (°C)',
          data: feeds.map(feed => feed.field1 ? parseFloat(feed.field1) : null),
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.5)',
          yAxisID: 'y',
        },
        {
          label: 'Umidade do Ar (%)',
          data: feeds.map(feed => feed.field2 ? parseFloat(feed.field2) : null),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          yAxisID: 'y',
        },
        {
          label: 'Nível de Luz',
          data: feeds.map(feed => feed.field3 ? parseFloat(feed.field3) : null),
          borderColor: 'rgb(234, 179, 8)',
          backgroundColor: 'rgba(234, 179, 8, 0.5)',
          yAxisID: 'y1',
        },
        {
          label: 'Qualidade do Ar',
          data: feeds.map(feed => feed.field4 ? parseFloat(feed.field4) : null),
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
          yAxisID: 'y1',
        },
        {
          label: 'Umidade do Solo (cm)',
          data: feeds.map(feed => feed.field5 ? parseFloat(feed.field5) : null),
          borderColor: 'rgb(168, 85, 247)',
          backgroundColor: 'rgba(168, 85, 247, 0.5)',
          yAxisID: 'y',
        }
      ],
    };
  }, [feeds]);

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#cbd5e1'
        }
      },
      title: {
        display: true,
        // ALTERADO: Nova instrução para o usuário
        text: 'Histórico dos Sensores (Clique e arraste para dar zoom)',
        color: '#ffffff',
        font: {
          size: 18
        }
      },
      zoom: {
        pan: {
          enabled: false,
          mode: 'xy',
        },
        zoom: {
          drag: {
            enabled: true,
          },
          wheel: {
            enabled: false,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        }
      }
    },
    scales: {
        x: {
            type: 'time',
            time: {
              unit: 'minute',
              tooltipFormat: 'PPpp',
            },
            ticks: { color: '#94a3b8' },
            grid: { color: 'rgba(148, 163, 184, 0.2)' }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Temperatura / Umidade',
              color: '#94a3b8'
            },
            ticks: { color: '#94a3b8' },
            grid: { color: 'rgba(148, 163, 184, 0.2)' }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Luz / Qualidade do Ar',
              color: '#94a3b8'
            },
            ticks: { color: '#94a3b8' },
            grid: { drawOnChartArea: false },
          },
    },
  };

  const handleResetZoom = () => {
    if (chartRef && chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  return (
    <div className="relative bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 mt-8 h-96 md:h-[500px]">
      <button 
        onClick={handleResetZoom}
        className="absolute top-2 right-4 z-10 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1 px-3 rounded-full transition-colors duration-200"
      >
        Resetar Zoom
      </button>

      <Line ref={chartRef} options={chartOptions} data={chartData} />
    </div>
  );
}