sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"../util/Common",
    "../util/Constants",
    "../handlers/HttpHandler",
], function(Controller, MessageBox, JSONModel, Common, Constants, HttpHandler) {

	"use strict";

	return Controller.extend("todor.catalog.controller.App", {

		onInit: async function() {
            try {
                this.getView().byId('navigationList').setBusy(true)
                this._loadCategories()
            } catch (e) {
                MessageBox.error("Can not load categories")
            } finally {
                this.getView().byId('navigationList').setBusy(false)
            }
		},

		onCollapseExpandPress: function () {
            var oNavigationList = this.byId("navigationList");
            var bExpanded = oNavigationList.getExpanded();
            oNavigationList.setExpanded(!bExpanded);
        },

        onAddNewCategory: function() {
            this.getView().byId('addCategoryDialog').open()
        },

        onDeleteCategory: function() {
            this.getView().byId('deleteCategoryDialog').open()
        },

        onAddCategorySave: async function() {
            const oRequestBody = {
               name: this.getView().byId('categoryAddName').getValue(),
               icon: this.getView().byId('categoryAddIcon').getValue(),
               items: this.getView().byId('categoryAddItems').getValue(),
            }
            try {
                await HttpHandler.executePostRequestTextResponse(Constants.API.CATEGORIES, oRequestBody)
                this._loadCategories()
                this.getView().byId('addCategoryDialog').close()
            } catch (e) {
                console.log(e.message)
                MessageBox.error("Can not create category")
            }
        },

        onAddCategoryCancel: function() {
            this.getView().byId('addCategoryDialog').close()
        },

        onDeleteCategorySave: async function() {
            try {
                const sCategoryName = this.getView().byId('categoryDeleteName').getValue()
                await HttpHandler.executeDeleteRequestTextResponse(Constants.API.CATEGORIES + '/' + sCategoryName)
                this._loadCategories()
                this.getView().byId('deleteCategoryDialog').close()
            } catch (e) {
                console.log(e.message)
                MessageBox.error("Can not delete category")
            }
        },

        onDeleteCategoryCancel: function() {
            this.getView().byId('deleteCategoryDialog').close()
        },

        _loadCategories: async function () {
            const oBackendData = await HttpHandler.executeGetRequest(Constants.API.CATEGORIES)
            let oData = JSON.parse('[]');
            for(let i = 0; i < oBackendData.length; i++) {
                oData.push(oBackendData[i]);
                let items = oBackendData[i].items.split(',')
                let oItems = JSON.parse('[]');
                for(let j = 0; j < items.length; j++) {
                    let oItem = {
                        name: items[j]
                    }
                    oItems.push(oItem)
                }
                oData[i].items = oItems
            }
            this.getView().getModel().setProperty(Constants.MODEL_PATHS.CATEGORIES, oBackendData)
        }
	});

});
