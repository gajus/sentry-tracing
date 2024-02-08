import createFastify from 'fastify';
import { context, trace } from '@opentelemetry/api';
import { getActiveSpan } from '@sentry/opentelemetry';

export const startServer = async () => {
  const app = createFastify();

  app.get('/test-sentry-tracing', async () => {
    const activeContext = context.active();

    console.log('activeContext', activeContext);

    console.log('activeSpan', trace.getSpan(activeContext));

    console.log('getActiveSpan', getActiveSpan());

    return 'OK';
  });

  const address = await app.listen({
    host: '0.0.0.0',
    port: 3000,
  });

  console.log(`Server listening at ${address}`);
};