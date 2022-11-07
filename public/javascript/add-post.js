const newPost = document.querySelector("#new-post-form");

async function addPostHandler(event) {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;
  const image = document.querySelector("#image");

  const user_id = newPost.getAttribute("user-data");

  if (title && content) {
    const data = new FormData();
    console.log(data);

    if (image.files && image.files.length) {
      data.append("image", image.files[0]);
      console.log(image.files);
    }

    data.append("title", title);
    data.append("content", content);
    // data.append("image", image);
    data.append("user_id", user_id);
    // console.log(data);

    for (const pair of data.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    const response = await fetch("/api/posts", {
      method: "POST",
      body: data,
    });
    console.log(response);

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
