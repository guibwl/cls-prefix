const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const rootDir = fs.realpathSync(process.cwd());

const configPath = path.resolve(rootDir, 'config/rollup.config.js');

const setEnvHandler = env => {
  process.env.BROWSERSLIST_ENV = env;
  process.env.CLSPRIFIX_ENV = env;
};

const execBuildConfig =  (env) => {

  if (env) setEnvHandler(env);

  cp.execSync(
    `rimraf ${env} && node ${configPath}`,
    {
      cwd: rootDir,
      stdio: 'inherit',
    }
  );
}

// Building with different environments
// UMD
execBuildConfig('umd');
// EsModules
execBuildConfig('esm');
