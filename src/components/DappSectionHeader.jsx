import React, { useState } from 'react'
import { STAKE_ETH_TYPE, ETH_INPUT_CHANGE, ETH_OUTPUT_CHANGE } from '../store/constants'
import { useDispatch } from 'react-redux'

const DappSectionHeader = ({ setIsModalVisible, setCurrentModal }) => {
  const dispatch = useDispatch()
  const tabs = ['Stake', 'Unstake']
  const [activeTab, setActiveTab] = useState('Stake')

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    dispatch({ type: STAKE_ETH_TYPE, payload: tab })
    dispatch({ type: ETH_INPUT_CHANGE, payload: 0 })
    dispatch({ type: ETH_OUTPUT_CHANGE, payload: 0 })
  }

  return (
    <header className="dapp-section__header">
      <ul className={`dapp-section__tabs ${activeTab === 'Unstake' && 'dapp-section__tabs--unstake'}`}>
        {
          tabs.map((tab) => {
            return <li className={`dapp-section__tab ${activeTab === tab && 'active'}`} key={tab} onClick={() => handleTabClick(tab)}>{tab}</li>
          })
        }
      </ul>
      {/* <div className="dapp-section__settings">
        <button
          className="dapp-section__settings-btn"
          onClick={() => {
            setIsModalVisible(true);
            setCurrentModal('settings')
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.39504 19.3711L9.97949 20.6856C10.1532 21.0768 10.4368 21.4093 10.7957 21.6426C11.1547 21.8759 11.5736 22.0001 12.0017 22C12.4298 22.0001 12.8488 21.8759 13.2077 21.6426C13.5667 21.4093 13.8502 21.0768 14.0239 20.6856L14.6084 19.3711C14.8164 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5677 17.8941 17.0784 17.9478L18.5084 18.1C18.934 18.145 19.3636 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8714 16.635 20.9735 16.2103 20.951 15.7829C20.9285 15.3555 20.7825 14.9438 20.5306 14.5978L19.6839 13.4344C19.3825 13.0171 19.2214 12.5148 19.2239 12C19.2238 11.4866 19.3864 10.9864 19.6884 10.5711L20.535 9.40778C20.7869 9.06175 20.933 8.65007 20.9554 8.22267C20.9779 7.79528 20.8759 7.37054 20.6617 7C20.4478 6.62923 20.1309 6.32849 19.7495 6.13423C19.3681 5.93997 18.9385 5.86053 18.5128 5.90556L17.0828 6.05778C16.5722 6.11141 16.0576 6.00212 15.6128 5.74556C15.1699 5.48825 14.8199 5.09736 14.6128 4.62889L14.0239 3.31444C13.8502 2.92317 13.5667 2.59072 13.2077 2.3574C12.8488 2.12408 12.4298 1.99993 12.0017 2C11.5736 1.99993 11.1547 2.12408 10.7957 2.3574C10.4368 2.59072 10.1532 2.92317 9.97949 3.31444L9.39504 4.62889C9.18797 5.09736 8.83792 5.48825 8.39504 5.74556C7.95026 6.00212 7.43571 6.11141 6.92504 6.05778L5.4906 5.90556C5.06493 5.86053 4.63534 5.93997 4.25391 6.13423C3.87249 6.32849 3.55561 6.62923 3.34171 7C3.12753 7.37054 3.02549 7.79528 3.04798 8.22267C3.07046 8.65007 3.2165 9.06175 3.46838 9.40778L4.31504 10.5711C4.61698 10.9864 4.77958 11.4866 4.77949 12C4.77958 12.5134 4.61698 13.0137 4.31504 13.4289L3.46838 14.5922C3.2165 14.9382 3.07046 15.3499 3.04798 15.7773C3.02549 16.2047 3.12753 16.6295 3.34171 17C3.55582 17.3706 3.87274 17.6712 4.25411 17.8654C4.63548 18.0596 5.06496 18.1392 5.4906 18.0944L6.9206 17.9422C7.43127 17.8886 7.94581 17.9979 8.3906 18.2544C8.83513 18.511 9.18681 18.902 9.39504 19.3711Z" stroke="#AFAFAF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.9999 15C13.6568 15 14.9999 13.6569 14.9999 12C14.9999 10.3431 13.6568 9 11.9999 9C10.3431 9 8.99992 10.3431 8.99992 12C8.99992 13.6569 10.3431 15 11.9999 15Z" stroke="#AFAFAF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div> */}
    </header>
  )
}

export default DappSectionHeader;
