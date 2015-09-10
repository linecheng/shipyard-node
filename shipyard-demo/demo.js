var Docker = require('../lib/docker');


var docker = new Docker({
	host:'http://192.168.5.152',
	port:8081,
	serviceKey:"7ER9.xwdkdrVzrN.UEb1rBaRGR.1rnRJOqFe"
});

// docker.createContainer({
// 	Image:"cjt01/static_web",
// 	Cmd:['/bin/bash'],
// 	name:"myshipyardtest7",
// 	ShipyardExt:{
// 		Type:"service"
// 	}
// },function(data){
// 	console.log(data)
// })


// docker.createContainer({
// 	Image:'ubuntu',
// 	AttachStdin:false,
// 	AttachStdout:true,
// 	Tty:true,
// 	Cmd:['/bin/bash','-c','tail -f /var/log/dmesg'],
// 	OpenStdin:false,
// 	StdinOnce:false,
// 	name:"myshipyardtest8",
// 	ShipyardExt:{
// 	Type:"service"
// 	}
// },function (err,container){
// 	console.log(err)
// 	console.log("-----")
// 	console.log(container)
// 	// if(data.statusCode!=201) done(err);
// 	// testContainer=container.id;
// 	//done();
// });

var testContainer="114eb5c2b74ffe7977ff22c269f42ceb0487f1f60e004699d4d3746397737f5e";
      var container = docker.getContainer(testContainer);
      container.start(function(err,data){
            console.log(err)
            console.log("-----")
            console.log(data)
      });

// docker.listContainers(function (err,containers) {
// 	containers.forEach(function	(info,index){
// 		//console.log(info);
// 		console.log( index +"---->  id="+info.id+",Name="+info.name);
// 	});
// 	var containerid="f9bdc0b424dc0e5f3ed6ca212cef63d8df6baffdb7124b20c1c8ee9719e4feed"; //containers[0].id;

// 	console.log("开始获取inspect ，id="+containerid);
// 	var contain1 =docker.getContainer(containerid);
// 	console.log(contain1);
// 	contain1.inspect(function  (err,data) {
// 		console.log("获得"+containerid+"inspect 信息为");
// 		console.log(data);
// 	});
// });


// var arr = [];
// var each = arr.forEach;
// var slice = arr.slice;

// var extend = function(obj) {

//   arr.forEach.call(slice.call(arguments, 1), function(source) {
//     if (source) {
//       for (var prop in source) {
//         obj[prop] = source[prop];
//       }
//     }
//   });
//   return obj;
// };



