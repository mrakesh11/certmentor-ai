export const examQuestions = [
    {
        "id": "q1",
        "text": "A company plans to use an Amazon Snowball Edge device to transfer files to the AWS Cloud.\nWhich activities related to a Snowball Edge device are available to the company at no cost?",
        "options": [
            {
                "id": "A",
                "text": "Use of the Snowball Edge appliance for a 10-day period"
            },
            {
                "id": "B",
                "text": "The transfer of data out of Amazon S3 and to the Snowball Edge appliance"
            },
            {
                "id": "C",
                "text": "The transfer of data from the Snowball Edge appliance into Amazon S3"
            },
            {
                "id": "D",
                "text": "Daily use of the Snowball Edge appliance after 10 days"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q2",
        "text": "A company has deployed applications on Amazon EC2 instances. The company needs to assess\napplication vulnerabilities and must identify infrastructure deployments that do not meet best practices.\nWhich AWS service can the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "B",
                "text": "Amazon Inspector"
            },
            {
                "id": "C",
                "text": "AWS Config"
            },
            {
                "id": "D",
                "text": "Amazon Guard Duty"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q3",
        "text": "A company has a centralized group of users with large file storage requirements that have exceeded the\nspace available on premises. The company wants to extend its file storage capabilities for this group\nwhile retaining the performance benefit of sharing content locally.\nWhat is the MOST operationally efficient AWS solution for this scenario?",
        "options": [
            {
                "id": "A",
                "text": "Create an Amazon S3 bucket for each user. Mount each bucket by using an S3 file system mounting utility."
            },
            {
                "id": "B",
                "text": "Configure and deploy an AWS Storage Gateway file gateway. Connect each user’s workstation to the file gateway."
            },
            {
                "id": "C",
                "text": "Move each user’s working environment to Amazon WorkSpaces. Set up an Amazon WorkDocs account for each user."
            },
            {
                "id": "D",
                "text": "Deploy an Amazon EC2 instance and attach an Amazon Elastic Block Store (Amazon EBS) Provisioned IOPS volume. Share the EBS volume directly with the users."
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q4",
        "text": "According to security best practices, how should an Amazon EC2 instance be given access to an Amazon\nS3 bucket?",
        "options": [
            {
                "id": "A",
                "text": "Hard code an IAM user’s secret key and access key directly in the application and upload the file."
            },
            {
                "id": "B",
                "text": "Store the IAM user’s secret key and access key in a text file on the EC2 instance, read the keys, then upload the file."
            },
            {
                "id": "C",
                "text": "Have the EC2 instance assume a role to obtain the privileges to upload the file."
            },
            {
                "id": "D",
                "text": "Modify the S3 bucket policy so that any service can upload to it at any time."
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q5",
        "text": "Which option is a customer responsibility when using Amazon DynamoDB under the AWS Shared\nResponsibility Model?",
        "options": [
            {
                "id": "A",
                "text": "Physical security of DynamoDB"
            },
            {
                "id": "B",
                "text": "Patching of DynamoDB"
            },
            {
                "id": "C",
                "text": "Access to DynamoDB tables"
            },
            {
                "id": "D",
                "text": "Encryption of data at rest in DynamoDB"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q6",
        "text": "Which option is a perspective that includes foundational capabilities of the AWS Cloud Adoption\nFramework (AWS CAF)?",
        "options": [
            {
                "id": "A",
                "text": "Sustainability"
            },
            {
                "id": "B",
                "text": "Performance efficiency"
            },
            {
                "id": "C",
                "text": "Governance"
            },
            {
                "id": "D",
                "text": "Reliability"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q7",
        "text": "A company is running and managing its own Docker environment on Amazon EC2 instances. The\ncompany wants an alternative to help manage cluster size, scheduling, and environment maintenance.\nWhich AWS service meets these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Lambda"
            },
            {
                "id": "B",
                "text": "Amazon RDS"
            },
            {
                "id": "C",
                "text": "AWS Fargate"
            },
            {
                "id": "D",
                "text": "Amazon Athena"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q8",
        "text": "A company wants to run a NoSQL database on Amazon EC2 instances.\nWhich task is the responsibility of AWS in this scenario?",
        "options": [
            {
                "id": "A",
                "text": "Update the guest operating system of the EC2 instances."
            },
            {
                "id": "B",
                "text": "Maintain high availability at the database layer."
            },
            {
                "id": "C",
                "text": "Patch the physical infrastructure that hosts the EC2 instances."
            },
            {
                "id": "D",
                "text": "Configure the security group firewall."
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q9",
        "text": "Which AWS services or tools can identify rightsizing opportunities for Amazon EC2 instances? (Choose\ntwo.)",
        "options": [
            {
                "id": "A",
                "text": "AWS Cost Explorer"
            },
            {
                "id": "B",
                "text": "AWS Billing Conductor"
            },
            {
                "id": "C",
                "text": "Amazon CodeGuru"
            },
            {
                "id": "D",
                "text": "Amazon SageMaker"
            },
            {
                "id": "E",
                "text": "AWS Compute Optimizer"
            }
        ],
        "answer": "AE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q10",
        "text": "Which of the following are benefits of using AWS Trusted Advisor? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Providing high-performance container orchestration"
            },
            {
                "id": "B",
                "text": "Creating and rotating encryption keys"
            },
            {
                "id": "C",
                "text": "Detecting underutilized resources to save costs"
            },
            {
                "id": "D",
                "text": "Improving security by proactively monitoring the AWS environment"
            },
            {
                "id": "E",
                "text": "Implementing enforced tagging across AWS resources"
            }
        ],
        "answer": "CD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q11",
        "text": "Which of the following is an advantage that users experience when they move on-premises workloads\nto the AWS Cloud?",
        "options": [
            {
                "id": "A",
                "text": "Elimination of expenses for running and maintaining data centers"
            },
            {
                "id": "B",
                "text": "Price discounts that are identical to discounts from hardware providers"
            },
            {
                "id": "C",
                "text": "Distribution of all operational controls to AWS"
            },
            {
                "id": "D",
                "text": "Elimination of operational expenses"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q12",
        "text": "A company wants to manage deployed IT services and govern its infrastructure as code (IaC) templates.\nWhich AWS service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Resource Explorer"
            },
            {
                "id": "B",
                "text": "AWS Service Catalog"
            },
            {
                "id": "C",
                "text": "AWS Organizations"
            },
            {
                "id": "D",
                "text": "AWS Systems Manager"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q13",
        "text": "Which AWS service or tool helps users visualize, understand, and manage spending and usage over time?",
        "options": [
            {
                "id": "A",
                "text": "AWS Organizations"
            },
            {
                "id": "B",
                "text": "AWS Pricing Calculator"
            },
            {
                "id": "C",
                "text": "AWS Cost Explorer"
            },
            {
                "id": "D",
                "text": "AWS Service Catalog"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q14",
        "text": "A company is using a central data platform to manage multiple types of data for its customers. The\ncompany wants to use AWS services to discover, transform, and visualize the data.\nWhich combination of AWS services should the company use to meet these requirements? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "AWS Glue"
            },
            {
                "id": "B",
                "text": "Amazon Elastic File System (Amazon EFS)"
            },
            {
                "id": "C",
                "text": "Amazon Redshift"
            },
            {
                "id": "D",
                "text": "Amazon QuickSight"
            },
            {
                "id": "E",
                "text": "Amazon Quantum Ledger Database (Amazon QLDB)"
            }
        ],
        "answer": "AD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q15",
        "text": "A global company wants to migrate its third-party applications to the AWS Cloud. The company wants\nhelp from a global team of experts to complete the migration faster and more reliably in accordance\nwith AWS internal best practices.\nWhich AWS service or resource will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Support"
            },
            {
                "id": "B",
                "text": "AWS Professional Services"
            },
            {
                "id": "C",
                "text": "AWS Launch Wizard"
            },
            {
                "id": "D",
                "text": "AWS Managed Services (AMS)"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q16",
        "text": "An e-learning platform needs to run an application for 2 months each year. The application will be\ndeployed on Amazon EC2 instances. Any application downtime during those 2 months must be\navoided.\nWhich EC2 purchasing option will meet these requirements MOST cost-effectively?",
        "options": [
            {
                "id": "A",
                "text": "Reserved Instances"
            },
            {
                "id": "B",
                "text": "Dedicated Hosts"
            },
            {
                "id": "C",
                "text": "Spot Instances"
            },
            {
                "id": "D",
                "text": "On-Demand Instances"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q17",
        "text": "A developer wants to deploy an application quickly on AWS without manually creating the required\nresources.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon EC2"
            },
            {
                "id": "B",
                "text": "AWS Elastic Beanstalk"
            },
            {
                "id": "C",
                "text": "AWS CodeBuild"
            },
            {
                "id": "D",
                "text": "Amazon Personalize,"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q18",
        "text": "A company is storing sensitive customer data in an Amazon S3 bucket. The company wants to protect\nthe data from accidental deletion or overwriting.\nWhich S3 feature should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "S3 Lifecycle rules"
            },
            {
                "id": "B",
                "text": "S3 Versioning"
            },
            {
                "id": "C",
                "text": "S3 bucket policies"
            },
            {
                "id": "D",
                "text": "S3 server-side encryption"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q19",
        "text": "Which AWS service provides the ability to manage infrastructure as code?",
        "options": [
            {
                "id": "A",
                "text": "AWS CodePipeline"
            },
            {
                "id": "B",
                "text": "AWS Code Deploy"
            },
            {
                "id": "C",
                "text": "AWS Direct Connect"
            },
            {
                "id": "D",
                "text": "AWS CloudFormation"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q20",
        "text": "An online gaming company needs to choose a purchasing option to run its Amazon EC2 instances for 1\nyear. The web traffic is consistent, and any increases in traffic are predictable. The EC2 instances must\nbe online and available without any disruption.\nWhich EC2 instance purchasing option will meet these requirements MOST cost-effectively?",
        "options": [
            {
                "id": "A",
                "text": "On-Demand Instances"
            },
            {
                "id": "B",
                "text": "Reserved Instances"
            },
            {
                "id": "C",
                "text": "Spot Instances"
            },
            {
                "id": "D",
                "text": "Spot Fleet"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q21",
        "text": "Which AWS service or feature allows a user to establish a dedicated network connection between a\ncompany’s on-premises data center and the AWS Cloud?",
        "options": [
            {
                "id": "A",
                "text": "AWS Direct Connect"
            },
            {
                "id": "B",
                "text": "VPC peering"
            },
            {
                "id": "C",
                "text": "AWS VPN"
            },
            {
                "id": "D",
                "text": "Amazon Route 53"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q22",
        "text": "Which option is a physical location of the AWS global infrastructure?",
        "options": [
            {
                "id": "A",
                "text": "AWS DataSync"
            },
            {
                "id": "B",
                "text": "AWS Region"
            },
            {
                "id": "C",
                "text": "Amazon Connect"
            },
            {
                "id": "D",
                "text": "AWS Organizations"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q23",
        "text": "A company wants to protect its AWS Cloud information, systems, and assets while performing risk\nassessment and mitigation tasks.\nWhich pillar of the AWS Well-Architected Framework is supported by these goals?",
        "options": [
            {
                "id": "A",
                "text": "Reliability"
            },
            {
                "id": "B",
                "text": "Security"
            },
            {
                "id": "C",
                "text": "Operational excellence"
            },
            {
                "id": "D",
                "text": "Performance efficiency"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q24",
        "text": "What is the purpose of having an internet gateway within a VPC?",
        "options": [
            {
                "id": "A",
                "text": "To create a VPN connection to the VPC"
            },
            {
                "id": "B",
                "text": "To allow communication between the VPC and the internet"
            },
            {
                "id": "C",
                "text": "To impose bandwidth constraints on internet traffic"
            },
            {
                "id": "D",
                "text": "To load balance traffic from the internet across Amazon EC2 instances"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q25",
        "text": "A company is running a monolithic on-premises application that does not scale and is difficult to\nmaintain. The company has a plan to migrate the application to AWS and divide the application into\nmicroservices.\nWhich best practice of the AWS Well-Architected Framework is the company following with this plan?",
        "options": [
            {
                "id": "A",
                "text": "Integrate functional testing as part of AWS deployment."
            },
            {
                "id": "B",
                "text": "Use automation to deploy changes."
            },
            {
                "id": "C",
                "text": "Deploy the application to multiple locations."
            },
            {
                "id": "D",
                "text": "Implement loosely coupled dependencies."
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q26",
        "text": "A company has an AWS account. The company wants to audit its password and access key rotation\ndetails for compliance purposes.\nWhich AWS service or tool will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "IAM Access Analyzer"
            },
            {
                "id": "B",
                "text": "AWS Artifact"
            },
            {
                "id": "C",
                "text": "IAM credential report"
            },
            {
                "id": "D",
                "text": "AWS Audit Manager"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q27",
        "text": "A company wants to receive a notification when a specific AWS cost threshold is reached.\nWhich AWS services or tools can the company use to meet this requirement? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Amazon Simple Queue Service (Amazon SQS)"
            },
            {
                "id": "B",
                "text": "AWS Budgets"
            },
            {
                "id": "C",
                "text": "Cost Explorer"
            },
            {
                "id": "D",
                "text": "Amazon CloudWatch"
            },
            {
                "id": "E",
                "text": "AWS Cost and Usage Report"
            }
        ],
        "answer": "BD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q28",
        "text": "Which AWS service or resource provides answers to the most frequently asked security-related questions\nthat AWS receives from its users?",
        "options": [
            {
                "id": "A",
                "text": "AWS Artifact"
            },
            {
                "id": "B",
                "text": "Amazon Connect"
            },
            {
                "id": "C",
                "text": "AWS Chatbot"
            },
            {
                "id": "D",
                "text": "AWS Knowledge Center"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q29",
        "text": "Which tasks are customer responsibilities, according to the AWS shared responsibility model? (Choose\ntwo.)",
        "options": [
            {
                "id": "A",
                "text": "Configure the AWS provided security group firewall."
            },
            {
                "id": "B",
                "text": "Classify company assets in the AWS Cloud."
            },
            {
                "id": "C",
                "text": "Determine which Availability Zones to use for Amazon S3 buckets."
            },
            {
                "id": "D",
                "text": "Patch or upgrade Amazon DynamoDB."
            },
            {
                "id": "E",
                "text": "Select Amazon EC2 instances to run AWS Lambda on."
            }
        ],
        "answer": "AB",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q30",
        "text": "Which of the following are pillars of the AWS Well-Architected Framework? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Availability"
            },
            {
                "id": "B",
                "text": "Reliability"
            },
            {
                "id": "C",
                "text": "Scalability"
            },
            {
                "id": "D",
                "text": "Responsive design"
            },
            {
                "id": "E",
                "text": "Operational excellence"
            }
        ],
        "answer": "BE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q31",
        "text": "Which AWS service or feature is used to send both text and email messages from distributed\napplications?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Simple Notification Service (Amazon SNS)"
            },
            {
                "id": "B",
                "text": "Amazon Simple Email Service (Amazon SES)"
            },
            {
                "id": "C",
                "text": "Amazon CloudWatch alerts"
            },
            {
                "id": "D",
                "text": "Amazon Simple Queue Service (Amazon SQS)"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q32",
        "text": "A user needs programmatic access to AWS resources through the AWS CLI or the AWS API.\nWhich option will provide the user with the appropriate access?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Inspector"
            },
            {
                "id": "B",
                "text": "Access keys"
            },
            {
                "id": "C",
                "text": "SSH public keys"
            },
            {
                "id": "D",
                "text": "AWS Key Management Service (AWS KMS) keys"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q33",
        "text": "A company runs thousands of simultaneous simulations using AWS Batch. Each simulation is stateless,\nis fault tolerant, and runs for up to 3 hours.\nWhich pricing model enables the company to optimize costs and meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Reserved Instances"
            },
            {
                "id": "B",
                "text": "Spot Instances"
            },
            {
                "id": "C",
                "text": "On-Demand Instances"
            },
            {
                "id": "D",
                "text": "Dedicated Instances"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q34",
        "text": "What does the concept of agility mean in AWS Cloud computing? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "The speed at which AWS resources are implemented"
            },
            {
                "id": "B",
                "text": "The speed at which AWS creates new AWS Regions"
            },
            {
                "id": "C",
                "text": "The ability to experiment quickly"
            },
            {
                "id": "D",
                "text": "The elimination of wasted capacity"
            },
            {
                "id": "E",
                "text": "The low cost of entry into cloud computing"
            }
        ],
        "answer": "AC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q35",
        "text": "A company needs to block SQL injection attacks.\nWhich AWS service or feature can meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS WAF"
            },
            {
                "id": "B",
                "text": "AWS Shield"
            },
            {
                "id": "C",
                "text": "Network ACLs"
            },
            {
                "id": "D",
                "text": "Security groups"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q36",
        "text": "Which AWS service or feature identifies whether an Amazon S3 bucket or an IAM role has been shared\nwith an external entity?",
        "options": [
            {
                "id": "A",
                "text": "AWS Service Catalog"
            },
            {
                "id": "B",
                "text": "AWS Systems Manager"
            },
            {
                "id": "C",
                "text": "AWS IAM Access Analyzer"
            },
            {
                "id": "D",
                "text": "AWS Organizations"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q37",
        "text": "A cloud practitioner needs to obtain AWS compliance reports before migrating an environment to the\nAWS Cloud.\nHow can these reports be generated?",
        "options": [
            {
                "id": "A",
                "text": "Contact the AWS Compliance team."
            },
            {
                "id": "B",
                "text": "Download the reports from AWS Artifact."
            },
            {
                "id": "C",
                "text": "Open a case with AWS Support."
            },
            {
                "id": "D",
                "text": "Generate the reports with Amazon Macie."
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q38",
        "text": "An ecommerce company has migrated its IT infrastructure from an on-premises data center to the AWS\nCloud.\nWhich cost is the company’s direct responsibility?",
        "options": [
            {
                "id": "A",
                "text": "Cost of application software licenses"
            },
            {
                "id": "B",
                "text": "Cost of the hardware infrastructure on AWS"
            },
            {
                "id": "C",
                "text": "Cost of power for the AWS servers"
            },
            {
                "id": "D",
                "text": "Cost of physical security for the AWS data centre"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q39",
        "text": "A company is setting up AWS Identity and Access Management (IAM) on an AWS account.\nWhich recommendation complies with IAM security best practices?",
        "options": [
            {
                "id": "A",
                "text": "Use the account root user access keys for administrative tasks."
            },
            {
                "id": "B",
                "text": "Grant broad permissions so that all company employees can access the resources they need."
            },
            {
                "id": "C",
                "text": "Turn on multi-factor authentication (MFA) for added security during the login process."
            },
            {
                "id": "D",
                "text": "Avoid rotating credentials to prevent issues in production applications."
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q40",
        "text": "Elasticity in the AWS Cloud refers to which of the following? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "How quickly an Amazon EC2 instance can be restarted"
            },
            {
                "id": "B",
                "text": "The ability to right size resources as demand shifts"
            },
            {
                "id": "C",
                "text": "The maximum amount of RAM an Amazon EC2 instance can use"
            },
            {
                "id": "D",
                "text": "The pay-as-you-go billing model"
            },
            {
                "id": "E",
                "text": "How easily resources can be procured when they are needed"
            }
        ],
        "answer": "BE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q41",
        "text": "Which service enables customers to audit API calls in their AWS accounts?",
        "options": [
            {
                "id": "A",
                "text": "AWS CloudTrail"
            },
            {
                "id": "B",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "C",
                "text": "Amazon Inspector"
            },
            {
                "id": "D",
                "text": "AWS X-Ray"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q42",
        "text": "What is a customer responsibility when using AWS Lambda according to the AWS shared responsibility\nmodel?",
        "options": [
            {
                "id": "A",
                "text": "Managing the code within the Lambda function"
            },
            {
                "id": "B",
                "text": "Confirming that the hardware is working in the data center"
            },
            {
                "id": "C",
                "text": "Patching the operating system"
            },
            {
                "id": "D",
                "text": "Shutting down Lambda functions when they are no longer in use"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q43",
        "text": "A company has 5 TB of data stored in Amazon S3. The company plans to occasionally run queries on the\ndata for analysis.\nWhich AWS service should the company use to run these queries in the MOST cost-effective manner?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Redshift"
            },
            {
                "id": "B",
                "text": "Amazon Athena"
            },
            {
                "id": "C",
                "text": "Amazon Kinesis"
            },
            {
                "id": "D",
                "text": "Amazon RDS"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q44",
        "text": "Which AWS service can be used at no additional cost?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Sage Maker"
            },
            {
                "id": "B",
                "text": "AWS Config"
            },
            {
                "id": "C",
                "text": "AWS Organizations"
            },
            {
                "id": "D",
                "text": "Amazon CloudWatch"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q45",
        "text": "Which AWS Cloud Adoption Framework (AWS CAF) capability belongs to the people perspective?",
        "options": [
            {
                "id": "A",
                "text": "Data architecture"
            },
            {
                "id": "B",
                "text": "Event management"
            },
            {
                "id": "C",
                "text": "Cloud fluency"
            },
            {
                "id": "D",
                "text": "Strategic partnership"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q46",
        "text": "A company wants to make an upfront commitment for continued use of its production Amazon EC2\ninstances in exchange for a reduced overall cost.\nWhich pricing options meet these requirements with the LOWEST cost? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Spot Instances"
            },
            {
                "id": "B",
                "text": "On-Demand Instances"
            },
            {
                "id": "C",
                "text": "Reserved Instances"
            },
            {
                "id": "D",
                "text": "Savings Plans"
            },
            {
                "id": "E",
                "text": "Dedicated Hosts"
            }
        ],
        "answer": "CD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q47",
        "text": "A company wants to migrate its on-premises relational databases to the AWS Cloud. The company wants\nto use infrastructure as close to its current geographical location as possible.\nWhich AWS service or resource should the company use to select its Amazon RDS deployment area?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Connect"
            },
            {
                "id": "B",
                "text": "AWS Wavelength"
            },
            {
                "id": "C",
                "text": "AWS Regions"
            },
            {
                "id": "D",
                "text": "AWS Direct Connect"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q48",
        "text": "A company is exploring the use of the AWS Cloud and needs to create a cost estimate for a project\nbefore the infrastructure is provisioned.\nWhich AWS service or feature can be used to estimate costs before deployment?",
        "options": [
            {
                "id": "A",
                "text": "AWS Free Tier"
            },
            {
                "id": "B",
                "text": "AWS Pricing Calculator"
            },
            {
                "id": "C",
                "text": "AWS Billing and Cost Management"
            },
            {
                "id": "D",
                "text": "AWS Cost and Usage Report"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q49",
        "text": "A company is building an application that needs to deliver images and videos globally with minimal\nlatency.\nWhich approach can the company use to accomplish this in a cost-effective manner?",
        "options": [
            {
                "id": "A",
                "text": "Deliver the content through Amazon CloudFront."
            },
            {
                "id": "B",
                "text": "Store the content on Amazon S3 and enable S3 cross-region replication."
            },
            {
                "id": "C",
                "text": "Implement a VPN across multiple AWS Regions."
            },
            {
                "id": "D",
                "text": "Deliver the content through AWS Private Link."
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q50",
        "text": "Which option is a benefit of the economies of scale based on the advantages of cloud computing?",
        "options": [
            {
                "id": "A",
                "text": "The ability to trade variable expense for fixed expense"
            },
            {
                "id": "B",
                "text": "Increased speed and agility"
            },
            {
                "id": "C",
                "text": "Lower variable costs over fixed costs"
            },
            {
                "id": "D",
                "text": "Increased operational costs across data centers"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q51",
        "text": "Which of the following is a software development framework that a company can use to define cloud\nresources as code and provision the resources through AWS CloudFormation?",
        "options": [
            {
                "id": "A",
                "text": "AWS CLI"
            },
            {
                "id": "B",
                "text": "AWS Developer Centre"
            },
            {
                "id": "C",
                "text": "AWS Cloud Development Kit (AWS CDK)"
            },
            {
                "id": "D",
                "text": "AWS Code Star"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q52",
        "text": "A company is developing an application that uses multiple AWS services. The application needs to use\ntemporary, limited-privilege credentials for authentication with other AWS APIs.\nWhich AWS service or feature should the company use to meet these authentication requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon API Gateway"
            },
            {
                "id": "B",
                "text": "IAM users"
            },
            {
                "id": "C",
                "text": "AWS Security Token Service (AWS STS)"
            },
            {
                "id": "D",
                "text": "IAM instance profiles"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q53",
        "text": "Which AWS service is a cloud security posture management (CSPM) service that aggregates alerts from\nvarious AWS services and partner products in a standardized format?",
        "options": [
            {
                "id": "A",
                "text": "AWS Security Hub"
            },
            {
                "id": "B",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "C",
                "text": "Amazon Event Bridge"
            },
            {
                "id": "D",
                "text": "Amazon Guard Duty"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q54",
        "text": "Which AWS service is always provided at no charge?",
        "options": [
            {
                "id": "A",
                "text": "Amazon S3"
            },
            {
                "id": "B",
                "text": "AWS Identity and Access Management (IAM)"
            },
            {
                "id": "C",
                "text": "Elastic Load Balancers"
            },
            {
                "id": "D",
                "text": "AWS WAF"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q55",
        "text": "To reduce costs, a company is planning to migrate a NoSQL database to AWS.\nWhich AWS service is fully managed and can automatically scale throughput capacity to meet database\nworkload demands?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Redshift"
            },
            {
                "id": "B",
                "text": "Amazon Aurora"
            },
            {
                "id": "C",
                "text": "Amazon DynamoDB"
            },
            {
                "id": "D",
                "text": "Amazon RDS"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q56",
        "text": "A company is using Amazon DynamoDB.\nWhich task is the company’s responsibility, according to the AWS shared responsibility model?",
        "options": [
            {
                "id": "A",
                "text": "Patch the operating system."
            },
            {
                "id": "B",
                "text": "Provision hosts."
            },
            {
                "id": "C",
                "text": "Manage database access permissions."
            },
            {
                "id": "D",
                "text": "Secure the operating system."
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q57",
        "text": "A company has a test AWS environment. A company is planning on testing an application within AWS.\nThe application testing can be interrupted and does not need to run continuously.\nWhich Amazon EC2 purchasing option will meet these requirements MOST cost-effectively?",
        "options": [
            {
                "id": "A",
                "text": "On-Demand Instances"
            },
            {
                "id": "B",
                "text": "Dedicated Instances"
            },
            {
                "id": "C",
                "text": "Spot Instances"
            },
            {
                "id": "D",
                "text": "Reserved Instances"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q58",
        "text": "Which AWS service gives users the ability to discover and protect sensitive data that is stored in Amazon\nS3 buckets?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Macie"
            },
            {
                "id": "B",
                "text": "Amazon Detective"
            },
            {
                "id": "C",
                "text": "Amazon Guard Duty"
            },
            {
                "id": "D",
                "text": "AWS IAM Access Analyzer"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q59",
        "text": "Which of the following services can be used to block network traffic to an instance? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Security groups"
            },
            {
                "id": "B",
                "text": "Amazon Virtual Private Cloud (Amazon VPC) flow logs"
            },
            {
                "id": "C",
                "text": "Network ACLs"
            },
            {
                "id": "D",
                "text": "Amazon CloudWatch"
            },
            {
                "id": "E",
                "text": "AWS CloudTrail"
            }
        ],
        "answer": "AC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q60",
        "text": "Which AWS service can identify when an Amazon EC2 instance was terminated?",
        "options": [
            {
                "id": "A",
                "text": "AWS Identity and Access Management (IAM)"
            },
            {
                "id": "B",
                "text": "AWS CloudTrail"
            },
            {
                "id": "C",
                "text": "AWS Compute Optimizer"
            },
            {
                "id": "D",
                "text": "Amazon Event Bridge"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q61",
        "text": "Which of the following is a fully managed MySQL-compatible database?",
        "options": [
            {
                "id": "A",
                "text": "Amazon S3"
            },
            {
                "id": "B",
                "text": "Amazon DynamoDB"
            },
            {
                "id": "C",
                "text": "Amazon Redshift"
            },
            {
                "id": "D",
                "text": "Amazon Aurora"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q62",
        "text": "Which AWS service supports a hybrid architecture that gives users the ability to extend AWS\ninfrastructure, AWS services, APIs, and tools to data centres, co-location environments, or on-premises\nfacilities?",
        "options": [
            {
                "id": "A",
                "text": "AWS Snowmobile"
            },
            {
                "id": "B",
                "text": "AWS Local Zones"
            },
            {
                "id": "C",
                "text": "AWS Outposts"
            },
            {
                "id": "D",
                "text": "AWS Fargate"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q63",
        "text": "Which AWS service can run a managed PostgreSQL database that provides online transaction processing\n(OLTP)?",
        "options": [
            {
                "id": "A",
                "text": "Amazon DynamoDB"
            },
            {
                "id": "B",
                "text": "Amazon Athena"
            },
            {
                "id": "C",
                "text": "Amazon RDS"
            },
            {
                "id": "D",
                "text": "Amazon EMR"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q64",
        "text": "A company wants to provide managed Windows virtual desktops and applications to its remote\nemployees over secure network connections.\nWhich AWS services can the company use to meet these requirements? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Amazon Connect"
            },
            {
                "id": "B",
                "text": "Amazon AppStream 2.0"
            },
            {
                "id": "C",
                "text": "Amazon Workspaces"
            },
            {
                "id": "D",
                "text": "AWS Site-to-Site VPN"
            },
            {
                "id": "E",
                "text": "Amazon Elastic Container Service (Amazon ECS)"
            }
        ],
        "answer": "BC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q65",
        "text": "A company wants to monitor for misconfigured security groups that are allowing unrestricted access to\nspecific ports.\nWhich AWS service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "B",
                "text": "Amazon CloudWatch"
            },
            {
                "id": "C",
                "text": "Amazon Guard Duty"
            },
            {
                "id": "D",
                "text": "AWS Health Dashboard"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q66",
        "text": "Which AWS service is a key-value database that provides sub-millisecond latency on a large scale?",
        "options": [
            {
                "id": "A",
                "text": "Amazon DynamoDB"
            },
            {
                "id": "B",
                "text": "Amazon Aurora"
            },
            {
                "id": "C",
                "text": "Amazon Document DB (with MongoDB compatibility)"
            },
            {
                "id": "D",
                "text": "Amazon Neptune"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q67",
        "text": "A company is deploying a machine learning (ML) research project that will require a lot of compute\npower over several months. The ML processing jobs do not need to run at specific times.\nWhich Amazon EC2 instance purchasing option will meet these requirements at the lowest cost?",
        "options": [
            {
                "id": "A",
                "text": "On-Demand Instances"
            },
            {
                "id": "B",
                "text": "Spot Instances"
            },
            {
                "id": "C",
                "text": "Reserved Instances"
            },
            {
                "id": "D",
                "text": "Dedicated Instances"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q68",
        "text": "Which AWS services or features provide disaster recovery solutions for Amazon EC2 instances? (Choose\ntwo.)",
        "options": [
            {
                "id": "A",
                "text": "EC2 Reserved Instances"
            },
            {
                "id": "B",
                "text": "EC2 Amazon Machine Images (AMIs)"
            },
            {
                "id": "C",
                "text": "Amazon Elastic Block Store (Amazon EBS) snapshots"
            },
            {
                "id": "D",
                "text": "AWS Shield"
            },
            {
                "id": "E",
                "text": "Amazon Guard Duty"
            }
        ],
        "answer": "BC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q69",
        "text": "Which AWS service provides command line access to AWS tools and resources directly from a web\nbrowser?",
        "options": [
            {
                "id": "A",
                "text": "AWS CloudHSM"
            },
            {
                "id": "B",
                "text": "AWS Cloud Shell"
            },
            {
                "id": "C",
                "text": "Amazon Workspaces"
            },
            {
                "id": "D",
                "text": "AWS Cloud Map"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q70",
        "text": "A network engineer needs to build a hybrid cloud architecture connecting on-premises networks to the\nAWS Cloud using AWS Direct Connect. The company has a few VPCs in a single AWS Region and expects\nto increase the number of VPCs to hundreds over time.\nWhich AWS service or feature should the engineer use to simplify and scale this connectivity as the VPCs\nincrease in number?",
        "options": [
            {
                "id": "A",
                "text": "VPC endpoints"
            },
            {
                "id": "B",
                "text": "AWS Transit Gateway"
            },
            {
                "id": "C",
                "text": "Amazon Route 53"
            },
            {
                "id": "D",
                "text": "AWS Secrets Manager"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q71",
        "text": "A company wants to assess its operational readiness. It also wants to identify and mitigate any\noperational risks ahead of a new product launch.\nWhich AWS Support plan offers guidance and support for this kind of event at no additional charge?",
        "options": [
            {
                "id": "A",
                "text": "AWS Business Support"
            },
            {
                "id": "B",
                "text": "AWS Basic Support"
            },
            {
                "id": "C",
                "text": "AWS Developer Support"
            },
            {
                "id": "D",
                "text": "AWS Enterprise Support"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q72",
        "text": "A company wants to establish a schedule for rotating database user credentials.\nWhich AWS service will support this requirement with the LEAST amount of operational overhead?",
        "options": [
            {
                "id": "A",
                "text": "AWS Systems Manager"
            },
            {
                "id": "B",
                "text": "AWS Secrets Manager"
            },
            {
                "id": "C",
                "text": "AWS License Manager"
            },
            {
                "id": "D",
                "text": "AWS Managed Services"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q73",
        "text": "Which AWS service or feature can be used to create a private connection between an on-premises\nworkload and an AWS Cloud workload?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Route 53"
            },
            {
                "id": "B",
                "text": "Amazon Macie"
            },
            {
                "id": "C",
                "text": "AWS Direct Connect"
            },
            {
                "id": "D",
                "text": "AWS Private Link"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q74",
        "text": "Which AWS service is used to provide encryption for Amazon EBS?",
        "options": [
            {
                "id": "A",
                "text": "AWS Certificate Manager"
            },
            {
                "id": "B",
                "text": "AWS Systems Manager"
            },
            {
                "id": "C",
                "text": "AWS KMS"
            },
            {
                "id": "D",
                "text": "AWS Config"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q75",
        "text": "A company wants to manage its AWS Cloud resources through a web interface.\nWhich AWS service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Management Console"
            },
            {
                "id": "B",
                "text": "AWS CLI"
            },
            {
                "id": "C",
                "text": "AWS SDK"
            },
            {
                "id": "D",
                "text": "AWS Cloud9"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q76",
        "text": "Which of the following are advantages of the AWS Cloud? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Trade variable expenses for capital expenses"
            },
            {
                "id": "B",
                "text": "High economies of scale"
            },
            {
                "id": "C",
                "text": "Launch globally in minutes"
            },
            {
                "id": "D",
                "text": "Focus on managing hardware infrastructure"
            },
            {
                "id": "E",
                "text": "Overprovision to ensure capacity"
            }
        ],
        "answer": "BC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q77",
        "text": "Which AWS Cloud benefit is shown by an architecture’s ability to withstand failures with minimal\ndowntime?",
        "options": [
            {
                "id": "A",
                "text": "Agility"
            },
            {
                "id": "B",
                "text": "Elasticity"
            },
            {
                "id": "C",
                "text": "Scalability"
            },
            {
                "id": "D",
                "text": "High availability"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q78",
        "text": "A developer needs to maintain a development environment infrastructure and a production\nenvironment infrastructure in a repeatable fashion.\nWhich AWS service should the developer use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Ground Station"
            },
            {
                "id": "B",
                "text": "AWS Shield"
            },
            {
                "id": "C",
                "text": "AWS IoT Device Defender"
            },
            {
                "id": "D",
                "text": "AWS CloudFormation"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q79",
        "text": "Which task is the customer’s responsibility, according to the AWS shared responsibility model?",
        "options": [
            {
                "id": "A",
                "text": "Maintain the security of the AWS Cloud."
            },
            {
                "id": "B",
                "text": "Configure firewalls and networks."
            },
            {
                "id": "C",
                "text": "Patch the operating system of Amazon RDS instances."
            },
            {
                "id": "D",
                "text": "Implement physical and environmental controls."
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q80",
        "text": "Which AWS service helps deliver highly available applications with fast failover for multi-Region and\nMulti-AZ architectures?",
        "options": [
            {
                "id": "A",
                "text": "AWS WAF"
            },
            {
                "id": "B",
                "text": "AWS Global Accelerator"
            },
            {
                "id": "C",
                "text": "AWS Shield"
            },
            {
                "id": "D",
                "text": "AWS Direct Connect"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q81",
        "text": "A company has a set of ecommerce applications. The applications need to be able to send messages to\neach other.\nWhich AWS service meets this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Auto Scaling"
            },
            {
                "id": "B",
                "text": "Elastic Load Balancing"
            },
            {
                "id": "C",
                "text": "Amazon Simple Queue Service (Amazon SQS)"
            },
            {
                "id": "D",
                "text": "Amazon Kinesis Data Streams"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q82",
        "text": "What are the benefits of consolidated billing for AWS Cloud services? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Volume discounts"
            },
            {
                "id": "B",
                "text": "A minimal additional fee for use"
            },
            {
                "id": "C",
                "text": "One bill for multiple accounts"
            },
            {
                "id": "D",
                "text": "Installment payment options"
            },
            {
                "id": "E",
                "text": "Custom cost and usage budget creation"
            }
        ],
        "answer": "AC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q83",
        "text": "A user wants to review all Amazon S3 buckets with ACLs and S3 bucket policies in the S3 console.\nWhich AWS service or resource will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "S3 Multi-Region Access Points"
            },
            {
                "id": "B",
                "text": "S3 Storage Lens"
            },
            {
                "id": "C",
                "text": "AWS IAM Identity Centre (AWS Single Sign-On)"
            },
            {
                "id": "D",
                "text": "Access Analyzer for S3"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q84",
        "text": "What is the best resource for a user to find compliance-related information and reports about AWS?",
        "options": [
            {
                "id": "A",
                "text": "AWS Artifact"
            },
            {
                "id": "B",
                "text": "AWS Marketplace"
            },
            {
                "id": "C",
                "text": "Amazon Inspector"
            },
            {
                "id": "D",
                "text": "AWS Support"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q85",
        "text": "Which AWS service enables companies to deploy an application close to end users?",
        "options": [
            {
                "id": "A",
                "text": "Amazon CloudFront"
            },
            {
                "id": "B",
                "text": "AWS Auto Scaling"
            },
            {
                "id": "C",
                "text": "AWS AppSync"
            },
            {
                "id": "D",
                "text": "Amazon Route 53"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q86",
        "text": "Which AWS service or feature improves network performance by sending traffic through the AWS\nworldwide network infrastructure?",
        "options": [
            {
                "id": "A",
                "text": "Route table"
            },
            {
                "id": "B",
                "text": "AWS Transit Gateway"
            },
            {
                "id": "C",
                "text": "AWS Global Accelerator"
            },
            {
                "id": "D",
                "text": "Amazon VPC"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q87",
        "text": "Which AWS service provides highly durable object storage?",
        "options": [
            {
                "id": "A",
                "text": "Amazon S3"
            },
            {
                "id": "B",
                "text": "Amazon Elastic File System (Amazon EFS)"
            },
            {
                "id": "C",
                "text": "Amazon Elastic Block Store (Amazon EBS)"
            },
            {
                "id": "D",
                "text": "Amazon FSx"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q88",
        "text": "Which responsibility belongs to AWS when a company hosts its databases on Amazon EC2 instances?",
        "options": [
            {
                "id": "A",
                "text": "Database backups"
            },
            {
                "id": "B",
                "text": "Database software patches"
            },
            {
                "id": "C",
                "text": "Operating system patches"
            },
            {
                "id": "D",
                "text": "Operating system installations"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q89",
        "text": "Which of the following are advantages of moving to the AWS Cloud? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "The ability to turn over the responsibility for all security to AWS."
            },
            {
                "id": "B",
                "text": "The ability to use the pay-as-you-go model."
            },
            {
                "id": "C",
                "text": "The ability to have full control over the physical infrastructure."
            },
            {
                "id": "D",
                "text": "No longer having to guess what capacity will be required."
            },
            {
                "id": "E",
                "text": "No longer worrying about user’s access controls."
            }
        ],
        "answer": "BD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q90",
        "text": "Which AWS service is a hybrid cloud storage service that provides on-premises users access to virtually\nunlimited cloud storage?",
        "options": [
            {
                "id": "A",
                "text": "AWS Data Sync"
            },
            {
                "id": "B",
                "text": "Amazon S3 Glacier"
            },
            {
                "id": "C",
                "text": "AWS Storage Gateway"
            },
            {
                "id": "D",
                "text": "Amazon Elastic Block Store (Amazon EBS)"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q91",
        "text": "A company plans to migrate to AWS and wants to create cost estimates for its AWS use cases.\nWhich AWS service or tool can the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Pricing Calculator"
            },
            {
                "id": "B",
                "text": "Amazon CloudWatch"
            },
            {
                "id": "C",
                "text": "AWS Cost Explorer"
            },
            {
                "id": "D",
                "text": "AWS Budgets"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q92",
        "text": "Which tool should a developer use to integrate AWS service features directly into an application?",
        "options": [
            {
                "id": "A",
                "text": "AWS Software Development Kit"
            },
            {
                "id": "B",
                "text": "AWS Code Deploy"
            },
            {
                "id": "C",
                "text": "AWS Lambda"
            },
            {
                "id": "D",
                "text": "AWS Batch"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q93",
        "text": "Which of the following is a recommended design principle of the AWS Well-Architected Framework?",
        "options": [
            {
                "id": "A",
                "text": "Reduce downtime by making infrastructure changes infrequently and in large increments."
            },
            {
                "id": "B",
                "text": "Invest the time to configure infrastructure manually."
            },
            {
                "id": "C",
                "text": "Learn to improve from operational failures."
            },
            {
                "id": "D",
                "text": "Use monolithic application design for centralization."
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q94",
        "text": "Using AWS Identity and Access Management (IAM) to grant access only to the resources needed to\nperform a task is a concept known as:",
        "options": [
            {
                "id": "A",
                "text": "restricted access."
            },
            {
                "id": "B",
                "text": "as-needed access."
            },
            {
                "id": "C",
                "text": "least privilege access."
            },
            {
                "id": "D",
                "text": "token access."
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q95",
        "text": "Which AWS service or tool can be used to set up a firewall to control traffic going into and coming out of\nan Amazon VPC subnet?",
        "options": [
            {
                "id": "A",
                "text": "Security group"
            },
            {
                "id": "B",
                "text": "AWS WAF"
            },
            {
                "id": "C",
                "text": "AWS Firewall Manager"
            },
            {
                "id": "D",
                "text": "Network ACL"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q96",
        "text": "A company wants to operate a data warehouse to analyse data without managing the data\nwarehouse infrastructure.\nWhich AWS service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Aurora"
            },
            {
                "id": "B",
                "text": "Amazon Redshift Serverless"
            },
            {
                "id": "C",
                "text": "AWS Lambda"
            },
            {
                "id": "D",
                "text": "Amazon RDS"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q97",
        "text": "How does AWS Cloud computing help businesses reduce costs? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "AWS charges the same prices for services in every AWS Region."
            },
            {
                "id": "B",
                "text": "AWS enables capacity to be adjusted on demand."
            },
            {
                "id": "C",
                "text": "AWS offers discounts for Amazon EC2 instances that remain idle for more than 1 week."
            },
            {
                "id": "D",
                "text": "AWS does not charge for data sent from the AWS Cloud to the internet."
            },
            {
                "id": "E",
                "text": "AWS eliminates many of the costs of building and maintaining on-premises data centres."
            }
        ],
        "answer": "BE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q98",
        "text": "A company wants to grant users in one AWS account access to resources in another AWS account. The\nusers do not currently have permission to access the resources.\nWhich AWS service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "IAM group"
            },
            {
                "id": "B",
                "text": "IAM role"
            },
            {
                "id": "C",
                "text": "IAM tag"
            },
            {
                "id": "D",
                "text": "IAM Access Analyzer"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q99",
        "text": "Which task is the responsibility of AWS when using AWS services?",
        "options": [
            {
                "id": "A",
                "text": "Management of IAM user permissions"
            },
            {
                "id": "B",
                "text": "Creation of security group rules for outbound access"
            },
            {
                "id": "C",
                "text": "Maintenance of physical and environmental controls"
            },
            {
                "id": "D",
                "text": "Application of Amazon EC2 operating system patches"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q100",
        "text": "A company wants to automate infrastructure deployment by using infrastructure as code (IaC). The\ncompany wants to scale production stacks so the stacks can be deployed in multiple AWS Regions.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon CloudWatch"
            },
            {
                "id": "B",
                "text": "AWS Config"
            },
            {
                "id": "C",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "D",
                "text": "AWS CloudFormation"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q101",
        "text": "Which option is an AWS Cloud Adoption Framework (AWS CAF) platform perspective capability?",
        "options": [
            {
                "id": "A",
                "text": "Data architecture"
            },
            {
                "id": "B",
                "text": "Data protection"
            },
            {
                "id": "C",
                "text": "Data governance"
            },
            {
                "id": "D",
                "text": "Data science"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q102",
        "text": "A company is running a workload in the AWS Cloud. Which AWS best practice ensures the MOST costeffective architecture for the workload?",
        "options": [
            {
                "id": "A",
                "text": "Loose coupling"
            },
            {
                "id": "B",
                "text": "Rightsizing"
            },
            {
                "id": "C",
                "text": "Caching"
            },
            {
                "id": "D",
                "text": "Redundancy"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q103",
        "text": "A company is using a third-party service to back up 10 TB of data to a tape library. The on-premises\nbackup server is running out of space. The company wants to use AWS services for the backups\nwithout changing its existing backup workflows.\nWhich AWS service should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Elastic Block Store (Amazon EBS)"
            },
            {
                "id": "B",
                "text": "AWS Storage Gateway"
            },
            {
                "id": "C",
                "text": "Amazon Elastic Container Service (Amazon ECS)"
            },
            {
                "id": "D",
                "text": "AWS Lambda"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q104",
        "text": "Which AWS tool gives users the ability to plan their service usage, service costs, and instance\nreservations, and also allows them to set custom alerts when their costs or usage exceed established\nthresholds?",
        "options": [
            {
                "id": "A",
                "text": "Cost Explorer"
            },
            {
                "id": "B",
                "text": "AWS Budgets"
            },
            {
                "id": "C",
                "text": "AWS Cost and Usage Report"
            },
            {
                "id": "D",
                "text": "Reserved Instance reporting"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q105",
        "text": "Which tasks are the customer’s responsibility, according to the AWS shared responsibility model?\n(Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Establish the global infrastructure."
            },
            {
                "id": "B",
                "text": "Perform client-side data encryption."
            },
            {
                "id": "C",
                "text": "Configure IAM credentials."
            },
            {
                "id": "D",
                "text": "Secure edge locations."
            },
            {
                "id": "E",
                "text": "Patch Amazon RDS DB instances."
            }
        ],
        "answer": "BC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q106",
        "text": "A developer has been hired by a large company and needs AWS credentials.\nWhich are security best practices that should be followed? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Grant the developer access to only the AWS resources needed to perform the job."
            },
            {
                "id": "B",
                "text": "Share the AWS account root user credentials with the developer."
            },
            {
                "id": "C",
                "text": "Add the developer to the administrator’s group in AWS IAM."
            },
            {
                "id": "D",
                "text": "Configure a password policy that ensures the developer’s password cannot be changed."
            },
            {
                "id": "E",
                "text": "Ensure the account password policy requires a minimum length."
            }
        ],
        "answer": "AE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q107",
        "text": "A company has multiple AWS accounts that include compute workloads that cannot be interrupted.\nThe company wants to obtain billing discounts that are based on the company’s use of AWS services.\nWhich AWS feature or purchasing option will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Resource tagging"
            },
            {
                "id": "B",
                "text": "Consolidated billing"
            },
            {
                "id": "C",
                "text": "Pay-as-you-go pricing"
            },
            {
                "id": "D",
                "text": "Spot Instances"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q108",
        "text": "A user wants to allow applications running on an Amazon EC2 instance to make calls to other AWS\nservices. The access granted must be secure.\nWhich AWS service or feature should be used?",
        "options": [
            {
                "id": "A",
                "text": "Security groups"
            },
            {
                "id": "B",
                "text": "AWS Firewall Manager"
            },
            {
                "id": "C",
                "text": "IAM roles"
            },
            {
                "id": "D",
                "text": "IAM user SSH keys"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q109",
        "text": "A company wants a fully managed Windows file server for its Windows-based applications.\nWhich AWS service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "Amazon FSx"
            },
            {
                "id": "B",
                "text": "Amazon Elastic Kubernetes Service (Amazon EKS)"
            },
            {
                "id": "C",
                "text": "Amazon Elastic Container Service (Amazon ECS)"
            },
            {
                "id": "D",
                "text": "Amazon EMR"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q110",
        "text": "Topic 1\nA company wants to migrate its NFS on-premises workload to AWS.\nWhich AWS Storage Gateway type should the company use to meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "Tape Gateway"
            },
            {
                "id": "B",
                "text": "Volume Gateway"
            },
            {
                "id": "C",
                "text": "Amazon FSx File Gateway"
            },
            {
                "id": "D",
                "text": "Amazon S3 File Gateway"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q111",
        "text": "A company needs to track the activity in its AWS accounts and needs to know when an API call is made\nagainst its AWS resources.\nWhich AWS tool or service can be used to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon CloudWatch"
            },
            {
                "id": "B",
                "text": "Amazon Inspector"
            },
            {
                "id": "C",
                "text": "AWS CloudTrail"
            },
            {
                "id": "D",
                "text": "AWS IAM"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q112",
        "text": "A company has an uninterruptible application that runs on Amazon EC2 instances. The application\nconstantly processes a backlog of files in an Amazon Simple Queue Service (Amazon SQS) queue. This\nusage is expected to continue to grow for years.\nWhat is the MOST cost-effective EC2 instance purchasing model to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Spot Instances"
            },
            {
                "id": "B",
                "text": "On-Demand Instances"
            },
            {
                "id": "C",
                "text": "Savings Plans"
            },
            {
                "id": "D",
                "text": "Dedicated Hosts"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q113",
        "text": "A company wants an AWS service to provide product recommendations based on its customer data.\nWhich AWS service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Polly"
            },
            {
                "id": "B",
                "text": "Amazon Personalize"
            },
            {
                "id": "C",
                "text": "Amazon Comprehend"
            },
            {
                "id": "D",
                "text": "Amazon Rekognition"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q114",
        "text": "A company is planning its migration to the AWS Cloud. The company is identifying its capability gaps by\nusing the AWS Cloud Adoption Framework (AWS CAF) perspectives.\nWhich phase of the cloud transformation journey includes these identification activities?",
        "options": [
            {
                "id": "A",
                "text": "Envision"
            },
            {
                "id": "B",
                "text": "Align"
            },
            {
                "id": "C",
                "text": "Scale"
            },
            {
                "id": "D",
                "text": "Launch"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q115",
        "text": "A social media company wants to protect its web application from common web exploits such as SQL\ninjections and cross-site scripting.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Inspector"
            },
            {
                "id": "B",
                "text": "AWS WAF"
            },
            {
                "id": "C",
                "text": "Amazon GuardDuty"
            },
            {
                "id": "D",
                "text": "Amazon CloudWatch"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q116",
        "text": "Which fully managed AWS service assists with the creation, testing, and management of custom Amazon\nEC2 images?",
        "options": [
            {
                "id": "A",
                "text": "EC2 Image Builder"
            },
            {
                "id": "B",
                "text": "Amazon Machine Image (AMI)"
            },
            {
                "id": "C",
                "text": "AWS Launch Wizard"
            },
            {
                "id": "D",
                "text": "AWS Elastic Beanstalk"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q117",
        "text": "A company wants an automated process to continuously scan its Amazon EC2 instances for software\nvulnerabilities.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Guard Duty"
            },
            {
                "id": "B",
                "text": "Amazon Inspector"
            },
            {
                "id": "C",
                "text": "Amazon Detective"
            },
            {
                "id": "D",
                "text": "Amazon Cognito"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q118",
        "text": "A company needs to perform data processing once a week that typically takes about 5 hours to complete.\nWhich AWS service should the company use for this workload?",
        "options": [
            {
                "id": "A",
                "text": "AWS Lambda"
            },
            {
                "id": "B",
                "text": "Amazon EC2"
            },
            {
                "id": "C",
                "text": "AWS Code Deploy"
            },
            {
                "id": "D",
                "text": "AWS Wavelength"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q119",
        "text": "Which AWS service or feature provides log information of the inbound and outbound traffic on network\ninterfaces in a VPC?",
        "options": [
            {
                "id": "A",
                "text": "Amazon CloudWatch Logs"
            },
            {
                "id": "B",
                "text": "AWS CloudTrail"
            },
            {
                "id": "C",
                "text": "VPC Flow Logs"
            },
            {
                "id": "D",
                "text": "AWS Identity and Access Management (IAM)"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q120",
        "text": "A company wants to design a centralized storage system to manage the configuration data and\npasswords for its critical business applications.\nWhich AWS service or capability will meet these requirements MOST cost-effectively?",
        "options": [
            {
                "id": "A",
                "text": "AWS Systems Manager Parameter Store"
            },
            {
                "id": "B",
                "text": "AWS Secrets Manager"
            },
            {
                "id": "C",
                "text": "AWS Config"
            },
            {
                "id": "D",
                "text": "Amazon S3"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q121",
        "text": "A company plans to deploy containers on AWS. The company wants full control of the compute resources\nthat host the containers. Which AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Elastic Kubernetes Service (Amazon EKS)"
            },
            {
                "id": "B",
                "text": "AWS Fargate"
            },
            {
                "id": "C",
                "text": "Amazon EC2"
            },
            {
                "id": "D",
                "text": "Amazon Elastic Container Service (Amazon ECS)"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q122",
        "text": "Which AWS service or feature allows users to create new AWS accounts, group multiple accounts to\norganize workflows, and apply policies to groups of accounts?",
        "options": [
            {
                "id": "A",
                "text": "AWS Identity and Access Management (IAM)"
            },
            {
                "id": "B",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "C",
                "text": "AWS CloudFormation"
            },
            {
                "id": "D",
                "text": "AWS Organizations"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q123",
        "text": "A company wants to store and retrieve files in Amazon S3 for its existing on-premises applications by\nusing industry-standard file system protocols.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS DataSync"
            },
            {
                "id": "B",
                "text": "AWS Snowball Edge"
            },
            {
                "id": "C",
                "text": "Amazon S3 File Gateway"
            },
            {
                "id": "D",
                "text": "AWS Transfer Family"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q124",
        "text": "A company wants to block SQL injection attacks.\nWhich AWS service or feature should the company use to meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS WAF"
            },
            {
                "id": "B",
                "text": "Network ACLs"
            },
            {
                "id": "C",
                "text": "Security groups"
            },
            {
                "id": "D",
                "text": "AWS Certificate Manager (ACM)"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q125",
        "text": "A company wants a unified tool to provide a consistent method to interact with AWS services.\nWhich AWS service or tool will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS CLI"
            },
            {
                "id": "B",
                "text": "Amazon Elastic Container Service (Amazon ECS)"
            },
            {
                "id": "C",
                "text": "AWS Cloud9"
            },
            {
                "id": "D",
                "text": "AWS Virtual Private Network (AWS VPN)"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q126",
        "text": "A company needs to evaluate its AWS environment and provide best practice recommendations in five\ncategories: cost, performance, service limits, fault tolerance and security.\nWhich AWS service can the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Shield"
            },
            {
                "id": "B",
                "text": "AWS WAF"
            },
            {
                "id": "C",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "D",
                "text": "AWS Service Catalog"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q127",
        "text": "Which perspective in the AWS Cloud Adoption Framework (AWS CAF) includes capabilities for\nconfiguration management and patch management?",
        "options": [
            {
                "id": "A",
                "text": "Platform"
            },
            {
                "id": "B",
                "text": "Operations"
            },
            {
                "id": "C",
                "text": "Security"
            },
            {
                "id": "D",
                "text": "Governance"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q128",
        "text": "A company has a compute workload that is steady, predictable, and uninterruptible.\nWhich Amazon EC2 instance purchasing options meet these requirements MOST cost-effectively?\n(Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "On-Demand Instances"
            },
            {
                "id": "B",
                "text": "Reserved Instances"
            },
            {
                "id": "C",
                "text": "Spot Instances"
            },
            {
                "id": "D",
                "text": "Saving Plans"
            },
            {
                "id": "E",
                "text": "Dedicated Hosts"
            }
        ],
        "answer": "BD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q129",
        "text": "Which Amazon EC2 pricing model is the MOST cost efficient for an uninterruptible workload that runs\nonce a year for 24 hours?",
        "options": [
            {
                "id": "A",
                "text": "On-Demand Instances"
            },
            {
                "id": "B",
                "text": "Reserved Instances"
            },
            {
                "id": "C",
                "text": "Spot Instances"
            },
            {
                "id": "D",
                "text": "Dedicated Instances"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q130",
        "text": "Which option is a shared responsibility between AWS and its customers under the AWS shared\nresponsibility model?",
        "options": [
            {
                "id": "A",
                "text": "Configuration of Amazon EC2 instance operating systems"
            },
            {
                "id": "B",
                "text": "Application file system server-side encryption"
            },
            {
                "id": "C",
                "text": "Patch management"
            },
            {
                "id": "D",
                "text": "Security of the physical infrastructure"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q131",
        "text": "A company wants to migrate its on-premises workloads to the AWS Cloud. The company wants to\nseparate workloads for chargeback to different departments.\nWhich AWS services or features will meet these requirements? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Placement groups"
            },
            {
                "id": "B",
                "text": "Consolidated billing"
            },
            {
                "id": "C",
                "text": "Edge locations"
            },
            {
                "id": "D",
                "text": "AWS Config"
            },
            {
                "id": "E",
                "text": "Multiple AWS accounts"
            }
        ],
        "answer": "BE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q132",
        "text": "Which task is a responsibility of AWS, according to the AWS shared responsibility model?",
        "options": [
            {
                "id": "A",
                "text": "Enable client-side encryption for objects that are stored in Amazon S3."
            },
            {
                "id": "B",
                "text": "Configure IAM security policies to comply with the principle of least privilege."
            },
            {
                "id": "C",
                "text": "Patch the guest operating system on an Amazon EC2 instance."
            },
            {
                "id": "D",
                "text": "Apply updates to the Nitro Hypervisor."
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q133",
        "text": "Which option is a benefit of using AWS for cloud computing?",
        "options": [
            {
                "id": "A",
                "text": "Trade variable expense for fixed expense"
            },
            {
                "id": "B",
                "text": "Pay-as-you-go pricing"
            },
            {
                "id": "C",
                "text": "Decreased speed and agility"
            },
            {
                "id": "D",
                "text": "Spending money running and maintaining data centers"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q134",
        "text": "Which option is an AWS Cloud Adoption Framework (AWS CAF) business perspective capability?",
        "options": [
            {
                "id": "A",
                "text": "Culture evolution"
            },
            {
                "id": "B",
                "text": "Event management"
            },
            {
                "id": "C",
                "text": "Data monetization"
            },
            {
                "id": "D",
                "text": "Platform architecture"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q135",
        "text": "A company is assessing its AWS Business Support plan to determine if the plan still meets the company’s\nneeds. The company is considering switching to AWS Enterprise Support.\nWhich additional benefit will the company receive with AWS Enterprise Support?",
        "options": [
            {
                "id": "A",
                "text": "A full set of AWS Trusted Advisor checks"
            },
            {
                "id": "B",
                "text": "Phone, email, and chat access to cloud support engineers 24 hours a day, 7 days a week"
            },
            {
                "id": "C",
                "text": "A designated technical account manager (TAM) to assist in monitoring and optimization"
            },
            {
                "id": "D",
                "text": "A consultative review and architecture guidance for the company’s applications"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q136",
        "text": "Which pricing model will interrupt a running Amazon EC2 instance if capacity becomes temporarily\nunavailable?",
        "options": [
            {
                "id": "A",
                "text": "On-Demand Instances"
            },
            {
                "id": "B",
                "text": "Standard Reserved Instances"
            },
            {
                "id": "C",
                "text": "Spot Instances"
            },
            {
                "id": "D",
                "text": "Convertible Reserved Instances"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q137",
        "text": "Which options are AWS Cloud Adoption Framework (AWS CAF) security perspective capabilities? (Choose\ntwo.)",
        "options": [
            {
                "id": "A",
                "text": "Observability"
            },
            {
                "id": "B",
                "text": "Incident and problem management"
            },
            {
                "id": "C",
                "text": "Incident response"
            },
            {
                "id": "D",
                "text": "Infrastructure protection"
            },
            {
                "id": "E",
                "text": "Availability and continuity"
            }
        ],
        "answer": "CD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q138",
        "text": "A company wants to run its workload on Amazon EC2 instances for more than 1 year. This workload will\nrun continuously.\nWhich option offers a discounted hourly rate compared to the hourly rate of On-Demand Instances?",
        "options": [
            {
                "id": "A",
                "text": "AWS Graviton processor"
            },
            {
                "id": "B",
                "text": "Dedicated Hosts"
            },
            {
                "id": "C",
                "text": "EC2 Instance Savings Plans"
            },
            {
                "id": "D",
                "text": "Amazon EC2 Auto Scaling instances"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q139",
        "text": "Which characteristic of the AWS Cloud helps users eliminate underutilized CPU capacity?",
        "options": [
            {
                "id": "A",
                "text": "Agility"
            },
            {
                "id": "B",
                "text": "Elasticity"
            },
            {
                "id": "C",
                "text": "Reliability"
            },
            {
                "id": "D",
                "text": "Durability"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q140",
        "text": "Which AWS services can a company use to achieve a loosely coupled architecture? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Amazon Workspaces"
            },
            {
                "id": "B",
                "text": "Amazon Simple Queue Service (Amazon SQS)"
            },
            {
                "id": "C",
                "text": "Amazon Connect"
            },
            {
                "id": "D",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "E",
                "text": "AWS Step Functions"
            }
        ],
        "answer": "BE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q141",
        "text": "Which AWS Cloud service can send alerts to customers if custom spending thresholds are exceeded?",
        "options": [
            {
                "id": "A",
                "text": "AWS Budgets"
            },
            {
                "id": "B",
                "text": "AWS Cost Explorer"
            },
            {
                "id": "C",
                "text": "AWS Cost Allocation Tags"
            },
            {
                "id": "D",
                "text": "AWS Organizations"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q142",
        "text": "A company plans to migrate to the AWS Cloud. The company wants to use the AWS Cloud Adoption\nFramework (AWS CAF) to define and track business outcomes as part of its cloud transformation\njourney.\nWhich AWS CAF governance perspective capability will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Benefits management"
            },
            {
                "id": "B",
                "text": "Risk management"
            },
            {
                "id": "C",
                "text": "Application portfolio management"
            },
            {
                "id": "D",
                "text": "Cloud financial management"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q143",
        "text": "Topic 1\nA company needs to quickly and securely move files over long distances between its client and an\nAmazon S3 bucket.\nWhich S3 feature will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "S3 Versioning"
            },
            {
                "id": "B",
                "text": "S3 Transfer Acceleration"
            },
            {
                "id": "C",
                "text": "S3ACLs"
            },
            {
                "id": "D",
                "text": "S3 Intelligent-Tiering"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q144",
        "text": "A company needs to continuously run an experimental workload on an Amazon EC2 instance and stop\nthe instance after 12 hours.\nWhich instance purchasing option will meet this requirement MOST cost-effectively?",
        "options": [
            {
                "id": "A",
                "text": "On-Demand Instances"
            },
            {
                "id": "B",
                "text": "Reserved Instances"
            },
            {
                "id": "C",
                "text": "Spot Instances"
            },
            {
                "id": "D",
                "text": "Dedicated Instances"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q145",
        "text": "Which cloud transformation journey phase of the AWS Cloud Adoption Framework (AWS CAF) focuses\non demonstrating how the cloud helps accelerate business outcomes?",
        "options": [
            {
                "id": "A",
                "text": "Scale"
            },
            {
                "id": "B",
                "text": "Envision"
            },
            {
                "id": "C",
                "text": "Align"
            },
            {
                "id": "D",
                "text": "Launch"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q146",
        "text": "Which option is a customer responsibility under the AWS shared responsibility model?",
        "options": [
            {
                "id": "A",
                "text": "Maintenance of underlying hardware of Amazon EC2 instances"
            },
            {
                "id": "B",
                "text": "Application data security"
            },
            {
                "id": "C",
                "text": "Physical security of data centers"
            },
            {
                "id": "D",
                "text": "Maintenance of VPC components"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q147",
        "text": "A company wants its Amazon EC2 instances to operate in a highly available environment, even if there\nis a natural disaster in a particular geographic area.\nWhich approach will achieve this goal?",
        "options": [
            {
                "id": "A",
                "text": "Use EC2 instances in multiple AWS Regions."
            },
            {
                "id": "B",
                "text": "Use EC2 instances in multiple Amazon CloudFront locations."
            },
            {
                "id": "C",
                "text": "Use EC2 instances in multiple edge locations."
            },
            {
                "id": "D",
                "text": "Use EC2 instances in AWS Local Zones."
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q148",
        "text": "A company wants to modernize and convert a monolithic application into microservices. The company\nwants to move the application to AWS.\nWhich migration strategy should the company use?",
        "options": [
            {
                "id": "A",
                "text": "Rehost"
            },
            {
                "id": "B",
                "text": "Replatform"
            },
            {
                "id": "C",
                "text": "Repurchase"
            },
            {
                "id": "D",
                "text": "Refactor"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q149",
        "text": "A systems administrator created a new IAM user for a developer and assigned the user an access key\ninstead of a username and password. What is the access key used for?",
        "options": [
            {
                "id": "A",
                "text": "To access the AWS account as the AWS account root user"
            },
            {
                "id": "B",
                "text": "To access the AWS account through the AWS Management Console"
            },
            {
                "id": "C",
                "text": "To access the AWS account through a CLI"
            },
            {
                "id": "D",
                "text": "To access all of a company’s AWS accounts"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q150",
        "text": "Which option is an environment that consists of one or more data centers?",
        "options": [
            {
                "id": "A",
                "text": "Amazon CloudFront"
            },
            {
                "id": "B",
                "text": "Availability Zone"
            },
            {
                "id": "C",
                "text": "VPC"
            },
            {
                "id": "D",
                "text": "AWS Outposts"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q151",
        "text": "A company is moving an on-premises data center to the AWS Cloud. The company must migrate 50\npetabytes of file storage data to AWS with the least possible operational overhead.\nWhich AWS service or resource should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Snowmobile"
            },
            {
                "id": "B",
                "text": "AWS Snowball Edge"
            },
            {
                "id": "C",
                "text": "AWS Data Exchange"
            },
            {
                "id": "D",
                "text": "AWS Database Migration Service (AWS DMS)"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q152",
        "text": "A company has an application with robust hardware requirements. The application must be accessed\nby students who are using lightweight, low-cost laptops.\nWhich AWS service will help the company deploy the application without investing in backend\ninfrastructure or high-end client hardware?",
        "options": [
            {
                "id": "A",
                "text": "Amazon AppStream 2.0"
            },
            {
                "id": "B",
                "text": "AWS AppSync"
            },
            {
                "id": "C",
                "text": "Amazon WorkLink"
            },
            {
                "id": "D",
                "text": "AWS Elastic Beanstalk"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q153",
        "text": "A company wants to query its server logs to gain insights about its customers’ experiences.\nWhich AWS service will store this data MOST cost-effectively?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Aurora"
            },
            {
                "id": "B",
                "text": "Amazon Elastic File System (Amazon EFS)"
            },
            {
                "id": "C",
                "text": "Amazon Elastic Block Store (Amazon EBS)"
            },
            {
                "id": "D",
                "text": "Amazon S3"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q154",
        "text": "Which of the following is a recommended design principle for AWS Cloud architecture?",
        "options": [
            {
                "id": "A",
                "text": "Design tightly coupled components."
            },
            {
                "id": "B",
                "text": "Build a single application component that can handle all the application functionality."
            },
            {
                "id": "C",
                "text": "Make large changes on fewer iterations to reduce chances of failure."
            },
            {
                "id": "D",
                "text": "Avoid monolithic architecture by segmenting workloads."
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q155",
        "text": "Which AWS service helps users audit API activity across their AWS account?",
        "options": [
            {
                "id": "A",
                "text": "AWS CloudTrail"
            },
            {
                "id": "B",
                "text": "Amazon Inspector"
            },
            {
                "id": "C",
                "text": "AWS WAF"
            },
            {
                "id": "D",
                "text": "AWS Config"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q156",
        "text": "Which task is a customer’s responsibility, according to the AWS shared responsibility model?",
        "options": [
            {
                "id": "A",
                "text": "Management of the guest operating systems"
            },
            {
                "id": "B",
                "text": "Maintenance of the configuration of infrastructure devices"
            },
            {
                "id": "C",
                "text": "Management of the host operating systems and virtualization"
            },
            {
                "id": "D",
                "text": "Maintenance of the software that powers Availability Zones"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q157",
        "text": "A company wants to automatically add and remove Amazon EC2 instances. The company wants the\nEC2 instances to adjust to varying workloads dynamically.\nWhich service or feature will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon DynamoDB"
            },
            {
                "id": "B",
                "text": "Amazon EC2 Spot Instances"
            },
            {
                "id": "C",
                "text": "AWS Snow Family"
            },
            {
                "id": "D",
                "text": "Amazon EC2 Auto Scaling"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q158",
        "text": "A user wants to securely automate the management and rotation of credentials that are shared between\napplications, while spending the least amount of time on managing tasks.\nWhich AWS service or feature can be used to accomplish this?",
        "options": [
            {
                "id": "A",
                "text": "AWS CloudHSM"
            },
            {
                "id": "B",
                "text": "AWS Key Management Service (AWS KMS)"
            },
            {
                "id": "C",
                "text": "AWS Secrets Manager"
            },
            {
                "id": "D",
                "text": "Server-side encryption"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q159",
        "text": "Which security service automatically recognizes and classifies sensitive data or intellectual property on\nAWS?",
        "options": [
            {
                "id": "A",
                "text": "Amazon GuardDuty"
            },
            {
                "id": "B",
                "text": "Amazon Macie"
            },
            {
                "id": "C",
                "text": "Amazon Inspector"
            },
            {
                "id": "D",
                "text": "AWS Shield"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q160",
        "text": "Which actions are best practices for an AWS account root user? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Share root user credentials with team members."
            },
            {
                "id": "B",
                "text": "Create multiple root users for the account, separated by environment."
            },
            {
                "id": "C",
                "text": "Enable multi-factor authentication (MFA) on the root user."
            },
            {
                "id": "D",
                "text": "Create an IAM user with administrator privileges for daily administrative tasks, instead of using the root user."
            },
            {
                "id": "E",
                "text": "Use programmatic access instead of the root user and password."
            }
        ],
        "answer": "CD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q161",
        "text": "A company is running a critical workload on an Amazon RDS DB instance. The company needs the DB\ninstance to be highly available with a recovery time of less than 5 minutes.\nWhich solution will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Create a read replica of the DB instance."
            },
            {
                "id": "B",
                "text": "Create a template of the DB instance by using AWS CloudFormation."
            },
            {
                "id": "C",
                "text": "Take frequent snapshots of the DB instance. Store the snapshots in Amazon S3."
            },
            {
                "id": "D",
                "text": "Modify the DB instance to be a Multi-AZ deployment."
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q162",
        "text": "A company plans to migrate its application to AWS and run the application on Amazon EC2 instances.\nThe application will have continuous usage for 1 year.\nWhich EC2 instance purchasing option will meet these requirements MOST cost-effectively?",
        "options": [
            {
                "id": "A",
                "text": "Reserved Instances"
            },
            {
                "id": "B",
                "text": "Spot Instances"
            },
            {
                "id": "C",
                "text": "On-Demand Instances"
            },
            {
                "id": "D",
                "text": "Dedicated Hosts"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q163",
        "text": "A company needs to transfer data between an Amazon S3 bucket and an on-premises application.\nWho is responsible for the security of this data, according to the AWS shared responsibility model?",
        "options": [
            {
                "id": "A",
                "text": "The company"
            },
            {
                "id": "B",
                "text": "AWS"
            },
            {
                "id": "C",
                "text": "Firewall vendor"
            },
            {
                "id": "D",
                "text": "AWS Marketplace partner"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q164",
        "text": "Which pillar of the AWS Well-Architected Framework refers to the ability of a system to recover from\ninfrastructure or service disruptions and dynamically acquire computing resources to meet demand?",
        "options": [
            {
                "id": "A",
                "text": "Security"
            },
            {
                "id": "B",
                "text": "Reliability"
            },
            {
                "id": "C",
                "text": "Performance efficiency"
            },
            {
                "id": "D",
                "text": "Cost optimization"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q165",
        "text": "A company wants to identify Amazon S3 buckets that are shared with another AWS account.\nWhich AWS service or feature will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Lake Formation"
            },
            {
                "id": "B",
                "text": "IAM credential report"
            },
            {
                "id": "C",
                "text": "Amazon CloudWatch"
            },
            {
                "id": "D",
                "text": "IAM Access Analyzer"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q166",
        "text": "Which AWS service gives users the ability to build interactive business intelligence dashboards that\ninclude machine learning insights?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Athena"
            },
            {
                "id": "B",
                "text": "Amazon Kendra"
            },
            {
                "id": "C",
                "text": "Amazon QuickSight"
            },
            {
                "id": "D",
                "text": "Amazon Redshift"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q167",
        "text": "Which of the following is an AWS value proposition that describes a user’s ability to scale infrastructure\nbased on demand?",
        "options": [
            {
                "id": "A",
                "text": "Speed of innovation"
            },
            {
                "id": "B",
                "text": "Resource elasticity"
            },
            {
                "id": "C",
                "text": "Decoupled architecture"
            },
            {
                "id": "D",
                "text": "Global deployment"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q168",
        "text": "Which action is a security best practice for access to sensitive data that is stored in an Amazon S3 bucket?",
        "options": [
            {
                "id": "A",
                "text": "Enable S3 Cross-Region Replication (CRR) on the S3 bucket."
            },
            {
                "id": "B",
                "text": "Use IAM roles for applications that require access to the S3 bucket."
            },
            {
                "id": "C",
                "text": "Configure AWS WAF to prevent unauthorized access to the S3 bucket."
            },
            {
                "id": "D",
                "text": "Configure Amazon GuardDuty to prevent unauthorized access to the S3 bucket."
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q169",
        "text": "A company wants to know more about the benefits offered by cloud computing. The company wants to\nunderstand the operational advantage of agility. How does AWS provide agility for users?",
        "options": [
            {
                "id": "A",
                "text": "The ability the ensure high availability by deploying workloads to multiple regions"
            },
            {
                "id": "B",
                "text": "A pay-as-you-go model for many services and resources"
            },
            {
                "id": "C",
                "text": "The ability to transfer infrastructure management to the AWS Cloud"
            },
            {
                "id": "D",
                "text": "The ability to provision and deprovision resources quickly with minimal effort"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q170",
        "text": "A company needs a central user portal so that users can log in to third-party business applications that\nsupport Security Assertion Markup Language (SAML) 2.0.\nWhich AWS service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Identity and Access Management (IAM)"
            },
            {
                "id": "B",
                "text": "Amazon Cognito"
            },
            {
                "id": "C",
                "text": "AWS IAM Identity Center (AWS Single Sign-On)"
            },
            {
                "id": "D",
                "text": "AWS CLI"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q171",
        "text": "Which AWS service should users use to learn about AWS service availability and operations?",
        "options": [
            {
                "id": "A",
                "text": "Amazon EventBridge"
            },
            {
                "id": "B",
                "text": "AWS Service Catalog"
            },
            {
                "id": "C",
                "text": "AWS Control Tower"
            },
            {
                "id": "D",
                "text": "AWS Health Dashboard"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q172",
        "text": "Which AWS service or tool can be used to capture information about inbound and outbound traffic in an\nAmazon VPC?",
        "options": [
            {
                "id": "A",
                "text": "VPC Flow Logs"
            },
            {
                "id": "B",
                "text": "Amazon Inspector"
            },
            {
                "id": "C",
                "text": "VPC endpoint services"
            },
            {
                "id": "D",
                "text": "NAT gateway"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q173",
        "text": "What is the customer ALWAYS responsible for managing, according to the AWS shared responsibility\nmodel?",
        "options": [
            {
                "id": "A",
                "text": "Software licenses"
            },
            {
                "id": "B",
                "text": "Networking"
            },
            {
                "id": "C",
                "text": "Customer data"
            },
            {
                "id": "D",
                "text": "Encryption keys"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q174",
        "text": "Which AWS service can be used to retrieve compliance reports on demand?",
        "options": [
            {
                "id": "A",
                "text": "AWS Secrets Manager"
            },
            {
                "id": "B",
                "text": "AWS Artifact"
            },
            {
                "id": "C",
                "text": "AWS Security Hub"
            },
            {
                "id": "D",
                "text": "AWS Certificate Manager"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q175",
        "text": "Which AWS service enables users to check for vulnerabilities on Amazon EC2 instances by using\npredefined assessment templates?",
        "options": [
            {
                "id": "A",
                "text": "AWS WAF"
            },
            {
                "id": "B",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "C",
                "text": "Amazon Inspector"
            },
            {
                "id": "D",
                "text": "AWS Shield"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q176",
        "text": "A company plans to migrate to the AWS Cloud. The company is gathering information about its onpremises infrastructure and requires information such as the hostname, IP address, and MAC address.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS DataSync"
            },
            {
                "id": "B",
                "text": "AWS Application Migration Service"
            },
            {
                "id": "C",
                "text": "AWS Application Discovery Service"
            },
            {
                "id": "D",
                "text": "AWS Database Migration Service (AWS DMS)"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q177",
        "text": "Which action will help increase security in the AWS Cloud?",
        "options": [
            {
                "id": "A",
                "text": "Enable programmatic access for all IAM users."
            },
            {
                "id": "B",
                "text": "Use IAM users instead of IAM roles to delegate permissions."
            },
            {
                "id": "C",
                "text": "Rotate access keys on a reoccurring basis."
            },
            {
                "id": "D",
                "text": "Use inline policies instead of customer managed policies."
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q178",
        "text": "A company is planning to migrate its application to the AWS Cloud.\nWhich AWS tool or set of resources should the company use to analyze and assess its readiness for\nmigration?",
        "options": [
            {
                "id": "A",
                "text": "AWS Cloud Adoption Framework (AWS CAF)"
            },
            {
                "id": "B",
                "text": "AWS Pricing Calculator"
            },
            {
                "id": "C",
                "text": "AWS Well-Architected Framework"
            },
            {
                "id": "D",
                "text": "AWS Budgets"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q179",
        "text": "Which of the following describes some of the core functionality of Amazon S3?",
        "options": [
            {
                "id": "A",
                "text": "Amazon S3 is a high-performance block storage service that is designed for use with Amazon EC2."
            },
            {
                "id": "B",
                "text": "Amazon S3 is an object storage service that provides high-level performance, security, scalability, and data availability."
            },
            {
                "id": "C",
                "text": "Amazon S3 is a fully managed, highly reliable, and scalable file storage system that is accessible over the industry-standard SMB protocol."
            },
            {
                "id": "D",
                "text": "Amazon S3 is a scalable, fully managed elastic NFS for use with AWS Cloud services and on-premises resources."
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q180",
        "text": "Which AWS benefit is demonstrated by on-demand technology services that enable companies to\nreplace upfront fixed expenses with variable expenses?",
        "options": [
            {
                "id": "A",
                "text": "High availability"
            },
            {
                "id": "B",
                "text": "Economies of scale"
            },
            {
                "id": "C",
                "text": "Pay-as-you-go pricing"
            },
            {
                "id": "D",
                "text": "Global reach"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q181",
        "text": "Which AWS services or features enable users to connect on-premises networks to a VPC? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "AWS VPN"
            },
            {
                "id": "B",
                "text": "Elastic Load Balancing"
            },
            {
                "id": "C",
                "text": "AWS Direct Connect"
            },
            {
                "id": "D",
                "text": "VPC peering"
            },
            {
                "id": "E",
                "text": "Amazon CloudFront"
            }
        ],
        "answer": "AC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q182",
        "text": "A user needs to quickly deploy a nonrelational database on AWS. The user does not want to manage\nthe underlying hardware or the database software.\nWhich AWS service can be used to accomplish this?",
        "options": [
            {
                "id": "A",
                "text": "Amazon RDS"
            },
            {
                "id": "B",
                "text": "Amazon DynamoDB"
            },
            {
                "id": "C",
                "text": "Amazon Aurora"
            },
            {
                "id": "D",
                "text": "Amazon Redshift"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q183",
        "text": "Which actions are examples of a company’s effort to rightsize its AWS resources to control cloud costs?\n(Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Switch from Amazon RDS to Amazon DynamoDB to accommodate NoSQL datasets."
            },
            {
                "id": "B",
                "text": "Base the selection of Amazon EC2 instance types on past utilization patterns."
            },
            {
                "id": "C",
                "text": "Use Amazon S3 Lifecycle policies to move objects that users access infrequently to lower-cost storage tiers."
            },
            {
                "id": "D",
                "text": "Use Multi-AZ deployments for Amazon RDS."
            },
            {
                "id": "E",
                "text": "Replace existing Amazon EC2 instances with AWS Elastic Beanstalk."
            }
        ],
        "answer": "BC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q184",
        "text": "Which AWS service or feature can a company use to apply security rules to specific Amazon EC2\ninstances?",
        "options": [
            {
                "id": "A",
                "text": "Network ACLs"
            },
            {
                "id": "B",
                "text": "Security groups"
            },
            {
                "id": "C",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "D",
                "text": "AWS WAF"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q185",
        "text": "Which design principles support the reliability pillar of the AWS Well-Architected Framework? (Choose\ntwo.)",
        "options": [
            {
                "id": "A",
                "text": "Perform operations as code."
            },
            {
                "id": "B",
                "text": "Enable traceability."
            },
            {
                "id": "C",
                "text": "Automatically scale to meet demand."
            },
            {
                "id": "D",
                "text": "Deploy resources globally to improve response time."
            },
            {
                "id": "E",
                "text": "Automatically recover from failure."
            }
        ],
        "answer": "CE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q186",
        "text": "A company that uses AWS needs to transfer 2 TB of data.\nWhich type of transfer of that data would result in no cost for the company?",
        "options": [
            {
                "id": "A",
                "text": "Inbound data transfer from the internet"
            },
            {
                "id": "B",
                "text": "Outbound data transfer to the internet"
            },
            {
                "id": "C",
                "text": "Data transfer between AWS Regions"
            },
            {
                "id": "D",
                "text": "Data transfer between Availability Zones"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q187",
        "text": "A company wants to create templates that the company can reuse to deploy multiple AWS resources.\nWhich AWS service or feature can the company use to meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Marketplace"
            },
            {
                "id": "B",
                "text": "Amazon Machine Image (AMI)"
            },
            {
                "id": "C",
                "text": "AWS CloudFormation"
            },
            {
                "id": "D",
                "text": "AWS OpsWorks"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q188",
        "text": "A company is building an application that requires the ability to send, store, and receive messages\nbetween application components. The company has another requirement to process messages in firstin, first-out (FIFO) order.\nWhich AWS service should the company use?",
        "options": [
            {
                "id": "A",
                "text": "AWS Step Functions"
            },
            {
                "id": "B",
                "text": "Amazon Simple Notification Service (Amazon SNS)"
            },
            {
                "id": "C",
                "text": "Amazon Kinesis Data Streams"
            },
            {
                "id": "D",
                "text": "Amazon Simple Queue Service (Amazon SQS)"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q189",
        "text": "Which AWS service or feature is a browser-based, pre-authenticated service that can be launched\ndirectly from the AWS Management Console?",
        "options": [
            {
                "id": "A",
                "text": "AWS API"
            },
            {
                "id": "B",
                "text": "AWS Lightsail"
            },
            {
                "id": "C",
                "text": "AWS Cloud9"
            },
            {
                "id": "D",
                "text": "AWS CloudShell"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q190",
        "text": "A company wants to migrate its database to a managed AWS service that is compatible with PostgreSQL.\nWhich AWS services will meet these requirements? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Amazon Athena"
            },
            {
                "id": "B",
                "text": "Amazon RDS"
            },
            {
                "id": "C",
                "text": "Amazon EC2"
            },
            {
                "id": "D",
                "text": "Amazon DynamoDB"
            },
            {
                "id": "E",
                "text": "Amazon Aurora"
            }
        ],
        "answer": "BE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q191",
        "text": "A company has a fleet of cargo ships. The cargo ships have sensors that collect data at sea, where there\nis intermittent or no internet connectivity. The company needs to collect, format, and process the data\nat sea and move the data to AWS later.\nWhich AWS service should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS IoT Core"
            },
            {
                "id": "B",
                "text": "Amazon Lightsail"
            },
            {
                "id": "C",
                "text": "AWS Storage Gateway"
            },
            {
                "id": "D",
                "text": "AWS Snowball Edge"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q192",
        "text": "A company hosts an application on multiple Amazon EC2 instances. The application uses Amazon\nSimple Notification Service (Amazon SNS) to send messages.\nWhich AWS service or feature will give the application permission to access required AWS services?",
        "options": [
            {
                "id": "A",
                "text": "AWS Certificate Manager (ACM)"
            },
            {
                "id": "B",
                "text": "IAM roles"
            },
            {
                "id": "C",
                "text": "AWS Security Hub"
            },
            {
                "id": "D",
                "text": "Amazon GuardDuty"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q193",
        "text": "A user has limited knowledge of AWS services, but wants to quickly deploy a scalable Node.js\napplication in the AWS Cloud.\nWhich service should be used to deploy the application?",
        "options": [
            {
                "id": "A",
                "text": "AWS CloudFormation"
            },
            {
                "id": "B",
                "text": "AWS Elastic Beanstalk"
            },
            {
                "id": "C",
                "text": "Amazon EC2"
            },
            {
                "id": "D",
                "text": "AWS OpsWorks"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q194",
        "text": "A company needs a content delivery network that provides secure delivery of data, videos, applications,\nand APIs to users globally with low latency and high transfer speeds.\nWhich AWS service meets these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon CloudFront"
            },
            {
                "id": "B",
                "text": "Elastic Load Balancing"
            },
            {
                "id": "C",
                "text": "Amazon S3"
            },
            {
                "id": "D",
                "text": "Amazon Elastic Transcoder"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q195",
        "text": "A company needs to use third-party software for its workload on AWS.\nWhich AWS service or feature can the company use to purchase the software?",
        "options": [
            {
                "id": "A",
                "text": "AWS Resource Access Manager"
            },
            {
                "id": "B",
                "text": "AWS Managed Services"
            },
            {
                "id": "C",
                "text": "AWS License Manager"
            },
            {
                "id": "D",
                "text": "AWS Marketplace"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q196",
        "text": "A company needs fully managed, highly reliable, and scalable file storage that is accessible over the\nServer Message Block (SMB) protocol.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon S3"
            },
            {
                "id": "B",
                "text": "Amazon Elastic File System (Amazon EFS)"
            },
            {
                "id": "C",
                "text": "Amazon FSx for Windows File Server"
            },
            {
                "id": "D",
                "text": "Amazon Elastic Block Store (Amazon EBS)"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q197",
        "text": "A company needs to centrally configure and manage Amazon VPC security groups across multiple AWS\naccounts within an organization in AWS Organizations.\nWhich AWS service should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Firewall Manager"
            },
            {
                "id": "B",
                "text": "Amazon GuardDuty"
            },
            {
                "id": "C",
                "text": "Amazon Detective"
            },
            {
                "id": "D",
                "text": "AWS WAF"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q198",
        "text": "Which task is a responsibility of AWS, according to the AWS shared responsibility model?",
        "options": [
            {
                "id": "A",
                "text": "Configure identity and access management for applications."
            },
            {
                "id": "B",
                "text": "Manage encryption options for data that is stored on AWS."
            },
            {
                "id": "C",
                "text": "Configure security groups for Amazon EC2 instances."
            },
            {
                "id": "D",
                "text": "Maintain the physical hardware of the infrastructure"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q199",
        "text": "A company has an Amazon EC2 instance in a private subnet. The company wants to initiate a\nconnection to the internet to pull operating system updates while preventing traffic from the internet\nfrom accessing the EC2 instance.\nWhich AWS managed service allows this?",
        "options": [
            {
                "id": "A",
                "text": "VPC endpoint"
            },
            {
                "id": "B",
                "text": "NAT gateway"
            },
            {
                "id": "C",
                "text": "Amazon PrivateLink"
            },
            {
                "id": "D",
                "text": "VPC peering"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q200",
        "text": "Which actions are the responsibility of AWS, according to the AWS shared responsibility model? (Choose\ntwo.)",
        "options": [
            {
                "id": "A",
                "text": "Securing the virtualization layer"
            },
            {
                "id": "B",
                "text": "Patching the operating system on Amazon EC2 instances"
            },
            {
                "id": "C",
                "text": "Enforcing a strict password policy for IAM users"
            },
            {
                "id": "D",
                "text": "Patching the operating system on Amazon RDS instances"
            },
            {
                "id": "E",
                "text": "Configuring security groups and network ACLs"
            }
        ],
        "answer": "ADACOMPANYISSTORINGDATATHATWILLNOTBEFREQUENTLYACCESSEDINTHEAWSCLOUD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q201",
        "text": "Which Amazon S3 storage class will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "S3 Standard"
            },
            {
                "id": "B",
                "text": "S3 Glacier Flexible Retrieval"
            },
            {
                "id": "C",
                "text": "S3 One Zone-Infrequent Access (S3 One Zone-IA)"
            },
            {
                "id": "D",
                "text": "S3 Standard-Infrequent Access (S3 Standard-IA)"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q202",
        "text": "Which AWS service or resource can be used to identify services that have been used by a user within a\nspecified date range?",
        "options": [
            {
                "id": "A",
                "text": "Amazon S3 access control lists (ACLs)"
            },
            {
                "id": "B",
                "text": "AWS Certificate Manager (ACM)"
            },
            {
                "id": "C",
                "text": "Network Access Analyzer"
            },
            {
                "id": "D",
                "text": "AWS Identity and Access Management Access Analyzer"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q203",
        "text": "A company needs to engage third-party consultants to help maintain and support its AWS environment\nand the company’s business needs.\nWhich AWS service or resource will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Support"
            },
            {
                "id": "B",
                "text": "AWS Organizations"
            },
            {
                "id": "C",
                "text": "AWS Service Catalog"
            },
            {
                "id": "D",
                "text": "AWS Partner Network (APN)"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q204",
        "text": "A company wants to create Amazon QuickSight dashboards every week by using its billing data.\nWhich AWS feature or tool can the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Budgets"
            },
            {
                "id": "B",
                "text": "AWS Cost Explorer"
            },
            {
                "id": "C",
                "text": "AWS Cost and Usage Report"
            },
            {
                "id": "D",
                "text": "AWS Cost Anomaly Detection"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q205",
        "text": "A company is planning to move data backups to the AWS Cloud. The company needs to replace onpremises storage with storage that is cloud-based but locally cached.\nWhich AWS service meets these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Storage Gateway"
            },
            {
                "id": "B",
                "text": "AWS Snowcone"
            },
            {
                "id": "C",
                "text": "AWS Backup"
            },
            {
                "id": "D",
                "text": "Amazon Elastic File System (Amazon EFS)"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q206",
        "text": "A company needs to organize its resources and track AWS costs on a detailed level. The company needs\nto categorize costs by business department, environment, and application.\nWhich solution will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Access the AWS Cost Management console to organize resources, set an AWS budget, and receive notifications of unintentional usage."
            },
            {
                "id": "B",
                "text": "Use tags to organize the resources. Activate cost allocation tags to track AWS costs on a detailed level."
            },
            {
                "id": "C",
                "text": "Create Amazon CloudWatch dashboards to visually organize and track costs individually."
            },
            {
                "id": "D",
                "text": "Access the AWS Billing and Cost Management dashboard to organize and track resource consumption on a detailed level."
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q207",
        "text": "A company needs to plan, schedule, and run hundreds of thousands of computing jobs on AWS.\nWhich AWS service can the company use to meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Step Functions"
            },
            {
                "id": "B",
                "text": "AWS Service Catalog"
            },
            {
                "id": "C",
                "text": "Amazon Simple Queue Service (Amazon SQS)"
            },
            {
                "id": "D",
                "text": "AWS Batch"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q208",
        "text": "Which AWS services or features provide high availability and low latency by enabling failover across\ndifferent AWS Regions? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Amazon Route 53"
            },
            {
                "id": "B",
                "text": "Network Load Balancer"
            },
            {
                "id": "C",
                "text": "Amazon S3 Transfer Acceleration"
            },
            {
                "id": "D",
                "text": "AWS Global Accelerator"
            },
            {
                "id": "E",
                "text": "Application Load Balancer"
            }
        ],
        "answer": "AD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q209",
        "text": "Which of the following is a way to use Amazon EC2 Auto Scaling groups to scale capacity in the AWS\nCloud?",
        "options": [
            {
                "id": "A",
                "text": "Scale the number of EC2 instances in or out automatically, based on demand."
            },
            {
                "id": "B",
                "text": "Use serverless EC2 instances."
            },
            {
                "id": "C",
                "text": "Scale the size of EC2 instances up or down automatically, based on demand."
            },
            {
                "id": "D",
                "text": "Transfer unused CPU resources between EC2 instances."
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q210",
        "text": "Which abilities are benefits of the AWS Cloud? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Trade variable expenses for capital expenses."
            },
            {
                "id": "B",
                "text": "Deploy globally in minutes."
            },
            {
                "id": "C",
                "text": "Plan capacity in advance of deployments."
            },
            {
                "id": "D",
                "text": "Take advantage of economies of scale."
            },
            {
                "id": "E",
                "text": "Reduce dependencies on network connectivity."
            }
        ],
        "answer": "BD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q211",
        "text": "Which AWS security service protects applications from distributed denial of service attacks with alwayson detection and automatic inline mitigations?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Inspector"
            },
            {
                "id": "B",
                "text": "AWS Web Application Firewall (AWS WAF)"
            },
            {
                "id": "C",
                "text": "Elastic Load Balancing (ELB)"
            },
            {
                "id": "D",
                "text": "AWS Shield"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q212",
        "text": "Which AWS service allows users to model and provision AWS resources using common programming\nlanguages?",
        "options": [
            {
                "id": "A",
                "text": "AWS CloudFormation"
            },
            {
                "id": "B",
                "text": "AWS CodePipeline"
            },
            {
                "id": "C",
                "text": "AWS Cloud Development Kit (AWS CDK)"
            },
            {
                "id": "D",
                "text": "AWS Systems Manager"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q213",
        "text": "Which Amazon EC2 instance pricing model can provide discounts of up to 90%?",
        "options": [
            {
                "id": "A",
                "text": "Reserved Instances"
            },
            {
                "id": "B",
                "text": "On-Demand"
            },
            {
                "id": "C",
                "text": "Dedicated Hosts"
            },
            {
                "id": "D",
                "text": "Spot Instances"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q214",
        "text": "Which of the following acts as an instance-level firewall to control inbound and outbound access?",
        "options": [
            {
                "id": "A",
                "text": "Network access control list"
            },
            {
                "id": "B",
                "text": "Security groups"
            },
            {
                "id": "C",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "D",
                "text": "Virtual private gateways"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q215",
        "text": "A company must be able to develop, test, and launch an application in the AWS Cloud quickly.\nWhich advantage of cloud computing will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Stop guessing capacity"
            },
            {
                "id": "B",
                "text": "Trade fixed expense for variable expense"
            },
            {
                "id": "C",
                "text": "Achieve economies of scale"
            },
            {
                "id": "D",
                "text": "Increase speed and agility"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q216",
        "text": "A company has teams that have different job roles and responsibilities. The company’s employees\noften change teams. The company needs to manage permissions for the employees so that the\npermissions are appropriate for the job responsibilities.\nWhich IAM resource should the company use to meet this requirement with the LEAST operational\noverhead?",
        "options": [
            {
                "id": "A",
                "text": "IAM user groups"
            },
            {
                "id": "B",
                "text": "IAM roles"
            },
            {
                "id": "C",
                "text": "IAM instance profiles"
            },
            {
                "id": "D",
                "text": "IAM policies for individual users"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q217",
        "text": "Which AWS service can a company use to securely store and encrypt passwords for a database?",
        "options": [
            {
                "id": "A",
                "text": "AWS Shield"
            },
            {
                "id": "B",
                "text": "AWS Secrets Manager"
            },
            {
                "id": "C",
                "text": "AWS Identity and Access Management (IAM)"
            },
            {
                "id": "D",
                "text": "Amazon Cognito"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q218",
        "text": "What can a cloud practitioner use to retrieve AWS security and compliance documents and submit them\nas evidence to an auditor or regulator?",
        "options": [
            {
                "id": "A",
                "text": "AWS Certificate Manager"
            },
            {
                "id": "B",
                "text": "AWS Systems Manager"
            },
            {
                "id": "C",
                "text": "AWS Artifact"
            },
            {
                "id": "D",
                "text": "Amazon Inspector"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q219",
        "text": "Which encryption types can be used to protect objects at rest in Amazon S3? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Server-side encryption with Amazon S3 managed encryption keys (SSE-S3)"
            },
            {
                "id": "B",
                "text": "Server-side encryption with AWS KMS managed keys (SSE-KMS)"
            },
            {
                "id": "C",
                "text": "TLS"
            },
            {
                "id": "D",
                "text": "SSL"
            },
            {
                "id": "E",
                "text": "Transparent Data Encryption (TDE)"
            }
        ],
        "answer": "AB",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q220",
        "text": "A company wants to integrate its online shopping website with social media login credentials.\nWhich AWS service can the company use to make this integration?",
        "options": [
            {
                "id": "A",
                "text": "AWS Directory Service"
            },
            {
                "id": "B",
                "text": "AWS Identity and Access Management (IAM)"
            },
            {
                "id": "C",
                "text": "Amazon Cognito"
            },
            {
                "id": "D",
                "text": "AWS IAM Identity Center (AWS Single Sign-On)"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q221",
        "text": "Which AWS service is used to track, record, and audit configuration changes made to AWS resources?",
        "options": [
            {
                "id": "A",
                "text": "AWS Shield"
            },
            {
                "id": "B",
                "text": "AWS Config"
            },
            {
                "id": "C",
                "text": "AWS IAM"
            },
            {
                "id": "D",
                "text": "Amazon Inspector"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q222",
        "text": "A customer runs an On-Demand Amazon Linux EC2 instance for 3 hours, 5 minutes, and 6 seconds.\nFor how much time will the customer be billed?",
        "options": [
            {
                "id": "A",
                "text": "3 hours, 5 minutes"
            },
            {
                "id": "B",
                "text": "3 hours, 5 minutes, and 6 seconds"
            },
            {
                "id": "C",
                "text": "3 hours, 6 minutes"
            },
            {
                "id": "D",
                "text": "4 hours"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q223",
        "text": "A company website is experiencing DDoS attacks.\nWhich AWS service can help protect the company website against these attacks?",
        "options": [
            {
                "id": "A",
                "text": "AWS Resource Access Manager"
            },
            {
                "id": "B",
                "text": "AWS Amplify"
            },
            {
                "id": "C",
                "text": "AWS Shield"
            },
            {
                "id": "D",
                "text": "Amazon GuardDuty"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q224",
        "text": "A company wants a customized assessment of its current on-premises environment. The company\nwants to understand its projected running costs in the AWS Cloud.\nWhich AWS service or tool will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "B",
                "text": "Amazon Inspector"
            },
            {
                "id": "C",
                "text": "AWS Control Tower"
            },
            {
                "id": "D",
                "text": "Migration Evaluator"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q225",
        "text": "A company that has multiple business units wants to centrally manage and govern its AWS Cloud\nenvironments. The company wants to automate the creation of AWS accounts, apply service control\npolicies (SCPs), and simplify billing processes.\nWhich AWS service or tool should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Organizations"
            },
            {
                "id": "B",
                "text": "Cost Explorer"
            },
            {
                "id": "C",
                "text": "AWS Budgets"
            },
            {
                "id": "D",
                "text": "AWS Trusted Advisor"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q226",
        "text": "A company is hosting an application in the AWS Cloud. The company wants to verify that underlying\nAWS services and general AWS infrastructure are operating normally.\nWhich combination of AWS services can the company use to gather the required information? (Choose\ntwo.)",
        "options": [
            {
                "id": "A",
                "text": "AWS Personal Health Dashboard"
            },
            {
                "id": "B",
                "text": "AWS Systems Manager"
            },
            {
                "id": "C",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "D",
                "text": "AWS Service Health Dashboard"
            },
            {
                "id": "E",
                "text": "AWS Service Catalog"
            }
        ],
        "answer": "AD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q227",
        "text": "A company needs to migrate a PostgreSQL database from on-premises to Amazon RDS.\nWhich AWS service or tool should the company use to meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "Cloud Adoption Readiness Tool"
            },
            {
                "id": "B",
                "text": "AWS Migration Hub"
            },
            {
                "id": "C",
                "text": "AWS Database Migration Service (AWS DMS)"
            },
            {
                "id": "D",
                "text": "AWS Application Migration Service"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q228",
        "text": "Which cloud concept is demonstrated by using AWS Compute Optimizer?",
        "options": [
            {
                "id": "A",
                "text": "Security validation"
            },
            {
                "id": "B",
                "text": "Rightsizing"
            },
            {
                "id": "C",
                "text": "Elasticity"
            },
            {
                "id": "D",
                "text": "Global reach"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q229",
        "text": "A company hosts a large amount of data in AWS. The company wants to identify if any of the data\nshould be considered sensitive.\nWhich AWS service will meet the requirement?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Inspector"
            },
            {
                "id": "B",
                "text": "Amazon Macie"
            },
            {
                "id": "C",
                "text": "AWS Identity and Access Management (IAM)"
            },
            {
                "id": "D",
                "text": "Amazon CloudWatch"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q230",
        "text": "A user has a stateful workload that will run on Amazon EC2 for the next 3 years.\nWhat is the MOST cost-effective pricing model for this workload?",
        "options": [
            {
                "id": "A",
                "text": "On-Demand Instances"
            },
            {
                "id": "B",
                "text": "Reserved Instances"
            },
            {
                "id": "C",
                "text": "Dedicated Instances"
            },
            {
                "id": "D",
                "text": "Spot Instances"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q231",
        "text": "Who enables encryption of data at rest for Amazon Elastic Block Store (Amazon EBS)?",
        "options": [
            {
                "id": "A",
                "text": "AWS Support"
            },
            {
                "id": "B",
                "text": "AWS customers"
            },
            {
                "id": "C",
                "text": "AWS Key Management Service (AWS KMS)"
            },
            {
                "id": "D",
                "text": "AWS Trusted Advisor"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q232",
        "text": "What can a user accomplish using AWS CloudTrail?",
        "options": [
            {
                "id": "A",
                "text": "Generate an IAM user credentials report."
            },
            {
                "id": "B",
                "text": "Record API calls made to AWS services."
            },
            {
                "id": "C",
                "text": "Assess the compliance of AWS resource configurations with policies and guidelines."
            },
            {
                "id": "D",
                "text": "Ensure that Amazon EC2 instances are patched with the latest security updates."
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q233",
        "text": "A company is planning to host its workloads on AWS.\nWhich AWS service requires the company to update and patch the guest operating system?",
        "options": [
            {
                "id": "A",
                "text": "Amazon DynamoDB"
            },
            {
                "id": "B",
                "text": "Amazon S3"
            },
            {
                "id": "C",
                "text": "Amazon EC2"
            },
            {
                "id": "D",
                "text": "Amazon Aurora"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q234",
        "text": "Which AWS service or feature will search for and identify AWS resources that are shared externally?",
        "options": [
            {
                "id": "A",
                "text": "Amazon OpenSearch Service"
            },
            {
                "id": "B",
                "text": "AWS Control Tower"
            },
            {
                "id": "C",
                "text": "AWS IAM Access Analyzer"
            },
            {
                "id": "D",
                "text": "AWS Fargate"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q235",
        "text": "A company is migrating its workloads to the AWS Cloud. The company must retain full control of patch\nmanagement for the guest operating systems that host its applications.\nWhich AWS service should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon DynamoDB"
            },
            {
                "id": "B",
                "text": "Amazon EC2"
            },
            {
                "id": "C",
                "text": "AWS Lambda"
            },
            {
                "id": "D",
                "text": "Amazon RDS"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q236",
        "text": "At what support level do users receive access to a support concierge?",
        "options": [
            {
                "id": "A",
                "text": "Basic Support"
            },
            {
                "id": "B",
                "text": "Developer Support"
            },
            {
                "id": "C",
                "text": "Business Support"
            },
            {
                "id": "D",
                "text": "Enterprise Support"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q237",
        "text": "Which AWS service can a company use to visually design and build serverless applications?",
        "options": [
            {
                "id": "A",
                "text": "AWS Lambda"
            },
            {
                "id": "B",
                "text": "AWS Batch"
            },
            {
                "id": "C",
                "text": "AWS Application Composer"
            },
            {
                "id": "D",
                "text": "AWS App Runner"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q238",
        "text": "A company wants to migrate to AWS and use the same security software it uses on premises. The security\nsoftware vendor offers its security software as a service on AWS.\nWhere can the company purchase the security solution?",
        "options": [
            {
                "id": "A",
                "text": "AWS Partner Solutions Finder"
            },
            {
                "id": "B",
                "text": "AWS Support Center"
            },
            {
                "id": "C",
                "text": "AWS Management Console"
            },
            {
                "id": "D",
                "text": "AWS Marketplace"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q239",
        "text": "A company has deployed an Amazon EC2 instance.\nWhich option is an AWS responsibility under the AWS shared responsibility model?",
        "options": [
            {
                "id": "A",
                "text": "Managing and encrypting application data"
            },
            {
                "id": "B",
                "text": "Installing updates and security patches of guest operating system"
            },
            {
                "id": "C",
                "text": "Configuration of infrastructure devices"
            },
            {
                "id": "D",
                "text": "Configuration of security groups on each instance"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q240",
        "text": "A company wants to migrate its PostgreSQL database to AWS. The company does not use the database\nfrequently.\nWhich AWS service or resource will meet these requirements with the LEAST management overhead?",
        "options": [
            {
                "id": "A",
                "text": "PostgreSQL on Amazon EC2"
            },
            {
                "id": "B",
                "text": "Amazon RDS for PostgreSQL"
            },
            {
                "id": "C",
                "text": "Amazon Aurora PostgreSQL-Compatible Edition"
            },
            {
                "id": "D",
                "text": "Amazon Aurora Serverless"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q241",
        "text": "A company is using Amazon DynamoDB for its application database.\nWhich tasks are the responsibility of AWS, according to the AWS shared responsibility model? (Choose\ntwo.)",
        "options": [
            {
                "id": "A",
                "text": "Classify data."
            },
            {
                "id": "B",
                "text": "Configure access permissions."
            },
            {
                "id": "C",
                "text": "Manage encryption options."
            },
            {
                "id": "D",
                "text": "Provide public endpoints to store and retrieve data."
            },
            {
                "id": "E",
                "text": "Manage the infrastructure layer and the operating system."
            }
        ],
        "answer": "DE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q242",
        "text": "A company wants to create a globally accessible ecommerce platform for its customers. The company\nwants to use a highly available and scalable DNS web service to connect users to the platform.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon EC2"
            },
            {
                "id": "B",
                "text": "Amazon VPC"
            },
            {
                "id": "C",
                "text": "Amazon Route 53"
            },
            {
                "id": "D",
                "text": "Amazon RDS"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q243",
        "text": "Which maintenance task is the customer’s responsibility, according to the AWS shared responsibility\nmodel?",
        "options": [
            {
                "id": "A",
                "text": "Physical connectivity among Availability Zones"
            },
            {
                "id": "B",
                "text": "Network switch maintenance"
            },
            {
                "id": "C",
                "text": "Hardware updates and firmware patches"
            },
            {
                "id": "D",
                "text": "Amazon EC2 updates and security patches"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q244",
        "text": "A company wants to improve its security posture by reviewing user activity through API calls.\nWhich AWS service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS WAF"
            },
            {
                "id": "B",
                "text": "Amazon Detective"
            },
            {
                "id": "C",
                "text": "Amazon CloudWatch"
            },
            {
                "id": "D",
                "text": "AWS CloudTrail"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q245",
        "text": "A company is migrating to the AWS Cloud and plans to run experimental workloads for 3 to 6 months\non AWS.\nWhich pricing model will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Use Savings Plans for a 3-year term."
            },
            {
                "id": "B",
                "text": "Use Dedicated Hosts."
            },
            {
                "id": "C",
                "text": "Buy Reserved Instances."
            },
            {
                "id": "D",
                "text": "Use On-Demand Instances."
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q246",
        "text": "A company that has AWS Enterprise Support is launching a new version of a popular product in 2\nmonths. The company expects a large increase in traffic to its website. The website is hosted on\nAmazon EC2 instances.\nWhich action should the company take to assess its readiness to scale for this launch?",
        "options": [
            {
                "id": "A",
                "text": "Replace the EC2 instances with AWS Lambda functions."
            },
            {
                "id": "B",
                "text": "Use AWS Infrastructure Event Management (IEM) support."
            },
            {
                "id": "C",
                "text": "Submit a request on AWS Marketplace to monitor the event."
            },
            {
                "id": "D",
                "text": "Review the coverage reports in the AWS Cost Management console."
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q247",
        "text": "A company wants to launch multiple workloads on AWS. Each workload is related to a different business\nunit. The company wants to separate and track costs for each business unit.\nWhich solution will meet these requirements with the LEAST operational overhead?",
        "options": [
            {
                "id": "A",
                "text": "Use AWS Organizations and create one account for each business unit."
            },
            {
                "id": "B",
                "text": "Use a spreadsheet to control the owners and cost of each resource."
            },
            {
                "id": "C",
                "text": "Use an Amazon DynamoDB table to record costs for each business unit."
            },
            {
                "id": "D",
                "text": "Use the AWS Billing console to assign owners to resources and track costs."
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q248",
        "text": "A company wants a time-series database service that makes it easier to store and analyze trillions of\nevents each day.\nWhich AWS service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Neptune"
            },
            {
                "id": "B",
                "text": "Amazon Timestream"
            },
            {
                "id": "C",
                "text": "Amazon Forecast"
            },
            {
                "id": "D",
                "text": "Amazon DocumentDB (with MongoDB compatibility)"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q249",
        "text": "Which option is a shared control between AWS and the customer, according to the AWS shared\nresponsibility model?",
        "options": [
            {
                "id": "A",
                "text": "Configuration management"
            },
            {
                "id": "B",
                "text": "Physical and environmental controls"
            },
            {
                "id": "C",
                "text": "Data integrity authentication"
            },
            {
                "id": "D",
                "text": "Identity and access management"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q250",
        "text": "A company often does not use all of its current Amazon EC2 capacity to run stateless workloads. The\ncompany wants to optimize its EC2 costs.\nWhich EC2 instance type will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Spot Instances"
            },
            {
                "id": "B",
                "text": "Dedicated Instances"
            },
            {
                "id": "C",
                "text": "Reserved Instances"
            },
            {
                "id": "D",
                "text": "On-Demand Instances"
            }
        ],
        "answer": "AACOMPANYWANTSTOSTOREDATAINAMAZONS",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q251",
        "text": "A company has migrated its workloads to AWS. The company wants to adopt AWS at scale and operate\nmore efficiently and securely. Which AWS service or framework should the company use for operational\nsupport?",
        "options": [
            {
                "id": "A",
                "text": "AWS Support"
            },
            {
                "id": "B",
                "text": "AWS Cloud Adoption Framework (AWS CAF)"
            },
            {
                "id": "C",
                "text": "AWS Managed Services (AMS)"
            },
            {
                "id": "D",
                "text": "AWS Well-Architected Framework"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q252",
        "text": "A company wants to provision and manage its AWS infrastructure by using the common programming\nlanguages Typescript, Python, Java, and .NET.\nWhich AWS service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS CodeBuild"
            },
            {
                "id": "B",
                "text": "AWS CloudFormation"
            },
            {
                "id": "C",
                "text": "AWS CLI"
            },
            {
                "id": "D",
                "text": "AWS Cloud Development Kit (AWS CDK)"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q253",
        "text": "Which Amazon EC2 pricing model provides the MOST cost savings for an always-up, right-sized database\nserver running for a project that will last 1 year?",
        "options": [
            {
                "id": "A",
                "text": "On-Demand Instances"
            },
            {
                "id": "B",
                "text": "Convertible Reserved Instances"
            },
            {
                "id": "C",
                "text": "Spot Instances"
            },
            {
                "id": "D",
                "text": "Standard Reserved Instances"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q254",
        "text": "A company has a physical tape library to store data backups. The tape library is running out of space. The\ncompany needs to extend the tape library's capacity to the AWS Cloud.\nWhich AWS service should the company use to meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Elastic File System (Amazon EFS)"
            },
            {
                "id": "B",
                "text": "Amazon Elastic Block Store (Amazon EBS)"
            },
            {
                "id": "C",
                "text": "Amazon S3"
            },
            {
                "id": "D",
                "text": "AWS Storage Gateway"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q255",
        "text": "A company is using the AWS Free Tier for several AWS services for an application.\nWhat will happen if the Free Tier usage period expires or if the application use exceeds the Free Tier\nusage limits?",
        "options": [
            {
                "id": "A",
                "text": "The company will be charged the standard pay-as-you-go service rates for the usage that exceeds the Free Tier usage."
            },
            {
                "id": "B",
                "text": "AWS Support will contact the company to set up standard service charges."
            },
            {
                "id": "C",
                "text": "The company will be charged for the services it consumed during the Free Tier period, plus additional charges for service consumption after the Free Tier period."
            },
            {
                "id": "D",
                "text": "The company's AWS account will be frozen and can be restarted after a payment plan is established."
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q256",
        "text": "A company wants to monitor its workload performance. The company wants to ensure that the cloud\nservices are delivered at a level that meets its business needs.\nWhich AWS Cloud Adoption Framework (AWS CAF) perspective will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Business"
            },
            {
                "id": "B",
                "text": "Governance"
            },
            {
                "id": "C",
                "text": "Platform"
            },
            {
                "id": "D",
                "text": "Operations"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q257",
        "text": "A company wants to migrate its applications to the AWS Cloud. The company plans to identify and\nprioritize any business transformation opportunities and evaluate its AWS Cloud readiness.\nWhich AWS service or tool should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Cloud Adoption Framework (AWS CAF)"
            },
            {
                "id": "B",
                "text": "AWS Managed Services (AMS)"
            },
            {
                "id": "C",
                "text": "AWS Well-Architected Framework"
            },
            {
                "id": "D",
                "text": "AWS Migration Hub"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q258",
        "text": "A company need an AWS service that provides a clear baseline of what the company runs in its onpremises data centres. The company needs the projected cost to run its on-premises workloads in the\nAWS Cloud.\nWhat AWS service or tool will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Compute Optimizer"
            },
            {
                "id": "B",
                "text": "AWS Cost Explorer"
            },
            {
                "id": "C",
                "text": "AWS Systems Manager Agent (SSM Agent)"
            },
            {
                "id": "D",
                "text": "Migration Evaluator"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q259",
        "text": "A company acquired another corporation. The company now has two AWS accounts.\nWhich AWS service or tool can the company use to consolidate the billing for these two accounts?",
        "options": [
            {
                "id": "A",
                "text": "AWS Systems Manager"
            },
            {
                "id": "B",
                "text": "AWS Organizations"
            },
            {
                "id": "C",
                "text": "AWS License Manager"
            },
            {
                "id": "D",
                "text": "Cost Explorer"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q260",
        "text": "A company wants to set up its workloads to perform their intended functions and recover quickly from\nfailure.\nWhich pillar of the AWS Well-Architected Framework aligns with these goals?",
        "options": [
            {
                "id": "A",
                "text": "Performance efficiency"
            },
            {
                "id": "B",
                "text": "Sustainability"
            },
            {
                "id": "C",
                "text": "Reliability"
            },
            {
                "id": "D",
                "text": "Security"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q261",
        "text": "Which of the following is a managed AWS service that is used specifically for extract, transform, and load\n(ETL) data?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Athena"
            },
            {
                "id": "B",
                "text": "AWS Glue"
            },
            {
                "id": "C",
                "text": "Amazon S3"
            },
            {
                "id": "D",
                "text": "AWS Snowball Edge"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q262",
        "text": "A company wants to migrate petabytes of data from its on-premises data center to AWS. The company\ndoes not want to use an internet connection to perform the migration.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS DataSync"
            },
            {
                "id": "B",
                "text": "Amazon Connect"
            },
            {
                "id": "C",
                "text": "AWS Snowmobile"
            },
            {
                "id": "D",
                "text": "AWS Direct Connect"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q263",
        "text": "A company wants to receive alerts to monitor its overall operating costs for its AWS public cloud\ninfrastructure.\nWhich AWS offering will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon EventBridge"
            },
            {
                "id": "B",
                "text": "Compute Savings Plans"
            },
            {
                "id": "C",
                "text": "AWS Budgets"
            },
            {
                "id": "D",
                "text": "Migration Evaluator"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q264",
        "text": "How does the AWS Enterprise Support Concierge team help users?",
        "options": [
            {
                "id": "A",
                "text": "Supporting application development"
            },
            {
                "id": "B",
                "text": "Providing architecture guidance"
            },
            {
                "id": "C",
                "text": "Answering billing and account inquiries"
            },
            {
                "id": "D",
                "text": "Answering questions regarding technical support cases"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q265",
        "text": "Topic 1\nA company wants to run a simulation for 3 years without interruptions.\nWhich Amazon EC2 instance purchasing option will meet these requirements MOST cost-effectively?",
        "options": [
            {
                "id": "A",
                "text": "Spot Instances"
            },
            {
                "id": "B",
                "text": "Reserved Instances"
            },
            {
                "id": "C",
                "text": "Dedicated Hosts"
            },
            {
                "id": "D",
                "text": "On-Demand Instances"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q266",
        "text": "Which AWS service or resource can provide discounts on some AWS service costs in exchange for a\nspending commitment?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Detective"
            },
            {
                "id": "B",
                "text": "AWS Pricing Calculator"
            },
            {
                "id": "C",
                "text": "Savings Plans"
            },
            {
                "id": "D",
                "text": "Basic Support"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q267",
        "text": "Which of the following are pillars of the AWS Well-Architected Framework? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "High availability"
            },
            {
                "id": "B",
                "text": "Performance efficiency"
            },
            {
                "id": "C",
                "text": "Cost optimization"
            },
            {
                "id": "D",
                "text": "Going global in minutes"
            },
            {
                "id": "E",
                "text": "Continuous development"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q268",
        "text": "A company wants to use Amazon EC2 instances to provide a static website to users all over the world.\nThe company needs to minimize latency for the users.\nWhich solution meets these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Use EC2 instances in multiple edge locations."
            },
            {
                "id": "B",
                "text": "Use EC2 instances in the same Availability Zone but in different AWS Regions."
            },
            {
                "id": "C",
                "text": "Use Amazon CloudFront with the EC2 instances configured as the source."
            },
            {
                "id": "D",
                "text": "Use EC2 instances in the same Availability Zone but in different AWS accounts."
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q269",
        "text": "A team of researchers is going to collect data at remote locations around the world. Many locations do\nnot have internet connectivity. The team needs to capture the data in the field, and transfer it to the\nAWS Cloud later.\nWhich AWS service will support these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Outposts"
            },
            {
                "id": "B",
                "text": "AWS Transfer Family"
            },
            {
                "id": "C",
                "text": "AWS Snow Family"
            },
            {
                "id": "D",
                "text": "AWS Migration Hub"
            }
        ],
        "answer": "CWHICHOFTHEFOLLOWINGAREBENEFITSTHATACOMPANYRECEIVESWHENITMOVESANON",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q270",
        "text": "A company has decided to adopt Amazon EC2 infrastructure and wants to scale various stateless\nservices for short-term usage.\nWhich EC2 pricing model is MOST cost-efficient to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Spot Instances"
            },
            {
                "id": "B",
                "text": "On-Demand Instances"
            },
            {
                "id": "C",
                "text": "Reserved Instances"
            },
            {
                "id": "D",
                "text": "Dedicated Hosts"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q271",
        "text": "Which of the following are benefits of AWS Trusted Advisor? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Access to Amazon Simple Queue Service (Amazon SQS)"
            },
            {
                "id": "B",
                "text": "Cost optimization recommendations"
            },
            {
                "id": "C",
                "text": "Hourly refresh of the service limit checks"
            },
            {
                "id": "D",
                "text": "Security checks"
            },
            {
                "id": "E",
                "text": "AWS Identity and Access Management (IAM) approval management"
            }
        ],
        "answer": "BD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q272",
        "text": "A company wants to save costs by archiving data that is no longer frequently accessed by end users.\nWhich Amazon S3 feature will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "S3 Versioning"
            },
            {
                "id": "B",
                "text": "S3 Lifecycle"
            },
            {
                "id": "C",
                "text": "S3 Object Lock"
            },
            {
                "id": "D",
                "text": "S3 Inventory"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q273",
        "text": "Which cloud computing advantage is a company applying when it uses AWS Regions to increase\napplication availability to users in different countries?",
        "options": [
            {
                "id": "A",
                "text": "Pay-as-you-go pricing"
            },
            {
                "id": "B",
                "text": "Capacity forecasting"
            },
            {
                "id": "C",
                "text": "Economies of scale"
            },
            {
                "id": "D",
                "text": "Global reach"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q274",
        "text": "A company wants an AWS service to collect and process 10 TB of data locally and transfer the data to\nAWS. The company has intermittent connectivity.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Database Migration Service (AWS DMS)"
            },
            {
                "id": "B",
                "text": "AWS DataSync"
            },
            {
                "id": "C",
                "text": "AWS Backup"
            },
            {
                "id": "D",
                "text": "AWS Snowball Edge"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q275",
        "text": "Topic 1\nWhich of the following is an AWS Well-Architected Framework design principle for operational excellence\nin the AWS Cloud?",
        "options": [
            {
                "id": "A",
                "text": "Go global in minutes."
            },
            {
                "id": "B",
                "text": "Make frequent, small, reversible changes."
            },
            {
                "id": "C",
                "text": "Implement a strong foundation of identity and access management"
            },
            {
                "id": "D",
                "text": "Stop spending money on hardware infrastructure for data center operations."
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q276",
        "text": "What is a benefit of using AWS serverless computing?",
        "options": [
            {
                "id": "A",
                "text": "Application deployment and management are not required."
            },
            {
                "id": "B",
                "text": "Application security will be fully managed by AWS."
            },
            {
                "id": "C",
                "text": "Monitoring and logging are not needed."
            },
            {
                "id": "D",
                "text": "Management of infrastructure is offloaded to AWS."
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q277",
        "text": "A developer wants AWS users to access AWS services by using temporary security credentials.\nWhich AWS service or feature should the developer use to provide these credentials?",
        "options": [
            {
                "id": "A",
                "text": "IAM policies"
            },
            {
                "id": "B",
                "text": "IAM user groups"
            },
            {
                "id": "C",
                "text": "AWS Security Token Service (AWS STS)"
            },
            {
                "id": "D",
                "text": "AWS IAM Identity Center (AWS Single Sign-On)"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q278",
        "text": "A global company wants to use a managed security service for protection from SQL injection attacks.\nThe service also must provide detailed logging information about access to the company's ecommerce\napplications.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Network Firewall"
            },
            {
                "id": "B",
                "text": "Amazon RDS for SQL Server"
            },
            {
                "id": "C",
                "text": "Amazon GuardDuty"
            },
            {
                "id": "D",
                "text": "AWS WAF"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q279",
        "text": "Topic 1\nA company is migrating its on-premises server to an Amazon EC2 instance. The server must always stay\nactive for the next 12 months.\nWhich EC2 pricing option is the MOST cost-effective for the company's workload?",
        "options": [
            {
                "id": "A",
                "text": "On-Demand"
            },
            {
                "id": "B",
                "text": "Dedicated Hosts"
            },
            {
                "id": "C",
                "text": "Spot Instances"
            },
            {
                "id": "D",
                "text": "Reserved Instances"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q280",
        "text": "Which of the following is the customer's responsibility under the AWS shared responsibility model?\n(Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Maintain the configuration of infrastructure devices."
            },
            {
                "id": "B",
                "text": "Maintain patching and updates within the hardware infrastructure."
            },
            {
                "id": "C",
                "text": "Maintain the configuration of guest operating systems and applications."
            },
            {
                "id": "D",
                "text": "Manage decisions involving encryption options."
            },
            {
                "id": "E",
                "text": "Maintain infrastructure hardware."
            }
        ],
        "answer": "CD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q281",
        "text": "A company wants to verify if multi-factor authentication (MFA) is enabled for all users within its AWS\naccounts.\nWhich AWS service or resource will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Cost and Usage Report"
            },
            {
                "id": "B",
                "text": "IAM credential reports"
            },
            {
                "id": "C",
                "text": "AWS Artifact"
            },
            {
                "id": "D",
                "text": "Amazon CloudFront reports"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q282",
        "text": "A company uses AWS security services and tools. The company needs a service to help manage the\nsecurity alerts and must organize the alerts into a single dashboard.\nWhich AWS service should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon GuardDuty"
            },
            {
                "id": "B",
                "text": "Amazon Inspector"
            },
            {
                "id": "C",
                "text": "Amazon Macie"
            },
            {
                "id": "D",
                "text": "AWS Security Hub"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q283",
        "text": "A company wants to run its workloads in the AWS Cloud effectively, reduce management overhead,\nand improve processes.\nWhich AWS Well-Architected Framework pillar represents these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Reliability"
            },
            {
                "id": "B",
                "text": "Operational excellence"
            },
            {
                "id": "C",
                "text": "Performance efficiency"
            },
            {
                "id": "D",
                "text": "Cost optimization"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q284",
        "text": "A company uses Amazon S3 to store records that can contain personally identifiable information (PII).\nThe company wants a solution that can monitor all S3 buckets for PII and immediately alert staff about\nvulnerabilities.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon GuardDuty"
            },
            {
                "id": "B",
                "text": "Amazon Detective"
            },
            {
                "id": "C",
                "text": "Amazon Macie"
            },
            {
                "id": "D",
                "text": "AWS Shield"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q285",
        "text": "Which AWS service allows users to download security and compliance reports about the AWS\ninfrastructure on demand?",
        "options": [
            {
                "id": "A",
                "text": "Amazon GuardDuty"
            },
            {
                "id": "B",
                "text": "AWS Security Hub"
            },
            {
                "id": "C",
                "text": "AWS Artifact"
            },
            {
                "id": "D",
                "text": "AWS Shield"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q286",
        "text": "An external auditor has requested that a company provide a list of all its IAM users, including the status\nof users' credentials and access keys.\nWhat is the SIMPLEST way to provide this information?",
        "options": [
            {
                "id": "A",
                "text": "Create an IAM user account for the auditor, granting the auditor administrator permissions."
            },
            {
                "id": "B",
                "text": "Take a screenshot of each user's page in the AWS Management Console, then provide the screenshots to the auditor."
            },
            {
                "id": "C",
                "text": "Download the IAM credential report, then provide the report to the auditor."
            },
            {
                "id": "D",
                "text": "Download the AWS Trusted Advisor report, then provide the report to the auditor."
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q287",
        "text": "Which task can a company perform by using security groups in the AWS Cloud?",
        "options": [
            {
                "id": "A",
                "text": "Allow access to an Amazon EC2 instance through only a specific port."
            },
            {
                "id": "B",
                "text": "Deny access to malicious IP addresses at a subnet level."
            },
            {
                "id": "C",
                "text": "Protect data that is cached by Amazon CloudFront."
            },
            {
                "id": "D",
                "text": "Apply a stateless firewall to an Amazon EC2 instance."
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q288",
        "text": "A company plans to run a compute-intensive workload that uses graphics processing units (GPUs).\\\nWhich Amazon EC2 instance type should the company use?",
        "options": [
            {
                "id": "A",
                "text": "Accelerated computing"
            },
            {
                "id": "B",
                "text": "Compute optimized"
            },
            {
                "id": "C",
                "text": "Storage optimized"
            },
            {
                "id": "D",
                "text": "General purpose"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q289",
        "text": "Which of the following are features of network ACLs as they are used in the AWS Cloud? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "They are stateless."
            },
            {
                "id": "B",
                "text": "They are stateful."
            },
            {
                "id": "C",
                "text": "They evaluate all rules before allowing traffic."
            },
            {
                "id": "D",
                "text": "They process rules in order, starting with the lowest numbered rule, when deciding whether to allow traffic."
            },
            {
                "id": "E",
                "text": "They operate at the instance level."
            }
        ],
        "answer": "AD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q290",
        "text": "Which capabilities are in the platform perspective of the AWS Cloud Adoption Framework (AWS CAF)?\n(Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Performance and capacity management"
            },
            {
                "id": "B",
                "text": "Data engineering"
            },
            {
                "id": "C",
                "text": "Continuous integration and continuous delivery (CI/CD)"
            },
            {
                "id": "D",
                "text": "Infrastructure protection"
            },
            {
                "id": "E",
                "text": "Change and release management"
            }
        ],
        "answer": "BC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q291",
        "text": "According to the AWS shared responsibility model, the customer is responsible for applying the latest\nsecurity updates and patches for which of the following?",
        "options": [
            {
                "id": "A",
                "text": "Amazon DynamoDB"
            },
            {
                "id": "B",
                "text": "Amazon EC2 instances"
            },
            {
                "id": "C",
                "text": "Amazon RDS instances"
            },
            {
                "id": "D",
                "text": "Amazon S3"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q292",
        "text": "Which Amazon S3 storage class is MOST cost-effective for unknown access patterns?",
        "options": [
            {
                "id": "A",
                "text": "S3 Standard"
            },
            {
                "id": "B",
                "text": "S3 Standard-Infrequent Access (S3 Standard-IA)"
            },
            {
                "id": "C",
                "text": "S3 One Zone-Infrequent Access (S3 One Zone-IA)"
            },
            {
                "id": "D",
                "text": "S3 Intelligent-Tiering"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q293",
        "text": "Which options are AWS Cloud Adoption Framework (AWS CAF) security perspective capabilities? (Choose\ntwo.)",
        "options": [
            {
                "id": "A",
                "text": "Observability"
            },
            {
                "id": "B",
                "text": "Incident and problem management"
            },
            {
                "id": "C",
                "text": "Incident response"
            },
            {
                "id": "D",
                "text": "Infrastructure protection"
            },
            {
                "id": "E",
                "text": "Availability and continuity"
            }
        ],
        "answer": "CD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q294",
        "text": "A company has a managed IAM policy that does not grant the necessary permissions for users to\naccomplish required tasks.\nHow can this be resolved?",
        "options": [
            {
                "id": "A",
                "text": "Enable AWS Shield Advanced."
            },
            {
                "id": "B",
                "text": "Create a custom IAM policy."
            },
            {
                "id": "C",
                "text": "Use a third-party web application firewall (WAF) managed rule from the AWS Marketplace."
            },
            {
                "id": "D",
                "text": "Use AWS Key Management Service (AWS KMS) to create a customer-managed key."
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q295",
        "text": "Who is responsible for managing IAM user access and secret keys according to the AWS shared\nresponsibility model?",
        "options": [
            {
                "id": "A",
                "text": "IAM access and secret keys are static, so there is no need to rotate them."
            },
            {
                "id": "B",
                "text": "The customer is responsible for rotating keys."
            },
            {
                "id": "C",
                "text": "AWS will rotate the keys whenever required."
            },
            {
                "id": "D",
                "text": "The AWS Support team will rotate keys when requested by the customer."
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q296",
        "text": "A company needs to run a pre-installed third-party firewall on an Amazon EC2 instance.\nWhich AWS service or feature can provide this solution?",
        "options": [
            {
                "id": "A",
                "text": "Network ACLs"
            },
            {
                "id": "B",
                "text": "Security groups"
            },
            {
                "id": "C",
                "text": "AWS Marketplace"
            },
            {
                "id": "D",
                "text": "AWS Trusted Advisor"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q297",
        "text": "Which AWS Cloud benefit gives a company the ability to quickly deploy cloud resources to access\ncompute, storage, and database infrastructures in a matter of minutes?",
        "options": [
            {
                "id": "A",
                "text": "Elasticity"
            },
            {
                "id": "B",
                "text": "Cost savings"
            },
            {
                "id": "C",
                "text": "Agility"
            },
            {
                "id": "D",
                "text": "Reliability"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q298",
        "text": "Which of the following is entirely the responsibility of AWS, according to the AWS shared responsibility\nmodel?",
        "options": [
            {
                "id": "A",
                "text": "Security awareness and training"
            },
            {
                "id": "B",
                "text": "Development of an IAM password policy"
            },
            {
                "id": "C",
                "text": "Patching of the guest operating system"
            },
            {
                "id": "D",
                "text": "Physical and environmental controls"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q299",
        "text": "Which of the following best describes the concept of Cloud Orchestration in cloud infrastructure?",
        "options": [
            {
                "id": "A",
                "text": "Automated control over storage and network resources"
            },
            {
                "id": "B",
                "text": "Manual configuration of hardware components"
            },
            {
                "id": "C",
                "text": "Automated control over application software installation"
            },
            {
                "id": "D",
                "text": "Manual deployment of virtual machines"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q300",
        "text": "Which cloud service model offers the highest level of management by the provider, with the consumer\nfocusing mainly on application deployment?",
        "options": [
            {
                "id": "A",
                "text": "Infrastructure as a Service (IaaS)"
            },
            {
                "id": "B",
                "text": "Platform as a Service (PaaS)"
            },
            {
                "id": "C",
                "text": "Software as a Service (SaaS)"
            },
            {
                "id": "D",
                "text": "Network as a Service (NaaS)"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q301",
        "text": "Which of the following is a key feature of a cloud-native architecture?",
        "options": [
            {
                "id": "A",
                "text": "Monolithic application design"
            },
            {
                "id": "B",
                "text": "Applications tightly coupled with underlying hardware"
            },
            {
                "id": "C",
                "text": "Applications built using microservices and containers"
            },
            {
                "id": "D",
                "text": "Use of physical servers instead of virtualized infrastructure"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q302",
        "text": "Which type of hypervisor runs directly on the hardware and allows the hosting of virtual machines?",
        "options": [
            {
                "id": "A",
                "text": "Type-1 Hypervisor"
            },
            {
                "id": "B",
                "text": "Type-2 Hypervisor"
            },
            {
                "id": "C",
                "text": "Bare-metal Hypervisor"
            },
            {
                "id": "D",
                "text": "Type-3 Hypervisor"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q303",
        "text": "In a cloud environment, what does autoscaling refer to?",
        "options": [
            {
                "id": "A",
                "text": "Adjusting storage capacity manually"
            },
            {
                "id": "B",
                "text": "Automatically increasing or decreasing compute resources based on demand"
            },
            {
                "id": "C",
                "text": "Automatically balancing network traffic"
            },
            {
                "id": "D",
                "text": "Automatically managing user accounts in the cloud"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q304",
        "text": "Which component is essential for managing identities and access control in a cloud infrastructure?",
        "options": [
            {
                "id": "A",
                "text": "Virtual Private Network (VPN)"
            },
            {
                "id": "B",
                "text": "Identity and Access Management (IAM)"
            },
            {
                "id": "C",
                "text": "Cloud Storage Gateway"
            },
            {
                "id": "D",
                "text": "Content Delivery Network (CDN)"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q305",
        "text": "Which of the following describes cloud elasticity?",
        "options": [
            {
                "id": "A",
                "text": "The ability to provision resources in different geographic regions"
            },
            {
                "id": "B",
                "text": "The ability to scale resources both up and down as needed"
            },
            {
                "id": "C",
                "text": "The ability to customize hardware configurations"
            },
            {
                "id": "D",
                "text": "The ability to store large volumes of data"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q306",
        "text": "Which of the following is NOT a common cloud deployment model?",
        "options": [
            {
                "id": "A",
                "text": "Private Cloud"
            },
            {
                "id": "B",
                "text": "Public Cloud"
            },
            {
                "id": "C",
                "text": "Distributed Cloud"
            },
            {
                "id": "D",
                "text": "Hybrid Cloud"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q307",
        "text": "What is the primary advantage of serverless computing in cloud services?",
        "options": [
            {
                "id": "A",
                "text": "It requires constant server management by the user"
            },
            {
                "id": "B",
                "text": "It reduces operational costs by automatically handling infrastructure scaling"
            },
            {
                "id": "C",
                "text": "It provides full control over server hardware"
            },
            {
                "id": "D",
                "text": "It limits the scalability of applications"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q308",
        "text": "Which of the following mechanisms is commonly used for cloud data redundancy to ensure high\navailability?",
        "options": [
            {
                "id": "A",
                "text": "Single data center deployment"
            },
            {
                "id": "B",
                "text": "Geographic replication"
            },
            {
                "id": "C",
                "text": "Data encryption"
            },
            {
                "id": "D",
                "text": "Vertical scaling of virtual machines"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q309",
        "text": "Which of the following is NOT a characteristic of cloud computing?",
        "options": [
            {
                "id": "A",
                "text": "On-demand self-service"
            },
            {
                "id": "B",
                "text": "Broad network access"
            },
            {
                "id": "C",
                "text": "Single-tenancy"
            },
            {
                "id": "D",
                "text": "Resource pooling"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q310",
        "text": "What is the primary function of a cloud orchestrator?",
        "options": [
            {
                "id": "A",
                "text": "Manage virtual machines"
            },
            {
                "id": "B",
                "text": "Automate and manage the deployment of complex applications"
            },
            {
                "id": "C",
                "text": "Provide a cloud interface for developers"
            },
            {
                "id": "D",
                "text": "Backup and recovery"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q311",
        "text": "In the context of cloud infrastructure, what is a \"region\"?",
        "options": [
            {
                "id": "A",
                "text": "A physical data center located in a specific geographical area"
            },
            {
                "id": "B",
                "text": "A network security zone within a data center"
            },
            {
                "id": "C",
                "text": "A logical division of cloud resources within a provider’s infrastructure"
            },
            {
                "id": "D",
                "text": "A set of virtual machines that provide redundancy"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q312",
        "text": "Which of the following is a key advantage of using Infrastructure as Code (IaC) in cloud\nenvironments?",
        "options": [
            {
                "id": "A",
                "text": "Enables manual configuration of servers"
            },
            {
                "id": "B",
                "text": "Increases the scalability of physical hardware"
            },
            {
                "id": "C",
                "text": "Automates the deployment and management of cloud infrastructure"
            },
            {
                "id": "D",
                "text": "Provides direct access to hardware resources"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q313",
        "text": "Which service model offers the highest level of control over the underlying cloud infrastructure?",
        "options": [
            {
                "id": "A",
                "text": "Software as a Service (SaaS)"
            },
            {
                "id": "B",
                "text": "Platform as a Service (PaaS)"
            },
            {
                "id": "C",
                "text": "Infrastructure as a Service (IaaS)"
            },
            {
                "id": "D",
                "text": "Function as a Service (FaaS)"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q314",
        "text": "What is the primary difference between public and private clouds?",
        "options": [
            {
                "id": "A",
                "text": "Public clouds are owned by multiple organizations, while private clouds are owned by individuals."
            },
            {
                "id": "B",
                "text": "Public clouds are less secure than private clouds."
            },
            {
                "id": "C",
                "text": "Public clouds are hosted by third-party providers, while private clouds are owned and operated by a single organization."
            },
            {
                "id": "D",
                "text": "Public clouds cannot scale as easily as private clouds."
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q315",
        "text": "Which of the following is a key benefit of using containerization in cloud infrastructure?",
        "options": [
            {
                "id": "A",
                "text": "Direct access to underlying hardware resources"
            },
            {
                "id": "B",
                "text": "Improved application isolation and portability across environments"
            },
            {
                "id": "C",
                "text": "Enhanced security at the physical network level"
            },
            {
                "id": "D",
                "text": "Complete removal of the need for virtualization"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q316",
        "text": "In cloud environments, what is “auto-scaling”?",
        "options": [
            {
                "id": "A",
                "text": "The manual process of adding or removing resources as required"
            },
            {
                "id": "B",
                "text": "Automatically adjusting resources to meet current demand"
            },
            {
                "id": "C",
                "text": "Predefining a fixed set of resources based on user demand"
            },
            {
                "id": "D",
                "text": "Using physical scaling of hardware resources in the data center"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q317",
        "text": "Which cloud service is most suitable for a company looking to run analytics on large datasets without\nmanaging infrastructure?",
        "options": [
            {
                "id": "A",
                "text": "Software as a Service (SaaS)"
            },
            {
                "id": "B",
                "text": "Infrastructure as a Service (IaaS)"
            },
            {
                "id": "C",
                "text": "Platform as a Service (PaaS)"
            },
            {
                "id": "D",
                "text": "Function as a Service (FaaS)"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q318",
        "text": "Which of the following best describes a \"cloud-native\" application?",
        "options": [
            {
                "id": "A",
                "text": "An application that runs exclusively on a virtual machine"
            },
            {
                "id": "B",
                "text": "An application designed to leverage the scalability and elasticity of cloud computing"
            },
            {
                "id": "C",
                "text": "An application that runs on both local and cloud infrastructure simultaneously"
            },
            {
                "id": "D",
                "text": "An application that relies entirely on SaaS offerings"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q319",
        "text": "Topic 1\nWhich of the following is a characteristic of the AWS account root user?",
        "options": [
            {
                "id": "A",
                "text": "The root user is the only user that can be configured with multi-factor authentication (MFA)."
            },
            {
                "id": "B",
                "text": "The root user is the only user that can access the AWS Management Console."
            },
            {
                "id": "C",
                "text": "The root user is the first sign-in identity that is available when an AWS account is created."
            },
            {
                "id": "D",
                "text": "The root user has a password that cannot be changed."
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q320",
        "text": "An Amazon EC2 instance previously used for development is inaccessible and no longer appears in\nthe AWS Management Console.\nWhich AWS service should be used to determine what action made this EC2 instance inaccessible?",
        "options": [
            {
                "id": "A",
                "text": "Amazon CloudWatch Logs"
            },
            {
                "id": "B",
                "text": "AWS Security Hub"
            },
            {
                "id": "C",
                "text": "Amazon Inspector"
            },
            {
                "id": "D",
                "text": "AWS CloudTraiI"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q321",
        "text": "A company's application developers need to quickly provision and manage AWS services by using scripts.\nWhich AWS offering should the developers use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS CLI"
            },
            {
                "id": "B",
                "text": "AWS CodeBuild"
            },
            {
                "id": "C",
                "text": "AWS Cloud Adoption Framework (AWS CAF)"
            },
            {
                "id": "D",
                "text": "AWS Systems Manager Session Manager"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q322",
        "text": "Topic 1\nA company wants to migrate unstructured data to AWS. The data needs to be securely moved with\ninflight encryption and end-to-end data validation.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Application Migration Service"
            },
            {
                "id": "B",
                "text": "Amazon Elastic File System (Amazon EFS)"
            },
            {
                "id": "C",
                "text": "AWS DataSync"
            },
            {
                "id": "D",
                "text": "AWS Migration Hub"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q323",
        "text": "A development team wants to deploy multiple test environments for an application in a fast,\nrepeatable manner.\nWhich AWS service should the team use?",
        "options": [
            {
                "id": "A",
                "text": "Amazon EC2"
            },
            {
                "id": "B",
                "text": "AWS CloudFormation"
            },
            {
                "id": "C",
                "text": "Amazon QuickSight"
            },
            {
                "id": "D",
                "text": "Amazon Elastic Container Service (Amazon ECS)"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q324",
        "text": "A company wants to quickly implement a continuous integration/continuous delivery (CI/CD) pipeline.\nWhich AWS service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Config"
            },
            {
                "id": "B",
                "text": "Amazon Cognito"
            },
            {
                "id": "C",
                "text": "AWS DataSync"
            },
            {
                "id": "D",
                "text": "AWS CodeStar"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q325",
        "text": "Which AWS Cloud deployment model uses AWS Outposts as part of the application deployment\ninfrastructure?",
        "options": [
            {
                "id": "A",
                "text": "On-premises"
            },
            {
                "id": "B",
                "text": "Serverless"
            },
            {
                "id": "C",
                "text": "Cloud-native"
            },
            {
                "id": "D",
                "text": "Hybrid"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q326",
        "text": "Which of the following is a fully managed graph database service on AWS?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Aurora"
            },
            {
                "id": "B",
                "text": "Amazon FSx"
            },
            {
                "id": "C",
                "text": "Amazon DynamoDB"
            },
            {
                "id": "D",
                "text": "Amazon Neptune"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q327",
        "text": "Topic 1\nWhich AWS service could an administrator use to provide desktop environments for several employees?",
        "options": [
            {
                "id": "A",
                "text": "AWS Organizations"
            },
            {
                "id": "B",
                "text": "AWS Fargate"
            },
            {
                "id": "C",
                "text": "AWS WAF"
            },
            {
                "id": "D",
                "text": "AWS WorkSpaces"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q328",
        "text": "Which AWS service or feature gives users the ability to capture information about network traffic in a\nVPC?",
        "options": [
            {
                "id": "A",
                "text": "VPC Flow Logs"
            },
            {
                "id": "B",
                "text": "Amazon Inspector"
            },
            {
                "id": "C",
                "text": "VPC route tables"
            },
            {
                "id": "D",
                "text": "AWS CloudTrail"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q329",
        "text": "Which type of AWS storage is ephemeral and is deleted when an Amazon EC2 instance is stopped or\nterminated?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Elastic Block Store (Amazon EBS)"
            },
            {
                "id": "B",
                "text": "Amazon EC2 instance store"
            },
            {
                "id": "C",
                "text": "Amazon Elastic File System (Amazon EFS)"
            },
            {
                "id": "D",
                "text": "Amazon S3"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q330",
        "text": "A company wants to provide access to Windows file shares in AWS from its on-premises workloads. The\ncompany does not want to provision any additional infrastructure or applications in its data center.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon FSx File Gateway"
            },
            {
                "id": "B",
                "text": "AWS DataSync"
            },
            {
                "id": "C",
                "text": "Amazon S3"
            },
            {
                "id": "D",
                "text": "AWS Snow Family"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q331",
        "text": "A company wants durable storage for static content and infinitely scalable data storage infrastructure\nat the lowest cost.\nWhich AWS service should the company choose?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Elastic Block Store (Amazon EBS)"
            },
            {
                "id": "B",
                "text": "Amazon S3"
            },
            {
                "id": "C",
                "text": "AWS Storage Gateway"
            },
            {
                "id": "D",
                "text": "Amazon Elastic File System (Amazon EFS)"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q332",
        "text": "An ecommerce company wants to use Amazon EC2 Auto Scaling to add and remove EC2 instances\nbased on CPU utilization.\nWhich AWS service or feature can initiate an Amazon EC2 Auto Scaling action to achieve this goal?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Simple Queue Service (Amazon SQS)"
            },
            {
                "id": "B",
                "text": "Amazon Simple Notification Service (Amazon SNS)"
            },
            {
                "id": "C",
                "text": "AWS Systems Manager"
            },
            {
                "id": "D",
                "text": "Amazon CloudWatch alarm"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q333",
        "text": "Topic 1\nA company wants to transform its workforce by attracting and developing a digitally fluent highperformance workforce. The company wants to attract a diverse and inclusive workforce with\nappropriate mix of technical and non-technical skills.\nWhich AWS Cloud Adoption Framework (AWS CAF) perspective will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Business"
            },
            {
                "id": "B",
                "text": "People"
            },
            {
                "id": "C",
                "text": "Platform"
            },
            {
                "id": "D",
                "text": "Operations"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q334",
        "text": "A company wants to move its on-premises databases to managed cloud database services by using a\nsimplified migration process.\nWhich AWS service or tool can help the company meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Storage Gateway"
            },
            {
                "id": "B",
                "text": "AWS Application Migration Service"
            },
            {
                "id": "C",
                "text": "AWS DataSync"
            },
            {
                "id": "D",
                "text": "AWS Database Migration Service (AWS DMS)"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q335",
        "text": "A company needs a fully managed file server that natively supports Microsoft workloads and file\nsystems. The file server must also support the SMB protocol.\nWhich AWS service should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Elastic File System (Amazon EFS)"
            },
            {
                "id": "B",
                "text": "Amazon FSx for Lustre"
            },
            {
                "id": "C",
                "text": "Amazon FSx for Windows File Server"
            },
            {
                "id": "D",
                "text": "Amazon Elastic Block Store (Amazon EBS)"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q336",
        "text": "A company has been storing monthly reports in an Amazon S3 bucket. The company exports the report\ndata into comma-separated values (.csv) files. A developer wants to write a simple query that can read\nall of these files and generate a summary report.\nWhich AWS service or feature should the developer use to meet these requirements with the LEAST\namount of operational overhead?",
        "options": [
            {
                "id": "A",
                "text": "Amazon S3 Select"
            },
            {
                "id": "B",
                "text": "Amazon Athena"
            },
            {
                "id": "C",
                "text": "Amazon Redshift"
            },
            {
                "id": "D",
                "text": "Amazon EC2"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q337",
        "text": "Which AWS feature provides a no-cost platform for AWS users to join community groups, ask questions,\nfind answers, and read community-generated articles about best practices? A. AWS Knowledge Center",
        "options": [
            {
                "id": "B",
                "text": "AWS re:Post"
            },
            {
                "id": "C",
                "text": "AWS IQ"
            },
            {
                "id": "D",
                "text": "AWS Enterprise Support"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q338",
        "text": "A company needs to search for text in documents that are stored in Amazon S3.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Kendra"
            },
            {
                "id": "B",
                "text": "Amazon Rekognition"
            },
            {
                "id": "C",
                "text": "Amazon Polly"
            },
            {
                "id": "D",
                "text": "Amazon Lex"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q339",
        "text": "Which AWS services make use of global edge locations? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "AWS Fargate"
            },
            {
                "id": "B",
                "text": "Amazon CloudFront C. AWS Global Accelerator"
            },
            {
                "id": "D",
                "text": "AWS Wavelength"
            },
            {
                "id": "E",
                "text": "Amazon VPC"
            }
        ],
        "answer": "BC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q340",
        "text": "A user needs a relational database but does not have the resources to manage the hardware,\nresiliency, and replication.\nWhich AWS service option meets the user's requirements?",
        "options": [
            {
                "id": "A",
                "text": "Run MySQL on Amazon Elastic Container Service (Amazon ECS)."
            },
            {
                "id": "B",
                "text": "Run MySQL on Amazon EC2."
            },
            {
                "id": "C",
                "text": "Choose Amazon RDS for MySQL."
            },
            {
                "id": "D",
                "text": "Choose Amazon ElastiCache for Redis."
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q341",
        "text": "A company needs to deploy applications in the AWS Cloud as quickly as possible. The company also\nneeds to minimize the complexity that is related to the management of AWS resources.\nWhich AWS service should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Config"
            },
            {
                "id": "B",
                "text": "AWS Elastic Beanstalk"
            },
            {
                "id": "C",
                "text": "Amazon EC2"
            },
            {
                "id": "D",
                "text": "Amazon Personalize"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q342",
        "text": "Which mechanism allows developers to access AWS services from application code?",
        "options": [
            {
                "id": "A",
                "text": "AWS Software Development Kit"
            },
            {
                "id": "B",
                "text": "AWS Management Console"
            },
            {
                "id": "C",
                "text": "AWS CodePipeline"
            },
            {
                "id": "D",
                "text": "AWS Config"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q343",
        "text": "A company is migrating to the AWS Cloud. The company wants to understand and identify potential\nsecurity misconfigurations or unexpected behaviours. The company wants to prioritize any protective\ncontrols it might need.\nWhich AWS Cloud Adoption Framework (AWS CAF) security perspective capability will meet these\nrequirements?",
        "options": [
            {
                "id": "A",
                "text": "Identity and access management"
            },
            {
                "id": "B",
                "text": "Threat detection"
            },
            {
                "id": "C",
                "text": "Platform engineering"
            },
            {
                "id": "D",
                "text": "Availability and continuity management"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q344",
        "text": "A company wants to establish a private network connection between AWS and its corporate network.\nWhich AWS service or feature will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Connect"
            },
            {
                "id": "B",
                "text": "Amazon Route 53"
            },
            {
                "id": "C",
                "text": "AWS Direct Connect"
            },
            {
                "id": "D",
                "text": "VPC peering"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q345",
        "text": "Which AWS services or features give users the ability to create a network connection between two VPCs?\n(Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "VPC endpoints"
            },
            {
                "id": "B",
                "text": "Amazon Route 53"
            },
            {
                "id": "C",
                "text": "VPC peering"
            },
            {
                "id": "D",
                "text": "AWS Direct Connect"
            },
            {
                "id": "E",
                "text": "AWS Transit Gateway"
            }
        ],
        "answer": "CE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q346",
        "text": "Which AWS service converts text to lifelike voices?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Transcribe"
            },
            {
                "id": "B",
                "text": "Amazon Rekognition"
            },
            {
                "id": "C",
                "text": "Amazon Polly"
            },
            {
                "id": "D",
                "text": "Amazon Extract"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q347",
        "text": "A company wants to use application stacks to run a workload in the AWS Cloud. The company wants to\nuse pre-configured instances.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon LightSail"
            },
            {
                "id": "B",
                "text": "Amazon Athena"
            },
            {
                "id": "C",
                "text": "AWS Outposts"
            },
            {
                "id": "D",
                "text": "Amazon EC2"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q348",
        "text": "Which AWS services are supported by Savings Plans? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Amazon EC2"
            },
            {
                "id": "B",
                "text": "Amazon RDS"
            },
            {
                "id": "C",
                "text": "Amazon Sage Maker"
            },
            {
                "id": "D",
                "text": "Amazon Redshift"
            },
            {
                "id": "E",
                "text": "Amazon DynamoDB"
            }
        ],
        "answer": "AC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q349",
        "text": "Which AWS service or tool can provide rightsizing recommendations for Amazon EC2 resources at no\nadditional cost?",
        "options": [
            {
                "id": "A",
                "text": "AWS Well-Architected Tool"
            },
            {
                "id": "B",
                "text": "Amazon CloudWatch"
            },
            {
                "id": "C",
                "text": "AWS Cost Explorer"
            },
            {
                "id": "D",
                "text": "Amazon S3 analytics"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q350",
        "text": "A company operates a petabyte-scale data warehouse to analyze its data. The company wants a solution\nthat will not require manual hardware and software management.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon DocumentDB (with MongoDB compatibility)"
            },
            {
                "id": "B",
                "text": "Amazon Redshift"
            },
            {
                "id": "C",
                "text": "Amazon Neptune"
            },
            {
                "id": "D",
                "text": "Amazon ElastiCache"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q351",
        "text": "A library wants to automate the classification of electronic books based on the contents of the books.\nWhich AWS service should the library use to meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Redshift"
            },
            {
                "id": "B",
                "text": "Amazon CloudSearch"
            },
            {
                "id": "C",
                "text": "Amazon Comprehend"
            },
            {
                "id": "D",
                "text": "Amazon Aurora"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q352",
        "text": "Which task is a responsibility of AWS, according to the AWS shared responsibility model?",
        "options": [
            {
                "id": "A",
                "text": "Encryption of application data"
            },
            {
                "id": "B",
                "text": "Authentication of application users"
            },
            {
                "id": "C",
                "text": "Protection of physical network infrastructure"
            },
            {
                "id": "D",
                "text": "Configuration of firewalls"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q353",
        "text": "Which options are AWS Cloud Adoption Framework (AWS CAF) cloud transformation journey\nrecommendations? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Envision phase"
            },
            {
                "id": "B",
                "text": "Align phase"
            },
            {
                "id": "C",
                "text": "Assess phase"
            },
            {
                "id": "D",
                "text": "Mobilize phase"
            },
            {
                "id": "E",
                "text": "Migrate and modernize phase"
            }
        ],
        "answer": "AB",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q354",
        "text": "A company wants to generate a list of IAM users. The company also wants to view the status of various\ncredentials that are associated with the users, such as password, access keys, and multi-factor\nauthentication (MFA) devices.\nWhich AWS service or feature will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "IAM credential report"
            },
            {
                "id": "B",
                "text": "AWS IAM Identity Center (AWS Single Sign-On)"
            },
            {
                "id": "C",
                "text": "AWS Identity and Access Management Access Analyzer"
            },
            {
                "id": "D",
                "text": "AWS Cost and Usage Report"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q355",
        "text": "A company is designing its AWS workloads so that components can be updated regularly and so that\nchanges can be made in small, reversible increments.\nWhich pillar of the AWS Well-Architected Framework does this design support?",
        "options": [
            {
                "id": "A",
                "text": "Security"
            },
            {
                "id": "B",
                "text": "Performance efficiency"
            },
            {
                "id": "C",
                "text": "Operational excellence"
            },
            {
                "id": "D",
                "text": "Reliability"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q356",
        "text": "A company wants to track tags, buckets, and prefixes for its Amazon S3 objects.\nWhich S3 feature will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "S3 Inventory report"
            },
            {
                "id": "B",
                "text": "S3 Lifecycle"
            },
            {
                "id": "C",
                "text": "S3 Versioning"
            },
            {
                "id": "D",
                "text": "S3 ACLs"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q357",
        "text": "A company wants to allow users to authenticate and authorize multiple AWS accounts by using a single\nset of credentials.\nWhich AWS service or resource will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Organizations"
            },
            {
                "id": "B",
                "text": "IAM user"
            },
            {
                "id": "C",
                "text": "AWS IAM Identity Center (AWS Single Sign-On)"
            },
            {
                "id": "D",
                "text": "AWS Control Tower"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q358",
        "text": "A company created an Amazon EC2 instance. The company wants to control the incoming and outgoing\nnetwork traffic at the instance level.\nWhich AWS resource or service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Shield"
            },
            {
                "id": "B",
                "text": "Security groups"
            },
            {
                "id": "C",
                "text": "Network Access Analyzer"
            },
            {
                "id": "D",
                "text": "VPC endpoints"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q359",
        "text": "A company wants to use the AWS Cloud to deploy an application globally.\nWhich architecture deployment model should the company use to meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "Multi-Region"
            },
            {
                "id": "B",
                "text": "Single-Region"
            },
            {
                "id": "C",
                "text": "Multi-AZ"
            },
            {
                "id": "D",
                "text": "Single-AZ"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q360",
        "text": "A company wants a web application to interact with various AWS services.\nWhich AWS service or resource will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS CloudShell"
            },
            {
                "id": "B",
                "text": "AWS Marketplace"
            },
            {
                "id": "C",
                "text": "AWS Management Console"
            },
            {
                "id": "D",
                "text": "AWS CLI"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q361",
        "text": "A company is migrating its applications from on-premises to the AWS Cloud. The company wants to\nensure that the applications are assigned only the minimum permissions that are needed to perform\nall operations.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Identity and Access Management (IAM)"
            },
            {
                "id": "B",
                "text": "Amazon CloudWatch"
            },
            {
                "id": "C",
                "text": "Amazon Macie"
            },
            {
                "id": "D",
                "text": "Amazon GuardDuty"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q362",
        "text": "Which options are AWS Cloud Adoption Framework (AWS CAF) governance perspective capabilities?\n(Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Identity and access management"
            },
            {
                "id": "B",
                "text": "Cloud financial management"
            },
            {
                "id": "C",
                "text": "Application portfolio management"
            },
            {
                "id": "E",
                "text": "Product management"
            }
        ],
        "answer": "BC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q363",
        "text": "Topic 1\nWhich AWS service provides a single location to track the progress of application migrations?",
        "options": [
            {
                "id": "A",
                "text": "AWS Application Discovery Service"
            },
            {
                "id": "B",
                "text": "AWS Application Migration Service"
            },
            {
                "id": "C",
                "text": "AWS Service Catalog"
            },
            {
                "id": "D",
                "text": "AWS Migration Hub"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q364",
        "text": "A company launched an Amazon EC2 instance with the latest Amazon Linux 2 Amazon Machine Image\n(AMI).\nWhich actions can a system administrator take to connect to the EC2 instance? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Use Amazon EC2 Instance Connect."
            },
            {
                "id": "B",
                "text": "Use a Remote Desktop Protocol (RDP) connection."
            },
            {
                "id": "C",
                "text": "Use AWS Batch."
            },
            {
                "id": "D",
                "text": "Use AWS Systems Manager Session Manager."
            },
            {
                "id": "E",
                "text": "Use Amazon Connect."
            }
        ],
        "answer": "AD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q365",
        "text": "Which architecture concept describes the ability to deploy resources on demand and release resources\nwhen they are no longer needed?",
        "options": [
            {
                "id": "A",
                "text": "High availability"
            },
            {
                "id": "B",
                "text": "Decoupled architecture"
            },
            {
                "id": "C",
                "text": "Resilience"
            },
            {
                "id": "D",
                "text": "Elasticity"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q366",
        "text": "Which task requires a user to sign in as the AWS account root user?",
        "options": [
            {
                "id": "A",
                "text": "The deletion of IAM users"
            },
            {
                "id": "B",
                "text": "The deletion of an AWS account"
            },
            {
                "id": "C",
                "text": "The creation of an organization in AWS Organizations"
            },
            {
                "id": "D",
                "text": "The deletion of Amazon EC2 instances"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q367",
        "text": "What does the Amazon S3 Intelligent-Tiering storage class offer?",
        "options": [
            {
                "id": "A",
                "text": "Payment flexibility by reserving storage capacity"
            },
            {
                "id": "B",
                "text": "Long-term retention of data by copying the data to an encrypted Amazon Elastic Block Store (Amazon EBS) volume"
            },
            {
                "id": "C",
                "text": "Automatic cost savings by moving objects between tiers based on access pattern changes"
            },
            {
                "id": "D",
                "text": "Secure, durable, and lowest cost storage for data archival"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q368",
        "text": "A company needs Amazon EC2 instances for a workload that can tolerate interruptions.\nWhich EC2 instance purchasing option meets this requirement with the LARGEST discount compared to\nOn-Demand prices?",
        "options": [
            {
                "id": "A",
                "text": "Spot Instances"
            },
            {
                "id": "B",
                "text": "Convertible Reserved Instances"
            },
            {
                "id": "C",
                "text": "Standard Reserved Instances"
            },
            {
                "id": "D",
                "text": "Dedicated Hosts"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q369",
        "text": "A company is planning to migrate to the AWS Cloud. The company wants to identify measurable business\noutcomes that will explain the value of the company's decision to migrate.\nWhich phase of the cloud transformation journey includes these activities?",
        "options": [
            {
                "id": "A",
                "text": "Envision"
            },
            {
                "id": "B",
                "text": "Align"
            },
            {
                "id": "C",
                "text": "Scale"
            },
            {
                "id": "D",
                "text": "Launch"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q370",
        "text": "Which AWS service or component allows inbound traffic from the internet to access a VPC?",
        "options": [
            {
                "id": "A",
                "text": "Internet gateway"
            },
            {
                "id": "B",
                "text": "NAT gateway"
            },
            {
                "id": "C",
                "text": "AWS WAF"
            },
            {
                "id": "D",
                "text": "VPC peering"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q371",
        "text": "Which AWS service can companies use to create infrastructure from code?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Elastic Kubernetes Service (Amazon EKS)"
            },
            {
                "id": "B",
                "text": "AWS Outposts"
            },
            {
                "id": "C",
                "text": "AWS CodePipeline"
            },
            {
                "id": "D",
                "text": "AWS CloudFormation"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q372",
        "text": "Which guideline is a well-architected design principle for building cloud applications?",
        "options": [
            {
                "id": "A",
                "text": "Keep static data closer to compute resources."
            },
            {
                "id": "B",
                "text": "Provision resources for peak capacity."
            },
            {
                "id": "C",
                "text": "Design for automated recovery from failure."
            },
            {
                "id": "D",
                "text": "Use tightly coupled components."
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q373",
        "text": "A company needs to move 75 petabytes of data from its on-premises data centers to AWS.\nWhich AWS service should the company use to meet these requirements MOST cost-effectively?",
        "options": [
            {
                "id": "A",
                "text": "AWS Snowball Edge Storage Optimized"
            },
            {
                "id": "B",
                "text": "AWS Snowmobile"
            },
            {
                "id": "C",
                "text": "AWS Direct Connect"
            },
            {
                "id": "D",
                "text": "AWS Storage Gateway"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q374",
        "text": "Which of the following are pillars of the AWS Well-Architected Framework? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Resource scalability"
            },
            {
                "id": "B",
                "text": "Performance efficiency"
            },
            {
                "id": "C",
                "text": "System elasticity"
            },
            {
                "id": "D",
                "text": "Agile development"
            },
            {
                "id": "E",
                "text": "Operational excellence"
            }
        ],
        "answer": "BE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q375",
        "text": "Topic 1\nA company needs to connect its on-premises data center to the AWS Cloud. The company needs a\ndedicated, low-latency connection with consistent network performance.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Global Accelerator"
            },
            {
                "id": "B",
                "text": "Amazon CloudFront"
            },
            {
                "id": "C",
                "text": "AWS Direct Connect"
            },
            {
                "id": "D",
                "text": "AWS Managed VPN"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q376",
        "text": "Which design principles should a company apply to AWS Cloud workloads to maximize sustainability and\nminimize environmental impact? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Maximize utilization of Amazon EC2 instances."
            },
            {
                "id": "B",
                "text": "Minimize utilization of Amazon EC2 instances."
            },
            {
                "id": "C",
                "text": "Minimize usage of managed services."
            },
            {
                "id": "D",
                "text": "Force frequent application reinstallations by users."
            },
            {
                "id": "E",
                "text": "Reduce the need for users to reinstall applications."
            }
        ],
        "answer": "AE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q377",
        "text": "In which ways does the AWS Cloud offer lower total cost of ownership (TCO) of computing resources\nthan on-premises data centers? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "AWS replaces upfront capital expenditures with pay-as-you-go costs."
            },
            {
                "id": "B",
                "text": "AWS is designed for high availability, which eliminates user downtime."
            },
            {
                "id": "C",
                "text": "AWS eliminates the need for on-premises IT staff."
            },
            {
                "id": "D",
                "text": "AWS uses economies of scale to continually reduce prices."
            },
            {
                "id": "E",
                "text": "AWS offers a single pricing model for Amazon EC2 instances."
            }
        ],
        "answer": "AD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q378",
        "text": "A company wants to deploy some of its resources in the AWS Cloud. To meet regulatory\nrequirements, the data must remain local and on premises. There must be low latency between AWS\nand the company resources.\nWhich AWS service or feature can be used to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Local Zones"
            },
            {
                "id": "B",
                "text": "Availability Zones"
            },
            {
                "id": "C",
                "text": "AWS Outposts"
            },
            {
                "id": "D",
                "text": "AWS Wavelength Zones"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q379",
        "text": "Which of the following AWS services are serverless? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "AWS Outposts"
            },
            {
                "id": "B",
                "text": "Amazon EC2"
            },
            {
                "id": "C",
                "text": "Amazon Elastic Kubernetes Service (Amazon EKS)"
            },
            {
                "id": "D",
                "text": "AWS Fargate"
            },
            {
                "id": "E",
                "text": "AWS Lambda"
            }
        ],
        "answer": "DE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q380",
        "text": "When a user wants to utilize their existing per-socket, per-core, or per-virtual machine software licenses\nfor a Microsoft Windows server running on AWS, which Amazon EC2 instance type is required?",
        "options": [
            {
                "id": "A",
                "text": "Spot Instances"
            },
            {
                "id": "B",
                "text": "Dedicated Instances"
            },
            {
                "id": "C",
                "text": "Dedicated Hosts"
            },
            {
                "id": "D",
                "text": "Reserved Instances"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q381",
        "text": "A solutions architect needs to maintain a fleet of Amazon EC2 instances so that any impaired instances\nare replaced with new ones.\nWhich AWS service should the solutions architect use?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Elastic Container Service (Amazon ECS)"
            },
            {
                "id": "B",
                "text": "Amazon GuardDuty"
            },
            {
                "id": "C",
                "text": "AWS Shield"
            },
            {
                "id": "D",
                "text": "AWS Auto Scaling"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q382",
        "text": "Topic 1\nWhich AWS service provides on-premises applications with low-latency access to data that is stored in\nthe AWS Cloud?",
        "options": [
            {
                "id": "A",
                "text": "Amazon CloudFront"
            },
            {
                "id": "B",
                "text": "AWS Storage Gateway"
            },
            {
                "id": "C",
                "text": "AWS Backup"
            },
            {
                "id": "D",
                "text": "AWS DataSync"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q383",
        "text": "What does Amazon CloudFront provide?",
        "options": [
            {
                "id": "A",
                "text": "Automatic scaling for all resources to power an application from a single unified interface"
            },
            {
                "id": "B",
                "text": "Secure delivery of data, videos, applications, and APIs to users globally with low latency"
            },
            {
                "id": "C",
                "text": "Ability to directly manage traffic globally through a variety of routing types, including latency-based routing, geo DNS, geoproximity, and weighted round robin"
            },
            {
                "id": "D",
                "text": "Automatic distribution of incoming application traffic across multiple targets, such as Amazon EC2 instances, containers, IP addresses, and AWS Lambda functions"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q384",
        "text": "Which AWS service supports the deployment and management of applications in the AWS Cloud?",
        "options": [
            {
                "id": "A",
                "text": "Amazon CodeGuru"
            },
            {
                "id": "B",
                "text": "AWS Fargate"
            },
            {
                "id": "C",
                "text": "AWS CodeCommit"
            },
            {
                "id": "D",
                "text": "AWS Elastic Beanstalk"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q385",
        "text": "A company wants to integrate natural language processing (NLP) into business intelligence (BI)\ndashboards. The company wants to ask questions and receive answers with relevant visualizations.\nWhich AWS service or tool will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Macie"
            },
            {
                "id": "B",
                "text": "Amazon Rekognition"
            },
            {
                "id": "C",
                "text": "Amazon QuickSight"
            },
            {
                "id": "D",
                "text": "Amazon Lex"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q386",
        "text": "Which Amazon S3 feature or storage class uses the AWS backbone network and edge locations to reduce\nlatencies from the end user to Amazon S3?",
        "options": [
            {
                "id": "A",
                "text": "S3 Cross-Region Replication"
            },
            {
                "id": "B",
                "text": "S3 Transfer Acceleration"
            },
            {
                "id": "C",
                "text": "S3 Event Notifications"
            },
            {
                "id": "D",
                "text": "S3 Standard-Infrequent Access (S3 Standard-IA)"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q387",
        "text": "Which AWS service provides the ability to host a NoSQL database in the AWS Cloud?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Aurora"
            },
            {
                "id": "B",
                "text": "Amazon DynamoDB"
            },
            {
                "id": "C",
                "text": "Amazon RDS"
            },
            {
                "id": "D",
                "text": "Amazon Redshift"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q388",
        "text": "Which AWS service is a relational database compatible with MySQL and PostgreSQL?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Redshift"
            },
            {
                "id": "B",
                "text": "Amazon DynamoDB"
            },
            {
                "id": "C",
                "text": "Amazon Aurora"
            },
            {
                "id": "D",
                "text": "Amazon Neptune"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q389",
        "text": "Which architecture design principle describes the need to isolate failures between dependent\ncomponents in the AWS Cloud?",
        "options": [
            {
                "id": "A",
                "text": "Use a monolithic design."
            },
            {
                "id": "B",
                "text": "Design for automation."
            },
            {
                "id": "C",
                "text": "Design for single points of failure."
            },
            {
                "id": "D",
                "text": "Loosely couple components."
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q390",
        "text": "Which benefit of cloud computing gives a company the ability to deploy applications to users all over the\nworld through a network of AWS Regions, Availability Zones, and edge locations?",
        "options": [
            {
                "id": "A",
                "text": "Economy of scale"
            },
            {
                "id": "B",
                "text": "Global reach"
            },
            {
                "id": "C",
                "text": "Agility"
            },
            {
                "id": "D",
                "text": "High availability"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q391",
        "text": "Which AWS service makes it easier to monitor and troubleshoot application logs and cloud resources?",
        "options": [
            {
                "id": "A",
                "text": "Amazon EC2"
            },
            {
                "id": "B",
                "text": "AWS Identity and Access Management (IAM)"
            },
            {
                "id": "C",
                "text": "Amazon CloudWatch"
            },
            {
                "id": "D",
                "text": "AWS CloudTrail"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q392",
        "text": "Which AWS service uses AWS Compute Optimizer to provide sizing recommendations based on workload\nmetrics?",
        "options": [
            {
                "id": "A",
                "text": "Amazon EC2"
            },
            {
                "id": "B",
                "text": "Amazon RDS"
            },
            {
                "id": "C",
                "text": "Amazon Lightsail"
            },
            {
                "id": "D",
                "text": "AWS Step Functions"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q393",
        "text": "Which AWS service will help a company plan a migration to AWS by collecting the configuration, usage,\nand behavior data of on-premises data centers?",
        "options": [
            {
                "id": "A",
                "text": "AWS Resource Groups"
            },
            {
                "id": "B",
                "text": "AWS Application Discovery Service"
            },
            {
                "id": "C",
                "text": "AWS Service Catalog"
            },
            {
                "id": "D",
                "text": "AWS Systems Manager"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q394",
        "text": "Which AWS service uses a combination of publishers and subscribers?",
        "options": [
            {
                "id": "A",
                "text": "AWS Lambda"
            },
            {
                "id": "B",
                "text": "Amazon Simple Notification Service (Amazon SNS)"
            },
            {
                "id": "C",
                "text": "Amazon CloudWatch"
            },
            {
                "id": "D",
                "text": "AWS CloudFormation"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q395",
        "text": "A company is in the early stages of planning a migration to AWS. The company wants to obtain the\nmonthly predicted total AWS cost of ownership for future Amazon EC2 instances and associated storage.\nWhich AWS service or tool should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Pricing Calculator"
            },
            {
                "id": "B",
                "text": "AWS Compute Optimizer"
            },
            {
                "id": "C",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "D",
                "text": "AWS Application Migration Service"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q396",
        "text": "Which AWS service or tool will monitor AWS resources and applications in real time?",
        "options": [
            {
                "id": "A",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "B",
                "text": "Amazon CloudWatch"
            },
            {
                "id": "C",
                "text": "AWS CloudTrail"
            },
            {
                "id": "D",
                "text": "AWS Cost Explorer"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q397",
        "text": "Which AWS Cloud Adoption Framework (AWS CAF) capability belongs to the business perspective?",
        "options": [
            {
                "id": "A",
                "text": "Program and project management"
            },
            {
                "id": "B",
                "text": "Data science"
            },
            {
                "id": "C",
                "text": "Observability"
            },
            {
                "id": "D",
                "text": "Change and release management"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q398",
        "text": "Which AWS resource can help a company reduce its costs in exchange for a usage commitment when\nusing Amazon EC2 instances?",
        "options": [
            {
                "id": "A",
                "text": "Compute Savings Plans"
            },
            {
                "id": "B",
                "text": "Auto Scaling group"
            },
            {
                "id": "C",
                "text": "On-Demand Instance"
            },
            {
                "id": "D",
                "text": "EC2 instance store"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q399",
        "text": "Which perspective in the AWS Cloud Adoption Framework (AWS CAF) includes a capability for welldesigned data and analytics architecture?",
        "options": [
            {
                "id": "A",
                "text": "Security"
            },
            {
                "id": "B",
                "text": "Governance"
            },
            {
                "id": "C",
                "text": "Operations"
            },
            {
                "id": "D",
                "text": "Platform"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q400",
        "text": "Which options are AWS Cloud Adoption Framework (AWS CAF) people perspective capabilities? (Choose\ntwo.)",
        "options": [
            {
                "id": "A",
                "text": "Organizational alignment"
            },
            {
                "id": "B",
                "text": "Portfolio management"
            },
            {
                "id": "C",
                "text": "Organization design"
            },
            {
                "id": "D",
                "text": "Risk management"
            },
            {
                "id": "E",
                "text": "Modern application development"
            }
        ],
        "answer": "AC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q401",
        "text": "A company needs a bridge between technology and business to help evolve to a culture Of\ncontinuous growth and learning.\nWhich perspective in the AWS Cloud Adoption Framework (AWS CAF) serves as this bridge?",
        "options": [
            {
                "id": "A",
                "text": "People"
            },
            {
                "id": "B",
                "text": "Governance"
            },
            {
                "id": "C",
                "text": "Operations"
            },
            {
                "id": "D",
                "text": "Security"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q402",
        "text": "Which option is a responsibility of AWS under the AWS shared responsibility model?",
        "options": [
            {
                "id": "A",
                "text": "Application data security"
            },
            {
                "id": "B",
                "text": "Patch management for applications that run on Amazon EC2 instances"
            },
            {
                "id": "C",
                "text": "Patch management of the underlying infrastructure for managed services"
            },
            {
                "id": "D",
                "text": "Application identity and access management"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q403",
        "text": "Topic 1\nWhich AWS service or resource can identify and provide reports on IAM resources in one AWS account\nthat is shared with another AWS account?",
        "options": [
            {
                "id": "A",
                "text": "IAM credential report"
            },
            {
                "id": "B",
                "text": "AWS IAM Identity Center (AWS Single Sign-On)"
            },
            {
                "id": "C",
                "text": "AWS Identity and Access Management Access Analyzer"
            },
            {
                "id": "D",
                "text": "Amazon Cognito user pool"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q404",
        "text": "Which AWS Well-Architected Framework pillar focuses on structured and streamlined allocation of\ncomputing resources?",
        "options": [
            {
                "id": "A",
                "text": "Reliability"
            },
            {
                "id": "B",
                "text": "Operational excellence"
            },
            {
                "id": "C",
                "text": "Performance efficiency"
            },
            {
                "id": "D",
                "text": "Sustainability"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q405",
        "text": "Topic 1\nWhich AWS Cloud Adoption Framework (AWS CAF) capabilities belong to the governance perspective?\n(Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Program and project management"
            },
            {
                "id": "B",
                "text": "Product management"
            },
            {
                "id": "C",
                "text": "Portfolio management"
            },
            {
                "id": "D",
                "text": "Risk management"
            },
            {
                "id": "E",
                "text": "Event management"
            }
        ],
        "answer": "AD",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q406",
        "text": "A company wants to use AWS Managed Services (AMS) for operational support and wants to\nunderstand the scope of AMS.\nWhich AMS feature will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Landing zone and network management"
            },
            {
                "id": "B",
                "text": "Customer application development"
            },
            {
                "id": "C",
                "text": "DevSecOps pipeline configuration"
            },
            {
                "id": "D",
                "text": "Application log monitoring"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q407",
        "text": "A company wants to migrate its on-premises NoSQL workload to Amazon DynamoDB.\nWhich AWS service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Migration Hub"
            },
            {
                "id": "B",
                "text": "AWS Database Migration Service (AWS DMS)"
            },
            {
                "id": "C",
                "text": "Migration Evaluator"
            },
            {
                "id": "D",
                "text": "AWS Application Migration Service"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q408",
        "text": "A company is in the process of finding correct Amazon EC2 instance types and sizes to meet its\nperformance and capacity requirements. The company wants to find the lowest possible cost.\nWhich option accurately characterizes the company's actions?",
        "options": [
            {
                "id": "A",
                "text": "Auto Scaling"
            },
            {
                "id": "B",
                "text": "Storage tiering"
            },
            {
                "id": "C",
                "text": "Rightsizing"
            },
            {
                "id": "D",
                "text": "Instance scheduling"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q409",
        "text": "A company wants to manage sign-in security for workforce users. The company needs to create\nworkforce users and centrally manage their access across all the company's AWS accounts and\napplications.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Audit Manager"
            },
            {
                "id": "B",
                "text": "Amazon Cognito"
            },
            {
                "id": "C",
                "text": "AWS Security Hub"
            },
            {
                "id": "D",
                "text": "AWS IAM Identity Center (AWS Single Sign-On)"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q410",
        "text": "A company wants a report that lists the status of multi-factor authentication (MFA) devices that all\nusers in the company's AWS account use.\nWhich AWS feature or service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Cost and Usage Reports"
            },
            {
                "id": "B",
                "text": "IAM credential reports"
            },
            {
                "id": "C",
                "text": "Detailed Billing Reports - D AWS Cost Explorer reports"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q411",
        "text": "A company wants to use machine learning capabilities to analyze log data from its Amazon EC2\ninstances and efficiently conduct security investigations.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Inspector"
            },
            {
                "id": "B",
                "text": "Amazon QuickSight"
            },
            {
                "id": "C",
                "text": "Amazon Detective - D Amazon GuardDuty"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q412",
        "text": "A company is launching a mobile app in the AWS Cloud. The company wants the app's users to sign in\nthrough social media identity providers (IdPs).\nWhich AWS service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Lambda"
            },
            {
                "id": "B",
                "text": "Amazon Cognito"
            },
            {
                "id": "C",
                "text": "AWS Secrets Manager"
            },
            {
                "id": "D",
                "text": "Amazon CloudFront"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q413",
        "text": "Which complimentary AWS service or tool creates data-driven business cases for cloud planning?",
        "options": [
            {
                "id": "A",
                "text": "Migration Evaluator"
            },
            {
                "id": "B",
                "text": "AWS Billing Conductor"
            },
            {
                "id": "C",
                "text": "AWS Billing Console"
            },
            {
                "id": "D",
                "text": "Amazon Forecast"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q414",
        "text": "Which cloud concept is demonstrated by using AWS Cost Explorer?",
        "options": [
            {
                "id": "A",
                "text": "Rightsizing"
            },
            {
                "id": "B",
                "text": "Reliability"
            },
            {
                "id": "C",
                "text": "Resilience"
            },
            {
                "id": "D",
                "text": "Modernization"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q415",
        "text": "A company wants to deploy a non-containerized Java-based web application on AWS. The company\nwants to use a managed service to quickly deploy the application. The company wants the service to\nautomatically provision capacity, load balance, scale, and monitor application health.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Elastic Container Service (Amazon ECS)"
            },
            {
                "id": "B",
                "text": "AWS Lambda"
            },
            {
                "id": "C",
                "text": "Amazon Elastic Kubernetes Service (Amazon EKS)"
            },
            {
                "id": "D",
                "text": "AWS Elastic Beanstalk"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q416",
        "text": "Which AWS service or tool gives users the ability to connect with AWS and deploy resources\nprogrammatically?",
        "options": [
            {
                "id": "A",
                "text": "Amazon QuickSight"
            },
            {
                "id": "B",
                "text": "AWS PrivateLink"
            },
            {
                "id": "C",
                "text": "AWS Direct Connect"
            },
            {
                "id": "D",
                "text": "AWS SDKs"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q417",
        "text": "A company has deployed a web application to Amazon EC2 instances. The EC2 instances have low usage.\nWhich AWS service or feature should the company use to right size the EC2 instances?",
        "options": [
            {
                "id": "A",
                "text": "AWS Config"
            },
            {
                "id": "B",
                "text": "AWS Cost Anomaly Detection"
            },
            {
                "id": "C",
                "text": "AWS Budgets"
            },
            {
                "id": "D",
                "text": "AWS Compute Optimizer"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q418",
        "text": "A company wants to define a central data protection policy that works across AWS services for\ncompute, storage, and database resources.\nWhich AWS service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Batch"
            },
            {
                "id": "B",
                "text": "AWS Elastic Disaster Recovery"
            },
            {
                "id": "C",
                "text": "AWS Backup"
            },
            {
                "id": "D",
                "text": "Amazon FSx"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q419",
        "text": "A company needs to categorize and track AWS usage cost based on business categories.\nWhich AWS service or feature should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Cost allocation tags"
            },
            {
                "id": "B",
                "text": "AWS Organizations"
            },
            {
                "id": "C",
                "text": "AWS Security Hub"
            },
            {
                "id": "D",
                "text": "AWS Cost and Usage Report"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q420",
        "text": "Which AWS service can migrate data between AWS storage services?",
        "options": [
            {
                "id": "A",
                "text": "AWS DataSync"
            },
            {
                "id": "B",
                "text": "AWS Direct Connect"
            },
            {
                "id": "C",
                "text": "AWS Lake Formation"
            },
            {
                "id": "D",
                "text": "Amazon S3"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q421",
        "text": "Which statements represent the cost-effectiveness of the AWS Cloud? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Users can trade fixed expenses for variable expenses."
            },
            {
                "id": "B",
                "text": "Users can deploy all over the world in minutes."
            },
            {
                "id": "C",
                "text": "AWS offers increased speed and agility."
            },
            {
                "id": "D",
                "text": "AWS is responsible for patching the infrastructure."
            },
            {
                "id": "E",
                "text": "Users benefit from economies of scale."
            }
        ],
        "answer": "AE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q422",
        "text": "A company wants to design its cloud architecture so that it can support development innovations, and\ncontinuously improve processes and procedures.\nThis is an example of which pillar of the AWS Well-Architected Framework?",
        "options": [
            {
                "id": "A",
                "text": "Security"
            },
            {
                "id": "B",
                "text": "Performance efficiency"
            },
            {
                "id": "C",
                "text": "Operational excellence"
            },
            {
                "id": "D",
                "text": "Reliability"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q423",
        "text": "A company needs to consolidate the billing for multiple AWS accounts. The company needs to use one\naccount to pay on behalf of all the other accounts.\nWhich AWS service or tool should the company use to meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "B",
                "text": "AWS Organizations"
            },
            {
                "id": "C",
                "text": "AWS Budgets"
            },
            {
                "id": "D",
                "text": "AWS Service Catalog"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q424",
        "text": "A company is moving some of its on-premises IT services to the AWS Cloud. The finance department\nwants to see the entire bill so it can forecast spending limits.\nWhich AWS service can the company use to set spending limits and receive notifications if those limits\nare exceeded?",
        "options": [
            {
                "id": "A",
                "text": "AWS Cost and Usage Reports"
            },
            {
                "id": "B",
                "text": "AWS Budgets"
            },
            {
                "id": "C",
                "text": "AWS Organizations consolidated billing"
            },
            {
                "id": "D",
                "text": "Cost Explorer"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q425",
        "text": "Which AWS Support plans provide access to an AWS technical account manager (TAM)? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "AWS Basic Support"
            },
            {
                "id": "B",
                "text": "AWS Developer Support"
            },
            {
                "id": "C",
                "text": "AWS Business Support"
            },
            {
                "id": "D",
                "text": "AWS Enterprise On-Ramp Support"
            },
            {
                "id": "E",
                "text": "AWS Enterprise Support"
            }
        ],
        "answer": "DE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q426",
        "text": "Where can users find examples of AWS Cloud solution designs?",
        "options": [
            {
                "id": "A",
                "text": "AWS Marketplace"
            },
            {
                "id": "B",
                "text": "AWS Service Catalog"
            },
            {
                "id": "C",
                "text": "AWS Architecture Center"
            },
            {
                "id": "D",
                "text": "AWS Trusted Advisor"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q427",
        "text": "Which task is the responsibility of a company that is using Amazon RDS?",
        "options": [
            {
                "id": "A",
                "text": "Provision the underlying infrastructure."
            },
            {
                "id": "B",
                "text": "Create IAM policies to control administrative access to the service."
            },
            {
                "id": "C",
                "text": "Install the cables to connect the hardware for compute and storage."
            },
            {
                "id": "D",
                "text": "Install and patch the RDS operating system."
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q428",
        "text": "Which of the following is an advantage that the AWS Cloud provides to users?",
        "options": [
            {
                "id": "A",
                "text": "Users eliminate the need to guess about infrastructure capacity requirements."
            },
            {
                "id": "B",
                "text": "Users decrease their variable costs by maintaining sole ownership of IT hardware."
            },
            {
                "id": "C",
                "text": "Users maintain control of underlying IT infrastructure hardware."
            },
            {
                "id": "D",
                "text": "Users maintain control of operating systems for managed services."
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q429",
        "text": "Which feature of Amazon RDS provides the ability to automatically create a primary database instance\nand to synchronously replicate data to an instance in another Availability Zone?",
        "options": [
            {
                "id": "A",
                "text": "Read replicas"
            },
            {
                "id": "B",
                "text": "Blue/green deployment"
            },
            {
                "id": "C",
                "text": "Multi-AZ deployment"
            },
            {
                "id": "D",
                "text": "Reserved Instances"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q430",
        "text": "A company needs to check for IAM access keys that have not been rotated recently.\nWhich AWS service should the company use to meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS WAF"
            },
            {
                "id": "B",
                "text": "AWS Shield"
            },
            {
                "id": "C",
                "text": "Amazon Cognito"
            },
            {
                "id": "D",
                "text": "AWS Trusted Advisor"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q431",
        "text": "A company runs many Amazon EC2 instances in its VPC. The company wants to use a native AWS security\nresource to control network traffic between certain EC2 instances.\nWhich AWS service or feature will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "Network ACLs"
            },
            {
                "id": "B",
                "text": "AWS WAF"
            },
            {
                "id": "C",
                "text": "Amazon Guard Duty"
            },
            {
                "id": "D",
                "text": "Security groups"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q432",
        "text": "Which of the following can be components of a VPC in the AWS Cloud? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Amazon API Gateway"
            },
            {
                "id": "B",
                "text": "Amazon S3 buckets and objects"
            },
            {
                "id": "C",
                "text": "AWS Storage Gateway"
            },
            {
                "id": "D",
                "text": "Internet gateway"
            },
            {
                "id": "E",
                "text": "Subnet"
            }
        ],
        "answer": "DE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q433",
        "text": "A company is building a new application on AWS. The company needs the application to remain\navailable if an individual application component fails.\nWhich design principle should the company use to meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "Disposable resources"
            },
            {
                "id": "B",
                "text": "Automation"
            },
            {
                "id": "C",
                "text": "Rightsizing"
            },
            {
                "id": "D",
                "text": "Loose coupling"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q434",
        "text": "A company wants to use a managed service to identify and protect sensitive data that is stored in\nAmazon S3.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS IAM Access Analyzer"
            },
            {
                "id": "B",
                "text": "Amazon GuardDuty"
            },
            {
                "id": "C",
                "text": "Amazon Inspector"
            },
            {
                "id": "D",
                "text": "Amazon Macie"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q435",
        "text": "Which AWS service or feature can a user configure to limit network access at the subnet level?",
        "options": [
            {
                "id": "A",
                "text": "AWS Shield"
            },
            {
                "id": "B",
                "text": "AWS WAF"
            },
            {
                "id": "C",
                "text": "Network ACL"
            },
            {
                "id": "D",
                "text": "Security group"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q436",
        "text": "Which AWS service can a company use to manage encryption keys in the cloud?",
        "options": [
            {
                "id": "A",
                "text": "AWS License Manager"
            },
            {
                "id": "B",
                "text": "AWS Certificate Manager (ACM)"
            },
            {
                "id": "C",
                "text": "AWS CloudHSM"
            },
            {
                "id": "D",
                "text": "AWS Directory Service"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q437",
        "text": "A company wants to enhance security by launching a third-party ISP intrusion detection system from its\nAWS account.\nWhich AWS service or resource should the company use to meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Security Hub"
            },
            {
                "id": "B",
                "text": "AWS Marketplace"
            },
            {
                "id": "C",
                "text": "AWS Quick Starts"
            },
            {
                "id": "D",
                "text": "AWS Security Center"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q438",
        "text": "How does the AWS Cloud help companies build agility into their processes and cloud infrastructure?",
        "options": [
            {
                "id": "A",
                "text": "Companies can avoid provisioning too much capacity when they do not know how much capacity is required."
            },
            {
                "id": "B",
                "text": "Companies can expand into new geographic regions."
            },
            {
                "id": "C",
                "text": "Companies can access a range of technologies to experiment and innovate quickly."
            },
            {
                "id": "D",
                "text": "Companies can pay for IT resources only when they use the resources."
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q439",
        "text": "Which AWS service or tool gives a company the ability to release application changes in an automated\nway?",
        "options": [
            {
                "id": "A",
                "text": "Amazon AppFlow"
            },
            {
                "id": "B",
                "text": "AWS CodeDeploy"
            },
            {
                "id": "C",
                "text": "AWS PrivateLink"
            },
            {
                "id": "D",
                "text": "Amazon EKS Distro"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q440",
        "text": "Which AWS Cloud Adoption Framework (AWS CAF) perspective focuses on managing identities and\npermissions at scale?",
        "options": [
            {
                "id": "A",
                "text": "Operations"
            },
            {
                "id": "B",
                "text": "Platform"
            },
            {
                "id": "C",
                "text": "Governance"
            },
            {
                "id": "D",
                "text": "Security"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q441",
        "text": "Which AWS service or feature allows users to securely store encrypted credentials and retrieve these\ncredentials when required?",
        "options": [
            {
                "id": "A",
                "text": "AWS Encryption SDK"
            },
            {
                "id": "B",
                "text": "AWS Security Hub"
            },
            {
                "id": "C",
                "text": "AWS Secrets Manager"
            },
            {
                "id": "D",
                "text": "AWS Artifact"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q442",
        "text": "Which pillar of the AWS Well-Architected Framework aligns with the ability to make frequent, small, and\nreversible changes to AWS Cloud architecture?",
        "options": [
            {
                "id": "A",
                "text": "Security"
            },
            {
                "id": "B",
                "text": "Cost optimization"
            },
            {
                "id": "C",
                "text": "Operational excellence"
            },
            {
                "id": "D",
                "text": "Performance efficiency"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q443",
        "text": "Which AWS service or resource can a company use to deploy AWS WAF rules?",
        "options": [
            {
                "id": "A",
                "text": "Amazon EC2"
            },
            {
                "id": "B",
                "text": "Application Load Balancer"
            },
            {
                "id": "C",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "D",
                "text": "Network Load Balancer"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q444",
        "text": "A company hosts its website on Amazon EC2 instances. The company needs to ensure that the website\nreaches a global audience and provides minimum latency to users.\nWhich AWS service should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Route 53"
            },
            {
                "id": "B",
                "text": "Amazon CloudFront"
            },
            {
                "id": "C",
                "text": "Elastic Load Balancing"
            },
            {
                "id": "D",
                "text": "AWS Lambda"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q445",
        "text": "Which AWS design principle emphasizes the reduction of interdependencies between components of an\napplication?",
        "options": [
            {
                "id": "A",
                "text": "Scalability"
            },
            {
                "id": "B",
                "text": "Loose coupling"
            },
            {
                "id": "C",
                "text": "Automation"
            },
            {
                "id": "D",
                "text": "Caching"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q446",
        "text": "A company wants to provide one of its employees with access to Amazon RDS. The company also wants\nto limit the interaction to only the AWS CLI and AWS software development kits (SDKs).\nWhich combination of actions should the company take to meet these requirements while following the\nprinciples of least privilege? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Create an IAM user and provide AWS Management Console access only."
            },
            {
                "id": "B",
                "text": "Create an IAM user and provide programmatic access only."
            },
            {
                "id": "C",
                "text": "Create an IAM role and provide AWS Management Console access only."
            },
            {
                "id": "D",
                "text": "Create an IAM policy with administrator access and attach it to the IAM user."
            },
            {
                "id": "E",
                "text": "Create an IAM policy with Amazon RDS access and attach it to the IAM user."
            }
        ],
        "answer": "BE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q447",
        "text": "A company is running a reporting web server application on Amazon EC2 instances. The application\nruns once every week and once again at the end of the month. The EC2 instances can be shut down\nwhen they are not in use.\nWhat is the MOST cost-effective billing model for this use case?",
        "options": [
            {
                "id": "A",
                "text": "Standard Reserved Instances"
            },
            {
                "id": "B",
                "text": "Convertible Reserved Instances"
            },
            {
                "id": "C",
                "text": "On-Demand Capacity Reservations"
            },
            {
                "id": "D",
                "text": "On-Demand Instances"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q448",
        "text": "A company wants to discover, prepare, move, and integrate data from multiple sources for data\nanalytics and machine learning.\nWhich AWS serverless data integration service should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Glue"
            },
            {
                "id": "B",
                "text": "AWS Data Exchange"
            },
            {
                "id": "C",
                "text": "Amazon Athena"
            },
            {
                "id": "D",
                "text": "Amazon EMR"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q449",
        "text": "A company is moving its development and test environments to AWS to increase agility and reduce\ncost. Because these are not production workloads and the servers are not fully utilized, occasional\nunavailability is acceptable.\nWhat is the MOST cost-effective Amazon EC2 pricing model that will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Reserved Instances"
            },
            {
                "id": "B",
                "text": "On-Demand Instances"
            },
            {
                "id": "C",
                "text": "Spot Instances"
            },
            {
                "id": "D",
                "text": "Dedicated Hosts"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q450",
        "text": "A company deploys its application on Amazon EC2 instances. The application occasionally experiences\nsudden increases in demand. The company wants to ensure that its application can respond to changes\nin demand at the lowest possible cost.\nWhich AWS service or concept will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Auto Scaling"
            },
            {
                "id": "B",
                "text": "AWS Compute Optimizer"
            },
            {
                "id": "C",
                "text": "AWS Cost Explorer"
            },
            {
                "id": "D",
                "text": "AWS Well-Architected Framework"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q451",
        "text": "A company wants to organize its users so that the company can grant permissions to the users as a\ngroup.\nWhich AWS service or tool can the company use to meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "Security groups"
            },
            {
                "id": "B",
                "text": "AWS Identity and Access Management (IAM)"
            },
            {
                "id": "C",
                "text": "Resource groups"
            },
            {
                "id": "D",
                "text": "AWS Security Hub"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q452",
        "text": "A company wants to build an application that uses AWS Lambda to run Python code.\nUnder the AWS shared responsibility model, which tasks will be the company’s responsibility? (Choose\ntwo.)",
        "options": [
            {
                "id": "A",
                "text": "Management of the underlying infrastructure."
            },
            {
                "id": "B",
                "text": "Management of the operating system."
            },
            {
                "id": "C",
                "text": "Writing the business logic code."
            },
            {
                "id": "D",
                "text": "Installation of the computer language runtime."
            },
            {
                "id": "E",
                "text": "Providing AWS Identity and Access Management (IAM) access to the Lambda service."
            }
        ],
        "answer": "CE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q453",
        "text": "A company needs to identify who accessed an AWS service and what action was performed for a given\ntime period.\nWhich AWS service should the company use to meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "Amazon CloudWatch"
            },
            {
                "id": "B",
                "text": "AWS CloudTrail"
            },
            {
                "id": "C",
                "text": "AWS Security Hub"
            },
            {
                "id": "D",
                "text": "Amazon Inspector"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q454",
        "text": "A company wants to use a centralized AWS service to enforce compliance with the organizational\nbusiness standards. The company wants to use an AWS service that can govern and control who can\ndeploy, manage, and decommission AWS resources.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon CloudWatch"
            },
            {
                "id": "B",
                "text": "AWS Service Catalog"
            },
            {
                "id": "C",
                "text": "Amazon GuardDuty"
            },
            {
                "id": "D",
                "text": "AWS Security Hub"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q455",
        "text": "What does \"security of the cloud” refer to in the AWS shared responsibility model?",
        "options": [
            {
                "id": "A",
                "text": "Availability of AWS services such as Amazon EC2"
            },
            {
                "id": "B",
                "text": "Security of the cloud infrastructure that runs all the AWS services"
            },
            {
                "id": "C",
                "text": "Implementation of password policies for IAM users"
            },
            {
                "id": "D",
                "text": "Security of customer environments by using AWS Network Firewall partners"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q456",
        "text": "A company has an application that produces unstructured data continuously. The company needs to\nstore the data so that the data is durable and easy to query.\nWhich AWS service can the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon RDS"
            },
            {
                "id": "B",
                "text": "Amazon Aurora"
            },
            {
                "id": "C",
                "text": "Amazon QuickSight"
            },
            {
                "id": "D",
                "text": "Amazon DynamoDB"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q457",
        "text": "Which options are AWS Cloud Adoption Framework (AWS CAF) perspectives? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Cloud fluency"
            },
            {
                "id": "B",
                "text": "Security"
            },
            {
                "id": "C",
                "text": "Change acceleration"
            },
            {
                "id": "D",
                "text": "Architecture"
            },
            {
                "id": "E",
                "text": "Business"
            }
        ],
        "answer": "BE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q458",
        "text": "A company wants to migrate a company’s on-premises container infrastructure to the AWS Cloud. The\ncompany wants to prevent unplanned administration and operation cost and adapt to a serverless\narchitecture.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Connect"
            },
            {
                "id": "B",
                "text": "AWS Fargate"
            },
            {
                "id": "C",
                "text": "Amazon Lightsail"
            },
            {
                "id": "D",
                "text": "Amazon EC2"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q459",
        "text": "A company wants its Amazon EC2 instances to be in different locations but share the same geographic\narea. The company also wants to use multiple power grids and independent networking connectivity\nfor the EC2 instances.\nWhich solution meets these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Use EC2 instances in multiple edge locations in the same AWS Region."
            },
            {
                "id": "B",
                "text": "Use EC2 instances in multiple Availability Zones in the same AWS Region."
            },
            {
                "id": "C",
                "text": "Use EC2 instances in multiple Amazon Connect locations in the same AWS Region."
            },
            {
                "id": "D",
                "text": "Use EC2 instances in multiple AWS Artifact locations in the same AWS Region."
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q460",
        "text": "An ecommerce company has deployed a new web application on Amazon EC2 instances. The company\nwants to distribute incoming HTTP traffic evenly across all running instances.\nWhich AWS service or resource will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "Amazon EC2 Auto Scaling"
            },
            {
                "id": "B",
                "text": "Application Load Balancer"
            },
            {
                "id": "C",
                "text": "Gateway Load Balancer"
            },
            {
                "id": "D",
                "text": "Network Load Balancer"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q461",
        "text": "Which AWS service or feature gives users the ability to connect VPCs and on-premises networks to a\ncentral hub?",
        "options": [
            {
                "id": "A",
                "text": "Virtual private gateway"
            },
            {
                "id": "B",
                "text": "AWS Transit Gateway"
            },
            {
                "id": "C",
                "text": "Internet gateway"
            },
            {
                "id": "D",
                "text": "Customer gateway"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q462",
        "text": "A company wants to run CPU-intensive workload across multiple Amazon EC2 instances.\nWhich EC2 instance type should the company use to meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "General purpose instances"
            },
            {
                "id": "B",
                "text": "Compute optimized instances"
            },
            {
                "id": "C",
                "text": "Memory optimized instances"
            },
            {
                "id": "D",
                "text": "Storage optimized instances"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q463",
        "text": "A company is connecting multiple VPCs and on-premises networks. The company needs to use an AWS\nservice as a cloud router to simplify peering relationships.\nWhich AWS service can the company use to meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Direct Connect"
            },
            {
                "id": "B",
                "text": "AWS Transit Gateway"
            },
            {
                "id": "C",
                "text": "Amazon Connect"
            },
            {
                "id": "D",
                "text": "Amazon Route 53"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q464",
        "text": "A company stores a large amount of data that auditors access only twice each year.\nWhich Amazon S3 storage class should the company use to store the data with the LOWEST cost?",
        "options": [
            {
                "id": "A",
                "text": "Amazon S3 Outposts"
            },
            {
                "id": "B",
                "text": "Amazon S3 Glacier Instant Retrieval"
            },
            {
                "id": "C",
                "text": "Amazon S3 Standard"
            },
            {
                "id": "D",
                "text": "Amazon S3 Intelligent-Tiering"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q465",
        "text": "Which action should a company take to improve security in its AWS account?",
        "options": [
            {
                "id": "A",
                "text": "Require multi-factor authentication (MFA) for privileged users."
            },
            {
                "id": "B",
                "text": "Remove the root user account."
            },
            {
                "id": "C",
                "text": "Create an access key for the AWS account root user."
            },
            {
                "id": "D",
                "text": "Create an access key for each privileged user."
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q466",
        "text": "Which of the following are ways to improve security on AWS? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Using AWS Artifact"
            },
            {
                "id": "B",
                "text": "Granting the broadest permissions to all IAM roles"
            },
            {
                "id": "C",
                "text": "Running application code with AWS Cloud"
            },
            {
                "id": "D",
                "text": "Enabling multi-factor authentication (MFA) with Amazon Cognito"
            },
            {
                "id": "E",
                "text": "Using AWS Trusted Advisor security checks"
            }
        ],
        "answer": "DE",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q467",
        "text": "Which AWS service can a company use to manage encryption keys in the cloud?",
        "options": [
            {
                "id": "A",
                "text": "AWS License Manager"
            },
            {
                "id": "B",
                "text": "AWS Certificate Manager (ACM)"
            },
            {
                "id": "C",
                "text": "AWS CloudHSM"
            },
            {
                "id": "D",
                "text": "AWS Directory Service"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q468",
        "text": "A company wants to store its files in the AWS Cloud. Users need to be able to download these files\ndirectly using a public URL.\nWhich AWS service or feature will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Redshift"
            },
            {
                "id": "B",
                "text": "Amazon Elastic Block Store (Amazon EBS)"
            },
            {
                "id": "C",
                "text": "Amazon Elastic File System (Amazon EFS)"
            },
            {
                "id": "D",
                "text": "Amazon S3"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q469",
        "text": "A company is using AWS for all its IT infrastructure. The company's developers are allowed to deploy\napplications on their own. The developers want to deploy their applications without having to\nprovision the infrastructure themselves.\nWhich AWS service should the developers use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS CloudFormation"
            },
            {
                "id": "B",
                "text": "AWS CodeBuild"
            },
            {
                "id": "C",
                "text": "AWS Elastic Beanstalk"
            },
            {
                "id": "D",
                "text": "AWS CodeDeploy"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q470",
        "text": "A company wants to gain insights from its data and build interactive data visualization dashboards.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon SageMaker"
            },
            {
                "id": "B",
                "text": "Amazon Rekognition"
            },
            {
                "id": "C",
                "text": "Amazon QuickSight"
            },
            {
                "id": "D",
                "text": "Amazon Kinesis"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q471",
        "text": "A cloud engineer wants to store data in Amazon S3. The engineer will access some of the data yearly\nand some of the data daily.\nWhich S3 storage class will meet these requirements MOST cost-effectively?",
        "options": [
            {
                "id": "A",
                "text": "S3 Standard"
            },
            {
                "id": "B",
                "text": "S3 Glacier Deep Archive"
            },
            {
                "id": "C",
                "text": "S3 One Zone-Infrequent Access (S3 One Zone-IA)"
            },
            {
                "id": "D",
                "text": "S3 Intelligent-Tiering"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q472",
        "text": "Which of the following are economic benefits of using the AWS Cloud? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Consumption-based pricing"
            },
            {
                "id": "B",
                "text": "Perpetual licenses"
            },
            {
                "id": "C",
                "text": "Economies of scale"
            },
            {
                "id": "D",
                "text": "AWS Enterprise Support at no additional cost"
            },
            {
                "id": "E",
                "text": "Bring-your-own-hardware model"
            }
        ],
        "answer": "AC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q473",
        "text": "A user is moving a workload from a local data center to an architecture that is distributed between the\nlocal data center and the AWS Cloud.\nWhich type of migration is this?",
        "options": [
            {
                "id": "A",
                "text": "On-premises to cloud native"
            },
            {
                "id": "B",
                "text": "Hybrid to cloud native"
            },
            {
                "id": "C",
                "text": "On-premises to hybrid"
            },
            {
                "id": "D",
                "text": "Cloud native to hybrid"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q474",
        "text": "A company needs to store infrequently used data for data archives and long-term backups.\nWhich AWS service or storage class will meet these requirements MOST cost-effectively?",
        "options": [
            {
                "id": "A",
                "text": "Amazon FSx for Lustre"
            },
            {
                "id": "B",
                "text": "Amazon Elastic Block Store (Amazon EBS)"
            },
            {
                "id": "C",
                "text": "Amazon Elastic File System (Amazon EFS)"
            },
            {
                "id": "D",
                "text": "Amazon S3 Glacier Flexible Retrieval"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q475",
        "text": "Which AWS service provides users with AWS issued reports, certifications, accreditations, and third-party\nattestations?",
        "options": [
            {
                "id": "A",
                "text": "AWS Artifact"
            },
            {
                "id": "B",
                "text": "AWS Trusted Advisor"
            },
            {
                "id": "C",
                "text": "AWS Health Dashboard"
            },
            {
                "id": "D",
                "text": "AWS Config"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q476",
        "text": "A company needs to create and publish interactive business intelligence dashboards. The dashboards\nrequire insights that are powered by machine learning.\nWhich AWS service or tool will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Glue Studio"
            },
            {
                "id": "B",
                "text": "Amazon QuickSight"
            },
            {
                "id": "C",
                "text": "Amazon Redshift"
            },
            {
                "id": "D",
                "text": "Amazon Athena"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q477",
        "text": "A company wants to use AWS. The company has stringent requirements about low-latency access to\non-premises systems and data residency.\nWhich AWS service should the company use to design a solution that meets these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Wavelength"
            },
            {
                "id": "B",
                "text": "AWS Transit Gateway"
            },
            {
                "id": "C",
                "text": "AWS Ground Station"
            },
            {
                "id": "D",
                "text": "AWS Outposts"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q478",
        "text": "A company runs an on-premises contact center for customers. The company needs to migrate to a cloudbased solution that can deliver artificial intelligence features to improve user experience.\nWhich AWS service will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Wavelength"
            },
            {
                "id": "B",
                "text": "AWS IAM Identity Center (AWS Single Sign-On)"
            },
            {
                "id": "C",
                "text": "AWS Direct Connect"
            },
            {
                "id": "D",
                "text": "Amazon Connect"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q479",
        "text": "A company needs the ability to acquire resources when the resources are needed. The company also\nneeds the ability to release the resources when the resources are no longer needed.\nWhich AWS concept represents the company's goals?",
        "options": [
            {
                "id": "A",
                "text": "Scalability"
            },
            {
                "id": "B",
                "text": "Sustainability"
            },
            {
                "id": "C",
                "text": "Elasticity"
            },
            {
                "id": "D",
                "text": "Operational excellence"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q480",
        "text": "A company wants to use Amazon EC2 instances for a stable production workload that will run for 1 year.\nWhich instance purchasing option meets these requirements MOST cost-effectively?",
        "options": [
            {
                "id": "A",
                "text": "Dedicated Hosts"
            },
            {
                "id": "B",
                "text": "Reserved Instances"
            },
            {
                "id": "C",
                "text": "On-Demand Instances"
            },
            {
                "id": "D",
                "text": "Spot Instances"
            }
        ],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q481",
        "text": "A company wants to log in securely to Linux Amazon EC2 instances.\nHow can the company accomplish this goal?",
        "options": [
            {
                "id": "A",
                "text": "Use SSH keys."
            },
            {
                "id": "B",
                "text": "Use a VPN."
            },
            {
                "id": "C",
                "text": "Use end-to-end encryption."
            },
            {
                "id": "D",
                "text": "Use Amazon Route 53."
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q482",
        "text": "A company wants to use a serverless compute service for an application.\nWhich AWS service will meet this requirement?",
        "options": [
            {
                "id": "A",
                "text": "AWS Lambda"
            },
            {
                "id": "B",
                "text": "AWS CloudFormation"
            },
            {
                "id": "C",
                "text": "AWS Elastic Beanstalk"
            },
            {
                "id": "D",
                "text": "Elastic Load Balancing"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q483",
        "text": "A company wants a solution that will automatically adjust the number of Amazon EC2 instances that\nare being used based on the current load.\nWhich AWS offering will meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Dedicated Hosts"
            },
            {
                "id": "B",
                "text": "Placement groups"
            },
            {
                "id": "C",
                "text": "Auto Scaling groups"
            },
            {
                "id": "D",
                "text": "Reserved Instances"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q484",
        "text": "A company is building AWS architecture to deliver real-time data feeds from an on-premises data\ncenter into an application that runs on AWS. The company needs a consistent network connection with\nminimal latency.\nWhat should the company use to connect the application and the data center to meet these\nrequirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Direct Connect"
            },
            {
                "id": "B",
                "text": "Public internet"
            },
            {
                "id": "C",
                "text": "AWS VPN"
            },
            {
                "id": "D",
                "text": "Amazon Connect"
            }
        ],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q485",
        "text": "A company plans to migrate its custom marketing application and order-processing application to AWS.\nThe company needs to deploy the applications on different types of instances with various\nconfigurations of CPU, memory, storage, and networking capacity.\nWhich AWS service should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "AWS Lambda"
            },
            {
                "id": "B",
                "text": "Amazon Cognito"
            },
            {
                "id": "C",
                "text": "Amazon Athena"
            },
            {
                "id": "D",
                "text": "Amazon EC2"
            }
        ],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q486",
        "text": "A company wants to monitor and block malicious HTTP and HTTPS requests that its Amazon\nCloudFront distributions receive.\nWhich AWS service should the company use to meet these requirements?",
        "options": [
            {
                "id": "A",
                "text": "Amazon GuardDuty"
            },
            {
                "id": "B",
                "text": "Amazon Inspector"
            },
            {
                "id": "C",
                "text": "AWS WAF"
            },
            {
                "id": "D",
                "text": "Amazon Detective"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q487",
        "text": "Which AWS services can host PostgreSQL databases? (Choose two.)",
        "options": [
            {
                "id": "A",
                "text": "Amazon S3"
            },
            {
                "id": "B",
                "text": "Amazon Aurora"
            },
            {
                "id": "C",
                "text": "Amazon EC2"
            },
            {
                "id": "D",
                "text": "Amazon OpenSearch Service"
            },
            {
                "id": "E",
                "text": "Amazon Elastic File System (Amazon EFS)"
            }
        ],
        "answer": "BC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q488",
        "text": "Which AWS service can generate information that can be used by external auditors?",
        "options": [
            {
                "id": "A",
                "text": "Amazon Cognito"
            },
            {
                "id": "B",
                "text": "Amazon FSx"
            },
            {
                "id": "C",
                "text": "AWS Config"
            },
            {
                "id": "D",
                "text": "Amazon Inspector"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q489",
        "text": "Which AWS service or feature requires an internet service provider (ISP) and a colocation facility to be\nimplemented?",
        "options": [
            {
                "id": "A",
                "text": "AWS VPN"
            },
            {
                "id": "B",
                "text": "Amazon Connect"
            },
            {
                "id": "C",
                "text": "AWS Direct Connect"
            },
            {
                "id": "D",
                "text": "Internet gateway"
            }
        ],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q518",
        "text": "Topic 1\nA company is planning to migrate a monolithic application to AWS. The company wants to modernize\nthe application by splitting it into microservices. The company will deploy the microservices on AWS.\nWhich migration strategy should the company use?\n• A. Rehost\n• B. Repurchase\n• C. Replatform\n• D. Refactor",
        "options": [],
        "answer": "D",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q618",
        "text": "Topic 1\nA company has applications that control on-premises factory equipment.\nWhich AWS service should the company use to run these applications with the LEAST latency?\n• A. AWS Outposts\n• B. Amazon EC2\n• C. AWS Lambda\n• D. AWS Fargate",
        "options": [],
        "answer": "A",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q626",
        "text": "Topic 1\nA company wants to set up a secure network connection from on premises to the AWS Cloud within 1\nweek.\nWhich solution will meet these requirements?\n• A. AWS Direct Connect\n• B. Amazon VPC\n• C. AWS Site-to-Site VPN\n• D. Edge location",
        "options": [],
        "answer": "CCOMMUNITYVOTEDISTRIBUTIONC",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q627",
        "text": "Topic 1\nWhat is a customer responsibility under the AWS shared responsibility model when using AWS Lambda?\n• A. Maintenance of the underlying Lambda hardware.\n• B. Maintenance of the Lambda networking infrastructure.\n• C. The code and libraries that run in the Lambda functions.\n• D. The Lambda server software.",
        "options": [],
        "answer": "C",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q667",
        "text": "Topic 1\nWhich AWS service should a company use to organize, characterize, and search large numbers of images?\n• A. Amazon Transcribe\n• B. Amazon Rekognition\n• C. Amazon Aurora\n• D. Amazon QuickSight",
        "options": [],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    },
    {
        "id": "q668",
        "text": "Topic 1\nWhich AWS service is always available free of charge to users?\n• A. Amazon Athena\n• B. AWS Identity and Access Management (IAM)\n• C. AWS Secrets Manager\n• D. Amazon ElastiCache",
        "options": [],
        "answer": "B",
        "explanation": "Part of the CLF-C02 Exam Practice Questions (2026)."
    }
];