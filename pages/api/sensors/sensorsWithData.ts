import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query;

  if (typeof city !== 'undefined' && city !== 'all') {
    const devicesWithSensors = await prisma.$queryRaw`
       SELECT wpfy_urm_devices.*, CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', wpfy_urm_device_sensors.id, 'sensor', wpfy_urm_device_sensors.sensor, 'label', wpfy_urm_device_sensors.label, 'unit', wpfy_urm_device_sensors.unit, 'average', wpfy_urm_device_sensors.average)), ']') as sensordata
        FROM wpfy_urm_devices
        LEFT JOIN wpfy_urm_device_sensors ON wpfy_urm_devices.id = wpfy_urm_device_sensors.device_id
        WHERE wpfy_urm_devices.city = ${city} AND wpfy_urm_devices.status = true
        GROUP BY wpfy_urm_devices.id;
    `;
    res.status(200).json(devicesWithSensors);
  } else {
    const devicesWithSensors = await prisma.$queryRaw`
        SELECT wpfy_urm_devices.*, CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', wpfy_urm_device_sensors.id, 'sensor', wpfy_urm_device_sensors.sensor, 'label', wpfy_urm_device_sensors.label, 'unit', wpfy_urm_device_sensors.unit, 'average', wpfy_urm_device_sensors.average)), ']') as sensordata
        FROM wpfy_urm_devices
        LEFT JOIN wpfy_urm_device_sensors ON wpfy_urm_devices.id = wpfy_urm_device_sensors.device_id
        WHERE wpfy_urm_devices.status = true
        GROUP BY wpfy_urm_devices.id;
    `;
    res.status(200).json(devicesWithSensors);
  }
}
