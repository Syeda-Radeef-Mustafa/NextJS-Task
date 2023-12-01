import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddItemModalComponent from './AddItemModalComponent';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 
import { firestore } from '../firebase/firebaseConfig';

const ContainerComponent = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleAdd = async (item) => {
      try {
        const itemsCollection = collection(firestore, 'items');
        await addDoc(itemsCollection, { ...item, date: serverTimestamp() });
        console.log('Item added to Firebase');
        setIsModalOpen(false); 
      } catch (error) {
        console.error('Error adding item to Firebase:', error);
      }
    };
    
  return (
    <Card style={{ marginTop: '20px', width: '100%', height: '300px', position: 'relative', borderRadius: '20px' }}>
    <CardMedia
      component="img"
      height="100%"
      width="100%"
      image="/1.jpg"
      alt="Image"
      style={{ objectFit: 'cover' }}
    />
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '30%',
        background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)',
      }}
    ></div>
    <CardContent
      style={{
        position: 'absolute',
        top: '50%',
        left: '10%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
      }}
    >
      <Typography variant="h5">Hi! James Doe</Typography>
      <Typography variant="body1" style={{ marginTop: '20px' }}>
        Lorem Ipsum is simply dummy text
      </Typography>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="contained"
        style={{ backgroundColor: '#0000FF', marginTop: '20px', borderRadius: '20px' }}
      >
        Add Check-in
      </Button>
      <AddItemModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAdd} />
    </CardContent>
  </Card>
  );
};

export default ContainerComponent;