var app = app || {};

app.TabView = Backbone.View.extend({
    el: $('#wrapper'),
    // list of tabs view and their initializers
    tabs: {
        "list": function(el) {
            var view = new app.MainView({ el: el, model: app.collection });
            // Fetch model from local storage
            app.collection.fetch();
            return view;
        },
        "stat": function(el) {
            var stat = new app.StatView({ el: el});
            return stat;
        }
    },
    _loadedTabs: {},
    events: {
        "click #switch-tab-list": function() {
            this.switchTab('list');
        },
        "click #switch-tab-stat": function() {
            this.switchTab('stat');
        }
    }, 
    switchTab: function(name) {
        if (!this._loadedTabs[name]) {
            var newTab = this.tabs[name].call(this, $('#tab-wrapper').append('<div id="tab-' + name + '" />'));
            if (newTab.renderTab) {
                newTab.renderTab();
            }
            // Add new tab (it's hidden in css, we active it later)
            this._loadedTabs[name] = newTab;
        }
        this._loadedTabs[name].render();

        _.each(this._loadedTabs, function(tab, key) {
            tab.$el.toggleClass("active", key === name);
            $("#tabs li#switch-tab-" + key).toggleClass("active", key === name);
        });
    },

    initTab: function() {
        throw Error("Must implement initTab");
    }
}); 
