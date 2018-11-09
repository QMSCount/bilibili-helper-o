/**
 * Author: DrowsyFlesh
 * Create: 2018/10/23
 * Description:
 */

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {ToolBtn} from 'Components';
import {UI} from 'Libs/UI.js';

export class VideoUI extends UI {
    constructor() {
        super({
            name: 'video',
        });
    }

    load = () => {
        return new Promise(resolve => {
            const containerSelectors = [
                '#bangumi_detail .func-module',
                '#arc_toolbar_report .ops',
                //'.video-info .video-title',
                '#arc_toolbar_report',
            ];
            const newPage = $('.video-data');
            const addUI = (container) => {
                const helperDOM = $('<span class="bilibili-helper" title="哔哩哔哩助手"/>');
                container.append(helperDOM);
                ReactDOM.render(<ToolBtn/>, container.find('.bilibili-helper')[0], () => {
                    const helperContentDOM = helperDOM.find('.bilibili-helper-content');
                    resolve(helperContentDOM);
                });
            }
            if (newPage.length > 0) { // 新页面要先判断b站代码是否跑完
                const retryMax = 10;
                let retryTime = 0;
                let timer = setInterval(() => {
                    if (retryTime > retryMax) {
                        clearInterval(timer);
                        return console.error(`title for view has not changed!`);
                    }
                    const title = newPage.find('.view').attr('title');
                    if (title !== '总播放数--') {
                        clearInterval(timer);
                        const container = $('#arc_toolbar_report .ops');
                        addUI(container);
                    } else ++retryTime;
                }, 500);
            } else { // 老的番剧页面
                this.observer(containerSelectors).then(addUI);
            }
        });
    };
};

//export const Video = defineGUI([], ([], options) => {
//    return new Promise (resolve => {
//        const {on, container, name} = options;
//        if (on) {
//            const helperDOM = $('<span class="bilibili-helper" title="哔哩哔哩助手"/>');
//            container.append(helperDOM);
//            ReactDOM.render(<ToolBtn/>, container.find('.bilibili-helper')[0], () => {
//                const container = $('<div/>').addClass(`bilibili-helper-${name}-wrapper`);
//                const helperContentDOM = helperDOM.find('.bilibili-helper-content');
//                helperContentDOM.append(container);
//                resolve(container);
//            });
//        }
//    });
//
//});