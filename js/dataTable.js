"use strict";

console.log("dataTable js is loaded");

/**
 * Datatable module for dynamic tables.
 */
(function(global) {
    // Settings.
    var settings = global.dataTableSettings || {
        dataUrl: "",
        localStorageProvider: null
    };

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
    var collection = function() {
        // Init collection.
        this.init = function() {
            
        };

        // Get data from server.
        this.getFromServer = function() {
            
        };


        // Get data from localStorage.
    };
})(window);