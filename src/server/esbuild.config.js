const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
    entryPoints: ['./server.js'],
    bundle: true,
    platform: 'node',
    target: 'node22',
    format: 'cjs',
    outdir: path.resolve(__dirname, '../build/server'), // Output directory
    // external: ['express'],
}).then(() => {
    console.log('Build completed');
}).catch(() => process.exit(1));
