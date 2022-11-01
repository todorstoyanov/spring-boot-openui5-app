sap.ui.define(['sap/ui/core/UIComponent'], function (UIComponent) {

    'use strict'

    return {
        getRouter: function (oContext) {
            return UIComponent.getRouterFor(oContext)
        },
        setModelProperty: function (oScope, sProperty, oValue) {
            oScope.getView().getModel().setProperty(sProperty, oValue)
        },
        getCharCount: function (sString, sChar) {
            return [...sString].reduce((a, c) => (c === sChar ? ++a : a), 0) // NOSONAR
        },
        convertToUnixTimeStamp: function (sDateTime) {
            const datetime = Date.parse(sDateTime)
            return datetime / 1000
        },
        extractNumberFromString: function (sString) {
            return parseInt(sString.match(/\d+$/)[0], 10)
        },
        getTextFromMessageBundle: function (oScope, sProperty, aData = []) {
            return oScope.getView().getModel('i18n').getResourceBundle().getText(sProperty, aData)
        },
    }
})
