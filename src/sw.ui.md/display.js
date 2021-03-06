'use strict';

angular.module('sw.ui.md')
    .factory('display', function ($window) {
        return {
            meta: meta
        };

        function meta (i, url, validatorUrl, download) {
            i.contact = i.contact || {};
            i.license = i.license || {};

            var validatorDebug = (validatorUrl && url) ? (validatorUrl + '/debug?url=' + url) : null;
            var validatorBadge = validatorUrl + '?url=' + url;

            return [
                ['Contact', 'person', (i.contact.name && !i.contact.email) ? i.contact.name : null, null],
                ['Email', 'email', i.contact.email ? (i.contact.name || i.contact.email) : null, 'mailto:' + i.contact.email + '?subject=' + i.title],
                ['License', 'vpn_key', i.license.name || i.license.url, i.license.url],
                ['Terms of service', 'assignment', i.termsOfService, i.termsOfService],
                ['Client registration', 'assignment_ind', i['x-apiClientRegistration'] && i['x-apiClientRegistration'].url, i['x-apiClientRegistration'] && i['x-apiClientRegistration'].url],
                ['Documentation', 'help_outline', i.externalDocs && (i.externalDocs.description || i.externalDocs.url), i.externalDocs && i.externalDocs.url],
                ['Host', 'home', i.scheme + '://' + i.host, i.scheme + '://' + i.host],
                ['Base URL', 'link', i.basePath, (i.scheme ? (i.scheme + '://') : '') + i.host + i.basePath],
                ['API version', 'developer_board', i.version, null],
                ['JSON', 'file_download', 'swagger.json', '#', download],
                ['YAML', 'file_download', $window.jsyaml ? 'swagger.yaml' : null, '#', download],
                ['Origin', 'cloud_download', i['x-origin'] && i['x-origin'].url, i['x-origin'] && i['x-origin'].url],
                [null, 'code', validatorDebug, validatorBadge]
            ];
        }
    });
