module.exports = {
  "Resources": {
    "AuthInstall": {
      "Type": "Custom::Install",
      "Properties": {
        "ServiceToken": {
          "Fn::GetAtt": [
            "LeoAuthInstall",
            "Arn"
          ]
        },
        "Version": "1.0.2"
      },
      "DependsOn": [
        "LeoAuthInstall",
        "LeoAuthPolicy",
        "LeoAuthIdentity",
        "LeoAuthUser",
        "LeoAuth"
      ]
    },
    "LeoAuth": {
      "Type": "AWS::DynamoDB::Table",
      "Properties": {
        "AttributeDefinitions": [{
          "AttributeName": "identity",
          "AttributeType": "S"
        }],
        "KeySchema": [{
          "AttributeName": "identity",
          "KeyType": "HASH"
        }],
        "ProvisionedThroughput": {
          "ReadCapacityUnits": "100",
          "WriteCapacityUnits": "10"
        }
      }
    },
    "LeoAuthUser": {
      "Type": "AWS::DynamoDB::Table",
      "Properties": {
        "AttributeDefinitions": [{
          "AttributeName": "identity_id",
          "AttributeType": "S"
        }],
        "KeySchema": [{
          "AttributeName": "identity_id",
          "KeyType": "HASH"
        }],
        "ProvisionedThroughput": {
          "ReadCapacityUnits": "100",
          "WriteCapacityUnits": "10"
        }
      }
    },
    "LeoAuthPolicy": {
      "Type": "AWS::DynamoDB::Table",
      "Properties": {
        "AttributeDefinitions": [{
          "AttributeName": "name",
          "AttributeType": "S"
        }],
        "KeySchema": [{
          "AttributeName": "name",
          "KeyType": "HASH"
        }],
        "ProvisionedThroughput": {
          "ReadCapacityUnits": "3",
          "WriteCapacityUnits": "3"
        },
        "StreamSpecification": {
          "StreamViewType": "NEW_IMAGE"
        }
      }
    },
    "LeoAuthIdentity": {
      "Type": "AWS::DynamoDB::Table",
      "Properties": {
        "AttributeDefinitions": [{
          "AttributeName": "identity",
          "AttributeType": "S"
        }, {
          "AttributeName": "policy",
          "AttributeType": "S"
        }],
        "KeySchema": [{
          "AttributeName": "identity",
          "KeyType": "HASH"
        }, {
          "AttributeName": "policy",
          "KeyType": "RANGE"
        }],
        "ProvisionedThroughput": {
          "ReadCapacityUnits": "5",
          "WriteCapacityUnits": "5"
        },
        "StreamSpecification": {
          "StreamViewType": "KEYS_ONLY"
        },
        "GlobalSecondaryIndexes": [{
          "IndexName": "policy-identity-id",
          "KeySchema": [{
            "AttributeName": "policy",
            "KeyType": "HASH"
          }, {
            "AttributeName": "identity",
            "KeyType": "RANGE"
          }],
          "Projection": {
            "ProjectionType": "KEYS_ONLY"
          },
          "ProvisionedThroughput": {
            "ReadCapacityUnits": "5",
            "WriteCapacityUnits": "5"
          }
        }]
      }
    },
    "LeoAuthPolicyEventSource": {
      "Type": "AWS::Lambda::EventSourceMapping",
      "Properties": {
        "BatchSize": 1,
        "Enabled": true,
        "StartingPosition": "TRIM_HORIZON",
        "EventSourceArn": {
          "Fn::GetAtt": [
            "LeoAuthPolicy",
            "StreamArn"
          ]
        },
        "FunctionName": {
          "Ref": "LeoAuthWatch"
        }
      },
      "DependsOn": [
        "LeoAuthPolicy"
      ]
    },
    "LeoAuthIdentityEventSource": {
      "Type": "AWS::Lambda::EventSourceMapping",
      "Properties": {
        "BatchSize": 1,
        "Enabled": true,
        "StartingPosition": "TRIM_HORIZON",
        "EventSourceArn": {
          "Fn::GetAtt": [
            "LeoAuthIdentity",
            "StreamArn"
          ]
        },
        "FunctionName": {
          "Ref": "LeoAuthWatch"
        }
      },
      "DependsOn": [
        "LeoAuthIdentity"
      ]
    },
    "LeoAuthManagedPolicy": {
      "Type": "AWS::IAM::ManagedPolicy",
      "Properties": {
        "PolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Action": [
                "dynamodb:BatchGetItem",
                "dynamodb:GetItem"
              ],
              "Resource": [
                {
                  "Fn::GetAtt": [
                    "LeoAuth",
                    "Arn"
                  ]
                },
                {
                  "Fn::GetAtt": [
                    "LeoAuthUser",
                    "Arn"
                  ]
                }
              ]
            }
          ]
        }
      }
    },
    "LeoAuthRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [{
            "Effect": "Allow",
            "Principal": {
              "Service": [
                "lambda.amazonaws.com"
              ]
            },
            "Action": [
              "sts:AssumeRole"
            ]
          }]
        },
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
        ],
        "Policies": [{
          "PolicyName": "Leo_Auth_watch",
          "PolicyDocument": {
            "Version": "2012-10-17",
            "Statement": [{
              "Effect": "Allow",
              "Action": [
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
                "dynamodb:ListStreams"
              ],
              "Resource": [
                {
                  "Fn::Sub": "arn:aws:dynamodb:${AWS::Region}:${AWS::AccountId}:table/${AWS::StackName}-LeoAuth*"
                }
              ]
            }]
          }
        }]
      }
    },
  },
  "Outputs": {
    "Policy": {
      "Description": "Policy for Read/Write to the Bus",
      "Value": {
        "Ref": "LeoAuthManagedPolicy"
      },
      "Export": {
        "Name": {
          "Fn::Sub": "${AWS::StackName}-Policy"
        }
      }
    },
    "LeoAuth": {
      "Description": "LeoAuth Table",
      "Value": {
        "Fn::Sub": "${LeoAuth}"
      },
      "Export": {
        "Name": {
          "Fn::Sub": "${AWS::StackName}-LeoAuth"
        }
      }
    },
    "LeoAuthUser": {
      "Description": "LeoAuthUser Table",
      "Value": {
        "Fn::Sub": "${LeoAuthUser}"
      },
      "Export": {
        "Name": {
          "Fn::Sub": "${AWS::StackName}-LeoAuthUser"
        }
      }
    }
  }
};