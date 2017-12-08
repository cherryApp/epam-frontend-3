"use strict";

/**
 * Datatable module for dynamic tables.
 */
(function(global) {
    // Collection object for store table row objects.
    var collection = {};

    // One row in table.
    var TableRow = function(entity) {
        // Private entity.
        var entity = entity;

        // Public getter for entity.
        this.getEntity = function() {
            return entity;
        };

        // Update entity properties.
        this.update = function(newEntity) {
            for (var k in newEntity) {
                if (entity[k]) {
                    entity[k] = newEntity[k];
                }
            }
        };
    };

    // Handle collection data.
    var collection = function(settings) {
        // Settings.
        settings = settings || {
            dataUrl: ""
        };

        var collectionArray = [];

        // Init collection.
        this.init = function() {
            if (!localStorage.myDataTableArray) {
                this.getFromServer();
            } else {
                this.getFromLocalStorage();
            }
        };

        // Process data form the server.
        this.processServerData = function(ev) {
            try {
                collectionArray = JSON.parse(ev.target.response);
                console.log(collectionArray);
            } catch(e) {
                console.error("Invalid JSON!");
            }
        }

        // Get data from server.
        this.getFromServer = function() {
            var xhr = new XMLHttpRequest;
            xhr.open("get", settings.dataUrl);
            xhr.addEventListener("load", this.processServerData.bind(this));
            xhr.send();
        };

        // Get data from localStorage.
        // Todo: read localStorage.myDataTableArray, parse and save to collectionArray
        this.getFromLocalStorage = function() {
            console.log("get from localStorage");
        };

        this.init();
    };

    // Public methods.
    global.DataTable = collection;
})(window);