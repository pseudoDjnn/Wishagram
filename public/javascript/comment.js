const comment_btn = document.querySelector("#comment-btn");
const form = document.querySelector("#comment-form");

function comment_form() {
  form.classList.toggle("d-none");
  comment_btn.classList.toggle("d-none");
}

async function commentHandler(event) {
  event.preventDefault();
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 2
  ];
  const user_id = form.getAttribute("user-data");
  const comment = form.querySelector('[name="comment"]').value.trim();
  if (comment) {
    const response = await fetch("/api/comments", {
      method: "post",
      body: JSON.stringify({
        comment,
        post_id,
        user_id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  } else {
    alert("Only comments please");
  }
}

document
  .querySelector("#comment-form")
  .addEventListener("submit", commentHandler);
