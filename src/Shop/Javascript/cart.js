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

const label = document.getElementById("label");
const ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

function calculation () {
    let cartIcon = document.getElementById("cartAmount");

    // menjumlahkan semua jumlah item di array dan menampilkannya di keranjang
    cartIcon.innerHTML = basket.map((data) => data.item).reduce((x, y) => x + y, 0);
};

// menampilkan jumlah item yang sesuai di cart saat pindah ke halaman cart
calculation();

// mengenerate item dalam cart dari basket
function generateCartItems () {
    // jika basket tidak kosong, maka akan di print produk dalam basket
    if (basket.length !== 0) {
        return (ShoppingCart.innerHTML = basket
        .map((data) => {
            let { id, item } = data;

            // mencari id pada basket di data json dan memasukkan informasi mengenai produk
            let search = shopItemsData.find((x) => x.id === id) || [];
            return `
        <div class="cart-item">
            <img width="100" height="120" src=${search.img} alt="" />
            <div class="details">

                <div class="title-price-x">
                    <h4 class="title-price">
                        <p> ${search.name}</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                </div>

                <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>

                <h3>Total : Rp ${item * search.price}</h3>
            </div>
        </div>
        `;
        })
        .join(""));
    } 
    
    // jika basket kosong, maka akan dikeluarkan tombol beda
    else {
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Keranjang masih kosong! Silahkan belanja terlebih dahulu.</h2>
        `;
    }
};

generateCartItems();

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

    generateCartItems();
    // akan di update tampilan jumlah barangnya
    update(selectedItem.id);

    // akan di simpan basket yang baru di local storage
    localStorage.setItem("data", JSON.stringify(basket));
};

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

    generateCartItems();

    // akan di simpan basket yang baru di local storage
    localStorage.setItem("data", JSON.stringify(basket));
};

function update (id) {

    // akan dicari di basket item dengan id yang sesuai
    let search = basket.find((data) => data.id === id);

    // akan ditambahkan inner html jumlah item yang ada di basket
    document.getElementById(id).innerHTML = search.item;

    // akan dihitung ulang jumlah item untuk ditampilkan secara total di tombol keranjang
    calculation();
    TotalAmount();
  };

// fungsi untuk membuang item sesuai id
function removeItem (id) {
    let selectedItem = id;

    //membuang item dengan id terpilih dalam basket
    basket = basket.filter((data) => data.id !== selectedItem.id);

    //menjalankan fungsi lain
    generateCartItems();
    TotalAmount();
    calculation();

    localStorage.setItem("data", JSON.stringify(basket));
};

// fungsi untuk menghapus basket
function clearCart () {

    //set basket jadi kosong
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

function TotalAmount () {

    //jika basket tidak kosong
    if (basket.length !== 0) {

        //mencari jumlah dengan mengalikan semua harga dengan jumlah item yang ada di basket dan ditotalkan
        let amount = basket
            .map((x) => {
                let { item, id } = x;
                let search = shopItemsData.find((y) => y.id === id) || [];

                return item * search.price;
            })
            .reduce((x, y) => x + y, 0);

        label.innerHTML = `
        <h2>Grand Total : Rp. ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Hapus Keranjang</button>
        `;
    } 
    
    //jika basket kosong
    else return;
    };

TotalAmount();