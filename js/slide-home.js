"use strict"
// global variable
const slides = document.querySelectorAll(".slide")
const tombols = document.querySelectorAll(".slTombol")
const slideTexts = document.querySelectorAll(".slideText")
const slideImg = document.querySelectorAll(".img-slide")
let tsIndex = 1

function manual(i){
	slides.forEach( (slide) => {
		slide.classList.remove("slideOn")
			slideImg.forEach( (img) => {
				img.classList.remove("slideOn")
			})
			slideTexts.forEach( (slideText) => {
				slideText.classList.remove("slideOn")
			})
			tombols.forEach( (slTombol) => {
				slTombol.classList.remove("slideOn")
			})
	})
	slideImg[i].classList.add("slideOn")
	slides[i].classList.add("slideOn")
	slideTexts[i].classList.add("slideOn")
	tombols[i].classList.add("slideOn")
}

let x = 1
let index
var slideS = 1
tombols.forEach( (slTombol, i) => {
	slTombol.onclick = function() {
		let a = parseFloat(i)
		clearInterval(slideS)
		manual(a)
		index = a
		if (index >= 0) {
				x = index + 1
		}
		slideS = setInterval(function(){
				slideShow()
		}, 10000)
	}
})

function slideShow(){
	if (x >= slides.length) {
		x = 0
	}
	slides.forEach( (slide) => {
		slide.classList.remove("slideOn")

		slideImg.forEach( (img) => {
			img.classList.remove("slideOn")
		})
		slideTexts.forEach( (slideText) => {
			slideText.classList.remove("slideOn")
		})
		tombols.forEach( (slTombol) => {
			slTombol.classList.remove("slideOn")
		})
	})
	slideImg[x].classList.add("slideOn")
	slides[x].classList.add("slideOn")
	slideTexts[x].classList.add("slideOn")
	tombols[x].classList.add("slideOn")
	++x
}

slideS = setInterval(function(){
		slideShow()
}, 10000)
