import { doc, getDoc } from "firebase/firestore";
import { db } from "../../main";
import { requestWithRetry } from "../../shared/util/requestWithRetry";

export const fetchBookmarkIdsFromUsersCollection = async (uid) => {
  const userRef = doc(db, "users", uid);

  try {
    const userSnapshot = await requestWithRetry(getDoc(userRef));
    if (!userSnapshot.exists()) {
      throw new Error("Please login to use all app features.");
    }

    const bookmarkIds = [];
    const data = userSnapshot.data();
    if (data.bookmarks) {
      bookmarkIds.push(...data.bookmarks);
    }

    return bookmarkIds;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch bookmarks. Please try again later.");
  }
};
