import { DirectoryWatcher, WatcherConfig } from '../src/DirectoryWatcher';
import fs from 'fs';
import path from 'path';

describe('DirectoryWatcher', () => {
  const testDir = path.join(__dirname, 'test-dir');
  let watcher: DirectoryWatcher;
  let events: string[] = [];

  const mockConfig: WatcherConfig = {
    directory: testDir,
    onCreate: (filePath) => events.push(`create: ${filePath}`),
    onUpdate: (filePath) => events.push(`update: ${filePath}`),
    onDelete: (filePath) => events.push(`delete: ${filePath}`),
  };

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });


  beforeEach(async () => {
    events = [];
    watcher = new DirectoryWatcher(mockConfig);
    watcher.start();
    await watcher.ready; // Ensure the watcher is ready before proceeding
  });

  afterEach(() => {
    watcher.stop();
    fs.rmdirSync(testDir, { recursive: true });
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    fs.rmdirSync(testDir, { recursive: true });
  });

  it('should trigger onCreate when a file is created', (done) => {
    const filePath = path.join(testDir, 'test-file.txt');

    fs.writeFileSync(filePath, 'Hello, World!');
    setTimeout(() => {
      expect(events).toContain(`create: ${filePath}`);
      done();
    }, 500);
  }, 100 * 1000);

  it('should trigger onUpdate when a file is updated', (done) => {
    const filePath = path.join(testDir, 'test-file.txt');
    fs.writeFileSync(filePath, 'Hello, World!');

    setTimeout(() => {
      fs.appendFileSync(filePath, ' Updated!');
      setTimeout(() => {
        expect(events).toContain(`update: ${filePath}`);
        done();
      }, 500);
    }, 500);
  });

  it('should trigger onDelete when a file is deleted', (done) => {
    const filePath = path.join(testDir, 'test-file.txt');
    fs.writeFileSync(filePath, 'Hello, World!');

    setTimeout(() => {
      fs.unlinkSync(filePath);
      setTimeout(() => {
        expect(events).toContain(`delete: ${filePath}`);
        done();
      }, 500);
    }, 500);
  });

  it('should handle multiple events correctly', (done) => {
    const filePath1 = path.join(testDir, 'file1.txt');
    const filePath2 = path.join(testDir, 'file2.txt');

    fs.writeFileSync(filePath1, 'File 1');
    fs.writeFileSync(filePath2, 'File 2');

    setTimeout(() => {
      fs.unlinkSync(filePath1);
      fs.appendFileSync(filePath2, ' Updated!');

      setTimeout(() => {
        expect(events).toContain(`create: ${filePath1}`);
        expect(events).toContain(`create: ${filePath2}`);
        expect(events).toContain(`delete: ${filePath1}`);
        expect(events).toContain(`update: ${filePath2}`);
        done();
      }, 1000);
    }, 500);
  });
});
