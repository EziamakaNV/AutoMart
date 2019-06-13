/* eslint-disable linebreak-style */
const menuBarAnimation = (menu) => {
  menu.classList.toggle('change');
  document.getElementById('myDropDown').classList.toggle('show');
};

const modal = document.getElementById('myModal');

const btn = document.getElementById('myBtn');

const span = document.getElementsByClassName('close')[0];

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

const modal2 = document.getElementById('myModal2');

const btn2 = document.getElementById('myBtn2');

const span2 = document.getElementsByClassName('close2')[0];

btn2.onclick = () => {
  modal2.style.display = 'block';
};

span2.onclick = () => {
  modal2.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === modal2) {
    modal2.style.display = 'none';
  }
};

const errorMessage = document.querySelector('.error-message-div');

const loader = document.querySelector('#loaderModal');

// Get carId from the url
const carId = window.location.pathname.substring(5);

window.addEventListener('DOMContentLoaded', async () => {
  errorMessage.style.display = 'block';
  try {
    loader.style.display = 'block';
    const response = await fetch(`/api/v1/car/${carId}`, {
      credentials: 'include',
      method: 'GET',
    });
    const responseBody = await response.json();
    if (response.status === 200) {
      const car = responseBody.data;
      document.querySelector('.ad-img').src = car.imageUrl || '/Images/toyota_camry.jpg';
      document.querySelector('#itemPrice').textContent = `Price: N ${car.price}`;
      document.querySelector('#manufacturer').textContent = car.manufacturer;
      document.querySelector('#model').textContent = car.model;
      document.querySelector('#bodyType').textContent = car.bodyType;
      document.querySelector('#state').textContent = car.state;
      document.querySelector('#itemDescription').textContent = `Up for sale! - ${car.manufacturer} ${car.model}`;
      document.querySelector('#description').textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos veniam, ullam laudantium laborum libero ex magnam consequatur deserunt voluptatum, temporibus beatae voluptate assumenda est? Quibusdam dicta blanditiis nihil fugiat unde';
      document.querySelector('#po-description').textContent = `FOR: ${car.manufacturer} ${car.model}`;
      document.querySelector('#po-price').textContent = `PRICE: N ${car.price}`;
      loader.style.display = 'none';
      errorMessage.style.display = 'none';
    } else {
      errorMessage.textContent = responseBody.error;
      loader.style.display = 'none';
    }
  } catch (error) {
    errorMessage.textContent = 'Error retreiving car details';
  }
});
