define([
    'backbone',
    'mustache',
    'routes',
    'jquery',
    'underscore',
    'text!templates/appTemplate.html',
], function(
    Backbone,
    Mustache,
    routes,
    $,
    _,
    template
) {
    'use strict';

    return Backbone.View.extend({

        className: 'guInteractive',

        events: {
            'click .column-header': 'sortTable'
        },
        
        interactiveUrl: "http://gu.com/p/43tkn",

        sharkPhotos: [{
                text: "assets/imgs/sharks/myth1_new-01.jpg",
                // image:"http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/11/21/1416566372336/A-Tiger-Shark-is-watched--002.jpg",
                share:"assets/imgs/share/myth1_done_FB-01.jpg"
            },{
                text: "assets/imgs/sharks/myth2_new-01.jpg",
                // image:"http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/11/21/1416564910327/Protesters-gather-to-rall-002.jpg",
                share:"assets/imgs/share/myth2_done_FB-01.jpg"
            },{
                text: "assets/imgs/sharks/myth3_new-01.jpg",
                // image:"http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/11/21/1416566261228/Australian-surfer-Mark-Vi-001.jpg",
                share:"assets/imgs/share/myth3_done_FB-01.jpg"
            },{
                text: "assets/imgs/sharks/myth4_new-01.jpg",
                // image:"http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/11/21/1416565462215/Great-White-Shark-001.jpg",
                share:"assets/imgs/share/myth4_done_FB-01.jpg"
            },{
                text: "assets/imgs/sharks/myth5_new-01.jpg",
                // image:"http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/11/21/1416565665998/Great-White-Shark-inspect-001.jpg",
                share:"assets/imgs/share/myth5_done_FB-01.jpg"
            },{
                text: "assets/imgs/sharks/myth6_new-01.jpg",
                // image:"http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/11/21/1416565022428/A-Great-White-Shark-inspe-002.jpg",
                share:"assets/imgs/share/myth6_done_FB-01.jpg"
            },{
                text: "assets/imgs/sharks/myth7_new-01.jpg",
                // image:"http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/11/21/1416568571528/A-great-white-shark-001.jpg",
                share:"assets/imgs/share/myth7_done_FB-01.jpg"
            },{
                text: "assets/imgs/sharks/myth8_new-01.jpg",
                // image:"assets/imgs/shark4.jpg",
                share:"assets/imgs/share/myth8_done_FB-01.jpg"
            },{
                text: "assets/imgs/sharks/myth9_new-01.jpg",
                // image:"assets/imgs/shark0.jpg",
                share:"assets/imgs/share/myth9_done_FB-01.jpg"
            },{
                text: "assets/imgs/sharks/myth10_new-01.jpg",
                // image:"http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/11/21/1416566311305/A-great-white-shark-breac-001.jpg",
                share:"assets/imgs/share/myth10_done_FB-01.jpg"
            },{
                text: "assets/imgs/sharks/myth11_new-01.jpg",
                // image:"http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/11/21/1416567171947/Shark-Beach-with-a-shark--001.jpg",
                share:"assets/imgs/share/myth11_done_FB-01.jpg"
        }],
        checkforHashkey:function(){
            var queryString = window.location.href.split('?')[1];
            if(queryString){
                var queryValue = queryString.match(/shark-myth=\d\d|shark-myth=\d/);
                if(queryValue){
                    var mythValue = queryValue[0].split('=')[1];
                    if(mythValue > 0 && mythValue <= this.mythsData.length){
                         $('.mythContainer#myth' + mythValue + ' .imageContainer img').on('load', function() {
                            var mythOffset = $('.mythContainer#myth' + mythValue).offset().top;
                            window.scrollTo(0,mythOffset);
                         });
                        
                    }
                }
            }
        },
        toggleText: function(event){
            var parentContainer =  $(event.currentTarget).closest('.mythContainer');
            if(window.innerWidth<1140){
                var elScrolltop = $(event.currentTarget).offset().top;
                var currentScrollHeight = $(window).scrollTop();
                var difference = elScrolltop - currentScrollHeight;
                
                parentContainer.toggleClass('active');

                if(!parentContainer.hasClass('active')){
                    var elScrolltop = $(event.currentTarget).offset().top;
                    window.scrollTo(0,elScrolltop - difference);
                }
            }else{
                if(parentContainer.hasClass('active')){
                    $('.mythContainer.active').removeClass('active');
                    $('.mythContainer.background').removeClass('background');
                }else{
                    $('.mythContainer.active').removeClass('active');
                    $('.mythContainer').addClass('background');
                    parentContainer.removeClass('background');
                    parentContainer.addClass('active');
                }
            }
            
        },
        disableDetailview: function(e){
            var drag = false;
            $('.guInteractive').on('mousemove',function(d){
                drag = true;
                $('.guInteractive').off('mousemove');
            });
            $('.guInteractive').on('mouseup',function(){
                if(!drag){
                    if(window.innerWidth>=1140){
                        if(e.target.className !== 'toggleReadMore'){
                            if($('.mythContainer.active').length > 0){
                                $('.mythContainer.active').removeClass('active');
                                $('.mythContainer.background').removeClass('background');
                            }
                        } 
                    }
                }
                drag = false;
                $('.guInteractive').off('mouseup');
            });
        },
        checkTextLengths:function(){
            var elem1 = document.querySelector('.mythParagraphs p');
            setTimeout(function(){
                $.each($('.mythContainer'),function(i,myth){
                    var containerHeight = $(myth).find('.mythContent').outerHeight();
                    var paragraphsHeight = $(myth).find('.mythText').outerHeight();
                    var titleHeight = $(myth).find('.titleContainer').outerHeight();
                    if(paragraphsHeight + titleHeight < containerHeight){
                        $(myth).addClass('shortContainer');
                    }
                }); 
            },200);
        },

        shareShark: function(e){
            var mythNumber = Number($(e.currentTarget).attr('data-myth-number'));
            var myth = this.mythsData[mythNumber - 1];
            var shareWindow = "";
            var source = $(e.currentTarget).attr('data-source');
            var facebookTitle = "Guardian shark myths. %23" + mythNumber + " - " + myth.myth;
            var shareUrl = this.interactiveUrl + "?shark-myth=" + mythNumber;
            var imageHTML = "<img src='" + this.sharkPhotos[mythNumber-1].share + "' alt='" + myth.myth + "'/>";
            
            var twitterBaseUrl = "https://twitter.com/home?status=";
            var facebookBaseUrl = "https://www.facebook.com/dialog/feed?display=popup&app_id=741666719251986&link=";
            var pinterestBaseUrl = "http://www.pinterest.com/pin/create/button/?url=";
            var tumblrBaseUrl = "http://www.tumblr.com/share/link?url="
            
            if(source==="twitter"){
                shareWindow = twitterBaseUrl + encodeURIComponent(myth.sharemessage) + "%20" + encodeURIComponent(shareUrl) + "%20" + myth.twitterpic;
            }else if(source==="facebook"){
                shareWindow = facebookBaseUrl + encodeURIComponent(shareUrl) + "&picture=" + this.sharkPhotos[mythNumber-1].share + "&name=" + facebookTitle + "&description=In fact: " + myth.truth + "&redirect_uri=http://www.theguardian.com";
            }else if(source==="tumblr"){
                // http://www.tumblr.com/share/link?url=[uri encoded URL]&amp;name=[title]&amp;description=[description]
                shareWindow = tumblrBaseUrl + encodeURIComponent(shareUrl) + '&name=' + myth.myth + '&description=' + encodeURIComponent(imageHTML) + "%20" + myth.truth;
            }else if(source==="pinterest"){
                shareWindow = pinterestBaseUrl + shareUrl + "&media=" + this.sharkPhotos[mythNumber-1].share + "&description=" + encodeURIComponent(myth.sharemessage);
            }
            window.open(shareWindow, source + "share", "width=640,height=320");
        },

        initialize: function() {
            
        },

        render: function() {
            var _this = this;
            this.mythsData = [];
            this.collection.each(function(model,i){ 
                _this.mythsData[i] = model.attributes;
                _this.mythsData[i].articleImage = _this.sharkPhotos[i].text;
            });
            
            var templateData = { myths: this.mythsData };
            this.$el.html(Mustache.render(template, templateData));

            $('.toggleReadMore').on('click', this.toggleText);
            $('.shareButtons button').on('click', this.shareShark.bind(this));
            $('.guInteractive').on('mousedown', this.disableDetailview);
            $('.guInteractive').on('touchend', this.disableDetailview);

            this.checkforHashkey();
            this.checkTextLengths();
            return this;
        }
    });
});

