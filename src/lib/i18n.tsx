import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "hi";

const translations = {
  en: {
    // Navbar
    nav: {
      home: "Home",
      assessment: "Assessment",
      solutions: "Solutions",
      dataInsights: "Data Insights",
      awareness: "Awareness",
      helplines: "Helplines",
    },
    // Landing
    hero: {
      title1: "Understand Your Emotions.",
      title2: "Empower Your Mind.",
      subtitle: "A safe, anonymous platform for early detection of depression among youth. Take a science-based assessment and get personalized guidance.",
      startAssessment: "Start Assessment",
      viewData: "View Data Insights",
      learnMore: "Learn About Depression",
    },
    howItWorks: {
      title: "How It Works",
      subtitle: "Three simple steps to better understand your mental well-being.",
      step1Title: "Take the Assessment",
      step1Desc: "Answer 20 research-based questions about your mood, sleep, energy, and daily life.",
      step2Title: "Get Your Results",
      step2Desc: "Receive a percentage-based depression level analysis with personalized feedback.",
      step3Title: "Find Solutions",
      step3Desc: "Access tailored recommendations, resources, and professional support based on your results.",
    },
    stats: {
      s1: "People affected globally",
      s2: "Start before age 14",
      s3: "Go untreated in youth",
      s4: "More common in teens",
    },
    disclaimer: "This tool is not a medical diagnosis. It is designed for awareness and early screening purposes only. Please consult a licensed mental health professional for clinical evaluation.",

    // Assessment
    assessment: {
      title: "Depression Assessment",
      subtitle: "Answer honestly — this is anonymous and confidential.",
      previous: "Previous",
      next: "Next",
      viewResults: "View Results",
      crisisTitle: "You're Not Alone",
      crisisMsg: "If you're having thoughts of hurting yourself, please reach out for help immediately. You matter, and support is available 24/7.",
      continueAssessment: "Continue Assessment",
    },
    answerOptions: {
      0: "Never / Very good / Very high / Very often",
      1: "Rarely / Occasionally / Good / Moderate / Sometimes",
      2: "Sometimes / Frequently / Poor / Low / Often",
      3: "Often / Always / Very poor / Very low / Rarely / Never",
    },

    // Results
    results: {
      title: "Your Assessment Results",
      depression: "Depression",
      score: "Score",
      immediateSupport: "Immediate Support Available",
      crisisMsg: "Based on your responses, we strongly recommend reaching out to a crisis support service.",
      callNow: "Call 988 Now",
      viewSolutions: "View Recommended Solutions",
      retake: "Retake Assessment",
      disclaimerShort: "This assessment is for awareness only and is not a clinical diagnosis. Please consult a licensed professional for medical evaluation.",
    },

    // Solutions
    solutions: {
      title: "Solutions & Recommendations",
      subtitle: "Evidence-based recommendations tailored to each depression level.",
      level: "Level",
      emergencyTitle: "Emergency Resources",
      emergencyMsg: "If you or someone you know is in immediate danger, please contact emergency services.",
    },

    // Data Insights
    dataInsights: {
      title: "Data Insights",
      subtitle: "Explore student depression data trends from the Student Depression Dataset.",
      ageVsDep: "Age Group vs Depression Rate",
      levelDist: "Depression Distribution",
      pressureVsDep: "Academic Pressure vs Depression Rate",
      genderAvg: "Gender-wise Depression Rate",
      sleepVsDep: "Sleep Duration vs Depression Rate",
      finStressVsDep: "Financial Stress vs Depression Rate",
      sampleDataset: "Sample Dataset",
      headers: ["Age", "Gender", "City", "CGPA", "Acad. Pressure", "Sleep", "Fin. Stress", "Diet", "Depressed"],
    },

    // Awareness
    awareness: {
      title: "Understanding Depression",
      subtitle: "Knowledge is the first step toward healing. Learn about depression, its causes, and how to help.",
      sections: [
        { title: "What is Depression?", content: "Depression is a common but serious mood disorder that negatively affects how you feel, think, and act. It causes persistent feelings of sadness and loss of interest in activities you once enjoyed. It can lead to emotional and physical problems and decrease your ability to function at work, school, and home." },
        { title: "Causes in Youth", content: "Depression in youth can be triggered by a combination of genetic, biological, environmental, and psychological factors. Common triggers include academic pressure, social media comparison, bullying, family conflict, identity struggles, substance use, and traumatic life events." },
        { title: "Symptoms to Watch For", items: ["Persistent sadness or empty mood", "Loss of interest in activities", "Changes in appetite and weight", "Sleep disturbances", "Fatigue and low energy", "Feelings of worthlessness or guilt", "Difficulty concentrating", "Withdrawal from friends and family", "Thoughts of death or suicide"] },
        { title: "How to Support a Friend", items: ["Listen without judgment", "Validate their feelings", "Encourage professional help", "Stay connected and check in regularly", "Learn about depression together", "Avoid saying 'just cheer up'", "Be patient — recovery takes time", "Know the warning signs of crisis"] },
        { title: "Self-Care Techniques", items: ["Establish a daily routine", "Exercise regularly (even walking helps)", "Practice mindfulness and deep breathing", "Limit social media exposure", "Maintain a sleep schedule", "Eat nutritious meals", "Express yourself through journaling or art", "Set small, achievable goals each day"] },
      ],
      mythsTitle: "Myths vs Facts",
      myths: [
        { myth: "Depression is just feeling sad", fact: "Depression is a clinical condition involving changes in brain chemistry, not just sadness." },
        { myth: "You can just 'snap out of it'", fact: "Depression requires proper treatment — willpower alone isn't enough." },
        { myth: "Only adults get depressed", fact: "Depression affects all age groups, including children and teens." },
        { myth: "Talking about depression makes it worse", fact: "Open conversations reduce stigma and encourage seeking help." },
        { myth: "Medication is the only solution", fact: "Therapy, lifestyle changes, and social support are equally important." },
      ],
      earlyDetectionTitle: "Why Early Detection Matters",
      earlyDetectionContent: "Early identification of depression can prevent it from worsening. Youth who receive timely support show significantly better outcomes in academic performance, relationships, and overall quality of life. Don't wait — taking the first step matters.",
    },

    // Helplines
    helplines: {
      title: "Helplines & Resources",
      subtitle: "You don't have to face this alone. Help is available 24/7.",
      emergencyBanner: "In immediate danger? Call 911 or go to your nearest emergency room.",
      crisisHelplines: "Crisis Helplines",
      onlineTherapy: "Online Therapy & Support",
    },

    // Footer
    footer: {
      tagline: "Empowering youth through early detection and mental health awareness. You are not alone.",
      quickLinks: "Quick Links",
      takeAssessment: "Take Assessment",
      learnAbout: "Learn About Depression",
      helplinesResources: "Helplines & Resources",
      emergencyContacts: "Emergency Contacts",
      disclaimerFooter: "This tool is not a medical diagnosis. Please consult a licensed professional for clinical evaluation.",
      copyright: "© 2026 MindCare. Built with compassion.",
    },

    // Assessment questions
    questions: [
      "How often do you feel sad or down without a clear reason?",
      "How frequently do you lose interest in activities you usually enjoy?",
      "How would you rate your energy level during most days?",
      "How often do you experience difficulty sleeping?",
      "Do you find it hard to concentrate on tasks such as studying or working?",
      "How often do you feel stressed due to studies, work, or personal life?",
      "How often do you feel lonely even when you are around people?",
      "How frequently do you feel tired or lack motivation to do daily activities?",
      "How often do you talk to friends or family about your feelings?",
      "How would you describe your overall mental well-being in the past month?",
    ],

    // Depression levels
    levels: {
      Minimal: "Minimal",
      Mild: "Mild",
      Moderate: "Moderate",
      "Moderately Severe": "Moderately Severe",
      Severe: "Severe",
    },
    feedback: {
      Minimal: "You're doing well! Keep maintaining healthy habits and self-care routines.",
      Mild: "You're experiencing some challenges. Small lifestyle changes can make a big difference.",
      Moderate: "It's okay to seek support. Consider talking to a counselor or trusted person.",
      "Moderately Severe": "Please reach out to a mental health professional. You deserve support.",
      Severe: "Please seek immediate help. Contact a crisis helpline or visit an emergency room.",
    },

    // Solutions detail
    solutionLevels: {
      Minimal: { title: "Keep Up the Good Work", items: ["Daily journaling for self-reflection", "Regular physical exercise (30 min/day)", "Mindfulness meditation apps like Calm or Headspace", "Maintaining strong social connections", "Consistent sleep schedule"] },
      Mild: { title: "Small Steps, Big Impact", items: ["Join peer support groups online or locally", "Establish a daily routine with structure", "Practice sleep hygiene (no screens before bed)", "Try gratitude journaling", "Reduce caffeine and alcohol intake", "Engage in creative hobbies"] },
      Moderate: { title: "Seeking Support is Strength", items: ["Schedule a counseling session", "Explore guided therapy programs (CBT-based)", "Create a stress management plan", "Practice deep breathing exercises daily", "Consider support groups for depression", "Regular check-ins with a trusted person"] },
      "Moderately Severe": { title: "Professional Help Recommended", items: ["Consult a professional therapist or psychiatrist", "Begin structured CBT (Cognitive Behavioral Therapy)", "Set up regular mental health monitoring", "Consider a mental health day plan", "Build a crisis safety plan", "Explore medication options with a doctor"] },
      Severe: { title: "Immediate Support Available", items: ["Call 988 Suicide & Crisis Lifeline immediately", "Text HOME to 741741 (Crisis Text Line)", "Visit your nearest emergency room", "Contact a trusted family member or friend", "Reach out to online crisis chat services", "Do not isolate yourself — help is here"] },
    },
  },

  hi: {
    nav: {
      home: "होम",
      assessment: "मूल्यांकन",
      solutions: "समाधान",
      dataInsights: "डेटा अंतर्दृष्टि",
      awareness: "जागरूकता",
      helplines: "हेल्पलाइन",
    },
    hero: {
      title1: "अपनी भावनाओं को समझें।",
      title2: "अपने मन को सशक्त बनाएं।",
      subtitle: "युवाओं में अवसाद का जल्दी पता लगाने के लिए एक सुरक्षित, गुमनाम मंच। विज्ञान-आधारित मूल्यांकन लें और व्यक्तिगत मार्गदर्शन प्राप्त करें।",
      startAssessment: "मूल्यांकन शुरू करें",
      viewData: "डेटा अंतर्दृष्टि देखें",
      learnMore: "अवसाद के बारे में जानें",
    },
    howItWorks: {
      title: "यह कैसे काम करता है",
      subtitle: "अपनी मानसिक भलाई को बेहतर समझने के तीन सरल चरण।",
      step1Title: "मूल्यांकन लें",
      step1Desc: "अपने मनोदशा, नींद, ऊर्जा और दैनिक जीवन के बारे में 20 शोध-आधारित प्रश्नों के उत्तर दें।",
      step2Title: "अपने परिणाम प्राप्त करें",
      step2Desc: "व्यक्तिगत प्रतिक्रिया के साथ प्रतिशत-आधारित अवसाद स्तर विश्लेषण प्राप्त करें।",
      step3Title: "समाधान खोजें",
      step3Desc: "अपने परिणामों के आधार पर अनुकूलित सिफारिशें, संसाधन और पेशेवर सहायता प्राप्त करें।",
    },
    stats: {
      s1: "विश्व स्तर पर प्रभावित लोग",
      s2: "14 साल की उम्र से पहले शुरू",
      s3: "युवाओं में अनुपचारित",
      s4: "किशोरों में अधिक सामान्य",
    },
    disclaimer: "यह उपकरण चिकित्सा निदान नहीं है। यह केवल जागरूकता और प्रारंभिक जांच के उद्देश्यों के लिए है। कृपया नैदानिक मूल्यांकन के लिए लाइसेंस प्राप्त मानसिक स्वास्थ्य पेशेवर से परामर्श करें।",

    assessment: {
      title: "अवसाद मूल्यांकन",
      subtitle: "ईमानदारी से उत्तर दें — यह गुमनाम और गोपनीय है।",
      previous: "पिछला",
      next: "अगला",
      viewResults: "परिणाम देखें",
      crisisTitle: "आप अकेले नहीं हैं",
      crisisMsg: "यदि आप खुद को नुकसान पहुंचाने के बारे में सोच रहे हैं, तो कृपया तुरंत मदद के लिए संपर्क करें। आप महत्वपूर्ण हैं, और सहायता 24/7 उपलब्ध है।",
      continueAssessment: "मूल्यांकन जारी रखें",
    },
    answerOptions: {
      0: "कभी नहीं / बहुत अच्छा / बहुत अधिक / बहुत अधिक",
      1: "कभी-कभी / कभी-कभी / अच्छा / मध्यम / कभी-कभी",
      2: "कभी-कभी / अक्सर / खराब / कम / अक्सर",
      3: "अक्सर / हमेशा / बहुत खराब / बहुत कम / कभी-कभी / कभी नहीं",
    },

    results: {
      title: "आपके मूल्यांकन के परिणाम",
      depression: "अवसाद",
      score: "स्कोर",
      immediateSupport: "तत्काल सहायता उपलब्ध",
      crisisMsg: "आपकी प्रतिक्रियाओं के आधार पर, हम दृढ़ता से अनुशंसा करते हैं कि आप किसी संकट सहायता सेवा से संपर्क करें।",
      callNow: "अभी 988 पर कॉल करें",
      viewSolutions: "अनुशंसित समाधान देखें",
      retake: "पुनः मूल्यांकन करें",
      disclaimerShort: "यह मूल्यांकन केवल जागरूकता के लिए है और नैदानिक निदान नहीं है। कृपया चिकित्सा मूल्यांकन के लिए लाइसेंस प्राप्त पेशेवर से परामर्श करें।",
    },

    solutions: {
      title: "समाधान और सिफारिशें",
      subtitle: "प्रत्येक अवसाद स्तर के अनुसार साक्ष्य-आधारित सिफारिशें।",
      level: "स्तर",
      emergencyTitle: "आपातकालीन संसाधन",
      emergencyMsg: "यदि आप या आपका कोई परिचित तत्काल खतरे में है, तो कृपया आपातकालीन सेवाओं से संपर्क करें।",
    },

    dataInsights: {
      title: "डेटा अंतर्दृष्टि",
      subtitle: "छात्र अवसाद डेटासेट से अवसाद डेटा रुझान देखें।",
      ageVsDep: "आयु समूह बनाम अवसाद दर",
      levelDist: "अवसाद वितरण",
      pressureVsDep: "शैक्षणिक दबाव बनाम अवसाद दर",
      genderAvg: "लिंग-वार अवसाद दर",
      sleepVsDep: "नींद अवधि बनाम अवसाद दर",
      finStressVsDep: "वित्तीय तनाव बनाम अवसाद दर",
      sampleDataset: "नमूना डेटासेट",
      headers: ["उम्र", "लिंग", "शहर", "CGPA", "शैक्षणिक दबाव", "नींद", "वित्तीय तनाव", "आहार", "अवसाद"],
    },

    awareness: {
      title: "अवसाद को समझना",
      subtitle: "ज्ञान उपचार की दिशा में पहला कदम है। अवसाद, इसके कारणों और मदद कैसे करें, इसके बारे में जानें।",
      sections: [
        { title: "अवसाद क्या है?", content: "अवसाद एक सामान्य लेकिन गंभीर मनोदशा विकार है जो आपकी भावनाओं, सोच और कार्यों को नकारात्मक रूप से प्रभावित करता है। यह उदासी और उन गतिविधियों में रुचि खोने की लगातार भावनाओं का कारण बनता है जिनका आप कभी आनंद लेते थे।" },
        { title: "युवाओं में कारण", content: "युवाओं में अवसाद आनुवंशिक, जैविक, पर्यावरणीय और मनोवैज्ञानिक कारकों के संयोजन से उत्पन्न हो सकता है। सामान्य ट्रिगर में शैक्षणिक दबाव, सोशल मीडिया तुलना, बदमाशी, पारिवारिक संघर्ष और दर्दनाक जीवन की घटनाएं शामिल हैं।" },
        { title: "ध्यान देने योग्य लक्षण", items: ["लगातार उदासी या खालीपन", "गतिविधियों में रुचि की कमी", "भूख और वजन में बदलाव", "नींद में गड़बड़ी", "थकान और कम ऊर्जा", "बेकार या दोषी महसूस करना", "ध्यान केंद्रित करने में कठिनाई", "दोस्तों और परिवार से दूरी", "मृत्यु या आत्महत्या के विचार"] },
        { title: "दोस्त की मदद कैसे करें", items: ["बिना निर्णय के सुनें", "उनकी भावनाओं को मान्य करें", "पेशेवर मदद को प्रोत्साहित करें", "जुड़े रहें और नियमित रूप से बात करें", "एक साथ अवसाद के बारे में जानें", "'बस खुश हो जाओ' कहने से बचें", "धैर्य रखें — ठीक होने में समय लगता है", "संकट के चेतावनी संकेतों को जानें"] },
        { title: "स्व-देखभाल तकनीक", items: ["एक दैनिक दिनचर्या स्थापित करें", "नियमित रूप से व्यायाम करें (चलना भी मदद करता है)", "माइंडफुलनेस और गहरी सांस लेने का अभ्यास करें", "सोशल मीडिया का उपयोग सीमित करें", "नींद का शेड्यूल बनाए रखें", "पौष्टिक भोजन खाएं", "जर्नलिंग या कला के माध्यम से खुद को व्यक्त करें", "हर दिन छोटे, प्राप्त करने योग्य लक्ष्य निर्धारित करें"] },
      ],
      mythsTitle: "मिथक बनाम तथ्य",
      myths: [
        { myth: "अवसाद सिर्फ उदास महसूस करना है", fact: "अवसाद मस्तिष्क रसायन विज्ञान में बदलाव वाली एक नैदानिक स्थिति है, सिर्फ उदासी नहीं।" },
        { myth: "आप बस 'इससे बाहर निकल' सकते हैं", fact: "अवसाद को उचित उपचार की आवश्यकता है — अकेले इच्छाशक्ति पर्याप्त नहीं है।" },
        { myth: "केवल वयस्कों को अवसाद होता है", fact: "अवसाद बच्चों और किशोरों सहित सभी आयु समूहों को प्रभावित करता है।" },
        { myth: "अवसाद के बारे में बात करने से यह बदतर होता है", fact: "खुली बातचीत कलंक को कम करती है और मदद मांगने को प्रोत्साहित करती है।" },
        { myth: "दवा ही एकमात्र समाधान है", fact: "थेरेपी, जीवनशैली में बदलाव और सामाजिक सहायता समान रूप से महत्वपूर्ण हैं।" },
      ],
      earlyDetectionTitle: "प्रारंभिक पहचान क्यों महत्वपूर्ण है",
      earlyDetectionContent: "अवसाद की प्रारंभिक पहचान इसे बिगड़ने से रोक सकती है। जिन युवाओं को समय पर सहायता मिलती है, वे शैक्षणिक प्रदर्शन, रिश्तों और जीवन की समग्र गुणवत्ता में काफी बेहतर परिणाम दिखाते हैं।",
    },

    helplines: {
      title: "हेल्पलाइन और संसाधन",
      subtitle: "आपको इसका अकेले सामना नहीं करना है। मदद 24/7 उपलब्ध है।",
      emergencyBanner: "तत्काल खतरे में? 911 पर कॉल करें या अपने निकटतम आपातकालीन कक्ष में जाएं।",
      crisisHelplines: "संकट हेल्पलाइन",
      onlineTherapy: "ऑनलाइन थेरेपी और सहायता",
    },

    footer: {
      tagline: "प्रारंभिक पहचान और मानसिक स्वास्थ्य जागरूकता के माध्यम से युवाओं को सशक्त बनाना। आप अकेले नहीं हैं।",
      quickLinks: "त्वरित लिंक",
      takeAssessment: "मूल्यांकन लें",
      learnAbout: "अवसाद के बारे में जानें",
      helplinesResources: "हेल्पलाइन और संसाधन",
      emergencyContacts: "आपातकालीन संपर्क",
      disclaimerFooter: "यह उपकरण चिकित्सा निदान नहीं है। कृपया नैदानिक मूल्यांकन के लिए लाइसेंस प्राप्त पेशेवर से परामर्श करें।",
      copyright: "© 2026 MindCare. करुणा के साथ बनाया गया।",
    },

    questions: [
      "बिना किसी स्पष्ट कारण के आप कितनी बार उदास या नीचा महसूस करते हैं?",
      "आप कितनी बार उन गतिविधियों में रुचि खो देते हैं जिनका आप आमतौर पर आनंद लेते हैं?",
      "अधिकांश दिनों में आप अपने ऊर्जा स्तर को कैसे रेट करेंगे?",
      "आपको कितनी बार नींद आने में कठिनाई होती है?",
      "क्या आपको पढ़ाई या काम जैसे कार्यों पर ध्यान केंद्रित करने में कठिनाई होती है?",
      "पढ़ाई, काम या निजी जीवन के कारण आप कितनी बार तनाव महसूस करते हैं?",
      "लोगों के बीच होने पर भी आप कितनी बार अकेला महसूस करते हैं?",
      "आप कितनी बार थकान महसूस करते हैं या दैनिक गतिविधियों के लिए प्रेरणा की कमी महसूस करते हैं?",
      "आप कितनी बार दोस्तों या परिवार से अपनी भावनाओं के बारे में बात करते हैं?",
      "पिछले महीने में आप अपने समग्र मानसिक स्वास्थ्य का वर्णन कैसे करेंगे?",
    ],

    levels: {
      Minimal: "न्यूनतम",
      Mild: "हल्का",
      Moderate: "मध्यम",
      "Moderately Severe": "मध्यम गंभीर",
      Severe: "गंभीर",
    },
    feedback: {
      Minimal: "आप अच्छा कर रहे हैं! स्वस्थ आदतें और स्व-देखभाल दिनचर्या बनाए रखें।",
      Mild: "आप कुछ चुनौतियों का सामना कर रहे हैं। छोटे जीवनशैली परिवर्तन बड़ा अंतर ला सकते हैं।",
      Moderate: "सहायता मांगना ठीक है। किसी परामर्शदाता या विश्वसनीय व्यक्ति से बात करने पर विचार करें।",
      "Moderately Severe": "कृपया किसी मानसिक स्वास्थ्य पेशेवर से संपर्क करें। आप सहायता के योग्य हैं।",
      Severe: "कृपया तुरंत मदद लें। किसी संकट हेल्पलाइन से संपर्क करें या आपातकालीन कक्ष में जाएं।",
    },

    solutionLevels: {
      Minimal: { title: "अच्छा काम जारी रखें", items: ["आत्म-चिंतन के लिए दैनिक जर्नलिंग", "नियमित शारीरिक व्यायाम (30 मिनट/दिन)", "कैल्म या हेडस्पेस जैसे माइंडफुलनेस मेडिटेशन ऐप्स", "मजबूत सामाजिक संबंध बनाए रखना", "लगातार नींद का शेड्यूल"] },
      Mild: { title: "छोटे कदम, बड़ा प्रभाव", items: ["ऑनलाइन या स्थानीय पीयर सपोर्ट ग्रुप्स में शामिल हों", "संरचना के साथ दैनिक दिनचर्या स्थापित करें", "नींद स्वच्छता का अभ्यास करें (सोने से पहले स्क्रीन नहीं)", "कृतज्ञता जर्नलिंग आजमाएं", "कैफीन और शराब का सेवन कम करें", "रचनात्मक शौक में संलग्न हों"] },
      Moderate: { title: "सहायता मांगना ताकत है", items: ["परामर्श सत्र शेड्यूल करें", "गाइडेड थेरेपी कार्यक्रम (CBT-आधारित) देखें", "तनाव प्रबंधन योजना बनाएं", "रोजाना गहरी सांस लेने के व्यायाम करें", "अवसाद के लिए सहायता समूहों पर विचार करें", "किसी विश्वसनीय व्यक्ति के साथ नियमित बातचीत"] },
      "Moderately Severe": { title: "पेशेवर मदद अनुशंसित", items: ["पेशेवर थेरेपिस्ट या मनोचिकित्सक से परामर्श करें", "संरचित CBT (संज्ञानात्मक व्यवहार थेरेपी) शुरू करें", "नियमित मानसिक स्वास्थ्य निगरानी स्थापित करें", "मानसिक स्वास्थ्य दिवस योजना पर विचार करें", "संकट सुरक्षा योजना बनाएं", "डॉक्टर के साथ दवा विकल्पों का पता लगाएं"] },
      Severe: { title: "तत्काल सहायता उपलब्ध", items: ["तुरंत 988 सुसाइड एंड क्राइसिस लाइफलाइन पर कॉल करें", "741741 पर HOME टेक्स्ट करें (क्राइसिस टेक्स्ट लाइन)", "अपने निकटतम आपातकालीन कक्ष में जाएं", "किसी विश्वसनीय परिवार के सदस्य या मित्र से संपर्क करें", "ऑनलाइन संकट चैट सेवाओं से संपर्क करें", "खुद को अलग न करें — मदद यहां है"] },
    },
  },
} as const;

type Translations = typeof translations.en;

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang] as Translations;
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
