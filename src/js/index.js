/**
 * Author: liushaozong
 * Date: 2017/7/13
 * Time: 11:18
 * Description:Description
 */

import { goToMobile, videoPlay } from '../../libs/js/util'
let Url = 'http://opm.8864.com'
let UrlImg = 'http://opm.8864.com'
$(function () {
    // 新闻列表页
    getArticleList('199,517,519,521', 1)
    $(document).on('mouseenter', '#newsNav a', function () {
        getArticleList($(this).data('column'), 1)

        let $ele = $('#newsNav a')
        $ele.removeClass('active')
        $(this).addClass('active')
    })
    function getArticleList (columnId, pageNum) {
        $.ajax({// 首页新闻列表
            type: 'GET',
            url: Url + '/api/website/getallcolumncontent',
            data: {
                column_id: columnId,
                type: 'article',
                page: pageNum,
                pageSize: 5
            },
            dataType: 'jsonp',
            success: function (data) {
                let list = ''
                $.each(data.data.data, function (i, d) {
                    let columnName = ''
                    switch (d.column_id) {
                        case 199:
                            columnName = '新闻'
                            break
                        case 517:
                            columnName = '活动'
                            break
                        case 519:
                            columnName = '公告'
                            break
                        case 521:
                            columnName = '攻略'
                            break
                    }
                    let newTime = d.create_time.split(' ')[0].split('-')
                    let arrTime = newTime[1] + '/' + newTime[2]
                    list += '<li>' +
                        '<a target="_blank" href="http://miyue.8864.com/miyue-pc/detail.html?column_id=' + d.column_id + '&id=' + d.id + '">' +
                        '<span>[' + columnName + ']</span>' + d.title + '</a>' +
                        '<time>' + arrTime + '</time>' +
                        '</li>'
                })
                $('#newsListPage').html(list)
            }
        })
    }

    // 关闭弹窗
    $('.close').on('click', function () {
        $('.follow-img').hide()
        $('.shade').hide()
        $('.video-pop').hide()
    })

    // 右侧活动日记
    let contZH = 0
    for (let i = 0; i < $('.activity .cont').length; i++) {
        if (i > 0) {
            $('.activity .cont').eq(i).css(
                'top', contZH + 150
            )
        }
        let contH = $('.activity .cont').eq(i).height() + 35
        contZH += contH
        $('.activity .cont').eq(i).css('zIndex', 40 - i)
    }
    $('.activity-box').height(contZH + 160)

    let timer = null
    $('.cont-top .describe span').on('mouseover', function () {
        clearTimeout(timer)
        $(this).parent().parent().parent().next().children('.details').addClass('active')
    })
    $('.cont-top .describe span').on('mouseout', function () {
        clearTimeout(timer)
        let This = $(this)
        timer = setTimeout(function () {
            This.parent().parent().parent().next().children('.details').removeClass('active')
        }, 500)
    })
    $('.cont .cont-bottom').on('mouseover', function () {
        clearTimeout(timer)
    })
    $('.cont .cont-bottom').on('mouseout', function () {
        $(this).children('.details').removeClass('active')
    })

    // 大百科
    encyclopedia(523)
    function encyclopedia (columnId) {
        $.ajax({// 首页新闻列表
            type: 'GET',
            url: Url + '/api/website/getallcolumncontent',
            data: {
                column_id: columnId,
                type: 'article',
                pageSize: 5
            },
            dataType: 'jsonp',
            success: function (data) {
                let dataArr = data.data.data.reverse()
                let list = ''
                $.each(dataArr, function (i, e) {
                    list += '<li class="li' + (i + 1) + '"><a href="' + e.url + '" target="_blank"><img src="../img/list-img' + (i + 1) + '.png" alt=""></a></li>'
                })
                $('.cyclopedia-box ul').append(list)
            }
        })
    }

    // 新闻图片
    newImg(515)
    function newImg (columnId) {
        $.ajax({// 首页新闻列表
            type: 'GET',
            url: Url + '/api/website/getcolumncontentpage',
            data: {
                column_id: columnId,
                pageSize: 10
            },
            dataType: 'jsonp',
            success: function (data) {
                let slide = ''
                let dataArr = data.data.data
                $.each(dataArr, function (i, e) {
                    slide += '<div class="swiper-slide"><a href="' + e.pc_url + '" target="_blank"><img src="' + UrlImg + e.pc_big_img + '" alt=""><font>' + e.title + '</font></a></div>'
                })

                $('.new-left .swiper-wrapper').append(slide)

                let swiper1 = new Swiper('.swiper-container.new-left', {
                    pagination: '.swiper-pagination.new-img',
                    spaceBetween: 0,
                    loop: true,
                    autoplay: 3000
                })
                swiper1.autoplay = true
            }
        })
    }

    // 视频
    video(527)
    function video (columnId) {
        $.ajax({// 首页新闻列表
            type: 'GET',
            url: Url + '/api/website/getcolumncontentpage',
            data: {
                column_id: columnId,
                type: 'article',
                pageSize: 6
            },
            dataType: 'jsonp',
            success: function (data) {
                let dataArr = data.data.data
                let list = ''
                $.each(dataArr, function (i, e) {
                    list += '<div class="list"><p class="btn" data-src="' + e.video_url + '"><img src="../img/video.png" alt=""></p><p><img src="' + UrlImg + e.pc_img + '" alt=""></p><span>' + e.title + '</span></div>'
                })
                $('.video-cont').append(list)
            }
        })
    }

    // 视频弹窗
    videoPlay('.video-cont .btn')
    // 华衣霓裳
    clothes(525)
    function clothes (columnId) {
        $.ajax({
            type: 'GET',
            url: Url + '/api/website/getcolumncontentpage',
            datatype: 'JSONP',
            data: {
                column_id: columnId,
                type: 'image',
                pageSize: 10
            },
            success: function (data) {
                let dataArr = data.data.data
                let slide1 = ''
                let slide2 = ''
                for (let i = 0; i < dataArr.length; i++) {
                    if (dataArr[i].mobile_default_img === null) {
                        continue
                    } else {
                        slide1 += '<div class="swiper-slide slide-box slide' + (i + 1) + '"><div class="p-box active"><div class="big-img"><img src="' + UrlImg + dataArr[i].mobile_default_img + '" alt=""></div><p class="text">' + dataArr[i].short_title + '</p><p class="title"><span>' + dataArr[i].title + '</span></p><p class="star"><img src="../img/x' + dataArr[i].desc + '.png" alt=""></p></div></div>'
                    }
                }
                for (let i = 0; i < dataArr.length; i++) {
                    if (dataArr[i].pc_default_img === null) {
                        continue
                    } else {
                        slide2 += '<div class="swiper-slide slide-box slide' + (i + 1) + '"><div class="p-box active"><div class="big-img"><img src="' + UrlImg + dataArr[i].pc_default_img + '" alt=""></div><p class="text">' + dataArr[i].short_title + '</p><p class="title"><span>' + dataArr[i].title + '</span></p><p class="star"><img src="../img/x' + dataArr[i].desc + '.png" alt=""></p></div></div>'
                    }
                }
                $('.swiper-wrapper.person').append(slide1)

                let indexNum = $('.swiper-wrapper.person .swiper-slide').length
                let oLi = ''
                let btnNum = 0
                let galleryTop = new Swiper('.person-container', {
                    nextButton: '.person-next.swiper-button-white',
                    prevButton: '.person-prev.swiper-button-white',
                    spaceBetween: 10,
                    observer: true, // 修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, // 修改swiper的父元素时，自动初始化swiper
                    loopedSlides: 20, // looped slides should be the same
                    onSlideChangeStart: function (swiper) {
                        btnNum = swiper.activeIndex
                        $('.swiper-bottom-s li').eq(swiper.activeIndex).addClass('active').siblings().removeClass('active')
                    }
                })
                for (let i = 0; i < indexNum; i++) {
                    oLi += '<li data-index="' + (i) + '"><span>' + (i + 1) + '</span></li>'
                }
                $('.swiper-bottom-s ul').html(oLi)
                $('.swiper-bottom-s ul li').eq(0).addClass('active')
                $('.swiper-bottom-s li').on('click', function () {
                    galleryTop.slideTo($(this).data('index'), 0, false)
                    $(this).addClass('active').siblings().removeClass('active')
                    btnNum = $(this).data('index')
                })
                $('p.list span').on('click', function () {
                    let index = $(this).index()
                    $(this).children('font').addClass('active').parent()
                        .siblings().children('font').removeClass('active')
                    if (index === 0) {
                        btnNum = 0
                        $('.swiper-wrapper.person').html(slide1)
                        galleryTop.slideTo(0, 0, false)
                        $('.swiper-bottom-s li').eq(0).addClass('active').siblings().removeClass('active')
                    } else {
                        btnNum = 0
                        $('.swiper-wrapper.person').html(slide2)
                        galleryTop.slideTo(0, 0, false)
                        $('.swiper-bottom-s li').eq(0).addClass('active').siblings().removeClass('active')
                    }
                })
                $('.p-l').on('click', function () {
                    if (btnNum === 0) {
                        return false
                    } else {
                        btnNum--
                        galleryTop.slideTo(btnNum, 0, false)
                        $('.swiper-bottom-s li').eq(btnNum).addClass('active').siblings().removeClass('active')
                    }
                })
                $('.p-r').on('click', function () {
                    if (btnNum >= indexNum - 1) {
                        return false
                    } else {
                        btnNum++
                        galleryTop.slideTo(btnNum, 0, false)
                        $('.swiper-bottom-s li').eq(btnNum).addClass('active').siblings().removeClass('active')
                    }
                })
            }
        })
    }

    // 随从title
    let arrId = []
    let swiperPop
    attendTitle(69)
    function attendTitle (id) {
        $.ajax({
            type: 'GET',
            datatype: 'JSONP',
            url: Url + '/api/website/getskilllist',
            data: {
                id: id
            },
            success: function (data) {
                let dataArr = data.data
                let list = ''
                let pop = ''
                $.each(dataArr, function (i, e) {
                    arrId.push(e.id)
                    list += '<div class="swiper-slide"  id="' + e.id + '"><img src="' + UrlImg + e.pc_img + '" alt="" ><span>' + e.character + '</span></div>'
                    pop += '<div class="swiper-slide pop-person" id="' + e.id + '">' + i + '</div>'
                })
                $('.swiper-wrapper.title-img').html(list)
                $('.pop .swiper-wrapper').html(pop)
                $('.pop-person').each(function (i) {
                    let id = $(this).attr('id')
                    attendImg(id, $(this))
                })
                // 弹框
                swiperPop = new Swiper('.swiper-container.pop', {
                    paginationClickable: true,
                    nextButton: '.swiper-button-next.pop-next',
                    prevButton: '.swiper-button-prev.pop-prev',
                    spaceBetween: 0,
                    observer: true, // 修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true // 修改swiper的父元素时，自动初始化swiper
                })
            }
        })
    }
    function attendImg (id, ele) {
        $.ajax({
            type: 'GET',
            datatype: 'JSONP',
            url: Url + '/api/website/getskillinfo',
            data: {
                id: id
            },
            success: function (data) {
                let slideHtml = ''
                let dataArr = data.data
                let titleImg = JSON.parse(dataArr.imgs)
                let nameImg = JSON.parse(dataArr.skill)
                slideHtml = '<div class="follow-box"><div class="left"><div class="title">' + dataArr.character + '</div><p class="type">类型 : <span>' + dataArr.d + '</span></p><p class="star">星级 : </p><p class="text">' + dataArr.desc + '</p><div class="cont-tab"><div class="nav"><p class="nav-p active"><img src="' + UrlImg + titleImg[0] + '" alt=""><span>' + nameImg.name[0] + '</span></p><p class="nav-p"><img src="' + UrlImg + titleImg[1] + '" alt=""><span>' + nameImg.name[1] + '</span></p><p class="nav-p"><img src="' + UrlImg + titleImg[2] + '" alt=""><span>' + nameImg.name[2] + '</span></p></div><div class="cont active"><div class="pre active"></div><div class="next"></div></div><div class="cont"><div class="pre active"></div><div class="next"></div></div><div class="cont"><div class="pre active"></div><div class="next"></div></div></div><div class="dp"><p class="headline">缘分搭配</p><p class="cont">' + dataArr.y + '</p></div><div class="property"><p class="headline">随从属性</p><p class="skill"><span>生命：<font></font></span><span>攻击：<font></font></span><span>防御：<font></font></span><span>命中：<font></font></span><span>闪避：<font></font></span><span>暴击：<font></font></span><span>抗暴：<font></font></span></p></div></div><div class="right"><img src="' + UrlImg + dataArr.m_img + '" alt=""></div></div>'
                ele.html(slideHtml)
                // 弹框tab
                $(document).on('mouseenter', '.nav-p', function () {
                    let aIndex = $(this).index()
                    $(this).addClass('active').siblings().removeClass('active')
                    ele.find('.cont').eq(aIndex).addClass('active').siblings().removeClass('active')
                })
                for (let i = 0; i < nameImg.level.length; i++) {
                    ele.find('.pre').eq(i / 2).html(nameImg.level[i])
                    ele.find('.next').eq(i / 2).html(nameImg.level[++i])
                }
                ele.find('.star').html('<span><img src="../img/' + dataArr.x + 'x.png" alt=""></span>')
                for (let i = 0; i < nameImg.s.length; i++) {
                    ele.find('font').eq(i).text(nameImg.s[i])
                }
            }
        })
    }
    // 随从btn
    let accompany = new Swiper('.swiper-container.any', {
        paginationClickable: true,
        nextButton: '.swiper-button-next.s-next',
        prevButton: '.swiper-button-prev.s-prev',
        spaceBetween: 0,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        onSlideChangeStart: function (swiper) {
            if (swiper.activeIndex >= 1) {
                swiper.activeIndex = -1
            }
        }
    })
    accompany.autoplay = true
    // 随从
    $('.title-img').on('click', '.swiper-slide', function () {
        let index = $(this).index()
        swiperPop.slideTo(index, 0, false)
        $('.shade').show()
        $('.follow-img').show()
    })

    goToMobile('http://miyue.8864.com/miyue-mob/dataSite.html')

    $(window).on('scroll', function () {
        oAni('.page2-box', 'upImg', 'downImg')
    })
    function oAni (obj, Class, downClass) {
        $(obj).each(function () {
            let fold = $(window).height() + $(window).scrollTop()
            if ($(this).offset().top <= fold) {
                $(this).addClass(Class).removeClass(downClass)
            } else {
                $(this).removeClass(Class).addClass(downClass)
            }
        })
    }
})
