//构造检索对象
/*
var orders = [];
var groups = [];
//查询条件
var criteria = new Criteria()

var names = ['zh1', 'zh2', 'zh3'];
//1,字段条件
criteria.addCriterions(Restrictions.or(Restrictions.in("name", names),
                                       Restrictions.eq('email', 'zh1111@163.com'),
                                       Restrictions.eq('email', 'zi')));
criteria.addCriterions(Restrictions.eq('email', 'zi'));

//2,排序条件
orders.push(new Order('name', Direction.ASC));
orders.push(new Order('email', Direction.DESC));
criteria.addOrders(orders);

//3,分组条件
groups.push('email');
groups.push('name');
criteria.addGroups(groups);

//分页条件
var page = new Page(1, 11)

//构造检索对象
var searchBean = new SearchBean(criteria, page);
//获取检索对象并传递到服务端
searchBean.get();
*/
+function (global) {
    //分页参数
    global.Page = function (pageNum, pageSize) {
        this.pageNum = pageNum;
        this.pageSize = pageSize;
    };
    //================================
    //排序条件
    //ASC:升序 DESC:降序
    global.Direction = {
        "ASC": "ASC",
        "DESC": "DESC"
    };
    global.Order = function (fieldName, direction) {
        this.fieldName = fieldName;
        this.direction = direction;
    };
    //查询条件
    //操作符
    var Operator = { "EQ": "EQ", "NE": "NE", "LIKE": "LIKE", "GT": "GT", "LT": "LT", "GTE": "GTE", "LTE": "LTE", "AND": "AND", "OR": "OR", "IN": "IN" };
    //简单检索表达式
    //eg. 'name' EQ 'zhangsan'
    //eg. 'name' IN ['zhangsan', 'lisi', 'wangwu']
    var SimpleExpression = function (fieldName, value, operator) {
        this.fieldName = fieldName;
        this.value = value;
        this.operator = operator;
    };
    //复杂检索表达式
    //criterions为SimpleExpression或LogicalExpression组成的数组
    //operator为Operator.AND或Operator.OR
    //eg. 'name' EQ 'zhangsan' AND 'name' NE 'lisi'
    var LogicalExpression = function (criterions, operator) {
        this.criterions = criterions;
        this.operator = operator;
    };

    //检索条件
    global.Criteria = function (criterions, orders, groups) {
        this.criterions = criterions;
        this.orders = orders;
        this.groups = groups;
    };
    //参数为数组或单个实例
    Criteria.prototype.addCriterions = function (criterion) {
        this.criterions = this.criterions == null ? [] : this.criterions;
        if (criterion != null && (JPAValidator.validate(criterion, LogicalExpression)
            || JPAValidator.validate(criterion, SimpleExpression))) {
            this.criterions.push(criterion);
        }
    };
    Criteria.prototype.addOrders = function (order) {
        this.orders = this.orders == null ? [] : this.orders;
        if (order != null && JPAValidator.validate(order, Order)) {
            if (order instanceof Array) {
                this.orders = this.orders.concat(order);
            } else {
                this.orders.push(order);
            }
        }
    };
    Criteria.prototype.addGroups = function (group) {
        this.groups = this.groups == null ? [] : this.groups;
        if (group != null && JPAValidator.validate(group, String)) {
            if (group instanceof Array) {
                this.groups = this.groups.concat(group);
            } else {
                this.groups.push(group);
            }
        }
    };
    //类型检查
    var JPAValidator = function () { };
    JPAValidator.validate = function (param, type) {
        var result = true;
        if (param instanceof Array) {
            for (var i = 0; i < param.length; i++) {
                if (!param[i] instanceof type && !typeof param[i] == type) {
                    result = false;
                }
            }
        } else {
            if (!param[i] instanceof type && !typeof param[i] == type.name.toLowerCase()) {
                result = false;
            }
        }
        return result;
    };

    //检索对象
    global.SearchBean = function (criteria, page) {
        this.criteria = criteria;
        this.page = page;
    };
    //获得检索对象,传递到服务端
    SearchBean.prototype.get = function () {
        return {
            "searchBean": JSON.stringify(this)
        };
    };

    //工具方法
    global.Restrictions = function () { };
    Restrictions.and = function () {
        var criterions = [];
        for (var i = 0; i < arguments.length; i++) {
            criterions.push(arguments[i]);
        }
        return new LogicalExpression(criterions, Operator.AND);
    };
    Restrictions.or = function () {
        var criterions = [];
        for (var i = 0; i < arguments.length; i++) {
            criterions.push(arguments[i]);
        }
        return new LogicalExpression(criterions, Operator.OR);
    };
    Restrictions.eq = function (fieldName, value) {
        return new SimpleExpression(fieldName, value, Operator.EQ);
    };
    Restrictions.in = function (fieldName, value) {
        if (!value instanceof Array) throw new Error("value不是数组!");
        return new SimpleExpression(fieldName, value, Operator.IN);
    };
    Restrictions.ne = function (fieldName, value) {
        return new SimpleExpression(fieldName, value, Operator.NE);
    };
    Restrictions.gt = function (fieldName, value) {
        return new SimpleExpression(fieldName, value, Operator.GT);
    };
    Restrictions.gte = function (fieldName, value) {
        return new SimpleExpression(fieldName, value, Operator.GTE);
    };
    Restrictions.lt = function (fieldName, value) {
        return new SimpleExpression(fieldName, value, Operator.LT);
    };
    Restrictions.lte = function (fieldName, value) {
        return new SimpleExpression(fieldName, value, Operator.LTE);
    };
    Restrictions.like = function (fieldName, value) {
        return new SimpleExpression(fieldName, value, Operator.LIKE);
    };
    Restrictions.gte = function (fieldName, value) {
        return new SimpleExpression(fieldName, value, Operator.GTE);
    };
}(typeof window !== "undefined" ? window : this);
