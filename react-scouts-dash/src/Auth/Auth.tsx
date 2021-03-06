import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuth, useUser } from 'reactfire';
const signOut = (auth: any) =>
  auth.signOut().then(() => console.log('signed out'));

export const AuthWrapper = ({
  children,
  fallback,
}: React.PropsWithChildren<{ fallback: JSX.Element }>): JSX.Element => {
  const { status, data: user, hasEmitted } = useUser();

  if (!children) {
    throw new Error('Children must be provided');
  }
  if (status === 'loading' || hasEmitted === false) {
    return <div></div>;
  } else if (user) {
    return children as JSX.Element;
  }

  return fallback;
};

const UserDetails = ({ user }: { user: any }) => {
  const auth = useAuth();

  return (
    <>
      <div title='Displayname'>{user.displayName}</div>
      <div title='Providers'>
        <ul>
          {user.providerData.map((profile: any) => (
            <li key={profile.providerId}>{profile.providerId}</li>
          ))}
        </ul>
      </div>
      <div title='Sign Out'>
        <button onClick={() => signOut(auth)}>Sign Out</button>
      </div>
    </>
  );
};

const SignInForm = () => {
  const auth = useAuth;
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: auth.EmailAuthProvider.PROVIDER_ID,
        // Use email link authentication and do not require password.
        // Note this setting affects new users only.
        // For pre-existing users, they will still be prompted to provide their
        // passwords on sign-in.
        // signInMethod: auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        // Allow the user the ability to complete sign-in cross device, including
        // the mobile apps specified in the ActionCodeSettings object below.
        forceSameDevice: true,
        // Used to define the optional firebase.auth.ActionCodeSettings if
        // additional state needs to be passed along request and whether to open
        // the link in a mobile app if it is installed.
        emailLinkSignIn: function () {
          return {
            // Additional state showPromo=1234 can be retrieved from URL on
            // sign-in completion in signInSuccess callback by checking
            // window.location.href.
            url: 'http://localhost:3000/',
            // Custom FDL domain.
            // dynamicLinkDomain: 'example.page.link',
            // Always true for email link sign-in.
            handleCodeInApp: true,
          };
        },
      },
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: (authResult: any, redirectUrl: any) => {
        console.log('authResult', authResult);
        console.log('redirectUrl', redirectUrl);
        return false;
      },
    },
  };

  return (
    <div title='Sign-in form'>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
    </div>
  );
};

export const Auth = () => {
  const { status, data: user, hasEmitted } = useUser(undefined, {
    initialData: {},
  });
  console.log(useUser());
  if (status === 'loading' || hasEmitted === false) {
    return <div />;
  }

  return user ? <UserDetails user={user} /> : <SignInForm />;
};
