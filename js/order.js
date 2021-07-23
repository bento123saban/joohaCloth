"use strict"

let newURL = new URLSearchParams(window.location.search)
let getOrder = newURL.get("q")
if (getOrder == 'all') {
    cartList()
} else if (getOrder == 'one') {
    let getID = newURL.get("id")
    let verify = false
    let semuaProduk = JSON.parse(localStorage.getItem("semuaProduk"))
    let n = semuaProduk.findIndex(index => index.ID == getID)
    if (n >= 0) {
        document.querySelector("#total-item").innerHTML = "Jumlah item : 1"
        document.querySelector("#total-harga").innerHTML = "Total : Rp. " + semuaProduk[n].harga
        let ukurans ="", stock =""
        for(let x in semuaProduk[n].ukuran) {
            ukurans += `<span>${semuaProduk[n].ukuran[x]}</span>.`
        }
        semuaProduk[n].stok == 1 ? stock = "tersedia" : stock = "habis"
        document.querySelector("#cart-table tbody").innerHTML = `
            <tr>
                <td class="order-one">
                    <img src="image/produk/${semuaProduk[n].img[0]}" width="100%">
                    <h2><span>${semuaProduk[n].nama}</span><span>Rp. ${semuaProduk[n].harga}/Item</span></h2>
                </td>
            </tr>
        `
    } else {
        console.info("index null")
        location.replace("index.html")

    }
} else {
    console.info("getOrder null")
	location.replace("index.html")
}

function cartList() {
    let cartIndex ="", totalItem = 0, totalBayar = 0
    if(JSON.parse(localStorage.getItem("joohaCart")) == 0) {
        location.replace("index.html")
    } else {
        JSON.parse(localStorage.getItem("joohaCart")).map( data => {
            const harga = parseFloat(data.jumlah) * parseFloat(data.harga)
            totalBayar = totalBayar + harga
            totalItem = totalItem + data.jumlah
            let content = `
               <tr class="item-cart">
					<td class="img-cell" rowspan="2">
						<div class="cart-img">
							<img src="image/produk/${data.img[0]}">
						</div>
					</td>
					<td class="nama-cell">
						<a class="cart-to-detail" href="detail.html?id=01001">${data.nama}</i></a>
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
        document.querySelector("#total-item").innerHTML = "Jumlah item : " + totalItem
        document.querySelector("#total-harga").innerHTML = "Total Harga : Rp. " + totalBayar
    }
    document.querySelector("#cart-table tbody").innerHTML = cartIndex
}

window.addEventListener('click', function(e){
	if (e.target.matches('.cartLess')) {
		cartLess(e.target)
	}
	if (e.target.matches('.cartAdd')) {
		cartAdd(e.target)
	}
	if(e.target.matches('.cartDel')) {
        console.info('cartDel')
		cartDel(e.target)
	}
	console.info(e.target)
})
function cartAdd(el) {
	const thisID = el.parentElement.getAttribute("data-id")
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	joohaCart.map(item => {
		if (item.ID == thisID) {
			item.jumlah = parseFloat(item.jumlah) + 1
			localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
		}
	})
	cartList()
}
function cartLess(el) {
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	const thisID = el.parentElement.getAttribute("data-id")
    let count = 1;
    if (joohaCart.length == 1) {
        if (joohaCart[0].jumlah == 1) {
            let conf = confirm("Apakah Anda ingin mengosongkan Keranjang anda ??")
            if (conf == true){
                count = 0
                localStorage.setItem("joohaCart", JSON.stringify([]))
                location.replace("index.html")
                return
            } else if (conf == false){
                count = 0
            }
        }
    }
    if (count !== 0) {
        joohaCart.map((item, i) => {
            if (item.ID == thisID) {
                let jumlah = parseFloat(item.jumlah) - 1
                if (jumlah == 0) {
                    joohaCart.splice(i, 1)
                    localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
                } else {
                    item.jumlah = jumlah
                    localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
                }
            }
        })
        cartList()
    }
}



function cartDel(el) {
    console.info('cartDel')
	const thisID = el.getAttribute("data-id")
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
    if (joohaCart.length == 1) {
        let conf = confirm("Apakah Anda ingin mengosongkan Keranjang anda ??")
        if (conf == true) {
            localStorage.setItem("joohaCart", JSON.stringify([]))
            location.replace("index.html")
        } else if (conf == false){
        }
    } else {
        let i = joohaCart.findIndex(index => index.ID == thisID)
        joohaCart.splice(i, 1)
        localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
        cartList()
    }
}


const nama = document.querySelector("#nama")
const alamat = document.querySelector("#alamat")
const telpon = document.querySelector("#telpon")
const namaText = document.querySelector(".nama-text")
const alamatText = document.querySelector(".alamat-text")
const telponText = document.querySelector(".telpon-text")
const orderButton = document.querySelector("#order-button")
const rulesCheck = document.querySelector("#rules")
const rules = document.querySelector(".for-rules")
const toWA = document.querySelector(".to-wa")
const black = document.querySelector(".black")

rules.classList.remove("ket")
orderButton.disabled = true
orderButton.classList.add("disabled")
let nI = 0
let aI = 0
let tI = 0

nama.onkeyup = function () {
    let text = nama.value
    if (text.length < 5) {
        nama.style.borderColor = "red"
        namaText.innerText ="Minimal 5 karakter"
    }
    else {
        namaText.innerText =""
        nama.style.borderColor = "white"
        nI = 1 
        if (nI + aI + tI == 3) {
            orderButton.disabled = false
            orderButton.classList.remove("disabled")
        }
    }
}
alamat.onkeyup = function () {
    let text = alamat.value
    if (text.length < 10) {
        alamat.style.borderColor = "red"
        alamatText.innerText ="Masukan alamat lengkap anda"
    } else {
        alamatText.innerText =""
        alamat.style.borderColor = "white"
        aI = 1 
        if (nI + aI + tI == 3) {
            orderButton.disabled = false
            orderButton.classList.remove("disabled")
        }
    }
}
telpon.onkeyup = function () {
    let text = telpon.value
    if (text.length !== 12 && text[0] !== 0 && text[1] !== 8) {
        telpon.style.borderColor = "red"
        telponText.innerText ="Contoh 081354741823-(12 angka)"
    } else {
        telponText.innerText =""
        telpon.style.borderColor = "white"
        tI = 1 
        if (nI + aI + tI == 3) {
            orderButton.disabled = false
            orderButton.classList.remove("disabled")
        }
    }
}

let whatsCount = 6
let timeSet;
const timeCount = document.querySelectorAll(".time-count")

function whatsOrderList() {
    clearTimeout(timeSet) 
    let decodeText =`New order - ${new Date} \n`
    let totalHarga = 0
    if(getOrder == 'all') {
        JSON.parse(localStorage.getItem("joohaCart")).map( data => {
            decodeText += `${data.nama}*(${data.jumlah})*. `
            totalHarga += parseFloat(data.jumlah) * parseFloat(data.harga)
        }) 
        localStorage.setItem("joohaCart", JSON.stringify([]))
    } else if (getOrder == 'one') {
        let getID = newURL.get("id")
        JSON.parse(localStorage.getItem("semuaProduk")).map(item => {
            if (item.ID == getID) {
                decodeText += `${item.nama}*(1)*.`
                totalHarga += item.harga
            }
        })
    } else {
        location.replace("index.html")
    }
    decodeText += `\n*Total : Rp. ${totalHarga}* \n_${nama.value}.\n${alamat.value}.\n${telpon.value}._`

    let encodeText = encodeURI(decodeText)
    let linkToWhatsApp = `https://wa.me/+6281354741823?text=${encodeText}`
    console.info(decodeText)
    document.querySelector(".to-wa-text").innerHTML = `Terima Kasih telah memesan item dari toko kami !!`
    document.querySelector("button#order-fix").style.display = "none"
    document.querySelector(".navbar").style.zIndex = "100"
    console.info(linkToWhatsApp)
    location.replace(linkTOWhatsApp)
}
function toWhatsApps() {
    timeCount.forEach( counter => {
        counter.innerText = "(" + whatsCount + ")"
    })
    if (whatsCount == 0){
        clearTimeout(timeSet)
        whatsOrderList()
    } else {
        whatsCount--
        timeSet = setTimeout(toWhatsApps, 1500)
    }
}
function orderCek() {
    rulesCheck.checked == false ?
        rules.classList.toggle("ket")
        : toWA.classList.add("order")
            + black.classList.add("block") + toWhatsApps()
}

