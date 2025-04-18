# Shrinkwrap Legal Extension Development Guidelines

This document provides essential information for developers working on the Shrinkwrap Legal browser extension.

## Build and Configuration

### Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Development build with watch mode (automatically rebuilds on file changes):
   ```
   npm run watch
   ```

3. Production build:
   ```
   npm run build
   ```

### Build Configuration

The project uses webpack with separate configurations:

- `webpack.common.js`: Base configuration shared between development and production
- `webpack.dev.js`: Development-specific settings (includes source maps)
- `webpack.prod.js`: Production-specific settings (optimized for deployment)

### Extension Structure

The extension follows the standard Chrome extension architecture:
- `background.ts`: Background script
- `content_script.tsx`: Content script injected into pages
- `Sidepanel.tsx`: UI for the extension's side panel
- `Options.tsx`: Extension options page

## Testing

### Running Tests

Run all tests:
```
npm test
```

Or directly with Jest:
```
npx jest
```

Run specific tests:
```
npx jest path/to/test
```

### Test Configuration

- Tests use Jest with ts-jest for TypeScript support
- Test files are located in `src/__tests__/` directory
- Tests use a special TypeScript configuration (`tsconfig.test.json`) that extends the main configuration but uses Node.js module resolution

### Creating Tests

1. Create test files in the `src/__tests__/` directory
2. Name test files with the same name as the file being tested
3. Use Jest's `describe` and `test` functions to organize tests
4. Import the functions/components to test from their source files

Example test file structure:

```typescript
import { functionToTest } from "../path/to/source";

describe("Component or function name", () => {
  test("specific behavior being tested", () => {
    expect(functionToTest(input)).toBe(expectedOutput);
  });
});
```

## Development Guidelines

### TypeScript Configuration

- The project uses strict TypeScript typing
- Target is ES6
- JSX is configured for React

### Code Style

- Use Prettier for code formatting:
  ```
  npm run style
  ```

### API Generation

The project can generate TypeScript API clients from Swagger/OpenAPI:

```
npm run generate-api
```

This creates typed API clients in `src/api/generated.ts`.

### Project Structure

- `src/`: Source code
  - `__tests__/`: Test files
  - `components/`: React components
  - `hooks/`: React hooks
  - `styles/`: SCSS stylesheets
  - `types/`: TypeScript type definitions
  - `utils/`: Utility functions

### Browser Extension Development

When developing, load the extension from the `dist/` directory into your browser:

1. Build the extension (`npm run watch` or `npm run build`)
2. Open Chrome/Edge extensions page (chrome://extensions or edge://extensions)
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `dist/` directory