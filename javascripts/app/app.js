var app = app || {};

$(function() {
    app.Todo = Backbone.Model.extend({
        defaults: {
            title: undefined,
            completed: false
        }   
    });

    app.TodoCollection = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("SomeCollection"),
        model: app.Todo,

        // Filter remaining items and return as array
        remaining: function() {
            return this.where({ completed: false });
        }
    });

    app.Router = Backbone.Router.extend({
        routes: {
            'stat': function() {
                app.tabView.switchTab('stat');
            },
            'list': function() {
                app.tabView.switchTab('list');
            },
            '*default': function() {
                // invoke default route - list
                app.router.navigate('list', {
                    trigger: true
                });
            }
        }
    });
    app.tabView = new app.TabView();
    app.collection = new app.TodoCollection();
    app.router = new app.Router();
    Backbone.history.start();
});
