/**
 * 縦横のスクロールを制御
 */
function tableControl() {
	// テーブル制御
	header_left = document.getElementById("head_left");
	header_right = document.getElementById("head_right");
	detail_right = document.getElementById("detail");
	if (detail_right) {
		addEvent(detail_right, "scroll", function() {
			if (header_left) {
				header_left.scrollLeft = detail_right.scrollLeft;
				header_left.scrollTop = detail_right.scrollTop;
			}
			if (header_right) {
				header_right.scrollLeft = detail_right.scrollLeft;
				header_right.scrollTop = detail_right.scrollTop;
			}
			
		});
	}
	if (header_left) {
		addEvent(header_left, "scroll", function() {
			detail_right.scrollTop = header_left.scrollTop;
		});
	}
}

/**
 * イベント追加
 */
function addEvent(element, type, event) {
	if (element.addEventListener) {
		element.addEventListener(type, event, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + type, event);
	} else {
		element["on" + type] = event;
	}
}
