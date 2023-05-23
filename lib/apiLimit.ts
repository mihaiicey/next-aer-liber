import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

const applyMiddleware = (middleware: (req: any, res: any, next: any) => void) => (
  request: any,
  response: any
): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    middleware(request, response, (result: Error | unknown) =>
      result instanceof Error ? reject(result) : resolve()
    );
  });

const getIP = (request: any): string =>
  request.ip ||
  request.headers['x-forwarded-for'] ||
  request.headers['x-real-ip'] ||
  request.connection.remoteAddress;

export const getRateLimitMiddlewares = ({
  limit = 20,
  windowMs = 60 * 1000,
  delayAfter = Math.round(10 / 2),
  delayMs = 500,
} = {}): ((req: any, res: any, next: any) => void)[] => [
  slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
  rateLimit({ keyGenerator: getIP, windowMs, max: limit }),
];

const middlewares = getRateLimitMiddlewares();

async function applyRateLimit(request: any, response: any): Promise<void> {
  await Promise.all(
    middlewares.map(applyMiddleware).map((middleware) => middleware(request, response))
  );
}

export default applyRateLimit;