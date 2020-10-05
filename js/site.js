$(function () {
	setupScrollAnimation();
	setupLazyLoadElements();
});

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
