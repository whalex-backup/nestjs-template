// if we want to check the test configuration, set DEBUG to true

module.exports = async (
  globalConfig: any,
  projectConfig: any,
): Promise<void> => {
  const DEBUG = false;

  if (DEBUG) console.log('jestGlobalSetup.ts', globalConfig, projectConfig);
};
