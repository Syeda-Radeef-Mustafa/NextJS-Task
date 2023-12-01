import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { serverTimestamp } from 'firebase/firestore';

const preventDefault = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

const AddItemModalComponent = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileInput');
    if (!imageUploaded || !fileInput) {
      fileInput && fileInput.click();
    }
  };

  const handleDrop = (event) => {
    preventDefault(event);
    const file = event.dataTransfer.files[0];

    if (file && file.size > 1024 * 1024) {
      setErrorMessage('File size exceeds 1MB limit.');
      return;
    }

    setImage(file);
    setImageUploaded(true);
    setErrorMessage('');
  };

  const handleCancel = () => {
    setTitle('');
    setImage(null);
    setImageUploaded(false);
    setErrorMessage('');
    onClose();
  };

  const handleAdd = async () => {
    if (image && title) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const imageUrl = reader.result;
        console.log('File uploaded:', imageUrl);
        await onAdd({ title, imageUrl });
        setTitle('');
        setImage(null);
        setImageUploaded(false);
        setErrorMessage('');
        onClose();
      };

      reader.readAsDataURL(image);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file && file.size > 1024 * 1024) {
      setErrorMessage('File size exceeds 1MB limit.');
      return;
    }

    setImage(file);
    setImageUploaded(true);
    setErrorMessage('');
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Add Check-in
        </Typography>
        <TextField
          label="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <div
          style={{
            border: `2px dashed ${imageUploaded ? 'green' : '#aaaaaa'}`,
            padding: '25px',
            textAlign: 'center',
            cursor: 'pointer',
            marginTop: '30px',
            marginBottom: '20px',
            width: '90%',
            minHeight: '100px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleUploadClick}
          onDrop={handleDrop}
          onDragOver={preventDefault}
          onDragEnter={preventDefault}
          onDragLeave={preventDefault}
        >
          {imageUploaded ? (
            <Typography variant="body1" color="green">
              Image Uploaded
            </Typography>
          ) : (
            <>
              <CloudUploadIcon style={{ fontSize: 40, color: '#0000FF', marginBottom: '5px' }} />
              <input
                id="fileInput"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <Typography variant="body1">
                Click or drop file anywhere in this area to upload
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Support for single or bulk upload. Strictly prohibit from uploading company data or other banned files.
              </Typography>
            </>
          )}
        </div>
        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ marginTop: '8px' }}>
            {errorMessage}
          </Typography>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '16px',
            width: '100%',
          }}
        >
          <Button onClick={handleCancel} variant="outlined" style={{ marginRight: '8px', color:'black', borderColor:'grey', borderRadius:'20px' }}>
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            variant="contained"
            style={{ backgroundColor: '#7c57ff', color: 'white', borderRadius: '20px' }}
            disabled={!title || !image}
          >
            Add
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddItemModalComponent;
