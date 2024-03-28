import createFastify from 'fastify';
import { getActiveSpan } from '@sentry/node';

export const startServer = async () => {
  const app = createFastify();

  app.get('/test-sentry-tracing', async () => {
    const activeSpan = getActiveSpan();

    await fetch('http://localhost:3000/ping?traceId=' + activeSpan?.spanContext().traceId);

    return 'OK';
  });

  app.get('/ping', (request) => {
    console.log({
      headers: request.headers,
    });

    // @ts-expect-error
    const receivedTraceId = request.query.traceId;

    const activeSpan = getActiveSpan();

    if (receivedTraceId !== activeSpan?.spanContext().traceId) {
      throw new Error('Trace ID mismatch');
    }

    return 'pong';
  });

  const address = await app.listen({
    host: '0.0.0.0',
    port: 3000,
  });

  console.log(`Server listening at ${address}`);
};