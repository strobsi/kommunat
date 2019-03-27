module.exports = {
    contentSchema: function () {
        return {
            "id": "/Content",
            "properties": {
              "metadata": {
                "type": "object",
                "properties": {
                  "isCandidate": {
                    "type": "boolean"
                  },
                  "started": {
                    "type": "integer"
                  },
                  "finished": {
                    "type": "integer"
                  },
                  "decisions": {
                    "type": "integer"
                  }
                },
                "required": [
                  "isCandidate",
                  "started",
                  "finished",
                  "decisions"
                ]
              },
              "contents": {
                "type": "array",
                "items": [
                  {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "integer"
                      },
                      "name": {
                        "type": "string"
                      },
                      "rating": {
                        "type": "integer"
                      }
                    },
                    "required": [
                      "id",
                      "name",
                      "rating"
                    ]
                  }
                ]
              }
            },
            "required": [
              "metadata",
              "contents"
            ]
          };
    },
    contentSchemaExisting: function() {
        return {
          "id": "/ContentSchemaExisting",
        }
    },
    valueSchemaExisting: function() {
        return {
        "id": "/ValueSchemaExisting",
        "type": "object",
        "properties": {
          "metadata": {
            "type": "object",
            "properties": {
              "isCandidate": {
                "type": "boolean"
              },
              "started": {
                "type": "integer"
              },
              "finished": {
                "type": "integer"
              },
              "decisions": {
                "type": "integer"
              },
              "uuid": {
                "type": "string"
              }
            },
            "required": [
              "isCandidate",
              "started",
              "finished",
              "decisions",
              "uuid"
            ]
          },
          "contents": {
            "type": "array",
            "items": [
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              }
            ]
          },
          "candidate": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "birthdate": {
                "type": "string"
              },
              "list": {
                "type": "string"
              },
              "list_number": {
                "type": "string"
              },
              "district": {
                "type": "string"
              }
            },
            "required": [
              "name",
              "birthdate",
              "list",
              "list_number",
              "district"
            ]
          },
          "values": {
            "type": "array",
            "items": [
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "name": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "integer"
                  }
                },
                "required": [
                  "id",
                  "name",
                  "rating"
                ]
              }
            ]
          }
        },
        "required": [
          "metadata",
          "contents",
          "candidate",
          "values"
        ]
      }
    },
    valueSchema: function () {
        return {
            "id": "/Value",
            "properties": {
              "metadata": {
                "type": "object",
                "properties": {
                  "isCandidate": {
                    "type": "boolean"
                  },
                  "started": {
                    "type": "integer"
                  },
                  "finished": {
                    "type": "integer"
                  },
                  "decisions": {
                    "type": "integer"
                  }
                },
                "required": [
                  "isCandidate",
                  "started",
                  "finished",
                  "decisions"
                ]
              },
              "values": {
                "type": "array",
                "items": [
                  {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "integer"
                      },
                      "name": {
                        "type": "string"
                      },
                      "rating": {
                        "type": "integer"
                      }
                    },
                    "required": [
                      "id",
                      "name",
                      "rating"
                    ]
                  }
                ]
              }
            },
            "required": [
              "metadata",
              "values"
            ]
          };
    },
    eventSchema: function() {
        return {
        "id": "/Event",
        "type": "array",
        "items": [
            {
            "type": "object",
            "properties": {
                "title": {
                "type": "string"
                },
                "location": {
                "type": "string"
                },
                "startDate": {
                "type": "string"
                },
                "endDate": {
                "type": "string"
                }
            },
            "required": [
                "title",
                "location",
                "startDate",
                "endDate"
            ]
            }
        ]
        }
    },
    eventSchemaNew: function() {
        return {
        "id": "/EventNew",
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          },
          "location": {
            "type": "string"
          },
          "startDate": {
            "type": "string"
          },
          "endDate": {
            "type": "string"
          }
        },
        "required": [
          "title",
          "location",
          "startDate",
          "endDate"
        ]
      }
    },
    profileSchema: function() {
        return {
        "id":"/Profile",
        "type": "object",
        "properties": {
            "phone": {
            "type": "string"
            },
            "birthdate": {
            "type": "string"
            },
            "list": {
            "type": "string"
            },
            "list_number": {
            "type": "string"
            },
            "district": {
            "type": "string"
            }
        },
        "required": [
            "phone",
            "birthdate",
            "list",
            "list_number",
            "district"
        ]
        }
    }
  };