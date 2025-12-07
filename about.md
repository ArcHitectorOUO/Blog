 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/about.md b/about.md
new file mode 100644
index 0000000000000000000000000000000000000000..a19bf1416dc5e01622527b9edaf147598e8f81d2
--- /dev/null
+++ b/about.md
@@ -0,0 +1,27 @@
+---
+layout: single
+title: "關於我"
+author_profile: true
+permalink: /about/
+header:
+  overlay_color: "#0f172a"
+  overlay_filter: "0.55"
+  overlay_image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80"
+  caption: "Photo by [Unsplash](https://unsplash.com)"
+---
+
+你好，我是 **ArcHitectorOUO**，一位熱愛設計細節的開發者。這裡是我紀錄學習、生活觀察與 side projects 的角落，歡迎交流！
+
+## 我在做什麼
+- 💻 前端開發、介面優化與互動微動畫
+- 🛠️ 後端與雲端部署的探索筆記
+- 🧠 以簡報與圖示化幫助自己快速吸收知識
+
+## 信念
+> 「好的設計，應該讓人感覺自然且愉悅。」
+
+因此這個博客也希望兼具可讀性與美感，讓資訊更容易被吸收。
+
+## 聯絡我
+- GitHub: [@ArcHitectorOUO](https://github.com/ArcHitectorOUO)
+- Email: `your-email@example.com`
 
EOF
)
