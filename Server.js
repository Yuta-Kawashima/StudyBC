(() => {
  'use strict'

  const express = require('express');
  const multer = require('multer');

	const http = require("http");
	const socketio = require('socket.io');
	const os = require("os");
	const fs = require("fs");
	require('date-utils');
	
	
	var STime;

  const app = express()
	const multerStorage = multer.diskStorage({
		destination: './uploaded',
		filename (req, file, cb) {
			cb(null, file.originalname);
		}
	});

	const upload = multer({ storage: multerStorage });
//---file name add

  // アップロードされたファイルが送信されてきた際に行う処理を記述
  app.post('/upload', upload.single('upName'), (req, res) => {
		
		WriteFile("FileName", req.file.filename);
		STime = Date.now();
    console.log(req.file); // req.filesにアップロードされたデータが入ってきます。
		console.log('保存されたファイル名： ' + req.file.filename);
		SendFileName(req.file.filename);//クライアントに削除命令
    res.send("Finish Transaction! Thank you!");
  })

  app.use('/', express.static('.'))  // 静的ファイルのサーブ
  var server = app.listen(3000)  // ポートを指定してサーバ起動
	 app.get('/', function(req, res) {
      res.sendFile('./index.html', { root: __dirname });//表示するHTMLファイルの指定
 	 });

	console.log("Start Server port 3000");
	var io = socketio.listen(server);

	io.sockets.on("connection", function(socket){
		io.sockets.emit("Connection");		
	
		socket.on("C_to_S_SendFile", function(data){
		});
		socket.on("toAddress",function(Address){
			console.log("ToAddress : " + Address);
			WriteFile("ToAddress", Address);
		});
		socket.on("getBalance",function(balance){
			console.log("balance : " + balance);
			WriteFile("Balance", balance);
		});
		socket.on("ConvertFin",function(ConvertTime){
			console.log("ConvertFin : " + ConvertTime);
			WriteFile("ConvertFin", ConvertTime);
		});
		socket.on("SendTime",function(SendTime){
			console.log("Convert Time : " + SendTime);
			WriteFile("SendFile", SendTime);
		});
		socket.on("deploy",function(deployTime){
			console.log("deploy Time : " + deployTime);
			WriteFile("deployTime", deployTime);
			WriteFile();
		});
		
		socket.on("BlockFile",function(number, Lender, Borrower, Hash){
			console.log("Block[" + number + "]");
			console.log("Lender : " + Lender);
			console.log("Borrower : " + Borrower);
			console.log("Hash : " + Hash);
			
			var dt = new Date();
			var formatted = dt.toFormat("YYYY/MM/DD/ : HH24時MI分SS秒");
			console.log(formatted);
			if(number == 0){
				fs.appendFile('BlockData.txt','\n\n' + formatted + '\n' ,'utf8',function(err){
					console.log(err);
				});
			}
			fs.appendFile(
				'BlockData.txt', 
				 "Block[" + number + "]" + '\n' + "Lender : " + Lender + '\n' + "Borrower : " + Borrower + '\n' + "Hash : " + Hash + '\n',
				'utf8', 
				function(err){
					console.log(err);
				});
		});
		socket.on("Complete", function(){
			var FTime = Date.now();
			var Time = FTime - STime;
			console.log("app.post : " + Time);
			WriteFile("app.post", Time);
			WriteFile();
		});
		socket.on("faile", function(){
			console.log("delete error");
		});
	})
	function SendFileName(Fname){
		io.sockets.emit("S_to_C_FileName", {value:Fname});
	}
	
	function WriteFile(Group,Value){
		if(Group == null){
			fs.appendFile('writetest.txt', "\n" ,'utf8', function (err) {
    			console.log(err);
			});
		}else{
			fs.appendFile('writetest.txt', Group +  " : " + Value + "\n" ,'utf8', function (err) {
    			console.log(err);
			});
		}
	}
	
 
})()

