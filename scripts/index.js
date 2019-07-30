const { log } = console;

// create new entry
function createCard(el) {
    const newCard = document.createElement('section');
    newCard.innerHTML = `<section class="">
    <div class="avatar-image">
        <img src="${el.image_url}" alt="${el.title}"/>
    </div>
    <div class="avatar-content">
        <h2 class="avatar-header">${el.title}</h2>
        </div>
    </section>`;
    container.appendChild(newCard);
}

// SKELETON ANIMATION use this to move pictures on the home page - UI - DO
function myMove() {
    var elem = document.getElementById('leafy');   
    var pos = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (pos == 350) {
        clearInterval(id);
      } else {
        pos++; 
        elem.style.bottom = pos + 'px'; 
        elem.style.right = pos + 'px'; 
        };
    };
};


function createPage() {
    log('HI');
    // add code here
}


async function fetchData() {
    // user input for desired anime themes
    // const search = prompt('Search for: ');
    const search = 'Grand Blue';
    // encodes search query into URL
    const encodedSearch = encodeURI(search);
    // input is added to actual url
    const animeSearchURL = `https://api.jikan.moe/v3/search/anime?q=${encodedSearch}`;

    //fetch and JSON
    const fetchedAnimeShortData = await fetch(animeSearchURL);
    jsonifiedAnimeShortData = await fetchedAnimeShortData.json();
    const malID = jsonifiedAnimeShortData.results[0].mal_id
    const animeURL = `https://api.jikan.moe/v3/anime/${malID}/`
    const fetchedAnimeLongData = await fetch(animeURL);
    jsonifiedAnimeLongData = await fetchedAnimeLongData.json();
    console.log(jsonifiedAnimeLongData);
    const openingList = jsonifiedAnimeLongData.opening_themes;
    const endingList = jsonifiedAnimeLongData.ending_themes;
    console.log(openingList);
    console.log(endingList);

    const youtubeKey = 'AIzaSyAG-LdE_3FYJCgVxh1T6RdWbgx8SCpSuKg';
    // const youtubeURL = `https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${youtubeKey}&part=snippet,contentDetails,statistics,status`;

    async function searchThemes(item) {
        const youtubeURL = `https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&key=${youtubeKey}&q=${item}`;
        const fetchedYoutubeData = await fetch(youtubeURL);
        const jsonifiedYoutubeData = await fetchedYoutubeData.json();
        console.log(jsonifiedYoutubeData);
        console.log(jsonifiedYoutubeData.items[0].id.videoId);
        console.log(`https://www.youtube.com/watch?v=${jsonifiedYoutubeData.items[0].id.videoId}`);
    }
    
    openingList.forEach(item => searchThemes(item));
    endingList.forEach(item => searchThemes(item));
    

    
    // create page that draws all data
    createPage();
}




fetchData();