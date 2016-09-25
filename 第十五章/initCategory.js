onload = function(){
    //查找TOC容器，不存在就新建
    var toc = document.getElementById('TOC');
    if(!toc){
        toc = document.createElement("div");
        toc.id = 'TOC';
        document.body.insertBefore(toc, document.body.firstChild);
    }

    //查找所有的标题元素
    var headings;
    if(document.querySelectorAll){
        headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
    }else{
        headings = findHeadings(document.body, []);
    }

    //查找标题元素
    function findHeadings(root, sects){
        for(var c = root.firstChild; c != null; c = c.nextSibling){
            if(c.nodeType !== 1) continue;
            if(c.tagName.length == 2 && c.tagName.charAt(0) == 'H'){
                sects.push(c);
            }else{
                findHeadings(c, sects);
            }
        }
        return sects;
    }

    var sectionNumbers = [0,0,0,0,0,0];

    for(var h = 0; h < headings.length; h++){
        var heading = headings[h];
        //跳过TOC容器中的标题元素
        if(heading.parentNode == toc) continue;

        var level = parseInt(heading.tagName.charAt(1));
        if(isNaN(level) || level < 1 || level > 6) continue;

        sectionNumbers[level-1]++;

        for(var i = level; i < 6; i++) sectionNumbers[i] = 0;

        var sectionNumber = sectionNumbers.slice(0, level).join('.');

        //增加章节号
        var span = document.createElement('span');
        span.className = "TOCSectNum";
        span.innerHTML = sectionNumber;
        heading.insertBefore(span, heading.firstChild);

        var anchor = document.createElement('a');
        anchor.name = 'TOC' + sectionNumber;
        heading.parentNode.insertBefore(anchor, heading);
        anchor.appendChild(heading);

        var link = document.createElement('div');
        link.href = '#TOC' + sectionNumber;
        link.innerHTML = heading.innerHTML;

        //将链接放入一个div中，加类名修饰
        var entry = document.createElement('div');
        entry.className = 'TOCEntry TOCLevel' + level;
        entry.appendChild(link);

        toc.appendChild(entry);
    }
};
