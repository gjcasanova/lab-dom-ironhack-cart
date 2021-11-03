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
  target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
}

// ITERATION 5

function createProduct() {
  //... your code goes here
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  //... your code goes here
  const removeElementBtns = document.getElementsByClassName('btn-remove');
  for (let i = 0; i < removeElementBtns.length; i++) {
    removeElementBtns[i].addEventListener('click', removeProduct);
  }
});
