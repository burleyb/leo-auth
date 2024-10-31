import * as path from "path";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import { Provider } from "aws-cdk-lib/custom-resources";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { Runtime, StartingPosition } from 'aws-cdk-lib/aws-lambda'; 
import { SpecRestApi, ApiDefinition } from "aws-cdk-lib/aws-apigateway";
import { Construct } from 'constructs';

import {
  Table,
  AttributeType,
  StreamViewType,
  ProjectionType,
  BillingMode,
} from "aws-cdk-lib/aws-dynamodb";
import {
  Role,
  IRole,
  ServicePrincipal,
  AccountRootPrincipal,
  ManagedPolicy,
  PolicyDocument,
  PolicyStatement,
} from "aws-cdk-lib/aws-iam";
import {
  CustomResource,
  Stack,
  StackProps,
  CfnOutput,
  Fn,
  CfnParameter,
  Duration,
  RemovalPolicy,
} from "aws-cdk-lib/core";

export class LeoAuthStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const envParam = new CfnParameter(this, "Environment", {
      type: "String",
      description: "The deployment environment",
      default: "dev",
    });

    const leoAuthRole = new Role(this, "LeoAuthRole", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
      inlinePolicies: {
        Leo_Auth_watch: new PolicyDocument({
          statements: [
            new PolicyStatement({
              actions: [
                "dynamodb:PutItem",
                "dynamodb:BatchWriteItem",
                "dynamodb:BatchGetItem",
                "dynamodb:GetItem",
                "dynamodb:UpdateItem",
                "dynamodb:GetRecords",
                "dynamodb:Query",
                "dynamodb:Scan",
                "dynamodb:GetShardIterator",
                "dynamodb:DescribeStream",
                "dynamodb:ListStreams",
              ],
              resources: [
                Fn.sub(
                  "arn:aws:dynamodb:${AWS::Region}:${AWS::AccountId}:table/${AWS::StackName}-LeoAuth*"
                ),
              ],
            }),
          ],
        }),
      },
    });

    const apiRoleAssumePolicy = new ServicePrincipal("lambda.amazonaws.com");
    apiRoleAssumePolicy.addToPrincipalPolicy(
      new PolicyStatement({
        principals: [new AccountRootPrincipal()],
      })
    );
    const apiRole = new Role(this, "ApiRole", {
      assumedBy: apiRoleAssumePolicy,
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
      inlinePolicies: {
        BasicPolicy: new PolicyDocument({
          statements: [
            new PolicyStatement({
              actions: ["lambda:AddPermission"],
              resources: ["*"],
            }),
            new PolicyStatement({
              actions: ["lambda:InvokeFunction"],
              resources: [
                Fn.sub(
                  "arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:function:${AWS::StackName}-*"
                ),
              ],
            }),
          ],
        }),
      },
    });

    const leoAuth = new Table(this, "LeoAuth", {
      partitionKey: { name: "identity", type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    new CfnOutput(this, "LeoAuthTableNameOutput", {
      exportName: Fn.sub("${AWS::StackName}-LeoAuth"),
      value: leoAuth.tableName,
    });

    const leoAuthUser = new Table(this, "LeoAuthUser", {
      partitionKey: { name: "identity_id", type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    new CfnOutput(this, "LeoAuthUserTableNameOutput", {
      exportName: Fn.sub("${AWS::StackName}-LeoAuthUser"),
      value: leoAuthUser.tableName,
    });

    const leoAuthPolicy = new Table(this, "LeoAuthPolicy", {
      partitionKey: { name: "name", type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
      stream: StreamViewType.NEW_IMAGE,
    });

    const leoAuthIdentity = new Table(this, "LeoAuthIdentity", {
      partitionKey: { name: "identity", type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      sortKey: { name: "policy", type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      stream: StreamViewType.KEYS_ONLY,
    });

    leoAuthIdentity.addGlobalSecondaryIndex({
      indexName: "policy-identity-id",
      partitionKey: { name: "policy", type: AttributeType.STRING },
      sortKey: { name: "identity", type: AttributeType.STRING },
      projectionType: ProjectionType.KEYS_ONLY,
    });

    const resources =
      '{"region":"' +
      this.region +
      '","LeoAuth":"' +
      leoAuth.tableName +
      '","LeoAuthUser":"' +
      leoAuthUser.tableName +
      '","LeoAuthPolicy":"' +
      leoAuthPolicy.tableName +
      '","LeoAuthIdentity":"' +
      leoAuthIdentity.tableName +
      '"}';
    const environment = {
      Resources: resources,
      LEO_ENVIRONMENT: envParam.valueAsString,
    };

    const normalizeDataLambda = new NodejsFunction(this, "NormalizeData", {
      runtime: Runtime.NODEJS_20_X,
      entry: path.join(__dirname, "..", "lambda", "normalize-data", "index.ts"),
      handler: "handler",
      environment,
      role: leoAuthRole,
      bundling: {
      },
    });
    normalizeDataLambda.addEventSourceMapping("LeoAuthPolicyEventSource", {
      batchSize: 1,
      enabled: true,
      startingPosition: StartingPosition.TRIM_HORIZON,
      eventSourceArn: leoAuthPolicy.tableStreamArn as string,
    });
    new Rule(this, "ScheduleDataNormalization", {
      schedule: Schedule.cron({ minute: "*" }),
      targets: [new LambdaFunction(normalizeDataLambda)],
    });

    const seedDatabaseLambda = new NodejsFunction(this, "SeedDatabase", {
      runtime: Runtime.NODEJS_20_X,
      entry: path.join(__dirname, "..", "lambda", "seed-database", "index.ts"),
      handler: "handler",
      environment,
      timeout: Duration.seconds(30),
      role: leoAuthRole,
      bundling: {
      },
    });

    seedDatabaseLambda.addEventSourceMapping("LeoAuthPolicyEventSource", {
      batchSize: 1,
      enabled: true,
      startingPosition: StartingPosition.TRIM_HORIZON,
      eventSourceArn: leoAuthIdentity.tableStreamArn as string,
    });

    const leoAuthManagedPolicy = new ManagedPolicy(
      this,
      "LeoAuthManagedPolicy",
      {
        //TODO: is this a managed policy?
        statements: [
          new PolicyStatement({
            actions: ["dynamodb:BatchGetItem", "dynamodb:GetItem"],
            resources: [leoAuth.tableArn, leoAuthUser.tableArn],
          }),
        ],
      }
    );

    new CfnOutput(this, "LeoAuthManagedPolicyOutput", {
      exportName: Fn.sub("${AWS::StackName}-Policy"),
      value: leoAuthManagedPolicy.managedPolicyArn,
    });

    const authorize = new NodejsFunction(this, "Authorize", {
      runtime: Runtime.NODEJS_20_X,
      entry: path.join(__dirname, "..", "api", "authorize", "index.ts"),
      handler: "handler",
      environment,
      role: apiRole,
      bundling: {
      },
    });

    const myProvider = new Provider(this, "SeedDatabaseProvider", {
      onEventHandler: seedDatabaseLambda,
      logRetention: RetentionDays.ONE_DAY,
    });

    new CustomResource(this, "CustomSeedDatabase", {
      serviceToken: myProvider.serviceToken,
    });

    const api = new SpecRestApi(this, "AuthRestApi", {
      apiDefinition: ApiDefinition.fromInline({
        swagger: "2.0",
        info: {
          version: "1.1.0",
          title: "auth",
        },
        basePath: "/",
        schemes: ["https"],
        paths: {
          "/api/authorize": {
            put: {
              produces: ["application/json"],
              security: [
                {
                  sigv4: [],
                },
              ],
              responses: {
                "200": {
                  description: "200 response",
                  schema: {
                    $ref: "#/definitions/Empty",
                  },
                  headers: {
                    "Access-Control-Allow-Origin": {
                      type: "string",
                    },
                  },
                },
              },
              "x-amazon-apigateway-integration": {
                responses: {
                  default: {
                    statusCode: "200",
                  },
                },
                uri:
                  "arn:aws:apigateway:" +
                  this.region +
                  ":lambda:path/2015-03-31/functions/" +
                  authorize.functionArn +
                  "/invocations",
                passthroughBehavior: "when_no_match",
                httpMethod: "POST",
                contentHandling: "CONVERT_TO_TEXT",
                type: "aws_proxy",
              },
            },
          },
        },
        securityDefinitions: {
          sigv4: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
            "x-amazon-apigateway-authtype": "awsSigv4",
          },
        },
        definitions: {
          Empty: {
            type: "object",
          },
        },
      }),
    });

    authorize.addPermission("AuthorizeGatewayPermission", {
      action: "lambda:InvokeFunction",
      principal: new ServicePrincipal("apigateway.amazonaws.com"),
      sourceArn: api.arnForExecuteApi(),
    });
  }
}
