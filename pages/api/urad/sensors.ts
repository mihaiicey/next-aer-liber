import type { NextApiRequest, NextApiResponse } from "next";
import applyRateLimit from "../../../lib/apiLimit";
export default async function UradSensor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  applyRateLimit(req, res)
    .then(async () => {

      const token = req.headers["authorization"];

      if (token !== process.env.MY_SECRET_TOKEN) {
        return res.status(401).json({
        success: false,
        message: [{err:'not allowed'}],
      });
      }

      const { id, sensor, startInt, endInt } = req?.query ?? {};

      const queryParts = [];

      if (id) {
        queryParts.push(id);
      }

      if (sensor) {
        queryParts.push(sensor);
      }

      if (startInt) {
        queryParts.push(startInt);
      }

      if (endInt) {
        queryParts.push(endInt);
      }

      const query = `${process.env.URAD_URL}/${queryParts.join("/")}`;
      const options = {
        method: "GET",
        headers: {
          "X-User-id": `${process.env.X_USER_ID}`,
          "X-User-hash": `${process.env.X_USER_HASH}`,
        },
        maxRedirects: 20,
      };
      const responseData = {
        success: false,
        message: [],
      };

      try {
        const rest = await fetch(query, options);
        const data = await rest.json();

        responseData.success = true;
        responseData.message = data;

        return res.status(200).send(responseData);
      } catch (error: any) {
        responseData.success = false;
        responseData.message = error;
        console.log(error);
        res.status(500).json(responseData);
      }
      return res.status(404).send({
        success: false,
        message: [{err:'notfound'}],
      });
    })
    .catch((error: Error) => {
      // Tratează eroarea de rate limit aici
      res.status(429).json({ error: "Too Many Requests" });
    });
}
