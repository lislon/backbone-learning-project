var app = app || {};

app.StatView = Backbone.View.extend({
    events: {
    },  

    initialize: function () {
        _.bindAll(this, "render");
    },  

    render: function () {
        this.$el.html("Hello, i am second view, but i am not ready yet");
    }   
}); 
