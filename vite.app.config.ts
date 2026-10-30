import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const repository=fileURLToPath(new URL('.',import.meta.url));
export default defineConfig(({mode})=>{
 if(!['portal','pricing','lifecycle','pre-contract','launch-tracker'].includes(mode))throw new Error('Select a FERN application using --mode.');
 return {root:path.join(repository,'apps',mode),base:'./',plugins:[react(),tailwindcss()],define:{'import.meta.env.VITE_FERN_APPS':JSON.stringify('off')},server:{host:'127.0.0.1',fs:{allow:[repository]}},preview:{host:'127.0.0.1'},build:{outDir:path.join(repository,'dist',mode),emptyOutDir:true}};
});
