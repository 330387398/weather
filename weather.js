
//页面左上自动更新时间功能
setTime()
setInterval(setTime, 1000)
function setTime() {
	let $hour = $('.header > div > div > p:nth-of-type(1)'),
		$minute = $('.header > div > div > p:nth-of-type(2)'),
		$m = $('.header > div > div > span'),
		$hourNow = new Date().getHours(),
		$minuteNow = new Date().getMinutes()
	if ($hourNow < 10) {
		$hour.html('0' + $hourNow)
	}else {
		$hour.html($hourNow)
	}
	if ($minuteNow < 10) {
		$minute.html('0' + $minuteNow)
	}else {
		$minute.html($minuteNow)
	}
	if ($hourNow > 11) {
		$m.html('pm')
	}else {
		$m.html('am')
	}
}


$.ajax(`https://weixin.jirengu.com/weather`).done((data) => {
	//获取当前地理位置并插入页面
	$('.header > div > p').html(data.weather[0]['city_name'])
	//获取并插入未来一周的天气情况
	let $date = $('.footer > ol > li > .date'),
		$weather = $('.footer > ol > li > .weather'),
		$temperature = $('.footer > ol > li > .temperature')
	for (let i=0; i<$date.length; i++) {
		//按星期插入对应的日期
		let a = data.weather[0]['future'][i + 1]['day']
		function date() {
			if (a == '周一') {
				return 'MON'
			}else if (a == '周二') {
				return 'TUE'
			}else if (a == '周三') {
				return 'WED'
			}else if (a == '周四') {
				return 'THU'
			}else if (a == '周五') {
				return 'FRI'
			}else if (a == '周六') {
				return 'SAT'
			}else {
				return 'SUN'
			}
		}
		$date.eq(i).html(date())
		//插入当日天气情况的对应图片
		let b = data.weather[0]['future'][i + 1]['code1']
		$weather.eq(i).attr('src', 'https://weixin.jirengu.com/images/weather/code/' + b + '.png')
		//插入当日的平均气温（最高温与最低温的平均值取整）
		let c = parseInt((parseInt(data.weather[0]['future'][i + 1]['high']) + parseInt(data.weather[0]['future'][i + 1]['low']))/2)
		$temperature.eq(i).html(c + '&nbsp;℃')
	}
	//获取并插入实时天气状况
	let $p = $('.footer > ol > li:first-child > div:first-child > div:first-child > p')
	//当前星期
	let d = data.weather[0]['future'][0]['day']
	function dateNow() {
		if (d == '周一') {
			return 'MONDAY'
		}else if (d == '周二') {
			return 'TUESDAY'
		}else if (d == '周三') {
			return 'WEDNESDAY'
		}else if (d == '周四') {
			return 'THURSDAY'
		}else if (d == '周五') {
			return 'FRIDAY'
		}else if (d == '周六') {
			return 'SATURDAY'
		}else {
			return 'SUNDAY'
		}
	}
	$p.eq(0).html(dateNow())
	//当前日期
	let $dateNow = new Date().getDate()
	if ($dateNow < 10) {
		$p.eq(1).html('0' + $dateNow)
	}else {
		$p.eq(1).html($dateNow)
	}
	if ($dateNow == 1) {
		$p.eq(0).html('st')
	}else if ($dateNow == 2) {
		$p.eq(0).html('nd')
	}else if ($dateNow == 3) {
		$p.eq(0).html('rd')
	}
	//当前天气状况
	$('.footer > ol > li:first-child > div:first-child > img').attr('src', 'https://weixin.jirengu.com/images/weather/code/' + data.weather[0]['now']['code'] + '.png')
	$('.footer > ol > li:first-child > div:nth-child(2) > h1 > p:first-child').html(data.weather[0]['now']['temperature'])
	$('.footer > ol > li:first-child > div:nth-child(2) > span > p:first-child').html(data.weather[0]['now']['text'])
	$('.footer > ol > li:first-child > div:nth-child(2) > span > p:nth-child(2)').html(data.weather[0]['now']['wind_scale'])
	$('.footer > ol > li:first-child > div:nth-child(2) > h4 > p').html(data.weather[0]['now']['air_quality']['city']['quality'])
	$('.main').css('display', 'block')
})
