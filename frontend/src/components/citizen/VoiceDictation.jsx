import React, { useState, useEffect, useRef } from 'react';

/**
 * VoiceDictation Component
 * ------------------------
 * Native browser Speech-to-Text dictation for civic complaint descriptions.
 * Supports English (India), Hindi, and Telugu with real-time waveform feedback.
 */
export default function VoiceDictation({
  onTranscript,
  onNotification,
  targetField = 'description',
}) {
  const [isListening, setIsListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en-IN');
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);

  // Supported languages for Indian Municipalities
  const languages = [
    { code: 'en-IN', label: 'English (IN)' },
    { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
    { code: 'te-IN', label: 'తెలుగు (Telugu)' },
  ];

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLang;

    recognition.onstart = () => {
      setIsListening(true);
      if (onNotification) {
        onNotification('🎙️ Microphone active! Speak clearly to dictate your grievance.');
      }
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptChunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptChunk;
        } else {
          interimTranscript += transcriptChunk;
        }
      }

      const textToAppend = finalTranscript || interimTranscript;
      if (textToAppend && onTranscript) {
        onTranscript(textToAppend.trim(), finalTranscript !== '');
      }
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        if (onNotification) onNotification('⚠️ Microphone access denied in browser settings.');
      } else if (event.error !== 'no-speech') {
        if (onNotification) onNotification(`⚠️ Voice dictation notice: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.abort();
      } catch {}
    };
  }, [selectedLang, onTranscript, onNotification]);

  const toggleListening = () => {
    if (!isSupported) {
      if (onNotification) {
        onNotification('Voice dictation is supported in modern Chrome, Edge, and Safari browsers.');
      }
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {}
      setIsListening(false);
      if (onNotification) onNotification('🎙️ Voice dictation paused.');
    } else {
      try {
        recognitionRef.current?.start();
      } catch {
        // restart instance if needed
        setIsListening(true);
      }
    }
  };

  const handleLangChange = (code) => {
    setSelectedLang(code);
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
    if (onNotification) {
      const selected = languages.find((l) => l.code === code)?.label;
      onNotification(`Language set to ${selected}. Click microphone to dictate.`);
    }
  };

  if (!isSupported) {
    return (
      <div className="civic-voice-unsupported" title="Voice dictation is not supported by your browser engine">
        <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>🎙️ Speech input unavailable</span>
      </div>
    );
  }

  return (
    <div className="civic-voice-dictation-wrap">
      {/* Language Selector Chips */}
      <div className="civic-voice-lang-chips">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            className={`civic-voice-lang-pill ${selectedLang === lang.code ? 'active' : ''}`}
            onClick={() => handleLangChange(lang.code)}
            title={`Dictate in ${lang.label}`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Main Microphone Button */}
      <button
        type="button"
        onClick={toggleListening}
        className={`civic-voice-mic-btn ${isListening ? 'listening' : ''}`}
        title={isListening ? 'Click to stop recording' : 'Click to dictate description by voice'}
      >
        <span className="civic-voice-mic-icon">{isListening ? '⏹️' : '🎙️'}</span>
        <span className="civic-voice-mic-label">
          {isListening ? 'Listening (Click to Stop)' : 'Voice Dictate'}
        </span>
        {isListening && <span className="civic-voice-pulse-ring"></span>}
      </button>
    </div>
  );
}
