import { Language, UserInfo } from './types';

export const UI_TEXT: Record<Language, Record<string, string>> = {
  en: {
    title: 'AI Healthcare Assistant',
    langToggle: 'தமிழ்',
    // User Info Form
    userInfoTitle: 'Tell us about the patient',
    userInfoDescription: 'This information helps us provide a more accurate assessment.',
    nameLabel: 'Full Name',
    namePlaceholder: 'e.g., John Doe',
    ageLabel: 'Age',
    agePlaceholder: 'e.g., 35',
    genderLabel: 'Gender',
    genderMale: 'Male',
    genderFemale: 'Female',
    genderOther: 'Other',
    pastHistoryLabel: 'Past Medical History (Optional)',
    pastHistoryPlaceholder: 'e.g., Asthma, Hypertension, Diabetes...',
    nextButton: 'Next',
    // Symptom Input
    symptomTitle: 'Describe Your Symptoms',
    symptomDescription: 'Please be as detailed as possible. You can type, use your voice, or provide a visual by uploading a photo or recording a short video.',
    symptomPlaceholder: 'e.g., I have a sharp headache, a persistent sore throat, and a slight fever...',
    micButton: 'Use Microphone',
    micListening: 'Listening...',
    cameraButton: 'Upload Photo',
    videoButton: 'Record Video',
    analyzeButton: 'Analyze Symptoms',
    // Loader
    loaderText: 'Our AI is analyzing your symptoms. This may take a moment...',
    // Analysis Result
    resultTitle: 'Analysis Result',
    assessmentLabel: 'AI Assessment',
    suggestionsLabel: 'Suggestions',
    criticalAlertTitle: 'Critical Alert!',
    consultDoctor: 'Consult a Doctor Now',
    scheduleConsultation: 'Schedule in Calendar',
    readAloud: 'Read Aloud',
    startOver: 'Start Over',
    backToHistory: 'Back to History',
    // Error
    errorTitle: 'An Error Occurred',
    // Footer
    footerDisclaimer: 'Disclaimer: This AI assistant is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.',
    // History
    viewHistory: 'View History',
    pastAnalysesTitle: 'Past Analyses',
    noPastAnalyses: 'You have no saved analyses yet.',
    viewReport: 'View Report',
  },
  ta: {
    title: 'AI சுகாதார உதவியாளர்',
    langToggle: 'English',
    // User Info Form
    userInfoTitle: 'நோயாளியைப் பற்றிச் சொல்லுங்கள்',
    userInfoDescription: 'இந்தத் தகவல் மிகவும் துல்லியமான மதிப்பீட்டை வழங்க எங்களுக்கு உதவுகிறது.',
    nameLabel: 'முழு பெயர்',
    namePlaceholder: 'எ.கா., ஜான் டோ',
    ageLabel: 'வயது',
    agePlaceholder: 'எ.கா., 35',
    genderLabel: 'பாலினம்',
    genderMale: 'ஆண்',
    genderFemale: 'பெண்',
    genderOther: 'மற்றவை',
    pastHistoryLabel: 'கடந்தகால மருத்துவ வரலாறு (விரும்பினால்)',
    pastHistoryPlaceholder: 'எ.கா., ஆஸ்துமா, உயர் இரத்த அழுத்தம், நீரிழிவு...',
    nextButton: 'அடுத்து',
    // Symptom Input
    symptomTitle: 'உங்கள் அறிகுறிகளை விவரிக்கவும்',
    symptomDescription: 'தயவுசெய்து முடிந்தவரை விரிவாகக் கூறவும். நீங்கள் தட்டச்சு செய்யலாம், உங்கள் குரலைப் பயன்படுத்தலாம் அல்லது ஒரு புகைப்படத்தைப் பதிவேற்றலாம் அல்லது ஒரு சிறிய வீடியோவைப் பதிவு செய்வதன் மூலம் காட்சிப்படுத்தலாம்.',
    symptomPlaceholder: 'எ.கா., எனக்கு கடுமையான தலைவலி, தொடர்ச்சியான தொண்டை வலி மற்றும் லேசான காய்ச்சல் உள்ளது...',
    micButton: 'மைக்ரோஃபோனைப் பயன்படுத்தவும்',
    micListening: 'கேட்கிறது...',
    cameraButton: 'புகைப்படத்தைப் பதிவேற்றவும்',
    videoButton: 'வீடியோ பதிவு செய்',
    analyzeButton: 'அறிகுறிகளைப் பகுப்பாய்வு செய்',
    // Loader
    loaderText: 'எங்கள் AI உங்கள் அறிகுறிகளைப் பகுப்பாய்வு செய்கிறது. இதற்கு சிறிது நேரம் ஆகலாம்...',
    // Analysis Result
    resultTitle: 'பகுப்பாய்வு முடிவு',
    assessmentLabel: 'AI மதிப்பீடு',
    suggestionsLabel: 'பரிந்துரைகள்',
    criticalAlertTitle: 'முக்கிய எச்சரிக்கை!',
    consultDoctor: 'இப்போதே மருத்துவரை அணுகவும்',
    scheduleConsultation: 'கேலெண்டரில் திட்டமிடவும்',
    readAloud: 'உரக்கப் படி',
    startOver: 'புதிதாகத் தொடங்கு',
    backToHistory: 'வரலாற்றுக்குத் திரும்பு',
    // Error
    errorTitle: 'ஒரு பிழை ஏற்பட்டது',
    // Footer
    footerDisclaimer: 'பொறுப்புத் துறப்பு: இந்த AI உதவியாளர் தகவல் நோக்கங்களுக்காக மட்டுமே மற்றும் தொழில்முறை மருத்துவ ஆலோசனை, நோயறிதல் அல்லது சிகிச்சைக்கு மாற்றாக இல்லை.',
     // History
    viewHistory: 'வரலாற்றைக் காண்க',
    pastAnalysesTitle: 'கடந்தகால பகுப்பாய்வுகள்',
    noPastAnalyses: 'உங்களிடம் இதுவரை சேமிக்கப்பட்ட பகுப்பாய்வுகள் எதுவும் இல்லை.',
    viewReport: 'அறிக்கையைக் காண்க',
  },
};

export const getGeminiPrompt = (language: Language, userInfo: UserInfo, symptoms: string, hasImage: boolean): string => {
  const langInstruction = language === 'ta' ? 'Please provide the response in Tamil language.' : 'Please provide the response in English language.';

  const imageInstruction = hasImage ? `
    Image Analysis:
    - An image has been provided. Analyze it for visible symptoms.
    - Describe what you see in the image that is relevant to the user's described symptoms.
    - Look for signs such as rashes, swelling, discoloration, injuries, inflammation, or any other visual abnormalities.
    - Incorporate your visual findings into your overall assessment.
  ` : '';

  return `
    You are an expert AI Healthcare Assistant. Analyze the following user information and symptoms.
    User Information:
    - Name: ${userInfo.name}
    - Age: ${userInfo.age}
    - Gender: ${userInfo.gender}
    - Past Medical History: ${userInfo.pastHistory || 'None provided'}
    - Symptoms: "${symptoms}"
    
    ${imageInstruction}

    Task:
    1.  Provide a brief, clear assessment of the possible conditions based on the symptoms (including visual symptoms from the image if provided).
    2.  List 3-5 actionable suggestions or potential home remedies.
    3.  Determine if the symptoms suggest a critical or rare condition that requires immediate medical attention.
    4.  If it is critical, explain why in the 'criticalityReason'.
    5.  Provide a standard disclaimer.
    6.  ${langInstruction}
    
    Your response MUST be in the following JSON format. Do not include any text outside of the JSON object.

    {
      "assessment": "string",
      "suggestions": ["string", "string", ...],
      "isCritical": boolean,
      "criticalityReason": "string (empty if not critical)",
      "disclaimer": "string"
    }
  `;
};