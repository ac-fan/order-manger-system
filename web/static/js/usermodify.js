var userRole = null;

function priceReg(value) {
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    value = value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的.
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");//去掉特殊符号￥
    if (value.indexOf(".") > 0) {
        value = value.substring(0, value.indexOf(".") + 3);
    }
    return value;
}

function submitForm() {
    $("#UserEditForm").submit();
}

var formControls = function () {

    userRole = $("#userRole");

    var arrows;
    if (KTUtil.isRTL()) {
        arrows = {
            leftArrow: '<i class="la la-angle-right"></i>',
            rightArrow: '<i class="la la-angle-left"></i>'
        }
    } else {
        arrows = {
            leftArrow: '<i class="la la-angle-left"></i>',
            rightArrow: '<i class="la la-angle-right"></i>'
        }
    }

    /**
     * 获取用户角色列表函数
     */
    var getUserRoleList = function () {
        $.ajax({
            type: "GET",//请求类型
            url: "/jsp/user.do",//请求的url
            data: {method: "getrolelist"},//请求参数
            dataType: "json",//ajax接口（请求url）返回的数据类型
            success: function (data) {//data：返回数据（json对象）
                if (data != null) {
                    var rid = $("#rid").val();
                    userRole.html("");
                    var options = "<option value=\"\">请选择</option>";
                    for (var i = 0; i < data.length; i++) {

                        if (rid !== null && rid !== undefined && data[i].id === rid) {
                            options += "<option selected=\"selected\" value=\"" + data[i].id + "\" >" + data[i].roleName + "</option>";
                        } else {
                            options += "<option value=\"" + data[i].id + "\" >" + data[i].roleName + "</option>";
                        }
                    }
                    userRole.html(options);
                }
            },
            error: function (data) {//当访问时候，404，500 等非200的错误状态码
                validateTip(userRole.next(), {"color": "red"}, imgNo + " 获取用户角色列表error", false);
            }
        });
    }

    /**
     * 初始化日期选择器
     */
    var initDatePicker = function () {
        $.fn.datepicker.dates['zh-CN'] = {
            days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            daysMin: ["日", "一", "二", "三", "四", "五", "六"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            today: "今天",
            monthsTitle: "选择月份",
            clear: "清除",
            format: "yyyy-mm-dd",
            titleFormat: "yyyy年mm月",
            weekStart: 1
        };
        $('#birthday').datepicker({
            rtl: KTUtil.isRTL(),
            orientation: "bottom left",
            todayHighlight: true,
            language: "zh-CN",   //指定 本地化格式
            format: "yyyy-mm-dd",    //控制timepicker 日期格式
            templates: arrows
        });
    }

    /**
     * 检查表格函数
     */
    var validateForm = function () {
        FormValidation.formValidation(
            document.getElementById('UserEditForm'),
            {
                fields: {
                    /**
                     * 判断表单各项是否为空,并在空时返回 message 提示
                     */
                    userName: {
                        validators: {
                            notEmpty: {
                                message: '用户名不能为空.'
                            }
                        }
                    },
                    birthday: {
                        validators: {
                            notEmpty: {
                                message: '请选择用户出生日期'
                            },
                            options: {
                                format: 'yyyy-mm-dd',
                                message: '输入的不是有效的日期格式',
                            },
                        }
                    },
                    phone: {
                        validators: {
                            notEmpty: {
                                message: '请输入电话号码'
                            },
                            phone: {
                                country: 'CN',
                                message: '这不是一个有效的电话号码'
                            }
                        }
                    },
                    address: {
                        validators: {
                            notEmpty: {
                                message: '请输入用户的地址'
                            }
                        }
                    },
                    userRole: {
                        validators: {
                            notEmpty: {
                                message: '请选择用户角色'
                            }
                        }
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    // Bootstrap 框架整合
                    bootstrap: new FormValidation.plugins.Bootstrap(),
                    // 点击提交按钮时进行表单校验
                    submitButton: new FormValidation.plugins.SubmitButton(),
                }
            }
        ).on('core.form.valid', function () {
            Swal.fire({
                title: "确认提交",    //提示标题
                text: "你确认要提交数据吗?",      //提示内容
                icon: "warning",            //上端图标类型
                showCancelButton: true,     //是否展示取消按钮
                cancelButtonText: "不,我再想想.", //取消按钮文本
                confirmButtonText: "确认提交" //确认按钮文本
            }).then(function (result) {
                if (result.value) {
                    //提交表单
                    submitForm();
                    Swal.fire("已提交", "用户修改提交成功", "success").then(function () {
                        window.location.href = "/jsp/user.do?method=query";
                    });
                } else if (result.dismiss === "cancel") {
                    //选择取消按钮执行的操作
                    Swal.fire("已取消该操作", "操作已取消:)", "error")
                }
            });
        })//表格有效时才显示提交提醒
    }


    return {
        init: function () {
            getUserRoleList();
            initDatePicker();
            validateForm();
        }
    };
}();

jQuery(document).ready(function () {
    formControls.init();    //加载页面时就启用检查函数
});
