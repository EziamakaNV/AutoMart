/* eslint-disable linebreak-style */
const menuBarAnimation = (menu) => {
  menu.classList.toggle('change');
  document.getElementById('myDropDown').classList.toggle('show');
};

const modal = document.getElementById('myModal');

const btn = document.getElementById('myBtn');

const span = document.getElementsByClassName('close')[0];

const adContainer = document.querySelector('#pr-ad-cntnr');

const minPrice = document.querySelector('#minPrice');

const maxPrice = document.querySelector('#maxPrice');

const loader = document.querySelector('#loaderModal');

const errorMessage = document.querySelector('.error-message-div');

btn.onclick = () => {
  modal.style.display = 'block';
};

span.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

window.addEventListener('DOMContentLoaded', async () => {
  errorMessage.style.display = 'block';
  try {
    loader.style.display = 'block';
    const response = await fetch('/api/v1/car?status=available', {
      credentials: 'include',
      method: 'GET',
    });
    const responseBody = await response.json();
    if (response.status === 200) {
      if (responseBody.data.length !== 0) {
        responseBody.data.forEach((car) => {
          adContainer.insertAdjacentHTML('afterbegin', `
            <a href='/car/${car.id}' id='${car.id}'>
            <div class="pr-ad" id="${car.id}">
                <figure>
                    <img class='ad-img' src='${car.imageUrl || 'Images/toyota_camry.jpg'}' alt = 'Car'>
                </figure>
                <div class="pr-ad-details">
                    <p class="item-price">N ${car.price}</p>
                    <p class="item-title">${car.manufacturer} ${car.model}</p>
                </div>
            </div>
            </a>`);
        });
        loader.style.display = 'none';
        errorMessage.style.display = 'none';
      } else {
        // If the response is empty,
        // Remove the loader and let
        // The default message show
        loader.style.display = 'none';
      }
    } else {
      window.location.assign('/profile');
    }
  } catch (error) {
    // Reload the page if there's an error
    window.location.assign('/profile');
  }
});

const filter = async () => {
  modal.style.display = 'none';
  loader.style.display = 'block';

  try {
    const response = await fetch(`/api/v1/car?status=available&min_price=${minPrice.value}&max_price=${maxPrice.value}`, {
      credentials: 'include',
      method: 'GET',
    });
  
    const responseBody = await response.json();
    if (response.status === 200) {
      console.log(responseBody);
      if (responseBody.data.length === 0) {
        loader.style.display = 'none';
        errorMessage.textContent = 'No Ads match your filter specifications';
        errorMessage.style.display = 'block';
        const errTimer = setTimeout(() => { errorMessage.style.display = 'none'; }, 4000);
        clearTimeout(errTimer);
      } else {
        // Clear out existing ads
        while (adContainer.hasChildNodes()) {
          adContainer.removeChild(adContainer.lastChild);
        }
        responseBody.data.forEach((car) => {
          adContainer.insertAdjacentHTML('afterbegin', `
            <a href='/car/${car.id}' id='${car.id}'>
            <div class="pr-ad" id="${car.id}">
                <figure>
                    <img class='ad-img' src='${car.imageUrl || 'Images/toyota_camry.jpg'}' alt = 'Car'>
                </figure>
                <div class="pr-ad-details">
                    <p class="item-price">N ${car.price}</p>
                    <p class="item-title">${car.manufacturer} ${car.model}</p>
                </div>
            </div>
            </a>`);
          loader.style.display = 'none';
        });
      }
    } else {
      loader.style.display = 'none';
      errorMessage.textContent = 'Issue with filter, please try again.';
      errorMessage.style.display = 'block';
      const errTimer = setTimeout(() => { errorMessage.style.display = 'none'; }, 4000);
      clearTimeout(errTimer);
    }
  } catch (error) {
    errorMessage.textContent = `${error}`;
    errorMessage.style.display = 'block';
  }
};

const getNameFromCookie = (cname) => {
  // Code gotten from w3schools
  // Parse the cookie to get the user name
  // https://www.w3schools.com/js/js_cookies.asp
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

window.addEventListener('DOMContentLoaded', () => {
  const userJSON = getNameFromCookie('user');
  const user = JSON.parse(userJSON);
  document.querySelector('#client-name').textContent = `Welcome ${user.first_name} ${user.last_name}`;
});
