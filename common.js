$(function () {
  // スライド
  $('.sample').each(function () {
    var $slides = $(this).find('img');
    var $slideNum = $slides.length;
    var currentIdx = 0;

    $(".sample img").eq(currentIdx).fadeIn();

    setInterval(displayNextSlide,500);

    function displayNextSlide() {
      var nextIdx = currentIdx + 1;

      if (nextIdx > ($slideNum - 1)) {
        nextIdx = 0
      }
      $(".sample img").eq(currentIdx).fadeOut();
      $(".sample img").eq(nextIdx).fadeIn();

      currentIdx = nextIdx;
    }
  })

// スライドショー上の文字
  var container = $(".top");
  var speed = 200;

  var content = $(".top").html();
  var text = $.trim(content);
  var newHtml = "";

  text.split("").forEach(function (v) {
    newHtml += '<span class="letter">' + v + '</span>';
  });

  container.html(newHtml);

  var txtNum = 0;
  container.css({ opacity: 1 });
  setInterval(function () {
    container.find('span').eq(txtNum).css({ opacity: 1 });
    txtNum++;
  }, speed);


  //クリックすると選択が出てくる
  $(".start").click(function () {
    // 対象要素.notは（除外する要素）　:not(:属性プロパティ)　で除外する
    $(".questions > li:not(:first-child)").css({ display: "none" });
    他のclassのcss
    $(".questions li").addClass("opas");
    // クリック音
    $(".sound-file").get(0).play();
  });

	// 診断テストページで、部品を追加
  var num_bar;
  // 値の場合は[]で
  var num_barNum = ["0%"];
  var q_list = $(".questions li");

  q_list.each(function(i) {
    q_list.eq(i).find(".select").addClass("s-" + i);
    num_barNum.push(100 / (q_list.length-1) * (String(i+1)) + "%");
		if(i != q_list.length-1) {

      q_list.eq(i).prepend('<p>Q,' + String(i+1) + '</p>');

      // 各問題に[Yes]、[No]ボタンを追加
      q_list.eq(i).append('<div class="select"><p>Yes</p><p>No</p></div>');

    }
    if(i != 0) {
      q_list.eq(i).addClass("right");

			// 2問目以降の「←戻る」ボタンを追加
      q_list.eq(i).append('<div class="back-list">&#x2B05; 戻る</div>');
    }
  });


	// 診断テストページで、「Yes」または「No」を押した時
  var num = 0;
  $(".select p").on("click", function() {
    var btn = $(this);
    // localStorage.setItemはデータをブラウザで永続的に保存できる。データは、キー（key=num）と値（value）の組み合わせで保存
    localStorage.setItem(num, $(".questions li:eq("+num+") .select p").index(this)+1);
    $(".progress-bar > span").css({width: num_barNum[num+1]});
    btn.addClass("click");
    setTimeout(function() {
      q_list.eq(num).addClass("left");
      setTimeout(function() {
        q_list.eq(num).hide();
        q_list.eq(num + 1).show();
        btn.removeClass("click");
        setTimeout(function() {
          q_list.eq(num + 1).removeClass("right");
          num++
        },40);
      },360);
    },260);
  });


	// 診断テストページで、「←戻る」を押した時
  $(".back-list").on("click", function() {
    $(".progress-bar > span").css({width: num_barNum[num-1]});
    q_list.eq(num).addClass("right");
    setTimeout(function() {
      q_list.eq(num).hide();
      num = num-1;
      q_list.eq(num).show();
      setTimeout(function() {
        q_list.eq(num).removeClass("left");
      },40);
    },360);
  });


	// 診断テストページのYesの数をストレージに追加
  if($(".questions").length) {
    localStorage.setItem("q-length", $(".questions li").length-1);
  }

	// 診断結果ページのYesの数をローカルストレージから取り出して変数へ
  if($(".ansewer").length) {
    var yes = [];
    for(var i=1;i<=localStorage.getItem("q-length");i++) {
      if(localStorage.getItem(i-1) == 1) {
        yes.push(0);
      }
    }

    // 診断テスト結果
    if(yes.length == 0) {
      // Yesの数が、0個の時
      $(".ansewer__title").text("あなたへのおすすめは『紅の豚』です！");
      $(".ansewer__txt").html("第一次世界大戦後の世界恐慌時のイタリアを舞台に、アドリア海を飛行艇で乗り回す空賊の荒くれ者たちを相手に賞金稼ぎで生きる豚の姿をした一匹狼のパイロットの物語");
      $('.picture').html('<img src="img/porco025.jpg" alt="サンプル画像">');
    } else if(yes.length == 1) {
			// Yesの数が、1個の時
			$(".ansewer__title").text("あなたへのおすすめは『崖の上のポニョ』です！");
      $(".ansewer__txt").html("藤岡藤巻と大橋のぞみが歌うエンディング主題歌「崖の上のポニョ」は、オリコン週間3位になり話題になった。崖の上の一軒家に住んでいた5歳児の少年「宗介」は、海で魚の女の子「ポニョ」に出会う。ポニョは宗介に恋をし、人間になろうとするのであった。");
      $('.picture').html('<img src="img/ponyo004.jpg" alt="サンプル画像">');
    } else if(yes.length == 2) {
			// Yesの数が、2個の時
			$(".ansewer__title").text("あなたへのおすすめは『千と千尋の神隠し』です！");
			$(".ansewer__txt").html("急に決まった引っ越しのため、不安な気持ちで新しい家に向かう10歳の少女、千尋（ちひろ）。 両親とともに不思議な世界に迷い込み、掟を破った両親は豚に変えられてしまう。 ... 両親とハクを助けるため、そして元の世界に戻るため、さまざまな出会いや体験を通して千尋が成長していく物語。");
      $('.picture').html('<img src="img/sento.jpg" alt="サンプル画像">');
    } else if(yes.length == 3) {
			// Yesの数が、3個の時
			$(".ansewer__title").text("あなたへのおすすめは『もののけ姫』です！");
			$(".ansewer__txt").html("森を揺るがす人間たちと、森の神々の戦い。その中で芽生えた少年と少女の愛を熱く描写する。");
      $('.picture').html('<img src="img/mononoke033.jpg" alt="サンプル画像">');
    } else if(yes.length == 4) {
			// Yesの数が、4個の時
			$(".ansewer__title").text("あなたへのおすすめは『猫の恩返し』です！");
			$(".ansewer__txt").html("どこにでもいるような冴えない女子高校生が、トラックに轢かれそうになった猫を助けた事をきっかけに猫達の国という異世界に連れて行かれてしまい、彼女を救出に来た人形の猫達と共に脱出を図る冒険ファンタジー作品である。");
      $('.picture').html('<img src="img/baron014.jpg" alt="サンプル画像">');
    } else if(yes.length == 5) {
			// Yesの数が、5個の時
			$(".ansewer__title").text("あなたへのおすすめは『風立ちぬ』です！");
      $(".ansewer__txt").html("堀越二郎は飛行機の設計士になることを夢みて、婚約者との生活を通し主人公の中に、時間を超越した生の意味と幸福感が確立してゆく過程を描く。");
      $('.picture').html('<img src="img/kazetachinu002.jpg" alt="サンプル画像">');
    }
  }

});


function load() {
	// 初回読み込み時と読み込み完了後、ウィンドウサイズの変更の時
  var q_height = [];
  $(".questions li").each(function(i){
    q_height.push(Number($(".questions li").eq(i).css('height').slice(0,-2)) + 54);
  });
	// 質問全体で一番高さの有るコンテンツに合わせて高さ調整
  $(".questions").css({height: Math.max.apply(null,q_height)});
}
