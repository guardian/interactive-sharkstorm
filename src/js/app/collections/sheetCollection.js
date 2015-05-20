define([
    'backbone',
    'underscore',
    'nestedmodel',
    'crossdomain'
],function(
    Backbone,
    _
) {
    'use strict';
    
    return Backbone.Collection.extend({

        url: function() {
            return 'http://interactive.guim.co.uk/spreadsheetdata/'+this.key+'.json';
        },

        model: Backbone.NestedModel.extend({}),

        initialize: function(options) {
            this.sheetname = options.sheetname;
            this.key = options.key;
        },

        parse: function(data) {
            if (!data ||
                !data.hasOwnProperty('sheets') ||
                !data.sheets.hasOwnProperty(this.sheetname)
            ) {
                console.error('Error parsing sheet JSON');
                return false;
            }

            var sheet = data.sheets[this.sheetname];

            return _.map(sheet, function(row,i) {
                // Add <p>'s on line breaks
                row.bodytext = row.bodytext.split('\n')
                    .filter(function(paragraph){
                        if(paragraph.length>4){
                            return paragraph;
                        }
                    });
                return row;
            });

             
        }

    });
});

