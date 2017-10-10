$(function() {

	/*================================================================
	情報
	================================================================*/
	var allList = [
		{
			id: "portfolio-6",
			life: 0.5,
			title: "fluffy",
			//tag: ["哺乳類","かわいい","かっこいい"],
			description: "test",
			modalid: "mcon1"
		}, 
		{
			id: "id002",
			life: 000,
			title: "test",
			//tag: ["鳥類","かっこいい","こわい","うごかない"],
			description: "test",
			modalid: "mcon2"
		}, 
		{
			id: "id003",
			life: 000,
			title: "test",
			//tag: ["魚類","ほのぼの"],
			description: "test",
			modalid: "mcon3"
		}, 
		{
			id: "id004",
			life: 000,
			title: "test",
			//tag: ["鳥類","かっこいい","こわい"],
			description: "test",
			modalid: "mcon4"
		}, 
		{
			id: "id005",
			life: 000,
			title: "test",
			//tag: ["昆虫類","かっこいい","こわい"],
			description: "test",
			modalid: "mcon5"
		}, 
		{
			id: "id006",
			life: 000,
			title: "test",
			//tag: ["哺乳類","だれなん？"],
			description: "test",
			modalid: "mcon6"
		}, 
		{
			id: "id007",
			life: 000,
			title: "test",
			//tag: ["哺乳類","かわいい","ほのぼの"],
			description: "test",
			modalid: "mcon7"
		}, 
		{
			id: "id008",
			life: 000,
			title: "test",
			//tag: ["鳥類","こわい"],
			description: "test",
			modalid: "mcon8"
		}
	];		

	/*================================================================
	スクリプトはじまり
	================================================================*/
	function init() {
		
		//イベント登録
		//$(".filter_life select").on("change", onFilterChange);
		//$(".filter_tag input").on("change", onFilterChange);
		$(".filter_keyword button").on("click", onFilterChange);
	

		//最初は全て出力
		refleshHtml(allList);
	}

	/*================================================================
	HTML出力
	================================================================*/
	function refleshHtml(list) {
		
		var outputHtml = '';

		//出力する内容をoutputHtmlに格納
		if (list.length > 0) {
			_.each(list, function(line, i) {
				outputHtml += '<div class="product">';
				//画像
				outputHtml += '	<div class="photo"><img src="img/' + line.id + '.jpg" alt="' + line.title + '" /></div>';
				//ボタン画像
                //outputHtml += ' <a href="index.html"><img src="img/' + line.id + '.jpg" alt="' + line.title + '" /></a>';
                //outputHtml += ' </div> ';
                //モーダル画像
                /*outputHtml += ' <a data-target=" ' + line.modalid + ' " class="modal-open">クリックするとモーダルウィンドウを開きます。</a> ';
                outputHtml += ' <div id=" ' + line.modalid + ' " class="modal-content"> ';
                outputHtml += ' 	<p>リンク1の内容です。</p> ';
                outputHtml += ' 	<p><a class="modal-close">閉じる</a></p> ';
                outputHtml += ' </div> ';*/
                
				outputHtml += '	<div class="info">';
				outputHtml += '		<h3 class="productTitle">' + line.title + '</h3>';
				outputHtml += '		<p class="productLife">制作時間:&nbsp;' + line.life + 'yaer</p>';
				/*outputHtml += '		<ul class="tag">';
				_.each(line.tag, function(tag, i){
				outputHtml += '			<li>' + tag + '</li>';	
				});
				outputHtml += '		</ul>';		*/		
				outputHtml += '		<p class="description">' + line.description + '</p>';
				outputHtml += '	</div>';
				outputHtml += '<!--/.product--></div>';
			});
		} else {
			outputHtml += '<div class="noproduct"><p>条件に当てはまるwordを検索できませんでした。</p></div>';
		}

		//HTML出力（フェードインアニメーションつき）
		$('.productArea').html(outputHtml);	
		$('.productArea .product').css({opacity: 0}).each(function(i){$(this).delay(100 * i).animate({opacity:1}, 300);
		});
		
		$('.modal-open').click(function(){
        	// オーバーレイ用の要素を追加
        	$('body').append('<div class="modal-overlay"></div>');
        	// オーバーレイをフェードイン
        	$('.modal-overlay').fadeIn('slow');

        	// モーダルコンテンツのIDを取得
        	var modal = '#' + $(this).attr('data-target');
        	DebugPrint(modal);
        	// モーダルコンテンツの表示位置を設定
        	modalResize();
         	// モーダルコンテンツフェードイン
        	$(modal).fadeIn('slow');

        	// 「.modal-overlay」あるいは「.modal-close」をクリック
        	$('.modal-overlay, .modal-close').off().click(function(){
            	// モーダルコンテンツとオーバーレイをフェードアウト
            	$(modal).fadeOut('slow');
            	$('.modal-overlay').fadeOut('slow',function(){
                	// オーバーレイを削除
                	$('.modal-overlay').remove();
            	});
        	});

        	// リサイズしたら表示位置を再取得
        	$(window).on('resize', function(){
            	modalResize();
        	});

        	// モーダルコンテンツの表示位置を設定する関数
        	function modalResize(){
        		DebugPrint("ほげほげ");
            	// ウィンドウの横幅、高さを取得
            	var w = $(window).width();
            	var h = $(window).height(); 

            	// モーダルコンテンツの表示位置を取得
            	var x = (w - $(modal).outerWidth(true)) / 2;
            	var y = (h - $(modal).outerHeight(true)) / 2;

            	// モーダルコンテンツの表示位置を設定
            	$(modal).css({'left': x + 'px','top': y + 'px'});
        	}
    	});
		
		//検索件数表示
		$('.productCntArea').html('<p>' + allList.length + '件中' + list.length + '件を表示しています。</p>');
	}

	/*================================================================
	絞り込み条件を変更した時
	================================================================*/
	function onFilterChange(e) {
		
		var filterFncs = []; 
		var result = []; 

		/*//セレクトボックスの値を引数に指定した関数filterByLifeをfilterFuncs配列に格納
		filterFncs.push(
			function(list) {
				return filterByLife(list, $('.filter_life select').val());
			}
		);

		//チェックボックスの値を引数に指定した関数filterByTagをfilterFuncs配列に格納
		filterFncs.push(
			function(list) {
				return filterByTag(list, $('.filter_tag input:checked'));
			}
		);*/

		//キーワードの値を引数に指定した関数filterByKeywordをfilterFuncs配列に格納
		filterFncs.push(
			function(list) {
				return filterByKeyword(list, _.escape($('.filter_keyword input').val()));
			}
		);

		//FilterFuncs配列内の関数をバケツリレーみたいに1つずつ実行して結果をresult配列に格納
		result = _.reduce(filterFncs, function(list, fnc) {
			return fnc(list);
		}, allList);

		//絞り込んだ結果を出力
		refleshHtml(result);		
	}

	/*================================================================
	絞り込み[1] セレクトボックス絞り込み関数
	================================================================
	function filterByLife(list, value) {
		
		//絞り込み指定がない場合はリターン
		if (value == "") {
			return list;
		}

		//選択したセレクトボックスとlifeがマッチするかでフィルタリング
		return _.filter(list, function(item) {
			switch (value) {
				case '1':
					return item.life <= 1;
				case '2':
					return 1 < item.life && item.life <= 20;
				case '3':
					return 20 < item.life && item.life <= 50;
				case '4':
					return 50 < item.life;
			}
		});
	}*/

	/*================================================================
	絞り込み[2] チェックボックス絞り込み関数
	================================================================*/
	function filterByTag(list, value) {
		
		//絞り込み指定がない場合はリターン
		if (value.length == 0) {
			return list;
		}

		//選択した属性（チェックボックス）とtagがマッチするかでフィルタリング
		return _.filter(list, function(item) {
			
			var isMatch = false;

			//配列同士の比較
			_.each(value, function(chkItem, i) {
				
				_.each(item.tag, function(tagItem, i) {
					if (tagItem === $(chkItem).val()) {
						isMatch = true;
					}
				});
				
			});

			return isMatch;
		});
	}

	/*================================================================
	絞り込み[3] テキストボックス絞り込み関数
	================================================================*/
	function filterByKeyword(list, value) {

		//絞り込み指定がない場合はリターン
		if (value == "") {
			return list;
		}

		//検索キーワードを配列に格納（スペースがある場合は複数格納）
		var freeAry = [];　
		var val = value.replace(/　/g, " ");
		searchAry = val.split(" ");

		//入力したキーワードがtitleもしくdescriptionにマッチするかでフィルタリング
		return _.filter(list, function(item) {

			var isMatch = false;

			_.each(searchAry, function(data, i) {
				if (item.title.indexOf(data) != -1 || item.description.indexOf(data) != -1) {
					isMatch = true;
				}
			});

			return isMatch;

		});

	}
	
// 「.modal-open」をクリック
    $('.modal-ope').click(function(){
    	//DebugPrint("ほげほげ");
        // オーバーレイ用の要素を追加
        $('body').append('<div class="modal-overlay"></div>');
        // オーバーレイをフェードイン
        $('.modal-overlay').fadeIn('slow');

        // モーダルコンテンツのIDを取得
        var modal = '#' + $(this).attr('data-target');
        DebugPrint(modal);
        // モーダルコンテンツの表示位置を設定
        modalResize();
         // モーダルコンテンツフェードイン
        $(modal).fadeIn('slow');

        // 「.modal-overlay」あるいは「.modal-close」をクリック
        $('.modal-overlay, .modal-close').off().click(function(){
            // モーダルコンテンツとオーバーレイをフェードアウト
            $(modal).fadeOut('slow');
            $('.modal-overlay').fadeOut('slow',function(){
                // オーバーレイを削除
                $('.modal-overlay').remove();
            });
        });

        // リサイズしたら表示位置を再取得
        $(window).on('resize', function(){
            modalResize();
        });

        // モーダルコンテンツの表示位置を設定する関数
        function modalResize(){
            // ウィンドウの横幅、高さを取得
            var w = $(window).width();
            var h = $(window).height();

            // モーダルコンテンツの表示位置を取得
            var x = (w - $(modal).outerWidth(true)) / 2;
            var y = (h - $(modal).outerHeight(true)) / 2;

            // モーダルコンテンツの表示位置を設定
            $(modal).css({'left': x + 'px','top': y/5 + 'px'});
        }

    });
    
    
    /*================================================================
	デバック
	================================================================*/
    function DebugPrint(str)
	{
    	var out = document.getElementById("debug");
    	if (!out) return;
    	out.value += str;
	}


	/*================================================================
	スクリプトはじめ
	================================================================*/
	init();

});
