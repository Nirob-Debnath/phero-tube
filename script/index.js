const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("video-container").classList.add("hidden");
}

const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");
}

function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for (let btn of activeButtons) {
        btn.classList.remove("active");
    }
}

function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
}

function displayCategory(categories) {
    const categoryContainer = document.getElementById("category-container");
    for (let cat of categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `<button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D]">${cat.category}</button>`;
        categoryContainer.append(categoryDiv);
    }
}

loadCategories();

function loadVideos(searchText = "") {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const clickedButton = document.getElementById("btn-all");
            clickedButton.classList.add("active");
            displayVideos(data.videos);
        })
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";
    if (videos.length === 0) {
        videoContainer.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center text-center py-20">
            <img class="w-[120px]" src="./assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Sorry, No content here!</h2>
        </div>
        `;
        hideLoader();
        return;
    }
    videos.forEach((video) => {
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
            <figure class="relative">
                <img class="w-full h-[150px] object-cover" src=${video.thumbnail} alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white bg-black px-2 text-sm rounded">${video.others.posted_date}</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                            <img src=${video.authors[0].profile_picture} />
                        </div>
                    </div>
                </div>
                <div class="intro">
                    <h2 class="text-sm font-semibold">${video.title}</h2>
                    <p class="text-sm text-gray-400 flex gap-2">${video.authors[0].profile_name} 
                    ${video.authors[0].verified === true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt="">` : ''}
                    </p>
                    <p class="text-sm text-gray-400">${video.others.views} views</p>
                </div>
            </div>
            <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
        </div>
        `;
        videoContainer.append(videoCard);
        hideLoader();
    });
}

const loadCategoryVideos = (id) => {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add("active");
            displayVideos(data.category);
        })
}

const loadVideoDetails = (videoid) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoid}`)
        .then(res => res.json())
        .then(data => displayVideoDetails(data.video))
}

const displayVideoDetails = (video) => {
    console.log(video)
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full w-96 shadow-sm">
        <figure>
                <img src="${video.thumbnail}" alt="Shoes" />
        </figure>
        <div class="card-body">
                <h2 class="card-title">${video.title}</h2>
                <p>${video.description}</p>
        </div>
    </div>
    `;
}

document.getElementById("search-input").addEventListener("keyup", (e) => {
    const input = e.target.value;
    loadVideos(input);
});