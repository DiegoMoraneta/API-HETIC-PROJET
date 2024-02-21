### Objective:
- Create a dynamic PDF generator using express and Node.js

### Technologies used:
- Node.js is the backbone runtime environment, chosen for its efficiency in server-side scripting and capability to develop scalable network applications.
    -Why Node.js? Offers non-blocking I/O operations, making it ideal for data-intensive applications.
    -Learn More: [Node.js Official Website](https://nodejs.org/)
- Express.js, the chosen web application framework, streamlines the building of server-side routes and middleware, offering a robust foundation for web applications.
    -Why Express.js? Provides a lightweight layer for web application features, facilitating fast and secure development.
    Learn More: https://expressjs.com/
- For PDF document generation, PDFKit stands out for its flexibility and comprehensive features, allowing for dynamic creation of complex PDFs.
    -Why PDFKit? It offers a straightforward interface for integrating text, images, and vectors into PDFs.
    -Learn more: http://pdfkit.org/
- Microsoft SQL Server (MSSQL) is the chosen database system, selected for its robustness, security, and comprehensive data management features.
    -Why MSSQL? It supports advanced data analytics and business intelligence tools, with wide-ranging support across development platforms.
    -https://www.npmjs.com/package/mssql
- dotenv is used for managing environment variables, keeping sensitive information like database credentials secure and out of the source code.
    -Why dotenv? It enables secure, environment-specific configuration in a scalable manner.
    -https://github.com/motdotla/dotenv

### Current Progress :
- The project's foundation is established, featuring a basic Express.js server setup capable of generating PDF documents through PDFKit and initiating a connection to an MSSQL database. A significant part of this phase has been dedicated to ensuring security through the use of environment variables for database connections. However, a challenge has arisen in fully establishing a stable and functional connection to the database, marking it as a critical area of ongoing work and troubleshooting. This aspect is currently a work in progress, underscoring the iterative nature of software development and the learning opportunities it presents.


### Upcoming Work and Improvements:
The path forward includes not only overcoming the current hurdle with the database connection but also expanding on the foundation laid:

Refining PDF generation to meet specific needs and layouts.
Advancing database interactions to encompass complex operations and data handling.
Boosting security measures and performance optimization.
Improving user experience based on iterative feedback and testing.
Cleaning up and optimizing my code.

### Conclusion:
This project is a reflection of the iterative process of learning and application in software development. Though challenges like the database connection issue remain, the journey thus far has been enriching and illuminating. Looking ahead, the focus remains on addressing these challenges, enhancing the project's functionality, and leveraging the full potential of the selected technologies to meet the project's ambitious goals. Ive got a few regrets considering that ive probably bit more than i can chew in some aspects of this project. Instead of taking an approach i decided to try other technologies making it so ive fallen behind in schedule.