"use strict"

let urlID = new URLSearchParams(window.location.search)
let getID = urlID.get("id")
if (getID == null || getID == undefined) {
	window.location.replace("index.html")
} else if (getID !== null || getID !== undefined) {
	var semuaProduk = JSON.parse(localStorage.getItem("semuaProduk"))
	var i = semuaProduk.findIndex( x => x.ID == getID)
	if (i > -1 && i < semuaProduk.length) {
		let slide="", ukurans="", stock =""
		console.info(semuaProduk[i].img[0])
		semuaProduk[i].stok == 1 ? stock = "tersedia" : stock = "habis"
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
							<div class="cart">
								<button class="addToCart" id="addThis" onclick="addThisItem(this)" data-id="${semuaProduk[i].ID}">T A M B A H &nbsp &nbsp<i class="fas fa-cart-plus"></i> </button>
								<label class="jumlah"><span class="itemCount" data-id="${semuaProduk[i].ID}"> </span>&nbsp ~ &nbsp<i class="fas fa-minus-circle" onclick="lessThisItem(this)" data-id="${semuaProduk[i].ID}"></i></label>
							</div>
							<label class="total">Total harga untuk
								<span class="itemCount" data-id="${semuaProduk[i].ID}"> </span> item ini adalah Rp.
								<span id="total-harga"> </span>.
							</label>
							<a class="order-one" href="order.html?q=one&id=${semuaProduk[i].ID}"> atau, Order untuk 1 item ini</a>
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
cartIcon.onclick = function(){
	if (cartBox.getBoundingClientRect().left >= windowWidth) {
		cartBox.style.right = 0
		document.getElementById("full-page").classList.toggle("cart")
	} else {
		cartBox.style.right = "-150%"
		document.getElementById("full-page").classList.toggle("cart")
	}
}
const cartClose = document.querySelector(".cart-close")
cartClose.onclick = function(){
	cartBox.style.right = "-150%"
	document.getElementById("full-page").classList.toggle("cart")
}
const fullPage = document.querySelector("#full-page")
fullPage.onclick = function() {
	cartBox.style.right = "-150%"
	document.getElementById("full-page").classList.toggle("cart")
}

// all function
const itemsCount = document.querySelectorAll(".itemCount")
if ( localStorage.getItem("joohaCart") == null || localStorage.getItem("joohaCart") == undefined) {
	localStorage.setItem("joohaCart", JSON.stringify([]))
} else {
	loadCek(semuaProduk[i].ID)
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
                <tr>
                    <td class="cart-img"><img src="image/produk/${data.img[0]}"></td>
                    <td class="cart-nama"><a class="cart-link" href="detail.html?id=${data.ID}">${data.nama}</a></td>
                    <td class="cart-jumlah" data-id="${data.ID}">
                        <i title="Kurang" class="fas fa-minus cartLess" onclick="lessCart(this)"></i>
                        <span>${data.jumlah}</span>
                        <i title="Tambah" class="fas fa-plus cartAdd" onclick="addCart(this)"></i>
                    </td>
                    <td class="cart-harga">Rp. <span>${harga}</span></td>
                    <td class="cart-edit">
                        <i title="Hapus" onclick="cartDelete(this)" class="fas fa-trash" data-id="${data.ID}"></i>
                    </td>
                </tr> `
                cartIndex += content
        })
        document.getElementById("cart-action").style.visibility = "visible"
        document.querySelector("#cart-count").innerHTML = totalItem
        document.querySelector("#tot-item").innerHTML = "Total Item : " + totalItem
        document.querySelector("#tot-harga").innerHTML = "Total Harga : " + totalBayar
    }
    document.querySelector("#cart-table tbody").innerHTML = cartIndex
}
function totalSemua(){
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"));
	var totalHargaBayar = 0, totalItem = 0, totalProduk = 0;
	joohaCart.map( data => {
		totalHargaBayar += parseFloat(data.jumlah) * parseFloat(data.harga)
		totalProduk += parseFloat(data.jumlah)
		totalItem += 1
	})
	document.querySelector("#cart-count").innerHTML = totalProduk
	document.querySelector("#tot-item").innerHTML = "Total Item : " + totalProduk
	document.querySelector("#tot-harga").innerHTML = "Total Harga : Rp. " + totalHargaBayar
}
function loadCek(thisID) {
	let params
	JSON.parse(localStorage.getItem("joohaCart")).map( item => {
		if (item.ID == thisID) {
			document.getElementsByClassName("jumlah")[0].style.display = "block"
			document.getElementsByClassName("total")[0].style.display = "block"
			document.getElementById("total-harga").innerHTML = parseFloat(item.jumlah) * parseFloat(item.harga)
			params = 1
			itemsCount.forEach((itemCount) => {
				if (itemCount.getAttribute("data-id") == thisID) {
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
	loadCek(prodID)
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

function addCart(el) {
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	const thisID = el.parentElement.getAttribute("data-id")
	let i = joohaCart.findIndex( index => index.ID == thisID)
	i == -1 ? location.reload() : ""
	const thisHarga = parseFloat(joohaCart[i].harga)
	const jumlah = parseFloat(joohaCart[i].jumlah) + 1
	joohaCart[i].jumlah = jumlah
	localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
	loadCek(thisID)
	cartList()
	all()
}
function lessCart(el) {
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	const thisID = el.parentElement.getAttribute("data-id")
	let i = joohaCart.findIndex(index => index.ID == thisID)
	i == -1 ? location.reload() : ""
	let jumlah = parseFloat(joohaCart[i].jumlah) - 1
	const thisHarga = parseFloat(joohaCart[i].harga)
	if (jumlah == 0) {
		joohaCart.splice(i, 1)
		localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
		cartList()
		loadCek(thisID)
	} else {
		const harga = jumlah * thisHarga
		joohaCart[i].jumlah = jumlah
		el.parentElement.children[1].innerHTML = jumlah
		el.parentElement.parentElement.children[3].innerHTML = "Rp. " + harga
		localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
		loadCek(thisID)
	}
	totalSemua()
	all()
}
function cartDelete(el) {
	const thisID = el.getAttribute("data-id")
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	let i = joohaCart.findIndex( index => index.ID == thisID)
	i == -1 ? location.reload() : ""
	joohaCart.splice(i, 1)
	localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
	cartList()
	loadCek(thisID)
	all()
}
function clearAll() {
	localStorage.removeItem("joohaCart")
	localStorage.setItem("joohaCart", JSON.stringify([]))
	cartList()
  	loadCek()
}




const slides = document.querySelectorAll(".cata-slide img")
const tombols = document.querySelectorAll(".cata-slide-btn span")
slides[0].classList.add("onSlide")

function slideThis() {
	slides[0].classList.add("onSlide")
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
	const seribu = 1000
	const interval = seribu * 10
	var slideS = 1
	tombols.forEach( (span, i) => {
		span.onclick = function() {
			let a = parseFloat(i)
			clearInterval(slideS)
			manual(a)
			let index = a
			if (index >= 0) {
				x = index + 1
			}
			slideS = setInterval(function(){
				slideShow()
			}, interval)
		}
	})
	function slideShow(){
		if (x >= slides.length) {
			x = 0
		}
		slides.forEach( img => {
			img.classList.remove("onSlide")
			tombols.forEach( (span) => {
				span.classList.remove("onSlide")
			})
		})
		slides[x].classList.add("onSlide")
		tombols[x].classList.add("onSlide")
		++x
	}

	slideS = setInterval(function(){
			slideShow()
	}, interval)
}
slideThis()

function all() {
	let price = 0
	let count = 0
	JSON.parse(localStorage.getItem("joohaCart")).map(item => {
		price += parseFloat(item.jumlah) * parseFloat(item.harga)
		count += parseFloat(item.jumlah)
	})
	console.info(price, count)
}
