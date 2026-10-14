# Factual Verification Report

Generated: 2026-10-12T19:22:09.724Z
Generator: `scripts/question-data/verifyQuestions.mjs` (report version 1.0.0)

> This report records which questions have been checked against retrieved official AWS sources, and which have not.
> Passing a structural check never makes a question `verified`; only a recorded claim matched against retrieved official source text does.

## Inputs

| Input | Path | SHA-256 |
| --- | --- | --- |
| questions | `frontend/src/data/questions.enriched.json` | `ce5a095b15607d0b…` |
| enrichmentQualityReport | `scripts/question-data/enrichment-quality-report.json` | `e419c0cf1fd58f1c…` |
| questionReviewReport | `scripts/question-data/question-review-report.json` | `ca8c7f034705c418…` |

## Totals

| Status | Count |
| --- | ---: |
| verified | 321 |
| needs-review | 170 |
| unsupported | 0 |
| blocked | 4 |
| **total** | **495** |

## Domain Distribution (official CLF-C02 domains)

| Domain | Exam weight | Total | verified | needs-review | unsupported | blocked |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Domain 1: Cloud Concepts | 24% | 70 | 20 | 50 | 0 | 0 |
| Domain 2: Security and Compliance | 30% | 169 | 127 | 41 | 0 | 1 |
| Domain 3: Cloud Technology and Services | 34% | 149 | 104 | 43 | 0 | 2 |
| Domain 4: Billing, Pricing, and Support | 12% | 107 | 70 | 36 | 0 | 1 |
| Unassigned | — | 0 | 0 | 0 | 0 | 0 |

## Verified Coverage

verified items divided by items that are not blocked. Only items whose claim was matched against retrieved official AWS source text count as verified.

| Scope | Eligible | Verified | Rate |
| --- | ---: | ---: | ---: |
| Overall | 491 | 321 | 65.4% |
| Domain 1: Cloud Concepts | 70 | 20 | 28.6% |
| Domain 2: Security and Compliance | 168 | 127 | 75.6% |
| Domain 3: Cloud Technology and Services | 147 | 104 | 70.8% |
| Domain 4: Billing, Pricing, and Support | 106 | 70 | 66.0% |
| Unassigned | 0 | 0 | 0.0% |

## Blocked IDs

These items stay blocked until their answers are resolved: **q200**, **q250**, **q269**, **q626**.

| ID | Category | Reason |
| --- | --- | --- |
| q200 | ANSWER_CORRUPTED_NEEDS_REVIEW | The original answer is not a complete sequence of option letters; it contains an apparent answer prefix followed by unrelated question text. No safe answer can be recovered from the source alone. |
| q250 | ANSWER_CORRUPTED_NEEDS_REVIEW | The original answer is not a complete sequence of option letters; it contains an apparent answer prefix followed by unrelated question text. The source does not identify whether the intended answer was A or another value. |
| q269 | ANSWER_CORRUPTED_NEEDS_REVIEW | The original answer is not a complete sequence of option letters; it contains an apparent answer prefix followed by unrelated question text. Although the value begins with C, the answer cannot be safely recovered under the audit rules. |
| q626 | ANSWER_CORRUPTED_NEEDS_REVIEW | The original answer is not a complete sequence of option letters; it contains an apparent answer prefix followed by unrelated text. The source alone does not safely establish the intended answer. |

## Source-Data Inconsistencies

- **q339** (needs-review) — The unchanged answer array references option C, but the unchanged normalized option structure does not contain a standalone C option.
  - Evidence: answer=[B,C]; options have ids A, B, D, and E, with the text 'Amazon CloudFront C. AWS Global Accelerator' embedded in option B. q339 is an expected known data-quality exception and was not repaired.
  - Action: Reported only. The missing option was not inferred and no answer, option, question text or explanation was changed.

## Unresolved Claims

170 item(s) are not yet factually checked or were not supported.

| Reason | Count | IDs |
| --- | ---: | --- |
| no-corroborating-evidence-found | 118 | q4, q10, q11, q16, q25, q29, q34, q40, q45, q53, q59, q64, q68, q69, q76, q79, q80, q81, q82, q83, q88, q89, q93, q97, q101, q105, q106, q113, q115, q123, q129, q131, q134, q137, q140, q144, q151, q152, q154, q160 … (+78 more) |
| claim-too-generic-to-verify | 51 | q6, q22, q23, q30, q47, q95, q102, q114, q125, q127, q128, q139, q145, q148, q163, q164, q173, q181, q189, q199, q228, q231, q256, q260, q297, q309, q320, q321, q324, q325, q327, q333, q337, q359, q363, q365, q369, q399, q401, q408 … (+11 more) |
| source-data-inconsistency | 1 | q339 |

## Source References

Retrieved: 172 · Failed to retrieve: 7 · Not needed for any question: 15

### Official exam guide

- AWS Certified Cloud Practitioner (CLF-C02) Exam Guide
  - URL: https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Exam-Guide.pdf
  - HTTP 200 · retrieved 2026-10-11T08:35:59.138Z · SHA-256 `ba81d8c415f93f34…`
  - Extracted characters: 27215 · domains parsed: 4 · task statements parsed: 18

### Official AWS documentation

| Title | URL | HTTP | Retrieved | Items |
| --- | --- | ---: | --- | ---: |
| Amazon S3 User Guide - Welcome | https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html | 200 | 2026-10-11T08:35:59.674Z | 48 |
| Amazon S3 storage classes | https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html | 200 | 2026-10-11T08:36:00.022Z | 56 |
| Amazon S3 buckets | https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingBucket.html | 200 | 2026-10-11T08:36:00.029Z | 7 |
| Amazon EBS snapshots | https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSSnapshots.html | 200 | 2026-10-11T08:36:00.313Z | 28 |
| Amazon EFS - What is Amazon EFS | https://docs.aws.amazon.com/efs/latest/ug/what-is.html | 200 | 2026-10-11T08:36:00.705Z | 16 |
| IAM credential report | https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_getting-report.html | 200 | 2026-10-11T08:36:00.019Z | 22 |
| Amazon QuickSight | https://aws.amazon.com/quicksight/ | 200 | 2026-10-11T08:36:00.673Z | 0 |
| AWS Batch | https://aws.amazon.com/batch/ | 200 | 2026-10-11T08:36:01.166Z | 19 |
| Amazon EFS mount workflows | https://docs.aws.amazon.com/efs/latest/ug/efs-mounting.html | 200 | 2026-10-11T08:36:00.841Z | 11 |
| Amazon ElastiCache - What is Amazon ElastiCache | https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html | 200 | 2026-10-11T08:36:00.397Z | 7 |
| AWS Storage Gateway - What is AWS Storage Gateway | https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsGateway.html | 200 | 2026-10-11T08:36:01.545Z | 42 |
| AWS Storage Gateway getting started | https://docs.aws.amazon.com/storagegateway/latest/userguide/getting-started.html | 200 | 2026-10-11T08:36:01.547Z | 24 |
| AWS DataSync - What is AWS DataSync | https://docs.aws.amazon.com/datasync/latest/userguide/what-is.html | 200 | 2026-10-11T08:36:01.844Z | 11 |
| AWS Snow Family - What is the AWS Snow Family | https://docs.aws.amazon.com/snowball/latest/developer-guide/what-is.html | 200 | 2026-10-11T08:36:01.872Z | 11 |
| AWS Backup - What is AWS Backup | https://docs.aws.amazon.com/aws-backup/latest/devguide/what-is.html | 200 | 2026-10-11T08:36:01.889Z | 5 |
| Amazon S3 Glacier | https://aws.amazon.com/glacier/ | 200 | 2026-10-11T08:47:07.512Z | 3 |
| Amazon FSx | https://aws.amazon.com/fsx/ | 200 | 2026-10-11T08:36:01.656Z | 10 |
| Amazon EC2 concepts | https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html | 200 | 2026-10-11T08:36:01.874Z | 21 |
| Amazon EC2 instance types | https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html | 200 | 2026-10-11T08:36:01.859Z | 42 |
| Amazon EC2 instance lifecycle | https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html | 200 | 2026-10-11T08:36:01.927Z | 21 |
| Amazon EC2 Spot Instances | https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-instances.html | 200 | 2026-10-11T08:36:02.338Z | 83 |
| Amazon EC2 Reserved Instances | https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/reserved-instances.html | 200 | 2026-10-11T08:36:02.340Z | 65 |
| AWS Lambda Developer Guide - Welcome | https://docs.aws.amazon.com/lambda/latest/dg/welcome.html | 200 | 2026-10-11T08:36:01.904Z | 22 |
| AWS Lambda functions | https://docs.aws.amazon.com/lambda/latest/dg/lambda-functions.html | 200 | 2026-10-11T08:36:02.263Z | 24 |
| Amazon ECS Developer Guide - Welcome | https://docs.aws.amazon.com/AmazonECS/latest/developerguide/welcome.html | 200 | 2026-10-11T08:36:02.847Z | 9 |
| Amazon ECS launch types | https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-launch-types.html | 200 | 2026-10-11T08:36:02.882Z | 19 |
| Amazon EKS - What is Amazon EKS | https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html | 200 | 2026-10-11T08:36:02.296Z | 4 |
| Amazon EKS managed node groups | https://docs.aws.amazon.com/eks/latest/userguide/eks-managed-node-groups.html | 200 | 2026-10-11T08:36:03.010Z | 24 |
| AWS Elastic Beanstalk concepts | https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts.html | 200 | 2026-10-11T08:36:02.624Z | 13 |
| Elastic Load Balancing for Application Load Balancers | https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html | 200 | 2026-10-11T08:36:02.609Z | 60 |
| Elastic Load Balancing - How Elastic Load Balancing works | https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-it-works.html | 200 | 2026-10-11T08:36:03.393Z | 23 |
| Amazon EC2 Auto Scaling - What is Auto Scaling | https://docs.aws.amazon.com/autoscaling/latest/userguide/what-is-amazon-autoscaling.html | 200 | 2026-10-11T08:36:04.512Z | 16 |
| Benefits of Amazon EC2 Auto Scaling | https://docs.aws.amazon.com/autoscaling/latest/userguide/auto-scaling-benefits.html | 200 | 2026-10-11T08:36:03.391Z | 18 |
| AWS Compute Optimizer - Welcome | https://docs.aws.amazon.com/compute-optimizer/latest/ug/welcome.html | 200 | 2026-10-11T08:36:04.122Z | 63 |
| AWS Fargate | https://aws.amazon.com/fargate/ | 200 | 2026-10-11T08:36:04.102Z | 9 |
| AWS CloudShell | https://aws.amazon.com/cloudshell/ | 200 | 2026-10-11T08:36:03.486Z | 9 |
| Amazon RDS User Guide - Welcome | https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html | 200 | 2026-10-11T08:36:03.804Z | 22 |
| Amazon DynamoDB Developer Guide - Introduction | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html | 200 | 2026-10-11T08:36:03.802Z | 23 |
| Amazon Redshift Documentation - Welcome | https://docs.aws.amazon.com/redshift/latest/dg/welcome.html | 200 | 2026-10-11T08:36:03.799Z | 15 |
| Amazon Neptune Developer Guide - Introduction | https://docs.aws.amazon.com/neptune/latest/userguide/intro.html | 200 | 2026-10-11T08:36:04.110Z | 5 |
| Amazon DocumentDB - What is Amazon DocumentDB | https://docs.aws.amazon.com/documentdb/latest/developerguide/what-is.html | 200 | 2026-10-11T08:36:04.517Z | 2 |
| Amazon Timestream - What is Amazon Timestream | https://docs.aws.amazon.com/timestream/latest/developerguide/what-is-timestream.html | 200 | 2026-10-11T08:36:04.145Z | 1 |
| AWS Database Migration Service User Guide - Welcome | https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html | 200 | 2026-10-11T08:36:04.514Z | 25 |
| AWS DMS introduction | https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Introduction.html | 200 | 2026-10-11T08:36:04.510Z | 5 |
| Amazon Aurora | https://aws.amazon.com/aurora/ | 200 | 2026-10-11T08:36:05.276Z | 16 |
| Amazon VPC User Guide - What is Amazon VPC | https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html | 200 | 2026-10-11T08:36:04.513Z | 28 |
| Amazon VPC security group rules | https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups-rules.html | 200 | 2026-10-11T08:36:05.174Z | 59 |
| AWS Site-to-Site VPN connections | https://docs.aws.amazon.com/vpc/latest/userguide/vpn-connections.html | 200 | 2026-10-11T08:36:04.847Z | 13 |
| AWS Transit Gateway - What is a transit gateway | https://docs.aws.amazon.com/vpc/latest/userguide/transit-gateway-introduction.html | 200 | 2026-10-11T08:36:05.149Z | 20 |
| Amazon Route 53 Developer Guide - Welcome | https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html | 200 | 2026-10-11T08:36:04.814Z | 12 |
| Amazon Route 53 Resolver getting started | https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-getting-started.html | 200 | 2026-10-11T08:36:04.872Z | 11 |
| Amazon CloudFront Developer Guide - Introduction | https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html | 200 | 2026-10-11T08:36:04.862Z | 12 |
| How Amazon CloudFront works | https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/HowCloudFrontWorks.html | 200 | 2026-10-11T08:36:05.188Z | 12 |
| AWS Direct Connect User Guide - Welcome | https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html | 200 | 2026-10-11T08:36:05.191Z | 26 |
| AWS Global Infrastructure | https://aws.amazon.com/about-aws/global-infrastructure/ | 200 | 2026-10-11T08:36:05.575Z | 0 |
| AWS Identity and Access Management User Guide - Introduction | https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html | 200 | 2026-10-11T08:36:05.186Z | 81 |
| IAM security best practices | https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html | 200 | 2026-10-11T08:36:05.444Z | 25 |
| IAM access keys | https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html | 200 | 2026-10-11T08:36:05.459Z | 11 |
| IAM multi-factor authentication | https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html | 200 | 2026-10-11T08:36:05.212Z | 7 |
| IAM least privilege | https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_least-privilege.html | 200 | 2026-10-11T08:36:05.554Z | 4 |
| Protecting the AWS root user | https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_manage_root-user.html | 200 | 2026-10-11T08:47:07.221Z | 1 |
| AWS WAF Developer Guide | https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html | 200 | 2026-10-11T08:36:05.545Z | 30 |
| AWS Shield Developer Guide | https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html | 200 | 2026-10-11T08:36:05.579Z | 31 |
| AWS KMS Developer Guide - Overview | https://docs.aws.amazon.com/kms/latest/developerguide/overview.html | 200 | 2026-10-11T08:36:05.712Z | 12 |
| AWS KMS concepts | https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html | 200 | 2026-10-11T08:36:05.740Z | 2 |
| Amazon GuardDuty User Guide - Welcome | https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_welcome.html | 200 | 2026-10-11T08:36:06.511Z | 16 |
| Amazon Inspector - What is Amazon Inspector | https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html | 200 | 2026-10-11T08:36:05.891Z | 24 |
| Amazon Macie - What is Amazon Macie | https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html | 200 | 2026-10-11T08:36:05.925Z | 10 |
| AWS Secrets Manager User Guide - Introduction | https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html | 200 | 2026-10-11T08:36:05.895Z | 31 |
| Amazon CloudWatch - What is Amazon CloudWatch | https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html | 200 | 2026-10-11T08:36:05.978Z | 23 |
| Amazon CloudWatch concepts | https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch-concepts.html | 200 | 2026-10-11T08:36:06.366Z | 22 |
| AWS CloudTrail User Guide | https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html | 200 | 2026-10-11T08:36:06.221Z | 12 |
| AWS Shared Responsibility Model | https://aws.amazon.com/compliance/shared-responsibility-model/ | 200 | 2026-10-11T08:36:06.821Z | 45 |
| AWS Security | https://aws.amazon.com/security/ | 200 | 2026-10-11T08:47:06.690Z | 22 |
| AWS Compliance | https://aws.amazon.com/compliance/ | 200 | 2026-10-11T08:36:07.054Z | 20 |
| AWS Artifact | https://aws.amazon.com/artifact/ | 200 | 2026-10-11T08:36:06.260Z | 12 |
| AWS Config | https://aws.amazon.com/config/ | 200 | 2026-10-11T08:36:06.744Z | 14 |
| AWS CloudTrail | https://aws.amazon.com/cloudtrail/ | 200 | 2026-10-11T08:36:06.962Z | 10 |
| AWS Audit Manager | https://aws.amazon.com/audit-manager/ | 200 | 2026-10-11T08:47:06.860Z | 4 |
| AWS Security Blog | https://aws.amazon.com/blogs/security/ | 200 | 2026-10-11T08:47:06.902Z | 10 |
| Amazon Cognito | https://aws.amazon.com/cognito/ | 200 | 2026-10-11T08:36:06.654Z | 14 |
| Amazon Cognito user pools and identity pools | https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html | 200 | 2026-10-11T08:36:07.130Z | 22 |
| AWS CloudFormation User Guide - Welcome | https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html | 200 | 2026-10-11T08:36:06.925Z | 18 |
| AWS Systems Manager - What is Systems Manager | https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html | 200 | 2026-10-11T08:36:07.031Z | 41 |
| Amazon API Gateway Developer Guide - Welcome | https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html | 200 | 2026-10-11T08:36:07.117Z | 5 |
| AWS CloudFormation | https://aws.amazon.com/cloudformation/ | 200 | 2026-10-11T08:36:07.684Z | 15 |
| AWS Quick Starts | https://aws.amazon.com/quickstart/ | 200 | 2026-10-11T08:36:08.354Z | 1 |
| AWS CodeBuild | https://aws.amazon.com/codebuild/ | 200 | 2026-10-11T08:36:07.311Z | 4 |
| AWS CodePipeline | https://aws.amazon.com/codepipeline/ | 200 | 2026-10-11T08:36:08.177Z | 4 |
| AWS CodeDeploy | https://aws.amazon.com/codedeploy/ | 200 | 2026-10-11T08:36:07.384Z | 2 |
| AWS Systems Manager | https://aws.amazon.com/systems-manager/ | 200 | 2026-10-11T08:36:07.420Z | 15 |
| Amazon EventBridge | https://aws.amazon.com/eventbridge/ | 200 | 2026-10-11T08:36:08.435Z | 2 |
| AWS X-Ray | https://aws.amazon.com/xray/ | 200 | 2026-10-11T08:36:09.417Z | 0 |
| AWS Cloud9 | https://aws.amazon.com/cloud9/ | 200 | 2026-10-11T08:47:06.721Z | 2 |
| AWS Amplify | https://aws.amazon.com/amplify/ | 200 | 2026-10-11T08:36:08.123Z | 1 |
| AWS AppSync | https://aws.amazon.com/appsync/ | 200 | 2026-10-11T08:36:08.394Z | 1 |
| Amazon API Gateway | https://aws.amazon.com/apigateway/ | 200 | 2026-10-11T08:36:09.491Z | 1 |
| Amazon Athena - What is Amazon Athena | https://docs.aws.amazon.com/athena/latest/ug/what-is.html | 200 | 2026-10-11T08:36:08.515Z | 15 |
| How Amazon Athena queries work | https://docs.aws.amazon.com/athena/latest/ug/how-queries-work.html | 200 | 2026-10-11T08:36:09.141Z | 12 |
| AWS Glue - What is AWS Glue | https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html | 200 | 2026-10-11T08:36:08.745Z | 4 |
| Amazon Kinesis Data Streams - What is Kinesis Data Streams | https://docs.aws.amazon.com/kinesis/latest/dev/what-is-this-service.html | 200 | 2026-10-11T08:36:10.083Z | 4 |
| Amazon Kinesis family of services | https://docs.aws.amazon.com/kinesis/latest/dev/services-list.html | 200 | 2026-10-11T08:36:10.082Z | 4 |
| Amazon SageMaker - What is Amazon SageMaker | https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html | 200 | 2026-10-11T08:36:08.779Z | 2 |
| Amazon Rekognition | https://aws.amazon.com/rekognition/ | 200 | 2026-10-11T08:36:09.910Z | 6 |
| Amazon Polly | https://aws.amazon.com/polly/ | 200 | 2026-10-11T08:36:09.841Z | 3 |
| Amazon Comprehend | https://aws.amazon.com/comprehend/ | 200 | 2026-10-11T08:36:09.901Z | 2 |
| Amazon Translate | https://aws.amazon.com/translate/ | n/a | n/a | 0 |
| Amazon Connect | https://aws.amazon.com/connect/ | 200 | 2026-10-11T08:36:10.452Z | 15 |
| AWS Cost Explorer - What is AWS Cost Explorer | https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html | 200 | 2026-10-11T08:36:10.166Z | 47 |
| AWS Organizations User Guide - Welcome | https://docs.aws.amazon.com/organizations/latest/userguide/welcome.html | 200 | 2026-10-11T08:36:10.772Z | 35 |
| AWS Organizations - adding and removing accounts | https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts.html | 200 | 2026-10-11T08:36:10.252Z | 26 |
| AWS account management reference | https://docs.aws.amazon.com/accounts/latest/reference/welcome.html | 200 | 2026-10-11T08:36:11.082Z | 20 |
| AWS Service Terms | https://docs.aws.amazon.com/general/latest/gr/aws-service-terms.html | 200 | 2026-10-11T08:36:11.072Z | 10 |
| AWS Pricing | https://aws.amazon.com/pricing/ | 200 | 2026-10-11T08:47:07.039Z | 21 |
| AWS Cost Management | https://aws.amazon.com/aws-cost-management/ | 200 | 2026-10-11T08:47:07.071Z | 8 |
| AWS Budgets | https://aws.amazon.com/aws-cost-management/aws-budgets/ | 200 | 2026-10-11T08:36:11.318Z | 11 |
| AWS Cost Explorer | https://aws.amazon.com/aws-cost-management/aws-cost-explorer/ | 200 | 2026-10-11T08:36:10.762Z | 15 |
| Amazon EC2 Reserved Instances | https://aws.amazon.com/ec2/reserved-instances/ | 200 | 2026-10-11T08:36:11.913Z | 27 |
| Amazon EC2 Spot Instances | https://aws.amazon.com/ec2/spot/ | 200 | 2026-10-11T08:36:11.881Z | 25 |
| AWS Free Tier | https://aws.amazon.com/free/ | 200 | 2026-10-11T08:36:11.483Z | 2 |
| AWS Support | https://aws.amazon.com/support/ | 200 | 2026-10-11T08:36:12.623Z | 0 |
| AWS Support plans | https://aws.amazon.com/premiumsupport/plans/ | 200 | 2026-10-11T08:36:11.470Z | 12 |
| AWS Partner Network | https://aws.amazon.com/partners/ | 200 | 2026-10-11T08:36:12.029Z | 10 |
| AWS Training and Certification | https://aws.amazon.com/training/ | 200 | 2026-10-11T08:36:12.304Z | 6 |
| AWS Documentation | https://aws.amazon.com/documentation/ | 200 | 2026-10-11T08:36:12.436Z | 5 |
| AWS FAQs | https://aws.amazon.com/faqs/ | 200 | 2026-10-11T08:36:12.600Z | 1 |
| AWS Service Catalog | https://aws.amazon.com/servicecatalog | 200 | 2026-10-11T08:36:13.319Z | 13 |
| AWS Control Tower | https://aws.amazon.com/controltower | 200 | 2026-10-11T08:36:12.974Z | 5 |
| AWS Health | https://aws.amazon.com/health/ | 200 | 2026-10-11T08:36:13.482Z | 0 |
| Amazon AppStream 2.0 | https://aws.amazon.com/appstream/ | 200 | 2026-10-11T08:36:14.507Z | 16 |
| AWS CodeArtifact | https://aws.amazon.com/codeartifact/ | n/a | n/a | 0 |
| AWS IoT Core | https://aws.amazon.com/iot/ | 200 | 2026-10-11T08:36:13.330Z | 18 |
| Amazon WorkSpaces | https://aws.amazon.com/workspaces/ | 200 | 2026-10-11T08:36:13.762Z | 9 |
| AWS Managed Services | https://aws.amazon.com/managed-services/ | 200 | 2026-10-11T08:47:08.051Z | 2 |
| AWS Organizations | https://aws.amazon.com/organizations/ | 200 | 2026-10-11T08:47:07.209Z | 1 |
| AWS Marketplace | https://aws.amazon.com/marketplace/ | 200 | 2026-10-11T08:47:08.294Z | 4 |
| AWS Well-Architected Framework - Welcome | https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html | 200 | 2026-10-11T08:36:13.019Z | 17 |
| Well-Architected operational excellence pillar | https://docs.aws.amazon.com/wellarchitected/latest/framework/operational-excellence-pillar.html | 200 | 2026-10-11T08:36:13.719Z | 17 |
| Well-Architected operational excellence pillar | https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html | 200 | 2026-10-11T08:36:13.647Z | 15 |
| Well-Architected security pillar | https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html | 200 | 2026-10-11T08:36:13.603Z | 4 |
| Well-Architected reliability pillar | https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html | 200 | 2026-10-11T08:36:13.779Z | 6 |
| Well-Architected performance efficiency pillar | https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/welcome.html | 200 | 2026-10-11T08:36:13.930Z | 12 |
| Well-Architected cost optimization pillar | https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html | 200 | 2026-10-11T08:47:07.389Z | 2 |
| Well-Architected sustainability pillar | https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/welcome.html | 200 | 2026-10-11T08:47:08.206Z | 1 |
| AWS Trusted Advisor | https://aws.amazon.com/trustedadvisor/ | 200 | 2026-10-11T08:36:16.109Z | 28 |
| AWS Well-Architected | https://aws.amazon.com/well-architected/ | n/a | n/a | 0 |
| AWS Well-Architected Center | https://aws.amazon.com/architecture/well-architected/ | 200 | 2026-10-11T08:47:07.944Z | 5 |
| AWS Cloud Adoption Framework (AWS CAF) | https://aws.amazon.com/cloud-adoption-framework/ | 200 | 2026-10-11T08:36:14.852Z | 61 |
| What is cloud computing? | https://aws.amazon.com/what-is-cloud-computing/ | 200 | 2026-10-11T08:36:14.044Z | 41 |
| AWS Sustainability | https://aws.amazon.com/about-aws/sustainability/ | 200 | 2026-10-11T08:36:15.312Z | 2 |
| AWS Prescriptive Guidance | https://aws.amazon.com/prescriptive-guidance/ | 200 | 2026-10-11T08:36:15.056Z | 4 |
| AWS Migration Hub | https://aws.amazon.com/migration-hub/ | 200 | 2026-10-11T08:36:15.853Z | 0 |
| AWS Application Discovery Service | https://aws.amazon.com/application-discovery/ | 200 | 2026-10-11T08:36:16.503Z | 17 |
| AWS Snow Family | https://aws.amazon.com/snowball/ | 200 | 2026-10-11T08:36:15.547Z | 6 |
| AWS Direct Connect | https://aws.amazon.com/directconnect/ | 200 | 2026-10-11T08:36:16.177Z | 20 |
| Amazon Route 53 | https://aws.amazon.com/route53/ | n/a | n/a | 0 |
| Amazon CloudFront | https://aws.amazon.com/cloudfront/ | n/a | n/a | 0 |
| Amazon VPC | https://aws.amazon.com/vpc/ | n/a | n/a | 0 |
| Amazon SQS | https://aws.amazon.com/sqs/ | 200 | 2026-10-11T08:36:16.512Z | 7 |
| Amazon SNS | https://aws.amazon.com/sns/ | 200 | 2026-10-11T08:36:15.831Z | 2 |
| Amazon SES | https://aws.amazon.com/ses/ | 200 | 2026-10-11T08:36:16.140Z | 1 |
| Amazon DynamoDB | https://aws.amazon.com/dynamodb/ | 200 | 2026-10-11T08:36:17.004Z | 20 |
| Amazon Redshift | https://aws.amazon.com/redshift/ | 200 | 2026-10-11T08:36:16.587Z | 15 |
| Amazon Neptune | https://aws.amazon.com/neptune/ | 200 | 2026-10-11T08:36:17.271Z | 4 |
| Amazon Timestream | https://aws.amazon.com/timestream/ | 200 | 2026-10-11T08:36:16.665Z | 1 |
| Amazon DocumentDB | https://aws.amazon.com/documentdb/ | 200 | 2026-10-11T08:36:17.639Z | 1 |
| AWS Database Migration Service | https://aws.amazon.com/dms/ | 200 | 2026-10-11T08:47:07.753Z | 9 |
| Amazon S3 | https://aws.amazon.com/s3/ | n/a | n/a | 0 |
| Amazon EFS | https://aws.amazon.com/efs/ | n/a | n/a | 0 |
| AWS Storage Gateway | https://aws.amazon.com/storage-gateway/ | 200 | 2026-10-11T08:47:08.896Z | 1 |
| AWS DataSync | https://aws.amazon.com/datasync/ | 200 | 2026-10-11T08:36:17.038Z | 11 |
| AWS Backup | https://aws.amazon.com/backup/ | 200 | 2026-10-11T08:36:16.862Z | 4 |
| Amazon EC2 | https://aws.amazon.com/ec2/ | n/a | n/a | 0 |
| AWS Lambda | https://aws.amazon.com/lambda/ | n/a | n/a | 0 |
| Amazon ECS | https://aws.amazon.com/ecs/ | n/a | n/a | 0 |
| Amazon EKS | https://aws.amazon.com/eks/ | n/a | n/a | 0 |
| AWS Elastic Beanstalk | https://aws.amazon.com/elasticbeanstalk/ | 200 | 2026-10-11T08:36:17.819Z | 10 |
| AWS Identity and Access Management | https://aws.amazon.com/iam/ | 200 | 2026-10-11T08:47:08.888Z | 39 |
| AWS Key Management Service | https://aws.amazon.com/kms/ | 200 | 2026-10-11T08:47:09.076Z | 6 |
| AWS WAF | https://aws.amazon.com/waf/ | 200 | 2026-10-11T08:36:17.453Z | 13 |
| AWS Shield | https://aws.amazon.com/shield/ | 200 | 2026-10-11T08:36:18.181Z | 16 |
| Amazon GuardDuty | https://aws.amazon.com/guardduty/ | 200 | 2026-10-11T08:36:17.348Z | 15 |
| Amazon Inspector | https://aws.amazon.com/inspector/ | 200 | 2026-10-11T08:36:18.412Z | 21 |
| Amazon Macie | https://aws.amazon.com/macie/ | 200 | 2026-10-11T08:36:18.495Z | 6 |
| AWS Secrets Manager | https://aws.amazon.com/secrets-manager/ | 200 | 2026-10-11T08:36:18.575Z | 9 |
| Amazon CloudWatch | https://aws.amazon.com/cloudwatch/ | n/a | n/a | 0 |
| Amazon Relational Database Service | https://aws.amazon.com/rds/ | 200 | 2026-10-11T08:36:18.771Z | 15 |
| Amazon ElastiCache | https://aws.amazon.com/elasticache/ | 200 | 2026-10-11T08:47:08.363Z | 1 |
| Amazon SageMaker | https://aws.amazon.com/sagemaker/ | 200 | 2026-10-11T08:36:18.535Z | 1 |
| Amazon Athena | https://aws.amazon.com/athena/ | n/a | n/a | 0 |
| AWS Glue | https://aws.amazon.com/glue/ | 200 | 2026-10-11T08:36:18.885Z | 1 |
| Amazon Kinesis | https://aws.amazon.com/kinesis/ | n/a | n/a | 0 |
| AWS Support programs | https://aws.amazon.com/support/programs/ | 200 | 2026-10-11T08:47:09.747Z | 0 |

## Limitations

- This report records the outcome of an automated comparison against retrieved official AWS sources. It is not a human answer-key review.
- `verified` means the specific claim recorded for the item was matched against retrieved official AWS text that is stored with the item. It does not mean a human confirmed that the supplied answer is the unique correct answer.
- Corroboration rule: every option selected by the supplied answer is scored separately. An option is corroborated when a window of retrieved official AWS source text (a) covers at least half of that option's distinctive terms after generic terms are discarded, (b) contains every AWS service or product named in that option, (c) matches at least two scored terms (a single service name suffices when the option is just a service name), and (d) contains no near-miss negation about the claim's own words. The item is verified only when every selected option is corroborated.
- The `unsupported` status is deliberately narrow: it requires retrieved source text to negate the subject itself (for example "is not supported", "is no longer available", "is deprecated") within 120 characters of words from the claim that are not part of a named product. Property negations such as "the report does not include X" do not count, because they still assert that the thing named in the claim exists. A low or empty `unsupported` count is therefore expected, and is not evidence that no incorrect answers exist in the dataset.
- A run that reports zero `unsupported` items only means no source text met that narrow contradiction rule. It does not mean the supplied answers were confirmed correct by a human.
- When an option names no AWS service and has fewer than two distinctive terms, it cannot be corroborated lexically and is reported as `needs-review` with reason `claim-too-generic-to-verify`.
- Structural checks (valid ids, options present, answer resolves to an option) are deliberately excluded from status: passing them never produces `verified`.
- Items whose official documentation could not be retrieved are reported as `needs-review` with reason `source-evidence-unavailable`. No citation was invented for them.
- Items whose claim was not matched against retrieved source text are reported as `needs-review` with reason `no-corroborating-evidence-found`, not `verified`.
- Sources whose HTML extracts to fewer than 400 characters are treated as unusable and are never cited, even when they return HTTP 200.
- Client-rendered marketing pages are rejected when their extracted text never mentions the product named in the source entry, so they are not cited even though the request succeeded.
- Blocked items (q200, q250, q269, q626) keep their status until their answers are resolved against the original source.
- q339 remains flagged as a source-data inconsistency; its missing option was not inferred.
- Domain assignment follows the official CLF-C02 domain taxonomy, but the assignment rule is heuristic and its disagreements with the enrichment classifier are reported via assignmentMethod counts.

## Validation

Result: **PASS**

| Check | Result | Detail |
| --- | --- | --- |
| totals-match-question-count | PASS | status counts sum to 495, question count is 495 |
| domain-distribution-covers-every-item | PASS | domain distribution sums to 495 |
| domain-taxonomy-is-the-four-official-domains | PASS | taxonomy entries: Domain 1: Cloud Concepts | Domain 2: Security and Compliance | Domain 3: Cloud Technology and Services | Domain 4: Billing, Pricing, and Support |
| exam-guide-domain-names-match-taxonomy | PASS | parsed from retrieved PDF: Domain 1: Cloud Concepts | Domain 2: Security and Compliance | Domain 3: Cloud Technology and Services | Domain 4: Billing, Pricing, and Support |
| exam-guide-domain-weights-are-24-30-34-12 | PASS | weights from retrieved exam guide: 12, 24, 30, 34 |
| blocked-ids-are-exactly-the-expected-four | PASS | blocked ids: q200, q250, q269, q626 |
| blocked-q200-stays-blocked | PASS | q200 status is blocked |
| blocked-q250-stays-blocked | PASS | q250 status is blocked |
| blocked-q269-stays-blocked | PASS | q269 status is blocked |
| blocked-q626-stays-blocked | PASS | q626 status is blocked |
| q339-flagged-as-source-data-inconsistency | PASS | q339 status=needs-review flags=["source-data-inconsistency"] |
| q339-missing-option-not-inferred | PASS | q339 notes state that the missing option was not inferred |
| statuses-are-within-the-allowed-set | PASS | all items use verified|needs-review|unsupported|blocked |
| no-verified-item-without-recorded-claim-and-evidence | PASS | every verified item carries a claim, source URLs, an excerpt and an outcome of corroborated |
| structural-checks-never-produce-verified | PASS | no item is marked verified because structural checks passed |
| every-item-records-a-claim-or-an-explicit-reason | PASS | every item carries a claim string or an explicit reason |
| unchecked-items-are-not-verified | PASS | items without a checkedAt timestamp are never verified |
| unresolved-claims-list-matches-status-counts | PASS | unresolvedClaims=170, needs-review+unsupported=170 |
| no-item-cites-an-unavailable-source | PASS | items only cite sources that were actually retrieved |
| exam-guide-retrieved-and-parsed | PASS | http=200 domains=4 taskStatements=18 |
| question-inputs-unchanged-by-the-run | PASS | sha256 of every input matches the pre-run value |
| answers-and-options-never-rewritten | PASS | recorded answer snapshots match the input dataset |
| report-writes-are-confined-to-scripts-directory | PASS | writes: scripts/question-data/factual-verification-report.json, scripts/question-data/factual-verification-report.md, scripts/question-data/factual-verification-state.json, scripts/question-data/source-cache |

