/**
 * Author: liushaozong
 * Date: 2017/7/13
 * Time: 11:18
 * Description:Description
 */

import { goToMobile } from '../../libs/js/util'
let Url = 'http://opm.8864.com'
let UrlImg = 'http://opm.8864.com'
$(function () {
    listMove()
    function listMove () {
        if ($('.list-tab li').eq(0).hasClass('active')) {
            $('.list-img .list-cont').css({
                'height': '1005px'
            })
            $('.list-more').show()
        } else {
            $('.list-more').hide()
        }
    }

    $('.list-more').on('click', function () {
        $('.list-cont').css({
            'height': 'auto'
        })
    })

    // 随从title
    let arrId = []
    let swiperPop
    attendTitle(69, 0)

    $('.list-tab li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
        attendTitle(69, $(this).data('type'))
        listMove()
    })
    function attendTitle (id, type) {
        $.ajax({
            type: 'GET',
            datatype: 'JSONP',
            url: 'http://192.168.84.34:8085/api/website/getskilllist',
            data: {
                id: id
            },
            success: function (data) {
                let dataArr = data.data
                let list = ''
                let pop = ''
                $.each(dataArr, function (i, e) {
                    arrId.push(e.id)
                    if (parseInt(e.x) === type) {
                        list += '<p  id="' + e.id + '"><img src="' + UrlImg + e.pc_img + '" alt="" ><span>' + e.character + '</span></p>'
                        pop += '<div class="swiper-slide pop-person" id="' + e.id + '">' + i + '</div>'
                    } else if (type === 0) {
                        list += '<p  id="' + e.id + '"><img src="' + UrlImg + e.pc_img + '" alt="" ><span>' + e.character + '</span></p>'
                        pop += '<div class="swiper-slide pop-person" id="' + e.id + '">' + i + '</div>'
                    }
                })
                $('.list-cont').html(list)
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
    $('.list-cont').on('click', 'p', function () {
        let index = $(this).index()
        swiperPop.slideTo(index, 0, false)
        $('.shade').show()
        $('.follow-img').show()
    })

    goToMobile('')
})
