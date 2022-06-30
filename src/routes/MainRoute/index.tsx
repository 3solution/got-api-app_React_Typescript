import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import TableOfCharacters from '../../pages/TableOfCharacters';
import HouseDetails from '../../pages/HouseDetails';

const MainRoute = () => {
  return (
    <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TableOfCharacters />} />
          <Route path="/housedetails" element={<HouseDetails />} />
          <Route path="/*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
};

export default MainRoute;
