// UPDATES YOUR POST
async function updatePost(event) {
  event.preventDefault();
  const postId = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();
  const response = await fetch(`/api/posts/${postId}`, {
    method: "put",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}
// DELETE A POST
async function deletePost(event) {
  event.preventDefault();
  const postId = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${postId}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#update-post-form")
  .addEventListener("submit", updatePost);

document.querySelector("#delete-btn").addEventListener("click", deletePost);
