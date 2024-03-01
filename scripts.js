document.addEventListener('DOMContentLoaded', function () {
	var modal = document.getElementById('profileModal');
	var btn = document.getElementById('profileIcon');
	var span = document.getElementsByClassName('close-button')[0];

	btn.onclick = function () {
		modal.style.display = 'block';
	};

	span.onclick = function () {
		modal.style.display = 'none';
	};

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = 'none';
		}
	};
});

function getRandomPosition(element) {
	var x = document.body.offsetHeight - element.clientHeight;
	var y = document.body.offsetWidth - element.clientWidth;
	var randomX = Math.floor(Math.random() * x);
	var randomY = Math.floor(Math.random() * y);
	return [randomX, randomY];
}

function positionIcons() {
	var icons = document.getElementsByClassName('desktop-icon');
	var iconArray = [];
	for (var i = 0; i < icons.length; i++) {
		var pos = getRandomPosition(icons[i]);
		icons[i].style.top = pos[0] + 'px';
		icons[i].style.left = pos[1] + 'px';
		iconArray.push({ element: icons[i], x: pos[1], y: pos[0] });
	}
	checkOverlap(iconArray);
}

function checkOverlap(iconArray) {
	for (var i = 0; i < iconArray.length; i++) {
		for (var j = 0; j < iconArray.length; j++) {
			if (i !== j) {
				var icon1 = iconArray[i].element.getBoundingClientRect();
				var icon2 = iconArray[j].element.getBoundingClientRect();
				if (
					!(
						icon1.right < icon2.left ||
						icon1.left > icon2.right ||
						icon1.bottom < icon2.top ||
						icon1.top > icon2.bottom
					)
				) {
					var pos = getRandomPosition(iconArray[i].element);
					iconArray[i].element.style.top = pos[0] + 'px';
					iconArray[i].element.style.left = pos[1] + 'px';
					checkOverlap(iconArray); // Re-check for overlap after repositioning
					break;
				}
			}
		}
	}
}

// Initialize the random positioning on window load
window.onload = positionIcons;

document.addEventListener('DOMContentLoaded', (event) => {
	const menuItems = document.querySelectorAll('.menu-item');

	menuItems.forEach((item) => {
		item.addEventListener('click', (event) => {
			event.stopPropagation();
			closeAllDropdowns(); // Close any other open dropdowns
			item.querySelector('.dropdown-content').style.display = 'block';
		});
	});

	function closeAllDropdowns() {
		document.querySelectorAll('.dropdown-content').forEach((dropdown) => {
			dropdown.style.display = 'none';
		});
	}

	// Close dropdowns when clicking outside
	window.addEventListener('click', closeAllDropdowns);
});

document.addEventListener('DOMContentLoaded', (event) => {
	// Hide all dropdowns on page load
	const dropdowns = document.querySelectorAll('.dropdown-content');
	dropdowns.forEach((dropdown) => {
		dropdown.style.display = 'none';
	});
});
