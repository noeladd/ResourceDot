'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');
var Promise = require('bluebird');
var db = require('../_db');
var Tag = require('./tag.js')

module.exports = db.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING
    },
    twitter_id: {
        type: Sequelize.STRING
    },
    facebook_id: {
        type: Sequelize.STRING
    },
    google_id: {
        type: Sequelize.STRING
    },
    github_id: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    picture: {
        type: Sequelize.STRING,
        defaultValue: 'http://lorempixel.com/150/150/abstract'
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    instanceMethods: {
        sanitize: function () {
            return _.omit(this.toJSON(), ['password', 'salt']);
        },
        correctPassword: function (candidatePassword) {
            return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
        }
    },
    classMethods: {
        generateSalt: function () {
            return crypto.randomBytes(16).toString('base64');
        },
        encryptPassword: function (plainText, salt) {
            var hash = crypto.createHash('sha1');
            hash.update(plainText);
            hash.update(salt);
            return hash.digest('hex');
        },
        findByTag: function (tagIds) {
            return Promise.map(tagIds, function(tag) {
                return Tag.findById(+tag);
            })
            .then(function(tagInstances) {
                return Promise.map(tagInstances, function(tag) {
                    return tag.getUsers({include: [
                        {model: Tag }
                    ]});
                })
            })
            .then(function(users) {
              var allUsers = users.reduce(function(a, b) {
                return a.concat(b);
              })
              return allUsers;
            })
        }
    },
    hooks: {
        beforeCreate: setSaltAndPassword,
        beforeUpdate: setSaltAndPassword
    }
});

function setSaltAndPassword(user) {
    if (user.changed('password')) {
        user.salt = user.Model.generateSalt();
        user.password = user.Model.encryptPassword(user.password, user.salt);
    }
}
