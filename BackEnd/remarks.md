******\*\*\*\*******\*\*\*******\*\*\*\*******REFRESH & ACCESS TOKEN**********\*\*\*\***********\***********\*\*\*\***********

In a web application, the combination of a refresh token and an access token is commonly used for implementing an authentication and authorization mechanism, particularly when working with OAuth 2.0 or similar protocols. Let's understand the purpose of each token:

Access Token: An access token is a credential that is issued by an authentication server upon successful authentication of a user. It is used to grant limited access to specific resources or perform certain actions on behalf of the user. Access tokens have a limited lifespan and typically expire after a short period of time, such as minutes or hours.

Refresh Token: A refresh token is also issued by the authentication server, typically alongside the access token. The refresh token has a longer lifespan compared to the access token, lasting days, weeks, or even months. Its primary purpose is to obtain a new access token once the current access token expires. It is typically sent to the server in exchange for a new access token, without requiring the user to re-enter their credentials.

The reason for having both tokens is to enhance security and user experience in web applications. Here's how they work together:

Initially, when a user logs in or grants permission to the application, an access token and a refresh token are issued. The access token is sent with each subsequent request to the server to authenticate the user and authorize access to protected resources.

When the access token expires (due to time constraints), the user would typically need to re-authenticate, which can be inconvenient and disrupt the user experience. Instead, the application can use the refresh token to obtain a new access token without requiring the user to re-enter their credentials.

The application can make a specific request to the authentication server using the refresh token to exchange it for a fresh access token. This process is often transparent to the user.

If the refresh token is valid and not expired, the authentication server issues a new access token to the application. The application can then use the new access token to continue accessing the protected resources on behalf of the user.

\*\*\*Using a refresh token in combination with an access token allows web applications to maintain a balance between security and usability. It reduces the need for users to repeatedly log in and provides a seamless experience while ensuring that access tokens have a shorter lifespan to mitigate potential security risks if they are compromised.

******\*\*\*\*******\*\*\*******\*\*\*\*******ExpressJS Async Errors : npm i express-async-errors**********\*\*\*\***********\***********\*\*\*\***********
This library is about what happens when you hit an error !
How Does This Work?
This is a very minimalistic and unintrusive hack. Instead of patching all methods on an express Router, it wraps the Layer#handle property in one place, leaving all the rest of the express guts intact.

The idea is that you require the patch once and then use the 'express' lib the usual way in the rest of your application.

==>Only thing we need is to require 'express-async-errors' at the top of server.js
==>It applies itself everywhere in the Application !
