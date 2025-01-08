/* kode ini menambahkan atau menghilangkan is.active pada elemen menu */ 
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

let basket = JSON.parse(localStorage.getItem("data")) || [];

// fungsi untuk menghitung jumlah barang di keranjang
function calculation () {
  let cartIcon = document.getElementById("cartAmount");

  // menjumlahkan semua jumlah item di array dan menampilkannya di keranjang
  cartIcon.innerHTML = basket.map((data) => data.item).reduce((x, y) => x + y, 0);
};

// setiap program di run, akan dihitung total barang di keranjang
calculation()

const barChart = document.getElementById('barChart');
const pieChart = document.getElementById('pieChart');

Chart.defaults.backgroundColor = '#77ffa4';
Chart.defaults.borderColor = '#36A2EB';
Chart.defaults.color = 'white';
Chart.defaults.font.size = 10;

new Chart(barChart, {
  type: 'bar',
  data: {
      labels: ['Singapura', 'Vietnam', 'Brunei', 'Malaysia', 'Thailand', 'Indonesia','Filipina','Kamboja'],
      datasets: [{
          label: 'Skor Kemampuan Matematika',
          data: [575, 468, 442, 409, 394, 366, 355, 336],
          backgroundColor:['#23c552','#23c552','#23c552','#23c552','#23c552','#f84f31','#23c552','#23c552'],
          borderWidth: 1
      }]
  },
  options: {
    responsive:true,
    maintainAspectRatio: false,
      scales: {
          y: {
              beginAtZero: true
          }
      },
    plugins: {
      legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Skor Kemampuan Matematika Negara ASEAN',
          font:{
            size: 15
          }
        }
      
      } 
  }
});

new Chart(pieChart, {
  type: 'pie',
  data: {
    labels: [
      'Aktuaria',
      'Data Analitik',
      'Optimasi',
      'Mat Murni'
    ],
    datasets: [{
      label: 'Anggota Peminatan',
      data: [70000, 16000, 4000,10000],
      backgroundColor: ['#FF7F85', '#FFB366', '#FFD966', '#89DFA6'],
      hoverOffset: 4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend:{
        position:'bottom'
      },
      title: {
          display: true,
          text: 'Anggota Tutor Online',
          font:{
            size: 15
          }
      }
  }
}
});
