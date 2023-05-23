const burger = document.querySelector(".burger");
const list = document.querySelector(".header__list");
const listItem = document.querySelectorAll(".list-item");
const headerBox = document.querySelector(".header__box");

const handleMenu = (event) => {
  event.stopPropagation();
  if (list.style.display === "block") {
    list.style.display = "none";
    list.classList.remove("burger-mobile");
    listItem.forEach((item) => {
      item.classList.remove("visible");
      item.classList.add("hidden");
    });
  } else {
    list.style.display = "block";
    list.classList.add("burger-mobile");
    listItem.forEach((item) => {
      item.classList.remove("hidden");
      item.classList.add("visible");
    });
  }
};

//handleClickOutsideHook
function hideOnClickOutside(element) {
  list.style.display = "block";
  const outsideClickListener = (event) => {
    if (!element.contains(event.target) && isVisible(element)) {
      element.style.display = "none";
      removeClickListener();
    }
  };

  const removeClickListener = () => {
    document.removeEventListener("click", outsideClickListener);
  };

  document.addEventListener("click", outsideClickListener);
}

const isVisible = (elem) => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

// document.addEventListener("click", () => hideOnClickOutside(list));
burger.addEventListener("click", handleMenu);

$(document).ready(function () {
  $(".slider").slick({
    slidesToShow: 1,
    prevArrow: $(".arrow-left"),
    nextArrow: $(".arrow-right"),
  });

  $(".leave__request").click(function () {
    $(".modal").show();
    $(".modal-background").show();
  });

  $(".modal-close").click(hideModal);

  function hideModal() {
    $(".modal").hide();
    $(".modal-background").hide();
  }

  $(".callme").click(sendEmail);
});

function sendEmail(e) {
  const name = document.getElementById("modal-name").value;
  const number = document.getElementById("modal-number").value;
  const checkbox = document.getElementById("checkbox").checked;

  const notmodalname = document.getElementById("notmodal-name").value;
  const notmodalnumber = document.getElementById("notmodal-number").value;

  if (e.target.name === "notmodal") {
    if (notmodalname === "" || notmodalnumber === "") return;
  } else {
    if (name === "" || number === "" || !checkbox) return;
  }

  e.preventDefault();

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "umbetov.syrym@gmail.com",
    Password: "4AC764E122E88910BC3C461B72CFA2457231",
    To: "t.masanov@stonrog.kz",
    From: "umbetov.syrym@gmail.com",
    Subject: "Заявка",
    Body: `
    <section style="width: 600px; box-sizing: border-box">
    <div style="position: relative; width: 600px; height: 42px; background: #213944">
      <div
        style="
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 500;
          font-size: 11px;
          line-height: 24px;
          color: #939393;
          text-align: right;
          margin-right: 30px;
        "
      >
        <a href="https://b2b.stonrog.kz">
          Перейти на сайт
        </a>
      </div>
    </div>
    <img style="display: block" src="https://i.ibb.co/X8XYQVf/logo.png" />
    <img style="display: block; width: 600px" src="https://i.ibb.co/2hnYx1F/page1-img2.png" />
    <div style="padding: 20px 40px">
      <h1>Заявка с сайта B2B Stonrog</h1>
      <div style="margin-bottom: 100px">
        <div style="margin-bottom: 20px">
          <b>Имя:</b>
          <span style="color: #939393">${name}</span>
        </div>
        <div>
          <b>Телефон:</b>
          <span style="color: #939393">${number}</span>
        </div>
      </div>
      <hr style="border-color: #f1f1f1" />
      <h2 style="text-align: center">Мы в соц.сетях:</h2>
      <div style="color: #939393; text-align: center">Получайте актуальную информацию в удобном формате</div>
      <div
        style="
          display: flex;
          justify-content: center; 
          align-items: center; 
          gap: 30px; 
          margin-left: 170px;
          margin-right: 150px;
  
          margin-top: 30px;
        "
      >
        <img style="display: block; cursor:pointer" src="https://i.ibb.co/DzYjbr5/facebook.png" alt="" />
        <img style="display: block; cursor:pointer; margin: 0 10px" src="https://i.ibb.co/M7PrBMx/instagram.png" alt="" />
        <img style="display: block; cursor:pointer" src="https://i.ibb.co/5jhV1Rh/telegram.png" alt="" />
        <img style="display: block; cursor:pointer;  margin: 0 10px" src="https://i.ibb.co/7VYN1TJ/whatsapp.png" alt="" />
      </div>

      <div style="margin-top: 100px; text-align: center; font-size: 14px; color: #939393">
        Вся полезная информация по сервису находиться по ссылкам ниже
      </div>
      <div style="display: flex; justify-content: center">
        <ul
          style="
            display: flex;
            list-style-type: none;
            justify-content: space-evenly;
            width: 300px;
            align-items: center;
            color: #939393;
            margin-left: 130px;
            margin-right: 150px;
          "
        >
          <li style="text-decoration: underline">Инфо</li>
          <li style="text-decoration: underline">Сервис</li>
          <li style="text-decoration: underline">Отписаться</li>
        </ul>
      </div>
    </div>
  </section>`,
  })
    .then((message) => console.log(message))
    .then(() => toastr.info("Ваше письмо отправлено. Мы вам обязательно перезвоним."))
    .then(() => {
      if (e.target.name !== "notmodal") {
        const modal = document.querySelector(".modal");
        const modalback = document.querySelector(".modal-background");

        modal.style.display = "none";
        modalback.style.display = "none";
      }
    });

  return true;
}
document.addEventListener("DOMContentLoaded", function () {
  const number = document.getElementById("modal-number");
  const notmodalnumber = document.getElementById("notmodal-number");
  validate(number);
  validate(notmodalnumber);
});

function validate(element) {
  element.oninvalid = function (e) {
    e.target.setCustomValidity("");
    if (!e.target.validity.valid) {
      e.target.setCustomValidity("Введите номер телефона в правильном формате. Номер начинается +77");
    }
    element.oninput = function (e) {
      e.target.setCustomValidity("");
    };
  };
}

// document.addEventListener("DOMContentLoaded", function () {
//   var elements = document.getElementsByTagName("INPUT");
//   for (var i = 0; i < elements.length; i++) {
//     elements[i].oninvalid = function (e) {
//       e.target.setCustomValidity("");
//       if (!e.target.validity.valid) {
//         e.target.setCustomValidity("This");
//       }
//     };
//     elements[i].oninput = function (e) {
//       e.target.setCustomValidity("");
//     };
//   }
// });
