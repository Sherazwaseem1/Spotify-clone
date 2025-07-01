let songs_list = [];
let Atif_Aslam_list = [];
let English_list = [];
let Hindi_list = [];
let Edward_list = [];
let current_song = null;
let current_index = 0;
let current_duration = 0;
let songplayer = new Audio();
let playing = false;
let previous_song_random = 0;

async function addSongslist() {
  songs_list = [
    "Ballay Ballay - Bin Roye.mp3",
    "Sanu Tere Naal Pyar Ho Gaya - Abrar Ul Haq.mp3",
    "Kehte hain khuda ne raabta - Arijit Singh.mp3",
    "Tajdar E Haram - Atif Aslam.mp3",
    "Woh Lamhe Woh Baatein - Atif Aslam.mp3",
    "Hum kis galli ja rahe hain - Atif Aslam.mp3",
    "Jee Lay Har Pal - Atif Aslam.mp3",
    "Le Ja Tu Mujhe - Atif Aslam.mp3",
    "Stayin_ Alive - Bee Gees.mp3",
    "My Heart Will Go On - Celine Dion.mp3",
    "Danza Khaduro.mp3",
    "Desert Rain.mp3",
    "Stereo Hearts - Gym Class Heroes ft. Adam Levine.mp3",
    "Photograph - Ed Sheeran.mp3",
    "Whatever It Takes - Imagine Dragons.mp3",
    "Ana Aachek - Cheb Khaled.mp3",
    "Waka Waka - Shakira.mp3",
    "Poker Face - Lady GaGa.mp3",
  ];

  Atif_Aslam_list = [
    "Tajdar E Haram - Atif Aslam.mp3",
    "Woh Lamhe Woh Baatein - Atif Aslam.mp3",
    "Hum kis galli ja rahe hain - Atif Aslam.mp3",
    "Le Ja Tu Mujhe - Atif Aslam",
    "Jee Lay Har Pal - Atif Aslam.mp3",
  ];

  English_list = [
    "Stayin' Alive - Bee Gees.mp3",
    "My Heart Will Go On - Celine Dion.mp3",
    "Danza Khaduro.mp3",
    "Desert Rain.mp3",
    "Stereo Hearts - Gym Class Heroes ft. Adam Levine.mp3",
    "Photograph - Ed Sheeran.mp3",
    "Whatever It Takes - Imagine Dragons.mp3",
    "Ana Aachek - Cheb Khaled.mp3",
    "Waka Waka - Shakira.mp3",
    "Lady GaGa - Poker Face.mp3",
  ];

  Hindi_list = [
    "Ballay Ballay - Bin Roye.mp3",
    "Sanu Tere Naal Pyar Ho Gaya - Abrar Ul Haq.mp3",
    "Kehte hain khuda ne raabta - Arijit Singh.mp3",
    "Tajdar E Haram - Atif Aslam.mp3",
    "Woh Lamhe Woh Baatein - Atif Aslam.mp3",
    "Hum kis galli ja rahe hain - Atif Aslam.mp3",
    "Le Ja Tu Mujhe - Atif Aslam",
    "Jee Lay Har Pal - Atif Aslam.mp3",
  ];

  Edward_list = ["Desert Rain.mp3"];
}

async function showsongs() {
  let length = songs_list.length;
  const ulElement = document.getElementById("songsUl");

  ulElement.innerHTML = ` <li id="template" ><img src="images/template_music.svg" alt="template music image">
            <p>Song Name - Song Artist</p>
          </li> `;

  songs_list.forEach((song) => {
    const liElement = document.createElement("li");

    liElement.textContent = song;

    liElement.classList.add("list-item");

    ulElement.appendChild(liElement);
  });

  let element = document.querySelector(".songname");
  element.innerHTML = songs_list[0];
  current_song = songs_list[0];
}

const playmusic = (track) => {
  current_song = track;
  if (!current_duration) {
    songplayer.src = `Music_files/${track}`;
    songplayer.load();
    songplayer.play();
    update_play_button(1);
    let element = document.querySelector(".songname");
    element.innerHTML = track;
  } else {
    songplayer.src = `Music_files/${track}`;
    songplayer.load();
    songplayer.play();
    songplayer.currentTime = current_duration;
    update_play_button(1);
  }
};

// 1 for previous and 2 for next song
function calculate_index(keyword) {
  if (keyword == 1) {
    if (current_index == 0) {
      current_index = songs_list.length - 1;
    } else {
      current_index--;
    }
  } else if (keyword == 2) {
    if (current_index == songs_list.length - 1) {
      current_index = 0;
    } else {
      current_index++;
    }
  } else {
    alert("Error found in the keywords");
  }
  return current_index;
}

// 1 for pause and 2 for play  Need to work on this!
function update_play_button(keyword) {
  let element = document.querySelector(".play");
  if (keyword == 1) {
    element.innerHTML = `<img src="images/pause.svg" alt="pausebutton" class = "pausebutton" />`;
  } else if (keyword == 2) {
    element.innerHTML = `<img src="images/Mainplay.svg" alt="playbutton" class = "playbutton" />`;
  } else {
    alert("Error found in the keywords");
  }
}

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

// function dynamic_Album(word) {
//   if (String(word) == "Atif Aslam") {
//     console.log("Atif Aslam got it");
//   }
// }

async function addEventListener() {
  let element = document.querySelector(".play");
  let previous = document.querySelector(".previous");
  let next = document.querySelector(".next");
  let total_duration = 0;

  // For the pause functionality
  element.addEventListener("click", () => {
    if (songplayer.paused) {
      current_duration = songplayer.currentTime;
      playmusic(current_song);
      play = document.querySelector("play");
      element.innerHTML = `<img src="images/pause.svg" alt="pausebutton" class = "pausebutton" />`;
    } else {
      songplayer.pause();
      element.innerHTML = `<img src="images/Mainplay.svg" alt="playbutton" class = "playbutton" />`;
    }
  });

  // For the previous functionality
  previous.addEventListener("click", () => {
    current_index = calculate_index(1);
    current_song = songs_list[current_index];
    current_duration = 0;
    playmusic(current_song);
  });

  // For the next functionality
  next.addEventListener("click", () => {
    current_index = calculate_index(2);
    current_song = songs_list[current_index];
    current_duration = 0;
    playmusic(current_song);
  });

  //Adding the volume functionality
  document
    .querySelector(".volumerange")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      console.log(e.target.value);
      songplayer.volume = parseInt(e.target.value) / 100;
      if (songplayer.volume == 0) {
        let element = document.querySelector(".volumeimg");
        element.src = "images/mute.svg";
      } else {
        let element = document.querySelector(".volumeimg");
        element.src = "images/volume.svg";
      }
    });

  // Functionality for library music
  document.querySelector(".songslist").addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("list-item")) {
      current_song = e.target.textContent;
      current_duration = 0;
      for (i = 0; i < songs_list.length; i++) {
        if (songs_list[i] == current_song) {
          current_index = i;
        }
      }
      playmusic(current_song);
    }
  });

  // Time update event listeners
  songplayer.addEventListener("timeupdate", (e) => {
    current_duration = secondsToMinutesSeconds(songplayer.currentTime);
    total_duration = secondsToMinutesSeconds(songplayer.duration);
    document.querySelector(
      ".timecounter"
    ).innerHTML = `${current_duration} / ${total_duration}`;
    document.querySelector(".circle").style.left =
      (songplayer.currentTime / songplayer.duration) * 100 + "%";
  });

  // Time bar event listeners
  document.querySelector(".playtime").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    songplayer.currentTime = (songplayer.duration * percent) / 100;
  });

  // Card Box event listeners
  Array.from(document.getElementsByClassName("cardbox")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      let keyword = Array(
        item.currentTarget.getElementsByTagName("h2")[0].innerHTML
      );
      keyword = String(keyword);

      if (keyword == "Atif Aslam") {
        songs_list = Atif_Aslam_list;
        const ulElement = document.getElementById("songsUl");
        ulElement.innerHTML = "";
        let a = await showsongs();
      } else if (keyword == "English Songs") {
        songs_list = English_list;
        const ulElement = document.getElementById("songsUl");
        ulElement.innerHTML = "";
        let a = await showsongs();
      } else if (keyword == "Desi Hits") {
        songs_list = Hindi_list;
        const ulElement = document.getElementById("songsUl");
        ulElement.innerHTML = "";
        let a = await showsongs();
      }
    });
  });

  //Shuffle Functionality
  document.querySelector(".shuffle").addEventListener("click", (e) => {
    let number = Math.floor(Math.random() * songs_list.length);
    while (number == previous_song_random) {
      let number = Math.floor(Math.random() * songs_list.length);
      previous_song_random = number;
    }
    current_duration = 0;
    playmusic(songs_list[number]);
  });

  // Hamburger Functionality
  document.querySelector("#hamburger").addEventListener("click", (e) => {
    let element = document.querySelector(".left");
    element.style.left = 0;
  });

  // Close button functionality
  document.querySelector("#close").addEventListener("click", (e) => {
    let element = document.querySelector(".left");
    element.style.left = "-100%";
  });

  //The top next and previous buttons
  document.querySelector("#right_arrow").addEventListener("click", (e) => {
    current_index = calculate_index(2);
    current_song = songs_list[current_index];
    current_duration = 0;
    playmusic(current_song);
  });

  document.querySelector("#left_arrow").addEventListener("click", (e) => {
    current_index = calculate_index(1);
    current_song = songs_list[current_index];
    current_duration = 0;
    playmusic(current_song);
  });

  //Home button
  document.querySelector("#Home_box").addEventListener("click", async (e) => {
    let result = await addSongslist();
    let a = await showsongs();
  });
}

async function main() {
  let result = await addSongslist();
  let a = await showsongs();

  addEventListener();
}

main();
