"use strict"

let newURL = new URLSearchParams(window.location.search)
let getOrder = newURL.get("q")
if (getOrder == 'all') {
    cartList()
} else if (getOrder == 'one') {
    let getID = newURL.get("id")
    let verify = false
    JSON.parse(localStorage.getItem("semuaProduk")).map( item => {
        if (item.ID == getID){
            document.querySelector("#total-item").innerHTML = "Jumlah item : 1"
            document.querySelector("#total-harga").innerHTML = "Total : Rp. " + item.harga
            let ukurans =""
            let stock =""
            for(let n in item.ukuran) {
                ukurans += `<span>${item.ukuran[n]}</span>.`
            }
            if (item.stok == 1) {
                stock = "tersedia"
            } else {
                stock = "habis"
            }
            document.querySelector("#order-table tbody").innerHTML = `
                <tr class="order-list">
                    <td>
                        <img src="image/produk/${item.img[0]}">
                        <h2><span>${item.nama}</span><span>Rp. ${item.harga}/Item</span></h2>
                    </td>
                </tr>
            `
            verify = true
        }
    })
    if (verify !== true) {
        location.replace("index.html")
    }
} else {
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
                </tr>`
            cartIndex += content
        })
        document.querySelector("#total-item").innerHTML = "Jumlah item : " + totalItem
        document.querySelector("#total-harga").innerHTML = "Total Harga : Rp. " + totalBayar
    }
    document.querySelector("#order-table tbody").innerHTML = cartIndex
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
            cartList()
		}
	})
}
function lessCart(el) {
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
	const thisID = el.parentElement.getAttribute("data-id")
    let count = 0;
    if (joohaCart.length == 1) {
        if (joohaCart[0].jumlah == 1) {
            let conf = confirm("Apakah Anda ingin mengosongkan Keranjang anda ??")
            if (conf == true) {
                localStorage.setItem("joohaCart", JSON.stringify([]))
                location.replace("index.html")
            } else {
                count = 1
            }
        }
    }
    if (count !== 1) {
        for (let n = 0; n < joohaCart.length; n++) {
            if (joohaCart[n].ID == thisID) {
                let jumlah = parseFloat(joohaCart[n].jumlah) - 1
                const thisHarga = parseFloat(joohaCart[n].harga)
                if (jumlah == 0) {
                    joohaCart.splice(n, 1)
                    localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
                } else {
                    const harga = jumlah * thisHarga
                    joohaCart[n].jumlah = jumlah
                    el.parentElement.children[1].innerHTML = jumlah
                    el.parentElement.parentElement.children[3].innerHTML = "Rp. " + harga
                    localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
                }
            } 
        }
    }
    cartList()
}
function cartDelete(el) {
	const thisID = el.getAttribute("data-id")
	let joohaCart = JSON.parse(localStorage.getItem("joohaCart"))
    let count = 0
    if (joohaCart.length == 1) {
        let conf = confirm("Apakah Anda ingin mengosongkan Keranjang anda ??")
        if (conf == true) {
            localStorage.setItem("joohaCart", JSON.stringify([]))
            location.replace("index.html")
        } else {
            count = 1
        }
    }
    if (count !== 1) {
        for (let n = 0; n < joohaCart.length; n++) {
            if (joohaCart[n].ID == thisID) {
                joohaCart.splice(n, 1)
                localStorage.setItem("joohaCart", JSON.stringify(joohaCart))
            }
        }
    }
    cartList()
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
let timeSet=""
const timeCount = document.querySelectorAll(".time-count")
function whatsOrderList() {
    clearTimeout(timeSet)
    let decodeText =`New order - ${new Date} \n`
    let totalHarga = 0
    if(getOrder == 'all') {
        JSON.parse(localStorage.getItem("joohaCart")).map( data => {
            decodeText += `${data.nama}(${data.jumlah}). `
            totalHarga += parseFloat(data.jumlah) * parseFloat(data.harga)
        })
        localStorage.setItem("joohaCart", JSON.stringify([]))
    } else if (getOrder == 'one') {
        let getID = newURL.get("id")
        JSON.parse(localStorage.getItem("semuaProduk")).map(item => {
            if (item.ID == getID) {
                decodeText += `${item.nama}(1).`
                totalHarga += parseFloat(item.harga)
            }
        })
    }
    decodeText += `\nTotal : Rp. ${totalHarga} \n${nama.value}.\n${alamat.value}.\n${telpon.value}.\n Kirim segera !`

    let encodeText = encodeURI(decodeText)
    let linkToWhatsApp = `https://api.whatsapp.com/send?phone=6281354741823&text=${encodeText}`
    console.info(decodeText)
    document.querySelector(".to-wa-text").innerHTML = `Terima Kasih telah memesan item dari toko kami !!`
    document.querySelector("button#order-fix").style.display = "none"
    document.querySelector(".navbar").style.zIndex = "100"
    console.info(linkToWhatsApp)
    window.open(linkToWhatsApp)
}
function toWhatsApps() {
    timeCount.forEach( counter => {
        counter.innerText = "(" + whatsCount + ")"
    })
    if (whatsCount == 0) {
        whatsOrderList()
        return false
    } else {
        whatsCount--
    }
    timeSet = setTimeout(toWhatsApps, 1500)
}
function orderCek() {
    if (rulesCheck.checked == false) {
        rules.classList.toggle("ket")
    } else {
        toWA.classList.add("order")
        black.classList.add("block")
        toWhatsApps()
    }
 }
