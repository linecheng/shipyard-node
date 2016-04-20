
var Container=require('./container')

Container.prototype.imaging=function (_opts,_callback) {
    var opt={};
    var callback;
    if(typeof(_opts)==="function"){
        callback=_opts;
    }
    
    if(!callback){
        callback=function () {};
    }
    
    var optsf={
        path:'/containers/'+this.id+'/imaging',
        method:'POST',
        statusCodes:{
            200:true,
            202:true,
            400:"bad request",
            404:"no resource or no container",
            500:"server error"
        },
        options:opt
    };
    
    this.modem.dial(optsf,function (err,data) {
        callback(err,data);
    });
}