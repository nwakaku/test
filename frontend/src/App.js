import './App.css';
import { useState } from "react";
import { ethers } from 'ethers';
import { abi } from './components/some';

const CONTRACT_HERE = "0x475211862a6a02C68E6159AA8393178f3b26bC69";

function App() {
  const [connected, setConnected] = useState(false);
  const [nameOfToken, SetNameOfToken] = useState('');
  const [balance, SetBalance] = useState();
  const [user, SetUser] = useState();

  const checkBalance = async () => {
    if (contract && connected) {
      try {
        const userAddress = user[0];
        const userBalance = await contract.balanceOf(userAddress);
        SetBalance(userBalance.toString());
      } catch (error) {
        console.error(error);
      }
    }
  };

  let contract = null;

  if (window.ethereum) {
    const address = CONTRACT_HERE;
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    contract = new ethers.Contract(address, abi, signer);
  }

  return (
    <div className="App">
      <h1>Text Contract</h1>

      <button onClick={() => {
        if (contract && !connected) {
          window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(accounts => {
              console.log(accounts);
              SetUser(accounts);
              setConnected(true);
            })
            .catch(error => {
              console.error(error);
            });
        }
      }}>
        {!connected ? 'Connect wallet' : 'Connected'}
      </button>
      <br/>

      <button onClick={() => {
        if (contract && connected) {
          contract.name()
            .then(text => {
              SetNameOfToken(text);
            })
        }
      }}>{nameOfToken ? nameOfToken : "checkName"}
      </button>
      <br />
      <button onClick={checkBalance}>
         {balance ? `Balance: ${balance}` : "Check Balance"}
      </button>
      

    </div>
  );
}

export default App;