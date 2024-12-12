import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    preprocess({
      postcss: true,
      typescript: {
        tsconfigFile: './tsconfig.json',
        compilerOptions: {
          moduleResolution: 'node',
          target: 'esnext',
          module: 'esnext'
        }
      }
    })
  ],

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
      strict: true
    }),
    paths: {
      base: '',
      assets: ''
    },
    appDir: 'app',
    prerender: {
      entries: ['*'],
      handleHttpError: 'warn'
    }
  },
};

export default config;
