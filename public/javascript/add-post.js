const newPost = document.querySelector("#new-post-form");

async function addPostHandler(event) {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;
  const photo = document.querySelector("#image");
  const user_id = newPost.getAttribute("user-data");
  if (title && content) {
    const data = new FormData();
    if (photo.files && photo.files.length) {
      data.append("image", photo.files[0]);
    }

    data.append("title", title);
    data.append("content", content);
    data.append("user_id", user_id);

    const response = await fetch("/api/posts", {
      method: "POST",
      body: data,
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

newPost.addEventListener("submit", addPostHandler);
