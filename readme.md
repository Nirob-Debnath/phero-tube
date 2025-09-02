# Live site: https://nirob-debnath.github.io/phero-tube/
# PH Tube

PH Tube is a web-based video streaming application where users can browse and watch videos sorted by categories such as music, comedy, and tutorials.

## Features

- Responsive Navbar with:
  - PH-Tube logo (left)
  - Search box and button (center)
  - Sort button (right)
  - Bottom border
- Dynamic Category Section:
  - Loads all category buttons from API
  - Centered category buttons
  - Clicking a button loads specific category data
  - Active button functionality for better UX
- Dynamic Video Section:
  - Loads all videos from API
  - Card layout for videos
  - Shows verified badge (if verified)
  - Clicking a video shows details and author info in a modal
  - Shows "No Video" icon if a category has no videos
- Search Functionality:
  - Search box to find videos by title
  - Deactivates active category button and shows matched videos only

## REST API Endpoints

- **Get Categories**
  - `GET https://openapi.programming-hero.com/api/phero-tube/categories`
- **Get All Videos**
  - `GET https://openapi.programming-hero.com/api/phero-tube/videos`
- **Get Videos by Category**
  - `GET https://openapi.programming-hero.com/api/phero-tube/category/{categoryId}`
  - Example: `https://openapi.programming-hero.com/api/phero-tube/category/1001`
- **Get Videos by Title**
  - `GET https://openapi.programming-hero.com/api/phero-tube/videos?title={videoTitle}`
  - Example: `https://openapi.programming-hero.com/api/phero-tube/videos?title=shape`
- **Get Video Details by ID**
  - `GET https://openapi.programming-hero.com/api/phero-tube/video/{video_id}`
  - Example: `https://openapi.programming-hero.com/api/phero-tube/video/aaac`

## Additional Information

- Built with HTML, CSS (Tailwind), and JavaScript
- Uses Programming Hero's open REST API

---

Feel free to contribute or suggest improvements!
