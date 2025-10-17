# Environment Configuration Documentation

## Sample .env File

Create a `.env` file in the root directory with the following environment variables:

```env
AUTH_API_TOKEN="your_auth_api_token_here"
AWS_ACCESS_KEY_ID="your_aws_access_key_id"
AWS_ACCESS_SECRET_KEY="your_aws_secret_access_key"
AWS_BUCKET_NAME="your_s3_bucket_name"
AWS_REGION="your_aws_region"
BASE_URL="https://your-middleware-url.com"
NEXT_API_BASE_URL="https://your-api-base-url.com"
NEXT_PRIVATE_LOCAL_WEBPACK="true"
NEXT_PUBLIC_AUTH="Bearer your_public_auth_token"
NEXT_PUBLIC_BASE_URL="https://your-elevate-apis-url.com"
NEXT_PUBLIC_BASE_URL_ENTITY="https://your-entity-management-url.com"
NEXT_PUBLIC_BASE_URL_READ="https://your-read-service-url.com"
NEXT_PUBLIC_BASE_URL_SCHEMA="https://your-schema-service-url.com"
NEXT_PUBLIC_CHANNEL_ID="your_channel_id"
NEXT_PUBLIC_CLIENT_ID="your_client_id"
NEXT_PUBLIC_CLIENT_SECRET="your_client_secret"
NEXT_PUBLIC_CLOUD_STORAGE_URL="https://your-s3-bucket-url.amazonaws.com/"
NEXT_PUBLIC_CONTENT="http://localhost:8000/your-app/content"
NEXT_PUBLIC_CONTENT_FRAMEWORK_ID="your_content_framework_id"
NEXT_PUBLIC_DELETE_USER="/api/user/v1/block"
NEXT_PUBLIC_FORGOT_PASSWORD="https://your-domain.com/recover/identify/account"
NEXT_PUBLIC_FRAMEWORK_ID="your_framework_id"
NEXT_PUBLIC_GENRATE_OTP="/api/otp/v2/generate"
NEXT_PUBLIC_GRANT_TYPE="password"
NEXT_PUBLIC_LOCATION_SEARCH="/api/data/v1/location/search"
NEXT_PUBLIC_LOGINPAGE="https://your-login-page-url.com/"
NEXT_PUBLIC_LOGIN_PATH="/auth/realms/sunbird/protocol/openid-connect/token"
NEXT_PUBLIC_NEW_REGISTRATION="/interface/v1/account/create"
NEXT_PUBLIC_ORGID="1"
NEXT_PUBLIC_PROGRAM_BASE_URL="https://your-program-base-url.com"
NEXT_PUBLIC_PWA="http://localhost:8000/your-app/pwa"
NEXT_PUBLIC_READ_USER="/api/user/v1/search"
NEXT_PUBLIC_REGISTRATION="http://localhost:8000/your-app/registration/newUser"
NEXT_PUBLIC_SEARCH_LOCATION="/interface/v1/user/locations/search"
NEXT_PUBLIC_SEND_OTP="/api/otp/v1/generate"
NEXT_PUBLIC_SHIKSHAGRAHA_BASEPATH="/your-app-basepath"
NEXT_PUBLIC_SSUNBIRD_BASE_URL="https://your-sunbird-interface-url.com/interface/v1"
NEXT_PUBLIC_SSUNBIRD_HIERARCHY_PATH="/api/course/v1/"
NEXT_PUBLIC_TELEMETRY_URL="https://your-telemetry-url.com/telemetry"
NEXT_PUBLIC_TENANT_ID="your_tenant_id_uuid"
NEXT_PUBLIC_TRACKING_BASE_URL="https://your-tracking-url.com/tracking"
NEXT_PUBLIC_UPDATE_USER="/api/framework/v1/update"
NEXT_PUBLIC_VERIFT_OTP="/api/otp/v2/verify"
NEXT_PUBLIC_VERIFY_OTP="/api/otp/v1/verify"
created_time="2025-06-18T08:50:04.71092372Z"
custom_metadata="null"
destroyed="false"
version="5"
```

## Environment Variables Description

| Variable | Description | Type |
|----------|-------------|------|
| `AUTH_API_TOKEN` | JWT token for API authentication | Private |
| `AWS_ACCESS_KEY_ID` | AWS access key for S3 operations | Private |
| `AWS_ACCESS_SECRET_KEY` | AWS secret key for S3 operations | Private |
| `AWS_BUCKET_NAME` | S3 bucket name for file storage | Private |
| `AWS_REGION` | AWS region for S3 services | Private |
| `BASE_URL` | Base URL for middleware services | Private |
| `NEXT_API_BASE_URL` | Next.js API base URL for server-side requests | Private |
| `NEXT_PRIVATE_LOCAL_WEBPACK` | Enable local webpack for development | Private |
| `NEXT_PUBLIC_AUTH` | Public authentication bearer token | Public |
| `NEXT_PUBLIC_BASE_URL` | Public base URL for Elevate APIs | Public |
| `NEXT_PUBLIC_BASE_URL_ENTITY` | Base URL for entity management services | Public |
| `NEXT_PUBLIC_BASE_URL_READ` | Base URL for read operations | Public |
| `NEXT_PUBLIC_BASE_URL_SCHEMA` | Base URL for schema services | Public |
| `NEXT_PUBLIC_CHANNEL_ID` | Channel identifier for the application | Public |
| `NEXT_PUBLIC_CLIENT_ID` | OAuth client identifier | Public |
| `NEXT_PUBLIC_CLIENT_SECRET` | OAuth client secret | Public |
| `NEXT_PUBLIC_CLOUD_STORAGE_URL` | Public URL for cloud storage access | Public |
| `NEXT_PUBLIC_CONTENT` | Base URL for content services | Public |
| `NEXT_PUBLIC_CONTENT_FRAMEWORK_ID` | Framework ID for content management | Public |
| `NEXT_PUBLIC_DELETE_USER` | API endpoint for user deletion/blocking | Public |
| `NEXT_PUBLIC_FORGOT_PASSWORD` | URL for password recovery page | Public |
| `NEXT_PUBLIC_FRAMEWORK_ID` | Main framework identifier | Public |
| `NEXT_PUBLIC_GENRATE_OTP` | API endpoint for OTP generation (v2) | Public |
| `NEXT_PUBLIC_GRANT_TYPE` | OAuth grant type (typically "password") | Public |
| `NEXT_PUBLIC_LOCATION_SEARCH` | API endpoint for location search functionality | Public |
| `NEXT_PUBLIC_LOGINPAGE` | URL for the login page | Public |
| `NEXT_PUBLIC_LOGIN_PATH` | OAuth login endpoint path | Public |
| `NEXT_PUBLIC_NEW_REGISTRATION` | API endpoint for new user registration | Public |
| `NEXT_PUBLIC_ORGID` | Organization identifier | Public |
| `NEXT_PUBLIC_PROGRAM_BASE_URL` | Base URL for program-related services | Public |
| `NEXT_PUBLIC_PWA` | Base URL for PWA services | Public |
| `NEXT_PUBLIC_READ_USER` | API endpoint for reading user data | Public |
| `NEXT_PUBLIC_REGISTRATION` | URL for user registration services | Public |
| `NEXT_PUBLIC_SEARCH_LOCATION` | API endpoint for location search | Public |
| `NEXT_PUBLIC_SEND_OTP` | API endpoint for OTP generation (v1) | Public |
| `NEXT_PUBLIC_SHIKSHAGRAHA_BASEPATH` | Base path for the application | Public |
| `NEXT_PUBLIC_SSUNBIRD_BASE_URL` | Base URL for Sunbird interface services | Public |
| `NEXT_PUBLIC_SSUNBIRD_HIERARCHY_PATH` | API path for course hierarchy | Public |
| `NEXT_PUBLIC_TELEMETRY_URL` | URL for telemetry data collection | Public |
| `NEXT_PUBLIC_TENANT_ID` | Tenant UUID for multi-tenant applications | Public |
| `NEXT_PUBLIC_TRACKING_BASE_URL` | Base URL for tracking services | Public |
| `NEXT_PUBLIC_UPDATE_USER` | API endpoint for updating user data | Public |
| `NEXT_PUBLIC_VERIFT_OTP` | API endpoint for OTP verification (v2) | Public |
| `NEXT_PUBLIC_VERIFY_OTP` | API endpoint for OTP verification (v1) | Public |
| `created_time` | Timestamp of environment creation | System |
| `custom_metadata` | Custom metadata field | System |
| `destroyed` | Flag indicating if environment is destroyed | System |
| `version` | Environment version number | System |

## Notes

- **Public variables** (`NEXT_PUBLIC_*`) are accessible in the browser and should not contain sensitive information
- **Private variables** are only accessible on the server side and can contain sensitive data
- **System variables** are typically managed by deployment systems and infrastructure
- Replace all placeholder values with your actual configuration values
- Never commit the actual `.env` file with real values to version control