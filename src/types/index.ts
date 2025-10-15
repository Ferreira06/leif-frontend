export interface Feed {
  created_at: string;
  entry_id: number;
  field1: string | null; // Temperatura
  field2: string | null; // Umidade do Ar
  field3: string | null; // Nível de Luz
  field4: string | null; // Qualidade do Ar
  field5: string | null; // Umidade do Solo (Distância)
  field6: string | null;
  field7: string | null;
  field8: string | null;
}

export interface Channel {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  created_at: string;
  updated_at: string;
  last_entry_id: number;
}

export interface ThingSpeakResponse {
  channel: Channel;
  feeds: Feed[];
}