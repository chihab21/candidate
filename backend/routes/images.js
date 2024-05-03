const express = require("express");
const cloudinary = require('cloudinary');
const router=express.Router();

// Configurez Cloudinary avec vos clés d'API
cloudinary.config({
    cloud_name: 'dqwc3ewbs',
    api_key:'845715758165965',
    api_secret:'tXNo6r10KdziNI2_-49KmwmJnws',
});


router.delete('/:public_id', async (req, res) => {
    const { public_id } = req.params;
    console.log('Received DELETE request for public_id:', public_id);
  
    try {
      await cloudinary.uploader.destroy(public_id);
      console.log('Image deleted successfully');
      res.status(200).send();
    } catch (e) {
      console.error('Error deleting image:', e);
      res.status(500).send(e.message);
    }
  });
  
module.exports = router;