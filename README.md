# 🎨 PosterVerse

PosterVerse is a modern, responsive poster showcase website built using **HTML**, **Bootstrap 5**, **CSS**, and **JavaScript**. It is designed as a portfolio/catalog where customers can browse premium posters and place orders directly through **WhatsApp**, eliminating the need for a shopping cart or payment gateway.



---

## ✨ Features

- 🖼️ Responsive and modern UI
- 🔍 Search posters by title or category
- 🗂️ Category filtering
- ↕️ Sort posters by name and price
- 📱 Fully responsive design
- 🎯 Featured posters section
- 📄 Individual poster detail pages
- 🧩 Support for:
  - Single Posters
  - 3-Panel Split Posters
  - 5-Panel Split Posters
- 📦 JSON-based data management
- 💬 WhatsApp ordering
- ⚡ Fast loading with lazy-loaded images

---

## 📁 Project Structure

```text
PosterVerse/
│
├── index.html
├── posters.html
├── poster.html
├── about.html
├── contact.html
│
├── assets/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── posters.js
│   │   └── poster.js
│   │
│   └── images/
│       ├── hero/
│       ├── posters/
│       ├── icons/
│       └── categories/
│
└── data/
    └── posters.json
```

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)
- Bootstrap Icons
- Google Fonts

---

## 📷 Poster Data Format

All posters are managed from a single JSON file.

Example:

```json
{
  "id": 1,
  "title": "Gojo Satoru",
  "category": "Anime",
  "type": "single",
  "panels": 1,
  "featured": true,
  "badge": "Best Seller",

  "images": [
    "assets/images/posters/single/anime/gojo.webp"
  ],

  "sizes": {
    "A4": 199,
    "A3": 349
  },

  "description": "Premium quality anime poster printed on high GSM paper."
}
```

---

## 📱 WhatsApp Ordering

Customers can place an order directly through WhatsApp.



## 🚀 Running the Project

Clone the repository

```bash
git clone https://github.com/yourusername/posterverse.git
```

Open the project in VS Code.

Install the **Live Server** extension.

Right-click:

```
index.html
```

Choose

```
Open with Live Server
```

> **Note:** Opening the HTML files directly (`file://`) may prevent `posters.json` from loading because browsers restrict local `fetch()` requests.

---

## ➕ Adding a New Poster

1. Add the poster images to:

```
assets/images/posters/
```

2. Add a new object to:

```
data/posters.json
```

3. Refresh the website.

The poster will automatically appear in:

- Featured Posters (if `"featured": true`)
- Posters Gallery
- Search
- Categories
- Sorting
- Poster Details page

No HTML changes are required.

---

## 📐 Recommended Image Sizes

### Hero Banner

Desktop

```
1920 × 900 px
```

Mobile

```
1080 × 1350 px
```

---

### Poster Images

Gallery Thumbnail

```
800 × 1200 px
```

Poster Detail

```
1600 × 2400 px
```

Print Files

```
2480 × 3508 px
(A4 • 300 DPI)
```

---

## 🌟 Future Improvements

- ❤️ Wishlist
- 🌙 Dark Mode
- 🔥 Trending Posters
- 🏷️ Discount Badges
- ⭐ Customer Reviews
- 📱 Instagram Feed
- 🎨 Theme Customization
- 🔎 Advanced Filters
- 🔄 Image Zoom
- 📊 Analytics Dashboard

---


If you like this project, consider giving it a ⭐ on GitHub!
