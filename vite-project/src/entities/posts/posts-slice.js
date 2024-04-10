import { createSlice } from "@reduxjs/toolkit";

// Basic structure of an user post
// {
//   createAt: 0,
//   firstName: "",
//   lastName: "",
//   paragraphs: [],
//   tags: [],
// };

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    currentPost: {},
    postsFeed: [],
    lastVisibleDoc: null,
  },
  reducers: {
    changeCurrentPost(state, action) {
      state.currentPost = { ...action.payload };
    },
    updatePostsFeed(state, action) {
      if (state.postsFeed.length > 0) {
        // state.postsFeed.push(...action.payload);
      } else if (state.postsFeed.length === 0) {
        // state.postsFeed.push(...action.payload);
      }

      // Fix this later when you fix the sanitization function.
      state.postsFeed.push(...action.payload);
    },
    // uploadPost(state, action) {},
    // editPost(state, action) {},
    // deletePost(state, action) {},
  },
});

export const { updatePostsFeed, changeUpdateState, changeCurrentPost } =
  postsSlice.actions;
export default postsSlice;

/*
if (state.postsFeed.length > 0) {
        console.log("Posts feed not empty");
        const freshUniquePosts = action.payload.filter((newPost) => {
          for (const post of state.postsFeed) {
            if (post.id === newPost.id) return false;
            else return true;
          }
        });

        if (freshUniquePosts.length === 0) {
          console.log("Sanitized repeat posts");
          return;
        }

        console.log([...state.postsFeed, ...freshUniquePosts]);
        // state.postsFeed = [...state.postsFeed, ...freshUniquePosts];
      } else
*/
