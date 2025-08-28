import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "webdev";
let password = "password";

async function initializeScreen() {
  token = await getAccessToken(rootURL, username, password);
  showNav();
  getPosts();
  getStories();
  getUserProfile();
  getSuggestions();
}

function showNav() {
  document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:

async function getPosts() {
  const endpoint =
    "https://photo-app-secured.herokuapp.com/api/posts/?limit-10";
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const posts = await response.json();

  console.log(posts);
  showPosts(posts);
}

async function getStories() {
  const endpoint = "https://photo-app-secured.herokuapp.com/api/stories";
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const stories = await response.json();

  console.log(stories);
  showStories(stories);
}

async function getUserProfile() {
  const endpoint = "https://photo-app-secured.herokuapp.com/api/profile";
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const profile = await response.json();

  console.log(profile);
  showUserProfile(profile);
}

async function getSuggestions() {
  const endpoint = "https://photo-app-secured.herokuapp.com/api/suggestions";
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const suggestions = await response.json();

  console.log(suggestions);
  showSuggestions(suggestions);
}

function showSuggestions(suggestions) {
  const mainEL = document.querySelector("#suggestions");
  suggestions.forEach((suggestion) => {
    const template = `
      <img src="${suggestion.thumb_url}" class="rounded-full" alt="profile picture for suggested" />
                <div class="w-[180px]">
                    <p class="font-bold text-sm">${suggestion.username}</p>
                    <p class="text-gray-600 text-xs" >suggested for you</p>
                </div>
                <button class="text-blue-600 text-sm py-2">follow</button>

  `;
//   text-gray-500
    mainEL.insertAdjacentHTML("beforeend", template);
  });
}

function showUserProfile(profile) {
  const mainEL = document.querySelector("#userprofile");

  const template = `
    <img src="${profile.thumb_url}" class="rounded-full w-16" alt="user picture" />
            <h2 class="font-Comfortaa font-bold text-2xl">${profile.username}</h2>

`;

  mainEL.insertAdjacentHTML("beforeend", template);
}

function showStories(stories) {
  const mainEL = document.querySelector("#storypanel");
  stories.forEach((story) => {
    const template = `
    <div class="flex flex-col justify-center items-center">
    <img src="${story.user.thumb_url}" class="rounded-full border-4 border-gray-300" alt="stories pictures for ${story.user.username}" />
    <p class="text-xs text-gray-500">${story.user.username}</p>
</div>

`;

    mainEL.insertAdjacentHTML("beforeend", template);
  });
}

function showPosts(posts) {
  const mainEL = document.querySelector("main");
  posts.forEach((post) => {
    const template = `<section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${
                  post.user.username
                }</h3>
                <button aria-label="more" class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${post.image_url}" alt="${
      post.alt_test
    }" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                        ${getLikeButton(post)}
                        
                        <button aria-label="comment" ><i class="far fa-comment"></i></button>
                        <button aria-label="share" ><i class="far fa-paper-plane"></i></button>
                    </div> 
                    <div>
                        ${getBookmarkButton(post)}
                    </div>
                </div>
                <p class="font-bold mb-3">${post.likes.length} like(s)</p>
                <div class="text-sm mb-3">
                    <p>
                        <strong>${post.user.username}</strong>
                        ${post.caption} <button class="button">more</button>
                    </p>
                </div>
                ${showComments(post.comments)}
               
                <p class="uppercase text-gray-500 text-xs">${
                  post.display_time
                }</p>
            </div>
            
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input type="text" class="min-w-[80%] focus:outline-none" aria-label="Add comment" placeholder="Add a comment...">
                </div>
                <button class="text-blue-600 py-2">Post</button>
            </div>
        </section>
`;
    mainEL.insertAdjacentHTML("beforeend", template);
  });
}

function showComments(comments) {
  const lastComment = comments[comments.length - 1];
  if (comments.length > 1) {
    return `
        <button>view all ${comments.length} comments</button>
        <p class="text-sm mb-3">
        <strong>${lastComment.user.username}</strong ${lastComment.text}
        </p>
        
        `;
  }
  if (comments.length === 1) {
    const lastComment = comments[0];
    return `<p class="text-sm mb-3">
        <strong>${comments[0].user.username}</strong> ${comments[0].text}
        </p>`;
  }
  return "";
}

function getLikeButton(post) {
    console.log(post.current_user_like_id);
    
    if (post.current_user_like_id) {
      return `<button onclick="deleteHeart(${post.current_user_like_id})"><i class="fa-solid fa-heart text-red-500" aria-label="heart" ></i></button>`;
    } else {
      return `
      <button aria-label="heartss" onclick="createHeart(${post.id})">
      <i class="far fa-heart"></i>
       </button>`;
    }
  
}

function getBookmarkButton(post) {
  console.log(post.current_user_bookmark_id);
  if (post.current_user_bookmark_id) {
    return `<button onclick="deleteBookmark(${post.current_user_bookmark_id})"><i class="fa-solid fa-bookmark" aria-label="bookmark" ></i></button>`;
  } else {
    return `
    <button aria-label="bookmarks" onclick="createBookmark(${post.id})">
    <i class="far fa-bookmark"></i>
     </button>`;
  }
}

window.createHeart = async function (postID) {
  const postData = {
    post_id: postID,
  };

  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/likes/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
};

window.createBookmark = async function (postID) {
  const postData = {
    post_id: postID,
  };

  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/bookmarks/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
};

window.deleteBookmark = async function (bookmarkId) {
  console.log(bookmarkId);
  const response = await fetch(
    `https://photo-app-secured.herokuapp.com/api/bookmarks/${bookmarkId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
};

window.deleteHeart = async function (likeId) {
  console.log(likeId);
  const response = await fetch(
    `https://photo-app-secured.herokuapp.com/api/likes/${likeId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
};

// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();
