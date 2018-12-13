class StorageData{
	constructor(num){
		contract.getData(num, (err, result) => {
			this.Lender = result[0];
			this.Borrower = result[1];
			this.Hash = result[2]; 
		})
	}
	
	print(num){
		console.log("Lender[" + num + "] : " + this.Lender);
		console.log("Borrower["+ num + "] : " + this.Borrower);
		console.log("Hash[" + num + "] : " + this.Hash);
	}
	
	WriteFile(num){
		s.emit("BlockFile", num, this.Lender, this.Borrower, this.Hash);
	}

}

let Data = [];
let number;

function StorageBlockData(){

	contract.getNumber((err, result) =>{
		console.log("result.c : " + result.c[0]);
		number = result.c[0];//コントラクトの配列長の受取
		console.log("number : " + number);
		
		//配列長分データをData配列でインスタンス化したStoraqgeDataで受取、Data配列を構造体のように利用する
		for(let i = 0; i < number; i++){
			Data[i] = new StorageData(i);
			window.setTimeout(function(){
				Data[i].print(i);//出力の関係で待たせないと格納の確認をconsole上で行うことができない
			},1000)
		}
	});
}

function WriteTextFile(){
	for(let i = 0; i < number; i++){
		//Data[i] = new StorageData(i);
		Data[i].WriteFile(i);
		console.log("Data[" + number + "] : " + Data[i] + "ファイル出力完了");
	}
	
}
