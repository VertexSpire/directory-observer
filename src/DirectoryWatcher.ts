import chokidar, { FSWatcher } from 'chokidar';
import { promisify } from 'util';

export interface WatcherConfig {
  directory: string;
  pattern?: string;
  onCreate?: (path: string) => void;
  onUpdate?: (path: string) => void;
  onDelete?: (path: string) => void;
  onMove?: (oldPath: string, newPath: string) => void;
  onRename?: (oldPath: string, newPath: string) => void;
}


export class DirectoryWatcher {
  private watcher: FSWatcher | null = null;

  public ready: Promise<void>;

  constructor(private config: WatcherConfig) {
    this.ready = new Promise((resolve) => {
      this.watcher = chokidar.watch(config.directory, {
        persistent: true,
        ignoreInitial: true,
      });

      this.watcher.on('ready', resolve);
    });
  }

  public start(): void {
    const { onCreate, onUpdate, onDelete, onMove, onRename } = this.config;

    this.watcher
      ?.on('add', (path) => onCreate && onCreate(path))
      .on('change', (path) => onUpdate && onUpdate(path))
      .on('unlink', (path) => onDelete && onDelete(path))
      .on('addDir', (path) => onCreate && onCreate(path))
      .on('unlinkDir', (path) => onDelete && onDelete(path))
      .on('rename', (oldPath, newPath) => onRename && onRename(oldPath, newPath))
      .on('move', (oldPath, newPath) => onMove && onMove(oldPath, newPath));
  }

  public stop(): void {
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }
  }
}

