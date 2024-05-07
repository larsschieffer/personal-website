---
title:
  "Building Scalable Applications: A Journey through Layered Serverless
  Architecture"
published: 2023-12-31
summary:
  "Explore Serverless Architecture with the Architect Framework - Learn How to
  Implement Layered Design for Efficient and Scalable Applications."
thumbnail: /blog/thumbnails/cloud-architecture-serverless.webp
---

Foremost, I really like serverless. It makes sense to always provide the
required computing power. Having worked several years on enterprise applications
using Spring Boot, I understand the benefits of strict separation of concerns.
Therefore, this blog post is all about merging those principles with the idea of
serverless functions.

## Goals for the architecture

Before starting to implement any solution, I considered what I aim to achieve
with the architecture:

- Utilizing Amazon Web Services (AWS)
- Ensuring Lambda functions have a small package size
  ([AWS Lambda best practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html))
- Adopting a layered architecture to maintain separation of concerns
- Possible local development

My proficiency with AWS stems from my **AWS Certified Developer - Associate**
certification. Additionally, the template should be technology-agnostic. It
should facilitate easy switching between database technologies (SQL vs. NoSQL).
Moreover, the architecture should allow transitioning from serverless functions
to containers or on-premises servers as needed.

### [@architecture](https://arc.codes/docs/en/get-started/quickstart) package

I discovered the Architect framework through the
[Grunge Stack](https://github.com/remix-run/grunge-stack) from the Remix
framework. I was intrigued by the possibility of integrating it into future
Remix projects and impressed by the ease of creating, testing locally, and
deploying multiple Lambda functions. Consequently, I chose to utilize it for
this example template. Given that the application is structured in multiple
layers, transitioning to other frameworks like
[serverless](https://www.serverless.com/framework) is straightforward. For a
preliminary understanding of the framework, the
[quickstart](https://arc.codes/docs/en/get-started/quickstart) guide is a useful
resource.

## The architecture

The following sections contain how to build a layered architecture with
separation of concerns in mind. You can access the source code
[here](https://github.com/larsschieffer/crud-lambda-dynamodb). In addition to
the code described in this post, it includes all the remaining operations.

### Folder Structure

But first, let's talk about the folder structure.

```sh
$ tree src
src
├── http
│   ├── get-users-000id
│   │   └── index.ts
└── shared
  ├── common
  │   ├── error.test.ts
  │   └── error.ts
  ├── index.ts
  └── user
      ├── user-model.ts
      ├── user-repository.test.ts
      ├── user-repository.ts
      ├── user-service.test.ts
      └── user-service.ts
```

This project uses the defaults provided by the `@architecture` package. Lambda
functions are located in the `src/http` folder. Shared code is found within
`src/shared`. Adopting a **package-by-feature** approach results in the
following structure. Global error handling is centralized in
`src/shared/common`, while the distinct layers for the example feature are
organized under `src/shared/user`.

### The single layers

The core principle of a layered architecture is to divide the handling of a
request across multiple layers rather than in a single function. A request
typically traverses through the layers in this sequence: Controller -> Service
-> Repository -> Database. Each layer interacts exclusively with its immediate
successor, ensuring, for example, that a controller only interacts with the
service layer, not directly with the repository layer.

- **The Database Layer**. Typically managed by a third-party vendor such as
  Postgres, DynamoDB, or SQLite, the database layer is accessible through the
  repository layer for processing query requests.

- **The Repository Layer**. This layer facilitates access to the database layer
  without exposing the specifics of the underlying database structure. Firstly,
  it enables optimization of individual database queries for enhanced
  performance, without the need to locate all references throughout the
  application. Secondly, it decouples business logic from the specific database
  architecture (SQL vs. NoSQL), allowing to change database servers if needed.

- **The Service Layer**. This is where things become more complex. The service
  layer encompasses all necessary business logic, ranging from input validation
  and data manipulation to output sanitization. All these operations are
  executed here. The advantage of the layered architecture comes to shine, due
  to its independence of its environment. It doesn't matter if it is run
  serverless or not, or the type of database used.

- **The Controller Layer**. This final (or initial) layer enables external
  access to the service layer. I prefer my controllers to be simple. They
  shouldn't have any complex logic, not even branching. Their main purposes are
  handling header values, query parameters, and parsing body parameters.

### The database layer - DynamoDB

The process is quite straightforward. You only need to know the API of DynamoDB.
A great starting point is the
[AWS SDK for DynamoDB](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/dynamodb/).
Below is a configuration for the Architect framework that sets up a DynamoDB
table. This table stores users, utilizing an `id` as the partition key and
including their associated name.

```arc
@tables
users
  id *String
  name String
```

### The repository layer - TypeScript

Let's start with the implementation. You can either use the SDK from Amazon, as
mentioned in the previous layer, or the already implemented functions from the
Architect framework. Below is an example implementation:

```ts
import { randomUUID } from "crypto";
import type { User } from "./user-model";
import { tables } from "@architect/functions";
import type { ArcTable } from "@architect/functions/types/tables";

async function tableOperations(): Promise<ArcTable<User>> {
  const { users } = await tables();

  return users;
}

export async function findUserEntryById(id: string): Promise<User | undefined> {
  const table = await tableOperations();

  return table.get({ id });
}

export async function findAllUserEntries(): Promise<User[]> {
  // Implementation can be found on GitHub
}

export async function createUserEntry(user: Omit<User, "id">): Promise<User> {
  // Implementation can be found on GitHub
}

export async function updateUserEntry(id: string, user: User): Promise<User> {
  // Implementation can be found on GitHub
}

export async function deleteUserEntryById(id: string): Promise<string> {
  // Implementation can be found on GitHub
}
```

The repository implements the general CRUD operations using the Architect
framework. The `tableOperations` function exposes all possible operations on the
user table created in the previous layer. It is utilized in all repository
functions, for example, in the provided `findUserEntryById` using the `get`
operation.

### The service layer - TypeScript

The next layer contains all your business logic. As you can see, there are no
imports from AWS, DynamoDB, or Lambda. This strict separation will save you time
if you need to migrate to other deployment forms should your requirements
change. Furthermore, writing tests is much easier, if they don't contain vendor
specific code.

```ts
import invariant from "tiny-invariant";
import { userSchema, type User, userCreationSchema } from "./user-model";
import {
  createUserEntry,
  deleteUserEntryById,
  findAllUserEntries,
  findUserEntryById,
  updateUserEntry,
} from "./user-repository";
import { EntityNotFoundError } from "../common/error";

export async function findUserById(id: string | undefined): Promise<User> {
  invariant(id);

  const user = await findUserEntryById(id);

  if (!user) {
    throw new EntityNotFoundError();
  }

  return user;
}

export async function findAllUsers(): Promise<User[]> {
  // Implementation can be found on GitHub
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
  // Implementation can be found on GitHub
}

export async function updateUser(
  id: string | undefined,
  user: User,
): Promise<User> {
  // Implementation can be found on GitHub
}

export async function deleteUserById(id: string | undefined): Promise<string> {
  // Implementation can be found on GitHub
}
```

The `findUserById` function first calls the
[invariant](https://www.npmjs.com/package/invariant) function to prevent calling
the repository with an invalid ID. If no user is found, the service function
throws an _EntityNotFoundError_, enabling the return of a meaningful error
message. If a user is found, it is returned.

### The controller layer - Lambda

As stated above, the controller layer only receives the incoming request or
event. Its main purpose is to call the appropriate service function, in this
case, `findUserById`.

```ts
import type { LambdaEvent, LambdaHandler, User } from "@shared";
import { findUserById, withGlobalErrorHandler } from "@shared";

const lambdaHandler: LambdaHandler<User> = async (event: LambdaEvent) => {
  const { id } = event.pathParameters || {};

  return await findUserById(id);
};

export const handler = withGlobalErrorHandler(lambdaHandler);
```

### Global error handling

I prefer not to repeat myself. Additionally, I favour global error handling,
leading me to write the higher-order function `withGlobalErrorHandler`. It is
used for all lambda handlers to have a consistent error appearance, throughout
the application.

```ts
import type { LambdaHandler } from "../aws/lambda";

export class EntityNotFoundError extends Error {}

export const withGlobalErrorHandler = <T>(
  handler: LambdaHandler<T>,
): LambdaHandler<T> => {
  return async (...args: Parameters<LambdaHandler<T>>) => {
    try {
      return await handler(...args);
    } catch (error: unknown) {
      if (error instanceof EntityNotFoundError) {
        return {
          statusCode: 404,
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            message: "Entity not found",
          }),
        };
      }

      return {
        statusCode: 500,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: "An unexpected error occurred. Please try again later.",
        }),
      };
    }
  };
};
```

The function takes any lambda handler function and wraps it in a try-catch
block. This ensures that no strange database errors are propagated to your
users. Additionally, it allows you to decide which status codes to send. The
previously mentioned `EntityNotFoundError`, being a user error, results in
sending a 404 status code. For other errors, such as a lost connection to your
database, your users will consistently receive a 500 server error.

### Treeshaking

Even though, the idea behind this template was inspired by the general Spring
Boot project structure. You should avoid using classes, which are very common in
Java. Generally, they should be avoided for Lambda functions because they are
bundled as a whole. This implies that even if your Lambda function only handles
the deletion of users, it would still include the repository and service source
code for all other operations. Hence, it is crucial to use only functions and
export them separately as part of your ES modules to minimize the size of your
lambda functions.

## Deployment

Utilizing the `@architecture` framework offers the advantage of easily deploying
written lambda functions to AWS. You can deploy all your lambda functions,
tables, and API gateways by running `arc deploy`.

```sh
$ arc deploy

> crud-lambda-dynamodb@0.0.0 deploy
> arc deploy

         App ⌁ crud-lambda-dynamodb
      Region ⌁ eu-central-1
     Profile ⌁ default
     Version ⌁ Architect 10.16.3
         cwd ⌁ /Users/lars/Projects/crud-lambda-dynamodb

Compiling TypeScript
Compiled project in 0.482s
⚬ Hydrate Hydrating app with shared files
✓ Hydrate Finished checks, nothing to hydrate
⚬ Deploy Creating new private deployment bucket: crud-lambda-dynamodb-cfn-deployments-f68d5
⚬ Deploy Initializing deployment
  | Stack ... CrudLambdaDynamodbStaging
  | Bucket .. crud-lambda-dynamodb-cfn-deployments-f68d5
⚬ Deploy Created deployment templates
✓ Deploy Generated CloudFormation deployment
⚬ Deploy @static folder (public/) not found, skipping static asset deployment
✓ Deploy Deployed & built infrastructure
✓ Success! Deployed app in 109.277 seconds

    https://iamlxll7xa.execute-api.eu-central-1.amazonaws.com
```

Now, you can test your newly created API. For instance, you can create a new
user using [httpie](https://httpie.io/).

```shell
$ http POST https://iamlxll7xa.execute-api.eu-central-1.amazonaws.com/users name="My awesome name"
HTTP/1.1 200 OK
Apigw-Requestid: QfnxFgAmliAEPvw=
Coonection: keep-alive
Content-Length: 75
Content-Type: application/json
Date: Mon, 25 Dec 2023 10:02:33 GMT

{
    "id": "56c51af2-d276-413d-8fb6-0cc91b65fed3",
    "name": "My awesome name"
}
```

And afterwards, list all created users with:

```shell
$ http GET https://iamlxll7xa.execute-api.eu-central-1.amazonaws.com/users
HTTP/1.1 200 OK
Apigw-Requestid: QfoU3iMuFiAEJ-Q=
Connection: keep-alive
Content-Length: 72
Content-Type: application/json
Date: Mon, 25 Dec 2023 10:06:22 GMT

[
    {
        "id": "56c51af2-d276-413d-8fb6-0cc91b65fed3",
        "name": "My awesome name"
    }
]
```

Since you haven't implemented any authentication, you should destroy your API to
prevent potential future costs. This can be accomplished with the command
`arc destroy`.

```sh
$ arc destroy --app crud-lambda-dynamodb --force

> crud-lambda-dynamodb@0.0.0 destroy
> arc destroy --app crud-lambda-dynamodb --force

         App ⌁ crud-lambda-dynamodb
      Region ⌁ eu-central-1
     Profile ⌁ default
     Version ⌁ Architect 10.16.3
         cwd ⌁ /Users/lars/Projects/crud-lambda-dynamodb

⚬ Destroy Destroying staging environment
⚬ Destroy Reminder: if you deployed to production, don't forget to run destroy again with: --production
⚬ Destroy Destroying CrudLambdaDynamodbStaging in 5 seconds...
⚬ Destroy Destroying CrudLambdaDynamodbStaging
⚬ Destroy Deleting static S3 bucket...
⚬ Destroy Retrieving deployment bucket...
⚬ Destroy Deleting deployment S3 bucket...
⚬ Destroy Deleting SSM parameters...
⚬ Destroy Deleting CloudWatch log groups...
✓ Destroy Successfully destroyed CrudLambdaDynamodbStaging
```

## Summary

In conclusion, I appreciate the layered approach for writing larger
applications. It simplifies extending the application with new features. Also,
if a database query can be optimized, there's no need to search through the
entire project for similar queries used elsewhere. Indeed, this implementation
results in more source code compared to directly implementing database access in
the lambda functions. However, in my view, single functions can grow complex,
and you become tied to all the technology decisions made for smaller feature
sets. Potentially requiring now a complete rewrite of the application. Due to
treeshaking and the use of functions only, each lambda function contains no
unnecessary code.
