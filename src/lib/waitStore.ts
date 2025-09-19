type Resolver = (data: { buffer: Buffer; mime: string; filename: string }) => void;

let resolver: Resolver | null = null;

export function waitForFile(): Promise<{ buffer: Buffer; mime: string; filename: string }> {
    return new Promise((resolve) => {
        resolver = resolve;
    });
}

export function pushFile(file: { buffer: Buffer; mime: string; filename: string }) {
    if (resolver) {
        resolver(file);
        resolver = null;
    }
}
