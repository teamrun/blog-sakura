var db = require('monk')('localhost/blog-sakura');
var Photo = db.get('photo');


// var db = monk("locahost/blog-sakura");

// var Photo = db.get('photo');

var N = 200;
var errCount = 0;

var timeArr = [];
var dis = 5;

console.log(' *******************\n 模拟 每秒写数据库 '+(1000/dis)+'次 \n *******************');

function getP(name){
    return {
        file: 'xx.jpg',
        name: name,
        event: {
            location: '青岛',
            story: 'garden of walking'
        },
        exifBase: {
            iso: 400,
            expose: '1/30'
        }
    };
}

function nowMs(){
    // 返回一个数组, 指代的是机器已开机运行时间
    // nano second, 1/1000 of ms
    // 一个数组, 
    // hrTime =  process.hrtime();
    // return hrTime[0]*1000 + hrTime[1]/1000000;
    return Date.now();
}
// console.log(nowMs());
// setTimeout(function(){
//     console.log(nowMs());
// }, 1000);


for( var i=0; i<N; i++){
    (function(index){
        setTimeout(function(){
            var P = getP( makeDigi(index) );
            var start = nowMs();
            // console.log(start);
            Photo.insert(P, function(err){
                if(!err){
                    var end = nowMs();
                    timeArr[index] = end - start;
                }
                else{
                    errCount++;
                    // console.log('err: ');
                    console.log('err: ', err);
                }
            })
        }, index*dis);
    })(i);
}

setTimeout(function(){
    echoResult(timeArr);

    db.close();
}, N*dis + 50);


function echoResult(timeArr){
    // 
    console.log('前五个: ', timeArr[0], timeArr[1], timeArr[2], timeArr[3],timeArr[4]);

    var line = 10;
    console.log('\n大于'+line+'ms的:');
    timeArr.forEach(function(t, index){
        if( t>line ){
            console.log('    第'+index+'个: ', t);
        }
    });
    // console.log('\n');

    timeArr.sort(function(a, b){
        return a-b;
    });
    console.log('max: ', timeArr[N-errCount-1]);
    console.log('min: ', timeArr[0]);

    var sum = 0;
    timeArr.forEach(function(t){
        sum += t;
    });

    console.log('avg: ', sum/(N-errCount));

    console.log(' -------------------------------- ');
    console.log( timeArr.join(', ') );
    console.log(' -------------------------------- ');
}

function makeDigi(n){
    if( n < 1000 ){
        if(n < 100){
            if( n<10 ){
                return '000' + n;
            }
            else{
                return '00' + n;
            }
        }
        else{
            return '0' + n;
        }
    }
    else{
        return String(n);
    }
}