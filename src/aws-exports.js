import { Amplify } from 'aws-amplify'

export default Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-1:c2762246-5930-4e3b-b770-d1a197eb2141',

    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_FKRmT1gyD',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '2msabl0516pdg7hopklrself3j',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
    // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
    //signUpVerificationMethod: 'code', // 'code' | 'link'

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
  Storage: { 
    bucket: 'expenses-app-bucket',
    region: 'us-east-1',
    identityPoolId: 'us-east-1:c2762246-5930-4e3b-b770-d1a197eb2141'
   }
})
