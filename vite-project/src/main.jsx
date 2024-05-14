import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../globals.css";
import { Provider } from "react-redux";
import store from "./store/RootReducer.js";
import { ThemeContextProvider } from "./entities/theme/ThemeContext.jsx";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBM7ipyzLbhi8AsioPELKH_pq-bnyCNRrs",
  authDomain: "inked-reflections.firebaseapp.com",
  projectId: "inked-reflections",
  storageBucket: "gs://inked-reflections.appspot.com",
  messagingSenderId: "181577158789",
  appId: "1:181577158789:web:98ab2da655f50815f259ec",
  measurementId: "G-Z5B8XVB4WQ",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const assetsRef = ref(storage, "assets/");
const profileRef = ref(storage, "profile/");
const postsRef = ref(storage, "posts/");
export { db, auth, assetsRef, profileRef, postsRef };

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </Provider>
  </React.StrictMode>
);

//
// EXPERIMENTAL FUNCTIONS WILL BE USED BELOW THIS COMMENT:
//

// -> Sending experimental user data to 'users' collection.

// async function sendPostsData() {
//   const postsRef = collection(db, "posts");
//   try {
//     const querySnapshot = await getDocs(postsRef);

//     querySnapshot.docs.map(async (doc, index) => {
//       const randomNumber = Math.floor(Math.random() * 10) + 1;
//       await updateDoc(doc.ref, {
//         photoURL: `/bot/bot_post__${randomNumber}.jpg`,
//       });
//     });

//     console.log("All updates complete.");
//   } catch (error) {
//     console.log(`Something went wrong: ${error}`);
//   }
// }
// sendPostsData();

/*
const socialMediaPostTitles = [
  "The Art of Enjoying Solitude: My Journey",
  "Why I Started Journaling and How It Changed Me",
  "The Little Things: Appreciating Life’s Minor Details",
  "Finding Beauty in Chaos: My Thoughts",
  "Coffee and Contemplation: Morning Rituals",
  "Walking as Meditation: Thoughts from My Strolls",
  "Decluttering the Mind: Lessons Learned",
  "The Joy of Missing Out: Embracing Solitude",
  "Homemade Happiness: The Comforts of Cooking",
  "The Books That Shaped My Perspective",
  "Rediscovering Childhood Hobbies in Adulthood",
  "Nature’s Calm: Reflections from Hiking",
  "The Magic of Early Mornings: My Thoughts",
  "Learning to Say No: A Journey to Self-Care",
  "The Soundtrack of My Life: Musical Reflections",
  "Crafting Memories: The Joy of Scrapbooking",
  "The Power of Pausing: Finding Stillness",
  "Gardening as Therapy: Growth and Healing",
  "Tea Time Tales: The Rituals That Keep Me Grounded",
  "Chasing Sunsets: What The Sky Teaches Me",
  "The Road Less Traveled: Lessons from Solo Trips",
  "Binge-Watching as Self-Discovery",
  "Dancing Alone: Finding Joy in Movement",
  "Digital Detox: What I Learned from Unplugging",
  "The Comfort of Strangers: Stories from Cafes",
  "Rediscovering the Joy of Letter Writing",
  "Window Views: The Stories They Tell",
  "The Philosophy of Clean Spaces",
  "Candlelit Evenings: Creating a Cozy Atmosphere",
  "The Language of Flowers: My Floral Diary",
  "Stargazing: Contemplations Under the Cosmos",
  "The Warmth of a Cup of Tea: Simple Pleasures",
  "Relearning to Sketch: Embracing Imperfections",
  "Mindful Eating: A Journey to Conscious Consumption",
  "The Texture of Life: Observations on Touch",
  "Rainy Days Reflections: Finding Peace in the Storm",
  "The Gift of Giving: Joy in Altruism",
  "Savoring Silence: The Power of Quiet Moments",
  "Old Photographs: Time Traveling Through Memories",
  "The Art of Being Alone: My Path to Self-Love",
  "Scented Memories: How Smells Invoke the Past",
  "The Pursuit of Slow Living in a Fast World",
  "Redefining Success: My Personal Evolution",
  "The Ritual of Bathing: A Form of Self-Care",
  "Cloud Watching: Imagination and Idle Thoughts",
  "The Healing Power of Music: My Melodic Escape",
  "Late-Night Musings: Thoughts on Creativity",
  "The Sweetness of Doing Nothing: My Take on 'Dolce Far Niente'",
  "Reflections on Friendship in Adulthood",
  "Finding My Voice: The Journey of Self-Expression",
];
*/
/*
const randomTags = [
  "self acceptance",
  "self love",
  "self empowerment",
  "stress management",
  "compassion",
  "joyful living",
  "overcoming obstacles",
  "inner peace",
  "success strategies",
  "motivation",
  "positivity",
  "self love",
  "reflection",
  "wellbeing",
  "happiness",
  "goal setting",
  "personal development",
  "self care",
  "habit formation",
  "confidence building",
  "emotional intelligence",
  "kindness",
  "self discovery",
  "mindset shift",
  "spiritual growth",
  "healthy habits",
  "courage",
  "life coaching",
  "passion finding",
  "daily reflection",
  "productivity",
  "time management",
  "self help",
  "optimism",
  "mindfulness",
  "goals",
  "reflection",
  "personal growth",
  "positivity",
  "resilience",
  "mental health",
  "wellbeing",
  "living intentionally",
  "self help",
  "forgiveness",
  "motivation",
  "positive thinking",
  "gratitude",
  "life balance",
  "mindful living",
];
*/

// const dates = [];
// for (let i = 0; i < 50; i++) {
//   const date = new Date();
//   let timestamp = Math.floor(date.getTime());

//   timestamp = Math.floor(
//     timestamp - Math.random() * 1000 * 60 * 60 * 24 * 365 * 2
//   );

//   dates.push(timestamp);
// }
