# Quick Start Guide

Get up and running with AI Smart Hospital Assistant in 5 minutes! 🚀

---

## 1. Prerequisites

Ensure you have installed:
- **Python 3.9+** (check: `python --version`)
- **Node.js 18+** (check: `node --version` and `npm --version`)
- **Git** (for cloning)

---

## 2. Clone & Setup (5 minutes)

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run backend (runs on port 5000)
python app.py
```

**Expected Output:**
```
 * Running on http://localhost:5000
 * Press CTRL+C to quit
```

### Frontend Setup (in a new terminal)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server (runs on port 3000)
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view the app in the browser at http://localhost:3000
```

---

## 3. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the AI Smart Hospital Assistant homepage with navigation bar and feature cards.

---

## 4. Quick Test: Pain Detection

### Step 1: Navigate to Pain Detection
- Click on **"Pain Detection"** in the navbar
- Or go to: `http://localhost:3000/pain-detection`

### Step 2: Upload/Capture Image
- Click **"Capture Image"** button
- Allow camera access or upload a test image
- The system will analyze facial expressions

### Step 3: View Results
- Pain score (0-10 scale) will be displayed
- Color-coded severity indicator
- Facial landmarks visualization
- Recommendations based on analysis

**Test Data:**
```
Expected Score: 0-10
Expected Confidence: 0.70-0.95
Expected Alert Level: NORMAL/INFO/WARNING/CRITICAL
```

---

## 5. Quick Test: Voice Analysis

### Step 1: Navigate to Voice Analysis
- Click on **"Voice Analysis"** in the navbar
- Or go to: `http://localhost:3000/voice-analysis`

### Step 2: Record Audio
- Click **"Start Recording"** button
- Speak for 30+ seconds (e.g., read a paragraph)
- Click **"Stop Recording"**

### Step 3: View Results
- Disease classification (Parkinson's, Respiratory, Depression, Healthy)
- Confidence percentage
- Detected indicators
- Clinical recommendations

---

## 6. Quick Test: Surgery Risk Assessment

### Step 1: Navigate to Surgery Risk
- Click on **"Surgery Risk"** in the navbar
- Or go to: `http://localhost:3000/surgery-risk`

### Step 2: Enter Patient Data

Fill in the form with example values:
```
Age: 62
Gender: Male
BMI: 28.5
Blood Pressure: 145/92
Heart Rate: 78
Oxygen Saturation: 95%
Hemoglobin: 12.5
Blood Glucose: 145
Creatinine: 1.2
Comorbidities: Diabetes, Hypertension
```

### Step 3: View Risk Assessment
- Risk level (Low/Medium/High)
- Risk percentage (0-100%)
- Clinical recommendations
- Risk factors breakdown

---

## 7. API Testing (cURL)

### Test 1: Health Check

```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "message": "API is healthy",
  "status": "running"
}
```

### Test 2: Pain Detection API

```bash
# First, prepare a base64 image
# Then call the API:

curl -X POST http://localhost:5000/api/diagnosis/pain-detection \
  -H "Content-Type: application/json" \
  -d '{
    "patient_id": "test_patient",
    "image_data": "your_base64_image_here",
    "image_format": "jpeg"
  }'
```

## 8. Common Issues & Solutions

### Issue: Port 5000 already in use

**Solution:**
```bash
# Find process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5000
kill -9 <PID>

# Or use different port
python app.py --port 5001
```

### Issue: Module 'mediapipe' not found

**Solution:**
```bash
cd backend
pip install --upgrade mediapipe
```

### Issue: React app not loading (blank page)

**Solution:**
```bash
cd frontend
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Issue: CORS errors

**Solution:**
- Ensure backend is running on `http://localhost:5000`
- Frontend should be on `http://localhost:3000`
- Check `backend/config.py` for CORS settings

---

## 9. File Structure Quick Reference

```
DTP/
├── backend/
│   ├── models/              # AI modules (pain, voice, surgery)
│   ├── routes/              # API endpoints
│   ├── app.py               # Main Flask app
│   └── requirements.txt      # Dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Page components
│   │   └── App.js           # Root component
│   └── package.json         # Dependencies
├── ARCHITECTURE.md          # System design
├── AI_ML_MODELS.md          # Model documentation
└── API_DOCUMENTATION.md     # API reference
```

---

## 10. Next Steps

### Learn More
- 📐 **[ARCHITECTURE.md](./ARCHITECTURE.md)** — System design & architecture
- 🤖 **[AI_ML_MODELS.md](./AI_ML_MODELS.md)** — AI/ML model details
- 🔌 **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** — Complete API reference

### Explore Features
- [ ] Pain Detection in real-time
- [ ] Voice Analysis with different conditions
- [ ] Surgery Risk Assessment
- [ ] Multi-modal Composite Analysis
- [ ] Real-time Alerts & Monitoring

### Development
- [ ] Understand the AI models
- [ ] Modify model parameters
- [ ] Add new diagnostic modules
- [ ] Extend API endpoints
- [ ] Customize UI components

---

## 11. Useful Commands

```bash
# Backend
cd backend
python app.py                    # Run development server
pip install -r requirements.txt  # Install dependencies
python -c "import mediapipe"     # Test imports

# Frontend
cd frontend
npm start                        # Start dev server
npm run build                    # Build for production
npm test                         # Run tests
npm install <package>           # Install new package

# Docker (if installed)
docker-compose up --build       # Start all services
docker-compose logs -f          # View logs
docker-compose down             # Stop services
```

---

## 12. Testing the Models

### Quick Model Test (Python)

```python
# Test pain detection
from backend.models.pain_detector import PainDetector
pain_detector = PainDetector()

# Test voice analysis
from backend.models.voice_analyzer import VoiceAnalyzer
voice_analyzer = VoiceAnalyzer()

# Test surgery risk
from backend.models.surgery_risk import SurgeryRiskPredictor
surgery_risk = SurgeryRiskPredictor()
```

---

## 13. Debugging Tips

### Enable Detailed Logs

```python
# In backend/app.py
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Check Model Features

```bash
# Voice model features
curl http://localhost:5000/api/diagnosis/voice-analysis \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{...}' | jq '.data.features_extracted'
```

### Monitor API Calls

```bash
# Use browser DevTools Console
# Check Network tab for API requests
# View response payloads
```

---

## 14. Performance Tips

- Pain Detection: **~50-100ms** per frame (optimized)
- Voice Analysis: **~2-5 seconds** for 30-45 second audio
- Surgery Risk: **~10-50ms** for prediction
- Expected API Response Time: **<500ms** for most endpoints

---

## 15. What to Do Next

After setup, try:

1. **Explore the Dashboard** - Check doctor dashboard features
2. **Test All Models** - Try pain, voice, and surgery risk
3. **Review Code** - Understand the architecture
4. **Read Documentation** - Deep dive into ARCHITECTURE.md
5. **Modify & Extend** - Add your own features!

---

## Getting Help

- 📖 **Documentation:** See ARCHITECTURE.md, AI_ML_MODELS.md, API_DOCUMENTATION.md
- 🐛 **Issues:** Check GitHub Issues
- 💬 **Discussions:** Use GitHub Discussions
- 📧 **Contact:** support@hospital.ai

happy coding! 🎉
