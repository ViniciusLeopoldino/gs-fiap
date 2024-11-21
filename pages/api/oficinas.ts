import type { NextApiRequest, NextApiResponse } from 'next';

interface Office {
  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface ResponseData {
  offices: Office[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | { error: string }>) {
  const { lat, lng, radius } = req.query;

  const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!lat || !lng || !radius) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=oficina&key=${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
    const data = await response.json();

    if (data.results) {
      // Filtrando oficinas pelo nome "oficina" no resultado da API do Google Maps
      const offices: Office[] = data.results.filter((place: any) => place.name.toLowerCase().includes('oficina'));
      res.status(200).json({ offices });
    } else {
      res.status(404).json({ error: 'No offices found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

