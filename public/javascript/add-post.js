const newPost = document.querySelector("#new-post-form");

async function addPostHandler(event) {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;
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
    alert("Please fill out all fields");
  }
}

newPost.addEventListener("submit", addPostHandler);
