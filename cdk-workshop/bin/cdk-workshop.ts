#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkWorkshopStack } from '../lib/cdk-workshop-stack';

/**
 * エントリーポイント。基本的には変更する必要はない。
 */
const app = new cdk.App();
new CdkWorkshopStack(app, 'CdkWorkshopStack');
