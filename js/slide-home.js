"use strict"
// global variable
const slides = document.querySelectorAll(".slide")
const tombols = document.querySelectorAll(".slTombol")
const slideTexts = document.querySelectorAll(".slideText")
const slideImg = document.querySelectorAll(".img-slide")
let tsIndex = 1

const slideGroup1 = document.querySelectorAll('.carou1 .slide-group')
const slideImg1 = document.querySelectorAll('.carou1 .slide-group img')
const slideIndic1 = document.querySelectorAll('.carou1 .button-indic .slide-button-indic')
const slideControl1 = document.querySelectorAll('.carou1 i')

const slideGroup2 = document.querySelectorAll('.carou2 .slide-group')
const slideImg2 = document.querySelectorAll('.carou1 .slide-group img')
const slideIndic2 = document.querySelectorAll('.carou2 .button-indic .slide-button-indic')
const slideControl2 = document.querySelectorAll('.carou2 i')

bigCarousel(7000, 23000)

theCarousel(slideGroup1, slideIndic1, 5000, 25000, slideControl1)
theCarousel(slideGroup2, slideIndic2, 5500, 24500, slideControl2)


function theCarousel(slides, indics, interval, delay, controls=[1,2] ) {
	let param = 1
	let slideOn = setInterval(slidesRun, interval)
	let delaySlide = 1

	function changesSlide(i) {
		slides.forEach( slide => {
			slide.querySelector('img').classList.remove("active")
			slide.querySelector('div').classList.remove("active")
			slide.classList.remove("active")
			indics.forEach(indic=> {
				indic.classList.remove("active")
			})
		})
		slides[i].classList.add("active")
		indics[i].classList.add("active")
		slides[i].querySelector('div.slide-text').classList.add("active")
		slides[i].querySelector('img').classList.add("active")
	}

	function slidesRun() {
		if (param >= slides.length) {
			param = 0
		}
		changesSlide(param)
		++param
	}

	indics.forEach(function(span, i){
		span.onclick = function (e) {
			clearInterval(slideOn)
			changesSlide(i)
			param = parseFloat(i) + 1
			slideOn = setInterval(slidesRun, interval)
		}
	})

	let delaySet = false
	controls.forEach( control => {
		control.onclick = function (e) {
			clearInterval(slideOn)
			let index = 0
			if (control.classList.contains('button-left')) {
				console.info('left')
				indics.forEach(function(span, i){
					if (span.classList.contains('active')) {
						index = parseFloat(i) - 1
						index < 0 ? index = slides.length - 1 : index
						param = index + 1
					}
				})
			} else if (control.classList.contains('button-right')) {
				console.info('right')
				indics.forEach(function(span, i){
					if (span.classList.contains('active')) {
						index = parseFloat(i) + 1
						index >= slides.length ? index = 0 : index
						param = index + 1
					}
				})
			}
			changesSlide(index)
			if (delaySet == true) {
				clearTimeout(delaySlide)
			}
			delaySlide = setTimeout(() => {
				console.info('delay succes')
				slideOn = setInterval(slidesRun, interval)
			}, delay)
			delaySet = true		
		}
	})
}





function bigCarousel(interval, delay) {
	let x = 1
	let slideS = setInterval(slideShow, interval);
	let delaySet = false
	let delaySlide = 1

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


	tombols.forEach( (slTombol, i) => {
		slTombol.onclick = function() {
			clearInterval(slideS)
			manual(parseFloat(i))
			x = parseFloat(i) + 1
			if (delaySet == true) {
				clearTimeout(delaySlide)
			}
			delaySlide = setTimeout(function(){
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



































