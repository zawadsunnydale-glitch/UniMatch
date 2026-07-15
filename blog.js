function formatDate(iso){
  return new Date(iso).toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" });
}

function allPosts(){
  let local = [];
  try { local = JSON.parse(localStorage.getItem("unimatch_admin_posts") || "[]"); } catch(e){}
  const base = typeof BLOG_POSTS !== "undefined" ? BLOG_POSTS : [];
  return [...local, ...base];
}

function renderBlogGrid(filterCategory){
  const grid = document.getElementById("blogGrid");
  if (!grid) return;
  const posts = allPosts().filter(p => !filterCategory || filterCategory === "All" || p.category === filterCategory)
                           .sort((a,b) => new Date(b.date) - new Date(a.date));
  grid.innerHTML = posts.map(p => `
    <a href="blog-post.html?post=${p.id}" class="blog-card">
      <div class="blog-card-body">
        <div class="blog-card-title">${p.title}</div>
        <div class="blog-card-meta">${p.category} · ${formatDate(p.date)}</div>
      </div>
    </a>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const filterWrap = document.getElementById("blogFilters");
  if (filterWrap) {
    const categories = ["All", ...new Set(allPosts().map(p => p.category))];
    filterWrap.innerHTML = categories.map((c,i) => `<button class="tool-tab ${i===0?"active":""}" data-cat="${c}">${c}</button>`).join("");
    filterWrap.addEventListener("click", e => {
      const btn = e.target.closest(".tool-tab"); if (!btn) return;
      document.querySelectorAll("#blogFilters .tool-tab").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      renderBlogGrid(btn.dataset.cat);
    });
  }
  renderBlogGrid("All");
});
