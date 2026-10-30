import {build} from 'vite';
await build();
for(const mode of ['portal'])await build({configFile:'vite.app.config.ts',mode});
