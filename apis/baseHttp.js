import Vue from 'vue'
import storage from "../src/storage";
let vue = new Vue();
let root = process.env.API_ROOT;
/**
 * GET请求,将url和请求参数传入，通过Promise，将成功和失败的数据派发出去
 * @param url
 * @param paramsis
 * @returns {Promise}
 */
export function getHttp(url, params) {
    return new Promise((resolve, reject) => {
        Vue.$loading.show()
        vue.$http({
            url: root + url,
            params: params,
            method: 'GET'
        }).then(rs => {
            resolve(rs.body)
            Vue.$loading.hide()
        }, err => {
            reject(err.bodyText)
            Vue.$loading.hide()
        })
    })
}

/**
 * GET请求,将url和请求参数传入，请求设置授权，通过Promise，将成功和失败的数据派发出去
 * @param url
 * @param params
 * @returns {Promise}
 */
export function getHttpAuth(url, params = {}) {
    return new Promise((resolve, reject) => {
        Vue.$loading.show()
        vue.$http({
            url: root + url,
            params: params,
            headers: {
                authorization: "bearer " + storage.get('token'),
                Accept: 'application/json',
                'group-identify': storage.get('identify') + '',
                'web-identify': storage.get('site') ? storage.get('site').id + '' : ''
            },
            method: 'GET'
        }).then(rs => {
            resolve(rs.body)
            Vue.$loading.hide()
        }, err => {
            reject(err.bodyText)
            Vue.$loading.hide()
        })
    })
}

/**
 * POST请求，将url,请求参数和body传入，通过Promise，将成功和失败的数据派发出去
 * @param url
 * @param params
 * @param body
 * @returns {Promise}
 */
export function postHttp(url, body, params) {
    let that = this;
    return new Promise((resolve, reject) => {
        Vue.$loading.show()
        vue.$http({
            url: root + url,
            params: params,
            body: body,
            headers: {
                Accept: 'application/json',
                'group-identify': storage.get('identify') + '',
                'web-identify': storage.get('site') ? storage.get('site').id + '' : ''
            },
            method: 'POST'
        }).then(rs => {
            resolve(rs.body)
            Vue.$loading.hide()
        }, err => {
            reject(err.bodyText)
            Vue.$loading.hide()
        })
    })
}

/**
 * POST请求，将url,请求参数和body传入，请求设置授权，通过Promise，将成功和失败的数据派发出去
 * @param url
 * @param params
 * @param body
 * @returns {Promise}
 */
export function postHttpAuth(url, body, params) {
    return new Promise((resolve, reject) => {
        Vue.$loading.show()
        vue.$http({
            url: root + url,
            params: params,
            body: body,
            headers: {
                authorization: "bearer " + storage.get('token'),
                Accept: 'application/json',
                'group-identify': storage.get('identify') + '',
                'web-identify': storage.get('site') ? storage.get('site').id + '' : ''
            },
            method: 'POST'
        }).then(rs => {
            resolve(rs.body)
            Vue.$loading.hide()
        }, err => {
            reject(err.bodyText)
            Vue.$loading.hide()
        })
    })
}
