import { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Feed from './components/Home/Feed';
import Widgets from './components/Widgets';


function App() {

  const[currentAccount,setCurrentAccount] = useState("");
  const[correctNetwork,setCorrectNetwork] = useState(false);


  /* connect wallet */

  const connectWallet = async () => {
    try{

      const {ethereum} = window;

      if(!ethereum){
        console.log("Metamask not Found");
        return;
      }


      let chainId = await ethereum.request({method: "eth_chainId"});
      console.log(chainId);

      const goerli = "0x5";

      if (chainId !== goerli){
        setCorrectNetwork(false);
        console.log("Please connect to Goerli Test Network");
        return;
      }else{
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      console.log(accounts[0]);
      setCurrentAccount(accounts[0]);



    }catch(error){
      console.log(error);
    }
  }


  useEffect(() => {
    connectWallet();
  }, []);
 



  return (
    <div>

<div>
    {currentAccount === '' ? (
      
      
      <div className='flex items-center justify-center h-screen w-screen bg-[#15202b]'>
      <button
      className='text-2xl font-bold py-3 px-12 bg-slate-600 hover:bg-slate-800 hover:text-orange-500 rounded-full mb-10 hover:scale-125 transition-all duration-500 ease-in-out items-center justify-center'
      onClick={connectWallet}
      >
      Connect Wallet
      </button>


      </div>




      ) : correctNetwork ? (
       
       


        <div className="flex h-screen w-screen bg-[#15202b] text-white select-none justify-center">

        <div className="max-w-[1400px] w-2/3 flex justify-between">


          
          <Sidebar current={currentAccount} />


       
          <Feed className='scrollbar-hide' />


         
          <Widgets />


        </div>

      </div>



      ) : (
      <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
      <div>----------------------------------------</div>
      <div>Please connect to the Goerli Testnet</div>
      <div>and reload the page</div>
      <div>----------------------------------------</div>
      </div>
    )}
    </div>


     

      

    </div>



  );
}

export default App;


/*  <div className="flex h-screen w-screen bg-[#15202b] text-white select-none justify-center">

          <div className="max-w-[1400px] w-2/3 flex justify-between">


            
            <Sidebar />


         
            <Feed className='scrollbar-hide' />


           
            <Widgets />


          </div>

        </div>
        
        
        */