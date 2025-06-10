import { createTool } from '@mastra/core/tools';
import { createMCPTool } from '@mastra/core/mcp';
import { z } from 'zod';

interface GeocodingResponse {
  results: {
    latitude: number;
    longitude: number;
    name: string;
  }[];
}
interface WeatherResponse {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    wind_gusts_10m: number;
    weather_code: number;
  };
}

export const weatherTool = createTool({
  id: 'get-weather',
  description: 'Get current weather for a location',
  inputSchema: z.object({
    location: z.string().describe('City name'),
  }),
  outputSchema: z.object({
    temperature: z.number(),
    feelsLike: z.number(),
    humidity: z.number(),
    windSpeed: z.number(),
    windGust: z.number(),
    conditions: z.string(),
    location: z.string(),
  }),
  execute: async ({ context }) => {
    return await getWeather(context.location);
  },
});

const getWeather = async (location: string) => {
  const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`;
  const geocodingResponse = await fetch(geocodingUrl);
  const geocodingData = (await geocodingResponse.json()) as GeocodingResponse;

  if (!geocodingData.results?.[0]) {
    throw new Error(`Location '${location}' not found`);
  }

  const { latitude, longitude, name } = geocodingData.results[0];

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_gusts_10m,weather_code`;

  const response = await fetch(weatherUrl);
  const data = (await response.json()) as WeatherResponse;

  return {
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    windGust: data.current.wind_gusts_10m,
    conditions: getWeatherCondition(data.current.weather_code),
    location: name,
  };
};

function getWeatherCondition(code: number): string {
  const conditions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  return conditions[code] || 'Unknown';
}

export const ikasTool = createMCPTool({
  command: 'npx',
  args: [
    'mcp-remote',
    'https://api.myikas.dev/api/admin/mcp',
    '--header',
    'Authorization:${IKAS_ADMIN_AUTH_TOKEN}',
    '--debug'
  ],
  env: {
    IKAS_ADMIN_AUTH_TOKEN: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmZTZhOTEzLWE3YjYtNDQyMy1iODA3LTU0OTc1ZGM4NGI3NSIsImVtYWlsIjoib21lcmNhbkBpa2FzLmNvbSIsImZpcnN0TmFtZSI6IsOWbWVyY2FuIiwibGFzdE5hbWUiOiLDh2VsaWtsZXIiLCJtZXJjaGFudElkIjoiNjEyZDkyMmYtZWJkZi00YTQzLWJkNWEtM2M1ZDUzMjFjMjY2Iiwic3RvcmVOYW1lIjoicmFmYXNpbHZhIiwiaW1hZ2VJZCI6IjlhYzNhN2ZjLTI3MGEtNGIzNy05YjIxLTMzZGUxZmJlZDI2NCIsInR5cGUiOjEwMCwiZmVhdHVyZXMiOltdLCJsYW5ndWFnZSI6InRyIiwibGltaXRzIjp7IjIiOjEwLCIzIjoxLCI0IjoyLCI1IjoxNSwiNiI6MSwiNyI6MywiOCI6MywiOSI6MSwiMTEiOjIsIjEyIjoxLCIxMyI6MSwiMTUiOjIsIjE3IjoxLCIxOCI6MSwiMTkiOjIsIjIxIjoxLCIyMiI6MiwiMjMiOjIsIjI0IjoxLCIyNSI6MSwiMjYiOjEsIjI3IjoxLCIyOCI6MSwiMjkiOjEsIjMwIjoxLCIzMiI6MSwiMzMiOjEsIjM0IjoxLCIzNSI6MSwiMzYiOjIsIjM4IjoxLCIzOSI6MSwiNDEiOjEsIjQyIjoxLCI0MyI6MiwiNDQiOjMsIjQ1IjoyfSwibWZhIjowLCJpYXQiOjE3NDk1NTE4MDksImV4cCI6MTc0OTYzODIwOSwiYXVkIjoicmFmYXNpbHZhLm15aWthcy5kZXYiLCJpc3MiOiJyYWZhc2lsdmEubXlpa2FzLmRldiIsInN1YiI6Im9tZXJjYW5AaWthcy5jb20ifQ.2s4kgC1alpLJ1Txhm4DieCHf0OuSfcT91YHgYGrzgB0'
  }
});
