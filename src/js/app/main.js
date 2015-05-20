define([
    'backbone',
    'collections/sheetCollection',
    'views/appView',
    'json!data/sampleData.json',
    'iframeMessenger',
    'jquery'
], function(
    Backbone,
    SheetCollection,
    AppView,
    SampleData,
    iframeMessenger,
    $
) {
   'use strict';

    var appView;
    
    // Your proxied Google spreadsheet goes here
    var key = '1MmuJlli8VE4eEVgv94NHCTIrgIVE3UGJt2sJ8YJCeFg';

    function init(el, context, config, mediator) {
        // DEBUG: What we get given on boot
        // console.log(el, context, config, mediator);
        console.log($(el));
        $(el).closest('article').css('z-index',3);
        $(el).closest('article').css('position','relative');
        // Load local JSON data
        // console.log(SampleData);
        var sharksData = new SheetCollection({
            key: key,
            sheetname: "Sheet1"
        });
        
        
        // Create an app view, passing along the collection made above
        appView = new AppView({
            el: el,
            collection: sharksData
        });
        appView.collection.on('sync', appView.render, appView);

        // Fetch data
        sharksData.fetch();
        // Start listening to URL #paths
        Backbone.history.start();
        
        // Enable iframe resizing on the GU site
        iframeMessenger.enableAutoResize();
    }
    
    return {
        init: init
    };
});
