import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API application",
      version: "1.0.0",
      description: "API documentation",
      contact: {
        name: "Kinga Mikołajczyk",
        url: "https://github.com/kingamiko",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
      schemas: {
        Contact: {
          type: "object",
          required: ["name", "email", "phone"],
          properties: {
            name: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
            },
            phone: {
              type: "string",
            },
          },
        },
        User: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "Please enter a valid email address",
            },
            password: {
              type: "string",
              minLength: 6,
              description: "Password must be at least 6 characters",
            },
            avatarURL: {
              type: "string",
              format: "uri",
              example: "https://example.com/avatar.jpg",
            },
          },
        },
        Subscription: {
          type: "object",
          required: ["subscription"],
          properties: {
            subscription: {
              type: "string",
              enum: ["starter", "pro", "business"],
              description: "User subscription type",
            },
          },
        },
      },
    },
  },

  apis: ["./routes/api/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
