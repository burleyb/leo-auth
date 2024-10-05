import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { LeoAuthStack } from '../lib/leo-auth-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new LeoAuthStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::ApiGateway::Deployment"))
  expectCDK(stack).to(haveResource("AWS::IAM::Role"))
  expectCDK(stack).to(haveResource("AWS::Lambda::Function"))
  expectCDK(stack).to(haveResource("AWS::ApiGateway::Stage"))
});
