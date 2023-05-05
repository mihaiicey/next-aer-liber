import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { city } = req.query;
  if (typeof city !== 'undefined' && city !== 'all') {
      const allSensors = await prisma.wpfy_urm_devices.findMany({
        where: {
          city: city as string,
          status: true
        },
        orderBy: {
          id: 'asc'
        }
      });
      res.status(200).json(allSensors);
      
  }else{
      const allSensors = await prisma.wpfy_urm_devices.findMany({
        where: {
          status: true
        },
        orderBy: {
          id: 'asc'
        }
      });
      res.status(200).json(allSensors);
  }
}
