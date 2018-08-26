/**
 * The Ajatar theme for Alchemy's Chimera CMS
 *
 * Based on
 * Right - Responsive Admin Template
 * v 0.3.0
 * http://adminbootstrap.com
 */
$(document).ready(function() {
	quickmenu($('.quickmenu__item.active'));

	$('body').on('click', '.quickmenu__item', function() {
		quickmenu($(this))
	});

	function quickmenu(item) {
		var menu = $('.sidebar__menu');
		menu.removeClass('active').eq(item.index()).addClass('active');
		$('.quickmenu__item').removeClass('active');
		item.addClass('active');
		menu.eq(0).css('margin-left', '-'+item.index()*200+'px');
	}

	$('.sidebar li').on('click', function(e) {
		e.stopPropagation();
		var second_nav = $(this).find('.collapse').first();
		if (second_nav.length) {
			second_nav.collapse('toggle');
			$(this).toggleClass('opened');
		}
	});

	$('body.main-scrollable .main__scroll').scrollbar();
	$('.scrollable').scrollbar({'disableBodyScroll' : true});
	$(window).on('resize', function() {
		$('body.main-scrollable .main__scroll').scrollbar();
		$('.scrollable').scrollbar({'disableBodyScroll' : true});
	});

	$('.selectize-dropdown-content').addClass('scrollable scrollbar-macosx').scrollbar({'disableBodyScroll' : true});
	$('.nav-pills, .nav-tabs').tabdrop();

	$('body').on('click', '.header-navbar-mobile__menu button', function() {
		$('.dashboard').toggleClass('dashboard_menu');
	});

	$('.sidestat__chart.sparkline.bar').each(function() {
		$(this).sparkline(
			'html',
			{
				type: 'bar',
				height: '30px',
				barSpacing: 2,
				barColor: '#1e59d9',
				negBarColor: '#ed4949'
			}
		);
	});

	$('.sidestat__chart.sparkline.area').each(function() {
		$(this).sparkline(
			'html',
			{
				width: '145px',
				height: '40px',
				type: 'line',
				lineColor: '#ed4949',
				lineWidth: 2,
				fillColor: 'rgba(237, 73, 73, 0.6)',
				spotColor: '#FF5722',
				minSpotColor: '#FF5722',
				maxSpotColor: '#FF5722',
				highlightSpotColor: '#FF5722',
				spotRadius: 2
			}
		);
	});

	$('.sidestat__chart.sparkline.bar_thin').each(function() {
		$(this).sparkline(
			'html',
			{
				type: 'bar',
				height: '30px',
				barSpacing: 1,
				barWidth: 2,
				barColor: '#FED42A',
				negBarColor: '#ed4949'
			}
		);
	});

	$('.sidestat__chart.sparkline.line').each(function() {
		$(this).sparkline(
			'html',
			{
				type: 'bar',
				height: '30px',
				barSpacing: 2,
				barWidth: 3,
				barColor: '#20c05c',
				negBarColor: '#ed4949'
			}
		);
	});

	$("input.bs-switch").bootstrapSwitch();

	$('.settings-slider').ionRangeSlider({
		decorate_both: false
	});

	if ($('input[type=number]').length) {
		$('input[type=number]').inputNumber({
			mobile: false
		});
	}
});

hawkejs.scene.on({type: 'set', name: 'index_tbody', template: 'chimera/editor/index'}, function onIndex(element, variables) {

	var sortable = new Draggable.Sortable(element, {
		draggable : 'tr.sortable-row',
		handle    : '.drag-handle'
	});

	sortable.on('sortable:start', function onStart(e) {
		var data = e.data,
		    drag_event = data.dragEvent,
		    mirror     = drag_event.data.mirror,
		    source     = drag_event.data.source;

		// Sure, it makes the mirror wider, but the tds remain small
		//mirror.style.width = source.clientWidth + 'px';
	});

	sortable.on('sortable:stop', function onStopped(e) {

		var data = e.data,
		    drag_event = data.dragEvent,
		    source     = drag_event.data.originalSource,
		    over       = drag_event.data.over,
		    record_id  = source.getAttribute('data-id'),
		    new_index  = data.newIndex,
		    model_name = source.getAttribute('data-modelname');

		alchemy.fetch('RecordAction', {
			parameters: {
				controller: 'editor',
				subject   : model_name,
				action    : 'reorder',
				id        : record_id
			},
			post: {
				new_index: new_index
			}
		}, function done(err, res, body) {

			if (err) {
				console.error('Error saving order:', err);
			}

		});
	});

});