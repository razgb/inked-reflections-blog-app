import { createSlice } from "@reduxjs/toolkit";

// Basic structure of an user post
// {
//   createdAt: 0,
//   updatedAt: 0,
//   uid: 'string',
//   profilePhotoReference: 'name_of_image.jpeg',
//   displayName: 'Raz Neaiz',
//   postContent: [{title, component, value, id}, {}],
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

export const { updatePostsFeed, changeCurrentPost } =
  postsSlice.actions;
export default postsSlice.reducer;

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
