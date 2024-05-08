
checkModuleEnvironment().then(moduleType => {
  if (moduleType === 'ESM') {
    // import('./browser/browser.js').then(({browser}) => {
      // use browser
      console.log('using browser');
    // });
  } else if (moduleType === 'CommonJS') {
    // import('./node/node.js').then(({node}) => {
      // use node
      console.log('using node');
    // });
  }
});

async function checkModuleEnvironment(){
  try {
    // `import.meta` is only available inside ES modules
    if (typeof import.meta !== 'undefined') {
      return 'ESM';
    }
  } catch (e) {
    console.log('Module system is not ESM');
    try {
      // `module.exports` specific to CommonJS
      if (module && module.exports) {
          return 'CommonJS';
      }
    } catch (e) {
      console.log('Unknown or unsupported module system');
    }
  }
}