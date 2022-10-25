const newPost = document.querySelector("new-post-form");

async function addPostHandler(event) {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#post_url").value;
  const user_id = newPost.getAttribute("user-data");
  if (title && post_url) {
    const response = await fetch("/api/posts", {
      method: "post",
      body: JSON.stringify({
        title,
        post_url,
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
    alert("Please fill in all fields!");
  }
  console.log(
    
  )
}

newPost.addEventListener("submit", addPostHandler);
