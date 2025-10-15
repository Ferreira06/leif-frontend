import { ThingSpeakResponse } from "@/types";

const CHANNEL_ID = '3079724';
const API_KEY = process.env.NEXT_PUBLIC_THINGSPEAK_READ_API_KEY; 
const BASE_URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json`;

export async function fetchThingSpeakData(results: number = 100): Promise<ThingSpeakResponse> {
  const url = new URL(BASE_URL);
  url.searchParams.append('results', results.toString());
  
  if (API_KEY) {
    url.searchParams.append('api_key', API_KEY);
  }

  try {
    const response = await fetch(url.toString(), {
      // Revalida os dados do cache a cada 20 segundos
      next: { revalidate: 20 } 
    });

    if (!response.ok) {
      throw new Error(`Error fetching data from ThingSpeak: ${response.statusText}`);
    }

    const data: ThingSpeakResponse = await response.json();

    // ThingSpeak retorna -1 para o channel id se não houver dados, vamos tratar isso.
    if (data.channel.id === -1) {
      throw new Error("ThingSpeak channel not found or has no data.");
    }
    
    return data;
  } catch (error) {
    console.error("Failed to fetch ThingSpeak data:", error);
    // Em caso de erro, você pode querer retornar uma estrutura de dados vazia ou mockada.
    throw error;
  }
}