sap.ui.define([], function () {
    'use strict'
    const REQUEST_TYPE = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
    }
    const MODEL_PATHS = {
        CATEGORIES: '/categories'
    }
    const API = {
        CATEGORIES: `${window.location.origin}/catalog/api/categories`
    }

    return {
        REQUEST_TYPE: REQUEST_TYPE,
        MODEL_PATHS: MODEL_PATHS,
        API: API
    }
})
