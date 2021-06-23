"use strict"

let urlID = new URLSearchParams(window.location.search)
let getID = urlID.get("id")
if (getID == null || getID == undefined) {
	window.location.replace("index.html")
} else if (getID !== null || getID !== undefined) {
	var semuaProduk = JSON.parse(localStorage.getItem("semuaProduk"))
	var i = semuaProduk.findIndex( x => x.ID == getID)
	if (i > -1 && i < semuaProduk.length) {
		let slide="", ukurans="", stock ="", cek =''
		if (semuaProduk[i].stok == 1) {
			stock = "Tersedia"
			cek = `
			<div class="cart">
				<button class="addToCart" id="addThis" onclick="addThisItem(this)" data-id="${semuaProduk[i].ID}">T A M B A H &nbsp &nbsp<i class="fas fa-cart-plus"></i> </button>
				<label class="jumlah"><span class="itemCount" data-id="${semuaProduk[i].ID}"> </span>&nbsp ~ &nbsp<i class="fas fa-minus-circle" onclick="lessThisItem(this)" data-id="${semuaProduk[i].ID}"></i></label>
			</div>
			<label class="total">Total harga untuk
				<span class="itemCount" data-id="${semuaProduk[i].ID}"> </span> item ini adalah Rp.
				<span id="total-harga"> </span>.
			</label>
			<a class="order-one" href="order.html?q=one&id=${semuaProduk[i].ID}"> atau, Order untuk 1 item ini</a>
			`
		} else if (semuaProduk[i].stok == 0) {
			stock = "Habis"
			cek = `
			<p class="detail-warning">Mohon maaf untuk sementara item ini sedang habis.<br/>Item akan tersedia kembali beberapa waktu kedepan.</p>
			<label class="total">Total harga untuk
				<span class="itemCount" data-id="${semuaProduk[i].ID}"> </span> item ini adalah Rp.
				<span id="total-harga"> </span>.
			</label>
			`
		}

		for(let image in semuaProduk[i].img){
			slide += `<img class="img" src="image/produk/${semuaProduk[i].img[image]}">`
		}
		for(let n in semuaProduk[i].ukuran) {
			ukurans += `<span>${semuaProduk[i].ukuran[n]}</span>.`
		}
		var content = `
			<div class="catalog pm0">
				<div class="cata-box">
					<div class="cata-left">
						<div class="cata-slide">
							${slide}
							<div class="cata-slide-btn">
								<span class="csButton onSlide"></span>
								<span class="csButton"></span>
								<span class="csButton"></span>
							</div>
						</div><!-- cata slide -->
					</div><!-- cata left -->
					<div class="cata-right">
						<h2><span>${semuaProduk[i].nama}</span><span>Rp. ${semuaProduk[i].harga}</span></h2>
						<div class="prod-detail">
							<table class="table-detail">
								<tr>
									<td>Tipe</td>
									<td>:</td>
									<td id="tipe">${semuaProduk[i].tipe}</td>
								</tr>
								<tr>
									<td>Size</td>
									<td>:</td>
									<td id="ukuran">${ukurans}</td>
								</tr>
								<tr>
									<td>Stok</td>
									<td>:</td>
									<td id="stok">${stock}</td>
								</tr>
							</table>
							${cek}
							<div class="deskripsi">
								<p>${semuaProduk[i].deskripsi}</p>
							</div><!-- cata desc -->
						</div><!-- cata detail -->
					</div><!-- cata right -->
				</div><!-- cata box -->
			</div><!-- cata -->
		`
		document.getElementById("main-catalog").innerHTML = content
	}
}
else {
	window.location.replace("index.html")
}


// window variable
const windowWidth = window.innerWidth
const windowHeight = window.innerHeight

// cart box control
const cartBox = document.querySelector("#cartBox")
const cartIcon = document.querySelector(".shopCartBox")
const cartClose = document.querySelector(".cart-close")
const fullPage = document.querySelector("#full-page")

// all function
const itemsCount = document.querySelectorAll(".itemCount")
if ( localStorage.getItem("joohaCart") == null || localStorage.getItem("joohaCart") == undefined) {
	localStorage.setItem("joohaCart", JSON.stringify([]))
	document.getElementById("cart-action").style.visibility = "hidden"
    document.querySelector("#cart-count").innerHTML = ""
    document.querySelector("#cart-table tbody").innerHTML = `<br><br> &nbsp &nbsp &nbsp &nbsp Belum ada item yang ditambahkan...`
} else {
	loadCek()
	cartList()
}
function cartList() {
    let cartIndex ="", content="", totalItem = 0, totalBayar = 0
    if(JSON.parse(localStorage.getItem("joohaCart")) == 0) {
        document.getElementById("cart-action").style.visibility = "hidden"
        document.querySelector("#cart-count").innerHTML = ""
        cartIndex = `<br><br> &nbsp &nbsp &nbsp &nbsp Belum ada item yang ditambahkan...`
    } else {
        JSON.parse(localStorage.getItem("joohaCart")).map( data => {
            const harga = parseFloat(data.jumlah) * parseFloat(data.harga)
            totalBayar = totalBayar + harga
            totalItem = totalItem + data.jumlah
            content = `
                <tr class="item-cart">
					<td class="img-cell" rowspan="2">
						<div class="cart-img">
							<img src="image/produk/${data.img[0]}">
						</div>
					</td>
					<td class="nama-cell">
						<a class="cart-to-detail" href="detail.html?id=${data.ID}">${data.nama}</i></a>
						<p class="harga-item">Rp. <span>${harga}</span></p>
					</td>
				</tr>
				<tr class="item-cart">
 					<td class="jumlah-cell">
						<span class="item-kontrol" data-id="${data.ID}">
							<i class="fas fa-chevron-left cartLess"></i>
							<span class="jumlah-item">${data.jumlah}</span>
							<i class="fas fa-chevron-right cartAdd"></i>
						</span>
						<i class="fas fa-trash cart-box-close cartDel" data-id="${data.ID}"></i>
					</td>
				</tr>
				`
                cartIndex += content
        })
        document.getElementById("cart-action").style.visibility = "visible"
        document.querySelector("#cart-count").innerHTML = totalItem
        document.querySelector("#tot-item").innerHTML = "Total Item : " + totalItem
        document.querySelector("#tot-harga").innerHTML = "Total Harga : " + totalBayar
    }
    document.querySelector("#cart-table tbody").innerHTML = cartIndex
}
function loadCek() {
	if (semuaProduk[i].stok == 0 ) {
		return
	} else if (semuaProduk[i].stok == 1 ) {
		let params
		JSON.parse(localStorage.getItem("joohaCart")).map( item => {
			if (item.ID == getID) {
				document.getElementsByClassName("jumlah")[0].style.display = "block"
				document.getElementsByClassName("total")[0].style.display = "block"
				document.getElementById("total-harga").innerHTML = parseFloat(item.jumlah) * parseFloat(item.harga)
				params = 1
				itemsCount.forEach((itemCount) => {
					if (itemCount.getAttribute("data-id") == getID) {
						itemCount.innerHTML = item.jumlah
					}
				})
				return
			}
		})
		if (params !== 1) {
			document.getElementsByClassName("jumlah")[0].style.display = "none"
			document.getElementsByClassName("total")[0].style.display = "none"
		}
	}
}
function addThisItem(el){
    let prodID = el.getAttribute("data-id")
    let n = semuaProduk.findIndex( x => x.ID == prodID)
    n == null ? alert("Oopsss... Item tak ditemukan, halaman akan di-reload!") + window.location.reload() : ""
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	let i = joohaCart.findIndex(index => index.ID == prodID)
	let count = 1
	if (i >= 0) {
		joohaCart[i].jumlah =  parseFloat(joohaCart[i].jumlah) + 1
		count = joohaCart[i].jumlah
		localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
	} else {
		let objek = {
			ID : prodID,
			jumlah : 1,
			img : semuaProduk[n].img,
			nama : semuaProduk[n].nama,
			harga : semuaProduk[n].harga
		}
		joohaCart.push(objek)
        localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
	}
	cartList()
	loadCek()
	all()
}
function lessThisItem(el) {
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	const prodID = el.getAttribute("data-id")
    const n = joohaCart.findIndex( x => x.ID == prodID)
	joohaCart[n].jumlah = parseFloat(joohaCart[n].jumlah) - 1
	let jumlah = joohaCart[n].jumlah
	if (jumlah == 0) {
		joohaCart.splice(n, 1)
	}
	localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
	cartList()
	loadCek(prodID)
	all()
}

function cartAdd(el) {
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	const thisID = el.parentElement.getAttribute("data-id")
	let i = joohaCart.findIndex( index => index.ID == thisID)
	i == -1 ? location.reload() : ""
	joohaCart[i].jumlah = parseFloat(joohaCart[i].jumlah) + 1
	localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
	loadCek()
	all()
	cartList()
}
function cartLess(el) {
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	const thisID = el.parentElement.getAttribute("data-id")
	let i = joohaCart.findIndex(index => index.ID == thisID)
	i == -1 ? location.reload() : ""
	let jumlah = parseFloat(joohaCart[i].jumlah) - 1
	if (jumlah == 0) {
		joohaCart.splice(i, 1)
		localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
	} else {
		joohaCart[i].jumlah = jumlah
		localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
	}
	cartList()
	loadCek()
	all()
}
function cartDel(el) {
	const thisID = el.getAttribute("data-id")
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	let i = joohaCart.findIndex( index => index.ID == thisID)
	i == -1 ? location.reload() : ""
	joohaCart.splice(i, 1)
	localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
	cartList()
	loadCek()
	all()
}
function hapusSemua() {
	if (confirm("Anda yakin akan mengahapus semua item dikeranjang anda ?")) {
		localStorage.removeItem("joohaCart")
		localStorage.setItem("joohaCart", JSON.stringify([]))
		cartList()
		loadCek()
	}
}


const slides = document.querySelectorAll(".cata-slide img")
const tombols = document.querySelectorAll(".cata-slide-btn span")

slideThis(6000, 24000)

function slideThis(interval, delay) {
	slides[0].classList.add("onSlide")
	let delaySet = false
	let delaySlide = 1

	function manual(i){
		slides.forEach( img => {
			img.classList.remove("onSlide")
				tombols.forEach( span => {
					span.classList.remove("onSlide")
				})
		})
		slides[i].classList.add("onSlide")
		tombols[i].classList.add("onSlide")
	}

	let x = 1
	var slideS = setInterval(slideShow, interval)
	tombols.forEach( (span, i) => {
		span.onclick = function() {
			clearInterval(slideS)
			manual(parseFloat(i))
			x = parseFloat(i) + 1
			if (delaySet == true) {
				clearTimeout(delaySlide)
			}
			delaySlide = setTimeout(function() {
				slideS = setInterval(slideShow, interval)
			}, delay)
			delaySet = true
		}
	})
	function slideShow(){
		if (x >= slides.length) {
			x = 0
		}
		manual(x)
		++x
	}
}

function all() {
	let price = 0
	let count = 0
	JSON.parse(localStorage.getItem("joohaCart")).map(item => {
		price += parseFloat(item.jumlah) * parseFloat(item.harga)
		count += parseFloat(item.jumlah)
	})
	console.info(price, count)
}


function cartBoxControl() {
	const cartBox = document.querySelector("#cartBox")
	if (cartBox.getBoundingClientRect().left >= windowWidth) {
		cartBox.style.right = 0
		document.getElementById("full-page").classList.toggle("cart")
	} else {
		cartBox.style.right = "-150%"
		document.getElementById("full-page").classList.toggle("cart")
	}
}

window.addEventListener('click', function(e){
	if (e.target.matches('.cart-close')) {
		cartBox.style.right = "-150%"
		document.getElementById("full-page").classList.toggle("cart")
	}
	if (e.target.matches('.cartLess')) {
		cartLess(e.target)
	}
	if (e.target.matches('.cartAdd')) {
		cartAdd(e.target)
	}
	if(e.target.matches('.cartDel')) {
		cartDel(e.target)
	}
	if (e.target.matches('.hapus-semua')) {
		hapusSemua()
	}
	if (e.target.matches('#full-page')) {
		cartBox.style.right = "-150%"
		document.getElementById("full-page").classList.toggle("cart")
	}
	if (e.target.matches('.shopCartBox')) {
		cartBoxControl()
	}
	if (e.target.matches('.tambahItem')) {
		addToCart(e.target)
	}
	if (e.target.matches('span.tipe')) {
		tipeClick(e.target)
		console.info(true)
	}
	console.info(e.target)
})

