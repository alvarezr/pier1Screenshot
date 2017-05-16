var fs = require('fs'),
path = require('path'),
imagesFile = './public/images';

function imagesPath(filename) {
    var stats = fs.lstatSync(filename),
        info = {
            fullPath: filename,
            path: '/images/' + path.basename(filename),
            name: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.imgs = fs.readdirSync(filename).map(function(child) {
            return imagesPath(filename + '/' + child);
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";
    }

    return info;
}

module.exports.getJSON = function(){
     return imagesPath(imagesFile);
}