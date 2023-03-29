import React from 'react'

const SectionHeadTabs = ({currentHeadTab, setCurrentHeadTab}) => {
  const sectionHeadTabs = ['Stake ETH', 'Stake LSD', 'Stake LP'];

  return (
    <menu
      className={`dapp-section__head-tabs ${currentHeadTab === 'Stake ETH' ? 'dapp-section__head-tabs--eth' : ''} ${currentHeadTab === 'Stake LSD' ? 'dapp-section__head-tabs--lsd' : ''} ${currentHeadTab === 'Stake LP' ? 'dapp-section__head-tabs--lp' : ''}`}
    >
      {
        sectionHeadTabs.map((tab) => (
          <li className='dapp-section__head-tab-item' key={tab}>
            <button
              className={`dapp-section__head-tab-btn ${currentHeadTab === tab ? 'active' : '' }`}
              onClick={() => setCurrentHeadTab(tab)}
            >
                {tab}
            </button>
          </li>
        ))
      }
    </menu>
  )
}

export default SectionHeadTabs;
