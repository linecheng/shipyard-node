var Docker = require('../lib/docker');


var docker = new Docker({
      host: '192.168.5.55',
      port: 8080,
      serviceKey: "HKTAuK3NMUWlzxiF2yfWXgoW3VG1z2UjI83G"
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

var testContainer = "56334a2a3b9fed519b000001";
var container = docker.getContainer(testContainer);

container.inspect(function (err, data) {
      
      if(err){
            if (err.statusCode==449){
                  console.log(JSON.stringify(err))
            } 
      }
      
      console.log("获得" + containerid + "inspect 信息为");
      console.log(data);
});
      
      
      // container.start(function(err,data){
      //       console.log(err)
      //       console.log("-----")
      //       console.log(data)
      // });

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



