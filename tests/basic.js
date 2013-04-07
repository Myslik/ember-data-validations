var Person, store, array;

var testSerializer = DS.JSONSerializer.create({
    primaryKey: function () {
        return 'id';
    }
});

var TestAdapter = DS.Adapter.extend({
    serializer: testSerializer
});

module("Basic", {
    setup: function () {
        store = DS.Store.create({
            revision: 12,
            adapter: TestAdapter.create()
        });

        Person = DS.Model.extend({
            name: DS.attr('string', { required: true }),
            age: DS.attr('number'),
            isDrugAddict: DS.attr('boolean')
        });
    },

    teardown: function () {
        Person = null;
        store = null;
    }
});

test("model instance has been extended", function () {
    store.load(Person, { id: 1 });
    var record = store.find(Person, 1);
    ok(typeof record.validateProperty == 'function', "Model must have validateProperty function");
    ok(typeof record.validate == 'function', "Model must have validateProperty function");
});

test("validate function on model correctly validates all attributes", function () {
    store.load(Person, { id: 1, name: 'Premysl Krajcovic' });
    var record = store.find(Person, 1);
    ok(record.get('isValid'));
    record.set('name', null);
    ok(!record.get('isValid'));
});

test("required validator returns true for non empty string", function () {
    store.load(Person, { id: 1, name: 'Premysl Krajcovic' });
    var record = store.find(Person, 1);
    ok(!record.validateProperty('name'));
});

test("required validator returns false for null value", function () {
    store.load(Person, { id: 1 });
    var record = store.find(Person, 1);
    ok(record.validateProperty('name'));
});

test("required validator returns false for empty string", function () {
    store.load(Person, { id: 1, name: '' });
    var record = store.find(Person, 1);
    ok(record.validateProperty('name'));
});