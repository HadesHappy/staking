import React, { useState } from 'react'
import { useAddress, useBalance } from '@thirdweb-dev/react'
import { pairTokenAddress } from '../utils/constants'
import { stakeLp } from '../contracts/stake'
import { approveLp, getAllowance } from '../contracts/approve'
import { toast } from 'react-hot-toast'
import { formatEther } from '../utils/helper'

const AddLiquidityForm = ({ setIsModalVisible }) => {
  const [amount, setAmount] = useState()
  const [isApproved, setIsApproved] = useState()
  const address = useAddress()
  const { data } = useBalance(pairTokenAddress)

  const getTokenAllowance = async () => {
    try {
      const { allowanceLp } = await getAllowance(address)
      if (allowanceLp < formatEther(amount))
        setIsApproved(false)
      else
        setIsApproved(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleApproveClick = async () => {
    try {
      const response = await approveLp(amount)
      if (response.status === 'Success') {
        toast.success('Succeed.')
        getTokenAllowance()
      } else {
        if (response.status === 'Error')
          toast.error(`${response.status}: ${response.error}.`)
        else
          toast.error('Transaction failed by unknown reason.')
      }
    } catch (error) {
      console.log(error)
      getTokenAllowance()
    }
  }

  const handleConfirmClick = async () => {
    try {
      if (amount > 0 && amount <= data.displayValue) {
        const response = await stakeLp(amount)
        if (response.status === 'Success') {
          toast.success('Succeed.')
        } else {
          if (response.status === 'Error')
            toast.error(`${response.status}: ${response.error}.`)
          else
            toast.error('Transaction failed by unknown reason.')
        }
      } else {
        if (amount === '0')
          toast.error('Error: Invalid Input')
        else
          toast.error('Error: Insufficient Balance')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleMaxClick = () => {
    if (data && data?.displayValue)
      setAmount(data.displayValue)
    else
      setAmount(0)
  }

  const handleChange = (e) => {
    setAmount(e.target.value)
    getTokenAllowance()
  }

  return (
    <form className='stake-window__form'>
      <div className='stake-window__form-wrapper'>
        <label htmlFor="stake-eth-input">Stake</label>
        <p>
          Balance: <span>{data?.displayValue} LP</span>
        </p>
        <input type="number" placeholder='Enter an amount' id='stake-eth-input' value={amount} onChange={handleChange} />
      </div>
      <button type='button' className='stake-window__max-btn stake-window__max-btn--alone' onClick={handleMaxClick}>Max</button>

      <footer className='stake-window__footer'>
        <button type='button' className='gray' onClick={() => setIsModalVisible(false)}>Cancel</button>
        {
          isApproved ?
            <button type='button' className='stake-window__footer-confirm purple' onClick={handleConfirmClick}>Confirm</button>
            :
            <button type='button' className='stake-window__footer-confirm purple' onClick={handleApproveClick}>Approve</button>
        }
      </footer>
    </form>
  )
}

export default AddLiquidityForm;
