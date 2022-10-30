const newPost = document.querySelector("#new-post-form");

// const cloudinary_url = "https://api.cloudinary.com/1_1/dpzhkh1il/upload";
// const cloud_upload_preset = "olyqsw50";
// const imageUpload = document.getElementById("image");
// imageUpload.addEventListener("change", function (event) {
//   // console.log(imageUpload.value);
//   const uploadFile = event.target.files[0];
//   // console.log(uploadFile);
// });

async function addPostHandler(event) {
  event.preventDefault();
  console.log(addPostHandler);
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;
  const image = document.querySelector("#image");
  console.log(image.value);
  // const uploaded_image = "";

  const user_id = newPost.getAttribute("user-data");

  if (title && content && image) {
    const data = new FormData();
    console.log(data);

    if (image.files && image.files.length) {
      data.append("image", image.files[0]);
    }

    data.append("title", title);
    data.append("content", content);
    data.append("image", image);
    data.append("user_id", user_id);

    // newPost.addEventListener("load", () => {
    //   image = data.result;
    //   document.querySelector(
    //     "#display_image"
    //   ).style.backgroudnImage = `url("${image})`;
    // });
    // newPost.readAsDataURL(this.files);

    const response = await fetch("/api/posts", {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      // image.src = event.data;
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
