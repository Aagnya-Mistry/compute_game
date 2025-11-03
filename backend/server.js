const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from assets directory
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Session storage for tracking used files
const sessions = new Map();

// Helper function to get all files from a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Helper function to get random file from available files
function getRandomFile(usedFiles, allFiles) {
  const availableFiles = allFiles.filter(file => !usedFiles.has(file));
  
  if (availableFiles.length === 0) {
    // Reset if all files have been used
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * availableFiles.length);
  return availableFiles[randomIndex];
}

// GET /api/random-media
app.get('/api/random-media', (req, res) => {
  const sessionId = req.headers['session-id'] || 'default';
  
  // Initialize session if it doesn't exist
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      usedFiles: new Set(),
      imageCount: 0,
      videoCount: 0
    });
  }
  
  const session = sessions.get(sessionId);
  const { usedFiles, imageCount, videoCount } = session;
  
  // Determine if we need an image or video (20 images, 20 videos total)
  let needImage = false;
  let needVideo = false;
  
  if (imageCount < 20 && videoCount < 20) {
    // Randomly decide between image and video
    const totalRemaining = (20 - imageCount) + (20 - videoCount);
    const random = Math.random();
    if (random < (20 - imageCount) / totalRemaining) {
      needImage = true;
    } else {
      needVideo = true;
    }
  } else if (imageCount < 20) {
    needImage = true;
  } else if (videoCount < 20) {
    needVideo = true;
  } else {
    return res.status(400).json({ error: 'All questions completed' });
  }
  
  // Get all files from both directories
  const aiDir = path.join(__dirname, '../assets/ai');
  const realDir = path.join(__dirname, '../assets/real');
  
  let allFiles = [];
  
  if (needImage) {
    // Filter for image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const aiImages = getAllFiles(aiDir).filter(file => 
      imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
    );
    const realImages = getAllFiles(realDir).filter(file => 
      imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
    );
    allFiles = [...aiImages, ...realImages];
  } else if (needVideo) {
    // Filter for video files
    const videoExtensions = ['.mp4', '.webm', '.mov', '.avi'];
    const aiVideos = getAllFiles(aiDir).filter(file => 
      videoExtensions.some(ext => file.toLowerCase().endsWith(ext))
    );
    const realVideos = getAllFiles(realDir).filter(file => 
      videoExtensions.some(ext => file.toLowerCase().endsWith(ext))
    );
    allFiles = [...aiVideos, ...realVideos];
  }
  
  const selectedFile = getRandomFile(usedFiles, allFiles);
  
  if (!selectedFile) {
    return res.status(400).json({ error: 'No more files available' });
  }
  
  // Determine label based on folder
  const label = selectedFile.includes(path.sep + 'ai' + path.sep) || selectedFile.endsWith(path.sep + 'ai') ? 'ai' : 'real';
  
  // Mark file as used
  usedFiles.add(selectedFile);
  
  // Update counts
  if (needImage) {
    session.imageCount++;
  } else {
    session.videoCount++;
  }
  
  // Get relative path for URL
  const relativePath = path.relative(path.join(__dirname, '../assets'), selectedFile);
  const fileUrl = `/assets/${relativePath.replace(/\\/g, '/')}`;
  
  // Determine file type
  const fileExtension = path.extname(selectedFile).toLowerCase();
  const isVideo = ['.mp4', '.webm', '.mov', '.avi'].includes(fileExtension);
  
  res.json({
    url: fileUrl,
    label: label,
    type: isVideo ? 'video' : 'image'
  });
});

// Reset session
app.post('/api/reset-session', (req, res) => {
  const sessionId = req.headers['session-id'] || 'default';
  sessions.delete(sessionId);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

