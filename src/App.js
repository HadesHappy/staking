import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'
import ConnectWallet from './components/ConnectWallet'
import ModalWindow from './components/ModalWindow'
import PageHeader from './components/PageHeader'
import Dapp from './pages/dapp/Dapp'
import Home from './pages/home/Home'
import Stake from './pages/stake/Stake'
import { Toaster } from 'react-hot-toast'

function App() {

  const [isWalletWindowVisible, setIsWalletWindowVisible] = useState(false);

  const location = useLocation();

  return (
    <div className={`app ${location.pathname === '/' ? '' : 'app--black'}`}>
      <PageHeader setIsWalletWindowVisible={setIsWalletWindowVisible} />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/dapp' element={<Dapp />} />
        <Route path='/stake' element={<Stake />} />
      </Routes>

      {
        isWalletWindowVisible &&
        <ModalWindow>
          <ConnectWallet setIsWalletWindowVisible={setIsWalletWindowVisible} />
        </ModalWindow>
      }

      <Toaster toastOptions={{
        className: '',
        style: {
          borderRadius: '10px',
          background: '#6761D7',
          color: '#fff',
        }
      }} />
    </div>
  );
}

export default App;
