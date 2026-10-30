import {build} from 'vite';
await build();
for(const mode of ['portal','pricing','lifecycle','pre-contract','launch-tracker'])await build({configFile:'vite.app.config.ts',mode});
