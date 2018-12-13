pragma solidity ^0.4.19;

contract LendEbook{
    
    struct Data{
        address Lender;//貸与者
        address Borrower;//被貸与者
        string E_BookName;//書籍ハッシュ
    }
    event Strage(address x, address y, string z);
    
    Data[] public datas;
    
    function LendEbook () public{
       datas.push(Data(address(0), address(0), " "));
    }
    function deploy(string name) public {//データを登録するための関数
        datas.push(Data(msg.sender, msg.sender, name));
    }
    
    function lender(address to, string name) public {//貸与に用いる関数
        Data memory Nodata;//構造体構造体型の初期値の設定
        //Data memory results;//検索結果を入れるためのData型構造体
        
        uint _judgeResult;
        uint No;
        (_judgeResult, No) = LenderJudge(msg.sender, to, name);
        
        require (_judgeResult != 0);
        
        if(_judgeResult == 1){
             datas.push(Data(msg.sender, to, name));//貸与の判別
        }else if(_judgeResult == 2){
            datas[No] = Nodata;   //返却の判別  
        }
        
    }
    
    function LenderJudge (address _Lender, address _Borrower, string _name) public view returns (uint, uint){
        
        uint max = datas.length - 1;
        
        uint resultJudge;
        
        for( ; max > 0; max--){
            //uint i = max - j;
            if(keccak256(_name) == keccak256(datas[max].E_BookName)){//書籍判別
                
                if(_Lender == datas[max].Borrower){//登録してあるのかを判別
                
                    if(datas[max].Borrower == datas[max].Lender){
                
                        resultJudge = 1;
                        break;
                    
                    } else if(datas[max].Borrower != datas[max].Lender && datas[max].Lender == _Borrower){
                        
                        resultJudge = 2;
                        break;
                        
                    } else if (datas[max].Borrower != datas[max].Lender && datas[max].Lender != _Borrower){
                        resultJudge = 0;
                        break;//登録者による又貸し
                    }
                }
            }
        }
        
        return (resultJudge, max);
    }
}

