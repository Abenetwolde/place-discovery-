// pages/api/map.js (or app/api/map/route.js for App Router)
export default async function handler(req:any , res:any){
    const { center, zoom, size, markers, key } = req.query;
    const url = `https://api.ambalaymaps.com/v1/staticmap?center=${center}&zoom=${zoom}&size=${size}&markers=${markers}&key=${key}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
      const buffer = await response.arrayBuffer();
      res.setHeader('Content-Type', 'image/png');
      res.send(Buffer.from(buffer));
    } catch (error:any) {
      res.status(500).send(`Error fetching map: ${error.message}`);
    }
  }