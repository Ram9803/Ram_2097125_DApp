import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";

function App() {
  const [greet, setGreet] = useState('');
  const [balance, setBalance] = useState();
  const [depositValue, setDepositValue] = useState('');
  const [greetingValue, setGreetingValue] = useState('');
  const [depositValue2, setDepositValue2] = useState('');
  const [greetingValue2, setGreetingValue2] = useState('');


  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = provider.getSigner()
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

  const ABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "greet",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "name": "setGreeting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const contract = new ethers.Contract(contractAddress, ABI, signer);

  useEffect(() => {

    const connectWallet = async () => {
      await provider.send("eth_requestAccounts", []);
    }

    const getBalance = async () => {
      const balance = await provider.getBalance(contractAddress)
      const balanceFormatted = ethers.formatEther(balance)
      setBalance(balanceFormatted);
    }

    const getGreeting = async() => {
      const greeting = await contract.greet();
      setGreet(greeting);
    }

    connectWallet()
      .catch(console.error);

    getBalance()
      .catch(console.error);

    getGreeting()
      .catch(console.error);
  })
  const handleDepositChange = (e) => {
    setDepositValue(e.target.value);
  }

  const handleGreetingChange = (e) => {
    setGreetingValue(e.target.value);
  }

  const handleDepositChange2 = (e) => {
    setDepositValue2(e.target.value);
  }

  const handleGreetingChange2 = (e) => {
    setGreetingValue2(e.target.value);
  }

  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    console.log(depositValue)
    const signer2 = await provider.getSigner()
    const contract2 = new ethers.Contract(contractAddress, ABI, signer2);
    const ethValue = ethers.parseEther(depositValue)
    const depositEth = await contract2.deposit({value: ethValue})
    await depositEth.wait();
    const balance = await provider.getBalance(contractAddress)
    const balanceFormatted = ethers.formatEther(balance)
    setBalance(balanceFormatted);
    setDepositValue(0);
  }

  const handleGreetingSubmit = async (e) => {
    e.preventDefault();
    const signer2 = await provider.getSigner()
    const contract2 = new ethers.Contract(contractAddress, ABI, signer2);
    const greetingUpdate = await contract2.setGreeting(greetingValue)
    await greetingUpdate.wait();
    setGreet(greetingValue);
    setGreetingValue('');
  }

  const handlePaySubmit = async (e) => {
    e.preventDefault();
    const signer2 = await provider.getSigner()
    const contract2 = new ethers.Contract(contractAddress, ABI, signer2);

    const ethValue = ethers.parseEther(depositValue2)
    const depositEth = await contract2.deposit({value: ethValue})
    await depositEth.wait();
    const balance = await provider.getBalance(contractAddress)
    const balanceFormatted = ethers.formatEther(balance)
    setBalance(balanceFormatted);
    setDepositValue2(0);

    const greetingUpdate = await contract2.setGreeting(greetingValue2)
    await greetingUpdate.wait();
    setGreet(greetingValue2);
    setGreetingValue2('');
  }

  return (
    <div className="container">
      <h1>
        Ram Payment DApp
  
      </h1>
      <small className='text-muted'>With React, Node.js and Blockchain Test Network </small>
      <div className="container">
        <div className="row mt-5">
          <div className="col align-self-start">
            <p>Latest Message: <b>{greet}</b></p>
            <p>Total Contract Balance: <b>{balance} ETH</b></p>
          </div>
          <div className="col align-self-center">
            <div className="card">
              <div className="card-header">Send Payment Only</div>
              <div className="card-body">
                <form onSubmit={handleDepositSubmit}>
                  <div className="mb-3">
                    <label for="ether">Enter the Amount to Pay:</label>
                    <input type="number" className="form-control" placeholder="0" onChange={handleDepositChange} value={depositValue} />
                  </div>
                  <button type="submit" className="btn btn-success">Pay</button>
                </form>
              </div>
            </div>
            <div className="card mt-5">
              <div className="card-header">Send Message Only</div>
              <div className="card-body">
                <form onSubmit={handleGreetingSubmit}>
                  <div className="mb-3">
                    <label for="message">Enter Your Message:</label>
                    <input type="text" className="form-control" onChange={handleGreetingChange} value={greetingValue} />
                  </div>
                  <button type="submit" className="btn btn-success">Message</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col align-self-center">
            <div className="card">
              <div className="card-header">Send Message and Payment</div>
              <div className="card-body">
                <form onSubmit={handlePaySubmit}>
                  <div className="mb-3">
                    <label for="message">Enter Your Message:</label>
                    <input type="text" className="form-control" onChange={handleGreetingChange2} value={greetingValue2} />
                  </div>
                  <div className="mb-3">
                    <label for="ether">Enter the Amount to Pay:</label>
                    <input type="number" className="form-control" placeholder="0" onChange={handleDepositChange2} value={depositValue2} />
                  </div>
                  <button type="submit" className="btn btn-success">Pay</button>
                </form>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


