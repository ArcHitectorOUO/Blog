 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/index.md b/index.md
index d1cb69dd154040cea70acfae4433017d88ce59a6..7c5ee3fd09b08d1da197831104d0d417642ac6dc 100644
--- a/index.md
+++ b/index.md
@@ -1,8 +1,62 @@
 ---
 layout: home
 title: "Welcome to 我的個人博客"
+author_profile: true
+header:
+  overlay_color: "#1e293b"
+  overlay_filter: "0.45"
+  overlay_image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
+  caption: "Photo by [Unsplash](https://unsplash.com)"
+  actions:
+    - label: "開始閱讀"
+      url: "/year-archive/"
+    - label: "關於我"
+      url: "/about/"
+feature_row:
+  - image_path: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
+    alt: "寫作"
+    title: "文章與靈感"
+    excerpt: "紀錄學習筆記、開源實驗與生活靈光乍現的瞬間。"
+    url: "/year-archive/"
+    btn_label: "瀏覽文章"
+    btn_class: "btn--primary"
+  - image_path: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=800&q=80"
+    alt: "設計"
+    title: "設計感十足"
+    excerpt: "用清爽的配色與卡片式排版，讓閱讀體驗更輕盈。"
+    url: "/about/"
+    btn_label: "認識作者"
+    btn_class: "btn--inverse"
+  - image_path: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80"
+    alt: "工具"
+    title: "開發者工具箱"
+    excerpt: "分享常用技術棧、開源專案與貼心的小工具。"
+    url: "https://github.com/ArcHitectorOUO"
+    btn_label: "前往 GitHub"
+    btn_class: "btn--success"
+excerpt: "在這裡寫下我的學習與生活筆記，用更好看的版面陪你慢慢看。"
 ---
 
-# 歡迎來到我的博客
+> 用文字與程式碼記錄生活，讓想法持續發芽。
 
-這是我在 GitHub Pages 上架設的第一篇博客文章！
+{% include feature_row %}
+
+<div class="callout">
+  <h3>近期方向</h3>
+  <p>我正在嘗試把生活與開發心得整理成更容易消化的短文，主題可能包含：</p>
+  <ul class="list-no-style">
+    <li>✨ 前端設計與互動的小技巧</li>
+    <li>🛠️ 開源專案紀錄、部署與 CI/CD 筆記</li>
+    <li>📚 值得收藏的學習資源、書摘與工具箱</li>
+  </ul>
+</div>
+
+## 最新文章
+
+想看最近寫了什麼？從這裡快速切入：
+
+- [年曆索引](/year-archive/)：依年份瀏覽所有文章。
+- [關於作者](/about/)：了解我與這個部落格的故事。
+- [GitHub](https://github.com/ArcHitectorOUO)：看看正在進行的 side projects。
+
+感謝造訪，期待你的回應！
 
EOF
)
