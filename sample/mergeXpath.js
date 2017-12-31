/**
 *
 * 子节点xpath : //body/div[@class='eis_body_1'][1]/div[@class='eis_body_2'][1]/div[@class='eis_body_3'][1]/div[@class='eis_wp988'][1]/div[@class='eis_wp_l'][1]/div[@class='eis_wp_r'][1]/div[@class='eis_wp_t cl'][1]/div[@class='wp cl'][1]/div[@class='wp cl'][1]/div[@class='pl bm'][1]/div/table[@class='plhin'][1]/tbody[1]/tr[1]/td[@class='plc'][1]/div[@class='pi'][1]/strong[1]/a[1]/em[1]
 * 父节点Xpath: //body/div[@class='eis_body_1'][1]/div[@class='eis_body_2'][1]/div[@class='eis_body_3'][1]/div[@class='eis_wp988'][1]/div[@class='eis_wp_l'][1]/div[@class='eis_wp_r'][1]/div[@class='eis_wp_t cl'][1]/div[@class='wp cl'][1]/div[@class='wp cl'][1]/div[@class='pl bm'][1]/div/table[@class='plhin'][1]/tbody[1]/tr[1]/td[@class='plc'][1]/div[@class='pi'][1]/strong[1]/a[1]
 * 合并后加后缀: /descendant-or-self::node()[string-length(text()) > 0][not(child::*)][(name()='a' and position()=1) or (name()='em' and position()=2)]
 *
 * 合并结果://body/div[@class='eis_body_1'][1]/div[@class='eis_body_2'][1]/div[@class='eis_body_3'][1]/div[@class='eis_wp988'][1]/div[@class='eis_wp_l'][1]/div[@class='eis_wp_r'][1]/div[@class='eis_wp_t cl'][1]/div[@class='wp cl'][1]/div[@class='wp cl'][1]/div[@class='pl bm'][1]/div/table[@class='plhin'][1]/tbody[1]/tr[1]/td[@class='plc'][1]/div[@class='pi'][1]/strong[1]/a[1]/descendant-or-self::node()[string-length(text()) > 0][not(child::*)][(name()='a' and position()=1) or (name()='em' and position()=1)]
 *
 */
function mergeXpath(parentXpath, childXpath) {
    //父节点和子节点的position
    var parentPosition = parentXpath.charAt(parentXpath.length - 2);
    var childPosition = childXpath.charAt(parentXpath.length - 2);
    //父子节点的名字
    var nameReg = /[\w\W]*\/(.*?)\[\d+\]/;
    var parentNodeName = parentXpath.match(nameReg)[1];
    var childNodeName = childXpath.match(nameReg)[1];
    return parentXpath +
        "/descendant-or-self::node()[string-length(text()) > 0][not(child::*)][(name()='" +
        parentNodeName + "' and position()=" + parentPosition + ") or (name()='" +
        childNodeName + "' and position()=" + childPosition + ")]";
}
