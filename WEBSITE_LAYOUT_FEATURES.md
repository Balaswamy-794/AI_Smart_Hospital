# Website Layout & Features Architecture

## 1. Website Structure Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         NAVBAR (Persistent)                     │
│  Logo | Home | Pain Detection | Voice Analysis | Surgery Risk   │
│                                            Dashboard | Logout    │
└─────────────────────────────────────────────────────────────────┘
│                                                                   │
│                        MAIN CONTENT AREA                         │
│                        (Routes)                                  │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Current Page Content                                       ││
│  │  (Rendered based on route)                                  ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
│  FOOTER (Persistent)                                             │
│  Copyright | Links | Contact | Support                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Page Layouts & Routes

### 2.1 Home Page (`/`)

**Layout:**
```
┌─────────────────────────────────────────┐
│                                         │
│          HERO SECTION                   │
│   "Welcome to AI Smart Hospital"        │
│    [Subtitle & Call-to-Action]          │
│           [Get Started Button]          │
│                                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│   FEATURES OVERVIEW (3-Column Grid)     │
├─────────────┬─────────────┬─────────────┤
│   Feature 1 │   Feature 2 │   Feature 3 │
│   Card      │   Card      │   Card      │
│  [Icon]     │  [Icon]     │  [Icon]     │
│  [Title]    │  [Title]    │  [Title]    │
│  [Desc]     │  [Desc]     │  [Desc]     │
│  [Link]     │  [Link]     │  [Link]     │
└─────────────┴─────────────┴─────────────┘

┌─────────────────────────────────────────┐
│        HOW IT WORKS SECTION             │
│  Step 1 → Step 2 → Step 3 → Results     │
│        [Detailed Explanation]           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           FOOTER SECTION                │
└─────────────────────────────────────────┘
```

**Components Used:**
- `Navbar` (header)
- `HeroSection` (hero banner)
- `FeatureCard` (3× for main features)
- `Footer` (footer)

**Features Displayed:**
1. Facial Pain Detection
2. Voice Disease Detection  
3. Surgery Risk Prediction

---

### 2.2 Facial Pain Detection Page (`/pain-detection`)

**Layout:**
```
┌─────────────────────────────────────────┐
│   PAGE TITLE: Facial Pain Detection     │
│   Description & Instructions            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│           DETECTOR SECTION (Left 60%)           │
├─────────────┬───────────────────────────────────┤
│             │                                   │
│   Video     │        Controls & Info            │
│   Feed /    │                                   │
│   Image     │   ┌─────────────────────────────┐ │
│   Display   │   │ [Capture Button]            │ │
│             │   │ [Instructions]              │ │
│             │   │ [Camera Permission Status] │ │
│             │   └─────────────────────────────┘ │
│             │                                   │
└─────────────┴───────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│          ALERT PANEL (Right 40%)                │
├─────────────────────────────────────────────────┤
│                                                 │
│  Pain Score:  [████████░░] 6.8/10              │
│                                                 │
│  Status: SEVERE PAIN                            │
│  Color:  █ Red (#DC2626)                        │
│                                                 │
│  Breakdown:                                     │
│  • Brow Tension:    82%                        │
│  • Eye Narrowing:   75%                        │
│  • Mouth Tension:   91%                        │
│  • Nose Wrinkling:  45%                        │
│  • Facial Asymmetry: 35%                       │
│                                                 │
│  Recommendations:                               │
│  ✓ Immediate pain management                   │
│  ✓ Monitor vital signs                         │
│  ✓ Doctor notification sent                    │
│                                                 │
│  [Alert Triggered] [View History]              │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Components Used:**
- `PainDetector` (capture & analysis)
- `AlertPanel` (results display)

**Models Used:**
- **Pain Detector Model** (MediaPipe Face Mesh)
  - Input: Real-time facial image
  - Output: Pain score (0-10)
  - Features: Facial landmark analysis

---

### 2.3 Voice Disease Detection Page (`/voice-analysis`)

**Layout:**
```
┌─────────────────────────────────────────┐
│   PAGE TITLE: Voice Disease Analysis    │
│   Description & Instructions            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│         RECORDING SECTION (Left 55%)            │
├─────────────┬───────────────────────────────────┤
│             │                                   │
│ Recording   │      Controls                     │
│ Visualizer  │                                   │
│ (Waveform)  │  ┌─────────────────────────────┐ │
│             │  │ [Start Recording]           │ │
│             │  │ 00:00 / 01:00               │ │
│             │  │ [Stop Recording]            │ │
│             │  │ [Reset]                     │ │
│ Timeline    │  │ [Submit for Analysis]       │ │
│ Display     │  └─────────────────────────────┘ │
│             │                                   │
│ Audio       │  Microphone Status:               │
│ Info        │  🎤 Ready / Recording / Done     │
│             │                                   │
└─────────────┴───────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│        RESULTS PANEL (Right 45%)                │
├─────────────────────────────────────────────────┤
│                                                 │
│  Primary Condition:  Parkinson's Disease       │
│                                                 │
│  Confidence:  ████████░░  87%                  │
│                                                 │
│  Condition Breakdown:                           │
│  • Parkinson's:   87% 🧠                       │
│  • Respiratory:   08%                          │
│  • Depression:    04%                          │
│  • Healthy:       01%                          │
│                                                 │
│  Detected Indicators:                           │
│  ✓ Vocal tremor detected                       │
│  ✓ Reduced loudness observed                   │
│  ✓ Monotone pitch pattern                      │
│  ✓ Breathy voice quality                       │
│                                                 │
│  Recommendations:                               │
│  → Refer to neurology specialist                │
│  → Schedule comprehensive assessment            │
│  → Monitor speech symptoms                     │
│                                                 │
│  [View Features] [Save Report] [Share]          │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Components Used:**
- `VoiceAnalyzer` (recording & capture)
- `AlertPanel` (results display)

**Models Used:**
- **Voice Analyzer Model** (MFCC + Random Forest)
  - Input: 30+ seconds audio (22.05 kHz)
  - Output: Disease classification + confidence
  - Features: MFCC, Spectral, Prosodic

---

### 2.4 Surgery Risk Assessment Page (`/surgery-risk`)

**Layout:**
```
┌─────────────────────────────────────────┐
│   PAGE TITLE: Surgery Risk Assessment   │
│   "Evaluate surgical fitness"           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│         INPUT FORM (Left Panel - 55%)           │
├─────────────────────────────────────────────────┤
│                                                 │
│  Demographics:                                  │
│  ┌─────────────────────────────────────────┐  │
│  │ Age: [____]  Gender: [Select ▼]        │  │
│  │ Height: [____] cm  Weight: [____] kg    │  │
│  │ BMI (auto-calc): [____]                │  │
│  └─────────────────────────────────────────┘  │
│                                                 │
│  Vital Signs:                                   │
│  ┌─────────────────────────────────────────┐  │
│  │ BP Systolic: [____]  Diastolic: [____] │  │
│  │ Heart Rate: [____]  O2 Sat: [____]%   │  │
│  │ Respiratory Rate: [____]                │  │
│  └─────────────────────────────────────────┘  │
│                                                 │
│  Lab Values:                                    │
│  ┌─────────────────────────────────────────┐  │
│  │ Hemoglobin: [____]  Platelets: [____]  │  │
│  │ Glucose: [____]  Creatinine: [____]    │  │
│  │ Albumin: [____]  Bilirubin: [____]     │  │
│  └─────────────────────────────────────────┘  │
│                                                 │
│  Surgery Details:                               │
│  ┌─────────────────────────────────────────┐  │
│  │ Type: [Select ▼]                       │  │
│  │ Urgency: [Select ▼]                    │  │
│  │ Duration (min): [____]                 │  │
│  └─────────────────────────────────────────┘  │
│                                                 │
│  Comorbidities:                                 │
│  ┌─────────────────────────────────────────┐  │
│  │ ☐ Diabetes        ☐ Hypertension       │  │
│  │ ☐ Heart Disease   ☐ Lung Disease       │  │
│  │ ☐ Kidney Disease  ☐ Liver Disease      │  │
│  │ ☐ Smoking         ☐ Previous Surgery   │  │
│  └─────────────────────────────────────────┘  │
│                                                 │
│        [CALCULATE RISK]  [CLEAR FORM]         │
│                                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│        RISK ASSESSMENT (Right Panel - 45%)      │
├─────────────────────────────────────────────────┤
│                                                 │
│  RISK LEVEL:  HIGH RISK                        │
│  ██████████░  68%                              │
│                                                 │
│  Risk Classification:                           │
│  └─→ 65-100% range                             │
│                                                 │
│  Feature Importance:                            │
│  1. Age (18%)                                  │
│  2. Kidney Risk (16%)                          │
│  3. Comorbidity Count (14%)                    │
│  4. Blood Glucose (12%)                        │
│  5. Creatinine (11%)                           │
│  [Show All Features]                            │
│                                                 │
│  Risk Factors Identified:                       │
│  ⚠ Elevated glucose level                      │
│  ⚠ Reduced kidney function                     │
│  ⚠ Multiple comorbidities                      │
│  ⚠ Age 62 years                                │
│                                                 │
│  Protective Factors:                            │
│  ✓ Good oxygen saturation                      │
│  ✓ Normal heart rate                           │
│  ✓ Adequate hemoglobin                         │
│                                                 │
│  Recommendations:                               │
│  1. Comprehensive multi-specialist eval        │
│  2. Full cardiac and pulmonary workup           │
│  3. Nephrology consultation mandatory           │
│  4. Extended post-operative monitoring          │
│  5. ICU standby arrangement                     │
│  [View All Recommendations]                     │
│                                                 │
│  [Download Report]  [Save]  [Share]            │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Components Used:**
- `SurgeryRiskForm` (input capture)
- `AlertPanel` (results display)

**Models Used:**
- **Surgery Risk Predictor Model** (Gradient Boosting)
  - Input: 14+ clinical parameters
  - Output: Risk level (Low/Medium/High) + percentage
  - Features: Demographic, cardiovascular, lab values, surgery type

---

### 2.5 Doctor Dashboard Page (`/doctor-dashboard`)

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│              DASHBOARD HEADER                           │
│  Welcome, Dr. John Smith | Today: Mar 23, 2026         │
│  Your Patients: 24 | Active Alerts: 3                  │
└─────────────────────────────────────────────────────────┘

┌──────────────────┬──────────────────┬──────────────────┐
│   SUMMARY CARDS  │                  │                  │
├──────────────────┼──────────────────┼──────────────────┤
│ Total Patients   │ Active Alerts    │ Diagnoses Today  │
│       24         │        3         │         8        │
│  [View All]      │ 🔴 Critical: 1   │  📊 [View]       │
│                  │ 🟡 Warning:  2   │                  │
└──────────────────┴──────────────────┴──────────────────┘

┌─────────────────────────────────────┐
│    ACTIVE ALERTS - PRIORITY LIST    │
├─────────────────────────────────────┤
│                                     │
│  🔴 CRITICAL (1)                    │
│  ├─ John Doe - Severe Pain 8.2/10   │
│  │  [Acknowledge] [View Patient]    │
│  │  Time: 10 min ago                │
│  │                                  │
│  🟡 WARNING (2)                     │
│  ├─ Sarah Lee - High Surg Risk 68%  │
│  │  [Acknowledge] [View Patient]    │
│  │  Time: 25 min ago                │
│  │                                  │
│  ├─ Mike Johnson - Voice Abnormality│
│  │  Parkinson's Detected (87%)       │
│  │  [Acknowledge] [View Patient]    │
│  │  Time: 45 min ago                │
│  │                                  │
│  [View All Alerts]                  │
│                                     │
└─────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│          PATIENT LIST (Sortable/Searchable)      │
├──────────────────────────────────────────────────┤
│ Name         │ Age │ Status      │ Last Check     │
├──────────────┼─────┼─────────────┼────────────────┤
│ John Doe     │ 45  │ 🔴 Critical │ 10 min ago     │
│ Sarah Lee    │ 62  │ 🟡 Warning  │ 25 min ago     │
│ Mike Johnson │ 38  │ 🟢 Normal   │ 2 hrs ago      │
│ Jane Smith   │ 52  │ 🟢 Normal   │ 4 hrs ago      │
│ [Search]     │     │ [Filter]    │ [Sort]         │
│ [View More]  │     │             │                │
│                                                   │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│     DIAGNOSES OVERVIEW (Today's Statistics)      │
├──────────────────────────────────────────────────┤
│                                                  │
│  Total Diagnoses: 8                              │
│  ├─ Pain Detection:    3  ███░░░░░               │
│  ├─ Voice Analysis:    2  ██░░░░░░               │
│  ├─ Surgery Risk:      2  ██░░░░░░               │
│  └─ Composite:         1  █░░░░░░░               │
│                                                  │
│  Distribution Chart                              │
│     [Pie Chart Visualization]                    │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Components Used:**
- `Navbar` (header)
- `AlertPanel` (alert display)
- `HealthMetrics` (summary cards)
- `PatientTable` (custom - patient list)

**Models/Features Used:**
- All pain detection results
- All voice analysis results
- All surgery risk assessments
- Emergency detection alerts
- Real-time monitoring

---

### 2.6 Patient Detail Page (`/doctor-patient-detail/:patientId`)

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ Patient: John Doe | Age: 45 | Status: 🔴 Critical  │
│ Medical ID: PAT_001 | Assigned Doctor: You          │
└─────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│              PATIENT VITAL SIGNS (Live)              │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Heart Rate:  78 bpm      │  O2 Saturation:  95%    │
│  ▭▭▭░░ Normal             │  ▭▭▭░░ Normal           │
│                           │                        │
│  Blood Pressure: 145/92   │  Temperature:  37.1°C   │
│  ▭▭▭░░ Elevated           │  ▭▭▭░░ Normal           │
│                                                      │
│  Last Updated: 2 min ago  [Refresh]                 │
│  [Trending Graph]  [24-Hr History]                  │
│                                                      │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│         MEDICAL HISTORY & CONDITIONS                │
├──────────────────────────────────────────────────────┤
│ Conditions:      Hypertension, Diabetes             │
│ Allergies:       Penicillin                         │
│ Current Meds:    Metformin 1000mg (2x daily)       │
│                  Amlodipine 5mg (daily)            │
│ Previous Surgery: Appendectomy (May 2010)           │
│ [Edit]  [Add Medication]  [Update History]          │
│                                                      │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│         RECENT DIAGNOSES & ALERTS                   │
├──────────────────────────────────────────────────────┤
│                                                      │
│  2026-03-23 10:32  🔴 CRITICAL                      │
│  └─ Pain Detection: 8.2/10 (Severe Pain)            │
│     Triggered: Facial landmark analysis              │
│     [View Details]  [Override]  [Create Note]       │
│                                                      │
│  2026-03-22 14:15  🟡 WARNING                       │
│  └─ Voice Analysis: Parkinson's (87% confidence)    │
│     Indicators: Vocal tremor, reduced loudness      │
│     [View Details]  [Refer Specialist]              │
│                                                      │
│  2026-03-21 09:30  🟡 WARNING                       │
│  └─ Surgery Risk: High Risk (68%)                   │
│     Factors: Age, kidney function, comorbidities    │
│     [View Details]  [Prepare Plan]                  │
│                                                      │
│  [View Complete History]                             │
│                                                      │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│         HEALTH TIMELINE (Trend Analysis)             │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Timeline visualization showing:                     │
│  ├─ Diagnosis history                               │
│  ├─ Alert progression                               │
│  ├─ Vital signs trends                              │
│  └─ Clinical interventions                          │
│                                                      │
│  [Zoom In]  [Date Range]  [Download]                │
│                                                      │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│         CLINICAL NOTES & INTERVENTIONS               │
├──────────────────────────────────────────────────────┤
│                                                      │
│  [+ Add New Note]                                   │
│                                                      │
│  2026-03-23 10:35  Dr. John Smith                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━             │
│  "Patient showing severe pain indicators from       │
│   facial analysis. Starting pain management         │
│   protocol. Monitoring vital signs closely."        │
│  [Edit]  [Delete]  [Flag]                           │
│                                                      │
│  2026-03-22 14:50  Dr. John Smith                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━             │
│  "Voice analysis suggests possible Parkinson's.     │
│   Referred to neurology for specialist evaluation." │
│  [Edit]  [Delete]  [Flag]                           │
│                                                      │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│              ACTION BUTTONS                          │
├──────────────────────────────────────────────────────┤
│                                                      │
│ [Prescribe]  [Refer Specialist]  [Emergency]        │
│ [Edit Patient]  [Print Report]  [Contact]           │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Components Used:**
- `DoctorPatientDetail` (main page)
- `HealthMetrics` (vital signs)
- `HealthTimeline` (timeline visualization)
- `AlertPanel` (recent diagnoses)

**Models/Features Used:**
- Pain detection results
- Voice analysis results
- Surgery risk data
- Emergency alerts
- Vital signs monitoring

---

### 2.7 Patient Dashboard Page (`/patient-dashboard`)

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│   Welcome, John Doe                                 │
│   Your Health Status: 🟡 Monitor Closely            │
│   Last Checkup: 2 hours ago                         │
└─────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│         YOUR VITAL SIGNS (Real-time)                │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ♥ Heart Rate: 78 bpm  │ O₂: 95%                    │
│  ▭▭▭░░ Normal          │ ▭▭▭░░ Good                 │
│                        │                           │
│  ⬅➜ BP: 145/92        │ 🌡 Temp: 37.1°C            │
│  ▭▭▭░░ Slightly High  │ ▭▭░░░ Normal               │
│                                                      │
│  [View Detailed Report]                             │
│                                                      │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│       YOUR HEALTH METRICS (Last 7 Days)              │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Heart Rate Trend       Blood Pressure Trend        │
│  [Line Chart]          [Line Chart]                 │
│                                                      │
│  O₂ Saturation Trend   Weight Trend                 │
│  [Line Chart]          [Line Chart]                 │
│                                                      │
│  [View More] [Download PDF]                         │
│                                                      │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│       YOUR NOTIFICATIONS & ALERTS                    │
├──────────────────────────────────────────────────────┤
│                                                      │
│  🔔 2026-03-23 10:32                                │
│  Your doctor noted: "Watch pain levels carefully"   │
│  [Acknowledge]  [View Note]                         │
│                                                      │
│  💊 2026-03-23 09:00                                │
│  Reminder: Take Metformin (2 hours ago)             │
│  [Acknowledge]  [Reschedule]                        │
│                                                      │
│  📋 2026-03-22 14:00                                │
│  Voice analysis completed. Doctor review pending.   │
│  [View Results]                                     │
│                                                      │
│  [View All Notifications]                           │
│                                                      │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│        YOUR HEALTH TIMELINE                          │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Mar 23 — Pain Detection (Score: 3.2)              │
│  Mar 22 — Voice Analysis (Normal)                   │
│  Mar 21 — Vital Signs Check (Good)                  │
│  Mar 20 — Medication Refill                         │
│  Mar 19 — Doctor Consultation                       │
│                                                      │
│  [View Complete History]  [Download Report]         │
│                                                      │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│         QUICK ACTION BUTTONS                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│ [Self Check-up]  [Message Doctor]  [Emergency]     │
│ [Medical Records]  [Prescriptions]  [Settings]    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Components Used:**
- `HealthMetrics` (vital signs cards)
- `HealthTimeline` (history timeline)
- `NotificationPanel` (alerts & notifications)

---

### 2.8 Login Page (`/login`)

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              AI SMART HOSPITAL                      │
│                                                     │
│              DOCTOR LOGIN                           │
│           ┌──────────────────────┐                 │
│           │                      │                 │
│           │  Email:              │                 │
│           │  [__________________]│                 │
│           │                      │                 │
│           │  Password:           │                 │
│           │  [__________________]│                 │
│           │                      │                 │
│           │  ☐ Remember Me       │                 │
│           │                      │                 │
│           │  [LOGIN BUTTON]      │                 │
│           │                      │                 │
│           │  [Forgot Password?]  │                 │
│           │                      │                 │
│           └──────────────────────┘                 │
│                                                     │
│           New user? [Register Here]                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Components Used:**
- `LoginPage` (authentication form)

---

## 3. Component Hierarchy Map

```
App
├── Navbar
│   ├── Logo
│   ├── Nav Links
│   ├── User Menu
│   └── Logout Button
│
├── Routes
│   ├── HomePage
│   │   ├── HeroSection
│   │   └── FeatureCard (×3)
│   │
│   ├── FacialPainDetection
│   │   ├── PainDetector
│   │   └── AlertPanel
│   │
│   ├── VoiceDiseasePage
│   │   ├── VoiceAnalyzer
│   │   └── AlertPanel
│   │
│   ├── SurgeryRiskPage
│   │   ├── SurgeryRiskForm
│   │   └── AlertPanel
│   │
│   ├── DoctorDashboard
│   │   ├── Dashboard Header
│   │   ├── Summary Cards
│   │   ├── AlertPanel
│   │   └── PatientTable
│   │
│   ├── DoctorPatientDetail
│   │   ├── HealthMetrics
│   │   ├── HealthTimeline
│   │   ├── AlertPanel
│   │   └── DoctorOverridePanel
│   │
│   ├── PatientDashboard
│   │   ├── HealthMetrics
│   │   ├── HealthTimeline
│   │   └── NotificationPanel
│   │
│   └── LoginPage
│
└── Footer
    ├── Links
    ├── Copyright
    └── Contact Info
```

---

## 4. Features to Models Mapping

| Feature | Page | Component | AI Model(s) | Input | Output |
|---------|------|-----------|------------|-------|--------|
| **Facial Pain Detection** | `/pain-detection` | PainDetector | Pain Detector (MediaPipe) | Real-time video/image | Pain score 0-10, facial landmarks |
| **Voice Analysis** | `/voice-analysis` | VoiceAnalyzer | Voice Analyzer (MFCC+RF) | 30+ sec audio | Disease classification, confidence |
| **Surgery Risk** | `/surgery-risk` | SurgeryRiskForm | Surgery Risk Predictor (GB) | 14+ clinical params | Risk level, percentage, factors |
| **Pain Alerts** | Dashboard, Patient Detail | AlertPanel | Pain Detector | Facial images | Alert level, severity |
| **Voice Alerts** | Dashboard, Patient Detail | AlertPanel | Voice Analyzer | Audio | Alert level, condition |
| **Risk Alerts** | Dashboard, Patient Detail | AlertPanel | Surgery Risk + Emergency Detector | Multiple sources | Critical/Warning/Info alerts |
| **Vital Signs** | Dashboard, Patient Detail | HealthMetrics | Smartwatch Validator | Smartwatch data | Normalized vital signs |
| **Emergency Detection** | Dashboard | AlertPanel | Emergency Detector | All modalities | Emergency level, action |
| **Health Timeline** | Patient Detail, Patient Dashboard | HealthTimeline | Historical Data | Database | Timeline visualization |
| **Composite Analysis** | Patient Detail | Multiple Panels | AI Decision Engine | All modalities | Composite risk score |

---

## 5. Color Scheme & Design

### Alert Severity Colors
```
🔴 CRITICAL  - Red (#EF4444)     - Immediate action required
🟡 WARNING   - Orange (#F59E0B)  - Monitor and prepare intervention
🔵 INFO      - Blue (#3B82F6)    - Informational, routine follow-up
🟢 NORMAL    - Green (#10B981)   - Stable, continue monitoring
```

### Component Styling
- **Framework:** Tailwind CSS 3
- **Responsive:** Mobile-first design
- **Typography:** Clear hierarchy with Tailwind defaults
- **Spacing:** Consistent padding/margins
- **Cards:** Rounded corners, subtle shadows
- **Forms:** Clean input fields with validation feedback

---

## 6. Data Flow Diagram

```
User Input (Image/Audio/Form)
    ↓
API Request to Backend
    ↓
Model Processing
├─ Pain Detection (MediaPipe)
├─ Voice Analysis (MFCC+RF)
└─ Surgery Risk (Gradient Boosting)
    ↓
Alert Generation
    ↓
WebSocket Event (Real-time update)
    ↓
Frontend Receives Alert
    ↓
Component Updates & Display
    ↓
Doctor Dashboard Updates
    ↓
Clinical Action Taken
```

---

## 7. User Flows

### Doctor Workflow
```
Login → Dashboard → View Alerts → Click Patient → Review Analysis 
→ Override Decision (optional) → Add Clinical Notes → Take Action
```

### Patient Workflow
```
Home → Select Test (Pain/Voice/Surgery) → Perform Analysis 
→ View Results → Receive Recommendations → Share with Doctor
```

### Emergency Workflow
```
Critical Condition Detected → Alert Generated → Doctor Notified 
→ WebSocket Real-time Update → Emergency Panel Displays 
→ Doctor Takes Immediate Action
```

---

## 8. Responsive Design Breakpoints

```
Mobile (< 640px):
└─ Single column layout
└─ Full-width components
└─ Stacked cards

Tablet (640px - 1024px):
└─ Two column layout
└─ Side-by-side forms & results

Desktop (> 1024px):
└─ Multi-column dashboard
└─ Optimal spacing
└─ All features visible
```

---

## 9. Key Interactions

### Pain Detection Interaction
```
User → Grant Camera → Capture Frame → Analysis → Pain Score Display 
→ Alert Triggered (if needed) → Doctor Notification
```

### Voice Analysis Interaction
```
User → Grant Microphone → Record Voice → Submit → Processing 
→ Disease Classification → Results Display → Doctor Review
```

### Surgery Risk Interaction
```
Doctor → Fill Form → Calculate Risk → View Assessment 
→ Risk Level Display → Recommendations → PDF Report
```

### Real-Time Monitoring
```
Patient Data → Model Analysis → Alert Generation → WebSocket Event 
→ Dashboard Update → Doctor Notification → Clinical Response
```
