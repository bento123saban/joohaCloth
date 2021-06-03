"use strict";

const semuaProduk = JSON.parse(localStorage.getItem("semuaProduk"))
if (semuaProduk !== null) {
    let content = ""
    semuaProduk.map ( item => {
        let slide="", ukurans="", stock="";
		item.stok == 1 ? stock = "Tersedia" : stock = "Habis"
		item.img.map( image => {
			slide += `<img class="img" src="image/produk/${image}">`
		});
		item.ukuran.map( size => {
			ukurans += `<span>${size}</span>.`
		})
        let urls = `detail.html?id=${item.ID}`
        content += `
			<div class="prod-card" data-nama="${item.nama}" data-tipe="${item.tipe}" data-size="${ukurans}">
				<div class="prod-img pm0">
					<img class="img" src="image/produk/${item.img[0]}">
				</div>
				<div class="prod-card-box">
					<div class="prod-headings">
						<span onclick="tipeClick(this)">${item.tipe}</span>
						<label>${stock}</label>
					</div>
					<div class="prod-desc" id="prodDesc">
						<a href="${urls}"><i class="fas fa-info-circle"></i> selengkapnya</a>
						<label>Size : ${ukurans}</label> 
						<div class="prod-add pm0">
							<h4>Rp. ${item.harga}</h4>
							<span class="addToCart" onclick="addToCart(this)" data-id="${item.ID}" data-img="image/produk/${item.img[0]}" data-harga="${item.harga}" data-nama="${item.nama}">
								Tambah 
								<i class="fas fa-cart-plus" ></i>
								<i class="itemCount" data-id="${item.ID}"></i>
							</span>
						</div>
					</div> <!-- prod desc -->
				</div> <!-- prod box -->
				<h3 class="pm0">${item.nama}</h3>
			</div> <!-- prod card -->
		`
    })
    document.getElementById("prodKontent").innerHTML = content
} else {
	alert("Data Not Found !!")
    window.location.reload()
}

// window variable
const windowWidth = window.innerWidth
const windowHeight = window.innerHeight

// produk tab control
const Cards = document.querySelectorAll(".prod-card")
function search() {
	const search = document.querySelector("#search").value.toUpperCase()
	Cards.forEach((card) => {
		let nama = card.getAttribute("data-nama").toUpperCase()
		nama.indexOf(search) > -1 ? card.style.display = "" : card.style.display = "none"
	})
}
function allProd() {
    Cards.forEach((card) => {
        card.style.display = "block"
    });
}
function tipeClick(el){
    let tipe = el.textContent.toUpperCase()
    Cards.forEach((card) => {
        let cardTipe = card.getAttribute("data-tipe").toUpperCase()
        tipe == cardTipe ? card.style.display = "" : card.style.display = "none"
    })
}
const tabsGroups = document.querySelectorAll(".tabs-group label span")
tabsGroups.forEach((span) => {
	span.onclick = function(){
		let tipe = span.textContent.toUpperCase();
		Cards.forEach((card) => {
			let cardTipe = card.getAttribute("data-tipe").toUpperCase()
      		tipe == cardTipe ? card.style.display = "" : card.style.display = "none"
		})
	}
})
const prodTipes = document.querySelectorAll(".prodTipe")
prodTipes.forEach((prodTipe) => {
	prodTipe.onclick = function () {
		let nama = prodTipe.textContent.slice(-1).toUpperCase()
		let tipe = prodTipe.parentElement.parentElement.firstChild.textContent.toUpperCase()
		Cards.forEach((card) => {
			let cardTipe = card.getAttribute("data-tipe").toUpperCase()
			let cardNama = card.getAttribute("data-nama").toUpperCase()
			tipe == cardTipe && cardNama.indexOf(nama) > -1 ? card.style.display = "" : card.style.display = "none"
		})
	}
})
// cart box load
if ( localStorage.getItem("joohaCart") == null || localStorage.getItem("joohaCart") == undefined) {
	localStorage.setItem("joohaCart", JSON.stringify([]));
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
        });
        document.getElementById("cart-action").style.visibility = "visible"
        document.querySelector("#cart-count").innerHTML = totalItem
        document.querySelector("#tot-item").innerHTML = "Total Item : " + totalItem;
        document.querySelector("#tot-harga").innerHTML = "Total Harga : " + totalBayar
    }
    document.querySelector("#cart-table tbody").innerHTML = cartIndex
}

const itemsCount = document.querySelectorAll(".itemCount")
function itemsCounter(thisCount, thisID) {
    itemsCount.forEach( item => {
		let match = item.getAttribute("data-id")
        match == thisID ? item.innerHTML = thisCount : ""
    })
}
function addToCart(el){
    let prodID = el.getAttribute("data-id");
    let n = semuaProduk.findIndex( index => index.ID == prodID)
	n == undefined ? alert("item not found !. Reload") + location.reload() : ""
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
  itemsCounter(count, prodID)
	all()
}
function addCart(el) {
	const thisID = el.parentElement.getAttribute("data-id")
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	joohaCart.map(item => {
		if (item.ID == thisID) {
			const thisHarga = parseFloat(item.harga)
			const jumlah = parseFloat(item.jumlah) + 1
			item.jumlah = jumlah
			localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
			itemsCounter(jumlah, thisID)
	    cartList()
		}
	})
}
function lessCart(el) {
	const thisID = el.parentElement.getAttribute("data-id")
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	joohaCart.map((item, i) => {
		if (item.ID == thisID) {
			let jumlah = parseFloat(item.jumlah) - 1
			let thisHarga = parseFloat(item.harga)
			if (jumlah == 0) {
				joohaCart.splice(i, 1)
				localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
				itemsCounter("", thisID)
			} else {
				const harga = jumlah * thisHarga
				item.jumlah = jumlah
				localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
				itemsCounter(jumlah, thisID)
			}
		}
	})
	cartList()
	all()
}
function cartDelete(el) {
	const thisID = el.getAttribute("data-id")
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	let i = joohaCart.findIndex(index => index.ID == thisID)
	joohaCart.splice(i, 1)
	localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
  itemsCounter("", thisID)
	all()
	cartList()
}
function clearAll() {
	localStorage.removeItem("joohaCart")
	localStorage.setItem("joohaCart", JSON.stringify([]))
  const itemsCount = document.querySelectorAll(".itemCount")
  itemsCount.forEach((itemCount) => {
    itemCount.innerHTML = ""
  })
	cartList()
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
