
var STime;
var FTime;
var Time;
function convertToBase64(callback) {

	GetBalance();
	var passhash;
	STime = Date.now();
  //Read File
  var selectedFile = document.getElementById("inputFile").files;
  //Check File is not Empty
  if (selectedFile.length > 0) {
    // Select the very first file from list
    var fileToLoad = selectedFile[0];
    // FileReader function for read the file.
    var fileReader = new FileReader();
    var base64;
    // Onload of file read the file content
    fileReader.onload = function(fileLoadedEvent) {
       base64 = fileLoadedEvent.target.result;
       // Print data in console
       var shaObj = new jsSHA("SHA-256", "TEXT");
       shaObj.update(base64);
       passhash = shaObj.getHash("HEX");
    		
    	FTime = Date.now();
    	Time = FTime - STime;
    	console.log("ConvertTime : " + Time);
    	s.emit("ConvertFin",Time);
			callback(passhash);
    };
    fileReader.readAsDataURL(fileToLoad);
 }
}
var StragePasshash =  function(passhash){

    var ToAddress = document.getElementById('Address').value;
    contract.lender(ToAddress,passhash,(err, result) => { 
    	console.log(result);
	　　s.emit("toAddress",ToAddress);
    });
}
var Deploy = function deploy(passhash){
	contract.deploy(passhash,(err, result) => { console.log(result) });
}


// イベントを受け取って発火するようサブスクライブ
contract.send((err, event) => {
  if (err){
  	FTime = Date.now();
  	Time = FTime - STime;
  	console.log("Send Error : " + Time);
  	s.emit("SendError", Time);
  	t.error(err)
  }else {
			GetBalance();
    	document.myform.submit();
			FTime = Date.now();
			Time =  FTime - STime;
			console.log("SendTime : " + Time);
			s.emit("SendTime",Time);
  }
});

contract.DeployEvent((err, event) => {
  if (err) t.error(err)
  else {
		GetBalance();
		FTime = Date.now();
		Time =  FTime - STime;
		console.log("DeployTime : " + Time);
		s.emit("deploy",Time);
  }
});


