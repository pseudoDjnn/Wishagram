const newPost = document.querySelector("#new-post-form");

async function addPostHandler(event) {
  event.preventDefault();
  // console.log(addPostHandler);
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;
  const image_url = document.querySelector("#image_url");
  // console.log(image.value);
  // const uploaded_image = "";

  const user_id = newPost.getAttribute("user-data");

  if (title && content) {
    const data = new FormData();
    console.log(data);

    if (image_url.files && image_url.files.length) {
      data.append("image_url", image_url.files[0]);
      console.log(image_url.files);
    }

    data.append("title", title);
    data.append("content", content);
    data.append("image_url", image_url);
    data.append("user_id", user_id);

    const response = await fetch("/api/posts", {
      method: "POST",
      body: data,
    });
    // console.log(body);

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
// imageUpload.addEventListener("change", function);
