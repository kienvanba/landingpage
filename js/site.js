$(function () {
	setupSmoothScroll();
	setupProductCarousel();
	setupScrollAnimation();
	setupLazyLoadElements();
});

function setupSmoothScroll() {
	$("a").on("click", function (e) {
		if (this.hash !== "") {
			e.preventDefault();
			$("html, body").animate({ scrollTop: $(this.hash).offset().top }, 800);
		}
	});
}

function setupProductCarousel() {
	$("#catalog .carousel--list").slick({
		autoplay: true,
		infinite: true,
		slidesToShow: 3,
		centerMode: true,
		variableWidth: true,
		prevArrow: $("#catalog .carousel--prev"),
		nextArrow: $("#catalog .carousel--next"),
	});
}

function setupScrollAnimation() {
	detectScrollIntoView($("[data-scroll-animation").toArray(), function (elem) {
		$(elem).addClass(
			`animate__animated animate__${$(elem).data(
				"scroll-animation",
			)} animate_delay_1s`,
		);
	});
}

function setupLazyLoadElements() {
	detectScrollIntoView($("[data-src]").toArray(), function (elem) {
		const $elem = $(elem);
		$elem.attr("src", $elem.attr("data-src"));
		$elem.addClass("loaded");
		$elem.trigger("lazy-loaded");
	});
}

function detectScrollIntoView(targets, onMatch) {
	const exec = function (target) {
		const io = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					onMatch(entry.target);
					observer.disconnect();
				}
			});
		});
		io.observe(target);
	};
	targets.forEach(exec);
}
