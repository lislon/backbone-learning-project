var app = app || {};
 
app.ItemView = Backbone.View.extend({
    tagName: "li",
    template: _.template($("#item-template").html()),

    events: {
        "dblclick .title label": "edit",
        "click .confirm-edit": "editDone",
        "keypress .edit-text": "keyPress",
        "click .delete": "remove",
        "change .toggle": "toggle"
    }, 
    initialize: function() {
        this.listenTo(this.model, "change", this.render);
    },
    // User marks item as done or undone
    toggle: function() {
        this.model.save("completed", !this.model.get("completed"));
    },
    // User deletes task
    remove: function() {
        this.model.destroy();
        this.$el.remove();
    },
    keyPress: function(e) {
       if (e.keyCode == 13) { // User pressed enter key
           this.editDone();
       } 
    },
    // User finishes editing, save changes
    editDone: function() {
        var val = this.$(".edit-text").val().trim();
        if (val) {
            this.model.set("title", val);
        } else {
            // If user erase all text - destroy task
            this.model.destroy();
        }
        this.$(".edit").hide();
        this.$(".title").show();
    },

    edit: function() {
        this.$(".edit").show();
        this.$(".title").hide();
        this.$(".edit-text").val(this.model.get("title")).focus();
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        this.$el.toggleClass("done", this.model.get('completed'));
        return this;
    }   
}); 
