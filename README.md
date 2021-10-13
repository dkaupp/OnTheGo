# On The Go
#### Video Demo:  <https://youtu.be/0xBuxy0D1I8>
#### [Online App](https://on-the-go.vercel.app) <https://on-the-go.vercel.app>
#### Description:
This project is an e-commerce full stack **JavaScript** web application which consists of front and back end, hence the two folders. In order to work they have to run together. [A production version of the site can be found at](https://on-the-go.vercel.app) . Often it will take some time to load, bear in mind that the back end is hosted in Heroku that put Dynos to sleep after around 30 minutes of inactivity so probably  one reload will be needed (free service draw backs). The total time it took me to complete app was about a month .
#### Tools:
- **VsCode** text editor , works great in both windows and Linux
- **Postman** to test APIs

#### Features of webpage for Users:
- register and sign in
- review their placed and pending orders
- change email and password.

#### Features of webpage for Admins:
- can fully edit/add products and categories
- review  orders and once delivered, change their status
- also access customer’s list
  *The authentication is handle using JSON Web tokens .

#### Front end :
- For the front end I went with **Next.js** that is a **JavaScript** framework that allows you to build server-side render and static web applications using **React**. Some of the reasons are **SEO** ( Search Engine Optimization ), apps are very fast, with great image optimization and also it solves out-of- the-box  problems that require a lot of configuration if using **React**.
- Even when due to times restrictions, this project was mostly developed using **Bootstrap**, plain **CSS** was used  to customize the look of the website (could have done the entire thing with styled components or such, but it would have taken too long)

- **Axios** as **HTTP** client to handle all the **APIs** calls.
- **Paypal** to handle online payments, the version used is the test one.


#### Back End :
- Node.js  was my selection for building the back end, using Express framework. The reason is that my preferred programming language for web development is JavaScript ( one programming language used in the entire application).
- For the database I chose MongoDb.
Mongoose is the library used to manage the relationships between data and schema validation, to host it in the cloud Mongo Atlas.
- Multer is use to handle the multi part form data incoming from the front end. Sharp to compress and create to versions of the  images before storing them in Cloudinary hosting service. For the purposes of this project I only included one image per product.

-  Winston is my choice for  logging errors in the database for the application in production .

#### Hosting Services:
- Mongo Atlas to host the database is a great service and the way to go in my opinion if using mongo db.
- Cloudinary was used to host the photos,  is  a better option than trying to save them in mongo atlas .
- Heroku  was my choice to host the back end , works great and is free .
- Vercel  is where the front end is been host optimized for server side rendering free to use.
