// Firebase Setup Script
// This script helps you set up your Firebase project with the necessary collections and sample data

console.log("🔥 Firebase Setup Guide for CVGPraySing")
console.log("=====================================")

console.log("\n1. Create a Firebase Project:")
console.log("   - Go to https://console.firebase.google.com/")
console.log("   - Click 'Create a project'")
console.log("   - Name it 'cvgpraysing' or similar")
console.log("   - Enable Google Analytics (optional)")

console.log("\n2. Enable Authentication:")
console.log("   - Go to Authentication > Sign-in method")
console.log("   - Enable 'Email/Password' provider")

console.log("\n3. Create Firestore Database:")
console.log("   - Go to Firestore Database")
console.log("   - Click 'Create database'")
console.log("   - Start in test mode (for development)")
console.log("   - Choose a location close to your users")

console.log("\n4. Set up Collections:")
console.log("   Create these collections in Firestore:")

const collections = [
  {
    name: "users",
    description: "User profiles and authentication data",
    sampleDoc: {
      uid: "user123",
      email: "user@example.com",
      name: "John Doe",
      role: "user",
      createdAt: "2024-01-01T00:00:00Z",
    },
  },
  {
    name: "teachingMaterials",
    description: "YouTube video tutorials and learning content",
    sampleDoc: {
      title: "Introduction to Music Theory",
      description: "Learn the basics of music theory including notes, scales, and rhythm patterns.",
      youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtube_id: "dQw4w9WgXcQ",
      category: "foundation",
      createdAt: "2024-01-15T10:00:00Z",
    },
  },
  {
    name: "contactMessages",
    description: "Messages from the contact form",
    sampleDoc: {
      name: "Alice Johnson",
      email: "alice@example.com",
      message: "I'm interested in learning piano. Do you offer beginner classes?",
      status: "new",
      createdAt: "2024-02-15T10:30:00Z",
    },
  },
  {
    name: "faqs",
    description: "Frequently asked questions",
    sampleDoc: {
      question: "What age groups do you teach?",
      answer: "We welcome students of all ages, from children as young as 5 to adults.",
      isActive: true,
      displayOrder: 1,
      createdAt: "2024-01-01T00:00:00Z",
    },
  },
]

collections.forEach((collection, index) => {
  console.log(`\n   ${index + 1}. Collection: "${collection.name}"`)
  console.log(`      Description: ${collection.description}`)
  console.log(`      Sample document:`)
  console.log(`      ${JSON.stringify(collection.sampleDoc, null, 6)}`)
})

console.log("\n5. Get Firebase Configuration:")
console.log("   - Go to Project Settings > General")
console.log("   - Scroll down to 'Your apps'")
console.log("   - Click 'Web' icon to add a web app")
console.log("   - Register your app")
console.log("   - Copy the configuration object")

console.log("\n6. Environment Variables:")
console.log("   Create a .env.local file with these variables:")
console.log("   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key")
console.log("   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com")
console.log("   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id")
console.log("   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com")
console.log("   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id")
console.log("   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id")

console.log("\n7. Security Rules (for production):")
console.log("   Update Firestore rules to secure your data:")
console.log(`
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users can read/write their own data
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Teaching materials - read for authenticated users, write for admins
       match /teachingMaterials/{document} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && 
           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
       }
       
       // Contact messages - write for anyone, read for admins
       match /contactMessages/{document} {
         allow create: if true;
         allow read: if request.auth != null && 
           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
       }
       
       // FAQs - read for everyone, write for admins
       match /faqs/{document} {
         allow read: if true;
         allow write: if request.auth != null && 
           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
       }
     }
   }
`)

console.log("\n8. Create Admin User:")
console.log("   - Register a user through your app")
console.log("   - Go to Firestore > users collection")
console.log("   - Find the user document")
console.log("   - Change the 'role' field from 'user' to 'admin'")

console.log("\n✅ Setup Complete!")
console.log("Your Firebase backend is now ready for the CVGPraySing application!")
