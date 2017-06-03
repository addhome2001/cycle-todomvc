/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

function buildConfig(env) {
  return require(`./webpack/${env}`)();
}

module.exports = buildConfig;
