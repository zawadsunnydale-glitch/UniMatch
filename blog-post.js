document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("post");
  let localPosts = [];
  try { localPosts = JSON.parse(localStorage.getItem("unimatch_admin_posts") || "[]"); } catch(e){}
  const base = typeof BLOG_POSTS !== "undefined" ? BLOG_POSTS : [];
  const combined = [...localPosts, ...base];
  const post = combined.find(p => p.id === id) || combined[0];
  if (!post) return;

  const titleTag = document.getElementById("postTitleTag");
  const metaDesc = document.getElementById("postMetaDesc");
  const content = document.getElementById("postContent");

  if (titleTag) titleTag.textContent = post.title + " — UniMatch Blog";
  if (metaDesc) metaDesc.setAttribute("content", post.excerpt);

  if (content) {
    const bodyHtml = post.body.map(block => block.h ? `<h3>${block.h}</h3>` : `<p>${block.p}</p>`).join("");
    content.innerHTML = `
      <div class="blog-post-hero">
        <span class="eyebrow">${post.category}</span>
        <h1 class="blog-post-title">${post.title}</h1>
      </div>
      <div class="blog-post-body">${bodyHtml}</div>
    `;
  }
});
