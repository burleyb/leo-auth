import { Template } from 'aws-cdk-lib/assertions';
import * as cdk from 'aws-cdk-lib';
import { LeoAuthStack } from '../lib/leo-auth-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new LeoAuthStack(app, 'MyTestStack');
  const template = Template.fromStack(stack)
  // THEN
  template.hasResourceProperties("AWS::ApiGateway::Deployment", {})
  template.hasResourceProperties("AWS::IAM::Role", {})
  template.hasResourceProperties("AWS::Lambda::Function", {})
  template.hasResourceProperties("AWS::ApiGateway::Stage", {})
});
