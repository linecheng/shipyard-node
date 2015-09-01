var DockerModem=require('docker-modem');

var arr = [];
var each = arr.forEach;
var slice = arr.slice;

var extend = function(obj) {
	
  arr.forEach.call(slice.call(arguments, 1), function(source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
};


　Object.prototype.inhert=　function (Parent) {
　　　　var F = function(){};
　　　　F.prototype = Parent.prototype;
　　　　this.prototype = new F();
　　　　this.prototype.constructor = this;
　　　　this.uber = Parent.prototype;
　　}



function ShipyardModem (opts,shipyardOpts) {
	DockerModem.call(this,opts);

	if(shipyardOpts.serviceKey==undefined){
		console.error("shipyardOpts 缺少参数 serviceKey");
	}
	this.shipyardOpts=shipyardOpts||{};

};

//ShipyardModem.prototype = new DockerModem();
ShipyardModem.inhert(DockerModem);

ShipyardModem.prototype.buildRequest = function  (options, context, data, callback) {

	options=extend({},options,{
		headers:{"X-Service-Key":this.shipyardOpts.serviceKey}	
	});

	DockerModem.prototype.buildRequest.call(this,options,context,data,callback);
};


module.exports=ShipyardModem;