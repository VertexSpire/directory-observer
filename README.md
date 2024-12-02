
# Directory Observer

A simple Node.js package to watch a directory for file events like `create`, `update`, `delete`, `move`, and `rename`. It also supports filtering files by patterns.

## Installation

```bash
npm install directory-observer
```

## Usage

### Basic Example

```typescript
import { DirectoryWatcher } from "directory-watcher";

const watcher = new DirectoryWatcher({
  directory: "./watched-folder",
  pattern: "*.txt",
  onCreate: (path) => console.log(`File created: ${path}`),
  onUpdate: (path) => console.log(`File updated: ${path}`),
  onDelete: (path) => console.log(`File deleted: ${path}`),
});

watcher.start();

// Stop the watcher when needed
// watcher.stop();
```

### Options

| Option    | Type     | Description                                                                                      |
|-----------|----------|--------------------------------------------------------------------------------------------------|
| `directory` | `string` | The directory to watch.                                                                          |
| `pattern`   | `string` | (Optional) Glob pattern to filter the files to watch.                                            |
| `onCreate`  | `function` | (Optional) Callback triggered when a file is created.                                           |
| `onUpdate`  | `function` | (Optional) Callback triggered when a file is updated.                                           |
| `onDelete`  | `function` | (Optional) Callback triggered when a file is deleted.                                           |
| `onMove`    | `function` | (Optional) Callback triggered when a file is moved.                                             |
| `onRename`  | `function` | (Optional) Callback triggered when a file is renamed.                                           |

## Development

### Scripts

| Script       | Description                      |
|--------------|----------------------------------|
| `npm run build` | Compiles the TypeScript code.  |
| `npm run lint`  | Runs the linter.               |
| `npm run format`| Formats code using Prettier.   |

### Testing

Tests are written using [Jest](https://jestjs.io/). To run the tests:

```bash
npm test
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
