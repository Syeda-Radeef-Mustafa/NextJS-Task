import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import { Card, CardContent, CardMedia, Typography, Avatar, Grid } from '@mui/material';
import { format } from 'date-fns';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BasicCard = ({ data }) => {
  return (
    <div key={data.id}>
      <Card sx={{ maxWidth: 345, borderRadius: '20px' }}>
        <CardMedia
          sx={{ height: 140, width: '90%', margin: 'auto', borderRadius: '20px', marginTop: '15px' }}
          image={data.imageUrl}
          title={data.title}
        />
        <CardContent sx={{ padding: '16px' }}>
          <Typography variant="h5" component="div" sx={{ marginBottom: '8px' }}>
            {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
            {data.description}
          </Typography>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
                Date: {data.date ? format(data.date.toDate(), 'MMMM dd, yyyy') : 'Loading...'}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Avatar sx={{ marginRight: '4px' }}>JD</Avatar>
                <Typography variant="body2" color="text.secondary">
                  Owner: John Doe
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

const BasicCardComponent = () => {
  const [firebaseData, setFirebaseData] = useState([]);
  const sliderRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsCollection = collection(firestore, 'items');
        const unsubscribe = onSnapshot(itemsCollection, (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setFirebaseData(data);
          if (sliderRef.current) {
            sliderRef.current.slickNext();
          }
        });
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: firebaseData.length < 4 ? firebaseData.length : 4,
    slidesToScroll: 1,
  };

  return (
    <Slider ref={sliderRef} {...settings}>
      {firebaseData.map((data) => (
        <BasicCard key={data.id} data={data} />
      ))}
    </Slider>
  );
};

export default BasicCardComponent;
