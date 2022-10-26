const newPost = document.querySelector("#new-post-form");
// const newImage = document.querySelector("#image");

async function addPostHandler(event) {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;
  // const photo = document.querySelector("#user-data");
  const user_id = newPost.getAttribute("user-data");
  if (title && content) {
    const response = await fetch("/api/posts", {
      method: "post",
      body: JSON.stringify({
        title,
        content,
        user_id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  } else {
    alert("Please fill out all fields!");
  }
}

// async function addPhotoHandler(e) {
//   e.preventDefault();
//   const photo = newImage.getAttribute("user-data");
//   if (photo) {
//     const phResponse = await fetch("api/posts", {
//       method: "post",
//       body: JSON.stringify({
//         photo,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });
//     if (phResponse.ok) {
//       document.location.replace("/dashboard");
//     } else {
//       alert(phResponse.statusText);
//     }
//   } else {
//     alert("You need to upload a photo!");
//   }
// }

newPost.addEventListener("submit", addPostHandler);
// newImage.addEventListener("submit", addPhotoHandler);
