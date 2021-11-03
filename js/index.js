// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');

  //... your code goes here

  // ParseInt toma como parámetro una cadena de texto y devuelve su equivalente en entero.
  // Por ejemplo: "123" -> 123. En este caso no tomamos el atributo innerText, sino que
  // tomamos el atributo value porque lo estamos leyendo de un elemento <input>
  let quantity = parseInt(
    product.querySelector('.quantity').childNodes[1].value
  );

  // ParseFloat toma como parámetro una cadena de texto y devuelve su equivalente en decimal.
  // Por ejemplo: "1.5" -> 1.5.
  let price = parseFloat(
    product.querySelector('.price').childNodes[1].innerText
  );

  // Multiplicamos la cantidad de elementos por el precio individual y tenemos el subtotal.
  var subtotal = quantity * price;

  // subTotal.ToString nos devuelve el valor del subtotal pero como cadena de texto (Es lo más recomendable),
  // y luego lo muestra en el hijo [1] del elemento con la clase 'subtotal', similar a como leemos los datos pero
  // esta vez hacemos una acción de escritura.
  //toFixed es similar a toString, pero se encarga de fijar un número de decimales, en este caso 2.
  // Por ejemplo: 1 -> "1.00", 4.5 -> "4.50" (Solo para motivos de estética en la visualización).
  product.querySelector('.subtotal').childNodes[1].innerText =
    subtotal.toFixed(2);

  // El valor calculado se muestra en la tabla, entonces ya no es necesario el cuadro de alerta, pero si lo deseas
  // puedes descomentar la siguiente línea.
  // alert('Subtotal = ' + subtotal.toString());

  return subtotal;
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  // const singleProduct = document.querySelector('.product');
  // // updateSubtotal(singleProduct);
  // end of test

  // ITERATION 2
  //... your code goes here

  // Obtenermos todos los elementos con la clase 'product' (Todas las filas de la tabla).
  const productsList = document.querySelectorAll('.product');
  // Iniciamos una variable para obtener el total general de todos los productos.
  let total = 0;
  // Recorremos todos los productos, actualizamos los valores en la tabla y sumamos cada subtotal al total.
  productsList.forEach((product) => {
    total += updateSubtotal(product);
  });

  // ITERATION 3
  //... your code goes here

  // Escribimos el total en el elemento html correspondiente.
  document.getElementById('total-value').childNodes[1].innerText =
    total.toFixed(2);
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);
  //... your code goes here

  // Escalo hasta el nodo padre y borro el hijo seleccionado.
  target.parentNode.parentNode.parentNode.removeChild(
    target.parentNode.parentNode
  );
}

// ITERATION 5

function createProduct(event) {
  //... your code goes here
  // Selecciono el elemento que contiene los datos a insertar.
  const elementToInsert = document.getElementsByClassName('create-product')[0];
  // Selecciono todos los elementos del tipo 'input' porque son los que contienen los datos del nuevo producto.
  const inputElements = elementToInsert.getElementsByTagName('input');
  // Obtengo el nombre y el precio unitario del producto.
  const productName = inputElements[0].value;
  const productPrice = parseFloat(inputElements[1].value);
  // Limpio las cajas de texto para un nuevo ingreso.
  inputElements[0].value = '';
  inputElements[1].value = 0;

  // Defino el fragmento html que se va a insertar en la tabla, e incluyo los datos del nuevo producto.
  let htmlToInsert = `
  <td class="name">
    <span>${productName}</span>
  </td>
  <td class="price">$<span>${productPrice}</span></td>
  <td class="quantity">
    <input type="number" value="0" min="0" placeholder="Quantity" />
  </td>
  <td class="subtotal">$<span>0</span></td>
  <td class="action">
    <button class="btn btn-remove">Remove</button>
  </td>
  `;

  // Obtengo la referencia del tbody de la tabla en la que voy a insertar la nueva fila.
  let table = document.getElementById('cart').getElementsByTagName('tbody')[0];
  // Creo una nueva fila al final del tbody.
  row = table.insertRow();
  // Es importante definir el className para que sea tomada en cuenta en la suma del total.
  row.className = 'product';
  // Agrego el fragmento html en la fila insertada al final del tbody.
  row.innerHTML = htmlToInsert;
  //   El botón de eliminar no funciona sin la siguiente línea. Esto se debe a que la asignación de eventos se hace al cargar la
  // página, por lo que el nuevo botón no tiene escucha del evento click, y por eso debemos definirlo manualmente al momento de
  // crearlo.
  btn = row
    .getElementsByClassName('action')[0]
    .childNodes[1].addEventListener('click', removeProduct);
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  //... your code goes here
  // Para cada botón de eliminar agregamos un escucha de eventos para que se active cada vez que se haga click en uno de estos botones.
  // Por medio del evento se puede conocer cuál fue el botón en el que se hizo click, y esta información ayudará a saber qué elemento eliminar.
  const removeElementBtns = document.getElementsByClassName('btn-remove');
  for (let i = 0; i < removeElementBtns.length; i++) {
    removeElementBtns[i].addEventListener('click', removeProduct);
  }

  document.getElementById('create').addEventListener('click', createProduct);
});
