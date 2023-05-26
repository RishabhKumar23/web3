import React from 'react'
// import { AiFillPayCircle } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { SiEthereum } from 'react-icons/si';

// import { Loader } from './'

const Home = () => {
  const wallet = () => {
  }
  const commonStyle = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white"

  const Input = (placeholder) => (
    <Input
    placeholder = {placeholder}

    />
  );
  return (
    <div className='flex w-full justify-center items-center'>
    <h1>home page</h1>
      <div className='flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
        <div className='flex flex-1 justify-start flex-col md:mr-10'>
          <h1 className='text-3xl md:text-5xl text-white text-gradient py-1'>
            Send Crypto <br /> accross the world
          </h1>
          <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
            Explore... Buy and sell crypto
          </p>
          <button
            type='button'
            onClick={wallet}
            className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]'>
            <p className='text-white text-base font-semibold'>connect Wallet</p>
          </button>
          {/* making a grid for display features */}
          <div className='grid grid-col-2 md:grid-col-3 w-full mt-10'>
            <div className={`rounded-tl-2xl ${commonStyle}`}>
              Reliability
            </div>
            <div className={commonStyle}>
              Security
            </div>
            <div className={`${commonStyle}`}>
              Ethereum
            </div>
            <div className={`${commonStyle}`}>
              Web 3.0
            </div>
            <div className={`${commonStyle}`}>
              Low Fee
            </div>
            <div className={`rounded-br-2xl ${commonStyle}`}>
              BlockChain
            </div>
          </div>
        </div>
        {/* card component */}
        <div className='flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10'>
          <div className='p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorpism'>
            <div className='felx justify-between flex-col w-full h-full'>
                {/* logo Div which is circle in the card on top right */}            
              <div className='flex justify-between items-start'>
                {/* logo Div which is circle in the card on top left */}
                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                  <SiEthereum fontSize={21} color='#fff' />
                </div>
                <BsInfoCircle fontSize={17} color='#fff'/>
              </div>
              <div className=''>
                <p className='text-white font-light text-sm mt-10'>
                  Address
                </p>
                <p className='text-white font-semibold text-lg mt-1'>
                  Ethereum
                </p>                
              </div>
            </div>
          </div>
          {/* form div */}
          <div className='p-5 dm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'>
            <Input placeholder="address To " name="addressTo" type="text" handleChange={() => {}}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home