function sortrows(table, n, comparator){
    var tbody = table.tBodies[0];
    var rows = tbody.getElementsByTagName("tr");
    //真实数组的快照，为了防止动态改变吧。。
    //处理时新加的行不处理
    rows = Array.prototype.slice.call(rows, 0);

    //基于第n个<td>元素的值对行排序
    rows.sort(function(row1, row2){
        var cell1 = row1.getElementsByTagName('td')[n];
        var cell2 = row2.getElementsByTagName('td')[n];
        var val1 = cell1.textContent || cell1.innerText;
        var val2 = cell2.textContent || cell2.innerText;
        if(comparator) return comparator(val1, val2);
        if(val1 < val2) return -1;
        else if(val1 > val2) return 1;
        else return 0;
    });
    //在tbody中按他们的顺序把行添加到最后
    for(var i = 0; i < rows.length; i++) tbody.appendChild(rows[i]);
}
//查找表格的<th>元素(假设只有一行),让他们可单击
//以便单击列标题，按该列对行排序
function makeSortable(table){
    var headers = table.getElementsByTagName("th");
    for(var i = 0; i < headers.length; i++){
        (function(n){
            headers[i].onclick = function(){sortrows(table, n);};
        }(i));
    }
}
