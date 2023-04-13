var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

$(function () {
    let ETH = $("input[name=ETH]").val(), btc = $("input[name=btc]").val();

    function randomString(len, charSet) {
        charSet = charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var randomString = "";
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
    }

    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    function createTableItem() {
        let crypto = randomInteger(0, 1) ? "BTC" : "ETH";
        let inputValue = crypto === "BTC" ? randomInteger(0, 15) + "." + randomString(1, "123456789") : randomInteger(2, 200) + "." + randomString(1, "123456789");
        let address = crypto === "BTC" ? btc : ETH;
        let outputValue = ++inputValue * 2;
        let fee = inputValue / 1000;
        let time1 = moment().subtract(randomInteger(1, 20), 'second').format('H:mm:ss');
        let time2 = moment().subtract(randomInteger(60, 280), 'second').format('H:mm:ss');
        let row = `
            <div class="transactions-item">
                <p class="txhash">${randomString(25) + "..."}</p>
                <p class="block">${randomString(6, "123456789")}</p>
                <div class="from">
                    <p>${randomString(25) + "..."}</p>
                    <p>${address}</p>
                </div>
                <div class="apply">
                    <img src="/img/apply.png" alt="">
                </div>
                <div class="to">
                    <p>${address}</p>
                    <p>${randomString(25) + "..."}</p>
                </div>
                <div class="time">
                    <p>${time1}</p>
                    <p>${time2}</p>
                </div>
                <div class="value">
                    <p>${outputValue} ${crypto}</p>
                    <p>${inputValue} ${crypto}</p>
                </div>
                <p class="fee">${fee}</p>
                <p class="status">Done</p>
            </div>`;
        $(row).hide().prependTo(".transactions-body").fadeIn("slow");
        $('.transactions-item:eq(5)').remove();
    }

    createTableItem();
    createTableItem();
    createTableItem();
    createTableItem();
    createTableItem();
    setInterval(createTableItem, 8000);
    $('a[href^="#"]').click(function () {
        var target = $(this).attr('href');
        $('html, body').animate({scrollTop: $(target).offset().top - 50}, 500);
        return false;
    });
    $("input[name=amount_in]").ForceNumericOnly().keyup(function () {
        let amount = parseFloat($(this).val().replace(",", "."));
        amount = !isNaN(amount) ? amount * 2 : 0;
        $("input[name=amount_out]").val(amount);
    });
    $("input[name=amount_out]").ForceNumericOnly().keyup(function () {
        let amount = parseFloat($(this).val().replace(",", "."));
        amount = !isNaN(amount) ? amount / 2 : 0;
        $("input[name=amount_in]").val(amount);
    });
    $(".modal-amount_query button").click(function () {
        if ($(this).data('type') === "in") {
            $("input[name=amount_in]").val($(this).data("amount"));
            let amount = $(this).data("amount");
            amount = !isNaN(amount) ? amount * 2 : 0;
            $("input[name=amount_out]").val(amount);
        } else if ($(this).data('type') === "out") {
            $("input[name=amount_out]").val($(this).data("amount"));
            let amount = $(this).data("amount");
            amount = !isNaN(amount) ? amount / 2 : 0;
            $("input[name=amount_in]").val(amount);
        }
    });
    $(".modal-amount_coin").click(function () {
        $(this).parent().find(".modal-amount_select").toggle();
    });
    $(document).on('click', function (e) {
        if (!$(e.target).closest(".modal-amount_coin").length) {
            $('.modal-amount_select').hide();
        }
        e.stopPropagation();
    });
    $(".modal-amount_select").click(function () {
        $(".modal-amount_select").hide();
        let type = $(this).data('type');
        if (type === "btc") {
            $(".modal-amount_coin > p").text("BTC");
            $(".modal-amount").removeClass("ETH").addClass("btc");
            $(".modal-amount_select").data('type', "ETH");
            $(".modal-amount_select p").text("ETH");
        } else if (type === "ETH") {
            $(".modal-amount_coin > p").text("ETH");
            $(".modal-amount").removeClass("btc").addClass("ETH");
            $(".modal-amount_select").data('type', "btc");
            $(".modal-amount_select p").text("BTC");
        }
    });
    $(".modal-close").click(function () {
        $(".modal").fadeOut(200);
        $("body").removeClass("overflow");
    });
});

function copy(text) {
    var input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
}

jQuery.fn.ForceNumericOnly = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.charCode || e.keyCode || 0;
            return (key == 8 || key == 46 || key == 188 || key == 190 || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
        });
    });
};

}
/*
     FILE ARCHIVED ON 21:29:42 Sep 20, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:40:53 Apr 13, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 99.952
  exclusion.robots: 0.088
  exclusion.robots.policy: 0.077
  RedisCDXSource: 0.651
  esindex: 0.009
  LoadShardBlock: 80.245 (3)
  PetaboxLoader3.datanode: 156.156 (5)
  load_resource: 147.345
  PetaboxLoader3.resolve: 53.685
  loaddict: 80.155
*/