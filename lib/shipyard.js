var DockerModem=require('docker-modem');

var arr = [];
var each = arr.forEach;
var slice = arr.slice;

var extend = function(result,obj1,obj2) {
	result =result||{};
	
	var keys = Object.keys(obj1);
	for(var i=0;i<keys.length;i++){
		result[keys[i]]=obj1[keys[i]];
	}
	
	keys = Object.keys(obj2);
	for(var i=0;i<keys.length;i++){
		result[keys[i]]=obj2[keys[i]];
	}
	
	return result;
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
	//仅拷贝平面值属性，不能拷贝function。因为这些值是headers，后期底层header处理时，会默认当成字符串处理，否则会出现错误。
	options.headers =extend({},options.headers,{
		"X-Service-Key":this.shipyardOpts.serviceKey	
	});
	

	DockerModem.prototype.buildRequest.call(this,options,context,data,callback);
};


module.exports=ShipyardModem;