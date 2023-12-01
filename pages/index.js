import React, { useState, useEffect, useRef } from 'react';
import AppBarComponent from '../components/AppBarComponent';
import ContainerComponent from '../components/ContainerComponent';
import BasicCardComponent from '../components/BasicCardComponent';
import AddItemModalComponent from '../components/AddItemModalComponent';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AppBarComponent />
      <ContainerComponent />
      <BasicCardComponent setIsModalOpen={setIsModalOpen} />
      <AddItemModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Home;
