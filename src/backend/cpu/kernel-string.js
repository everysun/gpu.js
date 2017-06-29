const utils = require('../../utils');
const kernelRunShortcut = require('../kernel-run-shortcut');

module.exports = function(cpuKernel, name) {
	return `() => {
    ${ kernelRunShortcut.toString() };
    const utils = {
      allPropertiesOf: function ${ utils.allPropertiesOf.toString() },
      clone: function ${ utils.clone.toString() },
      /*splitArray: function ${ utils.splitArray.toString() },
      getArgumentType: function ${ utils.getArgumentType.toString() },
      getDimensions: function ${ utils.getDimensions.toString() },
      dimToTexSize: function ${ utils.dimToTexSize.toString() },
      copyFlatten: function ${ utils.copyFlatten.toString() },
      flatten: function ${ utils.flatten.toString() },
      systemEndianness: '${ utils.systemEndianness }',
      initWebGl: function ${ utils.initWebGl.toString() },
      isArray: function ${ utils.isArray.toString() }*/
    };
    class ${ name || 'Kernel' } {
      constructor() {        
        this.argumentsLength = 0;
        this._canvas = null;
        this._webGl = null;
        this.built = false;
        this.program = null;
        this.paramNames = ${ JSON.stringify(cpuKernel.paramNames) };
        this.paramTypes = ${ JSON.stringify(cpuKernel.paramTypes) };
        this.texSize = ${ JSON.stringify(cpuKernel.texSize) };
        this.dimensions = ${ JSON.stringify(cpuKernel.dimensions) };
        this._kernelString = \`${ cpuKernel._kernelString }\`;
		    this.run = function() {
          this.run = null;
          this.build();
          return this.run.apply(this, arguments);
        }.bind(this);
        this.thread = {
          x: 0,
          y: 0,
          z: 0
        };
        this.runDimensions = {
          x: null,
          y: null,
          z: null
        };
      }
      setCanvas(canvas) { this._canvas = canvas; return this; }
      setWebGl(webGl) { this._webGl = webGl; return this; }
      ${ cpuKernel.build.toString() }
      run () { ${ cpuKernel.kernelString } }
      getKernelString() { return this._kernelString; }
    };
    return kernelRunShortcut(new Kernel());
  };`;
};