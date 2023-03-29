import React, { useState } from 'react'
import StakeTabs from '../../components/StakeTabs'
import DappFooter from '../../components/DappFooter'
import ModalWindow from '../../components/ModalWindow'
import SelectToken from '../../components/SelectToken'
import DappSettingsWindow from '../../components/DappSettingsWindow'
import './dapp.css'
import { showBalance } from '../../utils/helper'
import { useStakeEthInfo } from '../../hooks/useStakeEthInfo'
import SectionHeadTabs from '../../components/SectionHeadTabs'
import LiquidityWindow from '../../components/LiquidityWindow'
import StakeWindow from '../../components/StakeWindow'

const Dapp = () => {


  const [currentHeadTab, setCurrentHeadTab] = useState('Stake ETH');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState('select-token');
  const { totalEth } = useStakeEthInfo();

  return (
    <>
      <main className='dapp'>
        <section className='dapp-section'>
          <SectionHeadTabs currentHeadTab={currentHeadTab} setCurrentHeadTab={setCurrentHeadTab} />
          <h1 className="dapp-section__title">
            <span>Stake coins</span>
            {showBalance(totalEth)}
          </h1>
          <p className="dapp-section__about">ETH staked</p>
        </section>
        <StakeTabs currentHeadTab={currentHeadTab} setIsModalVisible={setIsModalVisible} setCurrentModal={setCurrentModal}   />

      </main>
      <DappFooter />
      {
        isModalVisible &&
        <ModalWindow>
          {
            currentModal === 'select-token' && <SelectToken setIsModalVisible={setIsModalVisible} />
          }

          {
            currentModal === 'settings' && <DappSettingsWindow setIsModalVisible={setIsModalVisible} />
          }

          {
            currentModal === 'stake' && <StakeWindow setIsModalVisible={setIsModalVisible} />
          }

          {
            currentModal === 'add-liquidity' && <LiquidityWindow setIsModalVisible={setIsModalVisible} />
          }
        </ModalWindow>
      }
    </>
  )
};

export default Dapp;
