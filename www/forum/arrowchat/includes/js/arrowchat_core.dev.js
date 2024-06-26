(function (a) {
	a.arrowchat = function () {

		var $body = a('body');
		var $base;
		var $maintenance;
		var $popout_chat_button;
		var $chatrooms_button;
		var $buddy_list_tab;
		var $open_windows;
		var $closed_windows;
		var $userstab_popup;
		var $tooltip = null;
		var $tooltip_content;
		var $chatrooms_popup;
		var $users = {};
		var $user_popups = {};
		var $chatrooms = {};
		var $chatrooms_popups = {};
		var $unseen_users;

		function addHover($elements, classes) {
			$elements.each( function (i, element) {
				a(element).hover(
					function () {
						a(this).addClass(classes);
					}, function () {
						a(this).removeClass(classes);
					}
				);
			});
		}

		function preventScrolling($target) {
			$target.bind('mousewheel DOMMouseScroll', function (e) {
				var e0 = e.originalEvent,
					delta = e0.wheelDelta || -e0.deltaY || -e0.detail;
				this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
				e.preventDefault();
			});
		}

		function closePopup($popup, $button, hidden) {
			if ($popup !== undefined) {
				if (hidden == 1) {
					$popup.addClass("arrowchat_tabopen_hidden");
				} else{
					$popup.removeClass("arrowchat_tabopen");
				}
			}
			if ($button !== undefined) {
				$button.removeClass("arrowchat_tabclick arrowchat_userstabclick arrowchat_trayclick arrowchat_usertabclick");
			}
		}

		function hideTooltip() {
			if ($tooltip) {
				$tooltip.hide();
			}
		}

		function showTooltip($target, text, is_left, custom_left, custom_top, is_sideways, is_sideways_right) {
			if ($tooltip === null) {
				$tooltip = a('<div id="arrowchat_tooltip"><div class="arrowchat_tooltip_content"></div></div>').appendTo($body);
				$tooltip_content = a('.arrowchat_tooltip_content', $tooltip);
			}
			$tooltip_content.html(text);
			var target_offset = $target.offset();
			var target_width = $target.width();
			var target_height = $target.height();
			var tooltip_width = $tooltip.width();
			if (!custom_left) {
				custom_left = 0;
			}
			if (!custom_top) {
				custom_top = 0;
			}
			if (is_left) {
				$tooltip.css({
					top				: target_offset.top - a(window).scrollTop() - target_height - 5 - custom_top,
					left			: target_offset.left + target_width - 16 - custom_left,
					display			: "block",
					'padding-right' : "0px",
					'padding-left' : "0px"
				}).addClass("arrowchat_tooltip_left");
			} else if (is_sideways_right) {
				$tooltip.css({
					top				: target_offset.top - a(window).scrollTop() + (target_height/2) - 10 - custom_top,
					left			: target_offset.left + target_width + 28 - custom_left,
					display			: "block",
					'padding-right' : "0px",
					'padding-left' : "6px"
				}).removeClass("arrowchat_tooltip_left");
			} else if (is_sideways) {
				$tooltip.css({
					top				: target_offset.top - a(window).scrollTop() + (target_height/2) - 10 - custom_top,
					left			: target_offset.left + target_width - tooltip_width + 18 - custom_left,
					display			: "block",
					'background-position'	: tooltip_width - 128 + "px -58px",
					'padding-right' : "6px",
					'padding-left' : "0px"
				}).removeClass("arrowchat_tooltip_left");
			} else {
				$tooltip.css({
					top				: target_offset.top - a(window).scrollTop() - target_height - 5 - custom_top,
					left			: target_offset.left + target_width - tooltip_width + 18 - custom_left,
					display			: "block",
					'padding-right' : "0px",
					'padding-left' : "0px"
				}).removeClass("arrowchat_tooltip_left");
			}
			if (W) {
				$tooltip.css("position", "absolute");
				$tooltip.css(
					"top", 
					parseInt(a(window).height()) - parseInt($tooltip.css("bottom")) - parseInt($tooltip.height()) + a(window).scrollTop() + "px"
				);
			}
		}

		function replaceURLWithHTMLLinks(text) {
			return anchorme.js(text);
		}

		RegExp.escape = function(text) {
			return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
		};
		
		function youTubeEmbed(mess) {
			var regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([^\s]+)$/mi;
			var match = mess.match(regExp);
			if (match && match[1].length == 11) {
				mess = '<span style="margin-bottom:5px;display:block">' + match[0] + '</span><div style="margin-bottom:5px"></div><iframe style="width:100%;height:140px" src="https://www.youtube.com/embed/' + match[1] + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
			}
			return mess;
		}

		function smileyreplace(mess) {
			if (c_disable_smilies != 1) {
				mess = mess.replace(/^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*$/g, function(match, contents, offset, s) 
					{
						return '<span class="arrowchat_emoji_text arrowchat_emoji_32">' + match + '</span>';
					}
				);
				for (var i = 0; i < Smiley.length; i++) {
					var smiley_test = Smiley[i][1].replace(/</g, "&lt;").replace(/>/g, "&gt;");
					var check_emoticon = mess.lastIndexOf(smiley_test);
					if (check_emoticon != -1) {
						mess = mess.replace(
							new RegExp(RegExp.escape(smiley_test), 'g'),
							'<span class="arrowchat_emoji_text"><img src="' + c_ac_path + 'includes/emojis/img/16/' + Smiley[i][0] + '" alt="" /> </span>'
						);
					}
				}
				for (var i = 0; i < premade_smiley.length; i++) {
					var smiley_test = premade_smiley[i][0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
					var check_emoticon = mess.lastIndexOf(smiley_test);
					if (check_emoticon != -1) {
						if (mess == smiley_test) {
							mess = mess.replace(
								new RegExp(RegExp.escape(smiley_test), 'g'),
								premade_smiley[i][1]
							);
						} else {
							mess = mess.replace(
								new RegExp(RegExp.escape(" " + smiley_test), 'g'),
								' ' + premade_smiley[i][1]
							);
						}
					}
				}
			}
			return mess;
		}
		
		function update_pending_room_status(id, pending_msg_count_local, pending_class) {
			if (a(".arrowchat_pending_msg_room_"+pending_msg_count_local).length > 0) {
				a(".arrowchat_pending_msg_room_"+pending_msg_count_local+" .arrowchat_pending_icon").addClass(pending_class);
				if (a.isNumeric(id) && id != 0)
					a(".arrowchat_pending_msg_room_"+pending_msg_count_local).attr('id', "arrowchat_chatroom_message_"+id);
			}
		}
		
		function sendChatroomMessage($element, to_id) {
			var i = $element.val();
			i = i.replace(/^\s+|\s+$/g, "");
			$element.val("").css({
				height: orig_txt_size,
				'overflow-y': 'hidden'
			}).focus();
			if (c_send_room_msg == 1 && i != "") {
				displayMessage(a(".arrowchat_message_box", $chatrooms_popups[to_id]), lang[209], "error");
			} else {
				var pending_msg_count_local = 0;
				i != "" && a.ajax({
					url: c_ac_path + "includes/json/send/send_message_chatroom.php",
					type: "post",
					cache: false,
					dataType: "json",
					data: {
						userid: u_id,
						username: u_name,
						chatroomid: to_id,
						message: i
					},
					beforeSend: function () {
						pending_msg_room_count++;
						pending_msg_count_local = pending_msg_room_count;
						
						addMessageToChatroom(0, u_name, i, 0, to_id, pending_msg_count_local);
					},
					error: function () {
						displayMessage(a(".arrowchat_message_box", $chatrooms_popups[to_id]), lang[135], "error");
						update_pending_room_status(0, pending_msg_count_local, "arrowchat_pending_error");
					},
					success: function (o) {
						if (o) {
							var is_json = true;
							if (a.isNumeric(o)) is_json = false;
							var no_error = true;
							if (is_json) {
								o && a.each(o, function (i, e) {
									if (i == "error") {
										a.each(e, function (l, f) {
											no_error = false;
											displayMessage(a(".arrowchat_message_box", $chatrooms_popups[to_id]), f.m, "error");
											update_pending_room_status(o, pending_msg_count_local, "arrowchat_pending_error");
										});
									}
								});
							}
							
							if (no_error) {
								update_pending_room_status(o, pending_msg_count_local, "arrowchat_pending_delivered");
								var data_array = [o, u_name, i, to_id];
								lsClick(JSON.stringify(data_array), 'send_chatroom_message');
							}
						}
					}
				});
			}
			return false;
		}

		function chatroomKeydown(key, $element, id) {
			if (key.keyCode == 13 && key.shiftKey == 0) {
				sendChatroomMessage($element, id);
				return false;
			}
		}
		
		function update_pending_status(id, pending_msg_count_local, pending_class) {
			if (a(".arrowchat_pending_msg_"+pending_msg_count_local).length > 0) {
				a(".arrowchat_pending_msg_"+pending_msg_count_local+" .arrowchat_pending_icon").addClass(pending_class);
				if (a.isNumeric(id) && id != 0)
					a(".arrowchat_pending_msg_"+pending_msg_count_local).attr('id', "arrowchat_message_"+id);
			}
		}
		
		function sendUserMessage($element, to_id) {
			var sent_msg = $element.val();
			sent_msg = sent_msg.replace(/^\s+|\s+$/g, "");
			$element.val("").css({
				height: orig_txt_size,
				'overflow-y': 'hidden'
			}).focus();
			if (c_send_priv_msg == 1 && sent_msg != "") {
				displayMessage(a(".arrowchat_message_box", $user_popups[to_id]), lang[209], "error");
			} else {
				var pending_msg_count_local = 0;
				var time = Math.floor((new Date).getTime() / 1E3);
				sent_msg != "" && a.ajax({
					url: c_ac_path + "includes/json/send/send_message.php",
					type: "post",
					cache: false,
					dataType: "json",
					data: {
						userid: u_id,
						to: to_id,
						message: sent_msg
					},
					beforeSend: function () {
						pending_msg_count++;
						pending_msg_count_local = pending_msg_count;
						
						clearTimeout(pa);
						fa = -1;
						
						receiveMessage(0, to_id, sent_msg, time, 1, 0, 1, pending_msg_count_local);
					},
					error: function () {
						displayMessage(a(".arrowchat_message_box", $user_popups[to_id]), lang[135], "error");
						update_pending_status(0, pending_msg_count_local, "arrowchat_pending_error");
					},
					success: function (e) {
						
						if (e) {
							if (!a.isNumeric(e)) {
								a.each(e, function (i, q) {
									if (i == "error") {
										a.each(q, function (l, f) {
											displayMessage(a(".arrowchat_message_box", $user_popups[to_id]), f.m, "error");
											update_pending_status(e, pending_msg_count_local, "arrowchat_pending_error");
										});
									}
								});
							} else {
								last_id[to_id] = e;
								update_pending_status(e, pending_msg_count_local, "arrowchat_pending_delivered");
								var data_array = [e, to_id, sent_msg, time, 1, 1];
								lsClick(JSON.stringify(data_array), 'private_message');
							}
						}
						K = 1;
					}
				});
			}
		}

		function userchatKeydown(key, $element, typing) {
			clearTimeout(pa);
			pa = setTimeout(function () {
				a.post(c_ac_path + "includes/json/send/send_typing.php", {
					userid: u_id,
					typing: typing,
					untype: 1
				}, function () {});
				fa = -1
			}, 5E3);
			if (fa != typing) {
				a.post(c_ac_path + "includes/json/send/send_typing.php", {
					userid: u_id,
					typing: typing
				}, function () {});
				fa = typing
			}

			if (key.keyCode == 13 && key.shiftKey == 0) {
				sendUserMessage($element, typing);
				return false;
			}
		}

		function resizeChatfield($element) {
			var height = $element[0].clientHeight;

			if (height < 94) {
				height = Math.max($element[0].scrollHeight, height);
				height = Math.min(94, height);
				if (height > $element[0].clientHeight) {
					$element.css("height", height + 3 + "px")
				}
			} else {
				$element.css("overflow-y", "auto");
			}
			
			if ($element[0].value.length < 10) {
				$element.css("height", orig_txt_size)
			}
		}

		function chatroomKeyup(b, $element, id) {
			if (a(".arrowchat_smiley_popout", $chatrooms_popups[id]).children(".arrowchat_more_popout").is(":visible")) {
				a(".arrowchat_smiley_popout", $chatrooms_popups[id]).children(".arrowchat_more_popout").hide();
			}
			resizeChatfield($element);
		}

		function userchatKeyup(key, $element, d) {
			if (a(".arrowchat_smiley_popout", $user_popups[d]).children(".arrowchat_more_popout").is(":visible")) {
				a(".arrowchat_smiley_popout", $user_popups[d]).children(".arrowchat_more_popout").hide();
			}
			resizeChatfield($element);
		}

		function clearUserStatus() {
			
		}

		function setUserStatus(status) {
			a.post(c_ac_path + "includes/json/send/send_status.php", {
				userid: u_id,
				status: status
			}, function () {})
		}

		function showUserOffline() {
			w = 1;
			clearUserStatus();
			a("#arrowchat_mobiletab").addClass("arrowchat_mobiletab_offline");
			$buddy_list_tab.removeClass("arrowchat_tabclick").removeClass("arrowchat_userstabclick");
			$userstab_popup.removeClass("arrowchat_tabopen");
			setUserStatus("offline");
			$open_windows.hide();
			$closed_windows.hide();
		}

		function buildMaintenance() {
			$maintenance = a(ArrowChat.Templates.maintenance_tab(c_login_url)).appendTo($base);
			$maintenance.mouseover(function () {
				if (c_db_connection == "1") {
					showTooltip(a("#arrowchat_mobiletab_icon"), lang[303], 0, 0, -15);
				} else if (c_guests_login_msg == "1" && u_id == "") {
					showTooltip(a("#arrowchat_mobiletab_icon"), lang[58], 0, 0, -15);
				} else {
					showTooltip(a("#arrowchat_mobiletab_icon"), lang[27], 0, 0, -15);
				}
			});
			$maintenance.mouseout(function () {
				hideTooltip();
			});
		}
		
		function startCreateChatRoom() {
			var i = a(".arrowchat_room_name_input").val();
			var passinput = a(".arrowchat_room_password_input").val();
			var descinput = "";
			var welcomeinput = "";
			a(".arrowchat_chatroom_full_content").removeClass("arrowchat_chatroom_opacity");
			a(".arrowchat_chatroom_list").removeClass("arrowchat_chatroom_clicked");
			a(".arrowchat_room_name_input").val("");
			a(".arrowchat_room_password_input").val("");
			i = i.replace(/^\s+|\s+$/g, "");
			i != "" && a.post(c_ac_path + "includes/json/send/send_chatroom_create.php", {
				userid: u_id,
				name: i,
				password: passinput,
				description: descinput,
				welcome: welcomeinput
			}, function (e) {
				if (e) {
					a("#arrowchat_create_room_flyout").removeClass("arrowchat_create_room_flyout_display");
					a(".arrowchat_room_create").hide();
					if (e == "-1") {
						displayMessage(a("#arrowchat_chatroom_message_flyout"), lang[39], "error");
					} else if (e == "-2") {
						displayMessage(a("#arrowchat_chatroom_message_flyout"), lang[40], "error");
					} else {
						loadChatroomList(e, passinput);
					}
				}
			});
		}

		function buildChatroomsButton() {
			if (c_user_chatrooms == 1) {
				a("#arrowchat_room_selection").mouseenter(function() {
					a(".arrowchat_room_create").show();
				});
				a("#arrowchat_room_selection").mouseleave(function() {
					if (!a("#arrowchat_create_room_flyout").hasClass("arrowchat_create_room_flyout_display"))
						a(".arrowchat_room_create").hide();
				});
				a(".arrowchat_room_create").mouseenter(function() {
					showTooltip(a(this), lang[93], 0, 10, 5);
					a(this).addClass("arrowchat_room_create_hover");
				}).children().mouseenter(function () {
					return false;
				});
				a(".arrowchat_room_create").mouseleave(function() {
					hideTooltip();
					a(this).removeClass("arrowchat_room_create_hover");
				}).children().mouseleave(function () {
					return false;
				});
				a(".arrowchat_room_create").click(function () {
					hideTooltip();
					a("#arrowchat_create_room_flyout").toggleClass("arrowchat_create_room_flyout_display");
					a(this).toggleClass("arrowchat_room_create_selected");
					a('.arrowchat_create_input').focus();
				}).children().click(function () {
					return false;
				});
				a('body').click(function(evt){
					if(a(evt.target).closest('.arrowchat_room_create').length)
						return;
						
					a("#arrowchat_create_room_flyout").removeClass("arrowchat_create_room_flyout_display");
				});
				a(".arrowchat_create_password_wrapper").click(function() {
					a(".arrowchat_password_input_wrapper").show();
					a(this).hide();
					a(".arrowchat_room_password_input").focus();
				});
				a(".arrowchat_room_name_input").keydown(function (h) {
					if (h.keyCode == 13) {
						startCreateChatRoom();
					}
				});
				a("#arrowchat_create_room_button").click(function() {
					startCreateChatRoom();
				});
				a(".arrowchat_room_password_input").placeholder();
				a(".arrowchat_room_name_input").placeholder();
			}
			a("#arrowchat_room_selection").click(function () {
				if (a(this).hasClass("arrowchat_selection_tab_selected")){}else{
					lsClick("#arrowchat_room_selection", 'ac_click');
					a(this).addClass("arrowchat_selection_tab_selected");
					a("#arrowchat_user_selection", $userstab_popup).removeClass("arrowchat_selection_tab_selected");
					count = 0;
					a(".arrowchat_chatroom_full_content").show();
					a("#arrowchat_userscontent").hide();
					loadChatroomList();		
				}
			});
			preventScrolling(a(".arrowchat_chatroom_full_content"));
			if (a.cookie('arrowchat_no_userlist') == 1) {
				a(".arrowchat_chatroom_full_content").addClass("arrowchat_no_userlist");
			}
			a("#list_button").click(function() {
				if (a(".arrowchat_chatroom_full_content").hasClass("arrowchat_no_userlist")) {
					a.cookie('arrowchat_no_userlist', 0, {expires: 365, path: '/'});
					a(".arrowchat_chatroom_full_content").removeClass("arrowchat_no_userlist");
				} else {
					a.cookie('arrowchat_no_userlist', 1, {expires: 365, path: '/'});
					a(".arrowchat_chatroom_full_content").addClass("arrowchat_no_userlist");
				}
				a(".arrowchat_chatroom_message_input").focus();
			});
			a("#arrowchat_chatroom_password_input").keydown(function (h) {
				if (h.keyCode == 13) {
					c = a("#arrowchat_chatroom_password_id").val();
					a("#arrowchat_chatroom_password_flyout").hide();
					input_value = a("#arrowchat_chatroom_password_input").val();
					a("#arrowchat_chatroom_password_input").val("");
					input_value = input_value.replace(/^\s+|\s+$/g, "");
					loadChatroom(c, input_value);
					loadChatroomList();
				}
			});
			a("#arrowchat_password_button").click(function () {
				c = a("#arrowchat_chatroom_password_id").val();
				a("#arrowchat_chatroom_password_flyout").hide();
				input_value = a("#arrowchat_chatroom_password_input").val();
				a("#arrowchat_chatroom_password_input").val("");
				input_value = input_value.replace(/^\s+|\s+$/g, "");
				loadChatroom(c, input_value);
				loadChatroomList();
			});
			a('body').click(function(evt){
				if(a(evt.target).closest('#arrowchat_chatroom_password_flyout').length || a(evt.target).closest('.arrowchat_chatroom_list').length)
					return;
					
				a("#arrowchat_chatroom_password_flyout").hide();
				a(".arrowchat_chatroom_full_content").removeClass("arrowchat_chatroom_opacity");
				a(".arrowchat_chatroom_list").removeClass("arrowchat_chatroom_clicked");
			});
			a("#arrowchat_chatroom_create_input").keydown(function (h) {
				if (h.keyCode == 13) {
					startCreateChatRoom();
				}
			});
			a("#arrowchat_create_button").click(function () {
				startCreateChatRoom();
			});
		}
		
		function buildModButton() {
			a("#arrowchat_setting_mod_cp").show();
			a("#arrowchat_setting_mod_cp").click(function() {
				window.open(c_ac_path + "mod/", "_blank", "");
				var total_count = parseInt(a(".arrowchat_mobiletab_new_count").html());
				var more_count = parseInt(a("#arrowchat_more_notification").html());
				if ((total_count-more_count) <= 0) {
					a("#arrowchat_mobiletab_new").hide();
				}
				a(".arrowchat_mobiletab_new_count").html(parseInt(total_count-more_count));
				a("#arrowchat_more_notification_modcp").hide();
				a("#arrowchat_more_notification").hide();
			});
			if (u_num_mod_reports > 0) {
				var total_count = parseInt(a(".arrowchat_mobiletab_new_count").html()) + parseInt(u_num_mod_reports);
				a(".arrowchat_mobiletab_new_count").html(total_count);
				a("#arrowchat_mobiletab_new").show();
				a("#arrowchat_more_notification").show().html(u_num_mod_reports);
				a("#arrowchat_more_notification_modcp").show().html(u_num_mod_reports);
			}
		}
		
		function displayWelcome() {
			if (c_first_time_message_on == 1) {
				$body.append(ArrowChat.Templates.welcome_display(c_first_time_message_header, c_first_time_message_content));
				setTimeout(function () {
					a("#arrowchat_welcome").hide("slow");
				}, 10000);
			}
		}
		
		function receiveWarning(h) {
			if (h.read == 0 && h.data != "") {
				a("#arrowchat_warnings").remove();
				$body.append(ArrowChat.Templates.warnings_display(h));
				if (a("#arrowchat_announcement").length) {
					var nb = parseInt(a(window).height() - a("#arrowchat_announcement").position().top);
					a("#arrowchat_warnings").css("bottom", nb + 5 + "px");
				}
				a("#arrowchat_warnings .arrowchat_warnings_close").click(function () {
					a("#arrowchat_warnings").remove();
					if (a("#arrowchat_announcement").length)
						var bottom_num = parseInt(a("#arrowchat_mobiletab").outerHeight() + parseInt(a("#arrowchat_mobiletab").css("bottom")) + 3);
						a("#arrowchat_announcement").css("bottom", bottom_num + "px");
					a.post(c_ac_path + "includes/json/send/send_settings.php", {
						warning_read: 1
					}, function () {});
				});
			} else {
				a("#arrowchat_warnings").remove();
			}
		}

		function buildOptionsButton() {
			if (c_notifications == 0) {
				a(".arrowchat_bell_button").hide();
				return;
			}
			a(".arrowchat_bell_button").mouseenter(function (e) {
				if(e.target == this){
					showTooltip(a(this), lang[0], 0, 10, 0);
					a(this).addClass("arrowchat_bell_button_hover");
				}
			});
			a(".arrowchat_bell_button").mouseleave(function (e) {
				if(e.target == this){
					hideTooltip();
					a(this).removeClass("arrowchat_bell_button_hover");
				}
			});
			a(".arrowchat_bell_button").click(function (e) {
				if(e.target == this){
					hideTooltip();
					a("#arrowchat_bell_flyout").toggleClass("arrowchat_bell_flyout_display");
					a(this).toggleClass("arrowchat_bell_button_selected");
					
					lsClick(".arrowchat_bell_button", 'ac_openclose');
					if (Q > 0) {
						var bell_count = parseInt(a(".arrowchat_mobiletab_new_count").html());
						if ((bell_count-Q) <= 0) {
							a("#arrowchat_mobiletab_new").hide();
						}
						a("#arrowchat_bell_notification").hide();
						a(".arrowchat_mobiletab_new_count").html(parseInt(bell_count-Q));
						
						a.post(c_ac_path + "includes/json/send/send_notifications.php", {
							userid: u_id
						}, function () {});
						Q = 0
					}
				}
			});
			a('body').click(function(evt){
				if(a(evt.target).closest('.arrowchat_bell_button').length)
					return;
					
				a("#arrowchat_bell_flyout").removeClass("arrowchat_bell_flyout_display");
			});
			a(".arrowchat_see_all_button").mouseenter(function () {
				showTooltip(a(this), lang[21], 0, 10, 5);
				a(this).addClass("arrowchat_see_all_button_hover");
			});
			a(".arrowchat_see_all_button").mouseleave(function () {
				hideTooltip();
				a(this).removeClass("arrowchat_see_all_button_hover");
			});
			a(".arrowchat_see_all_button").click(function () {
				lsClick(".arrowchat_see_all_button", 'ac_click');
				a("#arrowchat_notifications_content").html('<div class="arrowchat_loading_icon" style="padding:20px 0"></div>');
				var i = 0;
				a.ajax({
					url: c_ac_path + "includes/json/receive/receive_notifications.php",
					type: "get",
					cache: false,
					dataType: "json",
					success: function (b) {
						if (b && b != null) {
							a("#arrowchat_notifications_content").html("");
							a.each(b, function (e, l) {
								a.each(l, function (f, h) {
									a("<div/>").attr("id", "arrowchat_alert_" + h.alert_id).attr("class", "arrowchat_notification_message_div").html(h.markup).appendTo(a("#arrowchat_notifications_content"));
									i++;
								});
							});
							if (i == 0) {
								a("#arrowchat_notifications_content").html('<div id="arrowchat_no_new_notifications"><i class="fa-solid fa-bell-slash"></i>' + lang[9] + '</div>');
							} else {
								a(".arrowchat_notifications_divider").removeClass("arrowchat_notifications_divider_last");
								a("#arrowchat_notifications_content div:last-child .arrowchat_notifications_divider").addClass("arrowchat_notifications_divider_last");
							}
						}
					}
				});
			});
			preventScrolling(a("#arrowchat_notifications_content"));
		}
		
		function displayMessage(element, message, type) {
			if (element.is(":visible")) {
				clearTimeout(message_timeout);
				element.hide("slide", { direction: "up"}, 250, function() {					
					element.find(".arrowchat_message_text").html(message);
					type == "error" && a(".arrowchat_message_box").addClass("arrowchat_message_box_error").removeClass("arrowchat_message_box_notice");
					type == "notice" && a(".arrowchat_message_box").addClass("arrowchat_message_box_notice").removeClass("arrowchat_message_box_error");
					element.show("slide", { direction: "up"}, 250);
				});
			} else {
				type == "error" && a(".arrowchat_message_box").addClass("arrowchat_message_box_error").removeClass("arrowchat_message_box_notice");
				type == "notice" && a(".arrowchat_message_box").addClass("arrowchat_message_box_notice").removeClass("arrowchat_message_box_error");
				element.find(".arrowchat_message_text").html(message);
				element.show("slide", { direction: "up"}, 250);
			}
			message_timeout = setTimeout(function () {
				element.hide("slide", { direction: "up"}, 250);
			}, 5000);
		}
		
		function loadGiphy(url, selector, popup_id) {
			var selector_id;
			if (selector == 1)
				selector_id = $user_popups[popup_id];
			else
				selector_id = $chatrooms_popups[popup_id];
			a.ajax({
				url: url,
				type: "get",
				cache: false,
				dataType: "json",
				xhr: function() {
					var xhr = a.ajaxSettings.xhr();
					var setRequestHeader = xhr.setRequestHeader;
					xhr.setRequestHeader = function(name, value) {
						if (name == 'X-Socket-Id') return;
						setRequestHeader.call(this, name, value);
					};
					return xhr;
				},
				success: function (results) {
					results && a.each(results, function (i, e) {
						if (i == "data") {
							a(".arrowchat_giphy_image_wrapper", selector_id).html('');
							var new_height = 0;
							a.each(e, function (l, f) {
								new_height = Math.round((270/(f.images.fixed_height_downsampled.width/f.images.fixed_height_downsampled.height)));
								a(".arrowchat_giphy_image_wrapper", selector_id).append('<img class="arrowchat_giphy_image" src="' + f.images.fixed_height_downsampled.url + '" alt="" style="height:' + new_height + 'px;width:270px" height="' + new_height + '" />');
							});
							a(".arrowchat_giphy_image", selector_id).click(function () {
								a(".arrowchat_giphy_popout", selector_id).children(".arrowchat_more_popout").hide();
								var giphy_src = a(this).attr('src');
								if (selector == 2) {
									a.post(c_ac_path + "includes/json/send/send_message_chatroom.php", {
										userid: u_id,
										username: u_name,
										chatroomid: popup_id,
										message: "giphy{" + a(this).attr('height') + "}{" + a(this).attr('src') + "}"
									}, function (e) {
										if (!a.isNumeric(e)) {
											a.each(e, function (i, q) {
												if (i == "error") {
													a.each(q, function (l, f) {
														displayMessage(a("#arrowchat_chatroom_message_flyout"), f.m, "error");
													});
												}
											});
										} else {
											if (a("#arrowchat_chatroom_message_" + e).length) {} else {
												var tooltip = formatTimestamp(new Date(Math.floor((new Date).getTime() / 1E3) * 1E3), 1);
												a(".arrowchat_tabcontenttext", $chatrooms_popups[popup_id]).append('<div class="arrowchat_chatroom_box_message arrowchat_self arrowchat_image_msg arrowchat_chatroom_important" id="arrowchat_chatroom_message_' + e + '"><div class="arrowchat_chatroom_message_name">' + u_name + '</div><div class="arrowchat_chatroom_msg_wrap"><div class="arrowchat_chatroom_message_content" data-id="' + tooltip + '"><span class="arrowchat_chatroom_msg"><div class="arrowchat_giphy_message"><img class="arrowchat_lightbox arrowchat_giphy_img" data-id="' + giphy_src + '" src="' + giphy_src + '" alt="" /></div></span></div><div class="arrowchat_message_controls"><div class="arrowchat_chatroom_reply"><i class="fas fa-reply"></i></div><div class="arrowchat_chatroom_delete" data-id="' + e + '"><i class="far fa-xmark"></i></div></div></div><div class="arrowchat_pending_icon arrowchat_pending_delivered"></div></div>');
												var data_array = [e, u_name, '<div class="arrowchat_giphy_message"><img class="arrowchat_lightbox arrowchat_giphy_img" data-id="' + giphy_src + '" src="' + giphy_src + '" alt="" /></div>', popup_id];
												lsClick(JSON.stringify(data_array), 'send_chatroom_message');
												showChatroomTime();
											}
										}
										a(".arrowchat_tabcontenttext", $chatrooms_popups[popup_id]).scrollTop(5E4);
									});
								} else {
									a.post(c_ac_path + "includes/json/send/send_message.php", {
										userid: u_id,
										to: popup_id,
										message: "giphy{" + a(this).attr('height') + "}{" + a(this).attr('src') + "}"
									}, function (e) {
										if (!a.isNumeric(e)) {
											a.each(e, function (i, q) {
												if (i == "error") {
													a.each(q, function (l, f) {
														displayMessage(a(".arrowchat_message_box", $user_popups[popup_id]), f.m, "error");
													});
												}
											});
										} else {
											if (a("#arrowchat_message_" + e).length) {} else {
												var tooltip = formatTimestamp(new Date(Math.floor((new Date).getTime() / 1E3) * 1E3), 1);
												a(".arrowchat_tabcontenttext", $user_popups[popup_id]).append('<div class="arrowchat_chatboxmessage arrowchat_clearfix arrowchat_self arrowchat_image_msg" id="arrowchat_message_' + e + '"><span class="arrowchat_ts" style="display: none;"></span><div class="arrowchat_chatboxmessagefrom arrowchat_white_background"><div class="arrowchat_disable_avatars_name">' + u_name + '</div></div><div class="arrowchat_chatboxmessage_wrapper"><div class="arrowchat_chatboxmessagecontent" data-id="' + tooltip + '"><div class="arrowchat_giphy_message"><img class="arrowchat_lightbox arrowchat_giphy_img" data-id="' + giphy_src + '" src="' + giphy_src + '" alt="" /></div></div></div><div class="arrowchat_pending_icon arrowchat_pending_delivered"></div></div>');
												var time = Math.floor((new Date).getTime() / 1E3);
												var data_array = [e, popup_id, '<div class="arrowchat_giphy_message"><img class="arrowchat_lightbox arrowchat_giphy_img" data-id="' + giphy_src + '" src="' + giphy_src + '" alt="" /></div>', time, 1, 1];
												lsClick(JSON.stringify(data_array), 'private_message');
												showTimeAndTooltip();
											}
										}
										a(".arrowchat_tabcontenttext", $user_popups[popup_id]).scrollTop(a(".arrowchat_tabcontenttext", $user_popups[popup_id])[0].scrollHeight);
									});
								}
							});
						}
					});
				}
			});
		}
		
		function leaveChatroom(id) {
			lsClick(".arrowchat_closebox_bottom", 'ac_click', "chatrooms['"+id+"']");
			a.post(c_ac_path + "includes/json/send/send_settings.php", {
				close_chat: 'r'+id
			}, function () {});
			$chatrooms_popups[id].remove();
			$chatrooms[id].remove();
			delete $chatrooms_popups[id];
			delete $chatrooms[id];
			adjustSizes();
			room_history_loaded[id] = 0;
			if (Object.keys($chatrooms).length < 1) {
				clearTimeout(Crref2);
				Crref2 = -1;
			}
			if (c_push_engine != 1) {
				cancelJSONP();
				receiveCore();
			}
			changePushChannel(id, 0);
		}
		
		function initialChatroomLoad(id, password) {
			var global_mod = 0,
				global_admin = 0,
				admin_markup = "",
				msg_history = "",
				message = "";
			chatroom_mod[id] = 0;
			chatroom_admin[id] = 0;
			a(".arrowchat_tabcontenttext", $chatrooms_popups[id]).html('<div class="arrowchat_nofriends"><div class="arrowchat_loading_icon"></div></div>');
			a.ajax({
				url: c_ac_path + "includes/json/receive/receive_chatroom_room.php",
				data: {
					chatroomid: id,
					chatroom_pw: password
				},
				type: "post",
				cache: false,
				dataType: "json",
				success: function (o) {
					if (o) {
						var no_error = true;
						o && a.each(o, function (i, e) {
							if (i == "error") {
								a.each(e, function (l, f) {
									no_error = false;
									if (typeof($chatrooms[id]) != "undefined") {
										a(".arrowchat_closebox_bottom", $chatrooms[id]).click();
									}
									loadChatroomList();
									displayMessage(a("#arrowchat_chatroom_message_flyout"), f.m, "error");
								});
							}
						});
						if (no_error) {
							lsClick(id, 'open_chatroom');
							if (Crref2 == -1) {
								Crref2 = setTimeout(function () {
									receiveChatroom()
								}, 30000);
							}
							if (c_push_engine != 1) {
								cancelJSONP();
								changePushChannel(id, 1);
								receiveCore();
							} else {
								changePushChannel(id, 1);
							}
							o && a.each(o, function (i, e) {
								if (i == "user_title") {
									a.each(e, function (l, f) {
										if (f.admin == 1) {
											global_admin = 1;
											chatroom_admin[id] = 1;
										}
										if (f.mod == 1) {
											global_mod = 1;
											chatroom_mod[id] = 1;
										}
									});
								}
								if (i == "chat_name") {
									a.each(e, function (l, f) {										
										if (typeof cr_name[id] == "undefined") {
											cr_name[id] = f.n;
										}
									});
								}
								if (i == "chat_users") {
									var longname,adminCount=0,modCount=0,userCount=0,totalCount=0;
									a(".arrowchat_room_userlist", $chatrooms_popups[id]).html('<div class="arrowchat_chatroom_line_admins" class="arrowchat_group_container"><span class="arrowchat_group_text">'+lang[148]+'</span><div class="arrowchat_group_line_container"><span class="arrowchat_group_line"></span></div></div><div class="arrowchat_chatroom_list_admins"></div><div class="arrowchat_chatroom_line_mods" class="arrowchat_group_container"><span class="arrowchat_group_text">'+lang[149]+'</span><div class="arrowchat_group_line_container"><span class="arrowchat_group_line"></span></div></div><div class="arrowchat_chatroom_list_mods"></div><div class="arrowchat_chatroom_line_users" class="arrowchat_group_container"><span class="arrowchat_group_text">'+lang[147]+'</span><div class="arrowchat_group_line_container"><span class="arrowchat_group_line"></span></div></div><div class="arrowchat_chatroom_list_users"></div>');
									a(".arrowchat_chatroom_user_popouts", $chatrooms_popups[id]).html("");
									a.each(e, function (l, f) {
										if (f.status != 'invisible') {
											totalCount++;
											if ((global_admin == 1 || global_mod == 1) && (f.t == 1 || f.t == 4)) {
												admin_markup = '<li class="arrowchat_menu_separator"></li><li class="arrowchat_menu_item"><a class="arrowchat_chatroom_make_mod arrowchat_menu_anchor"><i class="fa-light fa-user-crown"></i><span>' + lang[52] + '</span></a></li><li class="arrowchat_menu_item"><a class="arrowchat_chatroom_silence_user arrowchat_menu_anchor"><i class="fa-light fa-volume-xmark"></i><span>' + lang[161] + '</span></a></li><li class="arrowchat_menu_item"><a class="arrowchat_chatroom_ban_user arrowchat_menu_anchor"><i class="fa-light fa-ban"></i><span>' + lang[53] + '</span></a></li>';
											}
											if (global_admin == 1 && f.t == 2) {
												admin_markup = '<li class="arrowchat_menu_separator"></li><li class="arrowchat_menu_item"><a class="arrowchat_chatroom_remove_mod arrowchat_menu_anchor"><i class="fa-light fa-circle-minus"></i><span>' + lang[54] + '</span></a></li>';
											}
											appendVal = a(".arrowchat_chatroom_list_users", $chatrooms_popups[id]);
											if (f.t == 2) {
												appendVal = a(".arrowchat_chatroom_list_mods", $chatrooms_popups[id]);
												modCount++;
											} else if (f.t == 3) {
												appendVal = a(".arrowchat_chatroom_list_admins", $chatrooms_popups[id]);
												adminCount++;
											} else
												userCount++;
											longname = renderHTMLString(f.n);
											f.n = renderHTMLString(f.n);
											var icon = ' fas fa-circle';
											if (f.status == 'away')
												icon = ' fas fa-moon';
											else if (f.status == 'busy')
												icon = ' far fa-mobile-screen';
											a("<div/>").attr('data-user-pop-id', f.id).attr("class", "arrowchat_chatroom_user").mouseover(function () {
												a(this).addClass("arrowchat_chatroom_list_hover");
											}).mouseout(function () {
												a(this).removeClass("arrowchat_chatroom_list_hover");
											}).addClass("arrowchat_chatroom_room_list").addClass('arrowchat_chatroom_admin_' + f.t).html('<img class="arrowchat_chatroom_avatar" src="' + f.a + '"/><span class="arrowchat_chatroom_room_name">' + f.n + '</span><span class="arrowchat_userscontentdot arrowchat_' + f.status + icon + '"></span>').appendTo(appendVal);
											var pm_opacity = "";
											if ((f.b == 1 && global_admin != 1) || f.id == u_id) pm_opacity = " arrowchat_no_private_msg";
											a("<div/>").attr("data-user-id", f.id).addClass("arrowchat_more_wrapper_chatroom").html('<div class="arrowchat_more_popout"><div class="arrowchat_chatroom_flyout_avatar"><img src="'+f.a+'" alt="" /></div><ul class="arrowchat_inner_menu arrowchat_chatroom_flyout_info"><li class="arrowchat_menu_item"><a class="arrowchat_chatroom_title arrowchat_menu_anchor"><span class="arrowchat_chatroom_fullname">' + longname + '</span></a></li><li class="arrowchat_menu_item"><a class="arrowchat_menu_anchor arrowchat_chatroom_private_message'+pm_opacity+'"><i class="fa-light fa-messages"></i><span>' + lang[41] + '</span></a></li><li class="arrowchat_menu_item"><a class="arrowchat_menu_anchor arrowchat_chatroom_block_user"><i class="fa-light fa-user-slash"></i><span>' + lang[84] + '</span></a></li><li class="arrowchat_menu_item"><a class="arrowchat_menu_anchor arrowchat_chatroom_report_user"><i class="fa-light fa-triangle-exclamation"></i><span>' + lang[167] + '</span></a></li>' + admin_markup + '</ul></div>').appendTo(a('.arrowchat_chatroom_user_popouts', $chatrooms_popups[id]));
											if (f.t == 2) {
												a("#arrowchat_chatroom_title_" + f.id, $chatrooms_popups[id]).html('<a href="'+f.l+'">' + longname + '</a><br/>' + lang[44]);
											} else if (f.t == 3) {
												a("#arrowchat_chatroom_title_" + f.id, $chatrooms_popups[id]).html('<a href="'+f.l+'">' + longname + '</a><br/>' + lang[45]);
											} else if (f.t == 4) {
												a("#arrowchat_chatroom_title_" + f.id, $chatrooms_popups[id]).html('<a href="'+f.l+'">' + longname + '</a><br/>' + lang[212])
											}
											addHover(a(".arrowchat_menu_item"), "arrowchat_more_hover");
										}
										uc_cr_block[f.id] = f.b;
									});
									chatroomUserOptions(global_admin);
									var sort_by_name = function(a, b) {
										return a.querySelector('.arrowchat_chatroom_room_name').innerHTML.toLowerCase().localeCompare(b.querySelector('.arrowchat_chatroom_room_name').innerHTML.toLowerCase());
									};
									var list = a(".arrowchat_chatroom_list_users > div", $chatrooms_popups[id]).get();
									list.sort(sort_by_name);
									for (var i = 0; i < list.length; i++) {
										list[i].parentNode.appendChild(list[i]);
									}
									a('.arrowchat_chatroom_count_window span', $chatrooms_popups[id]).html(totalCount);
									a('.arrowchat_chatroom_count_window span', $chatrooms[id]).html(totalCount);
									a('#arrowchat_chatroom_' + id).find('.arrowchat_chatroom_count').children('span').html(totalCount);
									userCount == 0 && a(".arrowchat_chatroom_line_users", $chatrooms_popups[id]).hide();
									adminCount == 0 && a(".arrowchat_chatroom_line_admins", $chatrooms_popups[id]).hide();
									modCount == 0 && a(".arrowchat_chatroom_line_mods", $chatrooms_popups[id]).hide();
									a(".arrowchat_chatroom_admin_3").css("background-color", "#"+c_admin_bg);
									a(".arrowchat_chatroom_admin_3").css("color", "#"+c_admin_txt);
								}
								if (i == "chat_history") {
									msg_history = "";
									a.each(e, function (l, f) {
										var regex = new RegExp('(^|\\s)(@' + u_name + ')(\\s|$)', 'i');
										f.m = f.m.replace(regex, '$1<span class="arrowchat_at_user">$2</span>$3');
										if (typeof(blockList[f.userid]) == "undefined") {
											var title = "", important = "";
											if (f.mod == 1) {
												title = lang[137];
												important = " arrowchat_chatroom_important";
											}
											if (f.admin == 1) {
												//title = lang[136];
												title = lang[137];
												important = " arrowchat_chatroom_important";
											}
											l = "";
											var image_msg = "";
											fromname = f.n;
											var pending_icon = "";
											if (f.n == u_name) {
												l = " arrowchat_self";
												pending_icon = "<div class='arrowchat_pending_icon arrowchat_pending_delivered'></div>";
											}
											if (f.m.substr(0, 4) == "<div") {
												image_msg = " arrowchat_image_msg";
											}
											var sent_time = new Date(f.t * 1E3);
											var tooltip = formatTimestamp(sent_time, 1);
											if (f.global == 1) {
												msg_history += '<div class="arrowchat_chatroom_box_message arrowchat_global_chatroom_message" id="arrowchat_chatroom_message_' + f.id + '"><div class="arrowchat_chatroom_message_content' + l + '">' + formatTimestamp(sent_time) + f.m + "</div></div>"
											} else {
												var noAvatarColor = getRandomColor(fromname);	
												msg_history += '<div class="arrowchat_chatroom_box_message' + l + image_msg + important + '" id="arrowchat_chatroom_message_' + f.id + '"><div class="arrowchat_chatroom_message_name"><i class="' + title + '"></i>' + fromname + '</div><div class="arrowchat_chatroom_msg_wrap"><div class="arrowchat_chatbox_avatar_wrapper arrowchat_white_background" style="background-color:' + noAvatarColor["color"] + '"><img class="arrowchat_chatroom_message_avatar arrowchat_no_names" src="'+f.a+'" alt="' + fromname + '" /><span class="arrowchat_tab_letter arrowchat_tab_letter_xsmall">' + noAvatarColor["character"] + '</span></div><div class="arrowchat_chatroom_message_content" data-id="' + tooltip + '"><span class="arrowchat_chatroom_msg">' + f.m + '</span></div><div class="arrowchat_message_controls"><div class="arrowchat_chatroom_reply"><i class="fas fa-reply"></i></div><div class="arrowchat_chatroom_delete" data-id="' +  f.id + '"><i class="far fa-xmark"></i></div></div></div>' + pending_icon + '</div>';
											}
										}
									});
								}
								if (i == "room_info") {
									a.each(e, function (l, f) {										
										if (f.welcome_msg != "") {
											message = stripslashes(f.welcome_msg);
											cr_welcome[id] = message;
											message = replaceURLWithHTMLLinks(message);
										}
										cr_desc[id] = f.desc;
										room_limit_msg[id] = f.limit_msg;
										room_limit_sec[id] = f.limit_sec;
									});
								}
							});
							a(".arrowchat_tabcontenttext", $chatrooms_popups[id]).html(msg_history);
							showChatroomTime();
							a(".arrowchat_tabcontenttext", $chatrooms_popups[id]).append('<div class="arrowchat_chatroom_box_message arrowchat_chatroom_welcome_msg arrowchat_global_chatroom_message"><div class="arrowchat_chatroom_message_content">' + message + '</div></div>');
							a(".arrowchat_pending_icon:not(.arrowchat_pending_error)", $chatrooms_popups[id]).hide();
							a(".arrowchat_tabcontenttext .arrowchat_chatroom_box_message .arrowchat_pending_icon:last", $chatrooms_popups[id]).show();
							modDeleteControls(id);
							preventScrolling(a(".arrowchat_tabcontenttext", $chatrooms_popups[id]));
							preventScrolling(a(".arrowchat_room_userlist"));
							if (c_disable_avatars == 1 || a("#arrowchat_setting_names_only :input").is(":checked")) {
								setAvatarVisibility(1);
							}
							a(".arrowchat_tabcontenttext", $chatrooms_popups[id]).scrollTop(5E4);
							a(".arrowchat_textarea", $chatrooms_popups[id]).focus();
							if (global_admin == 1 || global_mod == 1) {
								addChatroomAdminControls(id);
							} else {
								a('.arrowchat_admin_controls', $chatrooms_popups[id]).hide();
							}
							a(".arrowchat_image_msg img,.arrowchat_emoji_text img").one("load", function() {
							  a(".arrowchat_tabcontenttext", $chatrooms_popups[id]).scrollTop(5E4);
							}).each(function() {
							  if(this.complete) a(this).trigger('load');
							});
						}
					}
				}
			});
		}

		function loadChatroom(b, pass) {
			toggleUserChatTab(b, 0, true, pass);
		}
		
		function modDeleteControls(chatroomid) {
			if (chatroom_mod[chatroomid] == 1 || chatroom_admin[chatroomid] == 1) {
				a(".arrowchat_chatroom_delete", $chatrooms_popups[chatroomid]).show();
				a(".arrowchat_chatroom_delete", $chatrooms_popups[chatroomid]).unbind("mouseenter").unbind("mouseleave").unbind("click");
				a(".arrowchat_chatroom_delete", $chatrooms_popups[chatroomid]).mouseenter(function () {
					showTooltip(a(this), lang[160], 0, 10, 10);
					a(this).addClass("arrowchat_chatroom_delete_hover")
				});
				a(".arrowchat_chatroom_delete", $chatrooms_popup).mouseleave(function () {
					hideTooltip();
					a(this).removeClass("arrowchat_chatroom_delete_hover");
				});
				a(".arrowchat_chatroom_delete").click(function () {
					hideTooltip();
					var msg_id = a(this).attr('data-id');
					var id = a(this).parents('.arrowchat_tabpopup').attr('data-room-id');
					a("#arrowchat_chatroom_message_" + msg_id + " .arrowchat_chatroom_delete").remove();
					a.post(c_ac_path + "includes/json/send/send_settings.php", {
						delete_msg: msg_id,
						chatroom_id: id,
						delete_name: u_name
					}, function () {
						a("#arrowchat_chatroom_message_" + msg_id + " .arrowchat_chatroom_msg").html(lang[159] + u_name);
					})
				});
			} else {
				a(".arrowchat_chatroom_delete", $chatrooms_popups[chatroomid]).hide();
			}
		}
		
		function chatroomUploadProcessing(id) {
			var ts67 = Math.round(new Date().getTime());
			var path = c_ac_path.replace("../", "/");
			a(".arrowchat_file_transfer_user", $chatrooms_popups[id]).uploadifive({
				'uploadScript': path + 'includes/classes/class_uploads.php',
				'buttonText': ' ',
				'buttonClass': 'arrowchat_upload_user_button',
				'removeCompleted' : true,
				'formData': {
					'unixtime': ts67,
					'user': u_id
				},
				'queueID' : 'arrowchat_room_upload_queue_' + id,
				'height': '25px',
				'width': '100%',
				'multi': false,
				'auto': true,
				'fileType': '.avi,.bmp,.doc,.docx,.gif,.ico,.jpeg,.jpg,.mp3,.mp4,.pdf,.png,.ppt,.pptx,.rar,.tar,.txt,.wav,.wmv,.xls,.xlsx,.zip,.7z',
				'fileSizeLimit' : c_max_upload_size + 'MB',
				'onError': function (file, errorCode, errorMsg, errorString) {
					a(".arrowchat_textarea", $chatrooms_popups[id]).focus();
				},
				'onCancel': function (file) {
					a(".arrowchat_textarea", $chatrooms_popups[id]).focus();
				},
				'onUploadComplete': function (file) {
					var uploadType = "file",
						fileType = file.type.toLowerCase();
					if (fileType == "image/jpeg" || fileType == "image/gif" || fileType == "image/jpg" || fileType == "image/png")
						uploadType = "image";
						
					a.post(c_ac_path + "includes/json/send/send_message_chatroom.php", {
						userid: u_id,
						username: u_name,
						chatroomid: id,
						message: uploadType + "{" + ts67 + "}{" + file.name + "}"
					}, function (e) {
						if (!a.isNumeric(e)) {
							a.each(e, function (i, q) {
								if (i == "error") {
									a.each(q, function (l, f) {
										displayMessage(a(".arrowchat_message_box", $chatrooms_popups[id]), f.m, "error");
									});
								}
							});
						} else {
							if (a("#arrowchat_chatroom_message_" + e).length) {} else {
								var message = '';
								var tooltip = formatTimestamp(new Date(Math.floor((new Date).getTime() / 1E3) * 1E3), 1);
								if (uploadType == "image") {
									a(".arrowchat_tabcontenttext", $chatrooms_popups[id]).append('<div id="arrowchat_chatroom_message_' + e + '" class="arrowchat_chatroom_important arrowchat_image_msg arrowchat_self arrowchat_chatroom_box_message"><div class="arrowchat_chatroom_message_name">' + u_name + '</div><div class="arrowchat_chatroom_msg_wrap"><div class="arrowchat_chatroom_message_content" data-id="' + tooltip + '"><span class="arrowchat_chatroom_msg"><div class="arrowchat_image_message"><img data-id="' + c_ac_path + 'public/download.php?file=' + ts67 + '" src="' + c_ac_path + 'public/download.php?file=' + ts67 + '_t" alt="Image" class="arrowchat_lightbox" /></div></span></div><div class="arrowchat_message_controls"><div class="arrowchat_chatroom_reply"><i class="fas fa-reply"></i></div><div class="arrowchat_chatroom_delete" data-id="' + e + '"><i class="far fa-xmark"></i></div></div></div><div class="arrowchat_pending_icon arrowchat_pending_delivered"></div></div>');
									message = '<div class="arrowchat_image_message"><img data-id="' + c_ac_path + 'public/download.php?file=' + ts67 + '" src="' + c_ac_path + 'public/download.php?file=' + ts67 + '_t" alt="Image" class="arrowchat_lightbox" /></div>';
									a(".arrowchat_image_msg img,.arrowchat_emoji_text img").one("load", function() {
										setTimeout(function () {
											a(".arrowchat_tabcontenttext", $chatrooms_popups[id]).scrollTop(5E4);
										}, 500);
									}).each(function() {
									  if(this.complete) a(this).trigger('load');
									});
								} else {
									a(".arrowchat_tabcontenttext", $chatrooms_popups[id]).append('<div id="arrowchat_chatroom_message_' + e + '" class="arrowchat_chatroom_important arrowchat_image_msg arrowchat_self arrowchat_chatroom_box_message"><div class="arrowchat_chatroom_message_name">' + u_name + '</div><div class="arrowchat_chatroom_msg_wrap"><div class="arrowchat_chatroom_message_content" data-id="' + tooltip + '"><span class="arrowchat_chatroom_msg"><div class="arrowchat_action_message"><div class="arrowchat_action_message_wrapper">' + lang[69] + '</div><div class="arrowchat_action_message_action"><a href="' + c_ac_path + 'public/download.php?file=' + ts67 + '">' + file.name + '</a></div></div></span></div><div class="arrowchat_message_controls"><div class="arrowchat_chatroom_reply"><i class="fas fa-reply"></i></div><div class="arrowchat_chatroom_delete" data-id="' + e + '"><i class="far fa-xmark"></i></div></div></div><div class="arrowchat_pending_icon arrowchat_pending_delivered"></div></div>');
									message = '<div class="arrowchat_action_message"><div class="arrowchat_action_message_wrapper">' + lang[69] + '</div><div class="arrowchat_action_message_action"><a href="' + c_ac_path + 'public/download.php?file=' + ts67 + '">' + file.name + '</a></div></div>';
								}
								showChatroomTime();
								var data_array = [e, u_name, message, id];
								lsClick(JSON.stringify(data_array), 'send_chatroom_message');
							}
						}
						a(".arrowchat_tabcontenttext", $chatrooms_popups[id]).scrollTop(5E4);
					});
					a(".arrowchat_textarea", $chatrooms_popups[id]).focus();
					chatroomUploadProcessing(id);
				}
			});
		}
		
		function addChatroomAdminControls(id) {
			a('.arrowchat_admin_controls', $chatrooms_popups[id]).show();
			a(".arrowchat_edit_welcome_msg", $chatrooms_popups[id]).unbind('click');
			a(".arrowchat_edit_welcome_msg", $chatrooms_popups[id]).click(function () {
				var welcome_msg_input = prompt(lang[154], cr_welcome[id]);
				if (welcome_msg_input || welcome_msg_input  == "") {
					a.post(c_ac_path + "includes/json/send/send_settings.php", {
						chatroom_welcome_msg: welcome_msg_input,
						chatroom_id: id
					}, function () {
						displayMessage(a(".arrowchat_message_box", $chatrooms_popups[id]), lang[155], "notice");
						cr_welcome[id] = welcome_msg_input;
						a('.arrowchat_more_anchor', $chatrooms_popups[id]).click();
					});
				}
			});
			if (chatroom_admin[id] == 1) {
				if (u_chatroom_invisible == 1) { 
					a(".arrowchat_chatroom_invisible .arrowchat_switch :input", $chatrooms_popups[id]).prop("checked", true)
				} else {
					a(".arrowchat_chatroom_invisible").addClass("arrowchat_menu_unchecked");
					a(".arrowchat_chatroom_invisible .arrowchat_switch :input", $chatrooms_popups[id]).prop("checked", false)
				}
				a(".arrowchat_chatroom_invisible", $chatrooms_popups[id]).unbind('click');
				a(".arrowchat_chatroom_invisible", $chatrooms_popups[id]).click(function () {
					a(".arrowchat_chatroom_invisible").toggleClass("arrowchat_menu_unchecked");
					if (a(".arrowchat_chatroom_invisible :input", $chatrooms_popups[id]).is(":checked")) {
						a(".arrowchat_chatroom_invisible :input").prop("checked", false);
						_chatroominvis = -1;
						u_chatroom_invisible = 0;
					} else {
						a(".arrowchat_chatroom_invisible :input").prop("checked", true);
						_chatroominvis = 1;
						u_chatroom_invisible = 1;
					}
					a.post(c_ac_path + "includes/json/send/send_settings.php", {
						chatroom_invisible: _chatroominvis
					}, function () {
					});
				});
			} else {
				a(".arrowchat_chatroom_invisible").parent(".arrowchat_admin_controls").hide();
			}
			a(".arrowchat_edit_description", $chatrooms_popups[id]).unbind('click');
			a(".arrowchat_edit_description", $chatrooms_popups[id]).click(function () {
				var desc_input = prompt(lang[158], cr_desc[id]);
				if (desc_input || desc_input  == "") {
					a.post(c_ac_path + "includes/json/send/send_settings.php", {
						chatroom_description: desc_input,
						chatroom_id: id
					}, function () {
						displayMessage(a(".arrowchat_message_box", $chatrooms_popups[id]), lang[155], "notice");
						cr_desc[id] = desc_input;
						desc_input = renderHTMLString(desc_input);
						loadChatroomList();
						a('.arrowchat_name_description', $chatrooms_popups[id]).html(desc_input);
						a('.arrowchat_more_anchor', $chatrooms_popups[id]).click();
					});
				}
			});
			a(".arrowchat_edit_flood", $chatrooms_popups[id]).unbind('click');
			a(".arrowchat_edit_flood", $chatrooms_popups[id]).click(function () {
				a(this).parents(".arrowchat_inner_menu").hide();
				a(".arrowchat_flood_select_messages", $chatrooms_popups[id]).val(room_limit_msg[id]);
				a(".arrowchat_flood_select_seconds", $chatrooms_popups[id]).val(room_limit_sec[id]);
				a(".arrowchat_flood_menu", $chatrooms_popups[id]).show();
			});
			a(".arrowchat_flood_back", $chatrooms_popups[id]).unbind('click');
			a(".arrowchat_flood_back", $chatrooms_popups[id]).click(function () {
				a(this).parents('.arrowchat_more_popout').find(".arrowchat_inner_menu").show();
				a(".arrowchat_flood_menu", $chatrooms_popups[id]).hide();
			});
			a(".arrowchat_flood_save", $chatrooms_popups[id]).unbind('click');
			a(".arrowchat_flood_save", $chatrooms_popups[id]).click(function () {
				a(".arrowchat_more_anchor", $chatrooms_popups[id]).click();
				var flood_message = a(".arrowchat_flood_select_messages", $chatrooms_popups[id]).val();
				var flood_seconds = a(".arrowchat_flood_select_seconds", $chatrooms_popups[id]).val();
				if (!isNaN(flood_message) && !isNaN(flood_seconds)) {
					a.post(c_ac_path + "includes/json/send/send_settings.php", {
						chatroom_id: id,
						flood_message: flood_message,
						flood_seconds: flood_seconds
					}, function () {
						displayMessage(a(".arrowchat_message_box", $chatrooms_popups[id]), lang[155], "notice");
						room_limit_msg[id] = flood_message;
						room_limit_sec[id] = flood_seconds;
					});
				}
			});
		}

		function receiveUser(b, c, d, e, l, f, h) {
			if (!(b == null || b == "")) {
				if ((uc_name[b] == null || uc_name[b] == "")) {
					if (aa[b] != 1) {
						aa[b] = 1;
						a.ajax({
							url: c_ac_path + "includes/json/receive/receive_user.php",
							data: {
								userid: b
							},
							type: "post",
							cache: false,
							dataType: "json",
							success: function (o) {
								if (o) {
									c = uc_name[b] = o.n;
									d = uc_status[b] = o.s;
									e = uc_avatar[b] = o.a;
									l = uc_link[b] = o.l;
									if (G[b] != null && typeof($user) != "undefined") {
										a(".arrowchat_closed_status", $user[b]).removeClass("arrowchat_available arrowchat_busy arrowchat_offline").addClass("arrowchat_" + d);
										a(".arrowchat_closed_statusy", $user_popups[b]).removeClass("arrowchat_available arrowchat_busy arrowchat_offline").addClass("arrowchat_" + d);
										$users[b].removeClass("arrowchat_tab_offline").addClass("arrowchat_tab_" + c);
										if (typeof($user_popups[b]) != "undefined") {
											a(".arrowchat_tabsubtitle .arrowchat_message", $user_popups[b]).html(i);
										}
									}
									aa[b] = 0;
									if (c != null) {
										toggleUserChatTab(b, f, false, "");
									} else {
										a.post(c_ac_path + "includes/json/send/send_settings.php", {
											unfocus_chat: b
										}, function () {})
									}
								}
							}
						})
					} else {
						setTimeout(function () {
							receiveUser(b, uc_name[b], uc_status[b], uc_avatar[b], uc_link[b], f, h)
						}, 500);
					}
				} else {
					toggleUserChatTab(b, f, false, "");
				}
			}
		}
		
		function userUploadProcessing(b) {
			var ts67 = Math.round(new Date().getTime());
			var path = c_ac_path.replace("../", "/");				
			a(".arrowchat_file_transfer_user", $user_popups[b]).uploadifive({
				'uploadScript': path + 'includes/classes/class_uploads.php',
				'buttonText': ' ',
				'buttonClass': 'arrowchat_upload_user_button',
				'removeCompleted' : true,
				'formData': {
					'unixtime': ts67,
					'user': u_id
				},
				'queueID' : 'arrowchat_user_upload_queue_' + b,
				'height': '25px',
				'width': '100%',
				'multi': false,
				'auto': true,
				'fileType': '.avi,.bmp,.doc,.docx,.gif,.ico,.jpeg,.jpg,.mp3,.mp4,.pdf,.png,.ppt,.pptx,.rar,.tar,.txt,.wav,.wmv,.xls,.xlsx,.zip,.7z',
				'fileSizeLimit' : c_max_upload_size + 'MB',
				'onError': function (file, errorCode, errorMsg, errorString) {
					a(".arrowchat_textarea", $user_popups[b]).focus();
				},
				'onCancel': function (file) {
					a(".arrowchat_textarea", $user_popups[b]).focus();
				},
				'onUploadComplete': function (file) {
					var uploadType = "file",
						fileType = file.type.toLowerCase();
					if (fileType == "image/jpeg" || fileType == "image/gif" || fileType == "image/jpg" || fileType == "image/png")
						uploadType = "image";
						
					a.post(c_ac_path + "includes/json/send/send_message.php", {
						userid: u_id,
						to: b,
						message: uploadType + "{" + ts67 + "}{" + file.name + "}"
					}, function (e) {
						if (!a.isNumeric(e)) {
							a.each(e, function (i, q) {
								if (i == "error") {
									a.each(q, function (l, f) {
										displayMessage(a(".arrowchat_message_box", $user_popups[b]), f.m, "error");
									});
								}
							});
						} else {
							if (a("#arrowchat_message_" + e).length) {} else {
								var message = "";
								var tooltip = formatTimestamp(new Date(Math.floor((new Date).getTime() / 1E3) * 1E3), 1);
								if (uploadType == "image") {
									a(".arrowchat_tabcontenttext", $user_popups[b]).append('<div class="arrowchat_chatboxmessage arrowchat_clearfix arrowchat_self arrowchat_image_msg" id="arrowchat_message_' + e + '"><span class="arrowchat_ts" style="display: none;">' + tooltip + '</span><div class="arrowchat_chatboxmessagefrom arrowchat_white_background"><div class="arrowchat_disable_avatars_name">' + u_name + '</div></div><div class="arrowchat_chatboxmessage_wrapper"><div class="arrowchat_chatboxmessagecontent" data-id="' + tooltip + '"><div class="arrowchat_image_message"><img data-id="' + c_ac_path + 'public/download.php?file=' + ts67 + '" src="' + c_ac_path + 'public/download.php?file=' + ts67 + '_t" alt="Image" class="arrowchat_lightbox" /></div></div></div><div class="arrowchat_pending_icon arrowchat_pending_delivered"></div></div>');
									message = '<div class="arrowchat_image_message"><img data-id="' + c_ac_path + 'public/download.php?file=' + ts67 + '" src="' + c_ac_path + 'public/download.php?file=' + ts67 + '_t" alt="Image" class="arrowchat_lightbox" /></div>';
									a(".arrowchat_image_msg img,.arrowchat_emoji_text img").one("load", function() {
										setTimeout(function () {
											a(".arrowchat_tabcontenttext", $user_popups[b]).scrollTop(a(".arrowchat_tabcontenttext", $user_popups[b])[0].scrollHeight);
										}, 500);
									}).each(function() {
									  if(this.complete) a(this).trigger('load');
									});
								} else {
									a(".arrowchat_tabcontenttext", $user_popups[b]).append('<div class="arrowchat_chatboxmessage arrowchat_clearfix arrowchat_self arrowchat_image_msg" id="arrowchat_message_' + e + '"><span class="arrowchat_ts" style="display: none;">' + tooltip + '</span><div class="arrowchat_chatboxmessagefrom arrowchat_white_background"><div class="arrowchat_disable_avatars_name">' + u_name + '</div></div><div class="arrowchat_chatboxmessage_wrapper"><div class="arrowchat_chatboxmessagecontent" data-id="' + tooltip + '"><div class="arrowchat_action_message"><div class="arrowchat_action_message_wrapper">' + lang[69] + '</div><div class="arrowchat_action_message_action"><a href="' + c_ac_path + 'public/download.php?file=' + ts67 + '">' + file.name + '</a></div></div></div></div><div class="arrowchat_pending_icon arrowchat_pending_delivered"></div></div>');
									message = '<div class="arrowchat_action_message"><div class="arrowchat_action_message_wrapper">' + lang[69] + '</div><div class="arrowchat_action_message_action"><a href="' + c_ac_path + 'public/download.php?file=' + ts67 + '">' + file.name + '</a></div></div>';
								}
								showTimeAndTooltip();
								var time = Math.floor((new Date).getTime() / 1E3);
								var data_array = [e, b, message, time, 1, 1];
								lsClick(JSON.stringify(data_array), 'private_message');
							}
						}
						a(".arrowchat_tabcontenttext", $user_popups[b]).scrollTop(a(".arrowchat_tabcontenttext", $user_popups[b])[0].scrollHeight);
					});
					a(".arrowchat_textarea", $user_popups[b]).focus();
					userUploadProcessing(b);
				}
			});
		}
		
		function leavechat(id) {
			lsClick(".arrowchat_closebox_bottom", 'ac_click', "users['"+id+"']");
			a.post(c_ac_path + "includes/json/send/send_settings.php", {
				close_chat: id,
				tab_alert: 1
			}, function () {});
			$user_popups[id].remove();
			$users[id].remove();
			delete $user_popups[id];
			delete $users[id];
			if (j == id) j = "";
			adjustSizes();
			y[id] = null;
			G[id] = null;
			ca[id] = 0;
		}

		function toggleUserChatTab(id, open, is_chatroom, chatroom_password) {
			var element_tab, element_popup;
			if ((typeof($chatrooms[id]) != "undefined" && is_chatroom) || (typeof($users[id]) != "undefined" && !is_chatroom)) {
				if (is_chatroom) {
					if (!$chatrooms[id].hasClass("arrowchat_tabclick") && open != 1) {
						$chatrooms[id].click();
					}
				} else {
					if (!$users[id].hasClass("arrowchat_tabclick") && open != 1) {
						$users[id].click();
					}
				}
			} else {
				if (is_chatroom) {
					if (typeof(cr_name[id]) == "undefined")
						cr_name[id] = lang[301];
					if (typeof(cr_desc[id]) == "undefined")
						cr_desc[id] = lang[301];
					if (typeof(cr_img[id]) == "undefined")
						cr_img[id] = "chatroom_default.png";
					var name = renderHTMLString(cr_name[id]);
					var img = c_ac_path + "themes/" + u_theme + '/images/icons/' + cr_img[id];
					var desc = renderHTMLString(cr_desc[id]);
					if (typeof(cr_count[id]) == "undefined")
						cr_count[id] = 1;
					$chatrooms[id] = a(ArrowChat.Templates.chatrooms_tab(name, img, cr_count[id])).attr('data-room-id', id).prependTo($closed_windows);
					$chatrooms_popups[id] = a(ArrowChat.Templates.chatrooms_window(id, name, img, desc, cr_count[id], c_max_chatroom_msg)).attr('data-room-id', id).addClass("arrowchat_chatroom_tabpopup").appendTo($open_windows);
					a(".arrowchat_chatroom_full_content").removeClass("arrowchat_chatroom_opacity");
					a(".arrowchat_chatroom_list").removeClass("arrowchat_chatroom_clicked");
					element_tab = $chatrooms[id];
					element_popup = $chatrooms_popups[id];
				} else {									
					var name = renderHTMLString(uc_name[id]); 
					var noAvatarColor = getRandomColor(name);
					$users[id] = a(ArrowChat.Templates.chat_tab(name, uc_avatar[id])).attr('data-id', id).prependTo($closed_windows);
					$user_popups[id] = a(ArrowChat.Templates.chat_window(name, uc_avatar[id], uc_link[id], id)).attr('data-id', id).appendTo($open_windows);
					$users[id].children('.arrowchat_closed_status').addClass('arrowchat_' + uc_status[id]);
					$users[id].addClass("arrowchat_tab_" + uc_status[id]);
					a('.arrowchat_chat_window_status', $user_popups[id]).addClass('arrowchat_' + uc_status[id]);
					element_tab = $users[id];
					element_popup = $user_popups[id];
					
					a(".arrowchat_closed_image", element_tab).css('background-color', noAvatarColor["color"]);
					a(".arrowchat_tab_letter", element_tab).html(noAvatarColor["character"]);
					a(".arrowchat_avatarbox", element_popup).css('background-color', noAvatarColor["color"]);
					a(".arrowchat_tab_letter_small", element_popup).html(noAvatarColor["character"]);
				}
				adjustSizes();
				orig_txt_size = a(".arrowchat_textarea", element_popup).css('height');
					
				a(".arrowchat_closebox_bottom", element_tab).mouseenter(function () {
					a(this).addClass("arrowchat_closebox_bottomhover")
				});
				a(".arrowchat_closebox_bottom", element_tab).mouseleave(function () {
					a(this).removeClass("arrowchat_closebox_bottomhover");
				});
				a(".arrowchat_closebox_bottom", element_tab).click(function () {
					if (is_chatroom) {
						leaveChatroom(id);
					} else {
						leavechat(id);
					}
				});

				if (c_popout_on != 1) {
					a(".arrowchat_chat_popout").parent().hide();
				}
				addHover(a(".arrowchat_menu_item", element_popup), "arrowchat_more_hover");
				a(".arrowchat_more_anchor", element_popup).mouseenter(function () {
					a(".arrowchat_user_name_wrapper", element_popup).addClass("arrowchat_user_image_hover");
					showTooltip(a(this), lang[23], 0, 10, -10);
				});
				a(".arrowchat_more_anchor", element_popup).mouseleave(function () {
					a(".arrowchat_user_name_wrapper", element_popup).removeClass("arrowchat_user_image_hover");
					hideTooltip();
				});
				a(".arrowchat_tabcontenttext", element_popup).click(function () {
					if (window.getSelection().toString().length) {} else {
						a(".arrowchat_textarea", element_popup).focus();
					}
				});
				a(".arrowchat_textarea", element_popup).focus(function() {
					a(element_popup).addClass("arrowchat_typing_title");
				});
				a(".arrowchat_textarea", element_popup).focusout(function() {
					a(element_popup).removeClass("arrowchat_typing_title");
				});
				preventScrolling(a(".arrowchat_emoji_wrapper", element_popup));
				preventScrolling(a(".arrowchat_giphy_image_wrapper", element_popup));
				a(".arrowchat_emoji_selector", element_popup).click(function() {
					if (!a(this).hasClass("arrowchat_emoji_focused")) {
						a(".arrowchat_emoji_wrapper", element_popup).html('<div class="arrowchat_loading_icon"></div>');
						a(".arrowchat_emoji_selector", element_popup).removeClass("arrowchat_emoji_focused");
						a(this).addClass("arrowchat_emoji_focused");
						var load_id = a(this).attr("data-id");
						a.ajax({
							url: c_ac_path + 'includes/emojis/' + load_id + '.php',
							type: "GET",
							cache: true,
							success: function(html) {
								a(".arrowchat_emoji_wrapper", element_popup).html(html);
								a(".arrowchat_emoji", element_popup).click(function () {
									if (a(this).hasClass("arrowchat_emoji_custom"))
										var smiley_code = a(this).children('img').attr("data-id");
									else
										var smiley_code = a(this).html();
									var existing_text = a(".arrowchat_textarea", element_popup).val();
									a(".arrowchat_textarea", element_popup).focus().val('').val(existing_text + smiley_code);
								});
							}
						});
					}
				});
				a(".arrowchat_emoji_selector", element_popup).mouseover(function(){
					a(this).addClass("arrowchat_emoji_selector_hover");
				});
				a(".arrowchat_emoji_selector", element_popup).mouseout(function(){
					a(this).removeClass("arrowchat_emoji_selector_hover");
				});
				a(".arrowchat_emoji_smileys", element_popup).mouseover(function(){showTooltip(a(this), lang[230], false, 0, 20);}).mouseout(function(){hideTooltip();});
				a(".arrowchat_emoji_animals", element_popup).mouseover(function(){showTooltip(a(this), lang[231], false, 0, 20);}).mouseout(function(){hideTooltip();});
				a(".arrowchat_emoji_food", element_popup).mouseover(function(){showTooltip(a(this), lang[232], false, 0, 20);}).mouseout(function(){hideTooltip();});
				a(".arrowchat_emoji_activities", element_popup).mouseover(function(){showTooltip(a(this), lang[233], false, 0, 20);}).mouseout(function(){hideTooltip();});
				a(".arrowchat_emoji_travel", element_popup).mouseover(function(){showTooltip(a(this), lang[234], false, 0, 20);}).mouseout(function(){hideTooltip();});
				a(".arrowchat_emoji_objects", element_popup).mouseover(function(){showTooltip(a(this), lang[235], false, 0, 20);}).mouseout(function(){hideTooltip();});
				a(".arrowchat_emoji_symbols", element_popup).mouseover(function(){showTooltip(a(this), lang[236], false, 0, 20);}).mouseout(function(){hideTooltip();});
				a(".arrowchat_emoji_flags", element_popup).mouseover(function(){showTooltip(a(this), lang[237], false, 0, 20);}).mouseout(function(){hideTooltip();});
				a(".arrowchat_emoji_custom", element_popup).mouseover(function(){showTooltip(a(this), lang[238], false, 0, 20);}).mouseout(function(){hideTooltip();});
				a(".arrowchat_smiley_button", element_popup).mouseenter(function () {
					if (a(".arrowchat_smiley_popout", element_popup).children(".arrowchat_more_popout").is(":visible")) {} else {
						showTooltip(a(this), lang[307], 0, 10, 10);
					}
					a(this).addClass("arrowchat_smiley_button_hover");
				});
				a(".arrowchat_smiley_button", element_popup).mouseleave(function () {
					hideTooltip();
					a(this).removeClass("arrowchat_smiley_button_hover");
				});
				a(".arrowchat_smiley_button", element_popup).click(function () {
					hideTooltip();
					if (a(".arrowchat_smiley_popout", element_popup).children(".arrowchat_more_popout").is(":visible")) {
						a(".arrowchat_smiley_popout", element_popup).children(".arrowchat_more_popout").hide();
					} else {
						if (!a(".arrowchat_emoji_selector", element_popup).hasClass("arrowchat_emoji_focused")) {
							a(".arrowchat_emoji_wrapper", element_popup).html('<div class="arrowchat_loading_icon"></div>');
							a(".arrowchat_emoji_selector", element_popup).removeClass("arrowchat_emoji_focused");
							a(".arrowchat_emoji_smileys", element_popup).addClass("arrowchat_emoji_focused");
							a.ajax({
								url: c_ac_path + 'includes/emojis/emoji_smileys.php',
								type: "GET",
								cache: true,
								success: function(html) {
									a(".arrowchat_emoji_wrapper", element_popup).html(html);
									a(".arrowchat_emoji", element_popup).click(function () {
										if (a(this).hasClass("arrowchat_emoji_custom"))
											var smiley_code = a(this).children('img').attr("data-id");
										else
											var smiley_code = a(this).html();
										var existing_text = a(".arrowchat_textarea", element_popup).val();
										a(".arrowchat_textarea", element_popup).focus().val('').val(existing_text + smiley_code);
									});
								}
							});
						}
						a(".arrowchat_textarea", element_popup).focus();
						a(".arrowchat_smiley_popout", element_popup).children(".arrowchat_more_popout").show();
					}
				}).children().not("i").click(function(e){
					return false;
				});
				a('body').click(function(evt){
					if(a(evt.target).closest(".arrowchat_smiley_button").length)
						return;
						
					a(".arrowchat_smiley_popout .arrowchat_more_popout").hide();
				});
				a(".arrowchat_more_options_button", element_popup).mouseenter(function () {
					if (a(".arrowchat_more_user_popout_wrapper", element_popup).children(".arrowchat_more_popout").is(":visible") || a(".arrowchat_giphy_popout", element_popup).children(".arrowchat_more_popout").is(":visible")) {} else {
						showTooltip(a(this), lang[308], 0, 10, 10);
					}
					
					a(this).addClass("arrowchat_more_options_button_hover")
				});
				a(".arrowchat_more_options_button", element_popup).mouseleave(function () {
					hideTooltip();
					a(this).removeClass("arrowchat_more_options_button_hover");
				});
				a(".arrowchat_more_options_button", element_popup).click(function () {
					hideTooltip();
					a(".arrowchat_more_user_popout_wrapper .arrowchat_more_popout", element_popup).toggle();
				}).children().not("i").find("input").not().click(function(e){
					return false;
				});
				a('body').click(function(evt){
					if(a(evt.target).closest(".arrowchat_more_options_button").length)
						return;
						
					a(".arrowchat_more_user_popout_wrapper .arrowchat_more_popout").hide();
				});
				a(".arrowchat_user_send_button", element_popup).mouseenter(function () {
					showTooltip(a(this), lang[311], 0, 10, 10);
					a(this).addClass("arrowchat_user_send_button_hover")
				});
				a(".arrowchat_user_send_button", element_popup).mouseleave(function () {
					hideTooltip();
					a(this).removeClass("arrowchat_user_send_button_hover");
				});
				a(".arrowchat_giphy_button", element_popup).mouseenter(function () {
					a(this).addClass("arrowchat_giphy_button_hover")
				});
				a(".arrowchat_giphy_button", element_popup).mouseleave(function () {
					a(this).removeClass("arrowchat_giphy_button_hover");
				});
				a(".arrowchat_gif_button", element_popup).click(function () {
					var type = 1;
					if (is_chatroom)
						type = 2;
					hideTooltip();
					a(".arrowchat_more_user_popout_wrapper .arrowchat_more_popout", element_popup).hide();
					a(".arrowchat_giphy_popout", element_popup).children(".arrowchat_more_popout").show();
					a(".arrowchat_giphy_search", element_popup).val('');
					a(".arrowchat_giphy_search", element_popup).focus();
					loadGiphy('https://api.giphy.com/v1/gifs/trending?api_key=IOYyr4NK5ldaU&limit=20', type, id);
				});
				a('body').click(function(evt){
					if(a(evt.target).closest(".arrowchat_gif_button", element_popup).length)
						return;
						
					a(".arrowchat_giphy_popout", element_popup).children(".arrowchat_more_popout").hide();
				});
				a(".arrowchat_giphy_search", element_popup).keyup(function () {
					var type = 1;
					if (is_chatroom)
						type = 2;
					a(".arrowchat_giphy_image_wrapper", element_popup).html('<div class="arrowchat_loading_icon"></div>');
					if (a(".arrowchat_giphy_search", element_popup).val() == '')
						loadGiphy('https://api.giphy.com/v1/gifs/trending?api_key=IOYyr4NK5ldaU&limit=20', type, id);
					else
						loadGiphy('https://api.giphy.com/v1/gifs/search?api_key=IOYyr4NK5ldaU&limit=20&q=' + a(".arrowchat_giphy_search", element_popup).val(), type, id);
				});
				if ((c_file_transfer != 1 && !is_chatroom) || (c_chatroom_transfer != 1 && is_chatroom)) {a(".arrowchat_attach_button", element_popup).parent().hide();}
				if (c_disable_smilies == 1) {a(".arrowchat_smiley_button").hide();a(".arrowchat_tabcontentinput", element_popup).addClass("arrowchat_no_smiley")}
				if ((c_giphy == 1 && !is_chatroom) || (c_giphy_chatroom == 1 && is_chatroom)) {a(".arrowchat_gif_button", element_popup).hide();}
				if ((c_giphy == 1 && c_file_transfer != 1 && !is_chatroom) || (c_giphy_chatroom == 1 && c_chatroom_transfer != 1 && is_chatroom)) {a(".arrowchat_tabcontentinput", element_popup).addClass("arrowchat_no_more_actions")}
				a('body').click(function(evt){
					if(a(evt.target).closest(a(".arrowchat_more_anchor", element_popup)).length)
						return;
						
					a(".arrowchat_more_popout_user", element_popup).hide();
					a(".arrowchat_more_anchor", element_popup).removeClass("arrowchat_more_button_selected");
				});
				a(".arrowchat_tabtitle .arrowchat_dash_button", element_popup).mouseenter(function () {
					showTooltip(a(this), lang[304], 0, 10, 0);
					a(this).addClass("arrowchat_dash_button_hover");
				});
				a(".arrowchat_tabtitle .arrowchat_dash_button", element_popup).mouseleave(function () {
					hideTooltip();
					a(this).removeClass("arrowchat_dash_button_hover");
				});
				a(".arrowchat_tabtitle .arrowchat_dash_button", element_popup).click(function () {
					hideTooltip();
					a(this).removeClass("arrowchat_dash_button_hover");
					element_tab.click();
				});
				a(".arrowchat_textarea", element_popup).keydown(function (h) {
					if (is_chatroom)
						return chatroomKeydown(h, a(this), id);
					else
						return userchatKeydown(h, a(this), id);
				});
				a(".arrowchat_textarea", element_popup).keyup(function (h) {
					if (is_chatroom)
						return chatroomKeyup(h, a(this), id);
					else
						return userchatKeyup(h, a(this), id);
				});
				a(".arrowchat_tabtitle .arrowchat_closebox", element_popup).mouseenter(function () {
					showTooltip(a(this), lang[89], 0, 10, 0);
					a(this).addClass("arrowchat_chatboxmouseoverclose");
					a(".arrowchat_tabtitle", element_popup).removeClass("arrowchat_chatboxtabtitlemouseover")
				});
				a(".arrowchat_tabtitle .arrowchat_closebox", element_popup).mouseleave(function () {
					a(this).removeClass("arrowchat_chatboxmouseoverclose");
					a(".arrowchat_tabtitle", element_popup).addClass("arrowchat_chatboxtabtitlemouseover");
					hideTooltip();
				});
				a(".arrowchat_tabtitle .arrowchat_closebox", element_popup).click(function () {
					hideTooltip();
					if (is_chatroom) {
						leaveChatroom(id);
					} else {
						leavechat(id);
					}
				});
				a(".arrowchat_more_popout .arrowchat_chat_popout", element_popup).click(function () {
					a(".arrowchat_more_popout_user", element_popup).toggle();
					a(".arrowchat_more_anchor", element_popup).toggleClass("arrowchat_more_button_selected");
				});
				a(".arrowchat_more_popout .arrowchat_chat_popout", element_popup).click(function() {
					if (is_chatroom) {
						window.open(c_ac_path + "public/popout/?cid=" + id + "&ah=1", "chatroom"+id, "menubar=0,resizable=0,width=940,height=620,top=25,left=25,scrollbars=0,status=0");
					} else {
						window.open(c_ac_path + "public/popout/", "user"+id, "menubar=0,resizable=0,width=940,height=620,top=25,left=25,scrollbars=0,status=0");
					}
				});
				a(".arrowchat_tabtitle", element_popup).mouseenter(function () {
					a(this).addClass("arrowchat_chatboxtabtitlemouseover")
				});
				a(".arrowchat_tabtitle", element_popup).mouseleave(function () {
					a(this).removeClass("arrowchat_chatboxtabtitlemouseover")
				});
				element_tab.mouseenter(function () {
					a(this).addClass("arrowchat_tabmouseover");
					a("div", element_tab).addClass("arrowchat_tabmouseovertext");
					a(".arrowchat_tab_flyout", element_tab).show();
				});
				element_tab.mouseleave(function () {
					a(this).removeClass("arrowchat_tabmouseover");
					a("div", element_tab).removeClass("arrowchat_tabmouseovertext");
					a(".arrowchat_tab_flyout", element_tab).hide();
				});
				if (is_chatroom) {
					chatroomsSpecialTabProcessing(id, chatroom_password, open);
				} else {
					usersSpecialTabProcessing(id, open);
				}
				if (c_disable_avatars == 1 || a("#arrowchat_setting_names_only :input").is(":checked")) {
					setAvatarVisibility(1);
				}
			}
		}
		
		function getRandomColor(name) {
			const firstAlphabet = name.slice(0, 2).toLowerCase();
			const asciiCode = firstAlphabet.charCodeAt(0);
			const colorNum = asciiCode.toString() + asciiCode.toString() + asciiCode.toString();
			var num = Math.round(0xffffff * parseInt(colorNum));
			var r = num >> 16 & 255;
			var g = num >> 8 & 255;
			var b = num & 255;

			return {
				color: 'rgb(' + r + ', ' + g + ', ' + b + ', 0.7)',
				character: firstAlphabet.toUpperCase()
			};
		}
		
		function usersSpecialTabProcessing(id, open) {
			a(".arrowchat_user_send_button", $user_popups[id]).click(function() {
				hideTooltip();
				sendUserMessage(a(".arrowchat_textarea", $user_popups[id]), id);
			});
			if (c_video_chat != 1) {
				a(".arrowchat_video_icon", $user_popups[id]).hide();
			}
			if (c_enable_moderation != 1) {
				a(".arrowchat_report_user", $user_popups[id]).parent().hide();
			}
			a(".arrowchat_more_anchor", $user_popups[id]).click(function () {
				hideTooltip();
				a(".arrowchat_more_popout_user", $user_popups[id]).toggle();
				a(this).toggleClass("arrowchat_more_button_selected");
			});
			addHover(a(".arrowchat_user_image", $user_popups[id]), "arrowchat_user_image_hover");
			if (uc_status[id] == 'offline' || (uc_status[id] == 'busy' && c_video_select != 2 && c_video_select != 3))
				a(".arrowchat_tabtitle .arrowchat_video_icon", $user_popups[id]).addClass("arrowchat_video_unavailable");
			else
				a(".arrowchat_tabtitle .arrowchat_video_icon", $user_popups[id]).removeClass("arrowchat_video_unavailable");
			a(".arrowchat_video_icon", $user_popups[id]).click(function () {
				if (uc_status[id] != 'offline' && (uc_status[id] != 'busy' || c_video_select == 2 || c_video_select == 3)) {
					var RN = Math.floor(Math.random() * 9999999999);
					while (String(RN).length < 10) {
						RN = '0' + RN;
					}
					if (c_video_select == 4 || c_video_select == 1)
							RN = encodeURI(location.host).replace(/\./g, '') + RN;
					if (c_video_select == 2) {
						a.ajax({
							type:"post",
							url: c_ac_path + "public/video/video_session.php",
							data: {
								room: RN
							},
							async: false,
							success: function(sess) {
								a.post(c_ac_path + "includes/json/send/send_message.php", {
									userid: u_id,
									to: id,
									message: "video{" + sess + "}"
								}, function (e) {
									if (!a.isNumeric(e)) {
										a.each(e, function (i, q) {
											if (i == "error") {
												a.each(q, function (l, f) {
													displayMessage(a(".arrowchat_message_box", $user_popups[id]), f.m, "error");
												});
											}
										});
									} else {
										jqac.arrowchat.videoWith(sess);
										displayMessage(a(".arrowchat_message_box", $user_popups[id]), lang[63], "notice");
									}
									a(".arrowchat_tabcontenttext", $user_popups[id]).scrollTop(a(".arrowchat_tabcontenttext", $user_popups[id])[0].scrollHeight);
								});
							}
						});
					} else {
						a.post(c_ac_path + "includes/json/send/send_message.php", {
							userid: u_id,
							to: id,
							message: "video{" + RN + "}"
						}, function (e) {
							if (!a.isNumeric(e)) {
								a.each(e, function (i, q) {
									if (i == "error") {
										a.each(q, function (l, f) {
											displayMessage(a(".arrowchat_message_box", $user_popups[id]), f.m, "error");
										});
									}
								});
							} else {
								jqac.arrowchat.videoWith(RN);
								displayMessage(a(".arrowchat_message_box", $user_popups[id]), lang[63], "notice");
							}
							a(".arrowchat_tabcontenttext", $user_popups[id]).scrollTop(a(".arrowchat_tabcontenttext", $user_popups[id])[0].scrollHeight);
						});
					}
				}
			});
			a(".arrowchat_block_user", $user_popups[id]).click(function () {
				a(".arrowchat_more_popout_user", $user_popups[id]).toggle();
				a(".arrowchat_more_anchor", $user_popups[id]).toggleClass("arrowchat_more_button_selected");
				a(".arrowchat_tabtitle .arrowchat_closebox", $user_popups[id]).click();
				a.post(c_ac_path + "includes/json/send/send_settings.php", {
					block_chat: id
				}, function () {
					if (typeof(blockList[id]) == "undefined") {
						blockList[id] = id;
					}
					loadBuddyList();
				})
			});
			a(".arrowchat_clear_user", $user_popups[id]).click(function () {
				a(".arrowchat_more_popout_user", $user_popups[id]).toggle();
				a(".arrowchat_more_anchor", $user_popups[id]).toggleClass("arrowchat_more_button_selected");
				a(".arrowchat_tabcontenttext", $user_popups[id]).html("");
				a.post(c_ac_path + "includes/json/send/send_settings.php", {
					clear_chat: id
				}, function () {})
			});
			a(".arrowchat_report_user", $user_popups[id]).click(function () {
				a(".arrowchat_more_popout_user", $user_popups[id]).toggle();
				a(".arrowchat_more_anchor", $user_popups[id]).toggleClass("arrowchat_more_button_selected");
				a.post(c_ac_path + "includes/json/send/send_settings.php", {
					report_from: u_id,
					report_about: id
				}, function () {
					displayMessage(a(".arrowchat_message_box", $user_popups[id]), lang[168], "notice");
				});
			});
			a(".arrowchat_tabtitle .arrowchat_video_icon", $user_popups[id]).mouseenter(function () {
				if (uc_status[id] == 'offline' || (uc_status[id] == 'busy' && c_video_select != 2 && c_video_select != 3)) {
					showTooltip(a(this), lang[146], 0, 10, 0); 
				} else {
					showTooltip(a(this), lang[88], 0, 10, 0);
					a(this).addClass("arrowchat_video_icon_hover");
				}
				a(".arrowchat_tabtitle", $user_popups[id]).removeClass("arrowchat_chatboxtabtitlemouseover")
			});
			a(".arrowchat_tabtitle .arrowchat_video_icon", $user_popups[id]).mouseleave(function () {
				a(this).removeClass("arrowchat_video_icon_hover");
				a(".arrowchat_tabtitle", $user_popups[id]).addClass("arrowchat_chatboxtabtitlemouseover");
				hideTooltip();
			});
			$users[id].click(function () {
				lsClick(" ", 'ac_openclose', "users['"+id+"']");
				var tba = 0;
				if (a(".arrowchat_tabalert", $users[id]).length > 0) {
					tba = 1;
					a(".arrowchat_tabalert", $users[id]).remove();
					$users[id].removeClass("arrowchat_tab_new_message");
					G[id] = 0;
					y[id] = 0;
				}
				if (a(this).hasClass("arrowchat_tabclick")) {
					$users[id].detach();
					$users[id].prependTo($closed_windows);
					a(this).show();
					closePopup($user_popups[id], a(this));
					j = "";
					a.post(c_ac_path + "includes/json/send/send_settings.php", {
						unfocus_chat: id,
						tab_alert: 1
					}, function () {});
				} else {
					$user_popups[id].detach();
					$user_popups[id].prependTo($open_windows);
					a(this).hide();
					if (ca[id] != 1) {
						receiveHistory(id);
						ca[id] = 1
					}
					if (typeof(init_open[id]) == "undefined")
						init_open[id] = 1;
					if (init_open[id] == 1) {
						a.post(c_ac_path + "includes/json/send/send_settings.php", {
							focus_chat: id,
							tab_alert: tba
						}, function () {});     
					}
					init_open[id] = 1;
					a(this).addClass("arrowchat_tabclick").addClass("arrowchat_usertabclick");
					$user_popups[id].addClass("arrowchat_tabopen");					
					j = id;
				}
				adjustSizes();
				a(".arrowchat_tabcontenttext", $user_popups[id]).scrollTop(a(".arrowchat_tabcontenttext", $user_popups[id])[0].scrollHeight);
				getStatus("updatingsession") != 1 && a(".arrowchat_textarea", $user_popups[id]).focus()
			});
			if (open != 1) {
				$users[id].click();
			}
			if (c_file_transfer == 1) {
				userUploadProcessing(id);
			}
			y[id] = 0;
			G[id] = 0;
		}
		
		function chatroomsSpecialTabProcessing(id, chatroom_password, open) {
			if (c_popout_on != 1) {
				a(".arrowchat_chat_popout").parent().hide();
				a(".arrowchat_more_popout_user ul .arrowchat_menu_separator:last").hide();
			}
			a(".arrowchat_user_send_button", $chatrooms_popups[id]).click(function() {
				hideTooltip();
				sendChatroomMessage(a(".arrowchat_textarea", $chatrooms_popups[id]), id);
			});
			a(".arrowchat_more_anchor", $chatrooms_popups[id]).click(function () {
				hideTooltip();
				a(".arrowchat_more_popout_user", $chatrooms_popups[id]).toggle();
				a(this).toggleClass("arrowchat_more_button_selected");
				a(".arrowchat_inner_menu", $chatrooms_popups[id]).show();
				a(".arrowchat_flood_menu", $chatrooms_popups[id]).hide();
			}).parent().children('.arrowchat_more_user_wrapper').click(function () {
				return false;
			});
			if (u_chatroom_sound == 1) { 
				a(".arrowchat_room_sounds .arrowchat_switch :input", $chatrooms_popups[id]).prop("checked", true)
			} else {
				a(".arrowchat_room_sounds").addClass("arrowchat_menu_unchecked");
				a(".arrowchat_room_sounds .arrowchat_switch :input", $chatrooms_popups[id]).prop("checked", false)
			}
			a(".arrowchat_room_sounds", $chatrooms_popups[id]).click(function () {
				a(".arrowchat_room_sounds").toggleClass("arrowchat_menu_unchecked");
				if (a(".arrowchat_room_sounds :input", $chatrooms_popups[id]).is(":checked")) {
					a(".arrowchat_room_sounds :input").prop("checked", false);
					_chatroomsound = -1;
					u_chatroom_sound = 0;
				} else {
					a(".arrowchat_room_sounds :input").prop("checked", true);
					_chatroomsound = 1;
					u_chatroom_sound = 1;
				}
				a.post(c_ac_path + "includes/json/send/send_settings.php", {
					chatroom_sound: _chatroomsound
				}, function () {
				});
			});
			if (u_chatroom_block_chats == 1) { 
				a(".arrowchat_block_private_chats .arrowchat_switch :input", $chatrooms_popups[id]).prop("checked", true)
			} else {
				a(".arrowchat_block_private_chats").addClass("arrowchat_menu_unchecked");
				a(".arrowchat_block_private_chats .arrowchat_switch :input", $chatrooms_popups[id]).prop("checked", false)
			}
			a(".arrowchat_block_private_chats", $chatrooms_popups[id]).click(function () {
				a(".arrowchat_block_private_chats").toggleClass("arrowchat_menu_unchecked");
				if (a(".arrowchat_block_private_chats :input", $chatrooms_popups[id]).is(":checked")) {
					a(".arrowchat_block_private_chats :input").prop("checked", false);
					_chatroomblock = -1;
					u_chatroom_block_chats = 0;
				} else {
					a(".arrowchat_block_private_chats :input").prop("checked", true);
					_chatroomblock = 1;
					u_chatroom_block_chats = 1;
				}
				a.post(c_ac_path + "includes/json/send/send_settings.php", {
					chatroom_block_chats: _chatroomblock
				}, function () {
				});
			});
			a(".arrowchat_room_list_icon", $chatrooms_popups[id]).mouseenter(function () {
				showTooltip(a(this), lang[312], 0, 10, 0);
				a(this).addClass("arrowchat_room_list_icon_hover");
			});
			a(".arrowchat_room_list_icon", $chatrooms_popups[id]).mouseleave(function () {
				hideTooltip();
				a(this).removeClass("arrowchat_room_list_icon_hover");
			});
			a(".arrowchat_room_list_icon", $chatrooms_popups[id]).click(function() {
				a(this).toggleClass('arrowchat_room_list_icon_selected');
				a('.arrowchat_room_userlist', $chatrooms_popups[id]).toggleClass('arrowchat_room_userlist_show');
			});
			$chatrooms[id].click(function () {
				lsClick(" ", 'ac_openclose', "chatrooms['"+id+"']");
				var tba = 0;
				if (a(".arrowchat_tabalert", $chatrooms[id]).length > 0) {
					tba = 1;
					a(".arrowchat_tabalert", $chatrooms[id]).remove();
					$chatrooms[id].removeClass("arrowchat_tab_new_message");
				}
				if (a(this).hasClass("arrowchat_tabclick")) {
					$chatrooms[id].detach();
					$chatrooms[id].prependTo($closed_windows);
					a(this).show();
					closePopup($chatrooms_popups[id], a(this));
					a.post(c_ac_path + "includes/json/send/send_settings.php", {
						unfocus_chat: 'r'+id
					}, function () {})
				} else {
					$chatrooms_popups[id].detach();
					$chatrooms_popups[id].prependTo($open_windows);
					a(this).hide();  
					a(this).addClass("arrowchat_tabclick").addClass("arrowchat_usertabclick");
					$chatrooms_popups[id].addClass("arrowchat_tabopen");
					if (typeof(init_open_room[id]) == "undefined")
						init_open_room[id] = 1;
					if (init_open_room[id] == 1) {
						a.post(c_ac_path + "includes/json/send/send_settings.php", {
							focus_chat: 'r'+id
						}, function () {});
					}
					init_open_room[id] = 1;
				}
				adjustSizes();
				if (room_history_loaded[id] != 1) {
					initialChatroomLoad(id, chatroom_password);
					room_history_loaded[id] = 1;
				}
				a(".arrowchat_tabcontenttext", $chatrooms_popups[id]).scrollTop(a(".arrowchat_tabcontenttext", $chatrooms_popups[id])[0].scrollHeight);
				a(".arrowchat_textarea", $chatrooms_popups[id]).focus()
			});
			if (open != 1) {
				$chatrooms[id].click();
			}
			if (c_chatroom_transfer == 1) {
				chatroomUploadProcessing(id);
			}
		}

		function formatTimestamp(b, noHTML) {
			var c = "am",
				d = b.getHours(),
				i = b.getMinutes(),
				e = b.getDate();
			b = b.getMonth();			var g = d;
			if (d > 11) c = "pm";
			if (d > 12) d -= 12;
			if (d == 0) d = 12;
			if (d < 10) d = d;
			if (i < 10) i = "0" + i;
			var l = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				f = "th";
			if (e == 1 || e == 21 || e == 31) f = "st";
			else if (e == 2 || e == 22) f = "nd";
			else if (e == 3 || e == 23) f = "rd";
			if (noHTML) {
				if (c_us_time != 1) {
					return e != Na ? '' + g + ":" + i + " " + e + f + " " + l[b] + "" : '' + g + ":" + i + ""
				} else {
					return e != Na ? '' + l[b] + ' ' + e + ', ' + d + ':' + i + c + '' : '' + d + ':' + i + c + ''
				}
			} else {
				if (c_us_time != 1) {
					return e != Na ? '<span class="arrowchat_ts">' + g + ":" + i + " " + e + f + " " + l[b] + "</span>" : '<span class="arrowchat_ts">' + g + ":" + i + "</span>"
				} else {
					return e != Na ? '<span class="arrowchat_ts">' + l[b] + ' ' + e + ', ' + d + ':' + i + c + '</span>' : '<span class="arrowchat_ts">' + d + ':' + i + c + '</span>'
				}
			}
		}

		function receiveHistory(b, times) {
			if (times) {} else times = 1;
			if (times > 1) {
				a('<div class="arrowchat_message_history_loading" style="text-align:center;padding:5px 0;"><img src="' + c_ac_path + 'themes/' + u_theme + '/images/img-loading.gif" alt="Loading" /></div>').prependTo(a(".arrowchat_tabcontenttext", $user_popups[b]));
			}
			a.ajax({
				cache: false,
				url: c_ac_path + "includes/json/receive/receive_history.php",
				data: {
					chatbox: b,
					history: times
				},
				type: "post",
				dataType: "json",
				success: function (c) {
					a(".arrowchat_message_history_loading").remove();
					history_ids[b] = 0;
					numMessages = 0;
					if (c) {
						if (times == 1)
							a(".arrowchat_tabcontenttext", $user_popups[b]).html("");
						last_sent[b] = null;
						var d = "",
							i = uc_name[b],
							init = false,
							unhide_avatars = [];
						a.each(c, function (e, l) {
							e == "messages" && a.each(l, function (f, h) {
								numMessages++;
								f = "";
								var pending_icon = "";
								if (h.self == 1) {
									fromname = u_name;
									fromid = u_id;
									f = " arrowchat_self";
									_aa5 = _aa4 = "";
									avatar = u_avatar;
									pending_icon = "<div class='arrowchat_pending_icon arrowchat_pending_delivered'></div>";
								} else {
									fromname = i;
									fromid = b;
									_aa4 = '<a href="' + uc_link[b] + '">';
									_aa5 = "</a>";
									avatar = uc_avatar[h.from];
								}
								if (last_name[h.from] != fromid && typeof(last_name[h.from]) != "undefined") {
									unhide_avatars.push(last_id[h.from]);
								}
								var image_msg = "";
								var show_time_class = "";
								var o = new Date(h.sent * 1E3);
								tooltip = formatTimestamp(o, 1);
								if (c_show_full_name != "1") {
									if (fromname.indexOf(" ") != -1) fromname = fromname.slice(0, fromname.indexOf(" "));
								}
								if (h.message.substr(0, 4) == "<div") {
									image_msg = " arrowchat_image_msg";
								}
								if (last_sent[h.from] == null || h.sent - last_sent[h.from] > 180) {
									show_time_class = " arrowchat_show_time";
								}
								var noAvatarColor = getRandomColor(fromname);
								d += '<div class="arrowchat_chatboxmessage arrowchat_clearfix' + f + image_msg + show_time_class + '" id="arrowchat_message_' + h.id + '">' + formatTimestamp(o) + '<div class="arrowchat_chatboxmessagefrom arrowchat_single_avatar_hide arrowchat_white_background" style="background-color:' + noAvatarColor["color"] + '"><span class="arrowchat_tab_letter arrowchat_tab_letter_xsmall">' + noAvatarColor["character"] + '</span><img alt="' + fromname + '" class="arrowchat_chatbox_avatar" src="' + avatar + '" /></div><div class="arrowchat_chatboxmessage_wrapper"><div class="arrowchat_chatboxmessagecontent" data-id="' + tooltip + '">' + h.message + "</div></div>" + pending_icon + "</div>";
								
								last_sent[h.from] = h.sent;
								last_name[h.from] = fromid;
								last_id[h.from] = h.id;
								init = true;
								
							})
						});
						var current_top_element = a(".arrowchat_tabcontenttext", $user_popups[b]).children('div').first('div');
						if (times > 1) {
							a(d).prependTo(a(".arrowchat_tabcontenttext", $user_popups[b]).first('div'));
						} else {
							a(".arrowchat_tabcontenttext", $user_popups[b]).html("<div>" + d + "</div>");
						}
						if (a("#arrowchat_message_" + last_id[b]).length) {
							a("#arrowchat_message_" + last_id[b]).children('.arrowchat_chatboxmessagefrom').removeClass('arrowchat_single_avatar_hide');
						}
						a.each(unhide_avatars, function(key, value) {
							if (a("#arrowchat_message_" + value).length) {
								a("#arrowchat_message_" + value).children('.arrowchat_chatboxmessagefrom').removeClass('arrowchat_single_avatar_hide');
							}
						});
						a(".arrowchat_pending_icon:not(.arrowchat_pending_error)", $user_popups[b]).hide();
						a(".arrowchat_tabcontenttext div .arrowchat_pending_icon:last", $user_popups[b]).show();
						showTimeAndTooltip();
						if (c_disable_avatars == 1 || a("#arrowchat_setting_names_only :input").is(":checked")) {
							setAvatarVisibility(1);
						}
						var previous_height = 0;
						current_top_element.prevAll().each(function() {
						  previous_height += a(this).outerHeight();
						});
						if (times == 1)
							a(".arrowchat_tabcontenttext", $user_popups[b]).scrollTop(5E4);
						else
							a(".arrowchat_tabcontenttext", $user_popups[b]).scrollTop(previous_height);
						a(".arrowchat_tabcontenttext", $user_popups[b]).scroll(function(){
							if (a(".arrowchat_tabcontenttext", $user_popups[b]).scrollTop() < 50 && history_ids[b] != 1) {
								history_ids[b] = 1;
								if (numMessages == 20) {
									times++;
									receiveHistory(b, times);
								}
							}
						});
						preventScrolling(a(".arrowchat_tabcontenttext"));
						if (numMessages == 0 && times == 1) {
							a(".arrowchat_tabcontenttext", $user_popups[b]).html('<div class="arrowchat_no_recent_convo"><i class="fas fa-hand-wave"></i>'+lang[245]+'</p>');
							a(".arrowchat_tabcontenttext", $user_popups[b]).html('<div class="arrowchat_no_recent_convo"><i class="fas fa-hand-wave"></i>'+lang[245]+'</p>');
						}
						if (times == 1) {
							a(".arrowchat_image_msg img,.arrowchat_emoji_text img").one("load", function() {
							  a(".arrowchat_tabcontenttext", $user_popups[b]).scrollTop(5E4);
							}).each(function() {
							  if(this.complete) a(this).trigger('load');
							});
						}
					}
				}
			})
		}
		
		function showTimeAndTooltip() {
			a(".arrowchat_chatboxmessagecontent").mouseenter(function () {
				if (a(this).parent().parent().hasClass('arrowchat_image_msg'))
					showTooltip(a(this), a(this).attr("data-id"), false, a(this).parent().width() + 23, 6, 1, false);
				else
					showTooltip(a(this), a(this).attr("data-id"), false, a(this).parent().width() - 5, -3, 1, false);
			});
			a(".arrowchat_chatboxmessagecontent").mouseleave(function () {
				hideTooltip();
			});						
			a(".arrowchat_chatboxmessage").mouseenter(function () {
				a(this).children(".arrowchat_ts").show();
			});
			a(".arrowchat_chatboxmessage").mouseleave(function () {
				a(this).children(".arrowchat_ts").hide();
			});
			a(".arrowchat_lightbox").unbind('click');
			a(".arrowchat_lightbox").click(function (){
				a.slimbox(a(this).attr('data-id'), '<a href="'+a(this).attr('data-id')+'">'+lang[70]+'</a>', {resizeDuration:1, overlayFadeDuration:1, imageFadeDuration:1, captionAnimationDuration:1});
			});
		}
		
		function showChatroomTime() {
			a(".arrowchat_chatroom_msg:not(.arrowchat_global_chatroom_message)").unbind('mouseenter');
			a(".arrowchat_chatroom_msg:not(.arrowchat_global_chatroom_message)").mouseenter(function (e) {
				if (a(this).parents('.arrowchat_chatroom_box_message').hasClass('arrowchat_image_msg'))
					showTooltip(a(this), a(this).parent().attr("data-id"), false, a(this).parent().width() + 23, 6, 1, false);
				else
					showTooltip(a(this), a(this).parent().attr("data-id"), false, a(this).parent().width() - 5, -3, 1, false);
				if (!a(this).parents('.arrowchat_chatroom_box_message').hasClass('arrowchat_self')) {
					a(this).parents(".arrowchat_chatroom_msg_wrap").find(".arrowchat_message_controls").addClass("arrowchat_message_controls_display");
				}
			});
			a(".arrowchat_chatroom_msg:not(.arrowchat_global_chatroom_message)").unbind('mouseleave');
			a(".arrowchat_chatroom_msg:not(.arrowchat_global_chatroom_message)").mouseleave(function (e) {
				if(!a(e.relatedTarget).hasClass('arrowchat_message_controls')) {
					hideTooltip();
					a(".arrowchat_message_controls").removeClass("arrowchat_message_controls_display");
				}
			});
			a(".arrowchat_message_controls").unbind('mouseleave');
			a(".arrowchat_message_controls").mouseleave(function (e) {
				if(!a(e.relatedTarget).hasClass('arrowchat_chatroom_msg')) {
					hideTooltip();
					a(".arrowchat_message_controls").removeClass("arrowchat_message_controls_display");
				}
			});
			a(".arrowchat_chatroom_reply").unbind("mouseenter").unbind("mouseleave").unbind("click");
			a(".arrowchat_chatroom_reply").mouseenter(function () {
				showTooltip(a(this), lang[313], 0, 10, 10);
				a(this).addClass("arrowchat_chatroom_reply_hover");
			});
			a(".arrowchat_chatroom_reply").mouseleave(function () {
				hideTooltip();
				a(this).removeClass("arrowchat_chatroom_reply_hover");
			});
			a(".arrowchat_chatroom_reply").click(function () {
				hideTooltip();
				a(".arrowchat_message_controls").removeClass("arrowchat_message_controls_display");
				var id = a(this).parents('.arrowchat_tabpopup').attr('data-room-id');
				var mention_name = a(this).parents('.arrowchat_chatroom_box_message').find('.arrowchat_chatroom_message_avatar').attr('alt');
				if (mention_name.charAt(mention_name.length-1) == ":")
					mention_name = mention_name.substring(0, mention_name.length - 1);
				var mention_full = '@' + mention_name + ' ';
				var existing_text = a(".arrowchat_textarea", $chatrooms_popups[id]).val();
				if (existing_text != "") {
					if (existing_text.charAt(existing_text.length-1) != " ")
						mention_full = ' ' + mention_full;
				}
				a(".arrowchat_textarea", $chatrooms_popups[id]).focus().val('').val(existing_text + mention_full);
			});
			a(".arrowchat_lightbox").unbind('click');
			a(".arrowchat_lightbox").click(function (){
				a.slimbox(a(this).attr('data-id'), '<a href="'+a(this).attr('data-id')+'">'+lang[70]+'</a>', {resizeDuration:1, overlayFadeDuration:1, imageFadeDuration:1, captionAnimationDuration:1});
			});
		}

		function setAvatarVisibility(b) {
			if (b == 1) {
				a(".arrowchat_closed_windows_wrapper[data-id] .arrowchat_closed_image img").addClass("arrowchat_hide_avatars");
				a(".arrowchat_tabpopup[data-id] .arrowchat_avatarbox img").addClass("arrowchat_hide_avatars");
				a(".arrowchat_tab_letter").css('display', 'flex');
				a(".arrowchat_userlist_avatar").addClass("arrowchat_hide_avatars");
				a(".arrowchat_chatroom_avatar").addClass("arrowchat_hide_avatars");
				a(".arrowchat_chatroom_flyout_avatar").addClass("arrowchat_hide_avatars");
				a(".arrowchat_chatroom_message_avatar").addClass("arrowchat_hide_avatars");
				a(".arrowchat_chatbox_avatar").addClass("arrowchat_hide_avatars");
				a(".arrowchat_closed_windows_wrapper[data-id] .arrowchat_closed_image").removeClass("arrowchat_white_background");
				a(".arrowchat_chatboxmessagefrom").removeClass("arrowchat_white_background");
				a(".arrowchat_avatarbox").removeClass("arrowchat_white_background");
				a(".arrowchat_chatbox_avatar_wrapper").removeClass("arrowchat_white_background");
				a(".arrowchat_disable_avatars_name").show();
				a(".arrowchat_chatboxmessage_wrapper").addClass("arrowchat_chatboxmessage_wrapper2");
				a(".arrowchat_chatboxmessagecontent").addClass("arrowchat_chatboxmessagecontent2");
			} else {	
				a(".arrowchat_closed_windows_wrapper[data-id] .arrowchat_closed_image img").removeClass("arrowchat_hide_avatars");
				a(".arrowchat_tabpopup[data-id] .arrowchat_avatarbox img").removeClass("arrowchat_hide_avatars");
				a(".arrowchat_tab_letter").hide();
				a(".arrowchat_userlist_avatar").removeClass("arrowchat_hide_avatars");
				a(".arrowchat_chatroom_avatar").removeClass("arrowchat_hide_avatars");
				a(".arrowchat_chatroom_flyout_avatar").removeClass("arrowchat_hide_avatars");
				a(".arrowchat_chatroom_message_avatar").removeClass("arrowchat_hide_avatars");
				a(".arrowchat_chatbox_avatar").removeClass("arrowchat_hide_avatars");
				a(".arrowchat_closed_windows_wrapper[data-id] .arrowchat_closed_image").addClass("arrowchat_white_background");
				a(".arrowchat_chatboxmessagefrom").addClass("arrowchat_white_background");
				a(".arrowchat_avatarbox").addClass("arrowchat_white_background");
				a(".arrowchat_chatbox_avatar_wrapper").addClass("arrowchat_white_background");
				a(".arrowchat_disable_avatars_name").hide();
				a(".arrowchat_chatboxmessage_wrapper").removeClass("arrowchat_chatboxmessage_wrapper2");
				a(".arrowchat_chatboxmessagecontent").removeClass("arrowchat_chatboxmessagecontent2");
			}
		}

		function buildBuddyListTab() {
			var d = "";
			$buddy_list_tab = a("<div/>").attr("id", "arrowchat_buddy_list_tab").html(ArrowChat.Templates.buddylist_tab()).appendTo($base);
			$open_windows = a("<div/>").attr("id", "arrowchat_open_windows").appendTo($base);
			$closed_windows = a("<div/>").attr("id", "arrowchat_closed_windows").appendTo($base);
			$userstab_popup = a("<div/>").attr("id", "arrowchat_userstab_popup").addClass("arrowchat_tabpopup").html(ArrowChat.Templates.buddylist_window(d, acp)).appendTo($open_windows);
			if (c_disable_avatars == 1) {
				a("#arrowchat_name_box").hide();
				a("#arrowchat_setting_names_only").parent("li").hide();
			}
			a(".arrowchat_powered_by").css("display", "none");
			a(".arrowchat_search_friends_text").placeholder();
			if (u_sounds == 1) { 
				a("#arrowchat_setting_sound .arrowchat_switch :input").prop("checked", true)
			} else {
				a("#arrowchat_setting_sound").addClass("arrowchat_menu_unchecked");
				a("#arrowchat_setting_sound .arrowchat_switch :input").prop("checked", false)
			}
			if (u_blist_open == 1) { 
				a("#arrowchat_setting_window_open .arrowchat_switch :input").prop("checked", true)
			} else {
				a("#arrowchat_setting_window_open").addClass("arrowchat_menu_unchecked");
				a("#arrowchat_setting_window_open .arrowchat_switch :input").prop("checked", false)
			}
			if (u_no_avatars == 1) {
				a("#arrowchat_setting_names_only .arrowchat_switch :input").prop("checked", true)
			} else {
				a("#arrowchat_setting_names_only").addClass("arrowchat_menu_unchecked");
				a("#arrowchat_setting_names_only .arrowchat_switch :input").prop("checked", false);
			}
			if (u_is_guest == 1 && c_guest_name_change == 1 && u_guest_name == "") {
				function guestNameInput() {
					var new_name = a(".arrowchat_guest_name_input").val();
					a.post(c_ac_path + "includes/json/send/send_settings.php", {
						chat_name: new_name
					}, function (data) {
						if (data != "1") {
							if (data == lang[123]) {
								displayMessage(a("#arrowchat_buddylist_message_flyout"), data, "error");
								a(".arrowchat_enter_name_wrapper").fadeOut('fast');
							} else {
								displayMessage(a("#arrowchat_buddylist_message_flyout"), data, "error");
							}
						} else {
							a(".arrowchat_enter_name_wrapper").fadeOut('fast');
							u_name = new_name;
						}
					});
				}
				a(".arrowchat_enter_name_wrapper").show();
				a(".arrowchat_guest_name_input").placeholder();
				a(".arrowchat_guest_name_input").keydown(function (h) {
					if (h.keyCode == 13) {
						guestNameInput();
					}
				});
				a("#arrowchat_guest_name_button").click(function() {
					guestNameInput();
				});
			}
			a(".arrowchat_search_friends_text").keyup(function () {
				if (typeof(searchxhr) != "undefined") searchxhr.abort();
				a(".arrowchat_search_not_found").remove();
				a("#arrowchat_userscontent").children('div').not('.arrowchat_userslist_offline').hide();
				a("<div/>").attr("class", "arrowchat_search_not_found arrowchat_nofriends").html('<div class="arrowchat_loading_icon"></div>').prependTo("#arrowchat_userscontent");
				clearTimeout(Z);
				adjustSizes();
				var i = 0,
					c = "",
					d = "",
					f = a(this).val();
				if (f.length < 2) {
					a(".arrowchat_search_not_found").remove();
					a("#arrowchat_userscontent").children('div').not('#arrowchat_userslist_offline').show();
					if (buddylisttest == 2) loadBuddyList();
					buddylisttest = 1;
				} else {
					buddylisttest = 2;
					if (a("#arrowchat_setting_names_only :input").is(":checked")) d = "arrowchat_hide_avatars";
					searchxhr = a.ajax({
						url: c_ac_path + "includes/json/receive/receive_search.php",
						type: "post",
						cache: false,
						dataType: "json",
						data: {
							search_name: f
						},
						success: function (b) {
							if (b && b != null) {
								a.each(b, function (e, l) {
									a.each(l, function (f, h) {
										if (typeof(uc_avatar[h.id]) != "undefined")
											var ava = uc_avatar[h.id];
										else
											var ava = h.avatar;
										var icon = ' fas fa-circle';
										if (h.status == 'away')
											icon = ' fas fa-moon';
										else if (h.status == 'busy')
											icon = ' far fa-mobile-screen';
										if (c_disable_avatars == 1 || a("#arrowchat_setting_names_only :input").is(":checked")) d = "arrowchat_hide_avatars";
										c += '<div id="arrowchat_userlist_' + h.id + '" class="arrowchat_userlist" onmouseover="jqac(this).addClass(\'arrowchat_userlist_hover\');" onmouseout="jqac(this).removeClass(\'arrowchat_userlist_hover\');"><img class="arrowchat_userlist_avatar ' + d + '" src="' + ava + '" /><span class="arrowchat_userscontentname">' + h.name + '</span><span class="arrowchat_userscontentdot arrowchat_' + h.status + icon +'"></span></div>';
										i++;
									});
								});
								if (i == 0) {
									a(".arrowchat_search_not_found").html(lang[26]);
								} else {
									a(".arrowchat_search_not_found").remove();
									a('#arrowchat_userslist_available').show().html(c);
									
									a(".arrowchat_userlist").click(function (l) {
										receiveUserFromUserlist(l.target)
									});
								}
							}
							adjustSizes();
						}
					});
				}
				adjustSizes();
			});
			a(document).bind("idle.idleTimer", function () {
				if (w != 1) {
					clearUserStatus();
					setUserStatus("away");
					isAway = 1;
				}
			});
			a(document).bind("active.idleTimer", function () {
				if (w != 1) {
					clearUserStatus();
					setUserStatus("available");
					isAway = 0;
				}
			});
			a.idleTimer(60000 * ArrowChat.IdleTime);
			a("#arrowchat_setting_sound").click(function () {
				lsClick("#arrowchat_setting_sound", 'ac_click');
				a(this).toggleClass("arrowchat_menu_unchecked");
				if (a("#arrowchat_setting_sound :input").is(":checked")) {
					a("#arrowchat_setting_sound :input").prop("checked", false);
					_soundcheck = -1;
					u_sounds = 0;
				} else {
					a("#arrowchat_setting_sound :input").prop("checked", true);
					_soundcheck = 1;
					u_sounds = 1;
				}
				a.post(c_ac_path + "includes/json/send/send_settings.php", {
					sound: _soundcheck
				}, function () {
				});
			});
			a("#arrowchat_setting_window_open").click(function () {
				a(this).toggleClass("arrowchat_menu_unchecked");
				if (a("#arrowchat_setting_window_open :input").is(":checked")) {
					a("#arrowchat_setting_window_open :input").prop("checked", false);
					_windowcheck = -1
				} else {
					a("#arrowchat_setting_window_open :input").prop("checked", true);
					_windowcheck = 1
				}
				a.post(c_ac_path + "includes/json/send/send_settings.php", {
					window: _windowcheck
				}, function () {
				});
			});
			a("#arrowchat_setting_names_only").click(function () {
				lsClick("#arrowchat_setting_names_only", 'ac_click');
				a(this).toggleClass("arrowchat_menu_unchecked");
				if (a("#arrowchat_setting_names_only :input").is(":checked")) {
					a("#arrowchat_setting_names_only :input").prop("checked", false);
					setAvatarVisibility(0);
					_namecheck = -1
				} else {
					a("#arrowchat_setting_names_only :input").prop("checked", true);
					setAvatarVisibility(1);
					_namecheck = 1
				}
				a.post(c_ac_path + "includes/json/send/send_settings.php", {
					name: _namecheck
				}, function () {
				});
			});
			a("#arrowchat_setting_block_list").click(function () {
				a(this).parent().parent(".arrowchat_inner_menu").hide();
				a(".arrowchat_block_menu").show();
				a.ajax({
					url: c_ac_path + "includes/json/receive/receive_block_list.php",
					type: "get",
					cache: false,
					dataType: "json",
					success: function (b) {
						if (b && b != null) {
							a(".arrowchat_block_menu select").html("");
							a("<option/>").attr("value", "0").html(lang[118]).appendTo(a(".arrowchat_block_menu select"));
							a.each(b, function (e, l) {
								a.each(l, function (f, h) {
									a("<option/>").attr("value", h.id).html(h.username).appendTo(a(".arrowchat_block_menu select"));
								});
							});
						}
					}
				});
			});
			a("#arrowchat_unblock_button").click(function () {
				a(".arrowchat_more_button").click();
				var unblock_chat_user = a(".arrowchat_block_menu select").val();
				if (unblock_chat_user != "0") {
					a.post(c_ac_path + "includes/json/send/send_settings.php", {
						unblock_chat: unblock_chat_user
					}, function () {
						if (typeof(blockList[unblock_chat_user]) != "undefined") {
							blockList.splice(unblock_chat_user, 1);
						}
						loadBuddyList();
					});
				}
			});
			preventScrolling(a("#arrowchat_userscontent"));
			a("#arrowchat_mobiletab").mouseleave(function () {
				a(this).removeClass("arrowchat_mobiletab_hover");
			});
			a("#arrowchat_mobiletab").mouseenter(function () {
				a(this).addClass("arrowchat_mobiletab_hover");
			});
			a(".arrowchat_close_button", $userstab_popup).mouseenter(function () {
				showTooltip(a(this), lang[299], 0, 10, 0);
				a(this).addClass("arrowchat_close_button_hover");
			});
			a(".arrowchat_close_button", $userstab_popup).mouseleave(function () {
				hideTooltip();
				a(this).removeClass("arrowchat_close_button_hover");
			});
			a(".arrowchat_close_button", $userstab_popup).click(function () {
				hideTooltip();
				$buddy_list_tab.click();
			});
			a("#arrowchat_block_back", $userstab_popup).click(function () {
				a("#arrowchat_options_flyout .arrowchat_inner_menu", $userstab_popup).show();
				a(".arrowchat_block_menu").hide();
			});
			a("#arrowchat_user_selection", $userstab_popup).click(function () {
				if (a(this).hasClass("arrowchat_selection_tab_selected")){}else{
					a("#arrowchat_userscontent").children('div').not('#arrowchat_userslist_offline').show();
					a(".arrowchat_search_friends_text").val('');
					a(this).addClass("arrowchat_selection_tab_selected");
					a("#arrowchat_room_selection", $userstab_popup).removeClass("arrowchat_selection_tab_selected");
					a(".arrowchat_chatroom_full_content").hide();
					a("#arrowchat_userscontent").show();
					loadBuddyList();
					lsClick("#arrowchat_user_selection", 'ac_click');
				}
			});
			a(".arrowchat_search_friends_text", $userstab_popup).keydown(function() {
				a("#arrowchat_user_selection").click();
			});
			a(".arrowchat_more_button").mouseenter(function () {
				showTooltip(a(this), lang[23], 0, 10, 0);
				a(this).addClass("arrowchat_more_button_hover");
			}).children().mouseenter(function () {
				return false;
			});
			a(".arrowchat_more_button").mouseleave(function () {
				hideTooltip();
				a(this).removeClass("arrowchat_more_button_hover");
			}).children().mouseleave(function () {
				return false;
			});
			a(".arrowchat_more_button").click(function () {
				hideTooltip();
				a("#arrowchat_options_flyout").toggleClass("arrowchat_options_flyout_display");
				a(this).toggleClass("arrowchat_more_button_selected");
				a("#arrowchat_options_flyout").children(".arrowchat_inner_menu").show();
				a(".arrowchat_block_menu").hide();
			}).children().click(function () {
				return false;
			});
			a('body').click(function(evt){
				if(a(evt.target).closest('.arrowchat_more_button').length)
					return;
					
				a("#arrowchat_options_flyout").removeClass("arrowchat_options_flyout_display");
			});
			addHover(a(".arrowchat_menu_item"), "arrowchat_more_hover");
			a("#arrowchat_gooffline").click(function () {
				lsClick("#arrowchat_gooffline", 'ac_click');
				a(".arrowchat_more_button").click();	
				pushCancelAll();
				cancelJSONP();
				a.idleTimer("destroy");
				clearTimeout(Z);
				clearTimeout(Crref2);
				showUserOffline();
			});
			$buddy_list_tab.mouseover(function () {
				if ($userstab_popup.hasClass("arrowchat_tabopen")){} else {
					if (!a("#arrowchat_welcome").is(":visible")) {
						showTooltip($buddy_list_tab, lang[306], false, a(this).width() + 25, 6, 1, false);
					}
					a(this).addClass("arrowchat_tabmouseover");
				}
			});
			$buddy_list_tab.mouseout(function () {
				a(this).removeClass("arrowchat_tabmouseover");
				hideTooltip();
			});
			$buddy_list_tab.click(function () {
				lsClick("#arrowchat_buddy_list_tab", 'ac_openclose');
				hideTooltip();
				if (w == 1 || bli == 1) {
					clearTimeout(Z);
					loadBuddyList();
					bli = 0;
				}
				if (c_first_time_message_viewed == 1) {
					a("#arrowchat_welcome").hide();
					a.post(c_ac_path + "includes/json/send/send_settings.php", {
						welcome: 1
					}, function () {});
					c_first_time_message_viewed = 0;
				}
				if (w == 1) {
					w = 0;
					a("#arrowchat_mobiletab_count").html(R);
					receiveCore();	
					pushSubscribe();
					if (Object.keys($chatrooms).length > 0) {
						receiveChatroom();
					}
					a.idleTimer(60000 * ArrowChat.IdleTime);
					setUserStatus("available");
					a("#arrowchat_mobiletab").removeClass("arrowchat_mobiletab_offline");
					$open_windows.show();
					$closed_windows.show();
				}
				if ($buddy_list_tab.hasClass("arrowchat_tabclick")){}else{
					$userstab_popup.detach();
					$userstab_popup.prependTo($open_windows);
				}
				a(this).toggleClass("arrowchat_tabclick").toggleClass("arrowchat_userstabclick");
				$userstab_popup.toggleClass("arrowchat_tabopen");
				if (a(".arrowchat_enter_name_wrapper").is(":visible")) {
					a(".arrowchat_guest_name_input").focus();
				}
				adjustSizes();
			});
		}
		
		function buildUnseenUsers() {
			$unseen_users = a(ArrowChat.Templates.unseen_chat_tab()).appendTo($closed_windows);
			$unseen_users.mouseenter(function() {
				a("#arrowchat_unseen_flyout").show();
			});
			$unseen_users.mouseleave(function() {
				a("#arrowchat_unseen_flyout").hide();
			});
			preventScrolling(a("#arrowchat_unseen_flyout"));
		}
		
		function adjustClosedWindows() {
			if (typeof($closed_windows) == "undefined")
				return false;
			var us_count = 0;
			var us_avatar = "";
			var totalAmount = 0;
			a("#arrowchat_unseen_list").html("");
			$closed_windows.children().each(function(i) {
				if (!a(this).hasClass('arrowchat_tabclick') && !a(this).hasClass('arrowchat_unseen_users_tabs')) {
					us_count++;
					var amount = 0;
					var count_class = "";
					if (us_count >= c_num_closed_windows) {
						if (a(this).children('.arrowchat_tabalert').length > 0) {
							amount = parseInt(a(this).children('.arrowchat_tabalert').html());
							if (amount > 0)
								count_class = " arrowchat_show";
						}
						totalAmount = totalAmount + amount;
						a(this).hide();
						var id = a(this).attr('data-id');
						var room_id = a(this).attr('data-room-id');
						if (typeof room_id !== 'undefined' && room_id !== false) {
							a("<li/>").attr('data-room-id', room_id).addClass('arrowchat_unseen_user_list').html('<span>'+cr_name[room_id]+'</span><div class="arrowchat_unseen_list_count'+count_class+'">'+amount+'</div><div class="arrowchat_unseen_close far fa-xmark"> </div>').appendTo(a("#arrowchat_unseen_list"));
						} else {
							a("<li/>").attr('data-id', id).addClass('arrowchat_unseen_user_list').html('<span>'+uc_name[id]+'</span><div class="arrowchat_unseen_list_count'+count_class+'">'+amount+'</div><div class="arrowchat_unseen_close far fa-xmark"> </div>').appendTo(a("#arrowchat_unseen_list"));
						}
					} else {
						a(this).show();
					}
					if (us_count == c_num_closed_windows) {
						us_avatar = a(this).children('.arrowchat_closed_image').html();
					}
				}
			});
			if (totalAmount > 0) {
				a(".arrowchat_unseen_tabalert").html(totalAmount).show();
			} else {
				a(".arrowchat_unseen_tabalert").html('0').hide();
			}
			if (us_count >= c_num_closed_windows) {
				a(".arrowchat_unseen_count", $unseen_users).html("+" + (us_count-(c_num_closed_windows-1)));
				a(".arrowchat_closed_image", $unseen_users).html(us_avatar);
				a(".arrowchat_unseen_user_list").mouseenter(function (e) {
					if(e.target == this){
						a(".arrowchat_unseen_user_list").removeClass('arrowchat_unseen_user_list_hover');
						a(this).addClass('arrowchat_unseen_user_list_hover');
					}
				});
				a(".arrowchat_unseen_user_list").mouseleave(function (e) {
					if(e.target == this){
						a(this).removeClass('arrowchat_unseen_user_list_hover');
					}
				});
				a(".arrowchat_unseen_user_list").click(function(e) {
					var id = a(this).attr('data-id');
					var room_id = a(this).attr('data-room-id');
					a(this).removeClass('arrowchat_unseen_user_list_hover');
					a("#arrowchat_unseen_flyout").hide();
					if (typeof room_id !== 'undefined' && room_id !== false) {
						$chatrooms[room_id].click();
					} else {
						$users[id].click();
					}
				});
				a(".arrowchat_unseen_close").mouseenter(function (e) {
					if(e.target == this){
						a(".arrowchat_unseen_close").removeClass('arrowchat_unseen_close_hover');
						a(this).addClass('arrowchat_unseen_close_hover');
					}
				});
				a(".arrowchat_unseen_close").mouseleave(function (e) {
					if(e.target == this){
						a(this).removeClass('arrowchat_unseen_close_hover');
					}
				});
				a(".arrowchat_unseen_close").click(function(e) {
					var id = a(this).parent().attr('data-id');
					var room_id = a(this).parent().attr('data-room-id');
					a(this).removeClass('arrowchat_unseen_close_hover');
					a("#arrowchat_unseen_flyout").hide();
					if (typeof room_id !== 'undefined' && room_id !== false) {
						a(".arrowchat_closebox_bottom", $chatrooms[room_id]).click();
					} else {
						a(".arrowchat_closebox_bottom", $users[id]).click();
					}
				});
				$unseen_users.show();
			} else {
				$unseen_users.hide();
			}
		}
		
		function adjustChatWindows() {
			if (typeof($open_windows) == "undefined")
				return false;
				
			var op_width = a("#arrowchat_open_windows").outerWidth();
			var chat_tab_width = a("#arrowchat_buddy_list_tab").outerWidth();
			var window_width = a(window).width();
			c_window_left_padding = parseInt(c_window_left_padding);
			
			if (window_width - (op_width + chat_tab_width) < c_window_left_padding) {
				if ($open_windows.children('.arrowchat_tabopen').length > 1) {
					var id = $open_windows.children('.arrowchat_tabopen').last().attr('data-id');
					var room_id = $open_windows.children('.arrowchat_tabopen').last().attr('data-room-id');
					if (typeof id !== 'undefined' && id !== false) {
						$users[id].detach();
						$users[id].prependTo($closed_windows);
						$users[id].removeClass('arrowchat_tabclick').removeClass('arrowchat_usertabclick').show();
					}
					
					if (typeof room_id !== 'undefined' && room_id !== false) {
						$chatrooms[room_id].detach();
						$chatrooms[room_id].prependTo($closed_windows);
						$chatrooms[room_id].removeClass('arrowchat_tabclick').removeClass('arrowchat_usertabclick').show();
					}
					
					$open_windows.children('.arrowchat_tabopen').last().removeClass('arrowchat_tabopen').addClass('arrowchat_temporary_hide');
				}
			} else if (window_width - (op_width + chat_tab_width) > ((c_window_left_padding + 20) + a('.arrowchat_tabopen').outerWidth())) {
				var id = $open_windows.children('.arrowchat_temporary_hide').first().attr('data-id');
				var room_id = $open_windows.children('.arrowchat_temporary_hide').first().attr('data-room-id');
				if (typeof id !== 'undefined' && id !== false) {
					$users[id].addClass('arrowchat_tabclick').addClass('arrowchat_usertabclick').hide();
					
					if (a(".arrowchat_tabalert", $users[id]).length > 0) {
						a(".arrowchat_tabalert", $users[id]).remove();
						$users[id].removeClass("arrowchat_tab_new_message");
						G[id] = 0;
						y[id] = 0;
					}
				}
				
				if (typeof room_id !== 'undefined' && room_id !== false) {
					$chatrooms[room_id].addClass('arrowchat_tabclick').addClass('arrowchat_usertabclick').hide();
					
					if (a(".arrowchat_tabalert", $chatrooms[room_id]).length > 0) {
						a(".arrowchat_tabalert", $chatrooms[room_id]).remove();
						$chatrooms[room_id].removeClass("arrowchat_tab_new_message");
					}
				}
				$open_windows.children('.arrowchat_temporary_hide').first().addClass('arrowchat_tabopen').removeClass('arrowchat_temporary_hide');
			}
		}

		function adjustSizes() {
			adjustChatWindows();
			adjustClosedWindows();
		}

		function set(b, c) {
			V[b] = c
		}

		function get(b) {
			return V[b] ? V[b] : ""
		}

		function getStatus(b) {
			return xa[b] ? xa[b] : ""
		}

		function receiveUserFromUserlist(b) {
			if (a(b).attr("id")) var c = a(b).attr("id").substr(19);
			else var c = "";
			if (c == "") c = a(b).parent().attr("id").substr(19);
			receiveUser(c, uc_name[c], uc_status[c], uc_avatar[c], uc_link[c]);
			lsClick("#arrowchat_userlist_" + c, 'ac_click');
		}

		function chatroomListClicked(b, length) {
			c = "";
			 if (a(b).attr("id"))
				c = a(b).attr("id").substr(length);
			if (c == "") c = a(b).parent().attr("id").substr(length);
			if (cr_type[c] == 2) {
				a("#arrowchat_chatroom_password_id").val(c);
				if (a("#arrowchat_chatroom_" + c).hasClass("arrowchat_chatroom_clicked")) {
					a("#arrowchat_chatroom_password_flyout").hide("slide", { direction: "up"}, 250);
					a(".arrowchat_chatroom_list").removeClass("arrowchat_chatroom_clicked");
					a(".arrowchat_chatroom_full_content").removeClass("arrowchat_chatroom_opacity");
				} else {
					a(".arrowchat_chatroom_list").removeClass("arrowchat_chatroom_clicked");
					a("#arrowchat_chatroom_" + c).addClass("arrowchat_chatroom_clicked");
					if (!a("#arrowchat_chatroom_password_flyout").is(":visible")) {
						a("#arrowchat_chatroom_password_flyout").show("slide", { direction: "up"}, 250, function() {
							a("#arrowchat_chatroom_password_input").focus();
						});
						a(".arrowchat_chatroom_full_content").addClass("arrowchat_chatroom_opacity");
					} else {
						a("#arrowchat_chatroom_password_flyout").hide("slide", { direction: "up"}, 250);
						a("#arrowchat_chatroom_password_flyout").show("slide", { direction: "up"}, 250, function() {
							a("#arrowchat_chatroom_password_input").focus();
						});
						a(".arrowchat_chatroom_full_content").addClass("arrowchat_chatroom_opacity");
					}
				}
			} else {
				a(".arrowchat_chatroom_full_content").removeClass("arrowchat_chatroom_opacity");
				if (a("#arrowchat_chatroom_password_flyout").is(":visible")) {
					a("#arrowchat_chatroom_password_flyout").hide("slide", { direction: "up"}, 250);
				}
				loadChatroom(c, "")
			}
		}

		function addMessageToChatroom(b, c, d, multi_tab, id, pending_msg) {
			if (typeof(multi_tab) == "undefined") multi_tab = 0;
			var title = "",important = "", image_msg = "";
			if (chatroom_mod[id] == 1) {
				title = lang[137];
				important = " arrowchat_chatroom_important";
			}
			if (chatroom_admin[id] == 1) {
				//title = lang[136];
				title = lang[137];
				important = " arrowchat_chatroom_important";
			}
			if (multi_tab != 1)
				d = d.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>").replace(/\"/g, "&quot;");
			d = youTubeEmbed(d);
			d = replaceURLWithHTMLLinks(d);
			d = smileyreplace(d);
			if (d.substr(0, 4) == "<div") {
				image_msg = " arrowchat_image_msg";
			}
			var pending_icon = "<div class='arrowchat_pending_icon'></div>";
			if (multi_tab == 1) {
				pending_icon = "<div class='arrowchat_pending_icon arrowchat_pending_delivered'></div>";
			}
			var pending_class = "";
			var pending_class_id = "";
			if (pending_msg != 0) {
				pending_class = " arrowchat_pending_msg";
				pending_class_id = ' arrowchat_pending_msg_room_' + pending_msg;
			}
			var tooltip = formatTimestamp(new Date(Math.floor((new Date).getTime() / 1E3) * 1E3), 1);
			if (a("#arrowchat_chatroom_message_" + b).length > 0) {
			} else {
				if (b != 0) {
					var id_element = ' id="arrowchat_chatroom_message_' + b + '" ';
				} else {
					var id_element = "";
				}
				a(".arrowchat_tabcontenttext", $chatrooms_popups[id]).append('<div class="arrowchat_chatroom_box_message arrowchat_self' + important + image_msg + pending_class + pending_class_id + '" ' + id_element + '><div class="arrowchat_chatroom_message_name"><i class="' + title + '"></i>' + c + '</div><div class="arrowchat_chatroom_msg_wrap"><img class="arrowchat_chatroom_message_avatar arrowchat_no_names" src="'+u_avatar+'" alt="' + c + '" /><div class="arrowchat_chatroom_message_content" data-id="' + tooltip + '"><span class="arrowchat_chatroom_msg">' + d + '</span></div><div class="arrowchat_message_controls"><div class="arrowchat_chatroom_reply"><i class="fas fa-reply"></i></div><div class="arrowchat_chatroom_delete" data-id="' +  b + '"><i class="far fa-xmark"></i></div></div></div>' + pending_icon + '</div>');
				a(".arrowchat_tabcontenttext", $chatrooms_popups[id]).scrollTop(5E4)
			}
			if (id != 0) {
				showChatroomTime();
				modDeleteControls(id);
			}
		}

		function addMessageToContent(b, c) {
			if (uc_name[b] == null || uc_name[b] == "") setTimeout(function () {
				addMessageToContent(b, c)
			}, 500);
			else {
				a(".arrowchat_tabcontenttext", $user_popups[b]).append("<div>" + c + "</div>");
				a(".arrowchat_tabcontenttext", $user_popups[b]).scrollTop(5E4);
				G[b] = 1
			}
		}

		function loadChatroomList(id, password) {
			if (typeof(id) == "undefined") id = 0;
			if (typeof(password) == "undefined") password = "";
			a.ajax({					
				url: c_ac_path + "includes/json/receive/receive_chatroom_list.php",
				cache: false,
				type: "post",
				dataType: "json",
				success: function (b) {
					buildChatroomList(b);
					if (id != 0) {
						toggleUserChatTab(id, 0, true, password);
					}
				}
			});
		}

		function buildChatroomList(b) {
			a(".arrowchat_nofriends").remove();
			a(".arrowchat_chatroom_full_content").html("");
			var c = {},
			code = "",
			featured_list = "",
			totalNumber = 0,
			other_list = "";
			b && a.each(b, function (i, e) {
				if (i == "chatrooms") {
					a.each(e, function (l, f) {
						totalNumber++;
						code = '<div id="arrowchat_chatroom_' + f.id + '" class="arrowchat_chatroom_list"><div class="arrowchat_chatroom_image"><img src="' + c_ac_path + "themes/" + u_theme + '/images/icons/' + f.img + '" alt="" /></div><div class="arrowchat_chatroom_name_wrapper"><div class="arrowchat_chatroom_name">' + f.n + '<i class="arrowchat_chatroom_status arrowchat_chatroom_' + f.t + '"></i></div><div class="arrowchat_chatroom_desc">' + f.d + '</div></div><div class="arrowchat_chatroom_status_wrapper"><div class="arrowchat_chatroom_count"><i class="fad fa-circle-user"></i><span>' + f.c + '</span></div></div><div class="arrowchat_clearfix"></div></div>';
						if (f.o == 1) {
							other_list += code;
						} else {
							featured_list += code;
						}
						
						cr_name[f.id] = f.n;
						cr_desc[f.id] = f.d;
						cr_welcome[f.id] = f.welcome;
						cr_img[f.id] = f.img;
						cr_type[f.id] = f.t;
						cr_count[f.id] = f.c;
						cr_other[f.id] = f.o;
					})
				}
			});
			if (totalNumber == 0) {
				a('<div class="arrowchat_nofriends">' + lang[318] + "</div>").appendTo(".arrowchat_chatroom_full_content");
			}
			if (featured_list != "") {
				a('<div class="arrowchat_chatroom_list_title">' + lang[227] + '</div>').appendTo(a(".arrowchat_chatroom_full_content"));
				a(featured_list).appendTo(a(".arrowchat_chatroom_full_content"));
			}
			if (other_list != "") {
				a('<div class="arrowchat_chatroom_list_title">' + lang[228] + '</div>').appendTo(a(".arrowchat_chatroom_full_content"));
				a(other_list).appendTo(a(".arrowchat_chatroom_full_content"));
			}
			a(".arrowchat_chatroom_list").mouseover(function () {							
				a(this).addClass("arrowchat_chatroom_list_hover");
			}).mouseout(function () {
				a(this).removeClass("arrowchat_chatroom_list_hover");
			});
			a(".arrowchat_chatroom_list").click(function (l) {
				chatroomListClicked(a(this), 19)
			});
			a(".arrowchat_chatroom_count").mouseenter(function() {
				showTooltip(a(this), lang[35], 0, 5, 15);
			});
			a(".arrowchat_chatroom_count").mouseleave(function() {
				hideTooltip();
			});
		}

		function receiveChatroom() {
			if (c_chatrooms != 1) {
				return false;
			}
			clearTimeout(Crref2);
			var admin_markup = "";
			var rooms_string = "";
			for (var i in $chatrooms) {
				rooms_string += i + ",";
			}
			rooms_string = rooms_string.slice(0, -1);
			a.ajax({
				url: c_ac_path + "includes/json/receive/receive_chatroom.php",
				cache: false,
				type: "post",
				data: {
					chatrooms: rooms_string
				},
				dataType: "json",
				success: function (data) {
					if (data.room_data) {
						var no_error = true;
						var open_flyout = 0;
						var open_flyout_cr_id = 0;
						if (a('.arrowchat_chatroom_create_flyout_display').length) {
							open_flyout = a('.arrowchat_chatroom_create_flyout_display').parent().attr('data-user-id');
							open_flyout_cr_id = a('.arrowchat_chatroom_create_flyout_display').parents('.arrowchat_tabpopup').attr('data-room-id');
						}
						data.room_data && a.each(data.room_data, function (i, room) {
							if (room.error != 0) {
								no_error = false;									
								if (typeof($chatrooms[room.id]) != "undefined") {
									a(".arrowchat_closebox_bottom", $chatrooms[room.id]).click();
								}
								loadChatroomList();
								displayMessage(a("#arrowchat_chatroom_message_flyout"), room.error_msg, "error");
							}
							
							chatroom_admin[room.id] = 0;
							chatroom_mod[room.id] = 0;
							
							if (no_error) {
								if (room.user_title.admin == 1) {
									chatroom_admin[room.id] = 1;
								}
								if (room.user_title.mod == 1) {
									chatroom_mod[room.id] = 1;
								}
								
								var adminCount=0,modCount=0,userCount=0,totalCount=0;
								a(".arrowchat_room_userlist", $chatrooms_popups[room.id]).html('<div class="arrowchat_chatroom_line_admins" class="arrowchat_group_container"><span class="arrowchat_group_text">'+lang[148]+'</span><div class="arrowchat_group_line_container"><span class="arrowchat_group_line"></span></div></div><div class="arrowchat_chatroom_list_admins"></div><div class="arrowchat_chatroom_line_mods" class="arrowchat_group_container"><span class="arrowchat_group_text">'+lang[149]+'</span><div class="arrowchat_group_line_container"><span class="arrowchat_group_line"></span></div></div><div class="arrowchat_chatroom_list_mods"></div><div class="arrowchat_chatroom_line_users" class="arrowchat_group_container"><span class="arrowchat_group_text">'+lang[147]+'</span><div class="arrowchat_group_line_container"><span class="arrowchat_group_line"></span></div></div><div class="arrowchat_chatroom_list_users"></div>');
								a(".arrowchat_chatroom_user_popouts", $chatrooms_popups[room.id]).html("");

								a.each(room.chat_users, function (l, user) {
									if (user.status != 'invisible') {
										admin_markup = "";
										totalCount++;
										if ((chatroom_admin[room.id] == 1 || chatroom_mod[room.id] == 1) && (user.t == 1 || user.t == 4)) {
											admin_markup = '<li class="arrowchat_menu_separator"></li><li class="arrowchat_menu_item"><a class="arrowchat_chatroom_make_mod arrowchat_menu_anchor"><i class="fa-light fa-user-crown"></i><span>' + lang[52] + '</span></a></li><li class="arrowchat_menu_item"><a class="arrowchat_chatroom_silence_user arrowchat_menu_anchor"><i class="fa-light fa-volume-xmark"></i><span>' + lang[161] + '</span></a></li><li class="arrowchat_menu_item"><a class="arrowchat_chatroom_ban_user arrowchat_menu_anchor"><i class="fa-light fa-ban"></i><span>' + lang[53] + '</span></a></li>';
										}
										if (chatroom_admin[room.id] == 1 && user.t == 2) {
											admin_markup = '<li class="arrowchat_menu_separator"></li><li class="arrowchat_menu_item"><a class="arrowchat_chatroom_remove_mod arrowchat_menu_anchor"><i class="fa-light fa-circle-minus"></i><span>' + lang[54] + '</span></a></li>';
										}
										var appendVal = a(".arrowchat_chatroom_list_users", $chatrooms_popups[room.id]);
										if (user.t == 2) {
											appendVal = a(".arrowchat_chatroom_list_mods", $chatrooms_popups[room.id]);
											modCount++;
										} else if (user.t == 3) {
											appendVal = a(".arrowchat_chatroom_list_admins", $chatrooms_popups[room.id]);
											adminCount++;
										} else
											userCount++;
										user.n = renderHTMLString(user.n);
										var icon = ' fas fa-circle';
										if (user.status == 'away')
											icon = ' fas fa-moon';
										else if (user.status == 'busy')
											icon = ' far fa-mobile-screen';
										a("<div/>").attr('data-user-pop-id', user.id).attr("class", "arrowchat_chatroom_user").mouseover(function () {
											a(this).addClass("arrowchat_chatroom_list_hover");
										}).mouseout(function () {
											a(this).removeClass("arrowchat_chatroom_list_hover");
										}).addClass("arrowchat_chatroom_room_list").addClass('arrowchat_chatroom_admin_' + user.t).html('<img class="arrowchat_chatroom_avatar" src="' + user.a + '"/><span class="arrowchat_chatroom_room_name">' + user.n + '</span><span class="arrowchat_userscontentdot arrowchat_' + user.status + icon + '"></span>').appendTo(appendVal);
										var pm_opacity = "";
										if ((user.b == 1 && chatroom_admin[room.id] != 1) || user.id == u_id) pm_opacity = " arrowchat_no_private_msg";
										a("<div/>").attr("data-user-id", user.id).addClass("arrowchat_more_wrapper_chatroom").html('<div class="arrowchat_more_popout"><div class="arrowchat_chatroom_flyout_avatar"><img src="'+user.a+'" alt="" /></div><ul class="arrowchat_inner_menu arrowchat_chatroom_flyout_info"><li class="arrowchat_menu_item"><a class="arrowchat_chatroom_title arrowchat_menu_anchor"><span class="arrowchat_chatroom_fullname">' + user.n + '</span></a></li><li class="arrowchat_menu_item"><a class="arrowchat_menu_anchor arrowchat_chatroom_private_message'+pm_opacity+'"><i class="fa-light fa-messages"></i><span>' + lang[41] + '</span></a></li><li class="arrowchat_menu_item"><a class="arrowchat_menu_anchor arrowchat_chatroom_block_user"><i class="fa-light fa-user-slash"></i><span>' + lang[84] + '</span></a></li><li class="arrowchat_menu_item"><a class="arrowchat_menu_anchor arrowchat_chatroom_report_user"><i class="fa-light fa-triangle-exclamation"></i><span>' + lang[167] + '</span></a></li>' + admin_markup + '</ul></div>').appendTo(a('.arrowchat_chatroom_user_popouts', $chatrooms_popups[room.id]));
										addHover(a(".arrowchat_menu_item"), "arrowchat_more_hover");
									}
									uc_avatar[user.id] = user.a;
									uc_cr_block[user.id] = user.b;
								});
								
								chatroomUserOptions(chatroom_admin[room.id]);
								var sort_by_name = function(a, b) {
									return a.querySelector('.arrowchat_chatroom_room_name').innerHTML.toLowerCase().localeCompare(b.querySelector('.arrowchat_chatroom_room_name').innerHTML.toLowerCase());
								};
								var list = a(".arrowchat_chatroom_list_users > div").get();
								list.sort(sort_by_name);
								for (var i = 0; i < list.length; i++) {
									list[i].parentNode.appendChild(list[i]);
								}
								userCount == 0 && a(".arrowchat_chatroom_line_users", $chatrooms_popups[room.id]).hide();
								adminCount == 0 && a(".arrowchat_chatroom_line_admins", $chatrooms_popups[room.id]).hide();
								modCount == 0 && a(".arrowchat_chatroom_line_mods", $chatrooms_popups[room.id]).hide();
								
								modDeleteControls(room.id);
								if (chatroom_admin[room.id] == 1 || chatroom_mod[room.id] == 1) {
									addChatroomAdminControls(room.id);
								} else {
									a('.arrowchat_admin_controls', $chatrooms_popups[room.id]).hide();
								}
								
								a('.arrowchat_chatroom_count_window span', $chatrooms_popups[room.id]).html(totalCount);
								a('.arrowchat_chatroom_count_window span', $chatrooms[room.id]).html(totalCount);
								a('#arrowchat_chatroom_' + room.id).find('.arrowchat_chatroom_count').children('span').html(totalCount);
							}
						});
						
						if (no_error) {
							a(".arrowchat_chatroom_admin_3").css("background-color", "#"+c_admin_bg);
							a(".arrowchat_chatroom_admin_3").css("color", "#"+c_admin_txt);
							if (open_flyout != 0) {
								a('div[data-user-pop-id="'+open_flyout+'"]', $chatrooms_popups[open_flyout_cr_id]).click();
							}
							preventScrolling(a(".arrowchat_room_userlist"));
							if (c_disable_avatars == 1 || a("#arrowchat_setting_names_only :input").is(":checked")) {
								setAvatarVisibility(1);
							}
							if (a("#arrowchat_chatroom_show_names :input").is(":checked")) {
								setAvatarVisibility(0);
							}
						}
					}
				}
			});
			clearTimeout(Crref2);
			Crref2 = setTimeout(function () {
				receiveChatroom()
			}, 6E4);
		}
		
		function chatroomUserOptions(is_admin) {
			a(".arrowchat_chatroom_make_mod").unbind('click');
			a(".arrowchat_chatroom_make_mod").click(function () {
				var clicked_id = a(this).parents('.arrowchat_more_wrapper_chatroom').attr('data-user-id');
				var chatroom_id = a(this).parents('.arrowchat_tabpopup').attr('data-room-id');
				a.post(c_ac_path + "includes/json/send/send_settings.php", {
					chatroom_mod: clicked_id,
					chatroom_id: chatroom_id
				}, function () {receiveChatroom();});
				toggleChatroomUserInfo(a(this), clicked_id);
			});
			a(".arrowchat_chatroom_remove_mod").unbind('click');
			a(".arrowchat_chatroom_remove_mod").click(function () {
				var clicked_id = a(this).parents('.arrowchat_more_wrapper_chatroom').attr('data-user-id');
				var chatroom_id = a(this).parents('.arrowchat_tabpopup').attr('data-room-id');
				a.post(c_ac_path + "includes/json/send/send_settings.php", {
					chatroom_remove_mod: clicked_id,
					chatroom_id: chatroom_id
				}, function () {receiveChatroom();});
				toggleChatroomUserInfo(a(this), clicked_id);
			});
			a(".arrowchat_chatroom_block_user").unbind('click');
			a(".arrowchat_chatroom_block_user").click(function () {
				var clicked_id = a(this).parents('.arrowchat_more_wrapper_chatroom').attr('data-user-id');
				var chatroom_id = a(this).parents('.arrowchat_tabpopup').attr('data-room-id');
				a.post(c_ac_path + "includes/json/send/send_settings.php", {
					block_chat: clicked_id
				}, function (json_data) {
					if (json_data != "-1") {
						if (typeof(blockList[clicked_id]) == "undefined") {
							blockList[clicked_id] = clicked_id;
						}
						loadBuddyList();
						displayMessage(a(".arrowchat_message_box", $chatrooms_popups[chatroom_id]), lang[103], "notice");
					}
				});
				toggleChatroomUserInfo(a(this), clicked_id);
			});
			if (c_enable_moderation != 1) a(".arrowchat_chatroom_report_user").parent().hide();
			a(".arrowchat_chatroom_report_user").unbind('click');
			a(".arrowchat_chatroom_report_user").click(function () {
				var clicked_id = a(this).parents('.arrowchat_more_wrapper_chatroom').attr('data-user-id');
				var chatroom_id = a(this).parents('.arrowchat_tabpopup').attr('data-room-id');
				a.post(c_ac_path + "includes/json/send/send_settings.php", {
					report_about: clicked_id,
					report_from: u_id,
					report_chatroom: chatroom_id
				}, function (json_data) {
					displayMessage(a(".arrowchat_message_box", $chatrooms_popups[chatroom_id]), lang[168], "notice");
				});
				toggleChatroomUserInfo(a(this), clicked_id);
			});
			a(".arrowchat_chatroom_ban_user").unbind('click');
			a(".arrowchat_chatroom_ban_user").click(function () {
				var clicked_id = a(this).parents('.arrowchat_more_wrapper_chatroom').attr('data-user-id');
				var chatroom_id = a(this).parents('.arrowchat_tabpopup').attr('data-room-id');
				var ban_length = prompt(lang[57]);
				if (ban_length != null && ban_length != "" && !(isNaN(ban_length))) {
					a.post(c_ac_path + "includes/json/send/send_settings.php", {
						chatroom_ban: clicked_id,
						chatroom_id: chatroom_id,
						chatroom_ban_length: ban_length
					}, function () {receiveChatroom();});
				}
				toggleChatroomUserInfo(a(this), clicked_id);
			});
			a(".arrowchat_chatroom_silence_user").unbind('click');
			a(".arrowchat_chatroom_silence_user").click(function () {
				var clicked_id = a(this).parents('.arrowchat_more_wrapper_chatroom').attr('data-user-id');
				var chatroom_id = a(this).parents('.arrowchat_tabpopup').attr('data-room-id');
				var silence_length = prompt(lang[162]);
				if (silence_length != null && silence_length != "" && !(isNaN(silence_length))) {
					a.post(c_ac_path + "includes/json/send/send_settings.php", {
						chatroom_silence: clicked_id,
						chatroom_id: chatroom_id,
						chatroom_silence_length: silence_length
					}, function () {});
				}
				toggleChatroomUserInfo(a(this), clicked_id);
			});
			a(".arrowchat_chatroom_private_message").unbind('click');
			a(".arrowchat_chatroom_private_message").click(function () {
				var clicked_id = a(this).parents('.arrowchat_more_wrapper_chatroom').attr('data-user-id');
				var chatroom_id = a(this).parents('.arrowchat_tabpopup').attr('data-room-id');
				if (u_id != clicked_id) {
					if (uc_cr_block[clicked_id] != 1 || chatroom_admin[clicked_id] == 1 || chatroom_mod[clicked_id] == 1) {
						toggleChatroomUserInfo(a(this), clicked_id);
						jqac.arrowchat.chatWith(clicked_id);
					}
				}
			});
			a(".arrowchat_chatroom_title").unbind('click');
			a(".arrowchat_chatroom_title").click(function() {
				var clicked_id = a(this).parents('.arrowchat_more_wrapper_chatroom').attr('data-user-id');
				if (typeof(uc_link[clicked_id]) != "undefined")
					window.open(uc_link[clicked_id], "_self");
			});
			a(".arrowchat_chatroom_user").unbind('click');
			a(".arrowchat_chatroom_user").click(function () {
				var chatroom_id = a(this).parents('.arrowchat_tabpopup').attr('data-room-id');
				var clicked_id = a(this).attr('data-user-pop-id');
				a(".arrowchat_chatroom_user").removeClass("arrowchat_chatroom_clicked");
				a('.arrowchat_more_popout').removeClass("arrowchat_chatroom_create_flyout_display");
				a(this).toggleClass("arrowchat_chatroom_clicked");
				a('div[data-user-id="'+clicked_id+'"]', $chatrooms_popups[chatroom_id]).children('.arrowchat_more_popout').toggleClass("arrowchat_chatroom_create_flyout_display");
			});
			a('body').click(function(evt){
				if(a(evt.target).closest('.arrowchat_chatroom_user').length)
					return;
					
				if(a(evt.target).closest('.arrowchat_more_popout').length)
					return;
					
				a(".arrowchat_chatroom_user").removeClass("arrowchat_chatroom_clicked");
				a('.arrowchat_more_popout').removeClass("arrowchat_chatroom_create_flyout_display");
			});
		}
		function toggleChatroomUserInfo(element, clicked_id) {
			var chatroom_id = element.parents('.arrowchat_tabpopup').attr('data-room-id');
			a('div[data-user-pop-id="'+clicked_id+'"]', $chatrooms_popups[chatroom_id]).toggleClass("arrowchat_chatroom_clicked");
			a('div[data-user-id="'+clicked_id+'"]', $chatrooms_popups[chatroom_id]).children('.arrowchat_more_popout').toggleClass("arrowchat_chatroom_create_flyout_display");
		}

		function loadBuddyList() {
			clearTimeout(Z);
			a.ajax({
				url: c_ac_path + "includes/json/receive/receive_buddylist.php",
				cache: false,
				type: "get",
				dataType: "json",
				success: function (b) {
					buildBuddyList(b);
					if (c_disable_avatars == 1) {
						a(".arrowchat_userlist_avatar").addClass("arrowchat_hide_avatars")
					}
				}
			});
			if (typeof c_list_heart_beat != "undefined") {
				var BLHT = c_list_heart_beat * 1000;
			} else {
				var BLHT = 60000;
			}
			Z = setTimeout(function () {
				loadBuddyList()			
			}, BLHT)
		}

		function buildBuddyList(b) {
			var c = {},
				d = "";
			c.available = "";
			c.busy = "";
			c.offline = "";
			c.invisible = "";
			c.away = "";
			onlineNumber = buddylistreceived = 0;
			b && a.each(b, function (i, e) {
				if (i == "buddylist") {
					buddylistreceived = 1;
					totalFriendsNumber = onlineNumber = 0;
					a.each(e, function (l, f) {
						longname = renderHTMLString(f.n);
						if (G[f.id] != null) {
							a(".arrowchat_closed_status", $users[f.id]).removeClass("arrowchat_available").removeClass("arrowchat_busy").removeClass("arrowchat_offline").removeClass("arrowchat_away").addClass("arrowchat_" + f.s);
							a(".arrowchat_chat_window_status", $user_popups[f.id]).removeClass("arrowchat_available").removeClass("arrowchat_busy").removeClass("arrowchat_offline").removeClass("arrowchat_away").addClass("arrowchat_" + f.s);
							$users[f.id].removeClass("arrowchat_tab_offline").removeClass("arrowchat_away").addClass("arrowchat_tab_" + f.s);
							if (typeof($user_popups[f.id]) != "undefined") {
								a(".arrowchat_tabsubtitle .arrowchat_message", $user_popups[f.id]).html(f.m);
							}
							if (f.s == "offline" || (f.s == "busy" && c_video_select != 2 && c_video_select != 3))
								a(".arrowchat_tabtitle .arrowchat_video_icon", $user_popups[f.id]).addClass("arrowchat_video_unavailable");
							else
								a(".arrowchat_tabtitle .arrowchat_video_icon", $user_popups[f.id]).removeClass("arrowchat_video_unavailable");
						}
						if (f.s == "available" || f.s == "away" || f.s == "busy") onlineNumber++;
						totalFriendsNumber++;
						if (a("#arrowchat_setting_names_only :input").is(":checked")) d = "arrowchat_hide_avatars";
						var icon = ' fas fa-circle';
						if (f.s == 'away')
							icon = ' fas fa-moon';
						else if (f.s == 'busy')
							icon = ' far fa-mobile-screen';
						c[f.s] += '<div id="arrowchat_userlist_' + f.id + '" class="arrowchat_userlist arrowchat_buddylist_admin_' + f.admin + '" onmouseover="jqac(this).addClass(\'arrowchat_userlist_hover\');" onmouseout="jqac(this).removeClass(\'arrowchat_userlist_hover\');"><img class="arrowchat_userlist_avatar ' + d + '" src="' + f.a + '" /><span class="arrowchat_userscontentname">' + longname + '</span><span class="arrowchat_userscontentdot arrowchat_' + f.s + icon + '"></span></div>';
						uc_status[f.id] = f.s;
						uc_name[f.id] = f.n;
						uc_avatar[f.id] = f.a;
						uc_link[f.id] = f.l
					})
				}
				if (buddylistreceived == 1 && bli == 0) {
					for (buddystatus in c) {
						if (c.hasOwnProperty(buddystatus)) {
							if (c[buddystatus] == "") {
								a("#arrowchat_userslist_" + buddystatus).html("")
							} else {
								a("#arrowchat_userslist_" + buddystatus).html("<div>" + c[buddystatus] + "</div>");
							}
						}
					}
					a(".arrowchat_userlist").click(function (l) {
						if (!a(this).hasClass('arrowchat_jabber_user'))
							receiveUserFromUserlist(l.target)
					});
					a("#arrowchat_mobiletab_count").html(onlineNumber);
					R = onlineNumber;
					totalFriendsNumber == 0 && a("#arrowchat_userslist_available").html('<div class="arrowchat_nofriends">' + lang[8] + "</div>");
					R == 0 && a("#arrowchat_userslist_available").html('<div class="arrowchat_nofriends">' + lang[8] + "</div>");
					buddylistreceived = 0
				} else {
					a("#arrowchat_mobiletab_count").html(onlineNumber);
				}
				a(".arrowchat_buddylist_admin_1").css("background-color", "#"+c_admin_bg);
				a(".arrowchat_buddylist_admin_1").css("color", "#"+c_admin_txt);
			})
		}

		function cancelJSONP() {
			if (typeof CHA != "undefined") {
				clearTimeout(CHA);
			}
			if (typeof xOptions != "undefined") {
				xOptions.abort();
			}
		};

		function receiveCore() {
			cancelJSONP();
			var chatroom_string = "";
			if (!a.isEmptyObject(chatroom_list)) {
				for (var i in chatroom_list) {
					chatroom_string = chatroom_string + "&room[]=" + chatroom_list[i];
				}
			}
			var url = c_ac_path + "includes/json/receive/receive_core.php?hash=" + u_hash_id + "&init=" + acsi + chatroom_string;
			xOptions = a.ajax({
				url: url,
				dataType: "jsonp",
				success: function (b) {
					var c = "",
						d = {};
					d.available = "";
					d.busy = "";
					d.offline = "";
					d.away = "";
					onlineNumber = buddylistreceived = 0;
					if (b && b != null) {
						var i = 0;
						a.each(b, function (e, l) {
							if (e == "typing") {
								a.each(l, function (f, h) {
									if (h.is_typing == "1") {
										lsClick(h.typing_id, 'typing');
										receiveTyping(h.typing_id);
									} else {
										lsClick(h.typing_id, 'untyping');
										receiveNotTyping(h.typing_id);
									}
								});
							}
							if (e == "announcements") {
								a.each(l, function (f, h) {
									receiveAnnouncement(h);
								});
							}
							if (e == "warnings") {
								a.each(l, function (f, h) {
									receiveWarning(h);
								});
							}
							if (e == "chatroom") {
								var alert_count = [],
									room_data = [],
									play_chatroom_sound = 0;
								a.each(l, function (f, h) {
									if (h.action == 1) {
										a("#arrowchat_chatroom_message_" + h.m + " .arrowchat_chatroom_msg").html(lang[159] + h.n);
									} else {
										if (typeof(blockList[h.userid]) == "undefined") {
											addChatroomMessage(h.id, h.n, h.m, h.userid, h.t, h.global, h.mod, h.admin, h.chatroomid);
											var data_array = [h.id, h.n, h.m, h.userid, h.t, h.global, h.mod, h.admin, h.chatroomid];
											lsClick(JSON.stringify(data_array), 'chatroom_message');
										}
										if (!a(".arrowchat_chatroom_message_input").is(":focus") && h.userid != u_id)
											play_chatroom_sound = 1;
											
										room_data[h.chatroomid] = h;
										if (typeof(alert_count[h.chatroomid]) != "undefined")
											alert_count[h.chatroomid] = alert_count[h.chatroomid] + 1;
										else
											alert_count[h.chatroomid] = 1;
									}
								});
								if (room_data.length > 0) {
									showChatroomTime();
									for (var key in room_data) {
										if (typeof(blockList[room_data[key].userid]) == "undefined") {
											chatroomAlerts(alert_count[key], room_data[key].chatroomid);
											var data_array = [alert_count[key], room_data[key].chatroomid];
											lsClick(JSON.stringify(data_array), 'chatroom_alerts');
										}
									}
									u_chatroom_sound == 1 && play_chatroom_sound ==1 && playNewMessageSound();
								}
							}
							if (e == "notifications") {
								var markup2 = "";
								a.each(l, function (f, h) {
									addNotification(h.alert_id, h.markup);
									markup2 = h.markup;
								});
								notificationAlerts(markup2);
							}
							if (e == "messages") {
								var play_sound = 0;
								a.each(l, function (f, h) {
									receiveMessage(h.id, h.from, h.message, h.sent, h.self, h.old, 0, 0);
									if (!a(".arrowchat_textarea", $user_popups[h.from]).is(":focus")) {
										play_sound = 1;
									}
								});
								K = 1;
								D = E;
								j != "" && i > 0 && addMessageToContent(j, c);
								showTimeAndTooltip();
								d != 1 && u_sounds == 1 && play_sound == 1 && acsi != 1 && playNewMessageSound();
							}
						});
					}
					set("initialize", "0");
					set("currenttime", "0");
					if ($ != 1 && w != 1) {
						K++;
						if (K > 4) {
							D *= 2;
							K = 1
						}
						if (D > 12E3) D = 12E3
					}
					acsi++;
				}
			});
			if (isAway == 1) {
				var CHT = c_heart_beat * 1000 * 3;
			} else {
				var CHT = c_heart_beat * 1000;
			}
			if (c_push_engine != 1) {
				CHA = setTimeout(function () {
					receiveCore()
				}, CHT);
			}
		}

		function addChatroomMessage(id, name, message, userid, sent, global, mod, admin, chatroomid) {
			if (userid == u_id) {
				uc_avatar[u_id] = u_avatar;
			}
			message = stripslashes(message);
			message = replaceURLWithHTMLLinks(message);
			var sent_time = new Date(sent * 1E3);
			if (typeof(uc_avatar[userid]) == "undefined") {
				a.ajax({
					url: c_ac_path + "includes/json/receive/receive_user.php",
					data: {
						userid: userid
					},
					type: "post",
					cache: false,
					dataType: "json",
					success: function (data) {
						if (data) {
							uc_avatar[userid] = data.a;
							chatroomDiv(id, uc_avatar[userid], name, sent_time, message, global, mod, admin, userid, chatroomid);
						}
					}
				});
			} else {
				chatroomDiv(id, uc_avatar[userid], name, sent_time, message, global, mod, admin, userid, chatroomid);
			}
			count++;	
		}
		
		function chatroomDiv(id, image, name, time, message, global, mod, admin, userid, chatroomid) {
			if (userid == u_id && global == 0) {
				return false;
			}
			var container = a(".arrowchat_tabcontenttext", $chatrooms_popups[chatroomid])[0].scrollHeight - a(".arrowchat_tabcontenttext", $chatrooms_popups[chatroomid]).scrollTop() - 10;
			var container2 = a(".arrowchat_tabcontenttext", $chatrooms_popups[chatroomid]).outerHeight();
			var title = "", l = "", important = "", image_msg = "";
			if (userid == u_id) {
				l = "arrowchat_self";
			}
			if (mod == 1) {
				title = lang[137];
				important = "arrowchat_chatroom_important";
			}
			if (admin == 1) {
				//title = lang[136];
				title = lang[137];
				important = "arrowchat_chatroom_important";
			}
			if (message.substr(0, 4) == "<div") {
				image_msg = " arrowchat_image_msg";
			}
			a(".arrowchat_pending_icon:not(.arrowchat_pending_error)", $chatrooms_popups[chatroomid]).hide();
			a(".arrowchat_tabcontenttext .arrowchat_chatroom_box_message .arrowchat_pending_icon:last", $chatrooms_popups[chatroomid]).show();
			var regex = new RegExp('(^|\\s)(@' + u_name + ')(\\s|$)', 'i');
			message = message.replace(regex, '$1<span class="arrowchat_at_user">$2</span>$3');
			if (a("#arrowchat_chatroom_message_" + id).length > 0) {
				a("#arrowchat_chatroom_message_" + id + " .arrowchat_chatroom_msg").html(message);
				if (userid == u_id) {
					a("#arrowchat_chatroom_message_" + id).addClass(l);
				}
			} else {
				var tooltip = formatTimestamp(time, 1);
				if (global == 1) {
					a("<div/>").attr("id", "arrowchat_chatroom_message_" + id).addClass("arrowchat_chatroom_box_message").addClass("arrowchat_global_chatroom_message").html('<div class="arrowchat_chatroom_message_content">' + formatTimestamp(time) + message + "</div>").appendTo(a(".arrowchat_tabcontenttext", $chatrooms_popups[chatroomid]));
					receiveChatroom();
				} else {
					var noAvatarColor = getRandomColor(name);
					a("<div/>").attr("id", "arrowchat_chatroom_message_" + id).addClass(important).addClass(image_msg).addClass(l).addClass("arrowchat_chatroom_box_message").html('<div class="arrowchat_chatroom_message_name"><i class="' + title + '"></i>' + name + '</div><div class="arrowchat_chatroom_msg_wrap"><div class="arrowchat_chatbox_avatar_wrapper arrowchat_white_background" style="background-color:' + noAvatarColor["color"] + '"><img class="arrowchat_chatroom_message_avatar arrowchat_no_names" src="'+image+'" alt="' + name + '" /><span class="arrowchat_tab_letter arrowchat_tab_letter_xsmall">' + noAvatarColor["character"] + '</span></div><div class="arrowchat_chatroom_message_content" data-id="' + tooltip + '"><span class="arrowchat_chatroom_msg">' + message + '</span></div><div class="arrowchat_message_controls"><div class="arrowchat_chatroom_reply"><i class="fas fa-reply"></i></div><div class="arrowchat_chatroom_delete" data-id="' +  id + '"><i class="far fa-xmark"></i></div></div></div>').appendTo(a(".arrowchat_tabcontenttext", $chatrooms_popups[chatroomid]));
				}
				if (c_disable_avatars == 1 || a("#arrowchat_setting_names_only :input").is(":checked")) {
					setAvatarVisibility(1);
				}
				if (container <= container2) {
					a(".arrowchat_tabcontenttext", $chatrooms_popups[chatroomid]).scrollTop(5E4);
					a(".arrowchat_image_msg img,.arrowchat_emoji_text img").one("load", function() {
						setTimeout(function () {
							a(".arrowchat_tabcontenttext", $chatrooms_popups[chatroomid]).scrollTop(5E4);
						}, 500);
					}).each(function() {
					  if(this.complete) a(this).trigger('load');
					});
				} else {
					displayMessage(a(".arrowchat_message_box", $chatrooms_popups[chatroomid]), lang[134], "notice");
				}
				showChatroomTime();
				modDeleteControls(chatroomid);
			}
		}
		
		function chatroomAlerts(nw_count, from) {
			if (typeof($chatrooms[from]) != "undefined") {
				if ($chatrooms[from].hasClass("arrowchat_tabclick")) {
					return false;
				}
				if (a(".arrowchat_tabalert", $chatrooms[from]).length > 0) {
					nw_count = parseInt(a(".arrowchat_tabalert", $chatrooms[from]).html()) + parseInt(nw_count);
				}
				if (nw_count == 0) {
					$chatrooms[from].removeClass("arrowchat_tab_new_message");
					a(".arrowchat_tabalert", $chatrooms[from]).remove()
				} else {
					if (a(".arrowchat_tabalert", $chatrooms[from]).length > 0) {
						a(".arrowchat_tabalert", $chatrooms[from]).html(nw_count);
					} else a("<div/>").addClass("arrowchat_tabalert").html(nw_count).appendTo($chatrooms[from]);
					$chatrooms[from].removeClass("arrowchat_tab_new_message").addClass("arrowchat_tab_new_message")
				}	

				adjustSizes();
			}
		}
		
		function receiveAnnouncement(h) {
			if (h.read == 0 && h.data != "") {
				a("#arrowchat_announcement").remove();
				$body.append(ArrowChat.Templates.announcements_display(h));
				if (a("#arrowchat_warnings").length) {
					var nb = parseInt(a(window).height() - a("#arrowchat_warnings").position().top);
					a("#arrowchat_announcement").css("bottom", nb + 5 + "px");
				}
				a("#arrowchat_announcement .arrowchat_announce_close").click(function () {
					a("#arrowchat_announcement").remove();
					if (a("#arrowchat_warnings").length)
						var bottom_num = parseInt(a("#arrowchat_mobiletab").outerHeight() + parseInt(a("#arrowchat_mobiletab").css("bottom")) + 3);
						a("#arrowchat_warnings").css("bottom", bottom_num + "px");
					a.post(c_ac_path + "includes/json/send/send_settings.php", {
						announce: 1
					}, function () {});
				});
			} else {
				a("#arrowchat_announcement").remove();
			}
		}
		
		function addNotification(alert_id, markup) {
			a("<div/>").attr("id", "arrowchat_alert_" + alert_id).attr("class", "arrowchat_notification_message_div").html(markup).appendTo(a("#arrowchat_notifications_content"));
			a(".arrowchat_notifications_divider").removeClass("arrowchat_notifications_divider_last");
			a("#arrowchat_notifications_content div:last-child .arrowchat_notifications_divider").addClass("arrowchat_notifications_divider_last");
			Q++;
		}
		
		function notificationAlerts(markup) {
			if (a("#arrowchat_bell_flyout").hasClass("arrowchat_bell_flyout_display")) {
			} else {
				var na_count = parseInt(a(".arrowchat_mobiletab_new_count").html()) + Q;
				a(".arrowchat_mobiletab_new_count").html(na_count);
				a("#arrowchat_mobiletab_new").show();
				a("#arrowchat_bell_notification").show().html(Q);
			}

			if (Q > 0) {
				a("#arrowchat_no_new_notifications").css("display", "none");
			}
		}
		
		function stripslashes(str) {
			str=str.replace(/\\'/g,'\'');
			str=str.replace(/\\"/g,'"');
			str=str.replace(/\\0/g,'\0');
			str=str.replace(/\\\\/g,'\\');
			return str;
		}
		
		function notifyNewMessage(from, nw_count) {
			if (uc_name[from] == null || uc_name[from] == "") setTimeout(function () {
				notifyNewMessage(from, nw_count)
			}, 500);
			else {
				if (typeof($users[from]) != "undefined") {
					if ($users[from].hasClass("arrowchat_tabclick")) {
						return false;
					}
					if (a(".arrowchat_tabalert", $users[from]).length > 0) {
						nw_count = parseInt(a(".arrowchat_tabalert", $users[from]).html()) + parseInt(nw_count);
					}
					if (nw_count == 0) {
						$users[from].removeClass("arrowchat_tab_new_message");
						a(".arrowchat_tabalert", $users[from]).remove()
					} else {
						if (a(".arrowchat_tabalert", $users[from]).length > 0) {
							a(".arrowchat_tabalert", $users[from]).html(nw_count);
						} else a("<div/>").addClass("arrowchat_tabalert").html(nw_count).appendTo($users[from]);
						$users[from].removeClass("arrowchat_tab_new_message").addClass("arrowchat_tab_new_message")
					}
					y[from] = nw_count;	
				}	
			}
			adjustSizes();
		}
		
		function receiveMessage(id, from, message, sent, self, old, multi_tab, pending_msg) {
			if (pending_msg == 0 && self == 1 && multi_tab == 0) {
				return false;
			}
			aa[from] != 1 && receiveUser(from, uc_name[from], uc_status[from], uc_avatar[from], uc_link[from], 1, 1);
			if (pending_msg == 0 && self != 1 && c_push_engine != 1) {
				var data_array = [id, from, message, sent, self, old];
				acsi > 2 && lsClick(JSON.stringify(data_array), 'private_message');
			}
			clearTimeout(dtit3);
			document.title = dtit;
			if (uc_name[from] == null || uc_name[from] == "") setTimeout(function () {
				receiveMessage(id, from, message, sent, self, old, multi_tab, pending_msg)
			}, 500);
			else {
				lsClick(from, 'untyping');
				receiveNotTyping(from);
				var container = a(".arrowchat_tabcontenttext", $user_popups[from])[0].scrollHeight - a(".arrowchat_tabcontenttext", $user_popups[from]).scrollTop() - 10;
				var container2 = a(".arrowchat_tabcontenttext", $user_popups[from]).outerHeight();
				var o = uc_name[from];
				if (uc_status[from] == "offline" && self != 1) {
					const unixTime = Math.floor(Date.now() / 1000);
					if ((unixTime - sent) < 10) {
						loadBuddyList();
					}
				}
				f = "";
				if (self == 1) {
					fromname = u_name;
					fromid = u_id;
					f = " arrowchat_self";
					avatar = u_avatar;
					var pending_icon = "<div class='arrowchat_pending_icon'></div>";
					if (multi_tab == 1) {
						pending_icon = "<div class='arrowchat_pending_icon arrowchat_pending_delivered'></div>";
					}
				} else {
					DTitChange(uc_name[from]);
					fromname = o;
					fromid = from;
					avatar = uc_avatar[from];
					var pending_icon = "";
					
					a(".arrowchat_pending_icon:not(.arrowchat_pending_error)", $user_popups[from]).hide();
					a(".arrowchat_tabcontenttext div .arrowchat_pending_icon:last", $user_popups[from]).show();
				}
				var pending_class = "";
				var pending_class_id = "";
				if (pending_msg != 0) {
					pending_class = " arrowchat_pending_msg";
					pending_class_id = ' arrowchat_pending_msg_' + pending_msg;
				}
				tooltip = formatTimestamp(new Date(sent * 1E3), 1);
				var image_msg = "";
				var show_time_class = "";
				message = stripslashes(message);
				if (multi_tab == 1) {
					message = youTubeEmbed(message);
				}
				message = replaceURLWithHTMLLinks(message);
				if (multi_tab == 1) {
					message = smileyreplace(message);
				}
				if (message.substr(0, 4) == "<div") {
					image_msg = " arrowchat_image_msg";
				}
				if (last_sent[from] == null || sent - last_sent[from] > 180) {
					show_time_class = " arrowchat_show_time";
				}
				if (a("#arrowchat_message_" + id).length > 0 && pending_msg == 0) {
					a("#arrowchat_message_" + id + " .arrowchat_chatboxmessagecontent").html(message);
				} else {
					if (c_show_full_name != 1) {
						if (fromname.indexOf(" ") != -1) fromname = fromname.slice(0, fromname.indexOf(" "));
					}
					if (id != 0) {
						var id_element = ' id="arrowchat_message_' + id + '" ';
					} else {
						var id_element = "";
					}
					var noAvatarColor = getRandomColor(fromname);
					a(".arrowchat_tabcontenttext", $user_popups[from]).append('<div class="arrowchat_chatboxmessage arrowchat_clearfix' + f + image_msg + show_time_class + pending_class + pending_class_id + '" ' + id_element + '>' + formatTimestamp(new Date(sent * 1E3)) + '<div class="arrowchat_chatboxmessagefrom arrowchat_white_background" style="background-color:' + noAvatarColor["color"] + '"><span class="arrowchat_tab_letter arrowchat_tab_letter_xsmall">' + noAvatarColor["character"] + '</span><img alt="' + fromname + '" class="arrowchat_chatbox_avatar" src="' + avatar + '" /></div><div class="arrowchat_chatboxmessage_wrapper"><div class="arrowchat_chatboxmessagecontent" data-id="' + tooltip + '">' + message + '</div></div>' + pending_icon + '</div>');
					if (a("#arrowchat_message_" + last_id[from]).length && self != 1) {
						a("#arrowchat_message_" + last_id[from]).children('.arrowchat_chatboxmessagefrom').addClass('arrowchat_single_avatar_hide');
					}
					
					last_sent[from] = sent;
					last_name[from] = fromid;
					
					if (pending_msg == 0) {
						last_id[from] = id;
					}

					if (c_disable_avatars == 1 || a("#arrowchat_setting_names_only :input").is(":checked")) {
						setAvatarVisibility(1);
					}
					showTimeAndTooltip();
				}
				if (container <= container2 || !$users[from].hasClass("arrowchat_tabclick")) {
					a(".arrowchat_tabcontenttext", $user_popups[from]).scrollTop(5E4);
					a(".arrowchat_image_msg img,.arrowchat_emoji_text img").one("load", function() {
						setTimeout(function () {
							a(".arrowchat_tabcontenttext", $user_popups[from]).scrollTop(5E4);
						}, 500);
					}).each(function() {
					  if(this.complete) a(this).trigger('load');
					});
				} else {
					displayMessage(a(".arrowchat_message_box", $user_popups[from]), lang[134], "notice");
				}
				
				notifyNewMessage(from, 1);
			}
		}
		
		function receiveTyping(id) {
			if (typeof($users[id]) != "undefined") {
				var container = a(".arrowchat_tabcontenttext", $user_popups[id])[0].scrollHeight - a(".arrowchat_tabcontenttext", $user_popups[id]).scrollTop() - 10;
				var container2 = a(".arrowchat_tabcontenttext", $user_popups[id]).outerHeight();
				a(".arrowchat_is_typing", $users[id]).show();
				if (a("#arrowchat_typing_message_" + id, $user_popups[id]).length) {
					a("#arrowchat_typing_message_" + id, $user_popups[id]).remove();
				}
				var noAvatarColor = getRandomColor(uc_name[id]);
				a(".arrowchat_tabcontenttext", $user_popups[id]).append('<div class="arrowchat_chatboxmessage arrowchat_clearfix" id="arrowchat_typing_message_' + id + '"><div class="arrowchat_chatboxmessagefrom arrowchat_white_background" style="background-color:' + noAvatarColor["color"] + '"><span class="arrowchat_tab_letter arrowchat_tab_letter_xsmall">' + noAvatarColor["character"] + '</span><img alt="" class="arrowchat_chatbox_avatar" src="' + uc_avatar[id] + '" /></div><div class="arrowchat_chatboxmessage_wrapper"><div class="arrowchat_chatboxmessagecontent" data-id="Typing"><div class="arrowchat_is_typing arrowchat_is_typing_chat"><div class="arrowchat_typing_bubble"></div><div class="arrowchat_typing_bubble"></div><div class="arrowchat_typing_bubble"></div></div></div></div></div>');
				if (c_disable_avatars == 1 || a("#arrowchat_setting_names_only :input").is(":checked")) {
					setAvatarVisibility(1);
				}
				if (container <= container2 || !$users[id].hasClass("arrowchat_tabclick")) {
					a(".arrowchat_tabcontenttext", $user_popups[id]).scrollTop(5E4);
				}
				clearTimeout(typingTimeout);
				typingTimeout = setTimeout(function () {
					lsClick(id, 'untyping');
					receiveNotTyping(id)
				}, 30000);
			}
		}
		
		function receiveNotTyping(id) {
			if (typeof($users[id]) != "undefined") {
				clearTimeout(typingTimeout);
				if (a("#arrowchat_typing_message_" + id, $user_popups[id]).length) {
					a("#arrowchat_typing_message_" + id, $user_popups[id]).remove();
				}
				a(".arrowchat_is_typing", $users[id]).hide();
			}
		}
		
		function pushCancelAll() {
			if (c_push_engine == 1) {
				push_uid.unsubscribe();
				push_arrowchat.unsubscribe();
				if (Object.keys(chatroom_list).length > 0) {
					a.each(chatroom_list, function(index, value) {
						push_room[value].unsubscribe();
					});
				}
			}
		}
		
		function pushSubscribe() {
			if (c_push_engine == 1) {
				push_uid = push.subscribe(c_push_encrypt + "_u"+u_id);
				push_arrowchat = push.subscribe(c_push_encrypt + "_arrowchat");
		
				push_arrowchat.on('data', function (data) {
					pushReceive(data);
				});
				push_uid.on('data', function (data) {
					pushReceive(data);
				});
			}
		}
		
		function pushReceive(data) {
			if ("announcement" in data) {
				receiveAnnouncement(data.announcement);
			}
			if ("warning" in data) {
				receiveWarning(data.warning);
			}
			if ("notification" in data) {
				var markup2;
				addNotification(data.notification.alert_id, data.notification.markup);
				notificationAlerts(markup2);
			}
			if ("chatroommessage" in data) {
				if (typeof(blockList[data.chatroommessage.userid]) == "undefined")
				{
					addChatroomMessage(data.chatroommessage.id, data.chatroommessage.name, data.chatroommessage.message, data.chatroommessage.userid, data.chatroommessage.sent, data.chatroommessage.global, data.chatroommessage.mod, data.chatroommessage.admin, data.chatroommessage.chatroomid);
					var data_array = [data.chatroommessage.id, data.chatroommessage.name, data.chatroommessage.message, data.chatroommessage.userid, data.chatroommessage.sent, data.chatroommessage.global, data.chatroommessage.mod, data.chatroommessage.admin, data.chatroommessage.chatroomid];
					lsClick(JSON.stringify(data_array), 'chatroom_message');
					if (data.chatroommessage.name != 'Delete' && data.chatroommessage.global != 1) {
						chatroomAlerts(1, data.chatroommessage.chatroomid);
						var data_array = [1, data.chatroommessage.chatroomid];
						lsClick(JSON.stringify(data_array), 'chatroom_alerts');
						if (data.chatroommessage.userid != u_id) {
							u_chatroom_sound == 1 && !a(".arrowchat_chatroom_message_input").is(":focus") && playNewMessageSound();
						}
					}
				}
			}
			if ("typing" in data) {
				lsClick(data.typing.id, 'typing');
				receiveTyping(data.typing.id);
			}
			if ("nottyping" in data) {
				lsClick(data.nottyping.id, 'untyping');
				receiveNotTyping(data.nottyping.id);
			}
			if ("messages" in data) {
				receiveMessage(data.messages.id, data.messages.from, data.messages.message, data.messages.sent, data.messages.self, data.messages.old, 0, 0);
				data.messages.self != 1 && u_sounds == 1 && !a(".arrowchat_textarea", $user_popups[data.messages.from]).is(":focus") && playNewMessageSound();
				showTimeAndTooltip();
				K = 1;
				D = E;
			}
			if ("chatroomban" in data) {									
				a(".arrowchat_closebox_bottom", $chatroos[data.chatroomban.id]).click();
				displayMessage(a("#arrowchat_chatroom_message_flyout"), data.chatroomban.error2, "error");
			}
		}

		function DTitChange(name) {
			name = renderHTMLString(name);
			if (dtit2 != 2) {
				document.title = lang[30] + " " + name + "!";
				dtit2 = 2
			} else {
				document.title = dtit;
				dtit2 = 1
			}
			if (window_focus == false) {
				dtit3 = setTimeout(function () {
					DTitChange(name)
				}, 1000)
			} else {
				document.title = dtit;
				clearTimeout(dtit3);
				setTimeout(function(){lsClick("body", 'window_focus')},500);
			}
		}
		
		function changePushChannel(id, connect) {
			if (connect == 1) {
				if (c_push_engine == 1) {
					push_room[id] = push.subscribe(c_push_encrypt + "_chatroom" + id);
					push_room[id].on('data', function (data) {
						pushReceive(data);
					});
				}
				chatroom_list[id] = id;
			} else {
				if (c_push_engine == 1 && typeof(push_room[id]) != "undefined") {
					push_room[id].unsubscribe();
				}
				if (typeof(chatroom_list[id]) != "undefined") {
					delete chatroom_list[id];
				}
			}
		}
		
		function lsClick(id, action, acvar) {
			if (lsreceive == 0) {
				var milliseconds = new Date().getTime();
				if (action == "ac_openclose") {
					if (typeof(acvar) == "undefined") {
						if (a(id).hasClass("arrowchat_tabclick"))
							localStorage.setItem("ac_close", id + "/" + milliseconds);
						else
							localStorage.setItem("ac_open", id + "/" + milliseconds);
					} else {
						eval("var temp=$"+acvar+";");
						if (id == " ") {
							if (temp.hasClass("arrowchat_tabclick"))
								localStorage.setItem("ac_close", id + "," + acvar + "/" + milliseconds);
							else
								localStorage.setItem("ac_open", id + "," + acvar + "/" + milliseconds);
						} else {
							if (a(id, acvar).hasClass("arrowchat_tabclick"))
								localStorage.setItem("ac_close", id + "," + acvar + "/" + milliseconds);
							else
								localStorage.setItem("ac_open", id + "," + acvar + "/" + milliseconds);
						}
					}
				} else if (action == "private_message" || action == "chatroom_message" || action == "chatroom_alerts" || action == "send_chatroom_message") {
					if (!msieversion()) {
						localStorage.setItem(action, id + "/##-" + milliseconds);
					}
				} else {
					if (!msieversion()) {
						if (typeof(acvar) == "undefined") {
							localStorage.setItem(action, id + "/" + milliseconds);
						} else
							localStorage.setItem(action, id + "," + acvar + "/" + milliseconds);
					}
				}
			}
		}
		
		function msieversion() {
			var ua = window.navigator.userAgent;
			var msie = ua.indexOf("MSIE ");
			if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
				return true;

		   return false;
		}
		
		function localStorageFired(e) {
			lsreceive = 1;
			if (e.key == 'ac_open' || e.key == 'ac_close' || e.key == 'ac_click') {
				var res = e.newValue.split("/");
				var res2 = res[0].split(",");
				if (typeof(res2[1]) == "undefined") {
					if (e.key == 'ac_click')
						a(res2[0]).click();
					else if (!a(res2[0]).hasClass("arrowchat_tabclick") && e.key == 'ac_open')
						a(res2[0]).click();
					else if (a(res2[0]).hasClass("arrowchat_tabclick") && e.key == 'ac_close')
						a(res2[0]).click();
				} else {
					eval("var temp=$"+res2[1]+";");
					if (res2[0] == " ") {
						if (typeof(temp) != "undefined" && e.key == 'ac_click')
							temp.click();
						else if (typeof(temp) != "undefined" && !temp.hasClass("arrowchat_tabclick") && e.key == 'ac_open')
							temp.click();
						else if (typeof(temp) != "undefined" && temp.hasClass("arrowchat_tabclick") && e.key == 'ac_close')
							temp.click();
					} else {
						if (a(res2[0], temp).length && e.key == 'ac_click')
							a(res2[0], temp).click();
						else if (a(res2[0], temp).length && !a(res2[0], temp).hasClass("arrowchat_tabclick") && e.key == 'ac_open')
							a(res2[0], temp).click();
						else if (a(res2[0], temp).length && a(res2[0], temp).hasClass("arrowchat_tabclick") && e.key == 'ac_close')
							a(res2[0], temp).click();
					}
				}
			}
			if (e.key == 'window_focus') {
				clearTimeout(dtit3);
				document.title = dtit;
			}
			if (e.key == 'private_message') {
				var res = e.newValue.split("/##-");
				var data = JSON.parse(res[0]);
				receiveMessage(data[0], data[1], data[2], data[3], data[4], 1, 1, 0);
			}
			if (e.key == 'open_chatroom') {
				var res = e.newValue.split("/");
				loadChatroom(res[0], "");
			}
			if (e.key == 'send_chatroom_message') {
				var res = e.newValue.split("/##-");
				var data = JSON.parse(res[0]);
				var tester = data[3];
				if (tester.substring(0, 3) == "cr-")
					tester = tester.substr(3);
				addMessageToChatroom(data[0], data[1], data[2], 1, tester, 0);
				a(".arrowchat_tabcontenttext", $chatrooms_popups[tester]).scrollTop(a(".arrowchat_tabcontenttext", $chatrooms_popups[tester])[0].scrollHeight);
				a(".arrowchat_image_msg img,.arrowchat_emoji_text img").one("load", function() {
				  a(".arrowchat_tabcontenttext", $chatrooms_popups[tester]).scrollTop(5E4);
				}).each(function() {
				  if(this.complete) a(this).trigger('load');
				});
			}
			if (c_push_engine != 1) {
				if (e.key == 'untyping') {
					var res = e.newValue.split("/");
					receiveNotTyping(res[0]);
				}
				if (e.key == 'typing') {
					var res = e.newValue.split("/");
					receiveTyping(res[0]);
				}
				if (e.key == 'chatroom_message') {
					var res = e.newValue.split("/##-");
					var data = JSON.parse(res[0]);
					var tester = data[8];
					if (tester.substring(0, 3) == "cr-")
						tester = tester.substr(3);
					addChatroomMessage(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], tester);
				}
				if (e.key == 'chatroom_alerts') {
					var res = e.newValue.split("/##-");
					var data = JSON.parse(res[0]);
					var tester = data[1];
					if (tester.substring(0, 3) == "cr-")
						tester = tester.substr(3);
					chatroomAlerts(data[0], tester);
				}
			}
			lsreceive = 0;
		}

		function runarrowchat() {
			a.ajax({					
				url: c_ac_path + "includes/json/receive/receive_init.php",
				cache: false,
				type: "get",
				dataType: "json",
				success: function (b) {}
			});
			if (!Modernizr.emoji2) {
				c_disable_smilies = 1;
			}
			$base = a("<div/>").attr("id", "arrowchat_base").appendTo($body);
			window.addEventListener('storage', localStorageFired, false);
			if (c_push_engine == 1) {
				push = new Scaledrone(c_push_publish);
			}
			if (c_chat_maintenance != 0 || c_db_connection == 1 || (c_guests_login_msg != 0 && u_id == "")) {				
				buildMaintenance();
			} else {
				buildBuddyListTab();
				if (c_chatrooms != 0) {
					buildChatroomsButton();
				} else {
					a("#arrowchat_room_selection").hide();
				}
				buildOptionsButton();
				u_is_mod == 1 && c_enable_moderation == 1 && buildModButton();
				buildUnseenUsers();
			}
			a('.arrowchat_powered_by').each(function(){this.style.setProperty('display','block','important');});
			if (acp.search(/arrowchat/i) == -1 || (!a('.arrowchat_powered_by')[0] && !a('#arrowchat_maintenance')[0]) || a('.arrowchat_powered_by').html() == "" || a('.arrowchat_powered_by').not(':contains("ArrowChat")').html()) {
				console.log("bfd");
				a('#arrowchat_base').hide();
				return false;
			}
			if (c_online_list == 0) {
				a("#arrowchat_buddy_list_tab").hide();
				a("#arrowchat_closed_windows").addClass("arrowchat_online_list_hidden");
			}

			$body.append('<div id="arrowchat_sound_player_holder"></div>');			
			a(window).bind("resize", adjustSizes);
			a(window).on('resize', function(){
				clearTimeout(windowresize_timeout);
				windowresize_timeout = setTimeout(function () {
					adjustSizes();
				}, 500);
			});
			set("buddylist", "1");
			set("initialize", "1");
			set("currenttime", ab);
			a(window).focus(function() {
				window_focus = true;
				lsClick("body", 'window_focus');
			}).blur(function() {
				window_focus = false;
			});
			if (typeof document.body.style.maxHeight === "undefined") {
				W = true;
				$base.css("position", "absolute");
				$tooltip.css("position", "absolute");
				$userstab_popup.css("position", "absolute");
			}
			if (u_status == "offline") {
				w = 1;
				clearUserStatus();
				a("#arrowchat_mobiletab").addClass("arrowchat_mobiletab_offline");
				$buddy_list_tab.removeClass("arrowchat_tabclick").removeClass("arrowchat_userstabclick");
				$userstab_popup.removeClass("arrowchat_tabopen");
				$open_windows.hide();
				$closed_windows.hide();
				a.idleTimer("destroy");
			} else if (c_chat_maintenance != 1 && c_db_connection != 1 && u_id != "") {
				if (c_push_engine == 1) {
					pushSubscribe();
				}
				var chatrooms_exist = false;
				for (var d = 0; d < focus_chat.length; d++) {
					if (typeof(focus_chat[d] != "undefined")) {
						if (focus_is_room[d] == "1") {
							if (c_chatrooms != 0) {
								init_open_room[focus_chat[d]] = 0;
								changePushChannel(focus_chat[d], 1);
								toggleUserChatTab(focus_chat[d], "0", true, "");
								chatrooms_exist = true;
							}
						} else {
							init_open[focus_chat[d]] = 0;
							receiveUser(focus_chat[d], uc_name[focus_chat[d]], uc_status[focus_chat[d]], uc_avatar[focus_chat[d]], uc_link[focus_chat[d]], "0");
						}
					}
				}
				for (var d = 0; d < unfocus_chat.length; d++) {
					if (typeof(unfocus_chat[d] != "undefined")) {
						if (unfocus_is_room[d] == "1") {
							if (c_chatrooms != 0) {
								changePushChannel(unfocus_chat[d], 1);
								toggleUserChatTab(unfocus_chat[d], "1", true, "");
								chatrooms_exist = true;
							}
						} else {
							receiveUser(unfocus_chat[d], uc_name[unfocus_chat[d]], uc_status[unfocus_chat[d]], uc_avatar[unfocus_chat[d]], uc_link[unfocus_chat[d]], "1");
						}
					}
				}
				if (chatrooms_exist) {
					receiveChatroom();
				}
				receiveCore();
				displayWelcome();
				a("#arrowchat_userslist_available").html('<div class="arrowchat_nofriends"><div class="arrowchat_loading_icon"></div></div>');
				if (u_blist_open == 1 && c_online_list != 0)
					$buddy_list_tab.click();
				else
					loadBuddyList();
			}
			adjustSizes();
			a('.arrowchat_powered_by').each(function(){this.style.setProperty('display','block','important');});
			ion.sound({
				sounds: [
					{
						name: "new_message"
					}
				],
				volume: 1.0,
				path: c_ac_path + "themes/" + u_theme + "/sounds/",
				preload: true
			});
		}

		function playNewMessageSound() {
			ion.sound.play("new_message");
		}
		
		function renderHTMLString(string) {
			var new_render = string;
			if (typeof(string) != "undefined") {
				var render = a("<div/>").attr("id", "arrowchat_render").html(string).appendTo('body');
				new_render = a("#arrowchat_render").html();
				render.remove();
			}
			return new_render;
		}
		
		var bounce2 = 1,
			bounce3 = 1,
			buddylisttest = 1,
			searchxhr,
			typingTimeout,
			lsreceive = 0,
			chatroom_mod = {},
			chatroom_admin = {},
			count = 0,
			V = {},
			dtit = document.title,
			dtit2 = 1,
			dtit3 = 1, 
			window_focus = true,
			xa = {},
			chatroom_list = {},
			j = "",
			$ = 0,
			w = 0,
			bli = 1,
			isAway = 0,
			W = false,
			Y, Z, E = 3E3,
			Crref2 = -1, 
			Ccr = -1,
			open_report = -1,
			message_timeout,
			windowresize_timeout,
			pending_msg_count = 0,
			pending_msg_room_count = 0,
			D = E,
			K = 1,
			R = 0,
			Ka = 0,
			y = {},
			G = {},
			aa = {},
			ca = {},
			init_open = {},
			init_open_room = {},
			room_history_loaded = {},
			last_id = {},
			last_sent = {},
			last_name = {},
			history_ids = {},
			push_room = {},
			push_uid,
			push_arrowchat,
			room_desc = [],
			room_limit_msg = [],
			room_limit_sec = [],
			visibleTab = [],
			Aa = new Date,
			Na = Aa.getDate(),
			ab = Math.floor(Aa.getTime() / 1E3),
			acsi = 1,
			Q = 0,			
			fa = -1,
			acp = "Powered By <a href='http://www.arrowchat.com/' target='_blank'>ArrowChat</a>",
			pa = 0,
			B, 
			orig_txt_size = 32,
			push,
			session_var = '',
			onlineNumber = 0,
			errorCount = 0,
			premade_smiley = [],
			N;
		premade_smiley[0] = [':)','&#x1F642;'];
		premade_smiley[1] = [':-)','&#x1F642;'];
		premade_smiley[2] = ['=)','&#x1F642;'];
		premade_smiley[3] = [':p','&#x1F61B;'];
		premade_smiley[4] = [':o','&#x1F62E;'];
		premade_smiley[5] = [':|','&#x1F610;'];
		premade_smiley[6] = [':(','&#x2639;&#xFE0F;'];
		premade_smiley[7] = ['=(','&#x2639;&#xFE0F;'];
		premade_smiley[8] = [':D','&#x1F603;'];
		premade_smiley[9] = ['=D','&#x1F603;'];
		premade_smiley[10] = [':/','&#x1F615;'];
		premade_smiley[11] = ['=/','&#x1F615;'];
		premade_smiley[12] = [';)','&#x1F609;'];
		premade_smiley[13] = [':\'(','&#x1F622;'];
		premade_smiley[14] = ['<3','&#x2764;&#xFE0F;'];
		premade_smiley[15] = ['>:(','&#x1F621;'];
		a.ajaxSetup({
			scriptCharset: "utf-8",
			cache: false,
			global: false
		});
		a.expr[":"].icontains = function (b, c, d) {
			return (b.textContent || b.innerText || jqac(b).text() || "").toLowerCase().indexOf(d[3].toLowerCase()) >= 0
		};
		arguments.callee.videoWith = function (b) {
			if (c_video_select == 4) {
				var win = window.open('https://meet.jit.si/' + b, 'audiovideochat', "status=no,toolbar=no,menubar=no,directories=no,resizable=no,location=no,scrollbars=no,width="+c_video_width+",height="+c_video_height+"");
			} else if (c_video_select == 1) {
				var win = window.open('https://meet.jit.si/' + b, 'audiovideochat', "status=no,toolbar=no,menubar=no,directories=no,resizable=no,location=no,scrollbars=no,width="+c_video_width+",height="+c_video_height+"");
			} else {
				var win = window.open(c_ac_path + 'public/video/?rid=' + b, 'audiovideochat', "status=no,toolbar=no,menubar=no,directories=no,resizable=no,location=no,scrollbars=no,width="+c_video_width+",height="+c_video_height+"");
			}
			win.focus();
		};
		arguments.callee.runarrowchat = runarrowchat;

		arguments.callee.chatroom = function (b) {
			loadChatroom(b, "");
		};
		arguments.callee.chatWith = function (b) {
			receiveUser(b, uc_name[b], uc_status[b], uc_avatar[b], uc_link[b])
		};
		arguments.callee.getUser = function (b, c) {
			a.ajax({
				url: c_ac_path + "includes/json/receive/receive_user.php",
				data: {
					userid: b
				},
				type: "post",
				cache: false,
				dataType: "json",
				success: function (o) {
					if (o) {
						window[c](o);
					} else {
						window[c](0);
					}
				}
			});
		};
		arguments.callee.sendMessage = function (b, c) {
			c != "" && a.post(c_ac_path + "includes/json/send/send_message.php", {
				to: b,
				message: c
			}, function (d) {
				if (d) {
					if (!a.isNumeric(d)) {
						a.each(d, function (i, q) {
							if (i == "error") {
								a.each(q, function (l, f) {
									displayMessage(a(".arrowchat_message_box", $user_popups[b]), f.m, "error");
								});
							}
						});
					} else {
						addMessageToChatbox(b, c, 1, 1, d, 1, 1);
					}
					a(".arrowchat_tabcontenttext", $user_popups[b]).scrollTop(a(".arrowchat_tabcontenttext", $user_popups[b])[0].scrollHeight)
				}
				K = 1;
			})
		};
		arguments.callee.getBaseUrl = function () {
			return k
		};
		arguments.callee.logout = function () {
			clearTimeout(Z);
			clearTimeout(Crref2);
			Crref2 = -1;
			a.idleTimer("destroy");
			pushCancelAll();
			cancelJSONP();
			c_guests_login_msg = 1;			
			u_id = "";
			a("#arrowchat_buddy_list_tab").remove();
			$open_windows.remove();
			$closed_windows.remove();
			buildMaintenance();
		};
	}
})(jqac);

jqac(document).ready(function () {
	if (u_logged_in != 1 && c_disable_arrowchat != 1) {
		jqac.arrowchat();
		jqac.arrowchat.runarrowchat();
	}
});
