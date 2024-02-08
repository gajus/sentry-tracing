import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import opentelemetry from '@opentelemetry/sdk-node';
import { init } from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import {
  getClient,
  SentryPropagator,
  SentrySampler,
  SentrySpanProcessor,
  setOpenTelemetryContextAsyncContextStrategy,
  setupEventContextTrace,
  setupGlobalHub,
  wrapContextManagerClass,
} from '@sentry/opentelemetry';

export const createSentry = () => {
  setupGlobalHub();

  init({
    debug: true,
    instrumenter: 'otel',
    integrations: [
      new ProfilingIntegration(),
    ],
    normalizeDepth: 5,
    tracesSampler: (samplingContext) => {
      // TODO - why is this not being called?
      console.log({ samplingContext });

      return true;
    },
  });

  const client = getClient();

  if (!client) {
    throw new Error('Sentry client not initialized');
  }

  setupEventContextTrace(client);

  // You can wrap whatever local storage context manager you want to use
  const SentryContextManager = wrapContextManagerClass(
    AsyncLocalStorageContextManager,
  );

  const sdk = new opentelemetry.NodeSDK({
    contextManager: new SentryContextManager(),
    instrumentations: [
      getNodeAutoInstrumentations({
        // Disabling this to avoid hitting ENOENT errors
        '@opentelemetry/instrumentation-fs': {
          enabled: false,
        },
      }),
    ],
    sampler: new SentrySampler(client),
    spanProcessor: new SentrySpanProcessor(),
    textMapPropagator: new SentryPropagator(),
    traceExporter: new OTLPTraceExporter(),
  });

  // Ensure OpenTelemetry Context & Sentry Hub/Scope is synced
  setOpenTelemetryContextAsyncContextStrategy();

  return {
    shutdown: async () => {
      await sdk.shutdown();
    },
  };
};
