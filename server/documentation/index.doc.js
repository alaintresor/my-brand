const { Router } = require('express');
const { serve, setup } = require('swagger-ui-express');

const docrouter = Router();

const local = process.env.LOCAL_HOST;
const heroku = process.env.DB_CONNECT;


const options = {
  openapi: '3.0.1',
  info: {
    title: 'My Brand',
    version: '1.0.0',
    description:
      'This is the backend api for my portfolio app.',
  },
  host: process.env === 'production' ? heroku : local,
  basePath: '/api',
  securityDefinitions: {
    ApiKeyAuth:{
        type: "apiKey",
        name: "Authorization",
        in: "header"
    }
},
  // apis: ['./routes/*.js'],
  tags: [
    //   {name: 'Users', description: 'Users'}
    ],
  paths: {
    '/api/users/register': {
      post: {
        tags: ['Users'],
        description: 'User register',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                username: 'John Doe',
                email: 'john.doe@gmail.com',
                password: 'Password@2022',
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'New User was created successfully',
          },
          400: {
            description: 'Bad Request',
          },
          500: {
              description: 'Internal Server Error'
          }
        },
      },
    },
    '/api/users/login': {
        post: {
        tags: ['Users'],
        description: 'User login',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                email: 'john.doe@gmail.com',
                password: 'Password@2022',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'successfully',
          },
          400: {
            description: 'Invalid credation',
          },
          500: {
              description: 'Internal Server Error'
          }
        }, 
        } 
    },
    '/api/article/': {
        get: {
        tags: ['Blog'],
        description: 'Get All Blog Articles',
        parameters: [],
        responses: {
          200: {
            description: 'successfully',
          },
          500: {
              description: 'Internal Server Error'
          }
        }, 
      } 
    },
    '/api/article/{id}': {
      get: {
        security:{
          bearerAuth:[]
        },
      tags: ['Blog'],
      description: 'Get One Blog article by id',
      parameters: [
        {
           "in": "path",
         "name": "id",
          required: true,
        }
      ],
      responses: {
        200: {
          description: 'successfully',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
      } 
  },
  '/api/article/add':{
    post:{
      security:
        {ApiKeyAuth: []}
      ,
      tags:['Blog'],
      description:'Create new blog article',
      parameters:[
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Blog',
            },
            example: {
              title: 'testing blog article title',
              content: 'testing blog article content',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'User Not Authorized',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
    }
  }
  },
  components: {
    schemas: {
      User: {
        type: 'object',

        properties: {
          id: {
            type: 'string',
            description: 'The auto-generated id of the user',
          },
          username: {
            type: 'string',
            description: "User's names",
          },
          password: {
            type: 'string',
            description: "User's password",
          },
          email: {
            type: 'string',
            description: "User's email",
          },
          role: {
            type: 'string',
            description: "User role",
          },
        },
      },
      Blog: {
        type: 'object',

        properties: {
          id: {
            type: 'string',
            description: 'The auto-generated id of the user',
          },
          title: {
            type: 'string',
            description: "Article title",
          },
          content: {
            type: 'string',
            description: "Article content",
          },
          imageUrl: {
            type: 'string',
            description: "Article image url",
          },
          postedDate: {
            type: 'string',
            description: "Article posted date ",
          },
          comments: {
            type: 'object',
            description: "Article Comments",
          },
          likes: {
            type: 'object',
            description: "Article likes",
          },
      },
     },
    },
  },
};


docrouter.use('/', serve, setup(options));

module.exports = docrouter;