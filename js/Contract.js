const address = "0xbeb3310a3925447b10c1c609a6b5a22c28d533c9";

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			}
		],
		"name": "deploy",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "name",
				"type": "string"
			}
		],
		"name": "lender",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "No",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "Borrower",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "Hash",
				"type": "string"
			}
		],
		"name": "MessageSent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "send",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "DeployEvent",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "datas",
		"outputs": [
			{
				"name": "Lender",
				"type": "address"
			},
			{
				"name": "Borrower",
				"type": "address"
			},
			{
				"name": "E_BookName",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "number",
				"type": "uint256"
			}
		],
		"name": "getData",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumber",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_Lender",
				"type": "address"
			},
			{
				"name": "_Borrower",
				"type": "address"
			},
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "LenderJudge",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

const contract = web3.eth.contract(abi).at(address);
