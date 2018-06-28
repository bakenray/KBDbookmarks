//1.初始化数据
    var initDate = init();
    var keys = initDate['keys'];
    var hash = initDate['hash'];

//2.生成键盘
generateKeyboard(keys,hash);

//3.监听用户
listenToUser(hash);

//工具函数
function getFormLocalStorage(name){  //getFormLocalStorage()函数
     return JSON.parse(localStorage.getItem(name) || 'null')
}

function createTagName(tagName){  //创建tagname函数
    return document.createElement(tagName);
}

function createButton(id){
    var buttons= createTagName('button'); //创建button标签
        buttons.textContent = '编辑'; //给button标签添加内容
        buttons.id = id; //给button标签添加一个id
        buttons.onclick = function(btn) {   //button点击函数
            btnEdit = prompt("请输入一个网址"); //用prompt()弹出一个输入框，并把输入的值赋值给btnEdit
            var keyName = btn['target']['id']; //参数btn的[target]取到当前btn的id，并赋值给keyName
            hash[keyName] = btnEdit; //hash{...}中，当前的id,替换为btnEdit输入的内容
            localStorage.setItem('HILS',JSON.stringify(hash)) //每点击一次btn，就把修改后的hash保存在localStorage中
    }
    return buttons;
}

function createImg(domain){ //创建一个icons函数
    var icons =createTagName('img');//创建一个img标签
    if(domain){ 
        icons.src= "http://" + domain +'/favicon.ico'; //给img便签添加src
    }
    else{
        icons.src= '../images/none.png';
    }
    icons.onerror=function(img){  //如果图片获取失败，则执行函数
        img.target.src = '../images/none.png';
        console.log('获取ico失败~');
    }
    return icons;
}

function init(){ //初始化函数
    var keys = {
        '0':['`','1','2','3','4','5','6','7','8','9','0','-','=','←'],
        '1':['tab','q','w','e','r','t','y','u','i','o','p','[',']','＼'],
        '2':['capslock','a','s','d','f','g','h','j','k','l',';','"','enter'],
        '3':['shift','z','x','c','v','b','n','m',',','.','/','shift'],
        '4':['ctrl','win','alt','blank','alt','win','book','ctrl'],
        'length':5
    } 
    var hash = {
        '`' : '',
        '1' : '',
        '2' : '',
        '3' : '',
        '4' : '',
        '5' : '',
        '6' : '',
        '7' : '',
        '8' : '',
        '9' : '',
        '0' : '',
        '-' : '',
        '=' : '',
        '←' : '',
        'tab' : '',
        'q' : 'qq.com',
        'w' : 'weibo.com',
        'e' : 'ele.me',
        'r' : 'ruanyifeng.com',
        't' : 'taobao.com',
        'y' : 'youdao.com',
        'u' : 'ui.cn',
        'i' : 'iqiyi.com',
        'o' : 'oschina.net',
        'p' : 'pinterest.com',
        '[' : '',  
        ']' : '',
        '＼' : '', 
        'capslock' : '',
        'a' : 'acfun.cn',  
        's' : 'sogou.com',
        'd' : 'dribbble.com',  
        'f' : 'facebook.com',
        'g' : 'github.com', 
        'h' : 'hybridworks.jp',
        'j' : 'juejin.im',  
        'k' : 'jobbole.com',  
        'l' : 'logodashi.com',
        ';' : '',  
        '"' : '',
        'enter' : '', 
        'shift' : '',
        'z' : 'zcool.com.cn',  
        'x' : 'xuehui.com',
        'c' : 'cdc.tencent.com', 
        'v' : 'v2ex.com',
        'b' : 'behance.net',           
        'n' : 'nodyoung.com',
        'm' : 'developer.mozilla.org',  
        ',' : '',
        '.' : '', 
        '/' : '',
        'shift' : '',  
        'ctrl' : '',
        'win' : '',  
        'alt' : '',
        'blank' : '', 
        'alt' : '',
        'win' : '',  
        'book' : '',
        'ctrl' : '',  
    }
    var hashInlocalStorage = getFormLocalStorage('HILS');
    //取出localStorage中的HILS对应的hash
    if(hashInlocalStorage){    //判断localStorage是否已经纯在，如果已经存在，则赋值给hash
        hash = hashInlocalStorage
    }
    return {
        'keys':keys,
        'hash':hash
    }
}

function generateKeyboard(keys,hash){ //生成键盘函数
    for(var index1 =0; index1 <keys['length']; index1++){
        var divRow = createTagName('div'); //创建div
        mainBody.appendChild(divRow); //把创建的div添加到id='mainBody'标签下 
        
        var rowLen =keys[index1];//把当前循环行给rowLen
    
        for(var index2 =0; index2<rowLen['length']; index2++ ){ 
    
            var buttons = createButton(rowLen[index2]);  
            var icons = createImg(hash[rowLen[index2]]);
    
            var kbd = createTagName('kbd'); //创建kbd标签
            kbd.textContent = rowLen[index2]; //给kbd标签添加内容
            kbd.appendChild(buttons);//把button便签添加到kbd标签中
            kbd.appendChild(icons); //把img标签添加到kbd便签下
    
            divRow.appendChild(kbd); //把kbd标签添加到div中
        }
    }
}
 
function listenToUser(hash){ //监听用户动作函数
    document.onkeypress = function(keys){
        var key = keys['key'];//找到摁下的键的key值，赋值给key
        var webSite = hash[key]; // 在hash[...]中，对应的key的值，赋给webSite
        //location.href = "http://" + webSite;   一种打开网页的方式location.href=...
        window.open('http://'+ webSite ,'_blank');//用window.open在新的页面打开网页
    }
}