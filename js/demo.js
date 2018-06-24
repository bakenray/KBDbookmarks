
    var keys = {
        '0': ['q','w','e','r','t','y','u','i','o','p'],
        '1': ['a','s','d','f','g','h','j','k','l'],
        '2': ['z','x','c','v','b','n','m'],
        'length': 3
    }
    var hash= {
        q: 'qq.com',w: 'weibo.com',e: 'ele.me',r: 'renren.com',t: 'taobao.com',y: 'yahoo.com',u: 'ui.cn',i: 'iqiyi.com',o: 'oschina.net',p: 'pinterest.com',
        a: 'acfun.cn',s: 'sohu.com',d: 'dribbble.com',f: 'baidu.com',g: 'github.com',h: 'baidu.com',j: 'juejin.im',k: 'baidu.com',l: 'baidu.com',
        z: 'zcool.com.cn',x: 'baidu.com',c: 'csdn.net',v: 'v2ex.com',b: 'behance.net',n: 'nodejs.cn',m: 'developer.mozilla.org',
    }


    hashInlocalStorage = JSON.parse(localStorage.getItem('HILS') || 'null')
            //取出localStorage中的HILS对应的hash
    if(hashInlocalStorage){
        hash = hashInlocalStorage
    }

    //遍历keys，生成kbd便签
    index = 0 
    while( index < keys['length']){ //0 1 2
        divBox = document.createElement('div')
        mainBody.appendChild(divBox)

        index2 = 0
        row = keys[index]; //第一个数组 第二个数组 第三个数组

        while( index2 < row['length']){   //0-9 0-8 0-6
        kbdBox = document.createElement('kbd')
        kbdBox.textContent = row[index2]
        divBox.appendChild(kbdBox)

        buttonBox = document.createElement('button')
        buttonBox.textContent = '编辑'
        buttonBox.id = row[index2]
        kbdBox.appendChild(buttonBox)
        
        buttonBox.onclick = function(buttons){ 
            key = buttons['target']['id']  //buttons['target'] 用户点击的元素，q w e r t...
            btnEdit = prompt('请输入一个网址')
            hash[key] = btnEdit            //hash变更
            localStorage.setItem('HILS',JSON.stringify(hash))
            console.log(hash)
        }

        index2 = index2 + 1
        }
        index = index + 1
    }

    document.onkeypress = function (keys){

        key = keys['key']
        webSite = hash[key]
        // location.href = 'http://'+ webSite
        window.open('http://'+ webSite , '_blank')
    }
