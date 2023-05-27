import { React, useEffect, useState, createContext } from 'react';
import { ethers } from 'ethers';
/*NOTE - contractABI is jsone file 
 * contractAddress is address present in Transactioncontext.jsx */

import { contractABI, contractAddress } from '../utilities/constants';


export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.provider.web3Provider(ethereum);
    const signer = provider.getSigner();

    // to fetch our contract 
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)



    console.log({
        provider,
        signer,
        transactionContract
    });
}

export const TransactionProvider = ({ children }) => {

    const [CurrentAccount, setCurrentAccount] = useState()
    //to the if wallet is connected or not 
    const checkWalletConnection = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask");

            //to get MetaMask connected account 
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            //if account is their is already a accounts connected or not
            if (accounts.leangth) {
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
        try {
            if (!ethereum) return alert("Please install MetaMask");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    useEffect(() => {
        checkWalletConnection();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet }}>
            {children}
        </TransactionContext.Provider>
    )
}
