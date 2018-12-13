
//const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/53e08536afd6437abb22e4f0e56ff2e3"));

let balance;
let user_account;

window.addEventListener('load', function() {
	//-----------------------------------------------
	// Checking if Web3 has been injected by the browser (Mist/MetaMask)
  	if (typeof web3 !== 'undefined') {
  	  // Use Mist/MetaMask's provider
  	  var Web3 = require('web3');
  	  web3js = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/53e08536afd6437abb22e4f0e56ff2e3"));
  	 	web3.eth.getAccounts((error, accounts) => console.log("getAccounts:" + accounts[0]));
		  //web3.eth.getAccounts(function (err, accounts) { console.log(accounts[0]) });
  	  var account = web3.eth.accounts[0];
  	  var accountInterval = setInterval(function() {
		      if (web3.eth.accounts[0] !== account) {
		        account = web3.eth.accounts[0];
		        updateInterface();
	  	    }}, 100);
  				} else {
    				console.log('No web3? You should consider trying MetaMask!')
    				web3js = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/53e08536afd6437abb22e4f0e56ff2e3"));
  	}
})


//ネットワークの構成を判断
web3.version.getNetwork((err, netId) => {
      switch (netId) {
        case "1":
          console.log('This is mainnet')
          break
        case "2":
          console.log('This is the deprecated Morden test network.')
          break
        case "3":
          console.log('This is the ropsten test network.')
          break
        case "4":
          console.log('This is the Rinkeby test network.')
          break
        case "42":
          console.log('This is the Kovan test network.')
          break
        default:
          console.log('This is an unknown network.')
      }
})
      
   startApp();

 function startApp(){
 	  web3.eth.getAccounts(function(error, accounts) {
 	      if (error) return;
 	      user_account = accounts[0];
 	      if(typeof user_account != 'undefined'){
 	          	  console.log("user_account:" + user_account);
 		            web3.eth.getBalance(user_account, (err, wei) => {
	 	                if (error) return;
	 		               //console.log(JSON.stringify(wei, null, 2));
	 		               balance = JSON.stringify(wei, null, 2);
	 		           	   //console.log(web3.version);
   			        });
       }else{
           console.log("Not login:ログインして下さい");
       }
   });
 }
 
 function GetBalance(){
 /*
	web3.eth.getAccounts(function(error, accounts){
		if(error) return;
		let user_account = accounts[0];
		if(typeof user_account != 'undefined'){
 */
			web3.eth.getBalance(user_account, (err, wei) => {
					console.log(JSON.stringify(wei, null, 2));
					balance = JSON.stringify(wei, null, 2)
					s.emit("getBalance", balance);
			});
		//}
	
	//})
 }

