/* eslint-env node */
var path = require('path');

module.exports = function (config) {

    var filesCollection = [
        'node_modules/lodash/index.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-ui-bootstrap/ui-bootstrap.js',
        'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js',
        'node_modules/socket.io-client/socket.io.js',
        'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-material/angular-material.min.js',
        'node_modules//ng-tags-input/build/ng-tags-input.min.js',
        'node_modules/sinon/pkg/sinon.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min.js',
        'browser/**/*.html',
        'public/main.js',
        'tests/browser/**/*.js'
    ];

    if (process.env.NODE_ENV === 'testing') {
        // declares global variable window.TESTING to true
        filesCollection.unshift('tests/browser/globals.js');
    }

    var excludeFiles = [
        'tests/browser/karma.conf.js'
    ];

    var configObj = {
        browsers: ['Chrome'],
        frameworks: ['mocha', 'chai'],
        basePath: path.join(__dirname, '../../'),
        files: filesCollection,
        exclude: excludeFiles,
        reporters: ['mocha', 'coverage'],
        preprocessors: {
            'browser/**/*.html': ['ng-html2js'],
            'public/main.js': 'coverage'
        },
        coverageReporter: {
            dir: 'coverage/browser/',
            reporters: [{
                type: 'text',
                subdir: '.'
            }, {
                type: 'html',
                subdir: '.'
            }]
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: 'browser/',
            moduleName: 'karmaTemplates'
        }
    };

    config.set(configObj);

};
