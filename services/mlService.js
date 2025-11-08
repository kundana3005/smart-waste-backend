const axios = require('axios');

exports.getCleanupAccuracy = async (beforePhotoURL, afterPhotoURL) => {
    // ML server expects both images, returns score
    const response = await axios.post('http://localhost:5000/api/cleanup_accuracy', {
        before: beforePhotoURL,
        after: afterPhotoURL
    });
    return response.data.score;
};