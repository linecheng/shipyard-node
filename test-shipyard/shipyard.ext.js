var expect = require('chai').expect;
var docker = require('./spec_helper').docker;
var MemoryStream = require('memorystream');

describe("#shipyard.ext", function() {

    it("should imaging a container", function(done) {

        var resourceId = "c753d6db-9988-4cd7-82f1-93f41fdeb7d9";

        var container = docker.getContainer(resourceId)
        container.imaging(function(err, data) {
                if(err){
                    console.log(err);
                    done(err);
                    return
                }
                console.log(data);
                done();
        });
        
    });


});