import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // use Routes instead of Switch
import LoginPage from './screens/LoginPage';
import MenuPage from './screens/MenuPage';
import AddCakePage from './screens/AddCakePage';
import EditCakePage from './screens/EditCakePage';
import CakeList from './screens/CakeList';

const App = () => {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch in v6 */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menu/:id" element={<MenuPage />} />
        <Route path="/add-cake" element={<AddCakePage />} />
        <Route path="/cakelist" element={<CakeList />} />
        <Route path="/edit-cake/:id" element={<EditCakePage />} />
      </Routes>
    </Router>
  );
};

export default App;
