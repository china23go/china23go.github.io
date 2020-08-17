/* Version 4.1
** Up:2018.11.06*/
var feifei = {
//start
'browser':{//�������Ϣ
	'url': document.URL,
	'domain': document.domain,
	'title': document.title,
	'language': (navigator.browserLanguage || navigator.language).toLowerCase(),//zh-tw|zh-hk|zh-cn
	'canvas' : function(){
		return !!document.createElement('canvas').getContext;
	}(),
	'useragent' : function(){
		var ua = navigator.userAgent;//navigator.appVersion
		return {
			'mobile': !!ua.match(/AppleWebKit.*Mobile.*/), //�Ƿ�Ϊ�ƶ��ն� 
			'ios': !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios�ն�
			'android': ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android�ն˻���uc����� 
			'iPhone': ua.indexOf('iPhone') > -1 || ua.indexOf('Mac') > -1, //�Ƿ�ΪiPhone����QQHD����� 
			'iPad': ua.indexOf('iPad') > -1, //�Ƿ�iPad
			'trident': ua.indexOf('Trident') > -1, //IE�ں�
			'presto': ua.indexOf('Presto') > -1, //opera�ں�
			'webKit': ua.indexOf('AppleWebKit') > -1, //ƻ�����ȸ��ں�
			'gecko': ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //����ں� 
			'weixin': ua.indexOf('MicroMessenger') > -1 //�Ƿ�΢�� ua.match(/MicroMessenger/i) == "micromessenger",			
		};
	}()
},
'cms':{//ϵͳ
	'nav': function($id){//����������
		$id = $('nav[data-dir]').attr('data-dir');
		$($id).addClass("active");
	},
	'pre':function(){//�������
		//https://highlightjs.org/static/demo/
		if($("pre code").length){
			$.ajaxSetup({ 
				cache: true 
			});
			$("<link>").attr({ rel: "stylesheet",type: "text/css",href: "//cdn.bootcss.com/highlight.js/9.12.0/styles/googlecode.min.css"}).appendTo("head");
			$.getScript("//cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js", function(){
				$('pre code').each(function(i, block) {
					hljs.highlightBlock(block);
				});
			});
		}
	},
	'collapse':function(){//���������۵�������ӦͼƬ
		$('.ff-content img').addClass("img-responsive");
		$('body').on("click", "[data-toggle=ff-collapse]", function(){
			$this = $(this);
			$($this.attr('data-target')).toggle();
			$($this.attr('data-default')).toggle();
			if($this.attr('data-html')){
				$data_html = $this.html();
				$this.html($this.attr('data-html'));
				$this.attr('data-html',$data_html);
			}
			if($this.attr('data-val')){
				$data_val = $this.val();
				$this.val($this.attr('data-val'));
				$this.attr('data-val',$data_val);
			}
		});
	},
	'pushBaidu':function(){
		var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
	}
},
'mobile':{//�ƶ���ר��
	'jump': function(){
		if( cms.domain_m && (feifei.browser.domain != cms.domain_m) ){
			self.location.href = feifei.browser.url.replace(feifei.browser.domain,cms.domain_m);
		}
	},
	'nav': function(){
		$("#ff-nav-btn").bind('click', function(){
			$('#ff-nav-btn-item').toggleClass("hidden").toggleClass("d-none");
		});
	},
	'goback': function(){
		if(history.length > 0 && document.referrer){
			$(".ff-goback").show();
			$('.ff-goback').attr('href','javascript:history.go(-1);');
		}else{
			$(".ff-goback").hide();
		}
	},
	'flickity':function(){//�ֻ�����
		if($(".ff-gallery").length){
			$.ajaxSetup({ 
				cache: true 
			});
			$("<link>").attr({
				rel: "stylesheet",
				type: "text/css",
				href: cms.root+"Public/jquery.flickity/2.1.1/flickity.min.css"
			}).appendTo("head");
			$.getScript(cms.root+"Public/jquery.flickity/2.1.1/flickity.pkgd.min.js", function(){
				$(".ff-gallery").each(function(i){
					$index = $(this).find('.gallery-active').index()*1;
					if($index > 3){
						$index = $index-3;
					}else{
						$index = 0;
					}
					$(this).flickity({
						cellAlign: 'left',
						freeScroll: true,
						lazyLoad: true,
						contain: true,
						prevNextButtons: false,
						resize: true,
						initialIndex: $index,
						pageDots: false
					});
				});
			});
		}
	}
},
'scroll':{//������
	'fixed' : function($id, $top, $width){// ��������
		var offset = $('#'+$id).offset();
		if(offset){
			if(!$top){
				$top = 5;
			}
			if(!$width){
				$width = $('#'+$id).width();
			}			
			$(window).bind('scroll', function(){
				if($(this).scrollTop() > offset.top){
					$('#'+$id).css({"position":"fixed","top":$top+"px","width":$width+"px"});
				}else{
					$(('#'+$id)).css({"position":"relative"});
				}
			});		
		}
	},
	'totop':function($id, $top){ //���ض���
		// $id:dc-totop $top:ƫ��ֵ
		$('body').append('<a href="#" class="'+$id+'" id="'+$id+'"><i class="glyphicon glyphicon-chevron-up"></i></a>');
		$(window).bind('scroll', function(){
			if($(this).scrollTop() > $top){
				$('#'+$id).fadeIn("slow");
			}else{
				$('#'+$id).fadeOut("slow");
			}
		});
	}
},
'language':{//��ת��
	's2t':function(){
		if(feifei.browser.language=='zh-hk' || feifei.browser.language=='zh-tw'){
			$.getScript("//cdn.feifeicms.co/jquery/s2t/0.1.0/s2t.min.js", function(data, status, jqxhr) {
				$(document.body).s2t();//$.s2t(data);
			});
		}
	},
	't2s':function(){
		if(feifei.browser.language=='zh-cn'){
			$.getScript("//cdn.feifeicms.co/jquery/s2t/0.1.0/s2t.min.js", function(data, status, jqxhr) {
				$(document.body).t2s();//$.s2t(data);
			});
		}
	}
},
'page': {//��ҳ
	'more': function(){
		$('body').on('click', '.ff-page-more', function(){
			$this = $(this);
			$page = $(this).attr('data-page')*1+1;
			$id = $this.attr('data-target');
			$.get($(this).attr('data-url')+$page, function(data){
				if(data){
					$($id).append(data);
					$this.attr("data-page",$page);
					$($id+" .ff-img").lazyload();
				}else{
					$this.hide();
					$this.unbind("click");
				}
			},'html');
		});
	},
	'keydown': function(){
	  var prev = $('#ff-prev').attr("href");
	  var next = $('#ff-next').attr("href");
	  $("body").keydown(function(event){
		  if(event.keyCode==37 && prev!=undefined) location=prev; 
		  if(event.keyCode==39 && next!=undefined) location=next; 
	  });
  },
	'scroll': function(){
		if( $(".ff-page-scroll").length ){
			var $e = $(".ff-page-scroll").eq(0);
			$(window).bind('scroll', function(){
				$this = $(this);
				$page = $e.attr('data-page')*1+1;
				$id = $e.attr('data-target');
				if( ($(this).scrollTop() + $(window).height()) >= $(document).height() ){
					$.get($e.attr('data-url')+$page, function(data){
						if(data){
							$(".ff-page-scroll").eq(0).attr("data-page",$page);
							$($id).append(data);
							$($id+" .ff-img").lazyload();
						}else{
							$(".ff-page-scroll").remove();
							$this.unbind("scroll");
						}
					},'html');
				}
			});
		}
	}
},
'alert':{//��ʾ
	'success':function($id, $tips){
		$($id).html('<div class="alert alert-success"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>�ɹ���</strong>'+$tips+'</div>');
	},
	'warning':function($id, $tips){
		$($id).html('<div class="alert alert-warning"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>���棡</strong>'+$tips+'</div>');
	}
},
'image': {//ͼƬ
	'lazyload': function(){//�ӳټ���
		$.ajaxSetup({
			cache: true
		});
		$.getScript(cms.root+"Public/jquery.lazyload/1.9.7/jquery.lazyload.min.js", function(response, status) {
			$("img.ff-img").lazyload({
				placeholder : cms.root+"Public/images/no.jpg",
				effect : "fadeIn",
				failurelimit: 15
				//threshold : 400
				//skip_invisible : false
				//container: $(".carousel-inner"),
			}); 
		});
	},
	'qrcode': function(){//���ɶ�ά��
		//$("[data-toggle='popover']").popover({html: true});
		$(".glyphicon-phone").popover({
				html: true
		});
		$(".glyphicon-phone").on('show.bs.popover', function () {
			$(".glyphicon-phone").attr('data-content','<img class="ff-qrcode" src="//cdn.feifeicms.co/qrcode/1.0/?w=150&h=150&url='+encodeURIComponent(feifei.browser.url)+'"/>');
		})
	},
	'vcode':function(){//��ȫ��
		return '<label><img class="ff-vcode-img" src="'+cms.root+'index.php?s=Vcode-Index"></label>';
	},
	'slide':function(){//�ֲ��õ�
		$('.ff-slide').carousel({interval: $('.ff-slide').attr('data-interval')*1});
	}
},
'vcode': {//��֤��
	'load': function(){
		feifei.vcode.focus();
		feifei.vcode.click();
	},
	'focus': function(){//��֤��򽹵�
		$('body').on("focus", ".ff-vcode", function(){
			$(this).removeClass('ff-vcode').parent().after(feifei.image.vcode());
			$(this).unbind();
		});
	},
	'click': function(){//���ˢ��
		$('body').on('click', 'img.ff-vcode-img', function(){
			$(this).attr('src', cms.root+'index.php?s=Vcode-Index');
		});
	}
},
'search': {//����
	'keydown': function(){//�س� 4.1update
		$(".ff-search input").keyup(function(event){
			if(event.keyCode == 13){
				$form = $(this).parents('form');
				$wd = $form.find('.ff-wd').val();
				$action = $form.attr('data-action');
				if(!$wd){
					$form.find('.ff-wd').focus();
					$form.find('.ff-wd').attr('data-toggle','tooltip').attr('data-placement','bottom').attr('title','������ؼ���').tooltip('show');
					return false;
				}
				if($action){
					location.href = $action.replace('FFWD',encodeURIComponent($wd));
					return false;
				}
			}
		});
	},
	'dropdown': function(){//�����˵�
		$(".ff-search .dropdown-menu li a").on("click", function(){
			$form = $(this).parents('form');
			if($(this).attr('data-action')){
				$form.attr('data-sid','');
				$form.attr('data-action', $(this).attr('data-action'));
				$form.find('.dropdown-toggle .title').html($(this).html());
			}
		});
	},
	'submit': function(){//������ 4.1update
		$(".ff-search").on("submit", function(){
			$wd = $(this).find('.ff-wd').val();
			$action = $(this).attr('data-action');
			if(!$wd){
				$(this).find('.ff-wd').focus();
				$(this).find('.ff-wd').attr('data-toggle','tooltip').attr('data-placement','bottom').attr('title','������ؼ���').tooltip('show');
				return false;
			}
			if($action){
				location.href = $action.replace('FFWD',encodeURIComponent($wd));
				return false;
			}
		});
	},
	'autocomplete': function(){//3.5��������������� 4.1update
		var $limit = $('.ff-search').eq(0).attr('data-limit')*1;
		var $sid = $('.ff-search').eq(0).attr('data-sid')*1;
		if( $limit > 0){
			$.ajaxSetup({
				cache: true
			});
			$.getScript(cms.root+"Public/jquery.devbridge-autocomplete/1.4.7/jquery.autocomplete.min.js", function(response, status) {
				$('.ff-wd').autocomplete({
					serviceUrl : cms.root+'index.php?g=home&m=search&a=api&sid='+$sid,
					params: {'limit': $limit},
					paramName: 'wd',
					maxHeight: 400,
					transformResult: function(response) {
						var obj = $.parseJSON(response);
						return {
							suggestions: $.map(obj.data, function(dataItem) {
								return { value: dataItem.name, data: dataItem.link };
							})
						};
					},
					onSelect: function (suggestion) {
						location.href = suggestion.data;
						//alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
					}
				});
			});
		}
	},
	'hot':function(){
		$(".ff-search [data-toggle='tooltip']").tooltip();
		$("#ff-site-hot").load(cms.root+"index.php?s=ajax-site_hot");
	}
},
'record': {//�Ƽ�¼
	'load': function(){
		feifei.record.get();
		feifei.record.set();
		feifei.record.del();
	},
	'get':function(){
		//��˻�ȡ��¼
		if($(".ff-record-get").eq(0).length){
			$.get(cms.root+'index.php?g=home&m=record&a=vod&sid=1', function(data){
				if(data == ''){
					data = '<strong>���޹ۿ���¼</strong>';
				}
				$(".ff-record-get").attr('data-content',data);
			});
		}
		//�����¼�
		$(".ff-record-get").popover().on("mouseenter", function () {
			var _this = this;
			$(this).popover("show");
			$(".popover").on("mouseleave", function () {
				$(_this).popover('hide');
			});
		}).on("mouseleave", function () {
			var _this = this;
			setTimeout(function () {
				if (!$(".popover:hover").length) {
					$(_this).popover("hide");
				}
			}, 300);
		});
	},
	'set':function(){//�û�������¼
		//�Զ�д��ۿ��������¼
		if($(".ff-record-set[data-type=1]").eq(0).attr('data-sid')){
			$this = $(".ff-record-set[data-type=1]").eq(0);
			$.get(cms.root+'index.php?g=home&m=record&a=post&sid='+$this.attr("data-sid")+'&did='+$this.attr("data-id")+'&type=1&did_sid='+$this.attr("data-id-sid")+'&did_pid='+$this.attr("data-id-pid"));
		}
		//ϲ�� �뿴 �ڿ� ���� д���¼
		$('body').on('click', 'a.ff-record-set', function(e){
			//�Ƿ���Ҫ��֤��¼
			if(cms.userforum == 1 && cms.userid < 1){
				feifei.user.login();
				return false;
			}
			var $this = $(this);
			if($(this).attr("data-id")){
				$.ajax({
					url: cms.root+'index.php?g=home&m=record&a=post&sid='+$(this).attr("data-sid")+'&did='+$(this).attr("data-id")+'&type='+$(this).attr("data-type"),
					cache: false,
					dataType: 'json',
					success: function(json){
						if(json.status == 200){
							$this.addClass('disabled');
						}else{
							$this.attr('title', json.info);
							$this.tooltip('show');
						}
					}
				});
			}
		});
	},
	'del':function(){//ɾ����¼
		$('body').on('click', 'a.ff-record-delete', function(e){
			var $this = $(this);
			if($(this).attr("data-id")){
				$.ajax({
					url: cms.root+'index.php?g=home&m=record&a=delete&id='+$(this).attr("data-id"),
					cache: false,
					dataType: 'json',
					success: function(json){
						if(json.status == 200){
							location.reload();
						}else{
							$this.attr('title', json.info).tooltip('show');
						}
					}
				});
			}
		});
	}
},
'score': {//����
	'raty': function(){
		if( $('.ff-score').length ){
			$.ajaxSetup({ 
				cache: true 
			});
			$("<link>").attr({ rel: "stylesheet",type: "text/css",href: "//cdn.bootcss.com/raty/2.7.1/jquery.raty.min.css"}).appendTo("head");
			//
			$.getScript("//cdn.bootcss.com/raty/2.7.1/jquery.raty.min.js", function(response, status) {
				$(".ff-score").each(function(i){
					$(".ff-score").eq(i).find('.ff-score-raty').raty({ 
						starType: 'i',
						number: 5,
						numberMax : 5,
						half: true,
						score : function(){
							return $(this).attr('data-score');
						},
						click: function(score, evt) {
							$this = $(this);
							$.ajax({
								type: 'get',
								url: cms.root+'index.php?s=gold-'+$(this).attr('data-module')+'-id-'+$(this).attr('data-id')+'-score-'+(score*2),
								timeout: 5000,
								dataType:'json',
								error: function(){
									$this.attr('title', '�����쳣��').tooltip('show');
								},
								success: function(json){
									if(json.status == 1){
										$this.parent().find('.ff-score-val').html(json.data.gold);
									}else{
										$this.attr('title', json.info).tooltip('show');
									}
								}
							});
						}
					});					
				});
			});
		}
	}
},
'updown':{//����
	'click': function(){
		$('body').on('click', 'a.ff-updown-set', function(e){
			var $this = $(this);
			if($(this).attr("data-id")){
				$.ajax({
					url: cms.root+'index.php?s=updown-'+$(this).attr("data-module")+'-id-'+$(this).attr("data-id")+'-type-'+$(this).attr("data-type"),
					cache: false,
					dataType: 'json',
					success: function(json){
						$this.addClass('disabled');
						if(json.status == 1){
							if($this.attr("data-type")=='up'){
								$this.find('.ff-updown-val').html(json.data.up);
							}else{
								$this.find('.ff-updown-val').html(json.data.down);
							}
						}else{
							$this.attr('title', json.info);
							$this.tooltip('show');
						}
					}
				});
			}
		});
	}
},
'hits':{//����
	'load': function(){
		$(".ff-hits").each(function(i){
			var $this = $(".ff-hits").eq(i);
			$.ajax({
				url: cms.root+'index.php?s=hits-show-id-'+$this.attr("data-id")+'-sid-'+$this.attr("data-sid")+'-type-'+$this.attr("data-type"),
				cache: true,
				dataType: 'json',
				success: function(json){
					$type = $this.attr('data-type');
					if($type != 'insert'){
						$this.html(eval('(json.' + $type + ')'));
					}
				}
			});
	 });
	}
},
'share':{//����
	'baidu': function(){
		if($(".ff-share").length ){
			$size = $(".ff-share").attr('data-size');
			if(!$size){$size = 16;}
			if( $(".ff-share dd").length ){
				$id = $(".ff-share dd");
			}else{
				$id = $(".ff-share");
			}
			$($id).html('<div class="bdsharebuttonbox"><a href="#" class="bds_qzone" data-cmd="qzone" title="����QQ�ռ�"></a><a href="#" class="bds_weixin" data-cmd="weixin" title="����΢��"></a><a href="#" class="bds_sqq" data-cmd="sqq" title="����QQ����"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="��������΢��"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="������Ѷ΢��"></a><a href="#" class="bds_bdysc" data-cmd="bdysc" title="�����ٶ����ղ�"></a><a href="#" class="bds_copy" data-cmd="copy" title="����������ַ"></a></div>');
			window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":""+$size+""},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='//bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
		}
	}
},
'forum': {//����ģ�鹦��
	'load':function(){
		if($('.ff-forum[data-type=feifei]').length){
			this.system();
		}
		if($('.ff-forum[data-type=changyan]').length){
			this.changyan();
		}
	},
	'system': function(){
		//��ʼ����
		if($('.ff-forum[data-type=feifei]').attr('data-sid')){
			feifei.forum.ajax('.ff-forum', $('.ff-forum[data-type=feifei]').attr('data-sid'), $('.ff-forum[data-type=feifei]').attr('data-id'),$('.ff-forum[data-type=feifei]').attr('data-pid'), 0, 1);
		}
		//��¼��֤
		$(".ff-forum").on("focus", 'textarea[name=forum_content]', function(){ //���ύ
			if(cms.userforum == 1 && cms.userid < 1){
				feifei.user.login();
			}
		});
		//�ظ�����
		$('body').on('click', 'a.forum-reply-set', function(){
			var $pid = $(this).attr("data-id");
			var $reply = $(this).parents('.media-body').find('.forum-reply');
			var $form = $($(".ff-forum-post").eq(0).prop("outerHTML"));
			if($pid){
				$form.find('.ff-alert').html('');
				$form.find("button[type='submit']").removeClass('disabled')
				$form.find("input[name='forum_pid']").val($pid);
				$form.show();
				$($reply).html($form);
				$($reply).collapse('toggle');
			}
		});
		//�ٱ�����
		$('body').on('mouseenter', '.ff-forum-item .media-body', function(){
			$(this).find('.forum-report').fadeIn();
		});
		$('body').on('mouseleave', '.ff-forum-item .media-body', function(){
			$(this).find('.forum-report').fadeOut();
		});
		$('body').on('click', 'a.forum-report', function(){
			$(this).remove();//�Ƴ���ť
			var $id = $(this).attr("data-id");
			if($id){
				$.ajax({
					type: 'get',
					url: cms.root+'index.php?s=forum-report-id-'+$id,
					timeout: 3000,
					dataType:'json',
					success:function(json){
						feifei.alert.success($('.form-forum').eq(0).find('.ff-alert'), json.info);
					}
				});
			}
		});
		//ɾ������
		$('body').on('click', 'a.forum-delete', function(){
			var $this = $(this);
			var $id = $(this).attr("data-id");
			if($id){
				$.ajax({
					type: 'get',
					url: cms.root+'index.php?s=forum-delete-id-'+$id,
					timeout: 3000,
					dataType:'json',
					success:function(json){
						if(json.status == 200){
							location.reload();
						}else{
							$this.attr('title', json.info).tooltip('show');
						}
					}
				});
			}
		});
		//��������
		$("body").on("submit", '.ff-forum-post', function(){
			var $this = $(this);
			var $sid = $(this).find('input[name=forum_sid]').val();
			$.post($this.attr('action'), $this.serialize(), function(json){
				if(json.status == 200){//����Ҫ�������
					feifei.alert.success($this.find('.ff-alert'), json.info);//�����ɹ���ʾ
					$this.find("button[type='submit']").addClass('disabled');//��ֹ�ٴ��ύ
					//���⡢�ظ�������
					if(json.data.forum_pid){//�ظ���
						feifei.forum.reply(json.data.forum_pid);//���»ظ�������ʾ�ظ����Ӱ�ť
						setTimeout(function(){$('.forum-reply[data-id='+json.data.forum_pid+']').fadeOut('slow')}, 2000);//�Ƴ��ظ�������
					}else{//������
						setTimeout(function(){feifei.forum.ajax('.ff-forum-item', json.data.forum_sid, json.data.forum_cid, 0, 1, 1)}, 2000);
						setTimeout(function(){$this.hide()}, 3000);
					}
					//�������ۺ��Ƿ���Ҫˢ����ҳ
					if($('.ff-forum-reload').length){
						location.reload();
					}
				}else if(json.status > 200){//��Ҫ���
					feifei.alert.success($this.find('.ff-alert'), json.info);//�����ɹ���ʾ
					$this.find("button[type='submit']").addClass('disabled');//��ֹ�ٴ��ύ
				}else{
					feifei.alert.warning($this.find('.ff-alert'), json.info);
				}
			 },'json');
			return false;
		});
	},
	'ajax': function($target, $sid, $cid, $pid, $ismore, $page){//AJAX����ϵͳ����
		$.ajax({
			type: 'get',
			url: cms.root+'index.php?s=forum-ajax-sid-'+$sid+'-cid-'+$cid+'-pid-'+$pid+'-ismore-'+$ismore+'-p-'+$page,
			timeout: 3000,
			error: function(){
				$($target).html('���ۼ���ʧ�ܣ���ˢ��...');
			},
			success:function($html){
				$($target).html($html);
			}
		});
	},
	'reply': function($id){//���»ظ�������ʾ�ظ�����
		$.ajax({
			type: 'get',
			url: cms.root+'index.php?s=forum-reply-id-'+$id,
			timeout: 3000,
			dataType:'json',
			success:function(json){
				if(json.status==200){
					$('.forum-reply-set[data-id='+$id+']').find('.forum-reply-val').html(json.data);
					$('.forum-reply-get[data-id='+$id+']').fadeIn();
				}
			}
		});
	},
	'changyan': function(){
		$appid = $('.ff-forum[data-type=changyan]').attr('data-cy-id');
		$conf = $('.ff-forum[data-type=changyan]').attr('data-cy-conf');
		$sourceid = $('.ff-forum[data-type=changyan]').attr('data-sid')+'-'+$('.ff-forum[data-type=changyan]').attr('data-id');
		var width = window.innerWidth || document.documentElement.clientWidth;
		if (width < 768) { 
			$(".ff-forum").html('<div id="SOHUCS" sid="'+$sourceid+'"></div><script charset="utf-8" id="changyan_mobile_js" src="https://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id='+$appid+'&conf=prod_'+$conf+'"><\/script>');
		}else{
			$(".ff-forum").html('<div id="SOHUCS" sid="'+$sourceid+'"></div>');
			$.getScript("https://changyan.sohu.com/upload/changyan.js",function(){
				window.changyan.api.config({
					appid: $appid,
					conf: 'prod_'+$conf
				});
			});
		}
	}
},
'scenario': {//�ּ�����
	'load':function(){
		var $max = $(".ff-scenario-pill").attr('data-max')*1;
		var $count = $(".ff-scenario-content dl").length;
		var $li = 0;
		var $list = '';
		if($count > 0 && $max>0){
			for($i=0; $i<$count; $i++){
				if(($i+$max) > $count){
					$max_ji = $count;
				}else{
					$max_ji = $i+$max;
				}
				if($i % $max == 0){
					$li++;
					$list+='<li><a href="javascript:;" data-target=".ff-scenario-'+$li+'" data-toggle="pill">��'+($i+1)+'-'+$max_ji+'��</a></li>';
				}
				$(".ff-scenario-content dl").eq($i).addClass('ff-scenario-'+$li);
			}
			$('.ff-scenario-pill').html($list);
			$('.ff-scenario-pill a:first').tab('show');
		}
	}
},
'playurl': {//���ŵ�ַ
	'tongji': function(){
		if($("#cms_player").length){
			$.getScript("//cdn.feifeicms.co/tongji/4.1/?"+~(-new Date()/36e5));
		}
	},
	'active':function(){
		$('.ff-playurl li[data-id="'+$('.ff-playurl[data-active]').attr('data-active')+'"]').addClass("active");
		$('.ff-playurl-tab a[data-target="'+$('.ff-playurl-tab[data-active]').attr('data-active')+'"]').tab('show');
		$('.ff-playurl-dropdown a[data-target="'+$('.ff-playurl-dropdown[data-active]').attr('data-active')+'"]').tab('show');
	},	
	'dropdown':function(){
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			$(this).parents('.btn-group').find('.dropdown-toggle span:eq(0)').html($(e.target).text());
			$(this).parents('.dropdown-menu').find('li').removeClass('active');
			$(this).parent().addClass('active');
		});
	},
	'error':function(){//����
		$('.ff-playurl-error').on('click',function(){
			$id = $(this).attr('data-id');
			$sid = $(this).attr('data-sid');
			$pid = $(this).attr('data-pid');
			$content = $(this).attr('data-content')+' ��'+$sid+'�� ��'+$pid+'��';
			$.ajax({
				type: 'POST',
				url: cms.root+'index.php?s=forum-update',
				timeout: 3000,
				dataType:'json',
				data: "forum_sid=24&forum_pid="+$sid+"&forum_cid="+$id+"&forum_cid_ep="+$pid+"&forum_content="+$content,
				error: function(){
					alert('�����쳣');
				},
				success: function(json){
					alert('�ύ�ɹ�');
				}
			});
		});
	},
	'more':function(){//...Ч��
		$('.ff-playurl').each(function(i){
			$this = $(this);
			$config = $this.attr('data-more')*1;
			$max = $this.find('li a').size();
			if(($config+2) < $max && $config>0){
				$max_html = $($this.find('li:last').prop("outerHTML")).find('a').attr('href','#all').html('ȫ��...');
				$max_html = '<li class="'+$this.find('li').attr('class')+'">'+$max_html.prop("outerHTML")+'</li>';
				$this.find('li').each(function(n){
					if(n+1 > $config){
						$(this).hide();
					}
				});
				$this.find('li').eq($config).after($max_html);
				$this.find('li:last').show();
			}
	 	});
		//more���
		$('.ff-playurl').on('click', 'a', function(e){
			if($(this).attr('href') == '#all'){
				$(this).parent().parent().find('li').show();
				$(this).parent().remove();
				return false;
			}
		});
	},
	//vip�������ص�
	'vip_callback':function($vod_id, $vod_sid, $vod_pid, $status, $trysee, $tips){
		if($status != 200){
			if($trysee > 0){
				window.setTimeout(function(){
					$.get(cms.root+'index.php?s=vod-vip-action-trysee-id-'+$vod_id+'-sid-'+$vod_sid+'-pid-'+$vod_pid, function(html){
						$('#cms_player').html(html).removeClass("embed-responsive-4by3").removeClass("embed-responsive-16by9").css({"height":"auto"});
					},'html');
				},1000*60*$trysee);
			}else{
				$('#cms-player-vip .cms-player-box').html($tips);
				$('#cms-player-vip .cms-player-iframe').hide();
				$('#cms_player').removeClass("embed-responsive-4by3").removeClass("embed-responsive-16by9").css({"height":"auto"});
			}
			//֧��Ӱ�Ұ�ť
			$('#cms_player').on("click",".vod-price",function(){
				$(this).html('Loading...');
				$.get(cms.root+'index.php?s=vod-vip-action-ispay-id-'+$vod_id+'-sid-'+$vod_sid+'-pid-'+$vod_pid, function(json){
					if(json.status == 200){
						location.reload();
					}else if(json.status == 500 || json.status == 501){
						feifei.user.login();
					}else{
						$('#cms_player').html(json.info);
					}
				},'json');
			});
		}else{
			//ӵ��VIP�ۿ�Ȩ��
		}
	},
	'xunlei':function(){//Ѹ������
		if($(".ff-playurl-down").length){
			$.getScript("//open.thunderurl.com/thunder-link.js",function(){
				//��������
				jQuery(".thunder-link").unbind("click").bind("click",function(){
					thunderLink.newTask({
						downloadDir: '',
						tasks: [{
							name: jQuery(this).attr("data-name"),
							url: jQuery(this).attr("data-url")
						}]
					});
					return false;
				});
				//������������
				jQuery(".thunder-link-all").unbind("click").bind("click",function(){
					var index=jQuery(this).attr("data-sid");
					var tasks=[];
					jQuery("input[name='thunder-link-all-"+index+"']:checked").each(function(i){
						tasks.push({"name":jQuery(this).attr("data-name"),"url":jQuery(this).val()});
					});
					thunderLink.newTask({
						downloadDir: '',
						installFile: '',
						taskGroupName: '',
						tasks: tasks
					});
				});
				//3.4���������ȥ���ļ�������
				$(".ff-playurl-down input[type=text]").focus(function(){
					$(this).val($(this).parent().find('input[type=checkbox]').val());
				});
				//3.8����ʧȥ�����¼�
				$(".ff-playurl-down input[type=text]").blur(function(){
					$(this).val($(this).parent().find('input[type=checkbox]').attr('data-name')+' '+$(this).parent().find('input[type=checkbox]').val());
				});
			});
		}
	}
},
'user':{
	//��������
	'load':function(){
		//��ͬģʽ�´����û�������Ϣ
		feifei.user.islogin();
		//ģ̬���¼�¼�
		$("body").on("click",".user-login-modal",function(){
			feifei.user.login();
			return false;
		});
		//�������߳�ֵ�¼�
		$("body").on("click",".user-score-payment",function(){
			feifei.user.ScorePayment();
			return false;
		});
		//���ֿ��ܳ�ֵ�¼�
		$("body").on("click",".user-score-card",function(){
			feifei.user.ScoreCard();
			return false;
		});
		//��������VIP�¼�
		$("body").on("click",".user-score-upvip",function(){
			feifei.user.ScoreUpvip();
			return false;
		});
		//�û������޸�����
		$("body").on("click",".user-change-email", function(){
			feifei.user.ChangeEmail();
			return false;
		});
		//�û������޸�����
		$("body").on("click",".user-change-pwd", function(){
			feifei.user.ChangePwd();
			return false;
		});
	},
	//��̬ģʽ�����û�ID
	'islogin':function(){
		if($('.ff-user').length && (cms.urlhtml == 1)){
			$.ajax({
				type: 'get',
				url: cms.root+'index.php?s=user-info',
				timeout: 3000,
				dataType:'json',
				success:function(json){
					if(json.status==200){
						cms.userid = json.data.user_id;
						cms.username = json.data.user_name;
						$('.ff-user').removeClass("user-login-modal");
						$('.ff-user[data-href]').attr('href',$('.ff-user[data-href]').attr('data-href'));
						$('.ff-user[data-name]').html('<a href="'+$('.ff-user').attr('data-href')+'">'+cms.username+'</a>');
					}
				}
			});
		}
	},
	//AJAXģ̬���¼
	'login':function(){
		$('.ff-modal').remove();
		$.ajax({
			type: 'get',
			cache: false,
			url: cms.root+'index.php?s=user-ajax_login',
			timeout: 3000,
			success:function($html){
				$('body').append($html);
				$('.ff-modal').modal('show');
				$(".form-user-login").on('submit',function(e){
					$.ajax({
						url: $(this).attr('action'),
						type: 'POST',
						dataType: 'json',
						timeout: 3000,
						data: $(this).serialize(),
						beforeSend: function(xhr){
							$('.user-login-alert').html('���ڵ�¼...');
						},
						error : function(){
							$('.user-login-alert').html('����ʧ�ܣ���ˢ����ҳ��');
						},
						success: function(json){
							if(json.status == 200){
								location.reload();
							}else{
								$('#user-submit').html('��¼');
								feifei.alert.warning('.user-login-alert',json.info);
							}
						},
						complete: function(xhr){
						}
					});
					return false;
				});
			}
		});
	},
	//�������߳�ֵ
	'ScorePayment':function(){
		feifei.order.payment();
	},
	//���ֿ��ܳ�ֵ
	'ScoreCard':function(){
		feifei.order.card();
	},
	//����VIP
	'ScoreUpvip':function(){
		$('.ff-modal').remove();
		$('.modal-backdrop').hide();
		$.ajax({
			type: 'get',
			url: cms.root+'index.php?s=user-ajax_upvip',
			timeout: 3000,
			success:function($html){
				$('body').append($html);
				$('.ff-modal').modal('show');
				$(".user-upvip-form").on('submit',function(e){
					$data_url = $(this).attr('data-url');//���ܳ�ֵ��ַ
					$.ajax({
						url: $(this).attr('action'),
						type: 'POST',
						dataType: 'json',
						timeout: 3000,
						data: $(this).serialize(),
						beforeSend: function(xhr){
							$('.user-upvip-alert').html('Loading...');
						},
						error : function(){
							$('.user-upvip-alert').html('����ʧ�ܣ���ˢ����ҳ��');
						},
						success: function(json){
							if(json.status == 200){
								feifei.alert.success('.user-upvip-alert', '������ɣ�лл֧�֡�');
								setTimeout(function(){location.reload();}, 2000);
							}else if(json.status == 404){
								feifei.alert.success('.user-upvip-alert', '���ȵ�¼��');
								setTimeout(function(){$(".ff-modal").modal('hide');$('.modal-backdrop').hide();feifei.user.login();}, 2000);
							}else if(json.status == 501){
								feifei.alert.warning('.user-upvip-alert', 'Ӱ�Ҳ��㣬����Ҫ'+json.info+'��Ӱ�ң����ȳ�ֵ��');
								//�п���������ʱ��
								if($data_url && $('.user-upvip-btn').length){
									$('.user-upvip-btn').removeClass('hidden').removeClass('d-none').show();
								}else{
									setTimeout(function(){$(".ff-modal").modal('hide');$('.modal-backdrop').hide();feifei.order.payment();}, 2000);
								}
							}else{
								feifei.alert.warning('.user-upvip-alert', json.info);
							}
						},
						complete: function(xhr){
						}
					});
					return false;
				});
			}
		});
	},
	//�޸�����
	'ChangeEmail':function(){
		$('.ff-modal').remove();
		$('.modal-backdrop').hide();
		$.ajax({
			type: 'get',
			url: cms.root+'index.php?s=user-ajax_email',
			timeout: 3000,
			success:function($html){
				$('body').append($html);
				$('.ff-modal').modal('show');
				$(".user-email-form").on('submit',function(e){
					$.ajax({
						url: $(this).attr('action'),
						type: 'POST',
						dataType: 'json',
						timeout: 3000,
						data: $(this).serialize(),
						beforeSend: function(xhr){
							$('.user-email-alert').html('Loading...');
						},
						error : function(){
							$('.user-email-alert').html('����ʧ�ܣ���ˢ����ҳ��');
						},
						success: function(json){
							if(json.status == 200){
								feifei.alert.success('.user-email-alert', '�����޸���ɡ�');
								setTimeout(function(){location.reload();}, 2000);
							}else if(json.status == 404){
								feifei.alert.success('.user-email-alert', '���ȵ�¼��');
								setTimeout(function(){$(".ff-modal").modal('hide');$('.modal-backdrop').hide();feifei.user.login();}, 2000);
							}else{
								feifei.alert.warning('.user-email-alert', json.info);
							}
						},
						complete: function(xhr){
						}
					});
					return false;
				});
			}
		});
	},
	//�޸�����
	'ChangePwd':function(){
		$('.ff-modal').remove();
		$.ajax({
			type: 'get',
			url: cms.root+'index.php?s=user-ajax_repwd',
			timeout: 3000,
			success:function($html){
				$('body').append($html);
				$('.ff-modal').modal('show');
				$(".user-repwd-form").on('submit',function(e){
					$.ajax({
						url: $(this).attr('action'),
						type: 'POST',
						dataType: 'json',
						timeout: 3000,
						data: $(this).serialize(),
						beforeSend: function(xhr){
							$('.user-repwd-alert').html('Loading...');
						},
						error : function(){
							$('.user-repwd-alert').html('����ʧ�ܣ���ˢ����ҳ��');
						},
						success: function(json){
							if(json.status == 200){
								feifei.alert.success('.user-repwd-alert', '�����޸���ɡ�');
								setTimeout(function(){location.reload();}, 2000);
							}else if(json.status == 404){
								feifei.alert.success('.user-repwd-alert', '���ȵ�¼��');
								setTimeout(function(){$(".ff-modal").modal('hide');$('.modal-backdrop').hide();feifei.user.login();}, 2000);
							}else{
								feifei.alert.warning('.user-repwd-alert', json.info);
							}
						},
						complete: function(xhr){
						}
					});
					return false;
				});
			}
		});
	}
},
'order':{//Ӱ�Ҷ���ģ��
	'payment':function(){//���߳�ֵ�������
		$('.ff-modal').remove();
		$('.modal-backdrop').hide();
		$.ajax({
			type: 'get',
			url: cms.root+'index.php?s=payment-index',
			timeout: 3000,
			success:function($html){
				$('body').append($html);
				$('.ff-modal').modal('show');
				$(".forum-payment").on('submit',function(e){
					if($(".forum-payment input[name=score_ext]").val() < $(".forum-payment").attr('data-small')){
						feifei.alert.warning('.user-pay-alert', 'ÿ�����ٳ�ֵ<strong>'+$(".forum-payment").attr('data-small')+'</strong>Ԫ');
						return false;
					}
					setTimeout(function(){$(".ff-modal").modal('hide');$('.modal-backdrop').hide();}, 5000);
				});
			}
		});
	},
	'card':function(){//���ܳ�ֵ�������
		$('.ff-modal').remove();
		$('.modal-backdrop').hide();
		$.ajax({
			type: 'get',
			url: cms.root+'index.php?s=payment-card',
			timeout: 3000,
			success:function($html){
				$('body').append($html);
				$('.ff-modal').modal('show');
				$(".forum-card").on('submit',function(e){
					$.ajax({
						url: $(this).attr('action'),
						type: 'POST',
						dataType: 'json',
						timeout: 3000,
						data: $(this).serialize(),
						beforeSend: function(xhr){
							$('.alert-card').html('Loading...');
						},
						error : function(){
							$('.alert-card').html('����ʧ�ܣ���ˢ����ҳ��');
						},
						success: function(json){
							if(json.status == 200){
								feifei.alert.success('.alert-card', '��ֵ�ɹ���лл֧�֡�');
								setTimeout(function(){location.reload();}, 2000);
							}else{
								feifei.alert.warning('.alert-card', json.info);
							}
						},
						complete: function(xhr){
						}
					});
					return false;
				});
			}
		});
	}
}
//end
};
/*.ff-search #wd #ff-goback .ff-gallery .ff-raty .ff-img .ff-share .ff-safecode .ff-reply*/
$(document).ready(function(){
	if(feifei.browser.useragent.mobile){
		feifei.mobile.jump();
		feifei.mobile.nav();
		feifei.mobile.goback();
		feifei.mobile.flickity();
	}
	feifei.user.load();
	feifei.cms.nav();//
	feifei.cms.collapse();
	feifei.cms.pushBaidu();
	feifei.search.dropdown();
	feifei.search.autocomplete();
	feifei.search.hot();//
	feifei.search.submit();//
	feifei.search.keydown();//
	feifei.image.lazyload();
	feifei.image.slide();
	feifei.image.qrcode();//
	feifei.playurl.tongji();
	feifei.playurl.more();
	feifei.playurl.error();
	feifei.playurl.dropdown();
	feifei.playurl.active();
	feifei.playurl.xunlei();
	feifei.page.more();
	feifei.page.keydown();//
	feifei.page.scroll();
	feifei.updown.click();
	feifei.score.raty();
	feifei.scenario.load();
	feifei.forum.load();
	feifei.vcode.load();
	feifei.scroll.totop('ff-totop',10);
	feifei.record.load();//
	feifei.hits.load();
	feifei.share.baidu();
});