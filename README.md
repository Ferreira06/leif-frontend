# LEIF Dashboard

LEIF Dashboard is a real-time monitoring application for an intelligent greenhouse system. It provides a user-friendly interface to visualize sensor data collected from an ESP32-based IoT setup. The dashboard displays temperature, humidity, light levels, air quality, and soil moisture, along with historical data visualization.

## Features

- **Real-Time Monitoring**: Displays live sensor data from the ThingSpeak API.
- **Gauge and Sensor Cards**: Intuitive visualizations for temperature, humidity, light levels, air quality, and soil moisture.
- **Historical Data Chart**: Interactive line chart with zoom and pan functionality for analyzing historical sensor data.
- **Error Handling**: Graceful handling of loading, error, and empty data states.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Project Structure

### Components

- **[Footer.tsx](src/components/dashboard/Footer.tsx)**  
  Displays project links (GitHub, simulation, and documentation) and copyright information.

- **[Header.tsx](src/components/dashboard/Header.tsx)**  
  Provides the title and description of the dashboard.

- **[GaugeCard.tsx](src/components/dashboard/GaugeCard.tsx)**  
  A gauge-style card for visualizing temperature and humidity with color-coded thresholds.

- **[SensorCard.tsx](src/components/dashboard/SensorCard.tsx)**  
  A card for displaying sensor data such as light levels, air quality, and soil moisture with alert conditions.

- **[HistoryChart.tsx](src/components/dashboard/HistoryChart.tsx)**  
  An interactive line chart for visualizing historical sensor data with zoom and pan functionality.

### Pages

- **[page.tsx](src/app/page.tsx)**  
  The main dashboard page that integrates all components and handles different data states (loading, error, empty, and success).

- **[layout.tsx](src/app/layout.tsx)**  
  Defines the root layout of the application, including global styles and metadata.

### Hooks

- **[useThingSpeakData.ts](src/hooks/useThingSpeakData.ts)**  
  A custom hook for fetching data from the ThingSpeak API using SWR for data fetching and caching.

### Libraries

- **[thingspeak.ts](src/lib/thingspeak.ts)**  
  Provides a utility function to fetch data from the ThingSpeak API with error handling.

### Types

- **[index.ts](src/types/index.ts)**  
  Defines TypeScript interfaces for the ThingSpeak API response, including `Feed`, `Channel`, and `ThingSpeakResponse`.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Vitoria-BG/leif_frontend.git
   cd leif_frontend