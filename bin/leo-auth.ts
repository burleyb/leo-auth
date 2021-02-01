#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LeoAuthStack } from '../lib/leo-auth-stack';

const app = new cdk.App();
new LeoAuthStack(app, 'leo-auth-stack-dev'); //For deploymnet to PROD or other env, use the Cloudformation artifact produced by the CDK
