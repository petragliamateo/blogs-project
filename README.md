# Aplicación de blogs

##  MongoDB | GraphQL

Este proyecto es parte del curso de fullstack.

Fue modificada para poder usarse como template, para aplicaciones de usos similares.
Estas aplicaciones son las de tipo blogs, tiendas, news...
Son aplicaciones las cuales necesitan un panel para poder subir cosas nuevas.

En este proyecto se utiliza MongoDB para guardar los datos.
Estos se manipulan mediante GraphQL, con Apollo, donde se utilizan Querys, Mutations y Subscriptions.
El servidor es creado con Express, httpServer y ApolloServer.
Para la parte de administración, se debe iniciar con un usuario, las credenciales son codificadas mediante jsonwebtoken.
Una vez que se tiene la autorización se pueden crear nuevos blogs o posteos.
