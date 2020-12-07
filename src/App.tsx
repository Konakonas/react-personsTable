import React from 'react';
import { Provider } from 'mobx-react'
import { Table } from './components/Table';
import { PersonsStore } from './components/Stores/PersonStore';

const stores = {
  personsStore: new PersonsStore()
}

function App() {
  return (
    <Provider {...stores}> 
      <Table /> 
    </Provider> 
  );
}

export default App;
