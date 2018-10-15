{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Outputs": {
    "LeoVersion": {
      "Value": "___VAR:FILENAME___"
    },
    "LeoSettings": {
      "Value": "___VAR:SETTINGS___"
    },
    "Policy": {
      "Description": "Policy for Read/Write to the Bus",
      "Value": {
        "Ref": "AuthorizerPolicy"
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
  },
  "Metadata": {
    "AWS::CloudFormation::Designer": {
      "b2a95998-af58-4f32-86e2-a5348b6f20fc": {
        "source": {
          "id": "5b899bac-9541-494b-a6a6-3bd84481490d"
        },
        "target": {
          "id": "52becfcd-5402-4763-b6ba-baf715131e08"
        },
        "z": 3
      },
      "01391ded-567b-4b61-892f-dfc44eb7f917": {
        "source": {
          "id": "563116fc-6884-4f74-bede-a70f99475e84"
        },
        "target": {
          "id": "c373a856-58ec-4fd0-9f46-cb79207a7cc1"
        },
        "z": 4
      },
      "a770c642-e32e-4796-aad3-109d4404028e": {
        "source": {
          "id": "563116fc-6884-4f74-bede-a70f99475e84"
        },
        "target": {
          "id": "3cfeb6d0-188b-491a-adfa-140845103693"
        },
        "z": 5
      },
      "2df2ea28-58be-4aaf-beee-285e874a1a7f": {
        "source": {
          "id": "3cfeb6d0-188b-491a-adfa-140845103693"
        },
        "target": {
          "id": "b42bb4d7-25b0-49d9-897d-a82587946d20"
        },
        "z": 6
      },
      "fd02c1a2-d44f-4989-9c6b-9e15db5b626f": {
        "source": {
          "id": "c373a856-58ec-4fd0-9f46-cb79207a7cc1"
        },
        "target": {
          "id": "b42bb4d7-25b0-49d9-897d-a82587946d20"
        },
        "z": 7
      },
      "012fe883-f410-4fa8-980b-4c0b9b89e7a5": {
        "source": {
          "id": "563116fc-6884-4f74-bede-a70f99475e84",
          "selector": "g:nth-child(1) g:nth-child(4) g:nth-child(5) circle:nth-child(1)     ",
          "port": "AWS::DependencyLink-*"
        },
        "target": {
          "id": "3cfeb6d0-188b-491a-adfa-140845103693"
        },
        "z": 12
      },
      "f18b7aba-60fd-4607-83ef-7e5b611b965f": {
        "source": {
          "id": "c373a856-58ec-4fd0-9f46-cb79207a7cc1",
          "selector": "g:nth-child(1) g:nth-child(5) g:nth-child(2) circle:nth-child(1)     ",
          "port": "AWS::DependencyLink-*"
        },
        "target": {
          "id": "b42bb4d7-25b0-49d9-897d-a82587946d20"
        },
        "z": 12
      },
      "bdd9bea8-2b76-4954-90fb-348576d7af3d": {
        "source": {
          "id": "563116fc-6884-4f74-bede-a70f99475e84",
          "selector": "g:nth-child(1) g:nth-child(4) g:nth-child(5) circle:nth-child(1)     ",
          "port": "AWS::DependencyLink-*"
        },
        "target": {
          "id": "c373a856-58ec-4fd0-9f46-cb79207a7cc1"
        },
        "z": 12
      },
      "730cca38-f52e-4e64-935b-cc8281c8990d": {
        "source": {
          "id": "62497cab-58d4-40ca-8f52-a97e7abfe5fa"
        },
        "target": {
          "id": "704d8596-9847-40d8-a7c9-16f0f72da1de"
        },
        "z": 11
      },
      "ffcc1ac8-02c0-4d6a-831d-90cabca3d056": {
        "source": {
          "id": "5b899bac-9541-494b-a6a6-3bd84481490d"
        },
        "target": {
          "id": "704d8596-9847-40d8-a7c9-16f0f72da1de"
        },
        "z": 11
      },
      "3f538876-4e90-484f-80e2-ae723e3bdfad": {
        "source": {
          "id": "cdf91300-5c4d-4b3a-96c0-5dcf6a3c4af3"
        },
        "target": {
          "id": "62497cab-58d4-40ca-8f52-a97e7abfe5fa"
        },
        "z": 12
      },
      "9d7b636a-ccc1-4fc1-87db-3dce5e947c2b": {
        "source": {
          "id": "74c55dd3-46d6-417c-a9f5-e38af1c5c20a"
        },
        "target": {
          "id": "cdf91300-5c4d-4b3a-96c0-5dcf6a3c4af3"
        },
        "z": 13
      },
      "f6822ab4-f150-4113-8d54-7e3113d28e5d": {
        "source": {
          "id": "74c55dd3-46d6-417c-a9f5-e38af1c5c20a"
        },
        "target": {
          "id": "704d8596-9847-40d8-a7c9-16f0f72da1de"
        },
        "z": 14
      },
      "a9837492-b4ac-469b-ac5c-fa2d5b176e04": {
        "source": {
          "id": "74c55dd3-46d6-417c-a9f5-e38af1c5c20a",
          "selector": "g:nth-child(1) g:nth-child(4) g:nth-child(2) circle:nth-child(1)     ",
          "port": "AWS::DependencyLink-*"
        },
        "target": {
          "id": "704d8596-9847-40d8-a7c9-16f0f72da1de"
        },
        "z": 12
      },
      "45b117eb-b8fc-4a86-a4b2-d97b199c9d90": {
        "source": {
          "id": "c81dba54-7b65-4872-a683-709ad8ad2833"
        },
        "target": {
          "id": "5b899bac-9541-494b-a6a6-3bd84481490d"
        },
        "z": 11
      },
      "bfe44a8c-c65e-4216-9cdd-642665ef4388": {
        "source": {
          "id": "cdf91300-5c4d-4b3a-96c0-5dcf6a3c4af3",
          "selector": "g:nth-child(1) g:nth-child(4) g:nth-child(1) circle:nth-child(1)     ",
          "port": "AWS::DependencyLink-*"
        },
        "target": {
          "id": "62497cab-58d4-40ca-8f52-a97e7abfe5fa"
        },
        "z": 12
      },
      "da71632b-c269-413f-af13-3ad5f3f268e4": {
        "source": {
          "id": "b60a7e4b-a378-4f52-ad7f-9e777a5633d9"
        },
        "target": {
          "id": "220afb89-8236-4489-aec1-8a630ea91999"
        },
        "z": 11
      },
      "9e6028b9-2c30-494a-b888-d14e2211ed90": {
        "source": {
          "id": "74c55dd3-46d6-417c-a9f5-e38af1c5c20a",
          "selector": "g:nth-child(1) g:nth-child(4) g:nth-child(2) circle:nth-child(1)     ",
          "port": "AWS::DependencyLink-*"
        },
        "target": {
          "id": "704d8596-9847-40d8-a7c9-16f0f72da1de"
        },
        "z": 14
      },
      "665b7b5e-198d-48c4-9684-da3b0a290c64": {
        "source": {
          "id": "cdf91300-5c4d-4b3a-96c0-5dcf6a3c4af3",
          "selector": "g:nth-child(1) g:nth-child(4) g:nth-child(1) circle:nth-child(1)     ",
          "port": "AWS::DependencyLink-*"
        },
        "target": {
          "id": "62497cab-58d4-40ca-8f52-a97e7abfe5fa"
        },
        "z": 12
      },
      "b68623d4-8508-473c-ae80-715c72d9029a": {
        "source": {
          "id": "220afb89-8236-4489-aec1-8a630ea91999"
        },
        "target": {
          "id": "1682ae5a-cf25-4ab1-8aa0-a50be92bff75"
        },
        "z": 11
      },
      "1acf67c9-aaeb-4ac7-bf2a-70297797bf1c": {
        "source": {
          "id": "cdf91300-5c4d-4b3a-96c0-5dcf6a3c4af3"
        },
        "target": {
          "id": "62497cab-58d4-40ca-8f52-a97e7abfe5fa"
        },
        "z": 12
      },
      "addcc5fb-410b-412d-be0d-493cc91ad2e9": {
        "size": {
          "width": 60,
          "height": 60
        },
        "position": {
          "x": 1300,
          "y": 350
        },
        "z": 2,
        "parent": "c9cda285-a02b-4b13-9f7a-3e831b0aee97",
        "embeds": []
      },
      "528ecd4d-1b8f-43c1-a793-b22d0333c4df": {
        "size": {
          "width": 60,
          "height": 60
        },
        "position": {
          "x": 1300,
          "y": 470
        },
        "z": 2,
        "parent": "c9cda285-a02b-4b13-9f7a-3e831b0aee97",
        "embeds": []
      },
      "a87798ff-6047-4de1-8b5e-9b8c9b5db8d4": {
        "source": {
          "id": "5b899bac-9541-494b-a6a6-3bd84481490d"
        },
        "target": {
          "id": "079fef9c-e27a-49a3-ac6c-3244f2676bf1"
        },
        "z": 11
      },
      "28ebab93-3ebb-4640-b4b0-de6d7c16fee5": {
        "source": {
          "id": "cdf91300-5c4d-4b3a-96c0-5dcf6a3c4af3"
        },
        "target": {
          "id": "079fef9c-e27a-49a3-ac6c-3244f2676bf1"
        },
        "z": 12
      },
      "04dfea0b-b516-40fe-beff-f9da2ec7d886": {
        "source": {
          "id": "220afb89-8236-4489-aec1-8a630ea91999"
        },
        "target": {
          "id": "079fef9c-e27a-49a3-ac6c-3244f2676bf1"
        },
        "z": 13
      },
      "8c16291e-067a-4f94-bfb4-3c559a837402": {
        "source": {
          "id": "079fef9c-e27a-49a3-ac6c-3244f2676bf1"
        },
        "target": {
          "id": "52becfcd-5402-4763-b6ba-baf715131e08"
        },
        "z": 14
      },
      "b0c42452-c900-4bce-812d-c7e34ba21bdc": {
        "source": {
          "id": "fb3a6778-af39-4918-8bbd-a86ab729ca72"
        },
        "target": {
          "id": "05014ef5-491c-43bc-8231-68fb680a4450"
        },
        "z": 11
      },
      "c3870f85-a2d4-4555-8846-ab7d91b40011": {
        "source": {
          "id": "fb3a6778-af39-4918-8bbd-a86ab729ca72"
        },
        "target": {
          "id": "06e4fd65-0dbd-4670-bd7e-ffe98644dc04"
        },
        "z": 12
      },
      "c9cda285-a02b-4b13-9f7a-3e831b0aee97": {
        "size": {
          "width": 1080,
          "height": 780
        },
        "position": {
          "x": 340,
          "y": 260
        },
        "z": 1,
        "embeds": [
          "62149dca-9d39-4bb6-a5d6-2b84441f88ff",
          "b6a65016-69fc-4796-bde6-3c6ab7c0edd0",
          "6dab2776-1bb2-4a3b-a692-ddd36cd32a53",
          "528ecd4d-1b8f-43c1-a793-b22d0333c4df",
          "addcc5fb-410b-412d-be0d-493cc91ad2e9",
          "acd6c8d7-438e-40b0-8bf4-7400f4f26545",
          "91d08a05-c1d6-4bee-ade5-a8dc472e88d0",
          "ae9721af-75ed-4ff9-b3e9-d7135b4568db",
          "e6d9c164-8136-451b-a718-cb47362ea052"
        ]
      },
      "2e68e571-2a99-46ba-99c0-fe15a9871b3f": {
        "source": {
          "id": "0beb8d9a-94dd-4cd8-b009-54d4cb9b0734"
        },
        "target": {
          "id": "d8e22fc4-660d-4b9d-a104-facaf32f8ee7"
        },
        "z": 3
      },
      "6dab2776-1bb2-4a3b-a692-ddd36cd32a53": {
        "size": {
          "width": 60,
          "height": 60
        },
        "position": {
          "x": 400,
          "y": 330
        },
        "z": 2,
        "parent": "c9cda285-a02b-4b13-9f7a-3e831b0aee97",
        "embeds": []
      },
      "b6a65016-69fc-4796-bde6-3c6ab7c0edd0": {
        "size": {
          "width": 60,
          "height": 60
        },
        "position": {
          "x": 400,
          "y": 450
        },
        "z": 2,
        "parent": "c9cda285-a02b-4b13-9f7a-3e831b0aee97",
        "embeds": []
      },
      "ae9721af-75ed-4ff9-b3e9-d7135b4568db": {
        "size": {
          "width": 60,
          "height": 60
        },
        "position": {
          "x": 560,
          "y": 330
        },
        "z": 2,
        "parent": "c9cda285-a02b-4b13-9f7a-3e831b0aee97",
        "embeds": [],
        "isassociatedwith": [
          "acd6c8d7-438e-40b0-8bf4-7400f4f26545"
        ],
        "dependson": [
          "6dab2776-1bb2-4a3b-a692-ddd36cd32a53"
        ],
        "isrelatedto": [
          "704d8596-9847-40d8-a7c9-16f0f72da1de",
          "6dab2776-1bb2-4a3b-a692-ddd36cd32a53"
        ]
      },
      "90358d21-8147-4b1c-8902-21a31eb7e2cb": {
        "source": {
          "id": "ae9721af-75ed-4ff9-b3e9-d7135b4568db"
        },
        "target": {
          "id": "6dab2776-1bb2-4a3b-a692-ddd36cd32a53"
        },
        "z": 3
      },
      "91d08a05-c1d6-4bee-ade5-a8dc472e88d0": {
        "size": {
          "width": 60,
          "height": 60
        },
        "position": {
          "x": 560,
          "y": 450
        },
        "z": 2,
        "parent": "c9cda285-a02b-4b13-9f7a-3e831b0aee97",
        "embeds": [],
        "isassociatedwith": [
          "acd6c8d7-438e-40b0-8bf4-7400f4f26545"
        ],
        "dependson": [
          "b6a65016-69fc-4796-bde6-3c6ab7c0edd0"
        ],
        "isrelatedto": [
          "704d8596-9847-40d8-a7c9-16f0f72da1de",
          "6dab2776-1bb2-4a3b-a692-ddd36cd32a53",
          "b6a65016-69fc-4796-bde6-3c6ab7c0edd0"
        ]
      },
      "31d22cfc-9e59-4057-89d2-ba5fccce8ee8": {
        "source": {
          "id": "91d08a05-c1d6-4bee-ade5-a8dc472e88d0"
        },
        "target": {
          "id": "b6a65016-69fc-4796-bde6-3c6ab7c0edd0"
        },
        "z": 3
      },
      "acd6c8d7-438e-40b0-8bf4-7400f4f26545": {
        "size": {
          "width": 60,
          "height": 60
        },
        "position": {
          "x": 730,
          "y": 400
        },
        "z": 2,
        "parent": "c9cda285-a02b-4b13-9f7a-3e831b0aee97",
        "embeds": [],
        "dependson": [
          "addcc5fb-410b-412d-be0d-493cc91ad2e9",
          "62149dca-9d39-4bb6-a5d6-2b84441f88ff"
        ],
        "isrelatedto": [
          "079fef9c-e27a-49a3-ac6c-3244f2676bf1",
          "62149dca-9d39-4bb6-a5d6-2b84441f88ff"
        ]
      },
      "45223e94-eba0-493d-aa7b-e9a76557afa1": {
        "source": {
          "id": "acd6c8d7-438e-40b0-8bf4-7400f4f26545"
        },
        "target": {
          "id": "addcc5fb-410b-412d-be0d-493cc91ad2e9"
        },
        "z": 3
      },
      "4dc15d43-1ce8-4dfa-b067-c64fe60e8bca": {
        "source": {
          "id": "91d08a05-c1d6-4bee-ade5-a8dc472e88d0"
        },
        "target": {
          "id": "acd6c8d7-438e-40b0-8bf4-7400f4f26545"
        },
        "z": 4
      },
      "53ac29f5-cea8-46dc-b821-6347b0478789": {
        "source": {
          "id": "ae9721af-75ed-4ff9-b3e9-d7135b4568db"
        },
        "target": {
          "id": "acd6c8d7-438e-40b0-8bf4-7400f4f26545"
        },
        "z": 5
      },
      "62149dca-9d39-4bb6-a5d6-2b84441f88ff": {
        "size": {
          "width": 60,
          "height": 60
        },
        "position": {
          "x": 730,
          "y": 580
        },
        "z": 2,
        "parent": "c9cda285-a02b-4b13-9f7a-3e831b0aee97",
        "embeds": [],
        "isrelatedto": [
          "52becfcd-5402-4763-b6ba-baf715131e08"
        ]
      },
      "6c55c358-609f-4685-80ed-10fc1669b7ff": {
        "source": {
          "id": "acd6c8d7-438e-40b0-8bf4-7400f4f26545"
        },
        "target": {
          "id": "62149dca-9d39-4bb6-a5d6-2b84441f88ff"
        },
        "z": 3
      },
      "e6d9c164-8136-451b-a718-cb47362ea052": {
        "size": {
          "width": 60,
          "height": 60
        },
        "position": {
          "x": 430,
          "y": 610
        },
        "z": 2,
        "parent": "c9cda285-a02b-4b13-9f7a-3e831b0aee97"
      }
    }
  },
  "Resources": {
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
        },
        "TableName": "Leo_auth"
      },
      "Metadata": {
        "AWS::CloudFormation::Designer": {
          "id": "addcc5fb-410b-412d-be0d-493cc91ad2e9"
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
        },
        "TableName": "Leo_auth_user"
      },
      "Metadata": {
        "AWS::CloudFormation::Designer": {
          "id": "528ecd4d-1b8f-43c1-a793-b22d0333c4df"
        }
      }
    },
    "AuthorizationGateway": {
      "Type": "AWS::ApiGateway::RestApi",
      "Properties": {
        "Name": "Leo_Auth"
      },
      "Metadata": {
        "AWS::CloudFormation::Designer": {
          "id": "c9cda285-a02b-4b13-9f7a-3e831b0aee97"
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
        },
        "TableName": "Leo_auth_policy"
      },
      "Metadata": {
        "AWS::CloudFormation::Designer": {
          "id": "6dab2776-1bb2-4a3b-a692-ddd36cd32a53"
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
        "TableName": "Leo_auth_identity",
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
      },
      "Metadata": {
        "AWS::CloudFormation::Designer": {
          "id": "b6a65016-69fc-4796-bde6-3c6ab7c0edd0"
        }
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
      "Metadata": {
        "AWS::CloudFormation::Designer": {
          "id": "ae9721af-75ed-4ff9-b3e9-d7135b4568db"
        }
      },
      "DependsOn": [
        "LeoAuthPolicy"
      ]
    },
    "LeoAuthWatch": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
          "ZipFile": {
            "Fn::Join": [
              "", [
                "var response = require('cfn-response');",
                "exports.handler = function(event, context) {",
                "  var input = parseInt(event.ResourceProperties.Input);",
                "  var responseData = {Value: input * 5};",
                "  response.send(event, context, response.SUCCESS, responseData);",
                "};"
              ]
            ]
          }
        },
        "Description": "Leo Auth Change Watch",
        "FunctionName": "Leo_Auth_watch",
        "Handler": "index.handler",
        "MemorySize": 128,
        "Runtime": "nodejs4.3",
        "Timeout": 10,
        "Role": {
          "Fn::GetAtt": [
            "LeoAuthRole",
            "Arn"
          ]
        }
      },
      "Metadata": {
        "AWS::CloudFormation::Designer": {
          "id": "acd6c8d7-438e-40b0-8bf4-7400f4f26545"
        }
      },
      "DependsOn": [
        "LeoAuth",
        "LeoAuthRole"
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
      "Metadata": {
        "AWS::CloudFormation::Designer": {
          "id": "91d08a05-c1d6-4bee-ade5-a8dc472e88d0"
        }
      },
      "DependsOn": [
        "LeoAuthIdentity"
      ]
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
              "Resource": {
                "Fn::Join": [
                  "", [
                    "arn:aws:dynamodb:", {
                      "Ref": "AWS::Region"
                    },
                    ":", {
                      "Ref": "AWS::AccountId"
                    },
                    ":table/Leo_auth*"
                  ]
                ]
              }
            }]
          }
        }]
      },
      "Metadata": {
        "AWS::CloudFormation::Designer": {
          "id": "62149dca-9d39-4bb6-a5d6-2b84441f88ff"
        }
      }
    },
    "AuthorizerPolicy": {
      "Type": "AWS::IAM::ManagedPolicy",
      "Properties": {
        "PolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [{
            "Effect": "Allow",
            "Action": [
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
            "Resource": {
              "Fn::Join": [
                "", [
                  "arn:aws:dynamodb:", {
                    "Ref": "AWS::Region"
                  },
                  ":", {
                    "Ref": "AWS::AccountId"
                  },
                  ":table/Leo_auth"
                ]
              ]
            }
          }]
        }
      },
      "Metadata": {
        "AWS::CloudFormation::Designer": {
          "id": "e6d9c164-8136-451b-a718-cb47362ea052"
        }
      }
    }
  }
}