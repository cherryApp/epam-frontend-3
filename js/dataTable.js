"use strict";

console.log("dataTable js is loaded");

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

        // Get data from server.
        this.getFromServer = function() {
            console.log("get from server");
        };

        // Get data from localStorage.
        // Todo: read localStorage.myDataTableArray, parse and save to collectionArray
        this.getFromLocalStorage = function() {
            console.log("get from localStorage");
        };
    };

    // Public methods.
    this.init();
    global.DataTable = collection;
})(window);