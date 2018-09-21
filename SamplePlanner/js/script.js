// 幅、高さの定義
var DIV_T = 32;
var DIV_W = 34;
var CELL_W = 37;
var CELL_H = 25;

function initialize(){
	// リサイズ設定
	$('#panel1, #panel2').resizable({
		handles: "e"
		, grid: [CELL_W, CELL_H]
		, resize: function( event, ui ) {
			var info = getDaysInfo(event, ui);
			$("#date").text(info.text)
		}
		, stop: function( event, ui ) {
			var info = getDaysInfo(event, ui);
			alert(info.text);
		}
	});
	
	// ドラッグ設定
	$('#panel1, #panel2').draggable({
		containment: "#detailTable"
		, grid: [CELL_W, 0]
		, opacity: 0.7
		, scroll: true
		, drag: function( event, ui ) {
			var info = getDaysInfo(event, ui);
			$("#date").text(info.text)
		}
		, stop: function( event, ui ) {
			var info = getDaysInfo(event, ui);
			alert(info.text);
		}
	});
	
	// クリックでパネルを追加できるように
	$("#detailTable td").mousedown(function(event){
		var cell = $(this)[0];
		var row = $(this).parent()[0];
		var div = createDiv(row.rowIndex, cell.cellIndex);
		$("#detail").append(div);
		handleResizeEvent(div, "e", event);
	});
}

/**
 * パネルを作成して返します.
 */
function createDiv(rowIndex, cellIndex) {
	var span = $("<span>", {
		"class" : "label"
		, "html" : "&nbsp;"
	});
	var divs = $(".panel");
	var div = $("<div>", {
		id : "panel" + (divs.length + 1)
		, "class" : "panel"
	}).append(span);
	
	// スタイル設定
	div.css("top", rowIndex * DIV_T);
	div.css("left", cellIndex * CELL_W);
	div.css("background-color", "#f3c0ab");
	
	// リサイズ設定
	div.resizable({
		handles: "e"
		, grid: [CELL_W, CELL_H]
		, resize: function( event, ui ) {
			var info = getDaysInfo(event, ui);
			$("#date").text(info.text)
		}
		, stop: function( event, ui ) {
			var info = getDaysInfo(event, ui);
			alert(info.text);
		}
	});
	
	// ドラッグ設定
	div.draggable({
		containment: "#detailTable"
		, grid: [CELL_W, 0]
		, opacity: 0.7
		, scroll: true
		, drag: function( event, ui ) {
			var info = getDaysInfo(event, ui);
			$("#date").text(info.text)
		}
		, stop: function( event, ui ) {
			var info = getDaysInfo(event, ui);
			alert(info.text);
		}
	});
	
	
	return div;
}

/**
 * 追加したパネルのリサイズイベントを起動します
 * 
 */
function handleResizeEvent(item, handle, event){
	item.find(".ui-resizable-" + handle)
		.trigger("mouseover")
		.trigger({
			type: "mousedown", 
			which: 1,
			pageX: event.pageX,
			pageY: event.pageY
	});
}

/**
 * 渡されたデータから日付の情報を作成して返します.
 *
 */
function getDaysInfo(event, ui) {
	var info = new Object();
	info.start = ui.position.left == 0 ? 1 : 1 + ui.position.left / CELL_W;
	if (ui.size) {
		info.end = info.start + (ui.size.width - DIV_W) / CELL_W;
	} else {
		info.end = info.start + (event.target.offsetWidth - DIV_W) / CELL_W;
	}
	info.days = info.end - info.start;
	info.allDay = (info.end == info.start)
	if (info.allDay) {
		info.text = info.start + "日";
	} else {
		info.text = info.start + "日 ～ " + info.end + "日";
	}
	
	return info
}
