import { init } from '@sentry/node';

export const createSentry = () => {
  init({
    debug: true,
    normalizeDepth: 5,
    tracesSampler: (samplingContext) => {
      // TODO - why is this not being called?
      console.log({ samplingContext });

      return true;
    },
  });
};
