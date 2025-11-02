"use client";

import useSWR from 'swr';
import { ThingSpeakResponse } from '@/types';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const CHANNEL_ID = '3079724';
const API_KEY = process.env.NEXT_PUBLIC_THINGSPEAK_READ_API_KEY;

export function useThingSpeakData(results: number = 100) {
  const url = new URL(`https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json`);
  url.searchParams.append('results', results.toString());
  
  if (API_KEY) {
    url.searchParams.append('api_key', API_KEY);
  }

  const { data, error, isLoading } = useSWR<ThingSpeakResponse>(
    url.toString(),
    fetcher,
    {
      refreshInterval: 2000, // Revalida a cada 20 segundos
      revalidateOnFocus: true,
      dedupingInterval: 1000, // Evita requisições duplicadas em um curto período
    }
  );

  return {
    data,
    error,
    isLoading,
  };
}