# Sentry Tracing with OpenTelemetry

Read https://gajus.com/blog/how-to-add-sentry-tracing-to-your-node-js-app

```bash
pnpm install
pnpm build
pnpm start

export SENTRY_DSN=...

curl http://localhost:3000/test-sentry-tracing
```

Expected output:

```bash
$ curl 'http://0.0.0.0:3000/test-sentry-tracing'
OK
```