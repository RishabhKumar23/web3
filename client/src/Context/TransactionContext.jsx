import { React, useEffect, useState, createContext } from 'react';
import { ethers } from 'ethers';
/*NOTE - contractABI is jsone file 
 * contractAddress is address present in Transactioncontext.jsx */

import { contractABI, contractAddress } from '../utilities/constants.js';


export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
    /*NOTE - my ethers.js version is greater then 6.0.0 
           - thats my i am using => const provider = new ethers.BrowserProvider(window.ethereum);
           - if you have less version or less than 5.7.2
           - then you have use => const provider = new ethers.providers.Web3Provider(window.ethereum, "any"); */
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // to fetch our contract 
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

    
    console.log({
        provider,
        signer,
        transactionContract
    });
    return transactionContract;
}

export const TransactionProvider = ({ children }) => {

    const [CurrentAccount, setCurrentAccount] = useState()
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    //for loading
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));

    // to featch data from form
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    //to the if wallet is connected or not 
    const checkWalletConnection = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask");

            //to get MetaMask connected account 
            // console.log(await ethereum.request({ method: 'eth_accounts' }));
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            //if account is their is already a accounts connected or not
            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                //getAllTransaction
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }

    }
    //to connect to wallet
    const connectWallet = async () => {
        console.log("handelSubmit start");
        try {
            if (!ethereum) return alert("Please install MetaMask");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
        console.log("handelSubmit end");
    }

    const sendTransaction = async () => {
        console.log("sendTransaction start in TC,jsx");
        try {
            if (!ethereum) return alert("Please install MetaMask");

            //get the data from the form , from Home.jsx
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            /*NOTE - ethers.utils.parseEther is function in ethers.js that converts 
            an ether value (as a string) to a 
            BigNumber representation of its value in wei.*/
            //check note in client directory for explanation
            // const parsedAmount = ethers.utils.parseEther(amount);
            const parsedAmount = amount * 10e17;
            await ethereum.request(
                {
                    method: 'eth_sendTransaction',
                    params: [{
                        from: CurrentAccount,
                        to: addressTo,
                        gas: '0x5208', //21000 GWEI
                        value: parsedAmount._hex, //0.00001 amount input by user
                    }],
                }
            );
            // to add above data to addToBlockchain function which is at server side
            // at Transactions.sol   
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());    
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
        console.log("sendTransaction end in TC,jsx");
    }

    useEffect(() => {
        checkWalletConnection();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, CurrentAccount, formData, setFormData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}
