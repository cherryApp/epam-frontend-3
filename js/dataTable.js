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
            dataUrl: "",
            table: ""
        };

        var collectionArray = [],
            targetTable = null;

        // Init collection.
        this.init = function() {
            targetTable = document.querySelector(settings.table);
            if (!localStorage.myDataTableArray) {
                this.getFromServer();
            } else {
                this.getFromLocalStorage();
            }
        };

        // Process table rows.
        this.processRows = function() {
            for (var k in collectionArray) {
                collectionArray[k] = new TableRow(collectionArray[k]);
            }
            this.refreshTable();
        };

        // Show table.
        this.refreshTable = function() {
            this.generateHeader();
        };

        // Generate header.
        this.generateHeader = function() {
            var thRow = targetTable.querySelector("thead tr");
            thRow.innerHTML = "";
            thRow.appendChild( this.createCell("th", "#") );
            console.log(collectionArray);
            for (var k in collectionArray[0].getEntity()) {
                thRow.appendChild( this.createCell("th", k) );
            }
            thRow.appendChild( this.createCell("th", "#") );
        };

        // Generate tr.
        this.generateTrs = function(record) {

        };

        // Add table cell.
        this.createCell = function(type, content) {
            var cell = document.createElement(type);
            cell.innerHTML = content;
            return cell;
        };

        // Process data form the server.
        this.processServerData = function(ev) {
            try {
                collectionArray = JSON.parse(ev.target.response);
                console.log(collectionArray);
                this.processRows();
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
