import React, { useState } from 'react'
import DappSectionHeader from './DappSectionHeader'
import DappSectionReceive from './DappSectionReceive'
import DappSectionWithdraw from './DappSectionWithdraw'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useStakeEthInfo } from '../hooks/useStakeEthInfo'
import { useAddress } from '@thirdweb-dev/react'
import { deposit, withdraw } from '../contracts/deposit'
import { useBalance } from '@thirdweb-dev/react'
import { NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/sdk'
import { lsEthTokenAddress } from '../utils/constants'

const StakeEth = ({ setIsModalVisible, setCurrentModal }) => {
  const stakeType = useSelector(state => state.stakeEthReducer.stakeType)
  const inputValue = useSelector(state => state.stakeEthReducer.inputValue)

  let tokenAddress
  if (stakeType === 'Stake')
    tokenAddress = NATIVE_TOKEN_ADDRESS
  else
    tokenAddress = lsEthTokenAddress

  let { data } = useBalance(tokenAddress)

  const address = useAddress()
  const { minimum } = useStakeEthInfo()

  const [loading, setLoading] = useState()

  const handleStake = async () => {
    if (address) {
      if (inputValue !== 0 && inputValue <= data.displayValue) {
        if (inputValue >= minimum) {
          setLoading(true)
          const response = await deposit(inputValue)
          if (response.status === 'Success') {
            toast.success('Succeed')
          } else {
            if (response.status === 'Error')
              toast.error(`${response.status}: ${response.error}.`)
            else
              toast.error('Transaction failed by unknown reason.')
          }
        } else {
          toast.error(`Input Value Error. minimum deposit amount is ${minimum} ETH`)
        }
      } else {
        if (inputValue === 0)
          toast.error('Invalid Input Value')
        else
          toast.error('Insufficient Balance')
      }
    } else {
      toast.error('Please connect your wallet.')
    }
  }

  const handleUnstake = async () => {
    if (address) {
      if (inputValue !== 0 && inputValue <= data.displayValue) {
        setLoading(true)
        const response = await withdraw(inputValue)
        if (response.status === 'Success') {
          toast.success('Succeed')
        } else {
          if (response.status === 'Error')
            toast.error(`${response.status}: ${response.error}.`)
          else
            toast.error('Transaction failed by unknown reason.')
        }
      } else {
        if (inputValue === 0)
          toast.error('Invalid Input Value.')
        else
          toast.error('Insufficient Balance')
      }
    } else {
      toast.error('Please connect your wallet.')
    }
  }

  return (
    <div className='dapp-section__actions'>
      <div className="dapp-section__actions-wrapper">
        <DappSectionHeader setIsModalVisible={setIsModalVisible} setCurrentModal={setCurrentModal} />
        <DappSectionWithdraw setIsModalVisible={setIsModalVisible} />
        <DappSectionReceive setIsModalVisible={setIsModalVisible} />
      </div>
      {
        stakeType === 'Stake' ?
          <button type="button" className="dapp-section__submit" onClick={handleStake}>Stake now</button>
          :
          <button type="button" className="dapp-section__submit" onClick={handleUnstake}>Unstake now</button>
      }
    </div>
  )
}

export default StakeEth;
