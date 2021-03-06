var app = app || {};

app.TabView = Backbone.View.extend({
    el: $('#wrapper'),
    // lst of tabs view and their initializers
    // The argument 'el' points to newborn div container
    tabs: {
        "list": function(el) {
            var view = new app.MainView({ el: el, model: app.collection });
            // Fetch model from local storage
            app.collection.fetch();
            return view;
        },
        "stat": function(el) {
            var stat = new app.StatView({ el: el });
            return stat;
        }
    },
    // Caches the views of opened tabs
    _loadedTabs: {},
    // When user clicks on tab, we change it
    events: {
        "click #switch-tab-list": function() {
            this.switchTab('list');
        },
        "click #switch-tab-stat": function() {
            this.switchTab('stat');
        }
    }, 
    // Show tab with given names and hides rest
    switchTab: function(name) {
        // Alredy loaded tab?
        if (!this._loadedTabs[name]) {
            $("#tab-wrapper").append('<div id="tab-' + name + '" />');
            var newDiv = $('#tab-' + name);
            var newTab = this.tabs[name].call(this, newDiv);
            // Add new tab (it's hidden in css, we active it later)
            this._loadedTabs[name] = newTab;

            if (newTab.renderTab) {
                newTab.renderTab();
            }
        }
        this._loadedTabs[name].render();

        // Hide other tabs and switch tab button style to active
        _.each(this._loadedTabs, function(tab, key) {
            if (key === name) {
                tab.$el.addClass("active");
            } else {
                tab.$el.removeClass("active");
            }
            $("#tabs li#switch-tab-" + key).toggleClass("active", key === name);
        });
    }
}); 
