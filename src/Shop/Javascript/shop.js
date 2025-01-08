/* kode ini menambahkan atau menghilangkan is.active pada elemen menu navbar */ 
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const accountButton = document.querySelector('#accountButton');

if (!!localStorage.getItem("userName")){
  accountButton.innerHTML = "Sign Out";
  accountButton.className = "button buttonRed";
  accountButton.onclick = () => {
  localStorage.removeItem("userName");
  accountButton.innerHTML = "Sign In";
  accountButton.className = "button buttonGreen";
  accountButton.onclick = () => {
    window.location.assign('signIn.html');
  }
  }
}

else{
  accountButton.onclick = () => {
    window.location.assign('signIn.html');
  }
}

menu.addEventListener('click', function() {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});

// Memasukkan data dari file json ke data
const shopItemsData = [];

for(i=0; i < dataItems.length; i++){
    shopItemsData.push(dataItems[i]);
}


const shop = document.getElementById("shop");

// menyiapkan variabel basket dengan local storage
let basket = JSON.parse(localStorage.getItem("data")) || [];

// fungsi untuk memasukkan semua barang ke dalam website. Fungsi akan memasukkan elemen html ke website
function generateShop () {
  return (shop.innerHTML = shopItemsData
    .map((data) => {
      let { id, name, price, desc, img } = data;

      //mencari di basket
      let search = basket.find((data) => data.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
        <img width="220" height="220" src=${img} alt="">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>Rp. ${price} </h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));
};

generateShop();

// fungsi untuk menambah barang saat ditekan tombol +
function increment (id) {

    let selectedItem = id;

    // akan dicari barang dengan id yang sama di basket
    let search = basket.find((data) => data.id === selectedItem.id);
  
    // apabila barang tidak ada di basket, maka akan dibuat id baru di basket
    if (search === undefined) {
      basket.push({
        id: selectedItem.id,
        item: 1,
      });
    
    // apabila barang sudah ada di basket, maka jumlah barang akan ditambah 1
    } else {
      search.item += 1;
    }

    // akan di update tampilan jumlah barangnya
    update(selectedItem.id);

    // akan di simpan basket yang baru di local storage
    localStorage.setItem("data", JSON.stringify(basket));
};

// fungsi untuk mengurangi barang saat ditekan tombol -
function decrement (id) {

    let selectedItem = id;

     // akan dicari barang dengan id yang sama di basket
    let search = basket.find((data) => data.id === selectedItem.id);
  
    // apabila tidak ada item, maka tidak akan dikurangin
    if (search === undefined) return;
    // apabila item jumlahnya 0, maka tidak akan dikurangin
    else if (search.item === 0) return;

    // apabila item jumlahnya 1 atau lebih, akan dikurangin
    else {
      search.item -= 1;
    }

    // akan di update di tampilan jumlah barangnya
    update(selectedItem.id);

    // akan dibuang dari basket bila
    basket = basket.filter((data) => data.item !== 0);

    // akan di simpan basket yang baru di local storage
    localStorage.setItem("data", JSON.stringify(basket));
};

// fungsi untuk mengupdate angka di tampilan
function update (id) {

    // akan dicari di basket item dengan id yang sesuai
    let search = basket.find((data) => data.id === id);

    // akan ditambahkan inner html jumlah item yang ada di basket
    document.getElementById(id).innerHTML = search.item;

    // akan dihitung ulang jumlah item untuk ditampilkan secara total di tombol keranjang
    calculation();
  };
  
// fungsi untuk menghitung jumlah barang di keranjang
function calculation () {
    let cartIcon = document.getElementById("cartAmount");

    // menjumlahkan semua jumlah item di array dan menampilkannya di keranjang
    cartIcon.innerHTML = basket.map((data) => data.item).reduce((x, y) => x + y, 0);
};
  
// setiap program di run, akan dihitung total barang di keranjang
calculation();