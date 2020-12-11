if (document.readyState == 'loading') { //если документ еще не загрузился 
    //Событие DOMContentLoaded  запускается когда первоначальный HTML документ будет полностью загружен и разобран
    document.addEventListener('DOMContentLoaded', ready)
} else { //иначе запускаем функцию ready()
    ready()
}

function ready() { //подключает все кнопки и инпуты для независимой загрузки
    var removeCartItemButtons = document.getElementsByClassName('btn-danger') //получаем элемент класса btn-danger
    for (var i = 0; i < removeCartItemButtons.length; i++) { //перебираем 
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem) //вызываем функцию удаления товара
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input') //получаем элемент инпута
    for (var i = 0; i < quantityInputs.length; i++) { //перебираем их
        var input = quantityInputs[i] 
        input.addEventListener('change', quantityChanged) //вызываем фукнцию изменения количества товаров
    }

    //добавление в корзину товара по клику по кнопке "Добавить в корзину"
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    var changeColor = document.getElementsByClassName('cart')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)//добавляем в корзину
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked) //вызов функции purchaseClicked при нажатии на кнопку "Оформить заказ"
}

function purchaseClicked() { //функция оформления заказа
    alert('Спасибо за Вашу покупку!') //вывод сообщения в браузере
    var cartItems = document.getElementsByClassName('cart-items')[0] //получение элемента товаров корзины
    while (cartItems.hasChildNodes()) { //пока они имеются в корзине
        cartItems.removeChild(cartItems.firstChild) //удаляем их
    }
    updateCartTotal()//обновляем корзину
}

function removeCartItem(event) { //функция удаления товара из корзины
    var buttonClicked = event.target //ссылается на кликнутый элемент
    buttonClicked.parentElement.remove() //удаление родительского блока элемента
    updateCartTotal() //обновление корзины
}

function quantityChanged(event) {//фукнция изменения количества товаров
    var input = event.target //ссылаемся на кликнутый элемент
    if (isNaN(input.value) || input.value <= 0) { //проверка на нечисловое значение инпута или <= нулю
        input.value = 1 // присваиваем ему первоначальную единицу
    }
    updateCartTotal()//обновляем корзину
}

function addToCartClicked(event) { //добавление в коризну по клику
    var button = event.target //ссылаемся на кликнутый элемент
    var shopItem = button.parentElement.parentElement 
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText //получение названия у товара
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText //получение цены у товара
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src //получение изображения у товара
    addItemToCart(title, price, imageSrc) //добавление названия, цены и картинки товара в корзину
    updateCartTotal() //обновление корзины
}

function addItemToCart(title, price, imageSrc) { //функция добавления товаров в корзину
    var cartRow = document.createElement('div') //создания нового div элемента
    cartRow.classList.add('cart-row') // добавление 
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Этот товар уже добавлен в Вашу корзину')
            return
        }
    }
    //html вывод строки товара в корзине
    var cartRowContents = ` 
        <button class="btn-danger" type="button">X</button>
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <input class="cart-quantity-input" type="number" value="1">
        `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem) //удаление товара
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged) //изменение количества у товара
}

function updateCartTotal() { // функция обновления корзины
    var cartItemContainer = document.getElementsByClassName('cart-items')[0] //получаем первый элемент контейнера корзины 
    var cartRows = cartItemContainer.getElementsByClassName('cart-row') //получение всех строк элементов корзины
    var total = 0
    for (var i = 0; i < cartRows.length; i++) { //перебираем элементы корзины
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0] //получение цены товара этой строки
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0] //получение цены товара этой строки
        var price = parseFloat(priceElement.innerText.replace('руб', '')) //убираем обозначение "руб" у товара для получения только числового значения цены
        var quantity = quantityElement.value //получение количества товара
        total = total + (price * quantity) //итоговая стоимость 
    }
    total = Math.round(total * 100) / 100 //округление итоговый стоимости 
    document.getElementsByClassName('cart-total-price')[0].innerText = total + ' руб' //добавление обозначения "руб" к цене товара
}