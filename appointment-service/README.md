# Appointment Service (Node.js + Express + MongoDB)

Production-ready appointment booking service for Smart Hospital.

## Features
- Search doctors by specialization and location
- Filter hospitals by city
- Filter doctors by hospital and specialization
- Fetch available time slots per doctor/date
- Book appointment with duplicate-slot prevention
- Strong validation (required fields, no past booking)
- Seed script with provided hospital/doctor dataset

## Setup
1. Copy `.env.example` to `.env`
2. Install dependencies:
   - `npm install`
3. Seed initial data:
   - `npm run seed`
4. Start service:
   - `npm run dev`

Default server: `http://127.0.0.1:5001`

## Low-CPU Local Mode (No MongoDB Needed)
If MongoDB is not running, the service automatically falls back to a lightweight local JSON store.

- Store file: `appointment-service/data/local-db.json`
- API behavior remains the same
- Seed data is preloaded automatically in local mode

This mode is designed for quick local usage with minimal CPU and memory overhead.

## MongoDB Collections
### Hospitals
- `_id`
- `name`
- `location`

### Doctors
- `_id`
- `name`
- `specialization`
- `hospital_id`

### Appointments
- `_id`
- `patient_name`
- `doctor_id`
- `hospital_id`
- `specialization`
- `date`
- `time`

Indexes:
- `appointments(doctor_id, date, time)` unique
- `appointments(doctor_id, date)`
- `doctors(hospital_id, specialization)`
- `hospitals(name, location)` unique

## API Routes
Base URL: `/api`

### 1. GET `/api/specializations`
Response:
```json
{
  "success": true,
  "data": ["Cardiology", "General Medicine", "Gynecology", "Neurology"]
}
```

### 2. GET `/api/hospitals?location=Visakhapatnam`
Response:
```json
{
  "success": true,
  "data": [
    {
      "_id": "66f...",
      "name": "Apollo Hospitals Visakhapatnam",
      "location": "Visakhapatnam"
    }
  ]
}
```

### 3. GET `/api/doctors?hospital_id=<id>&specialization=Neurology`
Response:
```json
{
  "success": true,
  "data": [
    {
      "_id": "66f...",
      "name": "Dr. P. Suresh",
      "specialization": "Neurology",
      "hospital_id": {
        "_id": "66f...",
        "name": "Apollo Hospitals Visakhapatnam",
        "location": "Visakhapatnam"
      }
    }
  ]
}
```

### 4. GET `/api/slots?doctor_id=<id>&date=2026-03-30`
Response:
```json
{
  "success": true,
  "data": {
    "date": "2026-03-30",
    "doctor_id": "66f...",
    "available_slots": ["09:00", "09:30", "10:00"],
    "booked_slots": ["11:00", "14:30"]
  }
}
```

### 5. POST `/api/appointments`
Request:
```json
{
  "patient_name": "Balaswamy",
  "doctor_id": "66f...",
  "hospital_id": "66f...",
  "specialization": "Neurology",
  "date": "2026-03-30",
  "time": "10:30"
}
```

Success Response:
```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "data": {
    "_id": "66f...",
    "patient_name": "Balaswamy",
    "doctor_id": "66f...",
    "hospital_id": "66f...",
    "specialization": "Neurology",
    "date": "2026-03-30",
    "time": "10:30"
  }
}
```

Duplicate Slot Response:
```json
{
  "success": false,
  "message": "Selected slot is already booked"
}
```
