// Данные будущего бота и его чата 
let token = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
let chat_id = '-XXXXXXXXXXXXX';


//Форма
let userName = document.getElementById('name');
let phone = document.getElementById('phone');
let submit = document.getElementById('send');

//POST к форме
const postData = async (url = '', data = {}) => {
    // Формируем запрос
    const response = await fetch(url, {
      // Метод, если не указывать, будет использоваться GET
      method: 'POST',
     // Заголовок запроса
      headers: {
        'Content-Type': 'application/json'
      },
      // Данные
      body: JSON.stringify(data)
    });
    return response.json(); 
  }

  //Слушаем форму, заменяем строку для наглядности
  window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___)-___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});

let message;

//Слушаем сабмит, собираем все сообщение целиком
submit.onclick = function(evt){
    evt.preventDefault();

    if(!userName.value && !phone.value){
        alert('Не введено имя и/или пароль')
    } else {
        /*Какой-то косяк со знаком + - не приходит в телегу 
        ни под каким соусом. Заменяем +7 на 8 для удобного совершения звонка*/
        let phoneToTg = '8'+phone.value.slice(2).replace(/[^+\d]/g, '');
        message = `name is ${userName.value} and phone is ${phoneToTg}`;
        userName.value = phone.value = null;
        postData(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${message}`)
        .then((message) => {
          // console.log(message);
            if(!message.ok){
            alert('something wrong...(')
          } else {
            alert('с Вами свяжутся')
          }; 
        });
        return(message);
    }
    
};



