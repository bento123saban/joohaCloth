const promoData = 
[
    {
        nama: "Promo Satu",
        deskripsi : "Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur",
        img : "image/promo/promo_satu.jpg",
        long_desc : "Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur, Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur, Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur, Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur"
    },
    {
        nama: "Promo Dua",
        deskripsi : "Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur",
        img : "image/promo/promo_dua.jpg",
        long_desc : "Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur, Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur, Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur, Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur"
    },
    {
        nama: "Promo Tiga",
        deskripsi : "Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur",
        img : "image/promo/promo_tiga.jpg",
        long_desc : "Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur, Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur, Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur, Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur"
    },
    {
        nama: "Promo Empat",
        deskripsi : "Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur",
        img : "image/promo/promo_empat.jpg",
        long_desc : "Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur, Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur, Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur, Sumo elit posidonium vidisse sapientem veri solum suspendisse habitasse eam nisi pericula aliquid integer theophrastus harum nascetur"
    }
]

const nama = document.querySelectorAll(".slTombol")
const deskripsi = document.querySelectorAll(".slideText p")
const img = document.querySelectorAll(".img-slide")

for (let i = 0; i < promoData.length; i++) {
    nama[i].textContent = promoData[i].nama
    deskripsi[i].textContent = promoData[i].deskripsi
    img[i].src = promoData[i].img
}
