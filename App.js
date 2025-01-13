import Navigations from './Navigation';
import react from 'react';
import {
  DataProvider

} from './src/components/Context/DataContex';
import OfflineNotice from './src/utils/OfflineNotice';

export default function App() {

  return (


    <DataProvider>
      <OfflineNotice />
      <Navigations />
    </DataProvider>


  );
}

