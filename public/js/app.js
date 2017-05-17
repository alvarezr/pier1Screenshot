var app = (function () {
    var imagesData = "screenshots";
    var viewModel = {};

    function loadImages() {
        var res = $.get(imagesData)
        .done(function(data){
            data = JSON.parse(data);
            ko.applyBindings({'images':data.imgs});
            initGallery();    
        });
    }

    function AppViewModel(imgs){
        this.images = ko.observableArray(imgs);
    }

    function initGallery(){
        console.log('init masonry');
        var $grid = $('.grid');
        $grid.masonry({
                itemSelector: '.grid-item-col',
                percentPosition: true,
                columnWidth: '.grid-item-col'
            }); 
            
        // $('.materialboxed').materialbox();
    }

    return {
        loadImages: loadImages
    };
 
 })();

app.loadImages();

jQuery( document ).ready( function( $ ) {
  var $container = $('.grid').masonry({
    columnWidth: 1
  });
  
  $container.imagesLoaded( function() {
    $container.masonry();
  });
});

