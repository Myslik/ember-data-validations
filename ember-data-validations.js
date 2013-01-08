var get = Ember.get;

DS.DefaultValidators = {
    required: function (value, options) {
        if (options.required == true) {
            return !!value && 0 !== value.length;
        } else return true;
    }
};

DS.Validation = Ember.Object.create({
    init: function () {
        var defaults = DS.DefaultValidators;
        this.validators = [];
        for (var validator in defaults) {
            if (defaults.hasOwnProperty(validator)) {
                this.validators.push(defaults[validator]);
            }
        }
    },
    register: function (validator) {
        this.validators.push(validator);
    },
    validate: function (value, options) {
        return this.validators.reduce(function (previousValue, item) {
            return previousValue && item(value, options);
        }, true);
    }
});

DS.Model.reopen({
    validateProperty: function (name) {
        var meta = get(this.constructor, 'attributes').get(name);
        var value = get(this, name);
        return DS.Validation.validate(value, meta.options);
    }
});