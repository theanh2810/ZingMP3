// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".footer");
const cd = $(".cd");
const heading = $("header h2");
const para = $("header h5");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const volume = $("#volume");
const  playAll = $(".upload-play")
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  //config: {},
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
        {
            name: 'Hạ còn vương nắng',
            singer: 'Datkaa',
            path: './Nhac/Haconvuongnang.mp3',
            image: './Images/haconvuongnang.jpg',
            time: '04:51'
        },
        {
            name: 'Cưới thôi',
            singer: 'Masew',
            path: './Nhac/cuoithoi.mp3',
            image: './Images/CuoiThoi.jpg',
            time: '03:01'
        },
        {
            name: 'Ôm trọn nỗi nhớ',
            singer: 'Rum',
            path: './Nhac/Omtronnoinho.mp3',
            image: './Images/Omtronnoinho.jpg',
            time: '04:21'
        },
        {
            name: '3107-3',
            singer: 'W/n ft.(Nâu,Duongg,Titie)',
            path: './Nhac/3107-3.mp3',
            image: './Images/3107.jpg',
            time: '03:55'
        },
        {
            name: 'Độ tộc 2',
            singer: 'MASEW x PHÚC DU x PHÁO x ĐỘ MIXI',
            path: './Nhac/Độ tộc 2.mp3',
            image: './Images/Dotoc2.jpg',
            time: '03:30'
        },
        {
            name: 'Đường tôi chở em về',
            singer: 'buitruonglinh',
            path: './Nhac/Duongtoichoemve.mp3',
            image: './Images/Duongtoichoemve.jpg',
            time: '04:26'
        },
        {
          name: 'Tổn thương cũng không rời đi',
          singer: 'Luna',
          path: './Nhac/Tonthuongcungkoroidi.mp3',
          image: './Images/Tonthuongcungkoroidi.jpg',
          time: '03:06'
      },
      {
        name: 'Người em cố đô',
        singer: 'Rum x Đaa x Toann',
        path: './Nhac/Nguoiemcodo.mp3',
        image: './Images/Nguoiemcodo.jpg',
        time: '02:46'
    },
    {
      name: 'Tình yêu ngủ quên',
      singer: 'Hoàng Tôn (ft.LyHan)',
      path: './Nhac/Tinhyeunguquen.mp3',
      image: './Images/tinhyeunguquen.jpg',
      time: '03:22'
    },
    {
      name: 'Người có thương',
      singer: 'Datkaa ft QT Beatz',
      path: './Nhac/Nguoicothuong.mp3',
      image: './Images/Nguoicothuong.jpg',
      time: '04:34'
    }
    ],
 // setConfig: function (key, value) {
    //this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  //},
  render: function () {
    const htmls = this.songs.map((song, index ) => {
      return `
                        <li class="song ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
                          <div class="image">
                            <img src="${song.image}">
                          </div>
                          <div class="tacgia">
                            <p class="title">${song.name}</p>
                            <p class="author">${song.singer}</p>
                          </div>
                          <div class="thoiluong">${song.time}</div>
                          <div class="option">
                            <i class="fa fas fa-heart"></i>
                            <i class="fa fas fa-ellipsis-h"></i>
                          </div>
                        </li>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    //xu ly am thanh
    volume.onchange = function() {
      audio.volume = volume.value/100
      if(audio.volume==0){
        player.classList.add("volume")
      }else{
        player.classList.remove("volume")
      }
    }
      audio.onloadeddata  = function(){
        let musicDuration = $(".control-time-right");
        //update song total duration
        let audioDuration = audio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10 ){
          totalSec = `0${totalSec}`
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
     };
    // cap nhap thoi gian cua audio
    //tra ve thoi luong cua am thanh
    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

    playAll.onclick = () => {
      this.currentIndex=0;
      _this.loadCurrentSong()
      audio.play();
    }

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function (e) {
      // cap nhap thanh hien thi range theo tien do bai hat
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
      // cap nhap time theo bai hat 
        let musicCurrentTime = $(".control-time-left");
        let currentTime = e.target.currentTime;
          let currentMin = Math.floor(currentTime / 60);
          let currentSec = Math.floor(currentTime % 60);
          if(currentSec < 10 ){
          currentSec = `0${currentSec}`
         }
         musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
    }; 
    // Xử lý khi tua song
    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
     // _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
     // _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    para.textContent = this.currentSong.singer;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  /*loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },*/
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    //this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    //randomBtn.classList.toggle("active", this.isRandom);
   // repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();

const button = $(".btn")
button.onclick = function(){
  button.classList.toggle("active")
}
const display = $(".fa-tshirt")
display.onclick = function() {
  $(".display").classList.toggle("active");
}
const exit = $(".fa-times");
exit.onclick = function() {
  $(".display").classList.remove("active");
}
const themelight = $(".themelight");
themelight.onclick = function() {
  document.body.classList.add("light")
  $(".display").classList.remove("active");
}
const themeblue = $(".themeblue");
themeblue.onclick = function() {
  document.body.classList.remove("light");
  $(".display").classList.remove("active");
}
const slides = $$(".slide");

slides.forEach( (slide) => {
  slide.onclick = () => {
    const sldActive = $(".slide.active")
    if(slide === sldActive){

    }
    else{
      slide.classList.add("active")
      sldActive.classList.remove("active")
    }
  }
});

const upload1 = $(".upload1")
upload1.onclick = () => {
  $("#file").click();
};

const upload2 = $(".upload2")
upload2.onclick = () => {
  $("#file-upload").click();
};
const setting = $(".fa-cog")
setting.onclick = () => {
  $(".setting").classList.toggle("active")
};

const titles = $$(".title")
titles.forEach( title => {
  title.onclick = () => {
    const titleaActive = $(".title.active")
    if(title===titleaActive){

    }
    else{
      title.classList.add("active")
      titleaActive.classList.remove("active")
    }
  }
});
