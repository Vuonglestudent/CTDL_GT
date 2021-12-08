import DoublyLinkedList from './DoublyLinkedList.js';
import Node from './node.js';

// let's select all required tags or elements
const API_KEY = "";
const mainVideo = document.querySelector('#main-Video');
const musicList = document.querySelector('.music-list');
const playlist = document.getElementById('playlist');
const AllLessons = document.querySelector('.AllLessons');
const videoTitle = document.querySelector('.title');
const insertVideo = document.querySelector('#insertVideo');
const nextVideo = document.querySelector('#nextVideo');
const preVideo = document.querySelector('#preVideo');
const deleteVideo = document.querySelector('#deleteVideo');
const ulTag = document.querySelector("ul");
const refreshSearch = document.querySelector('#refreshSearch');
//search input
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
//end
let musicIndex = 1;
let doublyLinkedList;
window.addEventListener('load', async () => {

   //create Node doubly linked list
   doublyLinkedList = new DoublyLinkedList();
   await createPlayListDefault(doublyLinkedList);
   AllLessons.innerHTML = `${doublyLinkedList.size} Lessons`

   //create HTML list video start
   loadPlaylistVideo();
   //create HTML list video end.

   //Load video element first .
   loadMusic(musicIndex);

   //Click insert video
   insertVideo.addEventListener('click', function () {
      doublyLinkedList.printList();
      alertify.prompt('Add link video Youtube', '', '' // Title, label, value
         , function (evt, value) { // click ok
            getYouTubeInfo(`${value}`) // Inser video 1 to list
               .then(function (data) {
                  doublyLinkedList.insertAtEnd(new Node(data));
                  loadPlaylistVideo();
                  if (doublyLinkedList.size == 1) {
                     musicIndex = 1;
                     loadMusic(musicIndex);
                  }
               }).catch(function (err) { console.log(err) });
         }
         , function () { }); // click cance
   }, false);

   nextVideo.addEventListener('click', function () {
      debugger
      if (musicIndex < doublyLinkedList.size) {
         musicIndex = parseInt(musicIndex) + 1;
         loadMusic(musicIndex);
         playMusic();
         playingNow();
      }
   }, false);

   preVideo.addEventListener('click', function () {
      if (musicIndex > 1) {
         musicIndex = parseInt(musicIndex) - 1;
         loadMusic(musicIndex);
         playMusic();
         playingNow();
      }
   }, false);

   deleteVideo.addEventListener('click', function () {
      alertify.confirm('Notification', 'Are you sure, you want to delete this video?' // Title, label
         , function (evt, value) { // click ok
            let deletedNode = doublyLinkedList.returnNode(parseInt(musicIndex) - 1);
            if (deletedNode) {
               debugger
               doublyLinkedList.deleteNode(deletedNode);
               if (musicIndex - 1 >= doublyLinkedList.size) {
                  musicIndex = musicIndex - 1;
               }
               loadPlaylistVideo();
               loadMusic(musicIndex);
            }
         }
         , function () { }); // click cance
   }, false);

   refreshSearch.addEventListener('click', function () {
      inputBox.value = "";
      removeDisabledButton();
      loadPlaylistVideo();
   }, false);

   function playMusic() {
      //mainVideo.play();
      playlist.classList.add('active')
   }

   function loadMusic(indexNumb) {
      if (doublyLinkedList.size > 0) {
         let nodeVideo = doublyLinkedList.returnNode(indexNumb - 1);
         mainVideo.src = `${nodeVideo.video.src}`;
         videoTitle.innerHTML = `${indexNumb}. ${nodeVideo.video.titleVideo}`;
      } else {
         mainVideo.src = ``;
         videoTitle.innerHTML = ``;
      }
   }

   // Add event click to video. Change icon playlist.
   // let's work on play particular song on click
   function playingNow() {
      const allLiTags = playlist.querySelectorAll('li');
      if (allLiTags.length > 0) {
         for (let j = 0; j < doublyLinkedList.size; j++) {
            let getIndex = allLiTags[j]?.querySelectorAll("span")[1].id.split("_")[1];
            if (getIndex >= parseInt(allLiTags[j]?.getAttribute('li-index'))) {
               getIndex = parseInt(allLiTags[j]?.getAttribute('li-index')) - 1;
            }
            if (getIndex) {
               if (allLiTags[j].classList.contains('playing')) {
                  allLiTags[j].classList.remove("playing")
               }
               if (parseInt(getIndex) + 1 == musicIndex) {
                  allLiTags[j].classList.add('playing')
               }
               // adding onclick attribute in all li tags
               allLiTags[j].addEventListener('click', clicked, false);
            }
         }
      }
   }

   function clicked(event) {
      debugger
      var element = event.target;
      // getting li index of particular clicked li tag
      while (element.getAttribute("li-index") == null) {
         element = element.parentNode;
      }
      let getIndex = parseInt(element.querySelectorAll("span")[1].id.split("_")[1]);
      if (getIndex >= parseInt(element.getAttribute('li-index'))) {
         getIndex = parseInt(element.getAttribute('li-index')) - 1;
      }

      musicIndex = parseInt(getIndex) + 1;
      loadMusic(musicIndex);
      playMusic();
      playingNow();
   }
   //end

   //Call API Youtube để lấy data video.
   function getYouTubeInfo(linkVideo) {
      let videoId = linkVideo.match(/[\w\-]{11,}/)[0];
      return $.ajax({
         url: `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`,
         dataType: "jsonp",
         success: function (data) {
            if (data) return data;
         }
      }).promise();
   }

   async function createPlayListDefault(doublyLinkedList) {
      await getYouTubeInfo(`https://youtu.be/Us7HiZIcWb4`) // Insert video 1 to list
         .then(function (data) {
            doublyLinkedList.insertAtEnd(new Node(data));
         }).catch(function (err) { console.log(err) });
      await getYouTubeInfo(`https://youtu.be/2h5ryPi6ZYo`) // Insert video 2 to list
         .then(function (data) {
            doublyLinkedList.insertAtEnd(new Node(data));
         }).catch(function (err) { console.log(err) });
      await getYouTubeInfo(`https://www.youtube.com/watch?v=gcMKdkCdwdY&feature=youtu.be`) // Insert video 3 to list
         .then(function (data) {
            doublyLinkedList.insertAtEnd(new Node(data));
         }).catch(function (err) { console.log(err) });

      await getYouTubeInfo(`https://www.youtube.com/watch?v=xgs5gOCpsAE`) // Insert video 3 to list
         .then(function (data) {
            doublyLinkedList.insertAtEnd(new Node(data));
         }).catch(function (err) { console.log(err) });
      await getYouTubeInfo(`https://www.youtube.com/watch?v=rvd19o03SmA&feature=youtu.be`) // Insert video 3 to list
         .then(function (data) {
            doublyLinkedList.insertAtEnd(new Node(data));
         }).catch(function (err) { console.log(err) });
      await getYouTubeInfo(`https://www.youtube.com/watch?v=VAjnf5M-BB0&feature=youtu.be`) // Insert video 3 to list
         .then(function (data) {
            doublyLinkedList.insertAtEnd(new Node(data));
         }).catch(function (err) { console.log(err) });
      await getYouTubeInfo(`https://youtu.be/N5fkyq-aVkk`) // Insert video 3 to list
         .then(function (data) {
            doublyLinkedList.insertAtEnd(new Node(data));
         }).catch(function (err) { console.log(err) });
      await getYouTubeInfo(`https://youtu.be/qOVAbKKSH10`) // Insert video 3 to list
         .then(function (data) {
            doublyLinkedList.insertAtEnd(new Node(data));
         }).catch(function (err) { console.log(err) });
      await getYouTubeInfo(`https://youtu.be/fsCZf9ROF6c`) // Insert video 3 to list
         .then(function (data) {
            doublyLinkedList.insertAtEnd(new Node(data));
         }).catch(function (err) { console.log(err) });

      await getYouTubeInfo(`https://youtu.be/b5i-MWodJnc`) // Insert video 3 to list
         .then(function (data) {
            doublyLinkedList.insertAtEnd(new Node(data));
         }).catch(function (err) { console.log(err) });
      await getYouTubeInfo(`https://youtu.be/BygB1xl-UWM`) // Insert video 3 to list
         .then(function (data) {
            doublyLinkedList.insertAtEnd(new Node(data));
         }).catch(function (err) { console.log(err) });
   }

   //Load playlist video
   function loadPlaylistVideo(arrayLoad) {
      if (playlist.children.length > 0) {
         while (playlist.firstChild) {
            playlist.removeChild(playlist.firstChild);
         }
      }

      var tempList = [];
      if (arrayLoad) {
         for (let index = 0; index < doublyLinkedList.size; index++) {
            let nodeVideo = doublyLinkedList.returnNode(index);
            let item = arrayLoad.find((a) => a.id == nodeVideo.video.id);
            if (item) {
               tempList.push(item);
            }
         }
      } else {
         for (let index = 0; index < doublyLinkedList.size; index++) {
            let nodeVideo = doublyLinkedList.returnNode(index);
            tempList.push(nodeVideo.video);
         }
      }

      for (let i = 0; i < tempList.length; i++) {
         let nodeVideo = tempList[i];
         let liTag = `<li li-index="${i + 1}">
            <img class="img-video" src="${nodeVideo.image}">
            <div class="row" style="margin-left: 15px">
               <span>${i + 1}. ${nodeVideo.titleVideo}</span>            
            </div>
            <video  class="video_${nodeVideo.id}" src="${nodeVideo.src}" style="display: none;" title="${nodeVideo.titleVideo}"></video>
            <span id="video_${nodeVideo.index}_publish" class="duration"></span>
         </li>`;
         playlist.insertAdjacentHTML('beforeend', liTag);
         let liVideoDuration = ulTag.querySelector(`#video_${nodeVideo.index}_publish`)
         let liVideoTag = ulTag.querySelector(`.video_${nodeVideo.id}`);

         // liVideoTag.addEventListener("loadeddata", () => {
         //    let videoDuration = liVideoTag.duration;
         //    let totalMin = Math.floor(videoDuration / 60);
         //    let totalSec = Math.floor(videoDuration % 60);
         //    // if totalSec is less then 10 then add 0 at the beginging
         //    totalSec < 10 ? totalSec = "0" + totalSec : totalSec
         //    liVideoDuration.innerText = `${totalMin}:${totalSec}`;
         //    // adding t duration attribe which we'll use below
         //    liVideoDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
         // })
      }

      playingNow();
   }

   //search function
   inputBox.onkeyup = (e) => {
      let filterValue = e.target.value;
      disabledButton();
      if (filterValue) {
         let resultFilter = [];
         let temp = [];
         //convert double linklist to array.
         for (let index = 0; index < doublyLinkedList.size; index++) {
            const element = doublyLinkedList.returnNode(index);
            temp.push(element.video);
         }

         resultFilter = temp.filter((data) => {
            return data.titleVideo.toLocaleLowerCase()
               .includes(filterValue.toLocaleLowerCase());
         });
         loadPlaylistVideo(resultFilter);
      } else {
         removeDisabledButton()
         loadPlaylistVideo();
      }
   }

   function disabledButton() {
      insertVideo.setAttribute("disabled", true);
      deleteVideo.setAttribute("disabled", true);
      nextVideo.setAttribute("disabled", true);
      preVideo.setAttribute("disabled", true);
   }

   function removeDisabledButton() {
      insertVideo.removeAttribute("disabled");
      deleteVideo.removeAttribute("disabled");
      nextVideo.removeAttribute("disabled");
      preVideo.removeAttribute("disabled");
   }
})
