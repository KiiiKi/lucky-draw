var vm = new Vue ({
    el: "#div-box",
    data: {
        chance: 1,//抽奖机会
        prize: [],//奖品合集
        showprize: false,//幕布显示
        inform: false,//是否显示全部奖品
        msg: "",//抽奖键下面显示所有的奖品
        msg1: true,//显示本次获得的奖
        msg2: false,//显示抽奖机会已用完
        prizeList: [
            { name: "一等奖",num: 1 },
            { name: "二等奖",num: 1 },
            { name: "三等奖",num: 3 },
            { name: "四等奖",num: 4 },
            { name: "五等奖",num: 5 },
            { name: "六等奖",num: 6 },
        ]
    },
    methods: {
        //判断抽奖条件
        mychance: function(){//仅触发一次用.one(click)?
            $("#but").addClass("canclick")//禁止点击“抽奖”
            if (this.chance > 0) {
                this.myrotate();
                this.chance -= 1;
                if (this.chance == 0){
                    $( "#but").css("background","#a0a0a0")
                }
            } else {
                this.showprize = true;
                this.msg1 = false;
                this.msg2 = true;   
            }
        },
        //确定奖项、旋转
        myrotate: function(){
            var that = this;//Vue方法中setTimeout改变变量的值无效
            setTimeout( function(){
                that.showprize = true;
                $("#but").removeClass("canclick");
            },5500 )
            var total = 0;
            this.prizeList.forEach (item => {
                total += item.num;
            });
            var choice = Math.floor ( Math.random() * total )
            var sum = 0;
            var prz = 0;
            for (var i = 0;i < this.prizeList.length;i++) {
                sum += this.prizeList[i].num
                if ( sum >= choice ) {
                    var n = i;
                    while(this.prizeList[n].num == 0){
                        n++;
                    } 
                    this.prizeList[n].num -= 1;
                    prz = n;
                    break;          
                }
            }
            var angles1 = Math.floor ( Math.random() * 60 ) -30;
            //避免在分界线上的误差
            if (angles1 < -25){
                angles1 = -25;
            }else if (angles1 > 25){
                angles1 = 25;
            }          
            var angles = prz * 60 + angles1;
            
            $("#circle").rotate({
                angle: 0,   //初始旋转的角度数，并且立即执行
                animateTo: angles*(-1) + 360 * 6, // 这里多旋转了5圈，圈数越多，转的越快
                duration: 5000,
                easing: $.easing.easeOutQuint//jq.easing                
            });
            this.prize.push( this.prizeList[prz].name );
            },

            //关闭提示层
            receive: function(){
                this.showprize = false;
                this.msg2 = false;
                this.msg1 = true;
                this.inform = true;
                var msg = "";
                this.prize.forEach (item => {
                    msg += "恭喜您抽中"+item+"!<br><br>"
                });
                this.msg = msg;                
            },
        },   
}) 

