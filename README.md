# Sentry Tracing with OpenTelemetry

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