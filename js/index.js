"use strict"

//Window variables ------------------------------------------------------------------------------------------------------------------------------------------
const root = document.querySelector(":root")
const winHeight = window.innerHeight
const winWidth = window.innerWidth;

window.addEventListener('scroll', function(e){
    navIndic()
	toTop()
})
window.addEventListener('resize', function(e) {
	hoverClass()
})
window.addEventListener('load', function (e) {
	hoverClass()
})
window.addEventListener('click', function (e) {
	prodListClose(e)
})

// window on scroll ------------------------------------------------------------------------------------------------------------------------------------------
function navIndic() {
	let current = ""
	document.querySelectorAll("section").forEach( (section) => {
		if (section.getBoundingClientRect().top <= (winHeight * 0.4)) {
			current = section.getAttribute("id");
		}
	});
	document.querySelectorAll("#nav-menu .nav-list a").forEach((a) => {
		a.classList.remove("active")
		if (a.classList.contains(current)) {
			a.classList.add("active");
		}
	});
}
function toTop() {
	document.documentElement.scrollTop > windowHeight / 1.6 ?
		document.querySelector('.to-top').classList.add("active")
		: document.querySelector('.to-top').classList.remove("active")
}
// window on click ------------------------------------------------------------------------------------------------------------------------------------------

// onCLick Function
function prodListClose(el) {
	if (!(el.target.matches('.sub-arrow') || el.target.matches('.menu-arrow'))) {
		prodMenuUl.forEach(menu => {
			menu.classList.remove("active")
		})
		menuArrow.forEach(arrow =>{
			arrow.classList.remove("active", "param")
		})
	}
}

// window risize ----------------------------------------------------------------------------------------------------------------------------------------
function hoverClass(){
	if (window.innerWidth > 768) {
		prodMenu.forEach( menu => {
			menu.classList.add("hover")
		})
		prodMenuName.forEach(span => {
			span.classList.add("hover")
		})
		prodMenuList.forEach(tipe => {
			tipe.classList.add("hover")
		})
		subMenuList.forEach(subList => {
			subList.classList.add("hover")
		})
		subArrow.forEach(arrow =>{
			arrow.classList.add("hover")
		})
	} else {
		prodMenu.forEach(menu => {
			menu.classList.remove("hover")
		})
		prodMenuName.forEach(span => {
			span.classList.remove("hover")
		})
		prodMenuList.forEach(tipe => {
			tipe.classList.remove("hover")
		})
		subMenuList.forEach(subList => {
			subList.classList.remove("hover")
		})
		subArrow.forEach(arrow =>{
			arrow.classList.remove("hover")
		})
	}
}

// navbar --------------------------------------------------------------------------------------------------------------------------------------------------
// navbar responsive close
document.querySelector('.nav-close').onclick = function(){
	if(document.getElementById("check").checked = true) {
		
	}

	document.getElementById("check").checked = false;
}


// Produk Tab Constrol ------------------------------------------------------------------------------------------------------------------------------------
const prodMenu = document.querySelectorAll(".prod-menu")
const prodMenuUl = document.querySelectorAll(".prod-menu-ul")
const subMenu = document.querySelectorAll(".sub-menu")

// Searching tab
const searching = document.querySelector("#search")

searching.addEventListener('keyup', function () {
	const search = searching.value.toUpperCase()
	const Cards = document.querySelectorAll(".prod-card")
	Cards.forEach((card) => {
		let nama = card.getAttribute("data-nama").toUpperCase()
		nama.indexOf(search) > -1 ? card.style.display = "" : card.style.display = "none"
	})
})
searching.addEventListener('focusin', function () {
	prodMenu.forEach(menu => {
		menu.classList.remove("active")
	})
	prodMenuName.forEach(span => {
		span.classList.remove("active", "param")
	})
	prodMenuList.forEach(tipe => {
		tipe.classList.remove("active")
	})
	subMenu.forEach(menu => {
		menu.classList.remove("active")
	})
	subMenuList.forEach(subList => {
		subList.classList.remove("active")
	})
	subArrow.forEach(arrow =>{
		arrow.classList.remove("active", "param")
	})
	searching.classList.add("active")
})

searching.addEventListener('focusout', function () {
	searching.classList.remove("active")
})


// prod menu name (span)
const prodMenuName = document.querySelectorAll(".prod-menu-name")

prodMenuName.forEach( (span, i) => {
	span.onclick = function(e){
		prodMenuName.forEach( (name, n)=> {
			if (n !== i) {
				name.classList.remove("active", "param")
				name.parentElement.classList.remove("active")
			}
			// if (!name.classList.contains("param")) {
			// 	name.classList.remove("active", "param")
			// 	name.parentElement.classList.remove("active")
			// }
		})
		prodMenuList.forEach(list => {
			list.classList.remove("active")
		})
		subMenuList.forEach( subList => {
			subList.classList.remove("active")
		})
		subMenu.forEach(menu => {
			menu.classList.remove("active")
		})
		subArrow.forEach(arrow =>{
			arrow.classList.remove("active", "param")
		})
		span.classList.toggle("param")
		if (span.classList.contains("param")) {
			span.classList.add("active")
			prodMenu[i].classList.add("active")
		} else {
			span.classList.remove("active")
			prodMenu[i].classList.remove("active")
		}
		prodJenis()
	}
})

// menu arrow
const menuArrow = document.querySelectorAll(".menu-arrow")

menuArrow.forEach((arrow, i)=> {
	arrow.onclick = function () {
		menuArrow.forEach((arw, a)=> {
			if (a !== i) {
				arw.classList.remove("active", "param")
			}
		})
		prodMenuUl.forEach( (menu, n) => {
			if (n !== i) {
				menu.classList.remove("active")
			}
		})
		arrow.classList.toggle("param")
		if(arrow.classList.contains("param")) {
			arrow.classList.add("active")
			prodMenuUl[i].classList.add("active")
		} else {
			arrow.classList.remove("active")
			prodMenuUl[i].classList.remove("active")
		}
	}
})

// prod menu list (li)
const prodMenuList = document.querySelectorAll(".prod-menu-list")

prodMenuList.forEach(list => {
	list.onclick = function (e) {
		if (e.target.matches('.prod-menu-list')) {
			prodMenu.forEach( menu => {
				menu.classList.remove("active")
			})
			prodMenuName.forEach(span =>{
				span.classList.remove("active", "param")
			})
			prodMenuList.forEach(tipe => {
				tipe.classList.remove("active")
			})
			subMenuList.forEach( subList => {
				subList.classList.remove("active")
			})
			subMenu.forEach(menu => {
				menu.classList.remove("active")
			})
			subArrow.forEach(arrow =>{
				arrow.classList.remove("active", "param")
			})
			e.target.classList.add("active")
			e.target.parentElement.previousElementSibling.classList.add("active")
			e.target.parentElement.parentElement.classList.add("active")
			tabClik(e.target)
		}
	}
})

// sub arrow
const subArrow = document.querySelectorAll(".sub-arrow")

subArrow.forEach( (arrow, i) => {
	arrow.onclick = function(){
		// subArrow.forEach( (arw, n) => {
		// 	if (n !== i) {
		// 		arw.classList.remove("active", "param")
		// 	}
		// })
		arrow.classList.toggle("param")
		if (arrow.classList.contains("param")) {
			arrow.classList.add("active")
			arrow.parentElement.nextElementSibling.classList.add("active")
		} else {
			arrow.classList.remove("active")
			arrow.parentElement.nextElementSibling.classList.remove("active")
		}
	}
})

// sub menu list
const subMenuList = document.querySelectorAll(".sub-menu-list")

subMenuList.forEach( subList => {
	subList.onclick = function () {
		prodMenu.forEach( menu => {
			menu.classList.remove("active")
		})
		prodMenuName.forEach(span =>{
			span.classList.remove("active", "param")
		})
		subMenuList.forEach( sList => {
			sList.classList.remove("active")
		})
		prodMenuList.forEach( list => {
			list.classList.remove("active")
		})
		subList.classList.add("active")
		subList.parentElement.previousElementSibling.classList.add("active")
		subList.parentElement.parentElement.previousElementSibling.classList.add("active")
		subList.parentElement.parentElement.parentElement.classList.add("active")
		tabClik(subList)
	}
})

function tabClik(el) {
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


function prodJenis() {
	let count = 0
	prodMenuName.forEach( span => {
		if (span.classList.contains("param")) {
			let thisJenis = span.textContent
			const prodCart = document.querySelectorAll('.prod-card')
			prodCart.forEach( card => {
				if (card.getAttribute('data-jenis') == thisJenis) {
					card.style.display = 'block'
			}
			})
		} else {
			let thisJenis = span.textContent
			const prodCart = document.querySelectorAll('.prod-card')
			prodCart.forEach( card => {
				if (card.getAttribute('data-jenis') == thisJenis) {
					card.style.display = 'none'
				}
			})
		}
	})
	prodMenuName.forEach( span => {
		if (!span.classList.contains("param")) {
			count++
		}
	})
	if (count == 4) {
		const prodCart = document.querySelectorAll('.prod-card')
		prodCart.forEach( card => {
			card.style.display = 'block'
		})
	}
}
