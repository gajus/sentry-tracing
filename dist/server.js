import { register } from "node:module";
import { pathToFileURL } from "node:url";
import { createSentry } from './createSentry.js';
register("import-in-the-middle/hook.mjs", pathToFileURL("./"));
const main = async () => {
    await createSentry();
    // We need this because we have to guarantee that tracing instrumentation
    // is initialized before we import any modules that need to be instrumented.
    const { startServer } = await import('./startServer.js');
    await startServer();
};
void main();
//# sourceMappingURL=server.js.map