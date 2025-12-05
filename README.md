# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## AI Features Setup

This project includes AI-powered features that require API keys:

### 1. AI Mentor Setup

The AI mentor feature uses Google's Gemini AI through Genkit. To enable it:

1. Get a Google AI API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a `.env.local` file in the project root
3. Add your API key:

```bash
GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here
```

### 2. Google Maps Setup (Optional)

For the map feature, you'll need a Google Maps API key:

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Add it to your `.env.local` file:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 3. Running the Development Server

```bash
npm run dev
```

The AI mentor will be available at `/mentor` once the API key is configured.
