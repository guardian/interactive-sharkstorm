// Library paths
// If you want to use a new library, add it here.
require.config({
   paths: {
      'underscore'      : '../libs/underscore',
      'jquery'          : '../libs/jquery',
      'backbone'        : '../libs/backbone',
      'crossdomain'     : '../libs/Backbone.CrossDomain',
      'nestedmodel'     : '../libs/backbone-nested',
      'text'            : '../libs/text',
      'json'            : '../libs/json',
      'd3'              : '../libs/d3',
      'mustache'        : '../libs/mustache',
      'iframeMessenger' : '../libs/iframeMessenger'
   },
   shims: {
       backbone: {
           deps: ['underscore', 'jquery'],
           exports: 'Backbone'
       }
   }
});

