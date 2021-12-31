# fastify-lambda
A sample project for deploying a Fastify app as AWS Lambda
# AWS Lambda with Fastify
- [fastify-lambda](#fastify-lambda)
- [AWS Lambda with Fastify](#aws-lambda-with-fastify)
    - [Intro](#intro)
    - [Prerequisite](#prerequisite)
    - [SAM commands:](#sam-commands)
    - [Important observations:](#important-observations)
    - [Helper links:](#helper-links)


### Intro
Fastify is getting very popular given is very fast and with an large ecosystem of plugins. So a decided to test how fast is it. Is not much to different than ExpressJs, but it has a couple of nice features.


### Prerequisite
To follow along you must have configure three things:  
1. AWS CLI configured
2. An active AWS account
3. Create a file named `samconfig.toml` in root project
4. Add the following data in `samconfig.toml`

```
version = 0.1
[default]
[default.deploy]
[default.deploy.parameters]
stack_name = "stack_app"
s3_bucket = "bucket_name"
region = "region_name"
capabilities = "CAPABILITY_IAM" 
```

### SAM commands: 
1. First need to build the function `sam build`
2. Optional call `sam validate` to validate the template  
3. Local test `sam local invoke` or `sam local start-api`
4. Finally sent the function to cloud by running: `sam deploy`
5. To view logs use `sam logs -n HelloWorldFunction --stack-name <stack_app> --tail`


### Important observations:
1. Create a S3 Bucket using AWS CLI
2. and copy the name to `samconfig.toml` file. 
3. Make sure to replace the account id and region in `samconfig.toml` file.
4. Remove `aws cloudformation delete-stack --stack-name <stack_app>`
5. To run the image build by sam `docker run -p 9000:8080 helloworldfunction:rapid-1.30.0`


### Helper links:
1. Guide to configure aws CLI: [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-creds)
2. Guide to install AWS SAM:[here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
