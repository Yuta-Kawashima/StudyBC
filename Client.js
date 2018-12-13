var client = require('socket.io-client');
var socket = client.connect('http://172.16.31.212:3000');//サーバのIPアドレスを指定する
var fs = require("fs"); 
const path = require('path');
socket.on('Connection',function(){
    console.log('yea!!');
		
		socket.on("S_to_C_FileName", function(Fname){
			console.log(Fname.value);
			var Path = './uploaded/' + Fname.value;
			let Judge = unlink(Path);
			if(Judge == true){
				socket.emit("Complete");
   		　socket.disconnect();
			}else{
				socket.emit("faile");
			}
		})

});

function unlink(Fpath){
	fs.unlink(Fpath, function(err){
		if(err){
			//throw err;
			return false;
		}
	});
	return true;
}
