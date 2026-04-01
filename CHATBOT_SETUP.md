# AI-Powered Chatbot Setup Guide

## Overview
Your chatbot has been upgraded to use **Hugging Face API** with the **Mistral-7B-Instruct-v0.2** model for dynamic, context-aware AI responses.

## Key Features

✨ **Real AI Responses** - Uses Mistral-7B-Instruct model instead of static responses
📚 **Context-Aware** - Maintains conversation history for coherent follow-up responses  
⏱️ **Typing Effect** - Animated character-by-character typing for natural feel
🏥 **Medical Safety** - Built-in guardrails preventing diagnosis and medication prescriptions
🆘 **Emergency Detection** - Special handling for critical health situations

## Setup Instructions

### 1. Get Hugging Face API Key

1. Go to https://huggingface.co/settings/tokens
2. Create a new **User Access Token** (read access is sufficient)
3. Copy your token (starts with `hf_`)

### 2. Set Environment Variable

**On Windows (PowerShell):**
```powershell
$env:HUGGINGFACE_API_KEY = "your_token_here"
```

**On Windows (Command Prompt):**
```cmd
set HUGGINGFACE_API_KEY=your_token_here
```

**On Mac/Linux:**
```bash
export HUGGINGFACE_API_KEY="your_token_here"
```

**Or create a `.env` file in the backend directory:**
```
HUGGINGFACE_API_KEY=your_token_here
```

### 3. Install Dependencies

```bash
cd backend
pip install python-dotenv requests huggingface-hub
```

Or use the updated requirements.txt:
```bash
pip install -r requirements.txt
```

### 4. Start the Backend Server

```bash
python app.py
```

Or if using Flask development server:
```bash
python -m flask run
```

### 5. Test the Chatbot

1. Open your app in the browser
2. Click the floating chat button (bottom-right)
3. Send a message like "I have a headache" or "How can I improve my health?"
4. Watch the AI respond with dynamic, context-aware answers

## How It Works

### Request Flow

```
User Message
    ↓
Frontend (AIChatbot.jsx)
    ↓
Backend (/api/chatbot/chat)
    ↓
Hugging Face API (Mistral-7B-Instruct-v0.2)
    ↓
Response with Typing Animation
```

### Response Structure

The API returns:
```json
{
  "success": true,
  "response": {
    "message": "AI generated response...",
    "type": "ai_response",
    "suggestions": ["Follow-up suggestion 1", "Follow-up suggestion 2"],
    "follow_up_questions": []
  },
  "timestamp": "2024-01-15T10:30:00"
}
```

### Conversation History

- Last 10 messages are used for context
- Full conversation stored up to 50 messages per session
- Helps AI understand the conversation flow

## Features in Detail

### 1. Context-Aware Responses
The chatbot includes:
- Patient vitals (if available)
- Medical conditions
- Current medications
- Previous conversation history

### 2. Medical Safety Guardrails
- ❌ **Never diagnoses** - Always suggests consulting a doctor
- ❌ **Never prescribes** - Refers to healthcare providers
- ⚠️ **Emergency alerts** - Immediate 911 recommendations
- ℹ️ **Helpful information** - General health guidance only

### 3. Typing Animation
- Character-by-character reveal (20ms per character)
- ~50 characters per second reveal rate
- Creates ChatGPT-like experience
- Toggles off automatically when typing completes

### 4. Smart Suggestions
Context-aware quick-reply buttons:
- For symptom questions: "Tell me more", "Book appointment"
- For health tips: "Health tips", "Nutrition advice"
- For appointments: "Book now", "View available"

## Troubleshooting

### Issue: "API Key not set" or "Connection refused"

**Solution:**
1. Make sure your API key is set in environment variables
2. Verify with: `echo $HUGGINGFACE_API_KEY` (Mac/Linux) or `echo %HUGGINGFACE_API_KEY%` (Windows)
3. Restart your backend server after setting the key

### Issue: Slow Responses

**Possible causes:**
- Hugging Face API is overloaded (may take 30+ seconds)
- Network connection issue
- Model loading time on first request

**Solution:**
- Hugging Face free tier can be slow; consider upgrading for faster inference
- Check your internet connection
- First request may be slower as model loads

### Issue: Empty Responses

**Solution:**
1. Check the backend logs for errors
2. Verify your API key has "read" permissions
3. Make sure you're using the correct API key format (starts with `hf_`)

### Issue: Chatbot not appearing

**Solution:**
1. Make sure the API is running: `http://localhost:5000/api/chatbot/chat` should be accessible
2. Check browser console for errors (F12 → Console tab)
3. Clear browser cache and reload

## Customization

### Adjust Typing Speed

In `frontend/src/components/AIChatbot.jsx`, change the interval in the typing effect:

```javascript
}, 20); // 20ms = faster | 50ms = slower
```

### Modify Medical Safety Instructions

In `backend/utils/huggingface_ai.py`, edit the `MEDICAL_SAFETY_PROMPT`:

```python
MEDICAL_SAFETY_PROMPT = """Your custom instructions here..."""
```

### Change Response Temperature (Creativity)

In `backend/utils/huggingface_ai.py`, adjust the temperature:

```python
"temperature": 0.7,  # 0.0 = factual | 1.0 = creative
```

### Increase Context Window

Default is last 10 messages. To increase, modify in `huggingface_ai.py`:

```python
for msg in conversation_history[-20:]:  # Changed from 10 to 20
```

## API Usage

The Hugging Face API has rate limits on the free tier:
- Default: ~1 request per second for free users
- Consider paid tier for production use: https://huggingface.co/pricing

## File Structure

```
backend/
├── routes/
│   └── chatbot.py          # Updated with Hugging Face integration
├── utils/
│   └── huggingface_ai.py   # NEW - AI response generation
└── requirements.txt         # Updated with new dependencies

frontend/
└── src/components/
    └── AIChatbot.jsx       # Updated with typing effect
```

## What Changed from Original

| Feature | Before | After |
|---------|--------|-------|
| Responses | Static/Hardcoded | AI-Generated (Mistral-7B) |
| Conversation | Single reply | Full history context |
| Typing | Instant | Animated character-reveal |
| Safety | Built-in rules | Embedded in AI prompt |
| Flexibility | Limited patterns | Natural language understanding |

## Next Steps

1. ✅ Set up your Hugging Face API key
2. ✅ Install dependencies
3. ✅ Restart the backend server
4. ✅ Test with various health questions
5. 📊 Monitor usage at https://huggingface.co/account/billing/overview

## Support

- **Hugging Face Docs**: https://huggingface.co/docs/hub/api
- **Model Card**: https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2
- **API Status**: https://huggingface.co/inference-api

## Important Notes

⚠️ **Security**: Never commit your API key to git. Use environment variables or `.env` files (add to `.gitignore`)

⚠️ **Medical Disclaimer**: This AI is for educational/support purposes only. Always direct users to consult with healthcare professionals for serious concerns.

⚠️ **API Costs**: Free tier has rate limits. Monitor usage to avoid unexpected charges on paid tier.
