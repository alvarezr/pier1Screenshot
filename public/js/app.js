var app = (function () {
    var imagesData = "screenshots";
    var viewModel = {};

    function loadImages() {
        var res = $.get(imagesData)
        .done(function(data){
            data = JSON.parse(data);
            console.log(data);
            ko.applyBindings({'images':data.imgs});
            initGallery();
        });
    }

    function AppViewModel(imgs){
        this.images = ko.observableArray(imgs);
    }

    function initGallery(){
        $('.grid').masonry({
            itemSelector: '.grid-item', // use a separate class for itemSelector, other than .col-
            columnWidth: '.grid-sizer',
            percentPosition: true
        });
    }

    return {
        loadImages: loadImages
    };
 
 })();
 console.log(ko);
app.loadImages();
