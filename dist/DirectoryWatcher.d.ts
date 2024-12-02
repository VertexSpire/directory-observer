export interface WatcherConfig {
    directory: string;
    pattern?: string;
    onCreate?: (path: string) => void;
    onUpdate?: (path: string) => void;
    onDelete?: (path: string) => void;
    onMove?: (oldPath: string, newPath: string) => void;
    onRename?: (oldPath: string, newPath: string) => void;
}
export declare class DirectoryWatcher {
    private config;
    private watcher;
    ready: Promise<void>;
    constructor(config: WatcherConfig);
    start(): void;
    stop(): void;
}
