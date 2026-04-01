# API Documentation

## Overview

AI Smart Hospital Assistant provides a comprehensive REST API for healthcare monitoring, diagnosis, and clinical decision support. This documentation covers all API endpoints, request/response formats, authentication, and usage examples.

**API Version:** 1.0.0  
**Base URL:** `http://localhost:5000/api/` (development)  
**Response Format:** JSON  
**Authentication:** JWT Bearer Token

---

## 1. Authentication

### 1.1 JWT Token Flow

```
User Login
  ↓
POST /api/auth/login (credentials)
  ↓
Server validates & generates JWT
  ↓
Returns {token, user_info}
  ↓
Client stores token in localStorage
  ↓
Include token in Authorization header for all requests
```

### 1.2 Authorization Header

```
Authorization: Bearer <jwt_token>

Example:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0...
```

### 1.3 Token Expiration

- **Expiration Time:** 24 hours (configurable)
- **Refresh:** Not implemented in v1.0 (auto-logout on expiration)
- **Invalid Token Response:** 401 Unauthorized

---

## 2. Authentication Endpoints

### 2.1 Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate doctor and obtain JWT token

**Request:**
```json
{
  "email": "doctor@hospital.com",
  "password": "securepassword123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "doc_123abc",
      "name": "Dr. John Smith",
      "email": "doctor@hospital.com",
      "role": "doctor",
      "specialization": "Cardiology",
      "hospital": "Central Hospital"
    }
  },
  "message": "Login successful",
  "timestamp": "2026-03-23T10:30:00Z"
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "error": "Invalid credentials",
  "code": "AUTH_INVALID_CREDENTIALS",
  "timestamp": "2026-03-23T10:30:00Z"
}
```

**Status Codes:**
- `200` - Login successful
- `400` - Invalid request format
- `401` - Invalid credentials
- `422` - Validation error

---

### 2.2 Register

**Endpoint:** `POST /api/auth/register`

**Description:** Register new doctor account

**Request:**
```json
{
  "name": "Dr. Jane Doe",
  "email": "jane.doe@hospital.com",
  "password": "securepassword123",
  "specialization": "Neurology",
  "hospital": "Central Hospital",
  "phone": "+1-555-0123",
  "licenseNumber": "MD123456"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "doc_456def",
      "name": "Dr. Jane Doe",
      "email": "jane.doe@hospital.com",
      "role": "doctor",
      "specialization": "Neurology",
      "status": "pending_verification"
    }
  },
  "message": "Registration successful. Verification email sent.",
  "timestamp": "2026-03-23T10:30:00Z"
}
```

**Status Codes:**
- `201` - Registration successful
- `400` - Invalid request
- `409` - Email already exists
- `422` - Validation error

---

### 2.3 Logout

**Endpoint:** `POST /api/auth/logout`

**Description:** Invalidate current JWT token

**Headers:** `Authorization: Bearer <token>`

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Logout successful",
  "timestamp": "2026-03-23T10:30:00Z"
}
```

---

### 2.4 Get Current User

**Endpoint:** `GET /api/auth/me`

**Description:** Get current authenticated user info

**Headers:** `Authorization: Bearer <token>`

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": "doc_123abc",
    "name": "Dr. John Smith",
    "email": "doctor@hospital.com",
    "role": "doctor",
    "specialization": "Cardiology",
    "hospital": "Central Hospital",
    "assigned_patients": 24,
    "active_alerts": 3
  },
  "timestamp": "2026-03-23T10:30:00Z"
}
```

---

## 3. Diagnosis Endpoints

### 3.1 Pain Detection Analysis

**Endpoint:** `POST /api/diagnosis/pain-detection`

**Description:** Analyze facial pain from image/video

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "patient_id": "pat_999xyz",
  "image_data": "base64_encoded_image_or_video_frame",
  "image_format": "jpeg",
  "notes": "Patient complains of chest pain"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "diagnosis_id": "diag_001",
    "patient_id": "pat_999xyz",
    "type": "pain_detection",
    "pain_score": 6.8,
    "pain_level": "Severe Pain",
    "confidence": 0.87,
    "color": "#DC2626",
    "description": "Severe pain expression detected",
    "breakdown": {
      "brow_tension": 0.82,
      "eye_narrowing": 0.75,
      "mouth_tension": 0.91,
      "nose_wrinkling": 0.45,
      "asymmetry": 0.35
    },
    "indicators": [
      "Eyebrows lowered and drawn together",
      "Eyes narrowed and squeezed",
      "Mouth stretched and tensed",
      "Facial asymmetry detected"
    ],
    "recommendations": [
      "Immediate pain assessment",
      "Consider pain management intervention",
      "Monitor vital signs",
      "Prepare for possible intervention"
    ],
    "alert_triggered": true,
    "alert_level": "WARNING",
    "processing_time_ms": 245
  },
  "message": "Pain analysis completed",
  "timestamp": "2026-03-23T10:30:00Z"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Invalid image format",
  "code": "INVALID_IMAGE",
  "timestamp": "2026-03-23T10:30:00Z"
}
```

**Status Codes:**
- `200` - Analysis successful
- `400` - Invalid image/format
- `401` - Unauthorized
- `404` - Patient not found
- `422` - Missing required fields
- `503` - Model service unavailable

---

### 3.2 Voice Analysis

**Endpoint:** `POST /api/diagnosis/voice-analysis`

**Description:** Analyze voice recording for disease detection

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "patient_id": "pat_999xyz",
  "audio_data": "base64_encoded_audio",
  "audio_format": "wav",
  "duration_seconds": 45,
  "notes": "Patient reports difficulty speaking"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "diagnosis_id": "diag_002",
    "patient_id": "pat_999xyz",
    "type": "voice_analysis",
    "primary_condition": "parkinsons",
    "condition_name": "Parkinson's Disease",
    "confidence": 0.87,
    "probabilities": {
      "parkinsons": 0.87,
      "respiratory": 0.08,
      "depression": 0.04,
      "healthy": 0.01
    },
    "indicators": [
      "Vocal tremor detected",
      "Reduced loudness observed",
      "Monotone pitch pattern",
      "Breathy voice quality"
    ],
    "features_extracted": {
      "mfcc_mean": "[-500.23, -120.45, ...]",
      "spectral_centroid": 3250.5,
      "pitch_mean": 145.8,
      "speaking_rate": 120  // words per minute
    },
    "recommendations": [
      "Refer to neurology specialist",
      "Schedule comprehensive assessment",
      "Monitor speech symptoms",
      "Consider speech therapy"
    ],
    "alert_triggered": true,
    "alert_level": "INFO",
    "processing_time_ms": 3240
  },
  "message": "Voice analysis completed",
  "timestamp": "2026-03-23T10:30:00Z"
}
```

**Status Codes:**
- `200` - Analysis successful
- `400` - Invalid audio format
- `401` - Unauthorized
- `404` - Patient not found
- `413` - Audio file too large
- `422` - Missing audio data

---

### 3.3 Surgery Risk Assessment

**Endpoint:** `POST /api/diagnosis/surgery-risk`

**Description:** Predict surgical risk based on patient parameters

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "patient_id": "pat_999xyz",
  "age": 62,
  "gender": "M",
  "bmi": 28.5,
  "blood_pressure_systolic": 145,
  "blood_pressure_diastolic": 92,
  "heart_rate": 78,
  "oxygen_saturation": 95,
  "respiratory_rate": 18,
  "hemoglobin": 12.5,
  "platelet_count": 250,
  "blood_glucose": 145,
  "creatinine": 1.2,
  "albumin": 3.8,
  "bilirubin": 0.9,
  "wbc": 7.5,
  "surgery_type": "cardiac",
  "surgery_urgency": "elective",
  "anesthesia_type": "general",
  "estimated_duration_minutes": 180,
  "comorbidities": ["hypertension", "diabetes"],
  "notes": "Patient has stable angina"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "diagnosis_id": "diag_003",
    "patient_id": "pat_999xyz",
    "type": "surgery_risk",
    "risk_score": 0.68,
    "risk_level": "High Risk",
    "percentage_range": "65-100%",
    "percentage": "68%",
    "confidence": 0.89,
    "feature_importance": {
      "age": 0.18,
      "kidney_risk": 0.16,
      "comorbidity_count": 0.14,
      "blood_glucose": 0.12,
      "creatinine": 0.11,
      "anesthesia_type": 0.08,
      "surgery_type": 0.07,
      "blood_pressure": 0.06,
      "hemoglobin": 0.05,
      "heart_rate": 0.04
    },
    "risk_factors": [
      "Age 62 years (significant factor)",
      "Elevated glucose level (145 mg/dL)",
      "Reduced kidney function (eGFR: 58)",
      "Multiple comorbidities (diabetes, hypertension)",
      "Elevated blood pressure (145/92 mmHg)"
    ],
    "protective_factors": [
      "Good oxygen saturation (95%)",
      "Normal heart rate (78 bpm)",
      "Adequate hemoglobin (12.5 g/dL)"
    ],
    "recommendations": [
      "Comprehensive multi-specialist evaluation",
      "Full cardiac and pulmonary workup",
      "Nephrology consultation mandatory",
      "Endocrinology evaluation for diabetes control",
      "Extended post-operative intensive care",
      "ICU standby arrangement",
      "Detailed informed consent discussion regarding risks"
    ],
    "comparison": {
      "patient_score": 0.68,
      "baseline_same_age": 0.42,
      "baseline_same_surgery": 0.55,
      "interpretation": "Higher than baseline for age and surgery type"
    },
    "alert_triggered": true,
    "alert_level": "CRITICAL"
  },
  "message": "Surgery risk assessment completed",
  "timestamp": "2026-03-23T10:30:00Z"
}
```

**Status Codes:**
- `200` - Assessment successful
- `400` - Invalid parameters
- `401` - Unauthorized
- `404` - Patient not found
- `422` - Missing required fields

---

### 3.4 Composite Multi-Modal Analysis

**Endpoint:** `POST /api/diagnosis/composite-analysis`

**Description:** Combined analysis of pain, voice, surgery risk, and vital signs

**Request:**
```json
{
  "patient_id": "pat_999xyz",
  "pain_data": {
    "image_data": "base64_image",
    "notes": "Patient appearance indicates discomfort"
  },
  "voice_data": {
    "audio_data": "base64_audio",
    "duration_seconds": 45
  },
  "surgery_data": {
    "age": 62,
    "gender": "M",
    "bmi": 28.5,
    // ... other surgery risk params
  },
  "vital_signs": {
    "heart_rate": 78,
    "blood_pressure": "145/92",
    "oxygen_saturation": 95,
    "temperature": 37.2
  }
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "analysis_id": "comp_001",
    "patient_id": "pat_999xyz",
    "timestamp": "2026-03-23T10:30:00Z",
    "modules_analyzed": 4,
    "composite_risk_score": 6.2,
    "composite_alert_level": "WARNING",
    "risk_breakdown": {
      "pain_detection": {
        "score": 6.8,
        "level": "Severe Pain",
        "weight": 0.25
      },
      "voice_analysis": {
        "score": 5.2,
        "condition": "Respiratory symptoms",
        "weight": 0.20
      },
      "surgery_risk": {
        "score": 6.8,
        "level": "High Risk",
        "weight": 0.35
      },
      "vital_signs": {
        "score": 4.5,
        "level": "Abnormal readings",
        "weight": 0.20
      }
    },
    "primary_concerns": [
      "Severe pain expression detected",
      "High surgical risk due to comorbidities and age",
      "Abnormal vital signs requiring intervention"
    ],
    "recommendations": [
      "Immediate pain management intervention",
      "Comprehensive pre-operative evaluation",
      "Specialist consultations (cardiology, nephrology)",
      "Extended post-operative monitoring",
      "Consider deferring surgery if non-urgent"
    ],
    "alerts": [
      {
        "id": "alert_001",
        "level": "CRITICAL",
        "source": "pain_detection",
        "message": "Severe pain detected (6.8/10)",
        "action_required": "Immediate intervention"
      },
      {
        "id": "alert_002",
        "level": "WARNING",
        "source": "surgery_risk",
        "message": "High surgical risk (68%)",
        "action_required": "Enhanced pre-op evaluation"
      }
    ],
    "processing_time_ms": 5400
  },
  "message": "Composite analysis completed",
  "timestamp": "2026-03-23T10:30:00Z"
}
```

---

## 4. Patient Management Endpoints

### 4.1 List All Patients

**Endpoint:** `GET /api/patients`

**Description:** Retrieve list of patients (paginated)

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
```
?page=1&limit=20&sort=-created_at&status=active
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "patients": [
      {
        "id": "pat_001",
        "name": "John Doe",
        "age": 45,
        "gender": "M",
        "email": "john@example.com",
        "phone": "+1-555-0100",
        "assigned_doctor": "doc_123abc",
        "status": "active",
        "last_checkup": "2026-03-21T14:30:00Z",
        "active_alerts": 1,
        "conditions": ["hypertension", "diabetes"],
        "created_at": "2025-06-15T08:00:00Z"
      },
      // ... more patients
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "pages": 8
    }
  },
  "timestamp": "2026-03-23T10:30:00Z"
}
```

---

### 4.2 Get Patient Details

**Endpoint:** `GET /api/patients/{patient_id}`

**Description:** Retrieve complete patient information

**Headers:** `Authorization: Bearer <token>`

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": "pat_001",
    "name": "John Doe",
    "age": 45,
    "gender": "M",
    "email": "john@example.com",
    "phone": "+1-555-0100",
    "assigned_doctor": {
      "id": "doc_123abc",
      "name": "Dr. John Smith"
    },
    "medical_history": {
      "conditions": ["hypertension", "diabetes"],
      "allergies": ["Penicillin"],
      "medications": [
        {
          "name": "Metformin",
          "dosage": "1000mg",
          "frequency": "twice daily"
        }
      ],
      "surgeries": [
        {
          "type": "Appendectomy",
          "date": "2010-05-15",
          "outcome": "successful"
        }
      ]
    },
    "vital_signs": {
      "heart_rate": 78,
      "blood_pressure": "130/85",
      "oxygen_saturation": 98,
      "temperature": 37.1,
      "last_updated": "2026-03-23T10:15:00Z"
    },
    "recent_diagnoses": [
      {
        "id": "diag_001",
        "type": "pain_detection",
        "score": 3.2,
        "date": "2026-03-21T14:30:00Z",
        "alert_level": "INFO"
      }
    ],
    "created_at": "2025-06-15T08:00:00Z",
    "updated_at": "2026-03-23T10:15:00Z"
  },
  "timestamp": "2026-03-23T10:30:00Z"
}
```

---

### 4.3 Create Patient

**Endpoint:** `POST /api/patients`

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "name": "Jane Smith",
  "age": 38,
  "gender": "F",
  "email": "jane.smith@example.com",
  "phone": "+1-555-0123",
  "emergency_contact": {
    "name": "Robert Smith",
    "relationship": "spouse",
    "phone": "+1-555-0124"
  },
  "medical_history": {
    "conditions": ["asthma"],
    "allergies": ["Sulfa drugs"],
    "medications": [
      {
        "name": "Albuterol",
        "dosage": "2 puffs",
        "frequency": "as needed"
      }
    ]
  }
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "data": {
    "id": "pat_999xyz",
    "name": "Jane Smith",
    "age": 38,
    "gender": "F",
    "email": "jane.smith@example.com",
    "status": "active",
    "created_at": "2026-03-23T10:30:00Z"
  },
  "message": "Patient created successfully",
  "timestamp": "2026-03-23T10:30:00Z"
}
```

**Status Codes:**
- `201` - Patient created
- `400` - Invalid data
- `409` - Patient already exists
- `422` - Validation error

---

### 4.4 Update Patient

**Endpoint:** `PUT /api/patients/{patient_id}`

**Headers:** `Authorization: Bearer <token>`

**Request:** (partial update)
```json
{
  "phone": "+1-555-0125",
  "medical_history": {
    "conditions": ["asthma", "anxiety"]
  }
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": "pat_999xyz",
    "name": "Jane Smith",
    "updated_fields": ["phone", "medical_history"],
    "updated_at": "2026-03-23T10:35:00Z"
  },
  "message": "Patient updated successfully",
  "timestamp": "2026-03-23T10:35:00Z"
}
```

---

### 4.5 Get Patient History

**Endpoint:** `GET /api/patients/{patient_id}/history`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
```
?type=diagnosis&start_date=2026-01-01&end_date=2026-03-23&limit=50
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "patient_id": "pat_999xyz",
    "history_items": [
      {
        "id": "hist_001",
        "type": "diagnosis",
        "diagnosis_type": "pain_detection",
        "score": 4.2,
        "level": "WARNING",
        "timestamp": "2026-03-22T09:15:00Z",
        "notes": "Patient reported back pain"
      },
      {
        "id": "hist_002",
        "type": "vital_signs_update",
        "data": {
          "heart_rate": 82,
          "blood_pressure": "135/88"
        },
        "timestamp": "2026-03-21T14:30:00Z"
      }
    ],
    "total_items": 145,
    "date_range": {
      "start": "2026-01-01",
      "end": "2026-03-23"
    }
  },
  "timestamp": "2026-03-23T10:30:00Z"
}
```

---

## 5. Alert Management Endpoints

### 5.1 Get All Alerts

**Endpoint:** `GET /api/alerts`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
```
?severity=critical,warning&status=active&patient_id=pat_999xyz&limit=50
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "alerts": [
      {
        "id": "alert_001",
        "patient_id": "pat_999xyz",
        "severity": "CRITICAL",
        "title": "Severe pain detected",
        "message": "Pain score: 8.2/10",
        "source": "pain_detection",
        "triggered_by": {
          "diagnosis_id": "diag_001",
          "actual_value": 8.2,
          "threshold": 7.0
        },
        "status": "active",
        "assigned_doctor": "doc_123abc",
        "created_at": "2026-03-23T10:20:00Z",
        "acknowledged_at": null,
        "resolved_at": null,
        "priority": 1
      }
    ],
    "summary": {
      "critical": 2,
      "warning": 5,
      "info": 12,
      "total_active": 19
    }
  },
  "timestamp": "2026-03-23T10:30:00Z"
}
```

---

### 5.2 Acknowledge Alert

**Endpoint:** `PUT /api/alerts/{alert_id}/acknowledge`

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "notes": "Reviewing with patient now"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": "alert_001",
    "status": "acknowledged",
    "acknowledged_by": "doc_123abc",
    "acknowledged_at": "2026-03-23T10:31:00Z"
  },
  "timestamp": "2026-03-23T10:31:00Z"
}
```

---

### 5.3 Resolve Alert

**Endpoint:** `PUT /api/alerts/{alert_id}/resolve`

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "resolution": "Prescribed pain medication",
  "follow_up_required": false
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": "alert_001",
    "status": "resolved",
    "resolved_by": "doc_123abc",
    "resolved_at": "2026-03-23T10:35:00Z",
    "resolution_time_minutes": 15
  },
  "timestamp": "2026-03-23T10:35:00Z"
}
```

---

## 6. Dashboard Endpoints

### 6.1 Dashboard Overview

**Endpoint:** `GET /api/dashboard/overview`

**Headers:** `Authorization: Bearer <token>`

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "doctor": {
      "id": "doc_123abc",
      "name": "Dr. John Smith"
    },
    "summary": {
      "total_patients": 24,
      "active_alerts": 3,
      "critical_alerts": 1,
      "warning_alerts": 2,
      "today_diagnoses": 8,
      "avg_response_time_minutes": 15
    },
    "alerts_by_severity": {
      "critical": 1,
      "warning": 2,
      "info": 8,
      "normal": 13
    },
    "diagnoses_today": {
      "pain_detection": 3,
      "voice_analysis": 2,
      "surgery_risk": 2,
      "composite": 1
    },
    "top_patients_at_risk": [
      {
        "id": "pat_001",
        "name": "John Doe",
        "risk_score": 7.2,
        "primary_concern": "High surgical risk",
        "last_update": "2026-03-23T09:20:00Z"
      }
    ]
  },
  "timestamp": "2026-03-23T10:30:00Z"
}
```

---

### 6.2 Active Alerts

**Endpoint:** `GET /api/dashboard/alerts`

**Headers:** `Authorization: Bearer <token>`

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "active_alerts": [
      {
        "id": "alert_001",
        "patient": {
          "id": "pat_001",
          "name": "John Doe"
        },
        "severity": "CRITICAL",
        "message": "Severe pain detected (8.2/10)",
        "created_at": "2026-03-23T10:20:00Z",
        "age_minutes": 10
      }
    ],
    "total": 3
  },
  "timestamp": "2026-03-23T10:30:00Z"
}
```

---

## 7. Real-Time Events (Socket.IO)

### 7.1 Event Types

**Server → Client:**

```javascript
// New alert notification
socket.on('alert:new', (data) => {
  console.log('New alert:', data);
  // {
  //   alert_id: 'alert_001',
  //   patient_id: 'pat_999xyz',
  //   severity: 'CRITICAL',
  //   message: '...'
  // }
});

// Patient status updated
socket.on('patient:updated', (data) => {
  console.log('Patient updated:', data);
  // {
  //   patient_id: 'pat_999xyz',
  //   vital_signs: {...},
  //   timestamp: '...'
  // }
});

// Emergency triggered
socket.on('emergency:triggered', (data) => {
  console.log('Emergency:', data);
  // {
  //   patient_id: 'pat_999xyz',
  //   severity: 'CRITICAL',
  //   action: '...'
  // }
});
```

**Client → Server:**

```javascript
// Subscribe to patient updates
socket.emit('subscribe:patient', {
  patient_id: 'pat_999xyz'
});

// Acknowledge alert
socket.emit('alert:acknowledge', {
  alert_id: 'alert_001'
});
```

---

## 8. Error Handling

### 8.1 Standard Error Response

```json
{
  "success": false,
  "error": "Error description",
  "code": "ERROR_CODE",
  "details": {
    "field": "error details"
  },
  "timestamp": "2026-03-23T10:30:00Z"
}
```

### 8.2 HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| `200` | Success | Request completed successfully |
| `201` | Created | Resource created successfully |
| `400` | Bad Request | Invalid parameters/format |
| `401` | Unauthorized | Missing/invalid token |
| `403` | Forbidden | Permission denied |
| `404` | Not Found | Resource doesn't exist |
| `409` | Conflict | Resource already exists |
| `422` | Validation Error | Input validation failed |
| `500` | Server Error | Internal server error |
| `503` | Service Unavailable | Service temporarily down |

### 8.3 Common Error Codes

```
AUTH_INVALID_CREDENTIALS - Login failed
AUTH_EXPIRED_TOKEN - Token expired
AUTH_MISSING_TOKEN - Authorization header missing
INVALID_IMAGE - Image format/data invalid
INVALID_AUDIO - Audio format/data invalid
PATIENT_NOT_FOUND - Patient ID doesn't exist
MODEL_ERROR - ML model processing failed
DATABASE_ERROR - Database operation failed
```

---

## 9. Rate Limiting

- **Limit:** 100 requests per minute per user
- **Header:** `X-RateLimit-Remaining`
- **Error:** 429 Too Many Requests

---

## 10. Usage Examples

### Example 1: Complete Pain Analysis Workflow

```javascript
// 1. Login
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    email: 'doctor@hospital.com',
    password: 'password123'
  })
});

const {data: {token}} = await loginResponse.json();

// 2. Capture face image & analyze pain
const painResponse = await fetch('/api/diagnosis/pain-detection', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    patient_id: 'pat_999xyz',
    image_data: base64Image,
    image_format: 'jpeg'
  })
});

const painResult = await painResponse.json();

// 3. Handle alert if triggered
if (painResult.data.alert_triggered) {
  const alertLevel = painResult.data.alert_level;
  console.log(`Alert triggered: ${alertLevel}`);
}
```

### Example 2: Surgery Risk Assessment

```javascript
const surgeryResponse = await fetch('/api/diagnosis/surgery-risk', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    patient_id: 'pat_999xyz',
    age: 62,
    gender: 'M',
    bmi: 28.5,
    blood_pressure_systolic: 145,
    blood_pressure_diastolic: 92,
    heart_rate: 78,
    oxygen_saturation: 95,
    hemoglobin: 12.5,
    blood_glucose: 145,
    creatinine: 1.2,
    surgery_type: 'cardiac',
    comorbidities: ['hypertension', 'diabetes']
  })
});

const result = await surgeryResponse.json();
console.log(`Risk Level: ${result.data.risk_level}`);
console.log(`Recommendations:`, result.data.recommendations);
```

---

## Document Version History
- **v1.0.0** (2026-03-23): Complete API documentation
