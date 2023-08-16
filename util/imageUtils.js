import crypto from 'crypto';

//Image Upload to cloudinary
export async function uploadImage(imageFile) {
  const data = new FormData();
  data.append('file', imageFile);
  data.append('upload_preset', 'sakanet');
  data.append('cloud_name', 'sakanet');

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/sakanet/image/upload', {
      method: 'post',
      body: data,
    });

    const cloudinaryData = await response.json();
    return cloudinaryData.secure_url;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}



//Image Delete to Cloudinary
export async function imageDelete(imageUrl){
  const image = imageUrl;
  const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;

  const generateSHA1 = (data) => {
    const hash = crypto.createHash('sha1');
    hash.update(data);
    return hash.digest('hex');
  };

  const generateSignature = (publicId, apiSecret) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };

  const getPublicIdFromUrl = (url) => {
    const match = url.match(regex);
    return match ? match[1] : null;
  };

 
    const cloudName = 'sakanet';
    const apiKey = '512321554486883';
    const apiSecret = 'MLSiyb7pmXE0F2A9vThV4epboyU';
    const publicId = getPublicIdFromUrl(image);

    if (!publicId) {
      console.error('Invalid Cloudinary URL');
      return;
    }

    const timestamp = new Date().getTime();
    const signature = generateSHA1(generateSignature(publicId, apiSecret));
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_id: publicId,
          signature: signature,
          api_key: apiKey,
          timestamp: timestamp,
        }),
      });

      const data = await response.json();
      console.log('Response:', data);

    } catch (error) {
      console.error('Error:', error);
    }
  ;

  return (
   "Delete Successful"
  );
};
