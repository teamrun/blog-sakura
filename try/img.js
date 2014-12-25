var lwip = require('lwip');

// var file = '../.uploadTmp/76342414324feb2b6ddf827f402879c4.png';
// var file = '/Users/chenllos/Downloads/50\ COOLEST\ ALBUM\ COVERS/2048.jpg';
var file = '/Users/chenllos/Downloads/ape-450151.jpg';

console.time('resize-lwip');
lwip.open(file, function(err, img){
    img.batch().resize(400, 'auto').writeFile('./resized.png', function(err){
        console.log(err);
        console.timeEnd('resize-lwip');
    });
});