# LeetMetric

LeetMetric is a frontend web application that dynamically fetches and visualizes LeetCode user statistics.  
The project demonstrates practical knowledge of API integration, CORS handling, proxy architecture, and dynamic DOM manipulation using JavaScript.

## Project

### LeetMetric

Description: A responsive web application that retrieves and displays LeetCode user statistics in real time. The application uses a proxy server to handle CORS restrictions and enable secure data fetching from LeetCode’s endpoints.  

Tech stack: HTML, CSS, JavaScript  

Concepts used: API integration, Proxy architecture, CORS handling, Asynchronous JavaScript, DOM manipulation  

Live demo:  
https://notmajed-dev.github.io/LeetMetric/  

Source code:  
LeetMetric/

## Technical Implementation

LeetCode does not provide direct public API access for client-side applications.  
Browser-based requests to LeetCode endpoints are blocked due to CORS policy restrictions.

To overcome this limitation, a proxy URL is used.

Architecture flow:
- The frontend sends a request to the proxy endpoint  
- The proxy forwards the request to LeetCode  
- The response data is returned to the frontend  
- JavaScript dynamically updates the UI with fetched statistics  

This implementation demonstrates understanding of real-world API constraints and client-server interaction models.

## Temporary Access Requirement

The project currently uses the CORS Anywhere demo proxy server.

Before using the live application, temporary access must be requested from:  
https://cors-anywhere.herokuapp.com/corsdemo  

After activating temporary access, the application functions normally.  
Without activation, API requests will fail due to CORS restrictions.

## Folder Structure

LeetMetric/  
index.html  
style.css  
script.js  
README.md  

## Author

Majed  
https://github.com/notmajed-dev  
