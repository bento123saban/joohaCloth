"use strict";

const semuaProduk = JSON.parse(localStorage.getItem("semuaProduk"))
if (semuaProduk !== null) {
    let content = ""
    semuaProduk.map( item => {
		let stok ='', addCart = '', slide="", ukurans="", stock="", tipe = ''
		if(item.sub !== '') {
			tipe = item.sub
		} else {
			tipe = item.tipe
		}
		if (item.stok == 1) {
			stok = `<label class="stok-ada">Tersedia</label>`
			addCart =
				`<span class="addToCart tambahItem" data-id="${item.ID}" data-stok="${item.stok}">
					Tambah 
					<i class="fas fa-cart-plus tambahItem" data-id="${item.ID}"></i>
					<i class="itemCount tambahItem" data-id="${item.ID}"></i>
				</span>`
		} else if (item.stok == 0) {
			stok = `<label class="stok-habis">Habis</label>`
			addCart = `-`
		}
		item.img.map( image => {
			slide += `<img class="img" src="image/produk/${image}">`
		}) 
		item.ukuran.map( size => {
			ukurans += `<span>${size}</span>.`
		})
        let urls = `detail.html?id=${item.ID}`
        content += `
			<div class="prod-card" data-nama="${item.nama}" data-search="${tipe}" data-jenis="${item.jenis}">
				<div class="prod-img pm0">
					<img class="img" src="image/produk/${item.img[0]}">
				</div>
				<div class="prod-card-box">
					<div class="prod-headings">
						<span class="tipe">${tipe}</span>
						${stok}
					</div>
					<div class="prod-desc" id="prodDesc">
						<a href="${urls}"><i class="fas fa-info-circle"></i> selengkapnya</a>
						<label>Size : ${ukurans}</label> 
						<div class="prod-add pm0">
							<h4>Rp. ${item.harga}</h4>
							${addCart}
						</div>
					</div> <!-- prod desc -->
				</div> <!-- prod box -->
				<h3 class="pm0">${item.nama}</h3>
			</div> <!-- prod card -->
		`
    })
    document.getElementById("prodKontent").innerHTML += content
} else {
	alert("Data Not Found !!")
    window.location.reload()
}

// window variable
const windowWidth = window.innerWidth
const windowHeight = window.innerHeight

// cart box load
if ( localStorage.getItem("joohaCart") == null || localStorage.getItem("joohaCart") == undefined) {
	localStorage.setItem("joohaCart", JSON.stringify([]));
	document.getElementById("cart-action").style.visibility = "hidden"
    document.querySelector("#cart-count").innerHTML = ""
    document.querySelector("#cart-table tbody").innerHTML = `<br><br> &nbsp &nbsp &nbsp &nbsp Belum ada item yang ditambahkan...`
} else {
	cartList();
		let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	const itemsCount = document.querySelectorAll(".itemCount")
	itemsCount.forEach((itemCount) => {
		joohaCart.forEach( item => {
			itemCount.getAttribute("data-id") == item.ID ? itemCount.innerHTML = item.jumlah : ""
		})
	})
}


// cart list 
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
 					<td class="jumlah-cell" data-id="${data.ID}">
						<span class="item-kontrol" data-id="${data.ID}">
							<i class="fas fa-chevron-left cartLess"></i>
							<span class="jumlah-item">${data.jumlah}</span>
							<i class="fas fa-chevron-right cartAdd"></i>
						</span>
						<i class="fas fa-trash cart-box-close cartDel" ></i>
					</td>
				</tr>
                `
                cartIndex += content
        });
        document.getElementById("cart-action").style.visibility = "visible"
        document.querySelector("#cart-count").innerHTML = totalItem
        document.querySelector("#tot-item").innerHTML = "Total Item : " + totalItem;
        document.querySelector("#tot-harga").innerHTML = "Total Harga : Rp. " + totalBayar
    }
    document.querySelector("#cart-table tbody").innerHTML = cartIndex
}


// cart box control ------------------------------------------------------------------------------------------------------------------------------------

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

function itemsCounter(thisCount, thisID) {
	const itemsCount = document.querySelectorAll(".itemCount")
    itemsCount.forEach( item => {
		let match = item.getAttribute("data-id")
        match == thisID ? item.innerHTML = thisCount : ""
    })
}

function cartLess(el) {
	const thisID = el.parentElement.getAttribute("data-id")
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	joohaCart.map((item, i) => {
		if (item.ID == thisID) {
			let jumlah = parseFloat(item.jumlah) - 1
			if (jumlah == 0) {
				joohaCart.splice(i, 1)
				localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
				itemsCounter("", thisID)
			} else {
				item.jumlah = jumlah
				localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
				itemsCounter(jumlah, thisID)
			}
		}
	})
	cartList()
}
function cartAdd(el) {
	const thisID = el.parentElement.getAttribute("data-id")
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	joohaCart.map(item => {
		if (item.ID == thisID) {
			item.jumlah = parseFloat(item.jumlah) + 1
			localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
			itemsCounter(item.jumlah, thisID)
		}
	})
	cartList()
}
function cartDel(el) {
	const thisID = el.getAttribute("data-id")
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	let i = joohaCart.findIndex(index => index.ID == thisID)
	joohaCart.splice(i, 1)
	localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
    itemsCounter("", thisID)
	cartList()
}

function hapusSemua() {
	if (confirm("Anda yakin akan mengahapus semua item dikeranjang anda ?")) {
		localStorage.removeItem("joohaCart")
		localStorage.setItem("joohaCart", JSON.stringify([]))
		const itemsCount = document.querySelectorAll(".itemCount")
		itemsCount.forEach((itemCount) => {
			itemCount.innerHTML = ""
		})
		cartList()
	}
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
 
function addToCart(el){
	let thisID = el.getAttribute("data-id")
	let thisProduk = JSON.parse(localStorage.getItem("semuaProduk")).find( item => item.ID == thisID)
	if( thisProduk == undefined) {
		alert("item not found ! Reload")
		location.reload()
	} else {
		let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
		let count = 1
		let i = joohaCart.findIndex(index => index.ID == thisID)
		if (i >= 0) {
			joohaCart[i].jumlah =  parseFloat(joohaCart[i].jumlah) + 1
			count = joohaCart[i].jumlah
			localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
		} else {
			let objek = {
				ID : thisID,
				jumlah : 1,
				img : thisProduk.img,
				nama : thisProduk.nama,
				harga : thisProduk.harga
			}
			joohaCart.push(objek)
			localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
		}
		cartList()
		itemsCounter(count, thisID)
	}
	all()
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

function tipeClick(el) {
	let thisTipe = el.textContent;
	const prodCart = document.querySelectorAll('.prod-card')
	prodCart.forEach( card => {
		if (card.getAttribute('data-search') == thisTipe) {
			card.style.display ='block'
		} else {
			card.style.display ='none'
		}
	})
	console.info(thisTipe)
}

