Client-side validations for Ember-Data
======================================

### Prerequisities

* jQuery
* Ember.js
* Ember-Data

### Usage

You can define validators in meta part of DS attributes definition.

```javascript
App.Post = DS.Model.extend({
	title: DS.attr('string', { required: true })
});
```

### Validators

List of implemented client side validators

#### Required

Attribute has to be non-null and non-empty before commiting to server.