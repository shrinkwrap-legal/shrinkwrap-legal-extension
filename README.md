# Shrinkwrap.legal Browser Extension

Frontend to the Shrinkwrap.legal project — offering summaries of court judgements directly embedded into Austria's legal information System ("RIS").

## Prerequisites

- Node.js 22.x
- npm

## Build

Copy the `.env.example` file to a new file named `.env`:

```
cp .env.example .env
```

Install dependencies

```bash
npm i
```

Build the extension with live reload
```bash
npm run watch
```

Build the extension for production use
```bash
npm run build
```

## Configuration

- Environment is configured via `.env`:
  - API_BASE_URL — base URL of the Shrinkwrap.legal API the extension talks to.
- For non-default setups, ensure the backend is reachable from the browser at the configured base URL.

## Generating the API

```bash
npx swagger-typescript-api generate --path https://api.shrinkwrap.legal/api/v3/api-docs
```

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPLv3). See [LICENSE](LICENSE).

This project received financial support from [netidee](https://www.netidee.at/shrinkwraplegal).

