"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryWatcher = void 0;
const chokidar_1 = __importDefault(require("chokidar"));
class DirectoryWatcher {
    constructor(config) {
        this.config = config;
        this.watcher = null;
        this.ready = new Promise((resolve) => {
            this.watcher = chokidar_1.default.watch(config.directory, {
                persistent: true,
                ignoreInitial: true,
            });
            this.watcher.on('ready', resolve);
        });
    }
    start() {
        var _a;
        const { onCreate, onUpdate, onDelete, onMove, onRename } = this.config;
        (_a = this.watcher) === null || _a === void 0 ? void 0 : _a.on('add', (path) => onCreate && onCreate(path)).on('change', (path) => onUpdate && onUpdate(path)).on('unlink', (path) => onDelete && onDelete(path)).on('addDir', (path) => onCreate && onCreate(path)).on('unlinkDir', (path) => onDelete && onDelete(path)).on('rename', (oldPath, newPath) => onRename && onRename(oldPath, newPath)).on('move', (oldPath, newPath) => onMove && onMove(oldPath, newPath));
    }
    stop() {
        if (this.watcher) {
            this.watcher.close();
            this.watcher = null;
        }
    }
}
exports.DirectoryWatcher = DirectoryWatcher;
