import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { city } = req.query;
    const allSensors = await prisma.wpfy_urm_devices.findMany({
      where: {
        city: city as string,
        status: true
      },
      orderBy: {
        id: 'asc'
      }
    });
    if (allSensors.length === 0) {
      res.status(404).json({ message: 'Invalid sensor' });
    } else {
      res.status(200).json(allSensors);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
