import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListView from './components/ListView/index.jsx';
import ItemDetails from './components/ItemDetails/index.jsx';

const App = () => {
  return (
    <Router future={{v7_startTransition: true}}>
      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/item/:id" element={<ItemDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
