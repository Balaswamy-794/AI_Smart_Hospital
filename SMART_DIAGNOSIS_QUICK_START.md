# AI Voice-Based Smart Diagnosis - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Verify Backend Setup (30 seconds)
Check that dependencies are installed:
```bash
cd backend
pip list | grep -E "librosa|flask|scikit-learn"
```

✅ If you see librosa, flask, scikit-learn → Ready to go!

### Step 2: Start the Backend (15 seconds)
```bash
cd backend
python app.py
```
✅ Should see: "Running on http://localhost:5000"

### Step 3: Start the Frontend (15 seconds)
```bash
cd frontend
npm start
```
✅ Should see: "Compiled successfully!" and browser opens

### Step 4: Access the Feature (30 seconds)
- Click **"🎤 Smart Diagnosis"** in the navbar
- Or visit: `http://localhost:3000/ai-smart-diagnosis`

### Step 5: Test the Feature (180 seconds)
1. Select language (English or తెలుగు)
2. Click "Start Recording"
3. Describe a health concern (speak for 30+ seconds)
4. Click "Stop Recording"
5. Wait for AI analysis (~2-5 seconds)
6. Click "Answer Questions" to respond to follow-ups
7. Review results with conditions and recommendations

---

## 📁 Key Files at a Glance

### **Backend** (Django/Flask)
| File | Purpose | Key Function |
|------|---------|--------------|
| `backend/models/smart_diagnosis.py` | AI Diagnosis Engine | `SmartDiagnosisEngine.analyze()` |
| `backend/routes/diagnosis.py` | API Routes | `POST /api/diagnosis/ai-smart-diagnosis` |
| `backend/utils/language_support.py` | Language Support | `get_text()` function |

### **Frontend** (React)
| File | Purpose | Key Component |
|------|---------|----------------|
| `frontend/src/components/SmartDiagnosis.jsx` | Interactive UI | Voice recording & interaction |
| `frontend/src/pages/SmartDiagnosisPage.jsx` | Landing Page | Feature overview & info |
| `frontend/src/App.js` | Routing | Route definition |

### **Documentation**
| File | Purpose |
|------|---------|
| `SMART_DIAGNOSIS_DOCUMENTATION.md` | Complete detailed guide |
| `SMART_DIAGNOSIS_IMPLEMENTATION_SUMMARY.md` | Implementation checklist |
| `SMART_DIAGNOSIS_QUICK_START.md` | This file! |

---

## 🎤 Feature Walkthrough

### **What Happens When User Records**

```
1. User clicks "Start Recording"
   ↓
2. Browser captures audio using MediaRecorder
   ↓
3. User speaks for ~30 seconds to 1 minute
   ↓
4. User clicks "Stop Recording"
   ↓
5. Audio is sent to backend as base64
   ↓
6. Backend extracts voice features (librosa)
   ↓
7. Backend analyzes text sentiment
   ↓
8. ML model predicts conditions
   ↓
9. Results returned to frontend
   ↓
10. UI shows diagnosis with confidence scores
    ↓
11. AI asks follow-up questions via TTS
    ↓
12. User responds to each question
    ↓
13. Results refined and displayed
```

---

## 🔧 API Quick Reference

### **Main Endpoint**
```bash
POST /api/diagnosis/ai-smart-diagnosis
Content-Type: application/json

{
  "audio": "data:audio/webm;base64,GkXfo...",
  "transcription": "I have chest pain",
  "language": "en",
  "patient_id": "P-12345"
}
```

**Response Example:**
```json
{
  "success": true,
  "primary_condition": "respiratory",
  "confidence": 73.5,
  "discomfort_level": "high",
  "follow_up_questions": [
    "Do you have shortness of breath?",
    "How long have you had this cough?"
  ],
  "recommendations": [
    "Seek medical attention as soon as possible",
    "Monitor breathing patterns"
  ]
}
```

### **Follow-up Endpoint**
```bash
POST /api/diagnosis/ai-smart-diagnosis/follow-up
Content-Type: application/json

{
  "follow_up_answer": "Yes, severe shortness of breath",
  "language": "en",
  "session_id": "session-123"
}
```

---

## 🌐 Language Support

### **English (en)**
- Default language
- Full speech recognition support
- All features available

### **Telugu (తెలుగు) (te)**
- Full localization available
- Questions in Telugu
- TTS in Telugu
- UI in Telugu

**To switch languages:**
Click the language button at the top of the Smart Diagnosis page!

---

## ✨ Key Features Explained

### **1. Voice Recording** 🎤
- Records up to 10 minutes
- Real-time timer
- Echo cancellation and noise suppression
- Multiple audio format support

### **2. AI Analysis** 🤖
Analyzes:
- Voice signals (pitch, energy, MFCC)
- Speech content (keywords)
- Emotional tone (stress, depression)
- Combined scoring

### **3. Detected Conditions**
- 🫁 Respiratory Disorder
- 🧠 Parkinson's Disease
- 💭 Depression / Mental Health
- 😰 Anxiety Disorder

### **4. Follow-up Questions** 💬
- Dynamically generated (2-5 questions)
- Text and audio (TTS)
- Voice-based answers
- Condition-specific

### **5. Results Display**
- Primary condition with probability
- Discomfort level (Low/Moderate/High)
- Confidence score
- Clinical recommendations
- Important disclaimers

---

## 🐛 Troubleshooting

### **"No audio captured"**
```
✅ Solution:
1. Check browser microphone permissions
2. Click "Allow" when prompted
3. Try different browser (Chrome/Firefox preferred)
4. Restart browser and try again
```

### **"Speech not detected"**
```
✅ Solution:
1. Speak more clearly and slowly
2. Reduce background noise
3. Move microphone closer (6-12 inches)
4. Avoid interruptions
```

### **"Slow analysis"**
```
✅ Solution:
1. Check internet connection
2. Close other heavy applications
3. Restart backend server
4. Try with shorter audio clip first
```

### **"Language not switching"**
```
✅ Solution:
1. Refresh the page
2. Clear browser cache
3. Try incognito/private browsing
4. Check browser console for errors
```

---

## 📊 Testing Your Setup

### **Quick Test Command**
```bash
# Test backend API
curl -X POST http://localhost:5000/api/diagnosis/ai-smart-diagnosis \
  -H "Content-Type: application/json" \
  -d '{"audio":"test","transcription":"test","language":"en"}'

# Expected: JSON response with analysis
```

### **Frontend Test**
1. Go to `http://localhost:3000/ai-smart-diagnosis`
2. Click language selection
3. Should see "Start Recording" button
4. Click it - should hear TTS feedback
5. Browser should request microphone permission

---

## 📚 Learning Resources

### **For Backend Development**
- **AI Engine**: `backend/models/smart_diagnosis.py` - Read `SmartDiagnosisEngine` class
- **API Routes**: `backend/routes/diagnosis.py` - Check the two POST endpoints
- **Language**: `backend/utils/language_support.py` - See translation structure

### **For Frontend Development**
- **Component**: `frontend/src/components/SmartDiagnosis.jsx` - Main interactive component
- **Page**: `frontend/src/pages/SmartDiagnosisPage.jsx` - Landing page
- **State Flow**: Look at `currentStep` state transitions in SmartDiagnosis.jsx

### **For Full Understanding**
1. Read `SMART_DIAGNOSIS_DOCUMENTATION.md` first (complete overview)
2. Review `SMART_DIAGNOSIS_IMPLEMENTATION_SUMMARY.md` (what was built)
3. Check code comments in implementation files

---

## 🔍 Code Navigation

### **Finding Specific Features**

**Where is voice recording handled?**
→ `frontend/src/components/SmartDiagnosis.jsx` - `startInitialRecording()` function

**Where is analysis done?**
→ `backend/models/smart_diagnosis.py` - `SmartDiagnosisEngine.analyze()` method

**Where are follow-up questions generated?**
→ `backend/models/smart_diagnosis.py` - `_select_follow_up_questions()` method

**Where is language handling?**
→ `backend/utils/language_support.py` - `LANGUAGE_SUPPORT` dictionary and `get_text()` function

**Where are the questions stored?**
→ `backend/models/smart_diagnosis.py` - `POSSIBLE_CONDITIONS[condition]['questions']` dictionary

---

## ⚙️ Configuration

### **Backend Configuration** (`backend/.env`)
```env
FLASK_ENV=development
CORS_ORIGINS=http://localhost:3000
```

### **Frontend Configuration** (API calls in `SmartDiagnosis.jsx`)
```javascript
fetch('http://localhost:5000/api/diagnosis/ai-smart-diagnosis', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ audio, transcription, language })
})
```

### **Language Configuration** (in Smart Diagnosis component)
- Default: English ('en')
- User can toggle to Telugu ('te')
- Language passed to backend with each request

---

## 🚨 Important Reminders

### **DO's** ✅
- ✅ Test with real speech (not just silence)
- ✅ Use modern browser (Chrome/Firefox/Safari)
- ✅ Ensure microphone is working
- ✅ Check internet connection
- ✅ Review error messages for hints

### **DON'Ts** ❌
- ❌ Don't use very short audio (<10 seconds)
- ❌ Don't modify existing feature files
- ❌ Don't change existing API endpoints
- ❌ Don't remove old components
- ❌ Don't ignore the HIPAA disclaimer

---

## 📞 Getting Help

### **Common Issues & Solutions**
See **Troubleshooting** section above for quick fixes

### **Detailed Documentation**
See `SMART_DIAGNOSIS_DOCUMENTATION.md` for comprehensive info

### **Implementation Details**
See `SMART_DIAGNOSIS_IMPLEMENTATION_SUMMARY.md` for checklist

### **Code Comments**
Each file has detailed comments explaining logic

---

## 🎯 Next Steps

1. ✅ Verify installation is complete
2. ✅ Test the feature on `/ai-smart-diagnosis`
3. ✅ Try both languages (English & Telugu)
4. ✅ Test with different voice conditions
5. ✅ Review the detailed documentation
6. ✅ Check API responses in network tab
7. ✅ Deploy when confident

---

**Quick Links:**
- Feature Page: `http://localhost:3000/ai-smart-diagnosis`
- Backend API: `http://localhost:5000/api/diagnosis/ai-smart-diagnosis`
- Documentation: `SMART_DIAGNOSIS_DOCUMENTATION.md`

**Version**: 1.0.0  
**Status**: ✅ Production Ready
