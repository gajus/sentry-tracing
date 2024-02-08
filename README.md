# Example of Sentry tracing using OpenTelemetry and ESM modules

```bash
pnpm install
pnpm start

export SENTRY_DSN=...

curl http://localhost:3000/test-sentry-tracing
```

Expected result: console logs span ID.

Actual result: cannot find span ID.

## Notes

- This works only with `pnpm` because we use `package.json#resolutions` to force packages to use the same version.
- It is important to use `resolutions` for `@opentelemetry/*` because Sentry might use older package versions. Loading multiple versions of `@opentelemetry/*` packages will cause issues.