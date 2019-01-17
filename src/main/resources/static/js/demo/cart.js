$(document).ready(function () {


    var cartTable = $("#cartTable");


    // $(".add").click(function () {
    //     var t = parseInt($(this).parent().children(".quantity").val());
    //     t = t + 1;
    //     $(this).parent().children(".quantity").val(t);
    //     // setSubTotal();
    // });
    //
    // $(".min").click(function () {
    //     var row = $(this).parent("tr");
    //     var t = parseInt($(this).parent().children(".quantity").val());
    //
    //     t = (t - 1)
    //     if (t < 0) {
    //         t = 0;
    //     }
    //     $(this).parent().children(".quantity").val(t);
    //     // setSubTotal(row);
    // });

    //
    //
    // $(".add").click(function(){
    //     var t = $(this).parent().find('input[class*=quantity]');
    //     t.val(parseInt(t.val())+1);
    //     setTotal();
    // })
    //
    // $(".min").click(function(){
    //     var t = $(this).parent().find("input[class*=quantity]");
    //     t.val(parseInt(t.val())-1);
    //     if(parseInt(t.val())<0){
    //         t.val(0);
    //     }
    //     setTotal()
    // })
    //
    // function setTotal(){
    //     var sum = 0;
    //     $("#cartTable td").each(function(){
    //
    //         var num = parseInt($(this).find("input[class*=text_box]").val());
    //         var price = parseFloat($(this).find("td[class*=price]").text());
    //         sum += num*price;
    //     })
    //     $("#total").html(sum.toFixed(2));
    // }
    // // setTotal();





    $(cartTable).find("tr:gt(0)").each(function() {
        var input = $(this).find(":text");

        //为数量输入框添加事件，计算金额小计，并更新总计
        // $(input).keyup(function() {
        //     var val = parseInt($(this).val());
        //     if (isNaN(val) || (val < 1)) { $(this).val("1"); }
        //     getSubTotal($(this).parent().parent()); //tr element
        //     getTotal();
        // });

        //为数量调整按钮、删除添加单击事件，计算金额小计，并更新总计
        $(this).click(function() {
            var val = parseInt($(input).val());
            if (isNaN(val) || (val < 1)) { val = 1; }

            if ($(window.event.srcElement).hasClass("min")) {
                if (val > 1) val--;
                input.val(val);
                getSubTotal(this);
            }
            else if ($(window.event.srcElement).hasClass("add")) {
                if (val < 9999) val++;
                input.val(val);
                getSubTotal(this);
            }
            else if ($(window.event.srcElement).hasClass("delete")) {
                if (confirm("确定要从购物车中删除此产品？")) {
                    $(this).remove();
                }
            }
            // getTotal();
        });
    });


    function getSubTotal(row) {

        // var t = $(row).find("label[class*=price]");
        // var a = t.text();
        // var c = parseInt(a);
        // var t2 = $(row).find("input[class*=price]");
        // var a2 = t2.val();
        var price = parseFloat($(row).find("label[class*=price]").text());
        var qty = parseInt($(row).find(":text").val());
        var result = price * qty;
        $(row).find(".price").text($.formatMoney(price, 2));
        $(row).find(".subtotal").text($.formatMoney(result, 2)).data("bind", result.toFixed(2));
    };


});