/*jshint -W030 */

var expect = require('chai').expect;
var docker = require('./spec_helper').docker;
var MemoryStream = require('memorystream');


describe("#container", function () {
  var testContainer;
  before(function (done) {
    this.timeout(60000);
    docker.createContainer({
      Image: 'ubuntu',
      AttachStdin: false,
      AttachStdout: true,
      Tty: true,
      Cmd: ['/bin/bash', '-c', 'tail -f /var/log/dmesg'],
      OpenStdin: false,
      StdinOnce: false,
      name: "cjtshipyardtest9",
      ShipyardExt: {
        Type: "service"
      }
    }, function (err, container) {
      if (err) done(err);
      testContainer = container.id;
      done();
    });
  });

  describe("#inspect", function () {
    it("should inspect a container", function (done) {

      //console.log("testcontainer id is " + testContainer);

      var container = docker.getContainer(testContainer);

      function handler(err, data) {
        expect(err).to.be.null;
        expect(data).to.be.ok;
        done();
      };

      container.inspect(handler)
    });
  });


  describe("#start", function () {
    it("should start a container", function (done) {
      this.timeout(60000);
      var container = docker.getContainer(testContainer);
      container.start(function (err, data) {
        expect(err).to.be.null;
        done();
      });

    });
  });

  describe("#stop", function () {
    it("should stop a container", function (done) {
      this.timeout(60000);
      var container = docker.getContainer(testContainer);
      container.stop(function (err, data) {
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe("#restart", function () {
    it("should restart a container", function (done) {
      this.timeout(60000);
      var container = docker.getContainer(testContainer);
      container.restart(function (err, data) {
        expect(err).to.be.null;
        done();
      });

    });
  });

  describe("#remove", function () {
    it("should stop and  remove a container", function (done) {
      this.timeout(60000);
      var container = docker.getContainer(testContainer);
      container.stop(function (err) {
        if (err) {
          done(err)
        }

        container.remove(function (err, data) {
          expect(err).to.be.null;
          console.log(data)
          done();
        });

      })

    });
  });

});

// describe("#container", function() {

//   var testContainer;
//   before(function(done) {
//     docker.createContainer({
//       Image: 'ubuntu',
//       AttachStdin: false,
//       AttachStdout: true,
//       AttachStderr: true,
//       Tty: true,
//       Cmd: ['/bin/bash', '-c', 'tail -f /var/log/dmesg'],
//       OpenStdin: false,
//       StdinOnce: false
//     }, function(err, container) {
//       if (err) done(err);
//       testContainer = container.id;
//       done();
//     });
//   });

//   describe("#inspect", function() {
//     it("should inspect a container", function(done) {
//       var container = docker.getContainer(testContainer);

//       function handler(err, data) {
//         expect(err).to.be.null;
//         expect(data).to.be.ok;
//         done();
//       }

//       container.inspect(handler);
//     });
//   });

//   describe("#start", function() {
//     it("should start a container", function(done) {
//       this.timeout(60000);

//       var container = docker.getContainer(testContainer);

//       function handler(err, data) {
//         expect(err).to.be.null;
//         done();
//       }

//       container.start(handler);
//     });
//   });

//   describe("#resize", function() {
//     it("should resize tty a container", function(done) {
//       var container = docker.getContainer(testContainer);

//       function handle(err, data) {
//         expect(err).to.be.null;
//         done();
//       }

//       container.start(function(err, data) {
//         var opts = {
//           h: process.stdout.rows,
//           w: process.stdout.columns
//         };
//         container.resize(opts, handle);
//       });
//     });
//   });

//   describe("#stats", function() {
//     it("should get container stats", function(done) {
//       var container = docker.getContainer(testContainer);

//       container.stats(function(err, stream) {
//         expect(err).to.be.null;
//         expect(stream.pipe).to.be.ok;
//         done();
//       });
//     });
//   });

//   describe('#stdin', function() {
//     var optsc = {
//       'Hostname': '',
//       'User': '',
//       'AttachStdin': false,
//       'AttachStdout': true,
//       'AttachStderr': true,
//       'Tty': false,
//       'OpenStdin': false,
//       'StdinOnce': false,
//       'Env': null,
//       'Cmd': ['/bin/bash', '-c', 'uptime'],
//       'Dns': ['8.8.8.8', '8.8.4.4'],
//       'Image': 'ubuntu',
//       'Volumes': {},
//       'VolumesFrom': []
//     };

//     function randomString(length) {
//       var result = '',
//         chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//       for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
//       return result;
//     }

//     /**
//      * simple test that writes 1000 bytes to the "wc -c" command, that command
//      * returns the number of bytes it received, so it should return 1000 for this test
//      */
//     it('should support attach with tty enable writing 1000 bytes', function(done) {
//       this.timeout(5000);

//       var size = 1000;

//       function handler(err, container) {
//         expect(err).to.be.null;
//         expect(container).to.be.ok;

//         var attach_opts = {
//           stream: true,
//           stdin: true,
//           stdout: true,
//           stderr: true
//         };
//         container.attach(attach_opts, function handler(err, stream) {
//           expect(err).to.be.null;
//           expect(stream).to.be.ok;

//           var memStream = new MemoryStream();
//           var output = '';
//           memStream.on('data', function(data) {
//             output += data.toString();
//           });

//           stream.pipe(memStream);

//           container.start(function(err, data) {
//             expect(err).to.be.null;

//             stream.write(randomString(size) + '\n\x04');

//             container.wait(function(err, data) {
//               expect(err).to.be.null;
//               expect(data).to.be.ok;
//               expect(+output.slice(size + 2)).to.equal(size + 1);
//               done();
//             });
//           });
//         });
//       }

//       optsc.AttachStdin = true;
//       optsc.Tty = true;
//       optsc.OpenStdin = true;
//       optsc.Cmd = ['wc', '-c'];

//       docker.createContainer(optsc, handler);
//     });

//     it('should support attach with tty disabled writing 5000 bytes', function(done) {
//       this.timeout(5000);

//       var size = 5000;

//       function handler(err, container) {
//         expect(err).to.be.null;
//         expect(container).to.be.ok;

//         var attach_opts = {
//           stream: true,
//           stdin: true,
//           stdout: true,
//           stderr: true
//         };
//         container.attach(attach_opts, function handler(err, stream) {
//           expect(err).to.be.null;
//           expect(stream).to.be.ok;

//           var memStream = new MemoryStream();
//           var output = '';
//           memStream.on('data', function(data) {
//             output += data.toString();
//           });

//           stream.pipe(memStream);

//           container.start(function(err, data) {
//             expect(err).to.be.null;

//             stream.write('printf "' + randomString(size) + '" | wc -c; exit;\n');

//             container.wait(function(err, data) {
//               expect(err).to.be.null;
//               expect(data).to.be.ok;
//               expect(parseInt(output.replace(/\D/g,''))).to.equal(size);
//               done();
//             });
//           });
//         });
//       }

//       optsc.AttachStdin = false;
//       optsc.Tty = false;
//       optsc.OpenStdin = true;
//       optsc.Cmd = ['bash'];

//       docker.createContainer(optsc, handler);
//     });
//   });

//   describe("#attach", function() {
//     var optsc = {
//       'Hostname': '',
//       'User': '',
//       'AttachStdin': false,
//       'AttachStdout': true,
//       'AttachStderr': true,
//       'Tty': false,
//       'OpenStdin': false,
//       'StdinOnce': false,
//       'Env': null,
//       'Cmd': ['/bin/bash', '-c', 'uptime'],
//       'Dns': ['8.8.8.8', '8.8.4.4'],
//       'Image': 'ubuntu',
//       'Volumes': {},
//       'VolumesFrom': []
//     };


//     it("should attach and wait for a container", function(done) {
//       this.timeout(120000);

//       function handler(err, container) {
//         expect(err).to.be.null;
//         expect(container).to.be.ok;

//         container.attach({
//           stream: true,
//           stdout: true,
//           stderr: true
//         }, function handler(err, stream) {
//           expect(err).to.be.null;
//           expect(stream).to.be.ok;

//           var memStream = new MemoryStream();
//           var output = '';
//           memStream.on('data', function(data) {
//             output += data.toString();
//           });

//           container.modem.demuxStream(stream, memStream, memStream);

//           container.start(function(err, data) {
//             expect(err).to.be.null;

//             container.wait(function(err, data) {
//               expect(err).to.be.null;
//               expect(data).to.be.ok;
//               expect(output).to.match(/.*users.*load average.*/);
//               done();
//             });
//           });
//         });

//       }

//       optsc.AttachStdin = false;
//       optsc.OpenStdin = false;
//       optsc.Cmd = ['bash', '-c', 'uptime'];

//       docker.createContainer(optsc, handler);
//     });

//     it("should support attach with stdin enable", function(done) {
//       this.timeout(120000);

//       function handler(err, container) {
//         expect(err).to.be.null;
//         expect(container).to.be.ok;

//         var attach_opts = {
//           stream: true,
//           stdin: true,
//           stdout: true,
//           stderr: true
//         };
//         container.attach(attach_opts, function handler(err, stream) {
//           expect(err).to.be.null;
//           expect(stream).to.be.ok;

//           var memStream = new MemoryStream();
//           var output = '';
//           memStream.on('data', function(data) {
//             output += data.toString();
//           });

//           stream.pipe(memStream);

//           container.start(function(err, data) {
//             expect(err).to.be.null;

//             stream.write("uptime; exit\n");

//             container.wait(function(err, data) {
//               expect(err).to.be.null;
//               expect(data).to.be.ok;
//               expect(output).to.match(/.*users.*load average.*/);
//               done();
//             });
//           });
//         });
//       }

//       optsc.AttachStdin = true;
//       optsc.OpenStdin = true;
//       optsc.Cmd = ['bash'];

//       docker.createContainer(optsc, handler);
//     });
//   });

//   describe("#restart", function() {
//     it("should restart a container", function(done) {
//       this.timeout(30000);
//       var container = docker.getContainer(testContainer);

//       function handler(err, data) {
//         expect(err).to.be.null;
//         done();
//       }

//       container.restart(handler);
//     });
//   });

//   describe("#export", function() {
//     it("should export a container", function(done) {
//       this.timeout(30000);
//       var container = docker.getContainer(testContainer);

//       function handler(err, stream) {
//         expect(err).to.be.null;
//         expect(stream).to.be.ok;
//         done();
//       }

//       container.export(handler);
//     });
//   });

//   describe("#top", function() {
//     it("should return top", function(done) {
//       this.timeout(10000);
//       var container = docker.getContainer(testContainer);

//       function handler(err, data) {
//         expect(err).to.be.null;
//         expect(data).to.be.ok;
//         done();
//       }

//       container.top(handler);
//     });
//   });

//   describe("#changes", function() {
//     this.timeout(10000);

//     var container;
//     beforeEach(function(done) {
//       docker.run(
//         'ubuntu', ['/bin/bash', '-c', 'echo "xfoo" > foo.txt'],
//         null,
//         function(err, result, subject) {
//           // subject is the resulting container from the operation
//           container = subject;
//           done(err);
//         }
//       );
//     });

//     afterEach(function(done) {
//       container.remove(done);
//     });

//     it("should container changes", function(done) {
//       function handler(err, data) {
//         expect(err).to.be.null;
//         expect(data).to.be.ok;
//         done();
//       }

//       container.changes(handler);
//     });
//   });

//   describe("#logs", function() {

//     it("should get the logs for a container as a stream", function(done) {
//       this.timeout(30000);
//       var container = docker.getContainer(testContainer);
//       var logs_opts = {
//         follow: true,
//         stdout: true,
//         stderr: true,
//         timestamps: true
//       };

//       function handler(err, stream) {
//         expect(err).to.be.null;
//         expect(stream.pipe).to.be.ok;
//         done();
//       }

//       container.logs(logs_opts, handler);

//     });
//   });

//   describe("#exec", function() {
//     it("should run exec on a container", function(done) {
//       this.timeout(10000);
//       var options = {
//         Cmd: ["echo", "'foo'"]
//       };

//       var container = docker.getContainer(testContainer);

//       function handler(err, exec) {
//         expect(err).to.be.null;

//         exec.start(function(err, stream) {
//           expect(err).to.be.null;
//           expect(stream.pipe).to.be.ok;

//           exec.inspect(function(err, data) {
//             expect(err).to.be.null;
//             expect(data).to.be.ok;

//             done();
//           });
//         });
//       }

//       container.exec(options, handler);
//     });
//   });

//   describe("#commit", function() {
//     it("should commit a container", function(done) {
//       this.timeout(30000);
//       var container = docker.getContainer(testContainer);

//       function handler(err, stream) {
//         expect(err).to.be.null;
//         expect(stream).to.be.ok;
//         done();
//       }

//       container.commit({comment: 'dockerode commit test'}, handler);
//     });
//   });

//   describe("#stop", function() {
//     it("should stop a container", function(done) {
//       this.timeout(30000);
//       var container = docker.getContainer(testContainer);

//       function handler(err, data) {
//         expect(err).to.be.null;
//         done();
//       }

//       container.stop(handler);
//     });
//   });
// });

// describe("#non-responsive container", function() {

//   var testContainer;
//   before(function(done) {
//     docker.createContainer({
//       Image: 'ubuntu',
//       AttachStdin: false,
//       AttachStdout: true,
//       AttachStderr: true,
//       Tty: true,
//       Cmd: ['/bin/sh', '-c', "trap 'echo no' TERM; while true; do sleep 1; done"],
//       OpenStdin: false,
//       StdinOnce: false
//     }, function(err, container) {
//       if (err) done(err);
//       testContainer = container.id;
//       done();
//     });
//   });

//   describe("#stop", function() {
//     it("forced after timeout", function(done) {
//       this.timeout(30000);
//       var container = docker.getContainer(testContainer);

//       function handler(err, data) {
//         expect(err).not.to.be.null;
//         done();
//       }

//       container.stop({
//         t: 1000
//       }, handler);
//     });
//   });

//   describe("#restart", function() {
//     it("forced after timeout", function(done) {
//       this.timeout(30000);
//       var container = docker.getContainer(testContainer);

//       function handler(err, data) {
//         expect(err).to.be.null;
//         done();
//       }

//       container.restart({
//         t: 1000
//       }, handler);
//     });
//   });

// });