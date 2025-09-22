type FilePayload = { buffer: Buffer; mime: string; filename: string };

type Resolver = (data: FilePayload) => void;

let resolver: Resolver | null = null;
let lastFile: FilePayload | null = null;

export function waitForFile(): Promise<FilePayload> {
    if (lastFile) {
        const file = lastFile;
        lastFile = null;
        return Promise.resolve(file);
    }

    return new Promise((resolve) => {
        resolver = resolve;
    });
}

export function pushFile(file: FilePayload) {
    if (resolver) {
        resolver(file);
        resolver = null;
    } else {
        lastFile = file;
    }
}
