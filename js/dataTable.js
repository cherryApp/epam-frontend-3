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
        var hash = "hash-"+Math.round(Math.random()*100000000000)

        for (var k in entity) {
            this[k] = entity[k];
        }

        // Public getter for entity.
        this.getEntity = function() {
            return entity;
        };

        this.getHash = function() {
            return hash;
        };

        // Update entity properties.
        this.update = function(newEntity) {
            for (var k in newEntity) {
                if (entity[k]) {
                    entity[k] = newEntity[k];
                }
            }
            for (var k in entity) {
                this[k] = entity[k];
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
            this.generateTrs();
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
          var tb = targetTable.querySelector("tbody");

          tb.innerHTML = "";

          for(var i = 0; i < collectionArray.length; i++) {
            var tr = document.createElement("tr"),
                hash = collectionArray[i].getHash();
            tr.setAttribute("data-hash", hash);
            tr.appendChild(this.createCell("td", i+1));
            var ent = collectionArray[i].getEntity();
            for(var k in ent) {
                tr.appendChild(this.createInputCell(k, ent[k], hash));
            }
            tr.appendChild(this.createManagerGroup(hash));
            tb.appendChild(tr);
          }
        };

        // Add table cell.
        this.createCell = function(type, content) {
            var cell = document.createElement(type);
            cell.innerHTML = content;
            return cell;
        };

        // Add table cell with input.
        this.createInputCell = function(key, value, hash) {
            var cell = document.createElement("td");
            var input = document.createElement("input");
            input.className = "form-control";
            input.value = value;
            input.type = "text";
            input.setAttribute("data-key", key);
            input.setAttribute("data-hash", hash);
            cell.appendChild(input);
            return cell;
        };

        // Refresh table row.
        this.refreshTableRow = function(hash) {
            for (var k in collectionArray) {
                if (collectionArray[k].getHash() == hash) {
                    var inputs = targetTable.querySelectorAll(
                        'input[data-hash='+hash+']'
                    );
                    var obj = {};
                    Array.prototype.forEach.call(inputs, function(item) {
                        var key = item.getAttribute("data-key");
                        obj[key] = item.value;
                    });

                    collectionArray[k].update(obj);
                    break;
                }
            }
            this.updateLocalStorage();
        };

        // Refresh table row.
        this.deleteTableRow = function(hash) {
            var k, tr;
            for (k in collectionArray) {
                if (collectionArray[k].getHash() == hash) {
                    collectionArray.splice(parseInt(k), 1);
                    tr = document.querySelector('tr[data-hash="'+hash+'"]');
                    tr.parentElement.removeChild(tr);
                    this.updateLocalStorage();
                    break;
                }
            }
            this.updateLocalStorage();
        };

        // Crate manager button group.
        this.createManagerGroup = function(hash) {
            var div = document.createElement("div");
            var that = this;
            div.className = "btn-group";
            div.setAttribute("data-hash", hash);
            
            var btn1 = document.createElement("button");
            btn1.className = "btn btn-primary";
            btn1.innerHTML = "1";

            var btn2 = document.createElement("button");
            btn2.className = "btn btn-danger";
            btn2.innerHTML = "2";

            btn1.addEventListener("click", function(ev) {
                var hash = ev.currentTarget.parentElement.getAttribute("data-hash");
                that.refreshTableRow(hash);
            });

            btn2.addEventListener("click", function(ev) {
                var hash = ev.currentTarget.parentElement.getAttribute("data-hash");
                that.deleteTableRow(hash);
            });

            div.appendChild(btn1);
            div.appendChild(btn2);
            var td = document.createElement("td");
            td.appendChild(div);
            return td;
            "<div class=\"btn-group\"><button class=\"btn btn-primary\">1</button><button class=\"btn btn-secondary\">2</button></div>"
        };

        // Process data form the server.
        this.processServerData = function(ev) {
            try {
                collectionArray = JSON.parse(ev.target.response);
                console.log(collectionArray);
                this.processRows();
                this.updateLocalStorage();
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
        this.getFromLocalStorage = function() {
            collectionArray = JSON.parse(localStorage.myDataTableArray);
            this.processRows();
            console.log("get from localStorage");
        };

        this.updateLocalStorage = function() {
            localStorage.myDataTableArray = JSON.stringify(collectionArray);
            console.log("Local Storage Updated");
        };

        this.init();
    };

    // Public methods.
    global.DataTable = collection;
})(window);
