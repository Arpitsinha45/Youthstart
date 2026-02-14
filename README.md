
# YouthStartups.in - Production Setup Guide

## Overview
A high-performance editorial platform built for scale.

## Infrastructure Setup
1. **Firebase**:
   - Create a project at [Firebase Console](https://console.firebase.google.com).
   - Enable **Authentication** (Email/Password).
   - Enable **Firestore Database** in Production Mode.
   - Enable **Cloud Storage** for assets.
   - Create a Web App and copy credentials to `lib/firebase.ts`.

2. **Firestore Rules**:
```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{post} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'editor'];
    }
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false; // Role management should be done via Cloud Functions or Admin SDK
    }
  }
}
```

## Deployment
- **Frontend**: Deploy to Vercel for optimal Next.js/React performance.
- **Environment Variables**:
  - `FIREBASE_API_KEY`
  - `FIREBASE_AUTH_DOMAIN`
  - `FIREBASE_PROJECT_ID`

## Monetization Plan
- **Sponsored Content**: Flag posts with `sponsored: true` in the DB to trigger CSS highlights.
- **Native Ads**: Inject `AdPlaceholder` components every 5 stories.
- **Premium Newsletter**: Connect the `newsletterSubscribers` collection to Mailchimp or Revue.
