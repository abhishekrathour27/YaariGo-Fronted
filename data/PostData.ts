export const posts = [
  {
    id: "post_1",

    user: {
      id: "user_1",
      name: "Abhishek singh",
      initials: "AS",
      profileImage: null, // agar profile pic nahi ho
    },

    createdAt: "7 months ago",

    content: {
      caption: "This is my social media image",
      image: {
        url: "post-image.jpg", // ya cloudinary / public path
        alt: "User traditional outfit photo",
        width: 1080,
        height: 1350,
      },
    },

    stats: {
      likes: 5,
      comments: 1,
      shares: 2,
    },

    actions: {
      isLiked: false,
      isSaved: false,
    },
  },
  {
    id: "post_1",

    user: {
      id: "user_1",
      name: "Abhishek singh",
      initials: "AS",
      profileImage: null, // agar profile pic nahi ho
    },

    createdAt: "7 months ago",

    content: {
      caption: "This is my social media image",
      image: {
        url: "/uploads/post-image-1.jpg", // ya cloudinary / public path
        alt: "User traditional outfit photo",
        width: 1080,
        height: 1350,
      },
    },

    stats: {
      likes: 5,
      comments: 1,
      shares: 2,
    },

    actions: {
      isLiked: false,
      isSaved: false,
    },
  },
];
