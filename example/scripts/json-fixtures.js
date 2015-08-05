window.FIXTURES = {
    "bower_components/appirio-tech-api-schemas/swagger/v3-events.json": {
        "swagger": "2.0",
        "info": {
                "description": "",
                "version": "",
                "title": ""
        },
        "host": "api.topcoder-dev.com",
        "basePath": "/v3/events",
        "schemes": [
                "https"
        ],
        "produces": [
                "application/json"
        ],
        "paths": {
                "": {
                        "get": {
                                "responses": {
                                        "200": {
                                                "schema": {
                                                        "type": "object",
                                                        "items": {
                                                                "$ref": "#/definitions/Event"
                                                        }
                                                }
                                        },
                                        "default": {
                                                "description": "Unexpected error",
                                                "schema": {
                                                        "$ref": "#/definitions/Error"
                                                }
                                        }
                                }
                        }
                }
        },
        "definitions": {
                "Event": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "result": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/EventResult"
                                        }
                                }
                        }
                },
                "EventResult": {
                        "properties": {
                                "content": {
                                        "type": "array",
                                        "items": {
                                                "$ref": "#/definitions/EventContent"
                                        }
                                }
                        }
                },
                "EventContent": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "createdBy": {
                                        "type": "string"
                                },
                                "createdAt": {
                                        "type": "string",
                                        "sample": "2015-05-05T20:53:41.467Z"
                                },
                                "sourceObjectType": {
                                        "type": "string",
                                        "enum": [
                                                "app-work-requests",
                                                "challengedata"
                                        ]
                                },
                                "sourceObjectId": {
                                        "type": "string"
                                },
                                "eventSubType": {
                                        "type": "string",
                                        "enum": [
                                                "copilot-assigned",
                                                "created",
                                                "submitted",
                                                "quote-created",
                                                "work-estimate-approved",
                                                "email-verified",
                                                "payment-accepted",
                                                "challenge-feedback-provided",
                                                "Submission",
                                                "Registration",
                                                "challenge-finalists-selected",
                                                "state-change",
                                                "work-project-launched",
                                                "checkpoint1",
                                                "finalists",
                                                "final-design",
                                                "winner",
                                                "final-feedback",
                                                "completed"
                                        ]
                                },
                                "eventType": {
                                        "type": "string",
                                        "enum": [
                                                "timeline"
                                        ]
                                },
                                "sourceObjectContent": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/SourceObjectContent"
                                        }
                                },
                                "fieldChanges": {
                                        "type": "string"
                                }
                        }
                },
                "SourceObjectContent": {
                        "properties": {
                                "version": {
                                        "type": "number"
                                },
                                "id": {
                                        "type": "string"
                                },
                                "modifiedBy": {
                                        "type": "string"
                                },
                                "modifiedAt": {
                                        "type": "string"
                                },
                                "createdBy": {
                                        "type": "string"
                                },
                                "createdAt": {
                                        "type": "number",
                                        "sample": 1427467795351
                                },
                                "name": {
                                        "type": "string"
                                },
                                "summary": {
                                        "type": "string"
                                },
                                "requestType": {
                                        "type": "string"
                                },
                                "ownerId": {
                                        "type": "string"
                                },
                                "competitorApps": {
                                        "type": "array",
                                        "sample": [
                                                "comp 0",
                                                "comp 1",
                                                "comp 2",
                                                "comp 3"
                                        ]
                                },
                                "usageDescription": {
                                        "type": "string"
                                },
                                "features": {
                                        "type": "array",
                                        "sample": [
                                                {
                                                        "name": "feature 1",
                                                        "description": "description 1"
                                                },
                                                {
                                                        "name": "feature 2",
                                                        "description": "description 2"
                                                }
                                        ]
                                },
                                "costEstimate": {
                                        "type": "object",
                                        "sample": {
                                                "low": "3600",
                                                "high": "4400"
                                        }
                                },
                                "status": {
                                        "type": "string"
                                },
                                "statusNotes": {
                                        "type": "string"
                                },
                                "copilotId": {
                                        "type": "string",
                                        "sample": "Batman9000"
                                },
                                "quotedAmount": {
                                        "type": "string",
                                        "sample": "$2000"
                                },
                                "challengeId": {
                                        "type": "string"
                                },
                                "tcDirectId": {
                                        "type": "string"
                                },
                                "registrants": {
                                        "type": "array",
                                        "sample": [
                                                {
                                                        "handle": "exampleHandle"
                                                }
                                        ]
                                },
                                "submissions": {
                                        "type": "array",
                                        "sample": [
                                                {
                                                        "submissionId": "1234"
                                                }
                                        ]
                                },
                                "phase": {
                                        "type": "string"
                                },
                                "phaseStatus": {
                                        "type": "string"
                                },
                                "userId": {
                                        "type": "string"
                                },
                                "workRequestId": {
                                        "type": "string"
                                }
                        }
                },
                "Error": {
                        "properties": {
                                "code": {
                                        "type": "integer",
                                        "format": "int32"
                                },
                                "message": {
                                        "type": "string"
                                },
                                "fields": {
                                        "type": "string"
                                }
                        }
                }
        }
},
    "bower_components/appirio-tech-api-schemas/swagger/v2.json": {
        "swagger": "2.0",
        "info": {
                "description": "Move your app forward with the Uber API",
                "version": "1.0.0",
                "title": "Uber API"
        },
        "host": "api.topcoder-dev.com",
        "basePath": "/v2",
        "schemes": [
                "https"
        ],
        "produces": [
                "application/json"
        ],
        "paths": {
                "/users/{handle}": {
                        "get": {
                                "responses": {
                                        "200": {
                                                "schema": {
                                                        "type": "object",
                                                        "items": {
                                                                "$ref": "#/definitions/User"
                                                        }
                                                }
                                        },
                                        "default": {
                                                "description": "Unexpected error",
                                                "schema": {
                                                        "$ref": "#/definitions/Error"
                                                }
                                        }
                                }
                        }
                }
        },
        "definitions": {
                "User": {
                        "properties": {
                                "handle": {
                                        "type": "string",
                                        "sample": "CardioBoy"
                                },
                                "country": {
                                        "type": "string",
                                        "sample": "Idonesia"
                                },
                                "memberSince": {
                                        "type": "string",
                                        "sample": "2008-10-15T05:08:00.000-0400"
                                },
                                "quote": {
                                        "type": "string",
                                        "sample": "Don't forget your roots."
                                },
                                "photoLink": {
                                        "type": "string",
                                        "sample": "/i/m/cardiboy_big.jpg"
                                }
                        }
                }
        }
},
    "bower_components/appirio-tech-api-schemas/swagger/v3-messages.json": {
        "swagger": "2.0",
        "info": {
                "description": "",
                "version": "",
                "title": ""
        },
        "host": "api.topcoder-dev.com",
        "basePath": "/v3/messages",
        "schemes": [
                "https"
        ],
        "produces": [
                "application/json"
        ],
        "paths": {
                "": {
                        "post": {
                                "responses": {
                                        "200": {
                                                "schema": {
                                                        "type": "object",
                                                        "items": {
                                                                "$ref": "#/definitions/MessagePost"
                                                        }
                                                }
                                        },
                                        "default": {
                                                "description": "Unexpected error",
                                                "schema": {
                                                        "$ref": "#/definitions/Error"
                                                }
                                        }
                                }
                        }
                },
                "/{id}": {
                        "put": {
                                "responses": {
                                        "200": {
                                                "schema": {
                                                        "type": "object",
                                                        "items": {
                                                                "$ref": "#/definitions/MessagePut"
                                                        }
                                                }
                                        },
                                        "default": {
                                                "description": "Unexpected error",
                                                "schema": {
                                                        "$ref": "#/definitions/Error"
                                                }
                                        }
                                },
                                "post": {
                                        "responses": {
                                                "200": {
                                                        "schema": {
                                                                "type": "object",
                                                                "items": {
                                                                        "$ref": "#/definitions/Message"
                                                                }
                                                        }
                                                },
                                                "default": {
                                                        "description": "Unexpected error",
                                                        "schema": {
                                                                "$ref": "#/definitions/Error"
                                                        }
                                                }
                                        }
                                }
                        }
                }
        },
        "definitions": {
                "MessagePut": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "result": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/MessagePutResult"
                                        }
                                }
                        }
                },
                "MessagePutResult": {
                        "properties": {
                                "success": {
                                        "type": "boolean",
                                        "sample": true
                                },
                                "status": {
                                        "type": "integer",
                                        "sample": 200
                                },
                                "content": {
                                        "type": "null"
                                }
                        }
                },
                "MessagePost": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "result": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/MessagePostResult"
                                        }
                                }
                        }
                },
                "MessagePostResult": {
                        "properties": {
                                "success": {
                                        "type": "boolean",
                                        "sample": true
                                },
                                "status": {
                                        "type": "integer",
                                        "sample": 200
                                },
                                "content": {
                                        "type": "array",
                                        "items": {
                                                "$ref": "#/definitions/MessagePostContent"
                                        }
                                }
                        }
                },
                "MessagePostContent": {
                        "properties": {
                                "threadId": {
                                        "type": "string"
                                },
                                "publisherId": {
                                        "type": "string"
                                },
                                "body": {
                                        "type": "string",
                                        "sample": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                },
                                "attachments": {
                                        "type": "array:",
                                        "items": {
                                                "$ref": "#/definitions/Attachment"
                                        }
                                }
                        }
                },
                "Attachment": {
                        "properties": {
                                "attachmentId": {
                                        "type": "string"
                                },
                                "name": {
                                        "type": "string"
                                },
                                "thumbUrl": {
                                        "type": "string"
                                },
                                "originalUrl": {
                                        "type": "string"
                                }
                        }
                },
                "Error": {
                        "properties": {
                                "code": {
                                        "type": "integer",
                                        "format": "int32"
                                },
                                "message": {
                                        "type": "string"
                                },
                                "fields": {
                                        "type": "string"
                                }
                        }
                }
        }
},
    "bower_components/appirio-tech-api-schemas/swagger/v3-threads.json": {
        "swagger": "2.0",
        "info": {
                "description": "",
                "version": "",
                "title": ""
        },
        "host": "api.topcoder-dev.com",
        "basePath": "/v3/threads",
        "schemes": [
                "https"
        ],
        "produces": [
                "application/json"
        ],
        "paths": {
                "": {
                        "get": {
                                "responses": {
                                        "200": {
                                                "schema": {
                                                        "type": "object",
                                                        "items": {
                                                                "$ref": "#/definitions/ThreadWrapper"
                                                        }
                                                }
                                        },
                                        "default": {
                                                "description": "Unexpected error",
                                                "schema": {
                                                        "$ref": "#/definitions/Error"
                                                }
                                        }
                                }
                        },
                        "post": {
                                "responses": {
                                        "200": {
                                                "schema": {
                                                        "type": "object",
                                                        "items": {
                                                                "$ref": "#/definitions/ThreadPostWrapper"
                                                        }
                                                }
                                        },
                                        "default": {
                                                "description": "Unexpected error",
                                                "schema": {
                                                        "$ref": "#/definitions/Error"
                                                }
                                        }
                                }
                        }
                },
                "/{id}": {
                        "get": {
                                "responses": {
                                        "200": {
                                                "schema": {
                                                        "type": "object",
                                                        "items": {
                                                                "$ref": "#/definitions/ThreadShowWrapper"
                                                        }
                                                }
                                        },
                                        "default": {
                                                "description": "Unexpected error",
                                                "schema": {
                                                        "$ref": "#/definitions/Error"
                                                }
                                        }
                                }
                        }
                }
        },
        "definitions": {
                "ThreadShowWrapper": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "result": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/ThreadShowResult"
                                        }
                                }
                        }
                },
                "ThreadShowResult": {
                        "properties": {
                                "success": {
                                        "type": "boolean",
                                        "sample": true
                                },
                                "status": {
                                        "type": "integer",
                                        "sample": 200
                                },
                                "content": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/ThreadShowContent"
                                        }
                                }
                        }
                },
                "ThreadShowContent": {
                        "properties": {
                                "unreadCount": {
                                        "type": "number"
                                },
                                "subject": {
                                        "type": "string",
                                        "sample": "NASA - DTN Dashboard winner"
                                },
                                "messages": {
                                        "type": "array",
                                        "items": {
                                                "$ref": "#/definitions/Message"
                                        }
                                }
                        }
                },
                "ThreadPostWrapper": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "result": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/ThreadPostResult"
                                        }
                                }
                        }
                },
                "ThreadPostResult": {
                        "properties": {
                                "success": {
                                        "type": "boolean",
                                        "sample": true
                                },
                                "status": {
                                        "type": "integer",
                                        "sample": 200
                                },
                                "content": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/ThreadPostContent"
                                        }
                                }
                        }
                },
                "ThreadPostContent": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                }
                        }
                },
                "ThreadWrapper": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "result": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/ThreadResult"
                                        }
                                }
                        }
                },
                "ThreadResult": {
                        "properties": {
                                "success": {
                                        "type": "boolean",
                                        "sample": true
                                },
                                "status": {
                                        "type": "integer",
                                        "sample": 200
                                },
                                "content": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/ThreadContent"
                                        }
                                }
                        }
                },
                "ThreadContent": {
                        "properties": {
                                "unreadCount": {
                                        "type": "number"
                                },
                                "threads": {
                                        "type": "array",
                                        "items": {
                                                "$ref": "#/definitions/Thread"
                                        }
                                }
                        }
                },
                "Thread": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "unreadCount": {
                                        "type": "number"
                                },
                                "subject": {
                                        "type": "string",
                                        "sample": "NASA - DTN Dashboard winner"
                                },
                                "messages": {
                                        "type": "array",
                                        "items": {
                                                "$ref": "#/definitions/Message"
                                        }
                                }
                        }
                },
                "Message": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "threadId": {
                                        "type": "string"
                                },
                                "body": {
                                        "type": "string",
                                        "sample": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                },
                                "createdAt": {
                                        "type": "string",
                                        "sample": "2015-05-05T20:53:41.467Z"
                                },
                                "publisherId": {
                                        "type": "string",
                                        "sample": "Batman"
                                },
                                "read": {
                                        "type": "boolean"
                                },
                                "attachments": {
                                        "type": "array:",
                                        "items": {
                                                "$ref": "#/definitions/Attachment"
                                        }
                                }
                        }
                },
                "Error": {
                        "properties": {
                                "code": {
                                        "type": "integer",
                                        "format": "int32"
                                },
                                "thread": {
                                        "type": "string"
                                },
                                "fields": {
                                        "type": "string"
                                }
                        }
                }
        }
},
    "bower_components/appirio-tech-api-schemas/swagger/v3-users.json": {
        "swagger": "2.0",
        "info": {
                "description": "",
                "version": "",
                "title": ""
        },
        "host": "api.topcoder-dev.com",
        "basePath": "/v3/users",
        "schemes": [
                "https"
        ],
        "produces": [
                "application/json"
        ],
        "paths": {
                "": {
                        "post": {
                                "responses": {
                                        "200": {
                                                "schema": {
                                                        "type": "object",
                                                        "items": {
                                                                "$ref": "#/definitions/User"
                                                        }
                                                }
                                        },
                                        "default": {
                                                "description": "Unexpected error",
                                                "schema": {
                                                        "$ref": "#/definitions/Error"
                                                }
                                        }
                                }
                        }
                },
                "/{id}": {
                        "get": {
                                "responses": {
                                        "200": {
                                                "schema": {
                                                        "type": "object",
                                                        "items": {
                                                                "$ref": "#/definitions/User"
                                                        }
                                                }
                                        },
                                        "default": {
                                                "description": "Unexpected error",
                                                "schema": {
                                                        "$ref": "#/definitions/Error"
                                                }
                                        }
                                }
                        }
                }
        },
        "definitions": {
                "User": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "result": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/UserResult"
                                        }
                                }
                        }
                },
                "UserResult": {
                        "properties": {
                                "success": {
                                        "type": "boolean",
                                        "sample": true
                                },
                                "status": {
                                        "type": "integer",
                                        "sample": 200
                                },
                                "content": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/UserContent"
                                        }
                                }
                        }
                },
                "UserContent": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "firstName": {
                                        "type": "string"
                                },
                                "handle": {
                                        "type": "string"
                                },
                                "credential": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/Credential"
                                        }
                                }
                        }
                },
                "Credential": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "modifiedBy": {
                                        "type": "string"
                                },
                                "modifiedAt": {
                                        "type": "string"
                                },
                                "createdBy": {
                                        "type": "string"
                                },
                                "createdAt": {
                                        "type": "string"
                                },
                                "activationCode": {
                                        "type": "string",
                                        "sample": "13IOV95OEJQ"
                                },
                                "resetToken": {
                                        "type": "null"
                                }
                        }
                },
                "Error": {
                        "properties": {
                                "code": {
                                        "type": "integer",
                                        "format": "int32"
                                },
                                "message": {
                                        "type": "string"
                                },
                                "fields": {
                                        "type": "string"
                                }
                        }
                }
        }
},
    "bower_components/appirio-tech-api-schemas/swagger/v3-submissions.json": {
        "swagger": "2.0",
        "info": {
                "description": "",
                "version": "",
                "title": ""
        },
        "host": "api.topcoder-dev.com",
        "basePath": "/v3/projects",
        "schemes": [
                "https"
        ],
        "produces": [
                "application/json"
        ],
        "paths": {
                "/{id}/submissions": {
                        "get": {
                                "responses": {
                                        "200": {
                                                "schema": {
                                                        "type": "object",
                                                        "items": {
                                                                "$ref": "#/definitions/SubmissionsWrapper"
                                                        }
                                                }
                                        },
                                        "default": {
                                                "description": "Unexpected error",
                                                "schema": {
                                                        "$ref": "#/definitions/Error"
                                                }
                                        }
                                }
                        }
                },
                "/{id}/submissions/{submission_id}": {
                        "get": {
                                "responses": {
                                        "200": {
                                                "schema": {
                                                        "type": "object",
                                                        "items": {
                                                                "$ref": "#/definitions/SubmissionsDetailWrapper"
                                                        }
                                                }
                                        },
                                        "default": {
                                                "description": "Unexpected error",
                                                "schema": {
                                                        "$ref": "#/definitions/Error"
                                                }
                                        }
                                }
                        }
                }
        },
        "definitions": {
                "SubmissionsWrapper": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "result": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/SubmissionsResult"
                                        }
                                }
                        }
                },
                "SubmissionsDetailWrapper": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "result": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/SubmissionsDetailResult"
                                        }
                                }
                        }
                },
                "SubmissionsResult": {
                        "properties": {
                                "success": {
                                        "type": "boolean",
                                        "sample": true
                                },
                                "status": {
                                        "type": "integer",
                                        "sample": 200
                                },
                                "content": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/SubmissionsContent"
                                        }
                                }
                        }
                },
                "SubmissionsDetailResult": {
                        "properties": {
                                "success": {
                                        "type": "boolean",
                                        "sample": true
                                },
                                "status": {
                                        "type": "integer",
                                        "sample": 200
                                },
                                "content": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/Submission"
                                        }
                                }
                        }
                },
                "SubmissionsContent": {
                        "properties": {
                                "workName": {
                                        "type": "string",
                                        "sample": "IBM Internal HR"
                                },
                                "workType": {
                                        "type": "string",
                                        "sample": "mobile app"
                                },
                                "finalSubmissionStartDate": {
                                        "type": "string",
                                        "sample": "2015-05-05T20:53:41.467Z"
                                },
                                "screeningSubmissions": {
                                        "type": "array",
                                        "items": {
                                                "$ref": "#/definitions/Submission"
                                        }
                                }
                        }
                },
                "Submission": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "submitter": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/Submitter"
                                        }
                                },
                                "accepted": {
                                        "type": "boolean"
                                },
                                "createdAt": {
                                        "type": "string",
                                        "sample": "2015-05-05T20:53:41.467Z"
                                },
                                "files": {
                                        "type": "array",
                                        "items": {
                                                "$ref": "#/definitions/File"
                                        }
                                }
                        }
                },
                "Submitter": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "handle": {
                                        "type": "string",
                                        "sample": "Darth Vador"
                                },
                                "avatarUrl": {
                                        "type": "string",
                                        "sample": "http://www.krowmark.com/wp/wp-content/uploads/2015/05/Darth-Vader-darth-vader-18734783-300-355.jpg"
                                }
                        }
                },
                "File": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "name": {
                                        "type": "string",
                                        "sample": "luke-i-m-your-father.jpg"
                                },
                                "accepted": {
                                        "type": "boolean"
                                },
                                "thumbnailUrl": {
                                        "type": "string",
                                        "sample": "https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"
                                },
                                "url": {
                                        "type": "string",
                                        "sample": "https://i.kinja-img.com/gawker-media/image/upload/raoq6i3zhiq78kigjuam.jpg"
                                }
                        }
                },
                "Error": {
                        "properties": {
                                "code": {
                                        "type": "integer",
                                        "format": "int32"
                                },
                                "message": {
                                        "type": "string"
                                },
                                "fields": {
                                        "type": "string"
                                }
                        }
                }
        }
}
};