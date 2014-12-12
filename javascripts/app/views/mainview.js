var app = app || {};

app.MainView = Backbone.View.extend({
    template: _.template($("#tab-list-template").html()), 

    events: {
        "click #add": "add",
        "click #toggle-completed": "toggleCompleted"
    },  
    toggleCompleted: function() {
        this.hideCompleted = !this.hideCompleted;
        $("#toggle-completed").text((this.hideCompleted ? "Show" : "Hide") + " completed");
        this.redrawAll();
    },
    add: function() {
        var editbox = $("#todotext");
        if (editbox.val().trim()) {
            // create model, persist, add to collection in one step
            app.collection.create({
                title: editbox.val().trim()
            });
            editbox.val("").focus();
        }
    },
    initialize: function () {
        this.listenTo(app.collection, "add", this.addItem);
        this.listenTo(app.collection, "reset", this.redrawAll);
        this.listenTo(app.collection, "all", this.render);
        this.footerTemplate = _.template($("#footer-template").html());
        // Default filter settings
        this.hideCompleted = false;
    }, 
    // Render basic template. Invokes by TabView after tab initialization
    // TODO: Question to Vitaly: Where to put this stuff?
    renderTab: function() {
        this.$el.html(this.template());
        // Render loaded items
        this.redrawAll();
    },

    render: function () {
        if (app.collection.length > 0) {
            $("#footer").html(this.footerTemplate({
                total: app.collection.length
            })).show();
        } else {
            $("#footer").hide();
        }
    },

    // Render novel tab item
    addItem: function(model) {
        var list = $("#list");
        var entryView = new app.ItemView({ model: model });
        list.append(entryView.render().el);
    },

    redrawAll: function() {
        var list = $("#list");
        list.html('');
        if (this.hideCompleted) {
            _.each(app.collection.remaining(), this.addItem, this);
        } else {
            app.collection.each(this.addItem, this);
        }
    },

    updateChart: function() {
        var context = $("#statistics")[0].getContext('2d');

        context.strokeStyle = "#000";
        context.fillStyle = "#fc0";
        context.beginPath();
        context.arc(100, 100, 50, Math.PI / 2.0, Math.PI);
        context.closePath();
        context.stroke();
        context.fill();
    }
}); 
