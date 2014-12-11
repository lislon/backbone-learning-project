$(function() {
    var app = {};

    app.Todo = Backbone.Model.extend({
        defaults: {
            title: undefined,
            completed: false
        }   
    });

    app.TodoCollection = Backbone.Collection.extend({
        url: '/',
        localStorage: new Backbone.LocalStorage("SomeCollection"),
        model: app.Todo
    });

    app.ItemView = Backbone.View.extend({
        tagName: "li",
        template: _.template($("#item-template").html()),

        events: {
            "click .title": "edit",
            "click .confirm-edit": "update"
        },  
        edit: function() {
            alert("Edit");
            this.$(".edit").toggle();
            this.$(".title").toggle();
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }   
    }); 

    app.MainView = Backbone.View.extend({
        el: $("#wrapper"),

        events: {
            "click #add": "add"
        },  
        add: function() {
            var editbox = $("#todotext");
            // persist & add to collection
            app.collection.create({
                title: editbox.val().trim()
            });
            editbox.val("").focus();
        },
        initialize: function () {
            this.$list = $("#list");
            _.bindAll(this, "render");
            this.listenTo(app.collection, "add", this.render);
        }, 

        render: function () {
            this.redrawAll();
        },

        redrawAll: function() {
            this.$list.html('');
            app.collection.each(function(entry) {
                var entryView = new app.ItemView({ model: entry });
                alert(this.$list === $("#list"));
                this.$list.append(entryView.render().el);
            });
        }
    }); 

    app.collection = new app.TodoCollection();
    var main = new app.MainView({ model: app.collection });
    main.initialize();

    app.collection.create([
        {
            "title": "Hello"
        }
    ]);

});
