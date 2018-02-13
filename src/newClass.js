var newClass = function (param)
{
    this.a = param;
}

newClass.prototype.foo = function ()
{
    return this.a;
}

module.exports = newClass;