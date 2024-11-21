import data from './data/data.js';
const rating = data.rating;
const friends = data.friends;

// ПЕРЕМЕЩЕНИЕ ПЕРСОНАЖА

const points = document.querySelectorAll('.map__point');
const map = document.querySelector('.map');
const hero = document.querySelector('.map__hero');
const toUniversity = document.querySelector('.nav__university');

let currentDistance = window
  .getComputedStyle(hero)
  .getPropertyValue('offset-distance');

function move(point) {
  const offsetDistance = window
    .getComputedStyle(point)
    .getPropertyValue('offset-distance');
  hero.style.setProperty('offset-distance', offsetDistance);
  currentDistance = offsetDistance;
}

map.onclick = function (event) {
  if (event.target.classList.contains('map__point')) {
    move(event.target);
  }
};

toUniversity.onclick = function () {
  const pointsArr = Array.from(points);
  const currentPoint = pointsArr.find((point) => {
    return (
      window.getComputedStyle(point).getPropertyValue('offset-distance') ===
      currentDistance
    );
  });
  const nextPointIndex = pointsArr.indexOf(currentPoint) + 1;
  pointsArr[nextPointIndex]
    ? move(pointsArr[nextPointIndex])
    : move(pointsArr[0]);
};

// КАРУСЕЛЬ ДРУЗЕЙ СЛАЙД

const carouselLeft = document.querySelector('.friends__button-left');
const carouselRight = document.querySelector('.friends__button-right');
const friendsList = document.querySelector('.friends__list');
const friendsWindow = document.querySelector('.friends__window');

function swipeFriend(lenght) {
  const currentLeft = parseInt(friendsList.style.left);
  friendsList.style.left = currentLeft + lenght + 'px';
}

carouselRight.onclick = () => {
  const windowWidth = parseInt(friendsWindow.style.width);
  const friendsWidth = parseInt(window.getComputedStyle(friendsList).width);
  const currentLeft = parseInt(friendsList.style.left);
  if (currentLeft > windowWidth - friendsWidth) {
    swipeFriend(-62);
  }
};

carouselLeft.onclick = () => {
  const currentLeft = parseInt(friendsList.style.left);
  if (currentLeft < 0) {
    swipeFriend(62);
  }
};

// КАРУСЕЛЬ ДРУЗЕЙ ГЕНЕРАЦИЯ

if (friends.length) {
  friendsList.innerHTML = ``;
  friends.forEach((user) => {
    const friend = document.createElement('li');
    friend.classList.add('friends__friend');
    friend.classList.add('friends__friend--used');
    if (user.img)
      friend.innerHTML = `<img
              class="friends__avatar"
              src=${user.img}
              alt="Нет фото"
            />`;
    friendsList.appendChild(friend);
  });
  const lengthDifference = 7 - friends.length;
  for (let i = 0; i < lengthDifference; i++) {
    const emptyFriend = document.createElement('li');
    emptyFriend.classList.add('friends__friend');
    friendsList.appendChild(emptyFriend);
  }
}

// МОДАЛЬНОЕ ОКНО

const openLeadersBtn = document.querySelector('.nav__leaders');
const closeLeadersBtn = document.querySelector('.modal__close');
const modal = document.querySelector('.modal');

openLeadersBtn.onclick = function () {
  modal.classList.add('modal--opened');
};

closeLeadersBtn.onclick = function () {
  modal.classList.remove('modal--opened');
};

// МОДАЛЬНОЕ ОКНО ГЕНЕРАЦИЯ

const leadersList = document.querySelector('.modal__leaders-list');

if (rating.length) {
  leadersList.innerHTML = ``;
  const sortedRating = [...rating].sort(
    (a, b) => parseInt(b.points) - parseInt(a.points)
  );
  sortedRating.forEach((user, index) => {
    const leader = document.createElement('tr');
    leader.classList.add('modal__leader');

    leader.innerHTML = `<td class="modal__top-td">${index + 1}</td>
                <td class="modal__name-td">${user.name} ${user.lastName}</td>
                <td class="modal__exp-td">${user.points}</td>`;
    leadersList.appendChild(leader);

    const avatarTd = document.createElement('td');
    avatarTd.classList.add('modal__avatar-td');

    const avatarImg = new Image();
    avatarImg.src = user.img;
    avatarImg.onerror = () =>
      (avatarTd.innerHTML = `<img class="modal__avatar-img" src="./img/person.svg" alt="Иконка чата" />`);
    avatarImg.onload = () =>
      (avatarTd.innerHTML = `<img class="modal__avatar-img modal__avatar-img--onload" src=${user.img} alt="Иконка чата" />`);
    leader.insertBefore(avatarTd, leader.children[1]);

    if (friends.some((item) => item.id === user.id))
      leader.classList.add('modal__leader--friend');
  });

  const lengthDifference = 6 - sortedRating.length;

  for (let i = 0; i < lengthDifference; i++) {
    const emptyLeader = document.createElement('tr');
    emptyLeader.classList.add('modal__leader');
    emptyLeader.innerHTML = `<td class="modal__top-td"></td>
                  <td class="modal__avatar-td"></td>
                  <td class="modal__name-td"></td>
                  <td class="modal__exp-td"></td>`;
    leadersList.appendChild(emptyLeader);
    console.log('what');
  }
}
