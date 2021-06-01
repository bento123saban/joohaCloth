"use strict";

const semuaProduk = JSON.parse(localStorage.getItem("semuaProduk"))
if (semuaProduk !== null) {
    let content = ""
    semuaProduk.map ( item => {
        let slide="", ukurans="", stock="";
		if (item.stok == 1) {
			stock = "Tersedia"
		} else {
			stock = "Habis"
		}
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


// produk tab control
const Cards = document.querySelectorAll(".prod-card")
function search() {
	const search = document.querySelector("#search").value.toUpperCase()
	Cards.forEach((card) => {
		let nama = card.getAttribute("data-nama").toUpperCase()
		if( nama.indexOf(search) > -1 ) {
			card.style.display = ""
		} else {
			card.style.display = "none"
		}
	})
}
tabButton.onclick = function () {
    document.getElementById("tabs-group").classList.toggle("hiddens")
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
        if(tipe == cardTipe){
            card.style.display =""
        } else {
            card.style.display ="none"
        }
    });
}
const tabsGroups = document.querySelectorAll(".tabs-group label span")
tabsGroups.forEach((span) => {
	span.onclick = function(){
		let tipe = span.textContent.toUpperCase();
		Cards.forEach((card) => {
			let cardTipe = card.getAttribute("data-tipe").toUpperCase()
			if(tipe == cardTipe){
				card.style.display =""
			} else {
				card.style.display ="none"
			}
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
			if(tipe == cardTipe && cardNama.indexOf(nama) > -1){
				card.style.display =""
			} else {
				card.style.display ="none"
			}
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
			if (itemCount.getAttribute("data-id") == item.ID) {
				itemCount.innerHTML = item.jumlah
			}
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
function itemsCounter(thisCount, thisID) {
    const itemsCount = document.querySelectorAll(".itemCount")
    itemsCount.forEach((itemCount) => {
        if (itemCount.getAttribute("data-id") == thisID) {
            itemCount.innerHTML = thisCount
        }
    })
}
function addToCart(el){
    let prodID = el.getAttribute("data-id");
    let i = semuaProduk.findIndex( x => x.ID == prodID)
    if (i !== null ) {
        let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
        let index = 0, count = 1
            if (joohaCart !== null) {
                joohaCart.map(item => {
                    if (item.ID == prodID) {
                        index = 1
                        item.jumlah = parseFloat(item.jumlah) + 1
                        count = item.jumlah
                        localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
                    }
                })
            }
            if (index !== 1) {
                let objek = {
                    ID : prodID,
                    jumlah : count,
                    img : semuaProduk[i].img,
                    nama : semuaProduk[i].nama,
                    harga : semuaProduk[i].harga
                }
                joohaCart.push(objek)
                localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
            }
            cartList()
            itemsCounter(count, prodID)
    } else {
        alert("Oopsss... Item tak ditemukan, halaman akan di-reload!")
        window.location.reload()
    }
}
function addCart(el) {
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	const thisID = el.parentElement.getAttribute("data-id")
	joohaCart.map( item => {
		if (item.ID == thisID) {
			const thisHarga = parseFloat(item.harga)
			const jumlah = parseFloat(item.jumlah) + 1
			item.jumlah = jumlah
			el.parentElement.children[1].innerHTML = jumlah
			el.parentElement.parentElement.children[3].innerText = "Rp. " + jumlah * thisHarga
			localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
			itemsCounter(jumlah, thisID)
		}
	});
	totalSemua();
}
function lessCart(el) {
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	const thisID = el.parentElement.getAttribute("data-id")
	for (let i = 0; i < joohaCart.length; i++) {
		if (joohaCart[i].ID == thisID) {
			const jumlah = parseFloat(joohaCart[i].jumlah) - 1
			const thisHarga = parseFloat(joohaCart[i].harga)
			if (jumlah == 0) {
				joohaCart.splice(i, 1)
                itemsCounter("", thisID)
				localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
				cartList()
			} else {
				const harga = jumlah * thisHarga
				joohaCart[i].jumlah = jumlah
				el.parentElement.children[1].innerHTML = jumlah
				el.parentElement.parentElement.children[3].innerHTML = "Rp. " + harga
				localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
                itemsCounter(jumlah, thisID)
			}
		} 
	}
	totalSemua()
}
function cartDelete(el) {
	const thisID = el.getAttribute("data-id")
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	for (let i = 0; i < joohaCart.length; i++) {
		if (joohaCart[i].ID == thisID) {
			joohaCart.splice(i, 1)
			localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
			cartList()
		}
	}
    itemsCounter("", thisID)
}
function clearAll() {
	localStorage.removeItem("joohaCart")
	localStorage.setItem("joohaCart", JSON.stringify([]))
	cartList()
    const itemsCount = document.querySelectorAll(".itemCount")
    itemsCount.forEach((itemCount) => {
        itemCount.innerHTML = ""
    })
}
