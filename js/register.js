window.onload = function() {
    var phone = document.querySelector("#jd_phone");
    var pwd = document.querySelector("#demo_input");
    var repwd = document.querySelector("#jd_repwd");
    var username = document.querySelector("#username");
    var safe = document.querySelector(".safe");
    var ruo = document.querySelector(".ruo");
    var zhong = document.querySelector(".zhong");
    var qiang = document.querySelector(".qiang");
    var yzm = document.querySelector("#jd_yzm");
    var regyzm = /\d{6}/;
    var regusername = /^[\u4e00-\u9fa5]{2,8}$/;
    var regtel = /^1[3|4|5|7|8]\d{9}$/;
    var regpwd = /^[a-zA-Z0-9~!@#$%^&*()_+`\-={}:";'<>?,.\/]{6,16}$/;
    username.onblur = function() {
        if (regpwd.test(this.value)) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜您输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i>请输入2~4个汉字';
        }
    };
    regexp(phone, regtel);
    regexp(yzm, regyzm);

    function regexp(ele, reg) {
        ele.onblur = function() {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜您输入正确';
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i>格式不正确，请重新输入';
            }
        }
    };
    pwd.onblur = function() {
        if (regpwd.test(this.value)) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜您输入正确';
            var level = 0;
            if (/[\d]/.test(this.value)) {
                level++;
            }
            if (/[a-zA-Z]/.test(this.value)) {
                level++;
            }
            if (/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{4,16}$/.test(this.value)) {
                level++;
            }
            console.log(level);
            if (level == 1) {
                safe.style.display = "block";
                ruo.style.backgroundColor = "#de1111";
                zhong.style.backgroundColor = "#b2b2b2";
                qiang.style.backgroundColor = "#b2b2b2";
            }
            if (level == 2) {
                safe.style.display = "block";
                zhong.style.backgroundColor = "#40b83f";
                ruo.style.backgroundColor = "#b2b2b2";
                qiang.style.backgroundColor = "#b2b2b2";
            }
            if (level == 3) {
                safe.style.display = "block";
                qiang.style.backgroundColor = "#f79100";
                ruo.style.backgroundColor = "#b2b2b2";
                zhong.style.backgroundColor = "#b2b2b2";
            }
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i>密码不少于6位不超过16位，请重新输入';
        }
    };
    repwd.onblur = function() {
        if (this.value == pwd.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜您输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i>密码不一致，请重新输入';
        }
    };

}