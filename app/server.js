import { register } from "node:module";
import { pathToFileURL } from "node:url";
import { createSentry } from './createSentry.js';
import { setTimeout as delay } from 'timers/promises';

register("import-in-the-middle/hook.mjs", pathToFileURL("./"));

const main = async () => {
  await createSentry();

  await delay(1000);

  // We need this because we have to guarantee that tracing instrumentation
  // is initialized before we import any modules that need to be instrumented.
  const { startServer } = await import('./startServer.js');

  await startServer();
};

main();