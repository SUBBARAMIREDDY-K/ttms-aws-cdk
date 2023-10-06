#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WebserverInfraStack } from '../lib/webserver-infra-stack';

const app = new cdk.App();
new WebserverInfraStack(app, 'WebserverInfraStack', {
  //Creating the TTMS Infra
});